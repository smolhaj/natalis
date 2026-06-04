import { COUNTRIES } from '../data/countries'
import { getCountryDisplayName } from '../utils/countryUtils'
import { DESTINATIONS } from '../data/destinations'
import { EVENTS, EVENTS_BY_PHASE } from '../data/events'
import { WORLD_EVENTS } from '../data/worldEvents'
import { RIBBONS } from '../data/ribbons'
import { ACTIVITIES } from '../data/activities'
import { CRIMES } from '../data/crimes'
import { CAREERS } from '../data/careers'
import { PROPERTY_TYPES, VEHICLE_TYPES } from '../data/assets'
import { ILLNESSES } from '../data/illnesses'
import { PLACES, getPlacesForCountry, pickBirthPlace, pickNeighborhoodTier, pickNamedNeighborhood, getRelocationCost } from '../data/places'
import { HEADLINES } from '../data/headlines'
import { randomBetween, pickFrom, rollWeighted, clamp, chance } from '../utils/random'

// ─── FlagSet ──────────────────────────────────────────────────────────────────
// Extends Set with Array.prototype.includes as an alias for has(), so existing
// event guards written as G.flags.includes('x') continue to work while getting
// O(1) lookup instead of O(n) linear scan. New guards should prefer .has().
class FlagSet extends Set {
  includes(flag) { return this.has(flag) }
  some(predicate) { for (const v of this) { if (predicate(v)) return true } return false }
  filter(predicate) { return [...this].filter(predicate) }
  find(predicate) { for (const v of this) { if (predicate(v)) return v } return undefined }
}

// ─── Weighted random helpers ──────────────────────────────────────────────────

function weightedRandom(weights) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0)
  if (total <= 0) return Object.keys(weights)[0]
  let r = Math.random() * total
  for (const [key, weight] of Object.entries(weights)) {
    r -= weight
    if (r <= 0) return key
  }
  return Object.keys(weights)[Object.keys(weights).length - 1]
}

function weightedRandomFromArray(arr, shareKey = 'share') {
  const total = arr.reduce((sum, item) => sum + (item[shareKey] ?? 1), 0)
  let r = Math.random() * total
  for (const item of arr) {
    r -= item[shareKey] ?? 1
    if (r <= 0) return item
  }
  return arr[arr.length - 1]
}

// ─── Phase mapping ────────────────────────────────────────────────────────────

export function getPhase(age) {
  if (age <= 5) return 'early_childhood'
  if (age <= 11) return 'childhood'
  if (age <= 17) return 'adolescence'
  if (age <= 29) return 'young_adult'
  if (age <= 49) return 'midlife'
  return 'late_life'
}

// ─── Country regime / LGBTQ helpers ──────────────────────────────────────────

export function getCountryRegime(country, year) {
  if (!country) return 'democracy'
  let regime = country.regime ?? 'democracy'
  if (country.regimeHistory && Array.isArray(country.regimeHistory)) {
    const sorted = [...country.regimeHistory].sort((a, b) => a.year - b.year)
    for (const shift of sorted) {
      if (year >= shift.year) regime = shift.to
    }
  }
  return regime
}

export function isLgbtqCriminalized(country, year) {
  if (!country) return false
  if (!country.lgbtqCriminalized) return false
  if (country.lgbtqLegalYear && year >= country.lgbtqLegalYear) return false
  return true
}

// ─── Character creation ───────────────────────────────────────────────────────

export function createCharacter(overrides = {}) {
  const country = overrides.country
    ? COUNTRIES.find(c => c.name === overrides.country) ?? pickFrom(COUNTRIES)
    : pickFrom(COUNTRIES)

  const birthYear = overrides.birthYear
    ?? randomBetween(country.yearRange[0], country.yearRange[1])

  const gender = overrides.gender ?? (chance(0.5) ? 'male' : 'female')

  const firstName = pickFrom(gender === 'male' ? country.namePool.male : country.namePool.female)
  const surname = pickFrom(country.surnames)

  const wealthTier = overrides.wealthTier ?? rollWeighted(country.wealthTierWeights)

  const stabilityRoll = Math.random()
  const stabilityBoost = wealthTier >= 3 ? 0.2 : wealthTier <= 1 ? -0.2 : 0
  const adjustedRoll = clamp(stabilityRoll + stabilityBoost, 0, 1)
  const familyStability = overrides.familyStability ?? (
    adjustedRoll < 0.2 ? 'unstable' :
    adjustedRoll < 0.45 ? 'struggling' :
    adjustedRoll < 0.75 ? 'stable' : 'secure'
  )

  const familySize = clamp(randomBetween(1, 8) + (
    ['subsaharan', 'conflict_zone', 'developing_unstable'].includes(country.archetype) ? 2 : 0
  ), 1, 12)

  const hcBonus = { excellent: 15, good: 8, fair: 0, poor: -10, very_poor: -20 }[country.healthcare] ?? 0
  const health = clamp(55 + hcBonus + (wealthTier - 3) * 4, 15, 100)
  const stabBonus = { secure: 15, stable: 5, struggling: -5, unstable: -20 }[familyStability] ?? 0
  const happiness = clamp(60 + stabBonus + randomBetween(-5, 5), 10, 100)
  const gdpBonus = { very_high: 15, high: 10, medium_high: 5, medium: 0, low_medium: -5, low: -10, very_low: -15 }[country.gdp] ?? 0
  const smarts = clamp(50 + gdpBonus + randomBetween(-10, 10), 15, 90)
  const looks = clamp(50 + (wealthTier - 3) * 3 + randomBetween(-15, 15), 15, 90)
  const charismaBonus = { secure: 10, stable: 5, struggling: -3, unstable: -10 }[familyStability] ?? 0
  const charisma = clamp(50 + charismaBonus + randomBetween(-10, 10), 15, 85)
  const wealth = clamp(wealthTier * 18 + randomBetween(-4, 4), 0, 100)
  const initialStats = { happiness, health, smarts, looks, charisma, wealth }

  // Assign religion
  const religion = overrides.religion ?? (() => {
    const weights = country.religionWeights
    if (!weights) return 'secular'
    return weightedRandom(weights)
  })()

  // Assign ethnicity
  const ethnicity = (() => {
    const groups = country.ethnicGroups
    if (!groups || groups.length === 0) return 'local'
    const group = weightedRandomFromArray(groups, 'share')
    return group.id
  })()

  // Assign rural/urban based on urbanRate + era
  const baseUrbanRate = country.urbanRate ?? 0.65
  // Earlier birth years = more rural (pre-1960 much more rural in developing world)
  const eraAdjust = birthYear < 1960 ? -0.15 : birthYear < 1980 ? -0.07 : 0
  const adjustedUrbanRate = Math.max(0.05, Math.min(0.98, baseUrbanRate + eraAdjust))
  const ruralUrban = overrides.ruralUrban ?? (Math.random() < adjustedUrbanRate
    ? (Math.random() < 0.3 ? 'suburban' : 'urban')
    : 'rural')

  // Assign literacy (affects event availability)
  const litRate = gender === 'female'
    ? (country.literacyFemale ?? 0.95)
    : (country.literacyMale ?? 0.97)
  // Earlier birth years = lower literacy in developing nations
  const eraLitAdj = birthYear < 1960 && (country.gdp === 'low' || country.gdp === 'very_low' || country.gdp === 'low_medium')
    ? -0.15 : birthYear < 1980 && (country.gdp === 'low' || country.gdp === 'very_low') ? -0.10 : 0
  const literate = Math.random() < Math.max(0.05, litRate + eraLitAdj)

  // Assign birth place
  const birthPlace = pickBirthPlace(country, ruralUrban, wealthTier)
  const birthNeighborhoodTier = pickNeighborhoodTier(wealthTier)
  const birthNeighborhoodName = pickNamedNeighborhood(birthPlace, birthNeighborhoodTier)

  return {
    firstName, surname, name: `${firstName} ${surname}`,
    country, gender, birthYear, wealthTier, familyStability, familySize,
    initialStats,
    religion, ethnicity, ruralUrban, literate,
    birthPlace, birthNeighborhoodTier, birthNeighborhoodName,
  }
}

export function deriveInitialStats(char) {
  return { ...char.initialStats }
}

export function deriveInitialSiblings(char) {
  const count = Math.min(Math.max(0, char.familySize - 1), 5)
  const c = char.country
  const baseQ = { secure: 78, stable: 65, struggling: 50, unstable: 32 }[char.familyStability] ?? 55
  return Array.from({ length: count }, () => {
    const gender = chance(0.5) ? 'male' : 'female'
    const firstName = pickFrom(gender === 'male' ? c.namePool.male : c.namePool.female)
    return {
      name: `${firstName} ${char.surname}`,
      gender,
      ageDiff: randomBetween(-3, 8),
      alive: true,
      relationshipQuality: clamp(baseQ + randomBetween(-15, 15), 10, 100),
    }
  })
}

export function deriveBirthText(char) {
  const { country, birthYear, familyStability, familySize, wealthTier, firstName, surname } = char
  const arch = country.archetype
  const name = `${firstName} ${surname}`
  const cn = getCountryDisplayName(country, birthYear) // historical name if applicable

  const stabilityCtx = {
    secure: 'into a household of stability and warmth',
    stable: 'to a family of modest means but solid foundations',
    struggling: 'into a family navigating real hardship',
    unstable: 'into difficult circumstances from the first day',
  }[familyStability] ?? 'into the world'

  const archCtx = {
    wealthy_west: `In ${cn} in ${birthYear}, the maternity ward is clean, the forms are in triplicate, and your parents drive home on a road with lane markings.`,
    wealthy_east: `${cn}, ${birthYear}. A modern hospital, careful documentation, grandparents waiting in the corridor with specific opinions about your name.`,
    post_soviet: `${cn}, ${birthYear}. The maternity ward smells of disinfectant. Your mother was not allowed to have your father in the room.`,
    developing_urban: `${cn}, ${birthYear}. The city is enormous and still growing. The neighbourhood you are born into will shape everything that follows.`,
    developing_unstable: `${cn}, ${birthYear}. The country is in motion — politically, economically, always. You arrive ${stabilityCtx}.`,
    subsaharan: `${cn}, ${birthYear}. You are born ${stabilityCtx}${familySize > 4 ? ', the newest in a large family' : ''}. The sun is already through the window.`,
    conflict_zone: `${cn}, ${birthYear}. You are born during a time of conflict. Your mother's first priority was keeping you safe.`,
    wealthy_gulf: `${cn}, ${birthYear}. The hospital is modern, the air conditioning precise. You are born into a country of vast resources and layered rules.`,
  }[arch] ?? `${name} enters the world in ${cn}, ${birthYear}.`

  return archCtx
}

export function deriveInitialMoney(char) {
  const base = { 0: 0, 1: 300, 2: 2000, 3: 12000, 4: 60000 }
  const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
  const mult = gdpMult[char.country.gdp] ?? 1.0
  return Math.round(((base[char.wealthTier] ?? 0) + randomBetween(-200, 200) * char.wealthTier) * mult)
}

// ─── GDP multiplier (shared across wealth mechanics) ─────────────────────────
const GDP_MULT = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }

// ─── Wealth tier labels (archetype-aware) ────────────────────────────────────
const WEALTH_TIER_LABEL_MAP = {
  0: { default: 'Destitute', wealthy_west: 'Destitute', subsaharan: 'Extreme poverty', post_soviet: 'Desperate' },
  1: { default: 'Poor', wealthy_west: 'Working poor', subsaharan: 'Very poor', post_soviet: 'Struggling', wealthy_east: 'Lower working class' },
  2: { default: 'Working class', wealthy_west: 'Working class', subsaharan: 'Low income', post_soviet: 'Ordinary', developing_urban: 'Lower middle class', wealthy_gulf: 'Modest' },
  3: { default: 'Middle class', wealthy_west: 'Middle class', subsaharan: 'Middle class', post_soviet: 'Comfortable', developing_urban: 'Middle class', wealthy_gulf: 'Comfortable' },
  4: { default: 'Wealthy', wealthy_west: 'Affluent', subsaharan: 'Elite', post_soviet: 'Privileged', developing_urban: 'Upper class', wealthy_east: 'Affluent', wealthy_gulf: 'Wealthy' },
}
export function getWealthTierLabel(tier, archetype) {
  const row = WEALTH_TIER_LABEL_MAP[tier] ?? WEALTH_TIER_LABEL_MAP[3]
  return row[archetype] ?? row.default
}

// ─── Gold / jewelry initial value ────────────────────────────────────────────
export function deriveInitialGold(char) {
  const archetype = char.country?.archetype
  const gdp = char.country?.gdp
  const mult = GDP_MULT[gdp] ?? 0.2
  const goldCultures = ['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka',
    'Saudi Arabia', 'UAE', 'Iran', 'Egypt', 'Morocco', 'Ghana', 'Nigeria',
    'Ethiopia', 'Turkey', 'Vietnam', 'China', 'South Korea', 'Indonesia']
  const isGoldCulture = goldCultures.includes(char.country?.name) ||
    (archetype === 'subsaharan' && char.wealthTier >= 2)
  if (!isGoldCulture) return 0
  const base = { 0: 0, 1: 60, 2: 300, 3: 1200, 4: 6000 }[char.wealthTier] ?? 0
  if (base === 0) return 0
  // Female characters hold significantly more gold — jewelry is their financial security
  const genderMult = char.gender === 'female' ? 1.9 : 0.6
  return Math.round(base * mult * genderMult * (0.7 + Math.random() * 0.6))
}

// ─── Banking access at birth ──────────────────────────────────────────────────
export function initializeBanked(char) {
  const archetype = char.country?.archetype
  const year = char.birthYear
  const tier = char.wealthTier
  if (['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(archetype)) return year > 1945 ? true : tier >= 2
  if (archetype === 'post_soviet') return tier >= 1
  if (archetype === 'developing_urban') {
    if (year < 1970) return tier >= 3
    if (year < 1995) return tier >= 2
    return tier >= 1
  }
  if (archetype === 'subsaharan') {
    if (year < 2000) return tier >= 3
    return tier >= 2 // mobile money era lowers the barrier
  }
  if (['conflict_zone', 'developing_unstable'].includes(archetype)) return tier >= 4
  return tier >= 2
}

// ─── Joint / extended family status at birth ─────────────────────────────────
export function initializeJointFamily(char) {
  const jointFamilyCountries = ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal']
  if (!jointFamilyCountries.includes(char.country?.name)) return false
  const eraFactor = char.birthYear < 1970 ? 0.72 : char.birthYear < 1990 ? 0.55 : 0.38
  const ruralFactor = char.ruralUrban === 'rural' ? 1.3 : 0.75
  const wealthFactor = char.wealthTier <= 2 ? 1.1 : char.wealthTier >= 4 ? 0.65 : 1.0
  return Math.random() < clamp(eraFactor * ruralFactor * wealthFactor, 0, 0.92)
}

// ─── Generational trauma flag seeding ────────────────────────────────────────
// Returns an array of flags to seed at game start based on country + birth year.
// These represent family memory of atrocities the parent/grandparent generation survived.
export function deriveGenerationalFlags(char) {
  const { country, birthYear } = char
  if (!country || !birthYear) return []
  const flags = []
  const cn = country.name

  if (cn === 'Germany' && birthYear >= 1940 && birthYear <= 1960) flags.push('holocaust_family_memory')
  if (cn === 'China' && birthYear >= 1950 && birthYear <= 1972) flags.push('great_leap_family_memory')
  if (cn === 'China' && birthYear >= 1962 && birthYear <= 1980) flags.push('cultural_revolution_family')
  if (cn === 'Cambodia' && birthYear >= 1975 && birthYear <= 1992) flags.push('khmer_rouge_family_memory')
  if (['Russia', 'Ukraine', 'Kazakhstan', 'Georgia'].includes(cn) && birthYear >= 1930 && birthYear <= 1955) flags.push('gulag_family_memory')
  if (cn === 'Japan' && birthYear >= 1945 && birthYear <= 1965) flags.push('hiroshima_family_memory')
  if (cn === 'India' && birthYear >= 1947 && birthYear <= 1965) flags.push('partition_family_memory')
  if (cn === 'Nigeria' && birthYear >= 1968 && birthYear <= 1982) flags.push('biafra_family_memory')
  if (cn === 'Argentina' && birthYear >= 1976 && birthYear <= 1990) flags.push('disappeared_family_memory')
  if (cn === 'Chile' && birthYear >= 1973 && birthYear <= 1988) flags.push('pinochet_family_memory')
  if (cn === 'South Africa' && birthYear >= 1960 && birthYear <= 1980) flags.push('apartheid_family_memory')
  if (cn === 'Vietnam' && birthYear >= 1975 && birthYear <= 1990) flags.push('reunification_family_memory')
  if (cn === 'Ethiopia' && birthYear >= 1977 && birthYear <= 1992) flags.push('red_terror_family_memory')
  if (['Rwanda', 'Burundi'].includes(cn) && birthYear >= 1994 && birthYear <= 2010) flags.push('genocide_family_memory')
  if (cn === 'Iran' && birthYear >= 1979 && birthYear <= 1995) flags.push('revolution_family_memory')
  if (cn === 'DR Congo' && birthYear >= 1996 && birthYear <= 2010) flags.push('congo_war_family_memory')

  return flags
}

// ─── Household contribution calculation ──────────────────────────────────────
export function calculateHouseholdContribution(state) {
  const archetype = state.character?.country?.archetype
  const gdp = state.character?.country?.gdp
  const income = state.career ? state.career.salary : 0
  if (income <= 0) return { annualAmount: 0, obligationType: null }

  const parentsAlive = state.parents?.mother?.alive || state.parents?.father?.alive

  const cfg = {
    subsaharan:          { rate: 0.22, type: 'extended_family', persists: true  },
    developing_urban:    { rate: 0.16, type: 'filial',          persists: false },
    wealthy_east:        { rate: 0.13, type: 'filial',          persists: false },
    post_soviet:         { rate: 0.07, type: 'filial',          persists: false },
    developing_unstable: { rate: 0.18, type: 'extended_family', persists: true  },
    conflict_zone:       { rate: 0.21, type: 'extended_family', persists: true  },
    wealthy_west:        { rate: 0.0,  type: null,              persists: false },
    wealthy_gulf:        { rate: 0.0,  type: 'zakat',           persists: false },
  }[archetype] ?? { rate: 0, type: null, persists: false }

  // Zakat is 2.5% of savings above nisab, not income-based
  if (cfg.type === 'zakat') {
    const mult = GDP_MULT[gdp] ?? 0.2
    const nisab = 5000 * mult
    if ((state.money ?? 0) > nisab) return { annualAmount: Math.round((state.money ?? 0) * 0.025), obligationType: 'zakat' }
    return { annualAmount: 0, obligationType: 'zakat' }
  }

  if (cfg.rate === 0) return { annualAmount: 0, obligationType: cfg.type }

  let rate = cfg.rate
  if (!parentsAlive) rate *= cfg.persists ? 0.55 : 0.15
  if (state.householdContribution?.reduced) rate *= 0.5

  // Survival floor: don't drain to zero
  const mult = GDP_MULT[gdp] ?? 0.2
  if ((state.money ?? 0) < 400 * mult) rate *= 0.2

  return { annualAmount: Math.round(income * rate), obligationType: cfg.type }
}

// ─── Financial reputation display ────────────────────────────────────────────
export function getFinancialReputationDisplay(state) {
  const archetype = state.character?.country?.archetype
  const year = state.currentYear ?? 2000
  const cs = state.creditScore ?? 700
  const banked = state.banked ?? false
  const rosca = state.rosca

  if (archetype === 'wealthy_west') {
    if (year >= 1985 && banked) return { type: 'credit_score', value: cs }
    if (banked) return { type: 'bank_standing', label: 'Bank standing', value: cs >= 700 ? 'Good' : cs >= 600 ? 'Fair' : 'Poor' }
    return null
  }
  if (archetype === 'wealthy_east') {
    if (year >= 1992 && banked) return { type: 'credit_score', value: cs }
    return null
  }
  if (archetype === 'wealthy_gulf') {
    return { type: 'islamic_finance', label: 'Islamic finance standing', value: (state.debt ?? 0) === 0 ? 'Good standing' : 'Has obligations', zakatDue: state.householdContribution?.annualAmount > 0 }
  }
  if (archetype === 'post_soviet') {
    if (year >= 2005 && banked) return { type: 'credit_score', value: cs }
    const m = state.money ?? 0
    return { type: 'network_standing', label: 'Network standing', value: m > 8000 ? 'Well-connected' : m > 1500 ? 'Reliable' : 'Precarious' }
  }
  if (archetype === 'subsaharan') {
    if (rosca) return { type: 'rosca', label: 'Savings circle', value: 'Member in good standing', monthlyContribution: rosca.monthlyContribution, payoutYear: rosca.nextPayoutYear }
    const m = state.money ?? 0
    return { type: 'community_standing', label: 'Community standing', value: m > 5000 ? 'Respected' : m > 500 ? 'Known' : 'Struggling' }
  }
  if (archetype === 'developing_urban') {
    if (banked && year >= 1995) return { type: 'credit_score', value: cs }
    if (rosca) return { type: 'rosca', label: 'Savings circle', value: 'Member', monthlyContribution: rosca.monthlyContribution, payoutYear: rosca.nextPayoutYear }
    return null
  }
  if (archetype === 'conflict_zone') return null
  if (banked) return { type: 'credit_score', value: cs }
  return null
}

// ─── Hyperinflation detection ─────────────────────────────────────────────────
const HYPERINFLATION_PERIODS = [
  { country: 'Germany',   start: 1921, end: 1923, severity: 'extreme'  },
  { country: 'Hungary',   start: 1945, end: 1946, severity: 'extreme'  },
  { country: 'China',     start: 1946, end: 1949, severity: 'severe'   },
  { country: 'Bolivia',   start: 1984, end: 1986, severity: 'severe'   },
  { country: 'Brazil',    start: 1989, end: 1994, severity: 'severe'   },
  { country: 'Argentina', start: 1988, end: 1991, severity: 'severe'   },
  { country: 'Peru',      start: 1988, end: 1991, severity: 'severe'   },
  { country: 'Russia',    start: 1992, end: 1994, severity: 'moderate' },
  { country: 'Ukraine',   start: 1993, end: 1995, severity: 'severe'   },
  { country: 'Romania',   start: 1990, end: 1993, severity: 'moderate' },
  { country: 'Zimbabwe',  start: 2007, end: 2009, severity: 'extreme'  },
  { country: 'Venezuela', start: 2016, end: 2025, severity: 'severe'   },
  { country: 'Turkey',    start: 2021, end: 2025, severity: 'moderate' },
  { country: 'Lebanon',   start: 2020, end: 2025, severity: 'severe'   },
]
const HYPERINFLATION_DRAIN = { moderate: 0.22, severe: 0.55, extreme: 0.88 }

function getHyperinflation(countryName, year, flags) {
  if (flags?.includes?.('hyperinflation_active')) return { severity: 'severe' }
  return HYPERINFLATION_PERIODS.find(h => h.country === countryName && year >= h.start && year <= h.end) ?? null
}

// ─── Parent occupation assignment ─────────────────────────────────────────────
// Returns an occupation object for a parent based on wealth tier, archetype, birth year,
// gender, and family stability. Base salaries are in very_high GDP units; they get
// scaled by GDP_MULT at display / tick time.
function assignParentOccupation(wealthTier, archetype, birthYear, gender, familyStability) {
  // Income types: 'formal' | 'informal' | 'subsistence' | 'barter' | 'none'
  const isMother = gender === 'female'

  // Mothers in many historical/cultural contexts were homemakers or informal workers.
  // Post-Soviet and wealthy_west post-1960 had high formal female employment.
  const motherFormalChance = (() => {
    if (archetype === 'post_soviet') return 0.92
    if (archetype === 'wealthy_west') return birthYear >= 1970 ? 0.72 : birthYear >= 1950 ? 0.45 : 0.2
    if (archetype === 'wealthy_east') return 0.65
    if (archetype === 'wealthy_gulf') return birthYear >= 1990 ? 0.35 : 0.1
    if (archetype === 'subsaharan') return 0.45 // informal trade common
    if (archetype === 'developing_urban') return 0.55
    return 0.5
  })()
  const motherWorks = isMother ? (familyStability !== 'unstable' ? Math.random() < motherFormalChance : Math.random() < 0.3) : false

  if (isMother && !motherWorks && !['post_soviet', 'wealthy_east'].includes(archetype)) {
    return { title: 'Homemaker', field: 'domestic', incomeType: 'none', annualIncome: 0, incomeNote: null }
  }

  // Occupation pools: [title, field, incomeType, baseSalary]
  // baseSalary is in very_high GDP dollars; multiply by GDP_MULT[gdp] to get local equivalent
  const pools = {
    wealthy_west: [
      [['Unemployed'], ['Unemployed', 'none', 'none', 0]],
      [['Day Laborer', 'Factory Worker', 'Farmhand', 'Cleaner'], ['trade', 'formal', 'formal', 18000]],
      [['Factory Worker', 'Bus Driver', 'Post Office Worker', 'Tradesman', 'Police Officer'], ['trade', 'formal', 'formal', 28000]],
      [['Teacher', 'Accountant', 'Manager', 'Engineer', 'Nurse'], ['education', 'formal', 'formal', 48000]],
      [['Lawyer', 'Doctor', 'Business Owner', 'Senior Manager'], ['professional', 'formal', 'formal', 95000]],
    ],
    wealthy_east: [
      [['Day Laborer'], ['trade', 'informal', 'informal', 8000]],
      [['Factory Worker', 'Driver'], ['trade', 'formal', 'formal', 16000]],
      [['Office Worker', 'Civil Servant', 'Teacher'], ['education', 'formal', 'formal', 30000]],
      [['Engineer', 'Manager', 'Doctor'], ['professional', 'formal', 'formal', 55000]],
      [['Business Owner', 'Lawyer', 'Executive'], ['professional', 'formal', 'formal', 110000]],
    ],
    post_soviet: [
      [['Unemployed', 'Seasonal Worker'], ['trade', 'none', 'none', 0]],
      [['Factory Worker', 'Construction Worker'], ['trade', 'formal', 'formal', 10000]],
      [['Factory Worker', 'Teacher', 'Civil Servant', 'Driver'], ['trade', 'formal', 'formal', 12000]],
      [['Engineer', 'Doctor', 'Academic', 'Civil Servant'], ['professional', 'formal', 'formal', 16000]],
      [['Senior Official', 'Business Owner', 'Factory Director'], ['professional', 'formal', 'formal', 40000]],
    ],
    wealthy_gulf: [
      [['Day Laborer', 'Migrant Worker'], ['trade', 'informal', 'informal', 10000]],
      [['Driver', 'Shop Worker'], ['trade', 'formal', 'formal', 20000]],
      [['Civil Servant', 'Teacher'], ['education', 'formal', 'formal', 35000]],
      [['Engineer', 'Manager', 'Doctor'], ['professional', 'formal', 'formal', 65000]],
      [['Business Owner', 'Senior Official'], ['professional', 'formal', 'formal', 150000]],
    ],
    developing_urban: [
      [['Subsistence Farmer', 'Day Laborer'], ['agriculture', 'subsistence', 'subsistence', 0]],
      [['Market Trader', 'Day Laborer', 'Domestic Worker'], ['trade', 'informal', 'informal', 4000]],
      [['Civil Servant', 'Teacher', 'Shopkeeper', 'Driver'], ['trade', 'formal', 'formal', 8000]],
      [['Engineer', 'Doctor', 'Business Owner', 'Government Official'], ['professional', 'formal', 'formal', 20000]],
      [['Senior Official', 'Merchant', 'Business Executive'], ['professional', 'formal', 'formal', 55000]],
    ],
    subsaharan: [
      [['Subsistence Farmer'], ['agriculture', 'subsistence', 'subsistence', 0]],
      [['Smallholder Farmer', 'Market Trader', 'Craftsman'], ['agriculture', 'informal', 'informal', 3000]],
      [['Teacher', 'Civil Servant', 'Shopkeeper'], ['education', 'formal', 'formal', 7000]],
      [['Doctor', 'Government Official', 'Business Owner'], ['professional', 'formal', 'formal', 18000]],
      [['Senior Official', 'Merchant', 'Business Executive'], ['professional', 'formal', 'formal', 45000]],
    ],
    developing_unstable: [
      [['Subsistence Farmer', 'Day Laborer'], ['agriculture', 'subsistence', 'subsistence', 0]],
      [['Smallholder Farmer', 'Street Vendor'], ['agriculture', 'informal', 'informal', 3000]],
      [['Civil Servant', 'Teacher', 'Trader'], ['trade', 'formal', 'formal', 7000]],
      [['Doctor', 'Business Owner', 'Government Official'], ['professional', 'formal', 'formal', 18000]],
      [['Senior Official', 'Merchant'], ['professional', 'formal', 'formal', 40000]],
    ],
    conflict_zone: [
      [['Displaced', 'Unemployed'], ['none', 'none', 'none', 0]],
      [['Day Laborer', 'Farmer'], ['agriculture', 'informal', 'informal', 2000]],
      [['Trader', 'Civil Servant'], ['trade', 'informal', 'informal', 5000]],
      [['Doctor', 'Teacher', 'Aid Worker'], ['professional', 'formal', 'formal', 12000]],
      [['Business Owner', 'Senior Official'], ['professional', 'formal', 'formal', 30000]],
    ],
  }

  const archetypePool = pools[archetype] ?? pools.developing_urban
  const tierEntry = archetypePool[clamp(wealthTier, 0, 4)] ?? archetypePool[2]
  const [titles, [field, incomeType, , baseSalary]] = tierEntry

  // Special handling for Soviet era barter: before 1991, Soviet workers had wages
  // but consumer goods were scarce — income was real but purchasing power limited.
  const postSovietCollapse = archetype === 'post_soviet' && birthYear >= 1991 && wealthTier <= 1
  const actualIncomeType = postSovietCollapse ? 'informal' : incomeType

  // Subsistence and barter economies: provide food/shelter but minimal cash
  const incomeNote = incomeType === 'subsistence'
    ? 'provides food and shelter'
    : incomeType === 'barter' ? 'paid in kind' : null

  return {
    title: pickFrom(titles),
    field,
    incomeType: actualIncomeType,
    annualIncome: baseSalary,
    incomeNote,
  }
}

export function deriveInitialParents(char) {
  const { country, familyStability, wealthTier, birthYear, surname } = char
  const arch = country.archetype
  const motherFirst = pickFrom(country.namePool.female)
  const fatherFirst = pickFrom(country.namePool.male)
  const altSurname = pickFrom(country.surnames)
  const baseQ = { secure: 82, stable: 68, struggling: 48, unstable: 28 }[familyStability] ?? 55
  const fatherPresent = familyStability !== 'unstable' || chance(0.55)
  return {
    mother: {
      name: `${motherFirst} ${surname}`,
      currentAge: randomBetween(22, 34),
      alive: true,
      relationshipQuality: clamp(baseQ + randomBetween(-10, 10), 12, 100),
      traits: pickTraits(ADULT_TRAITS),
      occupation: assignParentOccupation(wealthTier, arch, birthYear, 'female', familyStability),
    },
    father: {
      name: `${fatherFirst} ${altSurname}`,
      currentAge: randomBetween(24, 40),
      alive: fatherPresent,
      relationshipQuality: fatherPresent ? clamp(baseQ + randomBetween(-15, 10), 8, 100) : 0,
      traits: fatherPresent ? pickTraits(ADULT_TRAITS) : [],
      occupation: fatherPresent
        ? assignParentOccupation(wealthTier, arch, birthYear, 'male', familyStability)
        : null,
    },
  }
}

// ─── Family income tick (childhood) ──────────────────────────────────────────
// Runs each year when age < 18 and player has no career.
// Calculates parental income surplus that flows into state.money.
// Handles parent death, conflict zone disruption, post-Soviet collapse.
export function tickFamilyIncome(state) {
  if ((state.age ?? 0) >= 18 || state.career) return state
  const parents = state.parents
  if (!parents) return state

  const gdp = state.character?.country?.gdp ?? 'medium'
  const arch = state.character?.country?.archetype ?? 'developing_urban'
  const year = state.currentYear ?? state.character?.birthYear ?? 1980
  const mult = GDP_MULT[gdp] ?? 0.2
  const tier = state.classTier ?? state.character?.wealthTier ?? 2

  // Annual surplus that flows to child's accessible money (as % of parental income)
  // Tier 0 families have no surplus — everything goes to survival
  const surplusRates = { 0: 0.0, 1: 0.05, 2: 0.10, 3: 0.18, 4: 0.28 }
  const surplusRate = surplusRates[tier] ?? 0.10

  let totalParentalIncome = 0

  for (const key of ['father', 'mother']) {
    const parent = parents[key]
    if (!parent || !parent.alive || !parent.occupation) continue
    const occ = parent.occupation
    if (occ.incomeType === 'none' || occ.incomeType === 'subsistence' || occ.incomeType === 'barter') continue

    // Apply GDP scaling and annual variance
    const scaled = Math.round(occ.annualIncome * mult)
    const variancePct = occ.incomeType === 'informal' ? randomBetween(-35, 50) : randomBetween(-12, 18)
    const annual = Math.max(0, Math.round(scaled * (1 + variancePct / 100)))
    totalParentalIncome += annual
  }

  // Post-Soviet collapse: dramatic income reduction 1991–1994
  if (arch === 'post_soviet' && year >= 1991 && year <= 1994) {
    totalParentalIncome = Math.round(totalParentalIncome * 0.25)
  }

  // Conflict zone: income may disappear during active displacement
  if (arch === 'conflict_zone' && state.flags?.includes('war_childhood')) {
    totalParentalIncome = 0
  }

  // Income reduction if a parent (earner) died during childhood
  if (state.mem?.primaryEarnerLostAge && state.age > state.mem.primaryEarnerLostAge) {
    totalParentalIncome = Math.round(totalParentalIncome * 0.35)
  }

  const surplus = Math.round(totalParentalIncome * surplusRate)
  if (surplus <= 0) return state

  const newMoney = (state.money ?? 0) + surplus
  const wealthLevel = clamp(Math.round((Math.log10(Math.max(1, newMoney)) - 2.5) * 22), 5, 98)
  return {
    ...state,
    money: newMoney,
    stats: { ...state.stats, wealth: wealthLevel },
  }
}

// ─── Formatted parent income display ─────────────────────────────────────────
// Returns a human-readable income string for the UI.
export function formatParentIncome(occupation, gdp) {
  if (!occupation) return null
  const { incomeType, annualIncome, incomeNote, title } = occupation
  if (incomeType === 'none') return 'No income'
  if (incomeType === 'subsistence') return incomeNote ?? 'provides food and shelter'
  if (incomeType === 'barter') return incomeNote ?? 'paid in kind'
  if (!annualIncome) return null
  const mult = GDP_MULT[gdp] ?? 0.2
  const scaled = Math.round(annualIncome * mult)
  if (scaled < 50) return '< $50/yr'
  const fmt = scaled >= 1000 ? `$${(scaled / 1000).toFixed(1)}k/yr` : `$${scaled}/yr`
  return incomeType === 'informal' ? `~${fmt}` : fmt
}

// ─── Stat proxy ───────────────────────────────────────────────────────────────

function createProxy(state) {
  return {
    h: 0, m: 0, w: 0, e: 0, s: 0, lo: 0, r: 0, mo: 0, karma: 0, fame: 0,
    flags: [...state.flags],
    mem: { ...(state.mem ?? {}) },
  }
}

function applyProxy(state, proxy) {
  const stats = {
    health:    clamp(state.stats.health    + proxy.h,  0, 100),
    happiness: clamp(state.stats.happiness + proxy.m,  0, 100),
    wealth:    clamp(state.stats.wealth    + proxy.w,  0, 100),
    smarts:    clamp(state.stats.smarts    + proxy.e,  0, 100),
    charisma:  clamp(state.stats.charisma  + proxy.s,  0, 100),
    looks:     clamp(state.stats.looks     + proxy.lo, 0, 100),
  }
  const regret = clamp(state.regret + proxy.r, 0, 100)
  const money  = Math.max(0, (state.money ?? 0) + (proxy.mo ?? 0))
  const karma  = clamp((state.karma ?? 50) + (proxy.karma ?? 0), 0, 100)
  const fame   = clamp((state.fame ?? 0) + (proxy.fame ?? 0), 0, 100)
  const flags  = [...new Set(proxy.flags)]
  return { ...state, stats, regret, money, karma, fame, flags, mem: proxy.mem }
}

function applyNaturalAging(state) {
  const { age, stats } = state
  let { happiness, health, smarts, looks, charisma } = stats
  happiness += (50 - happiness) * 0.04
  if (age > 75) health -= 1.0
  else if (age > 60) health -= 0.7
  else if (age > 40) health -= 0.5
  if (age > 70) looks -= 0.5
  else if (age > 50) looks -= 0.6
  else if (age > 30) looks -= 0.4
  if (age > 75) smarts -= 0.3

  // Fitness decay
  let fitness = state.fitness ?? 50
  if (age >= 50) fitness -= 1
  else if (age >= 30) fitness -= 0.5
  fitness = clamp(fitness, 0, 100)

  // Fitness feedback
  if (fitness >= 70) looks = clamp(looks + 0.2, 0, 100)
  if (fitness < 30) health = clamp(health - 0.3, 0, 100)

  return {
    ...state,
    fitness,
    stats: {
      ...stats,
      happiness: clamp(happiness, 0, 100),
      health:    clamp(health,    0, 100),
      smarts:    clamp(smarts,    0, 100),
      looks:     clamp(looks,     0, 100),
      charisma:  clamp(charisma,  0, 100),
    },
  }
}

function buildEffectProxy(state) {
  const proxy = createProxy(state)
  // Read-only state accessors for effects that need to branch on character context
  proxy._state = state
  proxy._age = state.age
  // Flags that carry emotional weight and deserve memory-layer prose years later
  const TIMESTAMPED_FLAGS = new Set([
    'knows_failure', 'lab_crossed_line', 'solidarity_proven', 'compromised',
    'art_in_drawer', 'runner_habit', 'music_private', 'writing_in_drawer',
    'lost_parent_father', 'lost_parent_mother', 'lost_friend', 'widowed',
    'famine_memory', 'experienced_racism', 'lgbtq_family_rejection',
    'boarding_school', 'first_love_over', 'cancer_survivor',
    'affair_brief_secret', 'affair_not_taken', 'emigrated',
    'divorced', 'business_failed', 'graduated',
    'chernobyl_liquidator', 'grew_up_polluted', 'industrial_upbringing', 'oil_delta_witness',
    'uyghur_suppressed', 'kafala_documented', 'forced_harvest', 'ebola_survivor',
    'experienced_miscarriage', 'multiple_miscarriage', 'sibling_estranged', 'grief_drinking',
  ])
  proxy.addFlag = (flag) => {
    if (!proxy.flags.includes(flag)) {
      proxy.flags.push(flag)
      if (TIMESTAMPED_FLAGS.has(flag)) {
        proxy.mem[`${flag}Year`] = state.currentYear
      }
    }
  }
  proxy.clearFlag = (flag) => { proxy.flags = proxy.flags.filter(f => f !== flag) }
  proxy.setEducation = (level, field = null) => {
    proxy._newEducation = { level, field: field ?? state.education.field }
  }
  proxy.setCareer = (careerId) => { proxy._newCareerId = careerId }
  proxy.clearCareer = () => { proxy._clearCareer = true }
  proxy.setPartner = (partner) => { proxy._newPartner = partner }
  proxy.clearPartner = () => { proxy._clearPartner = true }
  proxy.addChild = (child) => { proxy._newChild = child }
  proxy.addFriend = (friend) => {
    if (!proxy._newFriends) proxy._newFriends = []
    proxy._newFriends.push(friend)
  }
  proxy.makeFriend = (quality = 65) => {
    const c = state.character.country
    const gender = chance(0.5) ? 'male' : 'female'
    const name = `${pickFrom(gender === 'male' ? c.namePool.male : c.namePool.female)} ${pickFrom(c.surnames)}`
    if (!proxy._newFriends) proxy._newFriends = []
    proxy._newFriends.push({ name, alive: true, relationshipQuality: clamp(quality + randomBetween(-10, 10), 20, 95) })
  }
  proxy.setGpa = (gpa) => { proxy._newGpa = gpa }
  proxy.setEnrolled = (enrollment) => { proxy._newEnrolled = enrollment }
  proxy.setMem = (key, value) => { proxy.mem[key] = value }
  proxy.wipeMoney = (fraction = 1.0) => { proxy.mo -= Math.round((state.money ?? 0) * fraction) }
  proxy.updateChildRel = (idx, delta) => {
    if (!proxy._childRelDeltas) proxy._childRelDeltas = {}
    proxy._childRelDeltas[idx] = (proxy._childRelDeltas[idx] ?? 0) + delta
  }
  proxy.updateFriendRel = (idx, delta) => {
    if (!proxy._friendRelDeltas) proxy._friendRelDeltas = {}
    proxy._friendRelDeltas[idx] = (proxy._friendRelDeltas[idx] ?? 0) + delta
  }
  proxy.killPartner = () => { proxy._killPartner = true }
  proxy.releaseFromPrison = () => { proxy._releaseFromPrison = true }
  proxy.killParent = (which) => { proxy._killParent = which }
  proxy.setResidency = (status) => { proxy._residencyStatus = status }
  proxy.setReligion = (religion) => { proxy._religion = religion }
  proxy.setClassTier = (tier) => { proxy._classTier = tier }
  proxy.setMentalHealth = (updates) => { proxy._mentalHealthUpdates = { ...(proxy._mentalHealthUpdates ?? {}), ...updates } }
  proxy.setDesire = (key) => { proxy._desire = key }
  proxy.setPolitical = (leaning) => { proxy._politicalLeaning = leaning }
  proxy.addCondition = (id, severity = 'moderate') => {
    if (!proxy._newConditions) proxy._newConditions = []
    proxy._newConditions.push({ id, severity, diagnosedYear: state.currentYear, managed: false })
  }
  proxy.manageCondition = (id, managed = true) => {
    if (!proxy._conditionManagedUpdates) proxy._conditionManagedUpdates = {}
    proxy._conditionManagedUpdates[id] = managed
  }
  proxy.worsenCondition = (id) => {
    if (!proxy._conditionWorsenIds) proxy._conditionWorsenIds = []
    proxy._conditionWorsenIds.push(id)
  }
  proxy.relocate = (placeId, neighborhoodTier) => {
    proxy._relocateTo = placeId
    if (neighborhoodTier) proxy._relocateNeighborhoodTier = neighborhoodTier
  }
  proxy.practiceHobby = (hobbyId, delta = 1) => {
    if (!proxy._hobbyDeltas) proxy._hobbyDeltas = {}
    proxy._hobbyDeltas[hobbyId] = (proxy._hobbyDeltas[hobbyId] ?? 0) + delta
  }
  proxy.addGold = (amount) => { proxy._goldDelta = (proxy._goldDelta ?? 0) + amount }
  proxy.addDebt = (amount) => { proxy._debtDelta = (proxy._debtDelta ?? 0) + amount }
  proxy.setDebt = (val) => { proxy._debtSet = val }
  proxy.setBanked = (val) => { proxy._banked = val }
  proxy.setJointFamily = (val) => { proxy._jointFamily = val }
  proxy.setJointFamilyPool = (val) => { proxy._jointFamilyPool = val }
  proxy.addJointFamilyPool = (delta) => { proxy._jointFamilyPoolDelta = (proxy._jointFamilyPoolDelta ?? 0) + delta }
  proxy.setRosca = (rosca) => { proxy._rosca = rosca }
  proxy.leaveRosca = () => { proxy._rosca = null }
  proxy.convertToHardCurrency = (amount) => { proxy._hardCurrencyAdd = (proxy._hardCurrencyAdd ?? 0) + amount; proxy.mo -= amount }
  proxy.reduceHouseholdContribution = () => { proxy._reduceHouseholdContribution = true }
  proxy.setWorkStatus = (val) => { proxy._workStatus = val }
  proxy.removeFirstVehicle = () => { proxy._removeFirstVehicle = true }
  proxy.removeFirstMortgagedProperty = () => { proxy._removeFirstMortgagedProp = true }
  proxy.setCreditScore = (val) => { proxy._creditScoreSet = val }
  proxy.partnerRel = (delta) => { proxy._partnerRelDelta = (proxy._partnerRelDelta ?? 0) + delta }
  proxy.updatePartnerRel = proxy.partnerRel
  proxy.addPartnerMoment = (text) => {
    if (!proxy._partnerMomentsToAdd) proxy._partnerMomentsToAdd = []
    proxy._partnerMomentsToAdd.push(text)
  }
  proxy.makePartner = (overrides = {}) => {
    const myGender = state.character.gender
    const isLGBTQ = proxy.flags.includes('lgbtq_identity')
    const preferredGender = isLGBTQ ? myGender : (myGender === 'male' ? 'female' : 'male')
    const gender = overrides.gender ?? preferredGender
    const nameGender = gender === 'non-binary' ? pickFrom(['male', 'female']) : gender
    const c = state.character.country
    const name = `${pickFrom(nameGender === 'male' ? c.namePool.male : c.namePool.female)} ${pickFrom(c.surnames)}`
    const age = clamp(randomBetween(Math.max(18, state.age - 5), state.age + 5), 16, 60)
    proxy._newPartner = {
      name, gender, birthGender: gender, age,
      occupation: pickFrom(PARTNER_OCCUPATIONS),
      looks: randomBetween(30, 90),
      smarts: randomBetween(30, 90),
      wealthStat: randomBetween(20, 80),
      craziness: randomBetween(10, 70),
      relationshipQuality: overrides.quality ?? randomBetween(55, 75),
      married: false, engaged: false, years: 0,
      traits: pickTraits(ADULT_TRAITS),
    }
    // Partners met at 28+ have a rising chance of having kids from a prior relationship
    if (state.age >= 28 && !proxy.flags.includes('partner_has_kids')) {
      const kidsChance = clamp((state.age - 22) * 0.018, 0, 0.38)
      if (chance(kidsChance)) proxy.addFlag('partner_has_kids')
    }
  }
  return proxy
}

function genFriendName(state) {
  const c = state.character.country
  const gender = chance(0.5) ? 'male' : 'female'
  return `${pickFrom(gender === 'male' ? c.namePool.male : c.namePool.female)} ${pickFrom(c.surnames)}`
}

function resolveProxyExtras(state, proxy) {
  let next = state
  if (proxy._newEducation)   next = { ...next, education: proxy._newEducation }
  if (proxy._newCareerId)    next = enterCareer(next, proxy._newCareerId)
  if (proxy._clearCareer)    next = { ...next, career: null }
  if (proxy._newPartner !== undefined) next = { ...next, partner: proxy._newPartner }
  if (proxy._clearPartner)   next = { ...next, partner: null }
  if (proxy._newChild)       next = { ...next, children: [...next.children, proxy._newChild] }
  if (proxy._newFriends)     next = { ...next, friends: [...(next.friends ?? []), ...proxy._newFriends] }
  if (proxy._newGpa !== undefined) next = { ...next, gpa: proxy._newGpa }
  if (proxy._newEnrolled !== undefined) {
    next = { ...next, education: { ...next.education, enrolled: proxy._newEnrolled } }
  }
  if (proxy.flags.includes('has_licence')) next = { ...next, licenceObtained: true }
  if (proxy._releaseFromPrison) next = { ...next, inPrison: false, prisonSentence: 0 }
  if (proxy._killParent && next.parents?.[proxy._killParent]) {
    next = { ...next, parents: { ...next.parents, [proxy._killParent]: { ...next.parents[proxy._killParent], alive: false, relationshipQuality: 0 } } }
  }
  if (proxy._residencyStatus) next = { ...next, residencyStatus: proxy._residencyStatus }
  if (proxy._partnerRelDelta && next.partner) {
    next = { ...next, partner: { ...next.partner, relationshipQuality: clamp((next.partner.relationshipQuality ?? 60) + proxy._partnerRelDelta, 0, 100) } }
  }
  if (proxy._killPartner && next.partner) {
    next = { ...next, partner: { ...next.partner, alive: false } }
  }
  if (proxy._childRelDeltas && next.children) {
    next = { ...next, children: next.children.map((c, i) =>
      proxy._childRelDeltas[i] !== undefined
        ? { ...c, relationshipQuality: clamp((c.relationshipQuality ?? 50) + proxy._childRelDeltas[i], 0, 100) }
        : c
    )}
  }
  if (proxy._friendRelDeltas && next.friends) {
    next = { ...next, friends: next.friends.map((f, i) =>
      proxy._friendRelDeltas[i] !== undefined
        ? { ...f, relationshipQuality: clamp((f.relationshipQuality ?? 50) + proxy._friendRelDeltas[i], 0, 100) }
        : f
    )}
  }
  if (proxy._mentalHealthUpdates) next = { ...next, mentalHealth: { ...(next.mentalHealth ?? {}), ...proxy._mentalHealthUpdates } }
  if (proxy._hobbyDeltas) {
    const hobbies = { ...(next.hobbies ?? {}) }
    for (const [k, v] of Object.entries(proxy._hobbyDeltas)) hobbies[k] = Math.min(100, (hobbies[k] ?? 0) + v)
    next = { ...next, hobbies }
  }
  if (proxy._religion !== undefined) next = { ...next, religion: proxy._religion }
  if (proxy._classTier !== undefined) next = { ...next, classTier: proxy._classTier }
  if (proxy._desire !== undefined) next = { ...next, desire: proxy._desire }
  if (proxy._politicalLeaning !== undefined) next = { ...next, political_leaning: proxy._politicalLeaning }
  if (proxy._workStatus !== undefined) next = { ...next, workStatus: proxy._workStatus }
  if (proxy._newConditions?.length) {
    const existing = next.conditions ?? []
    const merged = [...existing]
    for (const nc of proxy._newConditions) {
      if (!merged.some(c => c.id === nc.id)) merged.push(nc)
    }
    next = { ...next, conditions: merged }
  }
  if (proxy._conditionManagedUpdates) {
    const updated = (next.conditions ?? []).map(c =>
      proxy._conditionManagedUpdates[c.id] !== undefined
        ? { ...c, managed: proxy._conditionManagedUpdates[c.id] }
        : c
    )
    next = { ...next, conditions: updated }
  }
  if (proxy._conditionWorsenIds?.length) {
    const SEV_UP = { mild: 'moderate', moderate: 'severe', severe: 'severe' }
    const updated = (next.conditions ?? []).map(c =>
      proxy._conditionWorsenIds.includes(c.id)
        ? { ...c, severity: SEV_UP[c.severity] ?? c.severity }
        : c
    )
    next = { ...next, conditions: updated }
  }
  if (proxy._relocateTo) {
    const destPlace = PLACES.find(p => p.id === proxy._relocateTo)
    if (destPlace) {
      const tier = proxy._relocateNeighborhoodTier ?? pickNeighborhoodTier(next.classTier ?? next.character?.wealthTier ?? 3)
      const nbrName = pickNamedNeighborhood(destPlace, tier)
      next = {
        ...next,
        currentPlace: destPlace,
        currentNeighborhoodTier: tier,
        currentNeighborhoodName: nbrName,
        flags: [...new Set([...next.flags, 'relocated'])],
      }
    }
  }
  if (proxy._goldDelta !== undefined) next = { ...next, gold: Math.max(0, (next.gold ?? 0) + proxy._goldDelta) }
  if (proxy._banked !== undefined) next = { ...next, banked: proxy._banked }
  if (proxy._jointFamily !== undefined) next = { ...next, jointFamily: proxy._jointFamily }
  if (proxy._jointFamilyPool !== undefined) next = { ...next, jointFamilyPool: proxy._jointFamilyPool }
  if (proxy._jointFamilyPoolDelta !== undefined) next = { ...next, jointFamilyPool: Math.max(0, (next.jointFamilyPool ?? 0) + proxy._jointFamilyPoolDelta) }
  if (proxy._rosca !== undefined) next = { ...next, rosca: proxy._rosca }
  if (proxy._hardCurrencyAdd !== undefined) next = { ...next, hardCurrencyReserve: (next.hardCurrencyReserve ?? 0) + proxy._hardCurrencyAdd }
  if (proxy._debtDelta !== undefined) next = { ...next, debt: Math.max(0, (next.debt ?? 0) + proxy._debtDelta) }
  if (proxy._debtSet !== undefined) next = { ...next, debt: Math.max(0, proxy._debtSet) }
  if (proxy._creditScoreSet !== undefined) next = { ...next, creditScore: Math.max(300, Math.min(850, proxy._creditScoreSet)) }
  if (proxy._removeFirstVehicle) {
    const vehicles = next.assets?.vehicles ?? []
    if (vehicles.length > 0) {
      next = { ...next, assets: { ...(next.assets ?? {}), vehicles: vehicles.slice(1) } }
    }
  }
  if (proxy._removeFirstMortgagedProp) {
    const props = next.assets?.properties ?? []
    const idx = props.findIndex(p => p.mortgaged)
    if (idx !== -1) {
      next = { ...next, assets: { ...(next.assets ?? {}), properties: props.filter((_, i) => i !== idx) } }
    }
  }
  if (proxy._reduceHouseholdContribution) next = { ...next, householdContribution: { ...(next.householdContribution ?? {}), reduced: true } }
  // Track year-of-death for grief fog in buildYearTexture
  if (proxy._killParent && next.parents?.[proxy._killParent]) {
    next = { ...next, mem: { ...(next.mem ?? {}), parentDeathYear: next.currentYear } }
  }
  // Track primary earner loss during childhood for tickFamilyIncome
  if (proxy._killParent && next.parents?.[proxy._killParent] && (next.age ?? 99) < 18) {
    const dyingParent = next.parents[proxy._killParent]
    if (dyingParent.occupation && ['formal', 'informal'].includes(dyingParent.occupation.incomeType)) {
      next = { ...next, mem: { ...(next.mem ?? {}), primaryEarnerLostAge: next.age } }
    }
  }
  if (proxy._killPartner && next.partner) {
    next = { ...next, mem: { ...(next.mem ?? {}), partnerDeathYear: next.currentYear } }
  }
  if (proxy._partnerMomentsToAdd?.length) {
    const existing = next.mem?.partnerMoments ?? []
    next = { ...next, mem: { ...(next.mem ?? {}), partnerMoments: [...existing, ...proxy._partnerMomentsToAdd].slice(-12) } }
  }
  return next
}

// ─── Event system ─────────────────────────────────────────────────────────────

// Cooldown-aware availability check. Events with no cooldown fire at most once.
// Events with cooldown: N can fire again N or more years after they last fired.
function isEventAvailable(e, usedEventMap, currentYear) {
  const lastFired = usedEventMap?.get(e.id)
  if (lastFired === undefined) return true
  if (!e.cooldown) return false
  return currentYear - lastFired >= e.cooldown
}

// ── Desire-to-event affinity map ────────────────────────────────────────────
// Each desire maps to an array of id substrings. Events whose id contains any
// of these substrings get a 1.6× weight boost when G.desire matches.
// Desire values are set by events_desires.js via p.setDesire():
// prove_worth, belong, be_seen, safety, connection, leave_mark, freedom, redemption
const DESIRE_PATTERNS = {
  prove_worth: ['career', 'boss', 'raise', 'fame', 'award', 'recog', 'honor', 'prom', 'child_close', 'mentor', 'protege', 'scholarship', 'achieve'],
  belong:      ['friend', 'commun', 'reunion', 'neigh', 'sibling', 'relig', 'club', 'family', 'cultural', 'village', 'diaspora', 'ethnic'],
  be_seen:     ['fame', 'published', 'art_shown', 'nollywood', 'recognition', 'integrity_echo', 'first_', 'award', 'media', 'protest', 'art_'],
  safety:      ['housing', 'debt', 'evict', 'flee', 'insurance', 'stabil', 'relief', 'settle', 'legal', 'parole', 'prison', 'saved', 'asylum'],
  connection:  ['romance', 'partner', 'child', 'rq_partner', 'rq_child', 'rq_friend', 'warmth', 'love', 'reconcil', 'reunion', 'grief', 'men_deepens'],
  leave_mark:  ['legacy', 'business', 'career_define', 'published', 'art', 'mentor', 'protege_surpass', 'both_arcs', 'children', 'plant', 'build'],
  freedom:     ['emigr', 'leave', 'quit', 'escape', 'rebel', 'resist', 'activist', 'politic', 'samizdat', 'dissident', 'refuge', 'arts_censored'],
  redemption:  ['karma', 'forgiv', 'reconcil', 'therapy', 'recovery', 'prison', 'recon_', 'ft_', 'atonement', 'make_peace'],
}

function desireWeight(eventId, desire) {
  if (!desire || !eventId) return 1
  const patterns = DESIRE_PATTERNS[desire]
  if (!patterns) return 1
  return patterns.some(p => eventId.includes(p)) ? 1.6 : 1
}

// Dev mode: set localStorage.setItem('natalis_dev', 'true') to enable pool logging.
function devLogPool(phase, pool, firedId, usedEventMap, phaseEvents) {
  try {
    if (typeof localStorage === 'undefined' || localStorage.getItem('natalis_dev') !== 'true') return
    const skipped = (phaseEvents ?? []).filter(e => !pool.some(p => p.id === e.id))
    console.group(`[natalis] phase:${phase} pool:${pool.length} fired:${firedId ?? 'none'}`)
    if (skipped.length) {
      console.table(skipped.map(e => ({
        id: e.id,
        reason: usedEventMap?.has(e.id) ? (e.cooldown ? 'on cooldown' : 'used') : 'when=false',
      })))
    }
    console.groupEnd()
  } catch (_) { /* localStorage not available in all environments */ }
}

export function getNextEvent(state) {
  const phase = getPhase(state.age)
  const G = buildG(state)
  const usedEventMap = state.usedEventMap ?? new Map()
  const currentYear = state.currentYear ?? 0

  const queueMatch = state.queue.find(e =>
    (e.phase === phase || e.phase == null) && isEventAvailable(e, usedEventMap, currentYear) && (!e.when || e.when(G))
  )
  if (queueMatch) return queueMatch

  // Use phase index; also include phase-agnostic events (phase: null) which rely on their when() guards
  const phaseEvents = [...(EVENTS_BY_PHASE[phase] ?? []), ...(EVENTS_BY_PHASE[null] ?? [])]
  let pool = phaseEvents.filter(e =>
    isEventAvailable(e, usedEventMap, currentYear) && (!e.when || e.when(G)) &&
    (!state.inPrison || e.prisonOk === true)
  )

  if (state.career && !state.inPrison) {
    const careerDef = CAREERS.find(c => c.id === state.career.id)
    if (careerDef?.events?.length) {
      const careerEvents = careerDef.events.filter(e =>
        e.phase === phase && isEventAvailable(e, usedEventMap, currentYear) && (!e.when || e.when(G))
      )
      pool = [...pool, ...careerEvents]
    }
  }

  devLogPool(phase, pool, null, usedEventMap, phaseEvents)

  if (pool.length === 0) return null

  const desire = G.desire
  const totalWeight = pool.reduce((sum, e) => sum + (e.weight ?? 1) * desireWeight(e.id, desire), 0)
  let r = Math.random() * totalWeight
  for (const event of pool) {
    r -= (event.weight ?? 1) * desireWeight(event.id, desire)
    if (r <= 0) return event
  }
  return pool[pool.length - 1]
}

function buildG(state) {
  const flagSet = new FlagSet(state.flags)
  const currentYear = state.currentYear ?? new Date().getFullYear()
  return {
    character: state.character,
    stats: state.stats,
    // FlagSet: O(1) .has() and backward-compatible .includes() for all event guards
    flags: flagSet,
    regret: state.regret,
    age: state.age,
    currentYear,
    career: state.career,
    education: state.education,
    partner: state.partner,
    children: state.children,
    mem: state.mem ?? {},
    criminalRecord: state.criminalRecord ?? [],
    inPrison: state.inPrison,
    wanted: state.wanted ?? false,
    prisonSentence: state.prisonSentence ?? 0,
    money: state.money ?? 0,
    debt: state.debt ?? 0,
    creditScore: state.creditScore ?? 700,
    fitness: state.fitness ?? 50,
    parents: state.parents,
    hooksUpCount: state.hooksUpCount ?? 0,
    karma: state.karma ?? 50,
    fame: state.fame ?? 0,
    siblings: state.siblings ?? [],
    pets: state.pets ?? [],
    assets: state.assets ?? { properties: [], vehicles: [] },
    licenceObtained: state.licenceObtained ?? false,
    retired: state.retired ?? false,
    friends: state.friends ?? [],
    socialMedia: state.socialMedia ?? { followers: 0, verified: false, genre: null },
    martialArts: state.martialArts ?? { discipline: null, belt: 0 },
    birthControl: state.birthControl ?? false,
    gpa: state.gpa ?? null,
    mentalHealth: state.mentalHealth ?? { condition: null, medicating: false, therapy: false },
    hobbies: state.hobbies ?? {},
    // Mutable religion: state.religion overrides character birth religion (for converts, apostates)
    religion: state.religion ?? state.character?.religion ?? 'secular',
    // Mutable classTier: state.classTier overrides birth wealthTier (for class mobility)
    wealthTier: (() => {
      // Dynamic: use actual money + property equity to determine current wealth tier
      // Falls back to classTier (if manually set) or birth tier for young characters
      const birthTier = state.classTier ?? state.character?.wealthTier ?? 3
      const age = state.age ?? 0
      if (age < 18) return birthTier // childhood — birth class determines everything
      const money = state.money ?? 0
      const propValue = (state.assets?.properties ?? []).reduce((s, p) => s + (p.value ?? 0), 0)
      const debt = state.debt ?? 0
      const netWorth = money + propValue - debt
      // Thresholds intentionally broad — events shouldn't be hair-trigger on exact dollar amounts
      if (netWorth >= 1_000_000) return 5
      if (netWorth >= 200_000)   return 4
      if (netWorth >= 30_000)    return 3
      if (netWorth >= 5_000)     return 2
      if (netWorth >= 0)         return 1
      return 0 // negative net worth
    })(),
    ethnicity: state.character?.ethnicity ?? 'local',
    ruralUrban: state.character?.ruralUrban ?? 'urban',
    literate: flagSet.has('became_literate') ? true : (state.character?.literate ?? true),
    regime: getCountryRegime(state.character?.country, currentYear),
    lgbtqCriminalized: isLgbtqCriminalized(state.character?.country, currentYear),
    casteSystem: state.character?.country?.casteSystem ?? false,
    childMarriageRisk: state.character?.country?.childMarriageRisk ?? 0,
    currentCountry: state.currentCountry ?? state.character?.country,
    residencyStatus: state.residencyStatus ?? 'citizen',
    yearsAbroad: state.yearsAbroad ?? 0,
    desire: state.desire ?? null,
    // Place system
    place: state.currentPlace ?? state.character?.birthPlace ?? null,
    birthPlace: state.character?.birthPlace ?? null,
    neighborhood: state.currentNeighborhoodName ?? state.character?.birthNeighborhoodName ?? null,
    neighborhoodTier: state.currentNeighborhoodTier ?? state.character?.birthNeighborhoodTier ?? null,
    political_leaning: state.political_leaning ?? null,
    conditions: state.conditions ?? [],
    gold: state.gold ?? 0,
    householdContribution: state.householdContribution ?? { annualAmount: 0, obligationType: null, reduced: false },
    rosca: state.rosca ?? null,
    jointFamily: state.jointFamily ?? false,
    jointFamilyPool: state.jointFamilyPool ?? 0,
    banked: state.banked ?? false,
    hardCurrencyReserve: state.hardCurrencyReserve ?? 0,
    workStatus: state.workStatus ?? null,
    currentProject: state.currentProject ?? null,
    archetype: state.character?.country?.archetype ?? null,
    // Enriched prose helpers: available in text: (G) => functions
    era: Math.floor(currentYear / 10) * 10,
    capital: state.character?.country?.capital ?? '',
    currency: state.character?.country?.currency ?? '',
    cityName: (state.currentPlace ?? state.character?.birthPlace)?.name ?? state.character?.country?.capital ?? '',
  }
}

// ─── Year texture ─────────────────────────────────────────────────────────────
// Replaces the "A quiet year passes." fallback with flag-aware prose.
// Called only when no event fires. Priority: bereavement > health crisis >
// relationship tension/warmth > post-crisis > cultural conditions > phase > generic.
function buildYearTexture(state) {
  const F = new FlagSet(state.flags ?? [])
  const { partner, children, age, currentYear, mem, career, residencyStatus, yearsAbroad, desire, political_leaning } = state
  const phase = getPhase(age)
  const mh = state.mentalHealth ?? {}

  const yearsSincePartnerDeath = mem?.partnerDeathYear != null ? currentYear - mem.partnerDeathYear : null
  const yearsSinceParentDeath  = mem?.parentDeathYear  != null ? currentYear - mem.parentDeathYear  : null

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

  // ─── GRIEF ───────────────────────────────────────────────────────────────────

  if (F.has('partner_died') && mem?.griefPartnerFirst && !mem?.griefPartnerDating) {
    const name = state.exPartners?.slice(-1)[0]?.name
    return name ? `${name}'s absence is still present in everything.` : 'The house is still the wrong size.'
  }
  if (F.has('partner_died') && !partner) {
    const name = state.exPartners?.slice(-1)[0]?.name
    return name
      ? pick([`You still reach for ${name} sometimes. The habit hasn't broken yet.`, `${name} is still everywhere in the house.`])
      : pick(['Some mornings the quiet is a different kind of quiet.', 'The bed is the same size. You are still adjusting to that.'])
  }
  if (yearsSincePartnerDeath !== null && yearsSincePartnerDeath >= 1 && yearsSincePartnerDeath <= 3) {
    if (yearsSincePartnerDeath === 1) return 'There are still whole days that belong to the grief. Fewer than before.'
    return 'The grief has changed shape. It has not left.'
  }
  if (yearsSincePartnerDeath !== null && yearsSincePartnerDeath >= 4 && yearsSincePartnerDeath <= 5) {
    return 'The grief is quiet enough now that you can sometimes forget it. Not always.'
  }

  if (mem?.griefParentCall && !mem?.griefParentBelongings) {
    return 'Some mornings you reach for the phone before you remember.'
  }
  if (F.has('lost_parent') && !mem?.griefParentYearsLater) {
    return pick([
      'The absence of them is specific. It shows up in strange places.',
      'You find yourself doing things the way they did them without meaning to.',
    ])
  }
  if (yearsSinceParentDeath !== null && yearsSinceParentDeath >= 1 && yearsSinceParentDeath <= 3) {
    return pick([
      'You catch yourself sometimes about to tell them something.',
      'The first year without them has its own texture. You are learning it.',
    ])
  }

  if (F.has('lost_child')) {
    return pick([
      'The year moves. You move with it, or something like you does.',
      'There is a before and an after. You live in the after.',
      'People say time helps. Time passes. That is what time does.',
    ])
  }

  // ─── ACTIVE HEALTH CRISIS ────────────────────────────────────────────────────

  if (F.has('cancer_treatment')) {
    return pick([
      'Treatment continues. You measure time in appointments now.',
      'The body is the main subject of every day.',
      'You have learned more than you wanted to about what the body can endure.',
    ])
  }
  if (mh.condition === 'depression' && !mh.therapy && !mh.medicating) {
    return pick([
      'The days are heavy in ways that are hard to explain to someone who hasn\'t felt it.',
      'You are getting through the days. That is the accurate description.',
      'Getting up is a decision. You don\'t say this to anyone.',
    ])
  }
  if (mh.condition === 'anxiety' && !mh.therapy && !mh.medicating) {
    return pick([
      'There is a low hum underneath everything. You have learned to work around it.',
      'The worry is always there. You have gotten better at not showing it.',
    ])
  }
  if (mh.condition && !mh.therapy && !mh.medicating) {
    return 'Something is off. You are managing, which is not the same as being fine.'
  }

  // ─── PARTNERSHIP QUALITY ─────────────────────────────────────────────────────

  if (partner) {
    const q = partner.relationshipQuality ?? 60
    const pn = partner.name.split(' ')[0]
    const moments = state.mem?.partnerMoments ?? []
    const yrs = partner.years ?? 0

    // Engaged — pre-marriage texture
    if (partner.engaged && Math.random() < 0.45) return pick([
      `You and ${pn} are engaged. That is the word for what you are now — not married yet, but decided.`,
      `The future with ${pn} is still mostly imagined. You are in the interesting gap between the decision and the life.`,
      `You are planning things with ${pn}. Planning a life together is its own phase, different from having one.`,
      `The engagement is new enough that the word still carries a little surprise when you say it.`,
      q > 75
        ? `You and ${pn} are certain about each other. The certainty is a specific feeling you are still getting used to.`
        : `You are engaged to ${pn}. The engagement is real. The doubts are also real. That is probably normal.`,
    ])

    if (q < 28) return pick([
      `You and ${partner.name} are still in the same house. That is accurate and not quite the whole story.`,
      `There are things you and ${pn} no longer say. The list has grown.`,
      yrs >= 15
        ? `${yrs} years and you have become strangers of the specific kind — the kind who know too much about each other to leave easily.`
        : `You and ${pn} are in the same life and not quite in the same life.`,
    ])
    if (q < 40) return pick([
      `You and ${partner.name} are polite in ways you didn't used to have to be.`,
      `You and ${pn} move around each other carefully. Neither of you names it.`,
      yrs >= 20
        ? `Two decades and you and ${pn} have settled into a distance that is too familiar to call unhappiness and too persistent to call fine.`
        : `Something has shifted between you and ${pn}. Neither of you has said it out loud yet.`,
    ])
    // Long-marriage texture — years bracket unlocks specific prose (before moment surfacing)
    if (yrs >= 40 && Math.random() < 0.45) {
      if (q > 65) return pick([
        `Forty years with the same person is long enough that you have lived multiple versions of each other. You are not who ${pn} married. ${pn} is not who you married. The marriage contains everyone you have both been.`,
        `You find ${pn} in the same place at the same time of day you have always found them. The fact of that has accumulated into something you do not have a word for.`,
        `There are things you only understand about yourself because you have been seen by ${pn} for this long. That is not a small thing to have given each other.`,
        `The early years of a marriage are the rehearsal. This, the late years, is the thing itself.`,
      ])
      return pick([
        `Forty years with the same person. You have learned to separate the person from the accumulated weight of everything that has passed between you. Some days this is possible.`,
        `You and ${pn} have made it this far. The making-it-far is real. You try not to measure too carefully what it has cost.`,
      ])
    }
    if (yrs >= 30 && Math.random() < 0.4) {
      if (q > 65) return pick([
        `${pn} knows the version of yourself you have kept from almost everyone else. That is what three decades of the same person buys.`,
        `You have been through enough together that the old arguments don't reach the same depth they used to. You have argued everything already.`,
        `You can read ${pn}'s silences. That took years to learn. You are glad you did the learning.`,
        phase === 'late_life'
          ? `Thirty years. You are old enough to know what it means that you are still here together. You know people who are not.`
          : `Three decades of the same person. The shared history is so thick by now that it is sometimes hard to tell which memories are yours and which belong to both of you.`,
      ])
      return pick([
        `You and ${pn} have settled into something you could not have described at the beginning. It is more complicated than the word marriage and less complicated than the word unhappy.`,
        `Thirty years of being known by the same person. You are no longer sure you know how to be unknown.`,
      ])
    }
    if (yrs >= 20 && Math.random() < 0.35) {
      if (q > 72) return pick([
        `You know ${pn}'s three difficult subjects, their body language in crowds, the sound of their key in the lock from two rooms away. That is the work of years and you have done it.`,
        `${pn} finishes your sentences and gets them right most of the time. After twenty years that is not nothing.`,
        `The early arguments feel like archaeology now — structures you can identify but no longer inhabit.`,
        `You chose ${pn} and kept choosing them and here you are. The simple version of this is still the true one.`,
      ])
      if (q < 52) return pick([
        `You and ${pn} have learned to coexist across two decades without too much friction. You are not sure when coexistence became the goal.`,
        `There is a version of this marriage you imagined at the beginning. You no longer check it against the current version.`,
      ])
    }
    // Surface a specific partner moment (~30% of good years, if moments exist)
    if (q >= 45 && moments.length > 0 && Math.random() < 0.30) {
      return pickFrom(moments)
    }
    // Trait-aware prose for strong relationships
    if (q > 85 && partner.married) {
      const traitLine = partner.traits?.length
        ? pick(TRAIT_PROSE[pickFrom(partner.traits.filter(t => TRAIT_PROSE[t]))] ?? [null])
        : null
      return traitLine ?? pick([
        `A good year with ${partner.name}. The small things are the whole thing, some years.`,
        `You and ${pn} still make each other laugh. That is not nothing after all this time.`,
      ])
    }
    if (q > 78) {
      const traitLine = partner.traits?.length && Math.random() < 0.5
        ? pick(TRAIT_PROSE[pickFrom(partner.traits.filter(t => TRAIT_PROSE[t]))] ?? [null])
        : null
      return traitLine ?? pick([
        `A good year with ${partner.name}. Nothing dramatic — that's how the good ones go.`,
        `${pn} knows what you mean before you finish. That is a specific kind of luck.`,
      ])
    }
  }

  // ─── FAMILY ──────────────────────────────────────────────────────────────────

  // Young children texture — present-tense parenting in young_adult/midlife
  {
    const youngChildren = (children ?? []).filter(c => c.age <= 12 && (c.relationshipQuality ?? 50) >= 55)
    if (youngChildren.length > 0 && (phase === 'young_adult' || phase === 'midlife') && Math.random() < 0.25) {
      const yc = youngChildren[Math.floor(Math.random() * youngChildren.length)]
      const cn = yc.name?.split(' ')[0] ?? 'your child'
      const ya = yc.age ?? 6
      return pick([
        `${cn} is ${ya}. The world is still explicable to them. Some days it seems more explicable to them than to you.`,
        `${cn} has a specific question every morning before breakfast. You don't always have the answer. You try.`,
        ya <= 5
          ? `${cn} is at the age where everything is new. Being around that is both exhausting and something else.`
          : `${cn} is at school. That is a new country they go to every morning and come back from changed, incrementally.`,
        `The ${ya}-year-old logic of ${cn} is both wrong and completely coherent from the inside. You are learning to follow it.`,
        youngChildren.length > 1
          ? `You are outnumbered by small people who trust you completely. This is among the most complicated feelings available.'`
          : `The specific way ${cn} laughs at something they find funny — you would not trade that for anything available at your age.`,
      ])
    }
    const teenChildren = (children ?? []).filter(c => c.age >= 13 && c.age <= 17 && (c.relationshipQuality ?? 50) >= 55)
    if (teenChildren.length > 0 && (phase === 'young_adult' || phase === 'midlife') && Math.random() < 0.2) {
      const tc = teenChildren[Math.floor(Math.random() * teenChildren.length)]
      const cn = tc.name?.split(' ')[0] ?? 'your teenager'
      return pick([
        `${cn} is ${tc.age}. The negotiations required at this age are different from all the previous negotiations.`,
        `${cn} is at the age where you can see who they are becoming and you can't see all of it. That is by design, you understand.`,
        `${cn} is unreachable some days and then sits next to you and talks for an hour. You have learned not to schedule the second kind.`,
        `The relationship with ${cn} right now is the most complex relationship in your life. That is not a criticism.`,
      ])
    }
  }

  const estrangedChild = (children ?? []).find(c => c.age >= 18 && (c.relationshipQuality ?? 50) < 32)
  if (estrangedChild) {
    const cn = estrangedChild.name.split(' ')[0]
    if (phase === 'late_life') return pick([
      `${cn} does not call. You have stopped expecting the call and started expecting to have to manage not expecting it.`,
      `There is a version of your family that would include ${cn}. You carry that version into your late years. It is not light.`,
      `You are old enough now to see that the distance between you and ${cn} may not close before one of you is gone. You sit with this.`,
      `You did something, or failed to do something, and ${cn} holds it. You understand the holding even when you disagree with the account.`,
    ])
    return pick([
      `You haven't spoken to ${cn} in a while. The silence has a weight.`,
      `There is a version of your family that would include ${cn}. You carry that version.`,
      `${cn}'s absence from the table. You have learned to set the table without a place for it.`,
      `Something between you and ${cn} has not resolved. You are not sure if it is resolvable. You are not sure you have done everything you could to make it resolvable.`,
    ])
  }

  // Close children in late life — abroad or distant
  if (phase === 'late_life' && (children ?? []).length > 0) {
    const aboadChildren = (children ?? []).filter(c => c.age >= 18 && (c.relationshipQuality ?? 50) >= 50)
    if (aboadChildren.length > 0 && F.has('children_abroad_separation')) {
      const cn = aboadChildren[0].name.split(' ')[0]
      return pick([
        `${cn} calls on Sunday. You have learned to hold an entire week of things to say compressed into the duration of a phone call.`,
        `The grandchildren exist on a screen. You know their voices before you know the weight of them.',`,
        `The distance between you and ${aboadChildren[0].name.split(' ')[0]} is in kilometres and in the specific things that don't arrive over video call.`,
      ])
    }
    const closeChildren = (children ?? []).filter(c => c.age >= 18 && (c.relationshipQuality ?? 50) >= 70)
    if (closeChildren.length > 0) {
      const cn = closeChildren[0].name.split(' ')[0]
      if (Math.random() < 0.3) return pick([
        `${cn} visits on Sunday. You have stopped pretending you don't count the Sundays.`,
        `The relationship with ${cn} in these years is the longest conversation you have ever had with anyone. It contains everything.`,
      ])
    }
  }

  if (F.has('reconciled_damaged') && (children ?? []).some(c => c.age >= 18)) {
    return pick([
      'The repair is slow. You are grateful for slow.',
      'Things with your child are better. Not what they were. Better.',
      phase === 'late_life' ? 'You repaired it before it was too late. That is the sentence you want to be able to say and you can say it.' : 'The repair is ongoing. That is still better than the alternative.',
    ])
  }

  // ─── SIBLING TEXTURE ──────────────────────────────────────────────────────────

  {
    const sibs = state.siblings ?? []
    const closeSib = sibs.find(s => s.alive && (s.relationshipQuality ?? 50) >= 68)
    if (closeSib && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.18) {
      const sn = closeSib.name.split(' ')[0]
      if (phase === 'late_life') return pick([
        `${sn} is one of the few people who knew you before you became the person you are. There is a specific relief in not having to explain your origins.`,
        `You and ${sn} speak on the phone with the ease of people who have been having the same conversation, in different forms, for decades.`,
        `${sn} was there from the beginning. You have moved through different versions of yourself and ${sn} has known all of them. That is a particular kind of being known.`,
        `The relationship with ${sn} in your later years is a long thread that started before you had any say in who would be at the other end.`,
      ])
      return pick([
        `You and ${sn} are at different points in lives that started from the same place. You find this interesting.`,
        `${sn} is having a difficult year. You are not sure how much to offer and how much to leave alone. You navigate this.`,
        `${sn} calls. The conversation covers the usual territory. Some conversations don't need to break new ground to be worth having.`,
        `You and ${sn} are still in each other's lives. That is not guaranteed — you know families where it is not — and you don't take it for granted.`,
      ])
    }
    const deadSib = sibs.find(s => !s.alive)
    if (deadSib && F.has('lost_sibling') && phase === 'late_life' && Math.random() < 0.15) {
      const sn = deadSib.name.split(' ')[0]
      return pick([
        `You are one of the people who remember ${sn} as they were. That becomes, in time, a responsibility you did not ask for.`,
        `${sn} would have been ${age + Math.abs(deadSib.ageDiff ?? 0)} this year. You note it and move through it.`,
        `You are the last one who remembers certain things about ${sn}. You try to hold them carefully.`,
      ])
    }
  }

  // ─── POST-CRISIS ADJUSTMENT ───────────────────────────────────────────────────

  if (F.has('recently_released')) {
    return pick([
      'You are getting used to being outside again. It takes longer than people say it will.',
      'Freedom has a specific texture you didn\'t expect. You are learning it.',
    ])
  }
  if ((F.has('divorced') || F.has('breakup')) && !partner && phase === 'midlife') {
    return pick([
      'The first years alone have their own specific calendar.',
      'You are relearning how to be a single person. It takes longer than you thought.',
    ])
  }
  if ((F.has('divorced') || F.has('breakup')) && !partner && phase === 'young_adult') {
    return 'You are learning that some things end, and the world keeps going regardless.'
  }
  if (F.has('business_failed') && !F.has('business_started')) {
    return pick([
      'You think about the business sometimes. Less than before, but still.',
      'The failure has a particular shape you carry into the next thing.',
    ])
  }
  if (F.has('in_recovery')) {
    return pick([
      'One day at a time is not a cliché. It is the actual method.',
      'The work of staying clean is invisible to most people. You do it anyway.',
    ])
  }
  if (F.has('survived_bombardment')) {
    return 'The war is over, or over here. The sounds stay for a while.'
  }

  // ─── PET TEXTURE ──────────────────────────────────────────────────────────────

  {
    const pets = state.pets ?? []
    const livingPet = pets.find(p => p.alive)
    if (livingPet && Math.random() < 0.18) {
      const pn = livingPet.name
      const sp = livingPet.species
      const pAge = livingPet.age ?? 0
      if (pAge >= 10) return pick([
        `${pn} is old now — ${pAge} years. Old ${sp}s are their own kind of companion, requiring things and giving things in a different register than they used to.`,
        `${pn} moves more slowly than before. You have stopped pretending you don't track this.`,
        phase === 'late_life'
          ? `You and ${pn} are both in your later years. That parallel is something you don't examine too closely.`
          : `You've had ${pn} for ${pAge} years. There is a depth to that which you didn't anticipate when you got a ${sp}.`,
      ])
      if (pAge >= 4) return pick([
        `${pn} is part of the household in the way that is hard to articulate until someone who has never had a ${sp} tries to understand it.`,
        `The specific companionship of ${pn} is not nothing. In some years it is the whole thing.`,
        `${pn} meets you at the door. That is a small fact that organises the end of certain days.`,
      ])
      return pick([
        `${pn} the ${sp} is new enough to the household that everyone is still adjusting to the presence.`,
        `Getting a ${sp} was a decision. You are learning what the decision entails.`,
      ])
    }
    const recentlyDeadPet = pets.find(p => !p.alive && (p.age ?? 0) >= 5)
    if (recentlyDeadPet && mem?.petDeathYear && (currentYear - mem.petDeathYear) <= 2 && Math.random() < 0.3) {
      return pick([
        `${recentlyDeadPet.name} is gone. The grief for a ${recentlyDeadPet.species} is real and slightly embarrassing to claim and real.`,
        `The house is different without ${recentlyDeadPet.name} in it. You are still finding the spots where the absence is.`,
      ])
    }
  }

  // ─── FRIEND TEXTURE ───────────────────────────────────────────────────────────
  {
    const frs = state.friends ?? []
    const livingClose = frs.filter(f => f.alive !== false && (f.relationshipQuality ?? 50) >= 72)
    const livingDistant = frs.filter(f => f.alive !== false && (f.relationshipQuality ?? 50) < 45)
    const deadFriend = frs.find(f => f.alive === false)
    if (livingClose.length > 0 && Math.random() < 0.2) {
      const fr = livingClose[Math.floor(Math.random() * livingClose.length)]
      const fn = fr.name?.split(' ')[0] ?? 'your friend'
      const yrs = fr.yearsKnown ?? fr.metAge ?? null
      return pick([
        `${fn} is still there. That is a fact that gets more specific with every year.`,
        yrs && yrs > 10
          ? `You have known ${fn} for long enough that some of your shared history predates who you both are now.`
          : `${fn} understands the current version of the problem before you've finished explaining it. That's what this friendship is.`,
        phase === 'late_life'
          ? `${fn} is one of the people who knew you before the version of yourself you're most comfortable with. That matters.`
          : phase === 'midlife'
            ? `${fn} and you disagree on some things now. The disagreements don't cost the friendship anything.`
            : `${fn} is the kind of friend you compare others to without quite meaning to.`,
        `The call with ${fn} took two hours and resolved nothing and was the best part of the week.`,
      ])
    }
    if (livingDistant.length > 0 && Math.random() < 0.15) {
      const fr = livingDistant[Math.floor(Math.random() * livingDistant.length)]
      const fn = fr.name?.split(' ')[0] ?? 'someone you used to know'
      return pick([
        `You and ${fn} have grown in different directions. You are not sure when the drift became structural.`,
        `${fn} crosses your mind sometimes. You don't reach out. You're not entirely sure why.`,
        phase === 'late_life'
          ? `There are people from earlier in your life — ${fn} is one — who you have lost without a specific ending.`
          : `The friendship with ${fn} requires more maintenance than it used to. You are providing less of it than you should.`,
      ])
    }
    if (deadFriend && mem?.friendDeathYear && (currentYear - mem.friendDeathYear) <= 3 && Math.random() < 0.25) {
      const fn = deadFriend.name?.split(' ')[0] ?? 'your friend'
      return pick([
        `${fn} is gone. The full meaning of that is still arriving.`,
        `${fn}. You keep editing thoughts to send them and stopping.`,
        phase === 'late_life'
          ? `Losing ${fn} rearranges the late-life map. There are fewer people who knew you from the early versions.`
          : `The absence of ${fn} has a specific texture that generalised grief doesn't cover.`,
      ])
    }
  }

  // ─── UNEMPLOYMENT TEXTURE ─────────────────────────────────────────────────────

  if (!career && !state.retired && !F.has('semi_retired') && !F.has('retired') &&
      (phase === 'young_adult' || phase === 'midlife') &&
      age >= 22 && age < 62 && Math.random() < 0.28) {
    if (F.has('automation_displaced') || F.has('career_disrupted')) return pick([
      'The industry did not need you anymore. You are finding out what you are without the work that defined the last decade.',
      'The displacement happened to a lot of people at the same time. That doesn\'t make your specific situation easier.',
      phase === 'midlife'
        ? 'At this age, without the job title, you are learning what else you are. The answer is in progress.'
        : 'You are figuring out what the career becomes from this point. That is the whole question.',
    ])
    return pick([
      'You are between jobs. The between is longer than the phrase suggests.',
      'The structure of a working day is something you took for granted. Its absence has a specific texture.',
      'Looking for work takes the time of a full-time job with the pay of no job. You are doing this.',
      phase === 'midlife'
        ? 'The CV does not adequately represent the person who wrote it. This is always true and feels especially true when you are trying to find work.'
        : 'You have not found the thing yet. You are in the finding-the-thing phase.',
      partner
        ? `${partner.name.split(' ')[0]} is working. You are not. You are learning how to hold that without it becoming about something it is not about.`
        : 'The days have a gap in them that the work used to fill. You are filling it with the search and with other things.',
    ])
  }

  // ─── CRIMINAL RECORD AMBIENT ──────────────────────────────────────────────────

  {
    const crimRecord = state.criminalRecord ?? []
    if (crimRecord.length > 0 && !state.inPrison && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.2) {
      const hasViolent = crimRecord.some(r => r.category === 'violent')
      if (hasViolent) return pick([
        'The record includes what it includes. You have stopped expecting it to say something other than what it says.',
        'Some things you did are documented. The documentation is permanent. You are working out what to do with a permanent thing.',
        phase === 'late_life'
          ? 'You are a different person from the one in the record. The record has not updated to reflect this. Records don\'t.'
          : 'The violent conviction is there. You carry it without, most days, leading with it. That is the work.',
      ])
      return pick([
        'There is a box on the form. You know the box. You have learned the specific texture of the pause before you mark it.',
        'The record follows you in ways that are not dramatic — not every day — but appear at the moments that matter.',
        'You have built something on top of the record. The record is still there, underneath. That is the arrangement.',
        phase === 'late_life'
          ? 'Decades past the conviction. The distance is not the same as absence. But it is something.'
          : 'Some opportunities have a requirement that you do not meet. You have learned to identify which ones before applying.',
      ])
    }
  }

  // ─── RESIDENCY / EMIGRANT TEXTURE ────────────────────────────────────────────

  if (residencyStatus === 'undocumented' || residencyStatus === 'tourist_overstay') {
    return pick([
      'You exist in the margins of official life, which has its own routines by now.',
      'You have learned the art of not being noticed. It has costs you don\'t always account.',
    ])
  }
  if (residencyStatus === 'climate_displaced') {
    return 'You are here because you had to be. That is not the same as being home.'
  }
  if (F.has('emigrated') && (yearsAbroad ?? 0) <= 2 && (yearsAbroad ?? 0) > 0) {
    return pick([
      'You are still learning what normal means here.',
      'The customs are mostly decipherable now. Mostly.',
    ])
  }
  if (F.has('emigrated') && (yearsAbroad ?? 0) >= 3 && (yearsAbroad ?? 0) <= 6) {
    return pick([
      'You have made a life here. It is a real life, not a placeholder.',
      'The old country comes back in dreams, sometimes. The new one is where you are when you wake.',
    ])
  }
  if (F.has('emigrated') && (yearsAbroad ?? 0) > 10) {
    return pick([
      'There is a version of you that stayed. You don\'t think about it much.',
      'This is where you live now. The word home has become complicated.',
      'You have been gone long enough that going back would be its own kind of leaving.',
    ])
  }

  // ─── AUTHORITARIAN / CONFLICT CONTEXT ────────────────────────────────────────

  if (F.has('learned_silence') || F.has('authoritarian_childhood')) {
    return pick([
      'Another year of knowing what not to say in which room.',
      'There are two conversations: the one you have, and the one underneath it.',
    ])
  }
  if (F.has('dissident_writer') || F.has('dissident_reader')) {
    return 'You continue. That is its own form of argument.'
  }

  // ─── FLAG-AWARE TEXTURE ──────────────────────────────────────────────────────

  if (F.has('famine_memory') && Math.random() < 0.3) return pick([
    'The pantry is full. You check it anyway.',
    'You do not leave food on the plate. Your children don\'t understand why.',
  ])
  if (F.has('civil_rights_generation') && phase === 'late_life') return pick([
    'You have lived long enough to see some of what you fought for become unremarkable. That is what winning looks like.',
    'The young people don\'t know what this cost. That is also what winning looks like.',
  ])
  if (F.has('independence_generation_self') && phase === 'late_life') {
    return 'You were there when the flag went up. You have lived long enough to know what came after.'
  }
  if (F.has('boarding_school') && phase === 'young_adult') return pick([
    'You notice you have trouble asking for things. You are not sure where that started.',
    'Institutions feel familiar in ways that aren\'t comfortable to examine.',
  ])
  if (F.has('first_gen_university') && career) return pick([
    'You are the first in your family to have this kind of year. That means something, even when you forget it.',
    'There is no map for where you are. You are making one.',
  ])
  if (F.has('oral_historian') && phase === 'late_life') {
    return 'They come to you with questions now. You try to answer accurately.'
  }
  if (F.has('elder_authority') && phase === 'late_life') {
    return 'The weight of being consulted is real. You have learned to carry it carefully.'
  }
  if (F.has('is_mentor') && (phase === 'midlife' || phase === 'late_life')) {
    return 'You see something in the younger one that reminds you of an earlier version of yourself. You try not to say so.'
  }
  if (F.has('lost_mentor') && phase === 'midlife') {
    return 'There is no one left who knew you before you knew yourself. That is a specific kind of alone.'
  }

  // ─── PAKISTAN TEXTURE ─────────────────────────────────────────────────────
  if (F.has('muhajir_identity') && Math.random() < 0.3) return pick([
    'The Urdu your family speaks is not quite the Urdu of anyone around you — too formal, too careful, carrying the register of a city that doesn\'t exist for you anymore.',
    'The question of where you are from has two answers, and which one you give depends on who is asking.',
    'Your parents\' stories of before are so specific — a street, a house, a particular sweet sold at a particular corner — that the before becomes more real than the here.',
  ])
  if (F.has('partition_memory_family') && Math.random() < 0.25) return pick([
    'Something your parents said about 1947 surfaces without warning. The neighbour who helped. The neighbour who didn\'t. You have inherited the distinction.',
    'The partition is not history in your family. It is last week, spoken in the present tense.',
  ])
  if (F.has('zia_generation') && Math.random() < 0.25) return pick([
    'Certain things that were sayable before 1977 are no longer sayable in the same register. You calibrate accordingly.',
    'The public language changed during the Zia years and the private language followed it slowly, which is the more disorienting change.',
  ])
  if (F.has('karachi_violence_generation') && Math.random() < 0.3) return pick([
    'You still read the neighborhoods in Karachi the way you learned to in the 1990s — by what was happening in them at the time, by which routes you took and didn\'t.',
    'The map of the city you carry in your head has layers: before, during, after. The during is the largest layer.',
  ])
  if (F.has('1971_war_lived') && Math.random() < 0.25) return pick([
    '1971 never became a settled story. The official version was produced for official purposes. The actual version is not in the textbooks.',
    'What happened in East Pakistan before December 16, 1971 is a question your country has not finished answering.',
  ])
  if (F.has('womens_rights_restricted') && Math.random() < 0.25) return pick([
    'You learned the law as a set of constraints that applied to you specifically and not to others in the same room. You made the calculations the law required.',
    'The law was signed by someone and operates in the courts. You have lived inside it long enough that the adjustments it required are no longer adjustments — they are just how you move.',
  ])
  if (F.has('nuclear_pakistan_generation') && Math.random() < 0.2) return pick([
    'May 28, 1998: the Chagai tests. For a few weeks the usual divisions closed over a shared pride. The pride was real. The stakes that made it necessary were also real.',
    'You were alive the day Pakistan became a nuclear state. The equation changed, which is what they said. You have been watching the equation ever since.',
  ])
  if (F.has('afghan_crisis_neighbor') && Math.random() < 0.2) return pick([
    'The Kalashnikov culture had a name by the late 1980s — a consequence with an obvious cause. The weapons came back across the border in both directions.',
    'Three million Afghan refugees — the largest population in the world at the time. The crisis was in the news and in what was available on the street.',
  ])
  if (F.has('media_skeptic') && Math.random() < 0.2) return pick([
    'You learned to read the gap between what the broadcast said and what was actually happening. It is a skill that generalizes.',
    'State radio described a situation that was clearly not the situation. The gap was the education. You have not forgotten the lesson.',
  ])
  if (F.has('religious_education') && Math.random() < 0.2) return pick([
    'You read Arabic before you read anything else. The structure of the days was clear and organized around the text.',
    'The education was real — it shaped how you think, what you know, what you hold as given. The question of what it left out is a later question.',
  ])

  // ─── IDENTITY AND EXPERIENCE TEXTURE ─────────────────────────────────────────

  if (F.has('lost_home') && Math.random() < 0.3) return pick([
    phase === 'late_life'
      ? 'The place you grew up in is somewhere. You have not been back, or you went back and it wasn\'t there anymore in the way that mattered. That is its own category of loss.'
      : 'Home is the thing that was there and then wasn\'t. You carry the address in a specific part of memory that other addresses don\'t reach.',
    'You know the smell and the light of a place that no longer belongs to you, or no longer exists, or exists with someone else\'s things in it.',
    phase === 'midlife'
      ? 'You have built something since. It is real. It is not the same.'
      : 'There is the home you lost and then all the other places since. They are places. The first was something else.',
    'The loss of a place is different from other losses because the place often continues to exist — just without you in it.',
  ])
  if (F.has('independent_thinker') && Math.random() < 0.3) return pick([
    phase === 'late_life'
      ? 'You have spent your life reaching your own conclusions. That habit has cost you things. You would still do it.'
      : 'The habit of questioning the given conclusion is still the one that gets you in trouble in certain rooms.',
    'You know the specific loneliness of a position no one else has arrived at yet.',
    phase === 'midlife'
      ? 'You have found, over time, the other people who think this way. They are scattered but they are real.'
      : 'The reflex is to find the flaw in the argument everyone else accepts. Sometimes you wish you couldn\'t.',
    F.has('pragmatic_compliance')
      ? 'There is the self you are and the positions you have taken for practical reasons. You live with both.'
      : 'You have not taken positions you didn\'t hold. That is both a form of integrity and a kind of stubbornness you can\'t entirely defend.',
  ])
  if (F.has('pragmatic_compliance') && Math.random() < 0.3) return pick([
    phase === 'late_life'
      ? 'You made your peace with the system while it lasted. Now it has passed and you are living with the accounting of that peace.'
      : 'You signed what you needed to sign. You joined what you needed to join. You kept your head down and your family fed. That is one way of surviving.',
    'There is a version of yourself that didn\'t comply. You know this person existed as a possibility. You chose differently.',
    F.has('independent_thinker')
      ? 'The gap between what you think and what you signed is a gap you have been living inside for a long time.'
      : 'The compliance was rational at the time. You could reconstruct the logic of it even now. Something else says it wasn\'t.',
    phase === 'midlife'
      ? 'The system you accommodated has changed or ended or weakened. What remains is the knowledge of what you were willing to do to stay inside it.'
      : 'You watch people who refuse similar things and feel something you can\'t name clearly: admiration, or its complicated sibling.',
  ])
  if (F.has('passed_checkpoint') && Math.random() < 0.25) return pick([
    'The body reads the uniform before the thought forms. That reflex is faster than reason and older than most of what you know.',
    phase === 'late_life'
      ? 'You have spent years in places where the checkpoint was part of ordinary life. That knowledge does not leave the nervous system.'
      : 'There is a specific alertness that activates near certain barriers. You have learned to manage it without showing it.',
    'The checkpoint question — where are you going, show your document — has a shape in your memory that routine encounters can still activate.',
  ])
  if (F.has('military_service') && !F.has('deployed_to_conflict') && Math.random() < 0.3) return pick([
    phase === 'late_life'
      ? 'The years of service are somewhere back there. The discipline, the physical life, the particular way of existing alongside people under constraint — it shaped things you still use.'
      : 'You know how to function in hierarchies in a particular way. The knowledge is occasionally useful and occasionally a limitation.',
    'The people you served with had a specific reality. Some of them you are still in contact with. Most you are not.',
    phase === 'midlife'
      ? 'You are of the generation that did service. Your children may not be. The gap between those experiences is larger than you expected it would be.'
      : 'The body remembers a certain posture, a certain readiness. Civilian life runs at a different register. You have translated between them.',
  ])
  if (F.has('gaokao_survivor') && Math.random() < 0.3) return pick([
    phase === 'late_life'
      ? 'The gaokao determined the shape of your life in a way that a single day\'s performance should not be able to. It did. You have been the person the test said you were ever since.'
      : 'You are still, sometimes, performing under examination. That reflex was installed early and has not fully uninstalled.',
    'The specific anxiety of the gaokao — the narrowing of everything to a number on a particular morning — is something your body still knows.',
    phase === 'midlife'
      ? 'You have watched younger people approach the exam with the full knowledge of what it is. The knowledge does not make the watching easier.'
      : 'You passed through the exam season and came out the other side with a number that opened or closed doors. Those doors are the map of your life since.',
  ])
  if (F.has('internet_generation') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.25) return pick([
    'You remember when the world was still mostly offline. The transition has been the texture of your adult life. You are fluent in both registers.',
    phase === 'late_life'
      ? 'You were there for the early internet — the specific sound, the sense of something enormous arriving in stages. You have watched what it became from the beginning.'
      : 'The internet arrived when you were young enough to shape yourself around it and old enough to remember what came before.',
  ])
  if (F.has('experienced_loss') && !F.has('lost_child') && !F.has('lost_parent') && !F.has('widowed') && !F.has('partner_died') && Math.random() < 0.2) return pick([
    'You have lost something that mattered. The specific thing is in a particular place in memory. You know where it is.',
    'Loss accumulates differently from how it arrives. It arrives as an event. It becomes part of the texture.',
  ])
  if (F.has('drug_user') && !F.has('addiction') && !F.has('in_recovery') && Math.random() < 0.2) return pick([
    'You use sometimes. It has stayed at sometimes. You keep a quiet eye on whether that continues to be accurate.',
    'The thing you take sometimes smooths the edge off certain evenings. You have decided that is acceptable. You check the decision occasionally.',
  ])
  if (F.has('violent') && !F.has('violent_criminal') && Math.random() < 0.2) return pick([
    'You know what you are capable of under certain conditions. That knowledge is not comfortable. It is accurate.',
    phase === 'late_life'
      ? 'The person you were in that moment is still part of you. You have spent years deciding what to do with them.'
      : 'There was a moment where you found out where your limits were. They were further than you expected. That is the kind of self-knowledge that changes how you understand other people.',
  ])

  // Career and hobbies
  if (career && F.has('career_fulfilled')) return pick([
    'The work is good. You don\'t say that to people much, but it\'s true.',
    'You are doing the thing you are supposed to be doing. That is rarer than it sounds.',
  ])
  if (career && F.has('career_defining_work')) return 'The best work you have done is behind you. You are learning what comes after best.'
  if (F.has('serious_musician')) return pick([
    'The practice is something you look forward to. That surprises you sometimes.',
    'The music asks for the part of you the day doesn\'t reach.',
    'You can hear the gap between what you play and what you hear in your head. That gap is what you practice toward.',
    phase === 'late_life'
      ? 'You have been playing for decades. The music is something the rest of you has grown around.'
      : 'The practice is the one appointment you rarely cancel.',
    'Music has a way of absorbing the year\'s weather. This year sounds like this year.',
  ])
  if (F.has('serious_writer')) return pick([
    'The pages accumulate. You don\'t show them to anyone yet.',
    'You are building something in the hours before and after everything else.',
    'Writing requires you to know what you think. That is sometimes the most useful part of it.',
    phase === 'late_life'
      ? 'You have been writing long enough that the early drafts are unrecognizable as the thing they became. That is not a metaphor.'
      : 'The blank page is the problem you come back to. You are still coming back.',
    'Something from the year found its way onto the page without you exactly choosing it.',
  ])
  if (F.has('serious_artist')) return pick([
    'The work asks things of you that the rest of your life doesn\'t.',
    'The studio is the one place the day doesn\'t follow you.',
    'You are making things you wouldn\'t know how to explain. That\'s how you know they\'re right.',
    phase === 'late_life'
      ? 'The work in your late years is different from the work earlier — freer, or more deliberate, depending on the day.'
      : 'The practice has been going long enough that you have a body of work. You are starting to see its shape.',
    'Art takes the things you can\'t say and makes something else out of them. This year had material.',
  ])
  if (F.has('fitness_devotee')) return pick([
    'The body is a project. You are consistent about it in a way you are not consistent about many things.',
    phase === 'late_life'
      ? 'The body requires more maintenance than it used to. You provide it. The return on investment has changed.'
      : 'The run, the lift, the session — these anchor the week. When they don\'t happen the week feels off.',
    'There is a specific satisfaction in doing a physical thing well. You have not gotten tired of it.',
    'You are stronger or faster or more capable than you were a year ago. The direction is clear.',
  ])
  if (F.has('dedicated_gardener') && (phase === 'midlife' || phase === 'late_life')) {
    return pick([
      'The garden is the same thing every year and different every year.',
      'Something about watching things grow slowly is useful to you.',
      'The garden requires patience and responds to patience. That is a relationship worth having.',
      phase === 'late_life'
        ? 'You have been growing things for many years. You know the garden\'s patterns the way you know old friends — their bad habits, their reliable moments.'
        : 'The garden doesn\'t care about the rest of the day. You go into it and the day doesn\'t follow you.',
    ])
  }
  if (F.has('avid_reader')) return pick([
    phase === 'late_life'
      ? 'You are working through the books you always meant to read. Some of them are as good as promised.'
      : 'You are reading more than you used to. That is a sign of something — time, or need, or both.',
    'The book you finished last week is still with you. That is the test of a book.',
    phase === 'late_life'
      ? 'The reading in your later years has a different quality — not the ambition of keeping up, but the pleasure of going deep.'
      : 'You read the way some people run — not competitively, but because not doing it costs something.',
  ])
  if (F.has('cooking_serious') && Math.random() < 0.3) return pick([
    'The cooking is the activity that is also thinking. You go in with a problem and come out having made something.',
    'You know what the food is supposed to taste like before you start. That knowledge took years to develop.',
    phase === 'midlife' || phase === 'late_life'
      ? 'The table you set for other people is one of the ways you take care. That is a language you have been developing.'
      : 'You cook for yourself and for other people. The for-other-people version is better.',
  ])
  {
    const meditationScore = state.hobbies?.meditation ?? 0
    if (meditationScore >= 20 && Math.random() < 0.22) return pick([
      'The practice is the thing you return to when the week has been the kind of week it has been.',
      meditationScore >= 60
        ? 'The stillness is not the absence of the noise. It is learning to notice the noise without becoming it.'
        : 'You sit with it. The ten minutes or twenty minutes that cost nothing and return something hard to name.',
      'The meditation is a form of arriving in the day rather than being launched into it. You have learned this.',
    ])
  }
  if (F.has('chernobyl_liquidator') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.35) return pick([
    'The body keeps its own account. You are not always told what it is recording.',
    'You do not mention Chernobyl to doctors unless they ask. They ask less than you expected.',
    'There is a whole cohort of you. You are in touch with some of them. The news from that direction is rarely good.',
  ])
  if (F.has('grew_up_polluted') && phase === 'midlife' && Math.random() < 0.3) return pick([
    'The river from your childhood comes back sometimes. The colour of it. The absence of the fish.',
    'You understand now what the adults knew and didn\'t say about the water.',
  ])
  if (F.has('industrial_upbringing') && phase === 'midlife' && Math.random() < 0.3) return pick([
    'You still know which wind direction means bad air. Old knowledge, hard to unlearn.',
    'The neighbourhood you grew up in is doing better or worse than it was. Probably worse.',
  ])
  if ((F.has('debt_spiral_experienced') || F.has('debt_collector_known')) && phase === 'midlife' && Math.random() < 0.3) return pick([
    'The numbers are manageable now. You check them more often than you need to.',
    'The habit of counting what is owed is hard to put down even when the answer is fine.',
  ])

  // ─── TRAUMA AND LOSS TEXTURE ─────────────────────────────────────────────────

  if (F.has('war_childhood') && Math.random() < 0.35) return pick([
    phase === 'late_life'
      ? 'You grew up in a war. That is the deepest layer. Everything else was built on top of it.'
      : 'The sounds from childhood are not the sounds most people carry. You know this now.',
    'There are things that are still loud for you that are quiet for other people.',
    'You read the room the way someone reads a room where something has happened before.',
  ])
  if (F.has('genocide_survivor') && Math.random() < 0.35) return pick([
    phase === 'young_adult'
      ? 'The fact of having survived is not something you have finished with. You are still inside the accounting of it.'
      : phase === 'midlife'
        ? 'You have built a life in the years since. The life is real. So is what preceded it.'
        : 'You have outlived what was meant to erase you. The years themselves are the argument you were not supposed to make.',
    'There is a gap between what happened and what can be said about it. You live in that gap without remarking on it.',
    phase === 'late_life'
      ? 'People want the story compressed into something they can receive. You know what the compression costs.'
      : 'The ordinary day — coffee, a colleague\'s complaint, traffic — and underneath it, the thing you carry. You have learned to hold both.',
    'The arithmetic of who survived is not something you have made peace with. You are not sure peace is the right ambition.',
    'There are people who are not here who should be here. You know their names. Some days you run through them.',
    phase !== 'young_adult'
      ? 'You watch how the world handles its memory of it — the politics of naming, what gets taught, what gets elided. You have an investment in accuracy that most people don\'t.'
      : 'The world continues. You continue with it. That is both survival and something harder to name.',
  ])
  if (F.has('civil_war_lived') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'The civil war is the line that divides your memory into before and after.',
    'You know what your country did to itself. That knowledge sits in a particular place.',
    'The country rebuilt itself. You rebuilt with it. You are not sure the reconstruction is finished.',
  ])
  if (F.has('lira_collapse_lived') && Math.random() < 0.35) return pick([
    phase === 'late_life'
      ? 'You grew up knowing that savings are a story a government tells you. You stopped believing the story early.'
      : 'The number in the account is still there. You stopped trusting what numbers mean.',
    'You learned to do the exchange rate conversion without thinking — old reflex, wrong country, still running.',
    'The economist on the radio uses words like \'correction\' and \'stabilisation\'. You have heard these words before.',
  ])
  if (F.has('reconstruction_generation') && phase === 'late_life' && Math.random() < 0.3) return pick([
    'You lived through the rebuilding. You thought it had worked. You were wrong about the foundation.',
    'The downtown they built in the nineties was beautiful and is now rubble again. You watched both.',
  ])
  if (F.has('decennie_noire_memory') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.35) return pick([
    'The decade is not one you discuss in full. There are people still in positions of authority who were on the other side of it. You know which rooms they are in.',
    'The Black Decade. Ten years that your country has not agreed on how to call. The amnesty provisions mean everyone goes on living in the same places. You have learned where not to look.',
    phase === 'late_life'
      ? 'You have outlasted the decade that tried to erase people like you. The specific accounting of that — who survived, who didn\'t, what it cost — is still not finished.'
      : 'Something in the news from elsewhere — a journalist threatened, a government claiming order — and the nineties are back in a specific way. Not nostalgic. The opposite of nostalgic.',
  ])
  if (F.has('infrastructure_collapse_lived') && Math.random() < 0.3) return pick([
    'You wake up and check the generator without thinking. The habit is faster than the thought.',
    'You know which tasks to do when the electricity is on and which ones can wait. You resent knowing this.',
  ])
  if (F.has('conflict_zone_childhood') && Math.random() < 0.3) return pick([
    'Some ordinary things still feel like a gift — running water, a day without a siren.',
    'You grew up learning the shape of danger. Some of that knowledge is still useful.',
  ])
  if (F.has('political_prisoner') && !F.has('inPrison') && phase !== 'young_adult' && Math.random() < 0.3) return pick([
    'You have been inside. The fact of it is with you in ordinary rooms.',
    'What happened to you at the hands of the state is the kind of thing that reorganises everything else.',
    phase === 'late_life'
      ? 'They put you in prison for what you believed. You are still here. That is its own kind of testimony.'
      : 'The years inside changed what you need, what you fear, and what you will not accept.',
  ])
  if (F.has('torture_survived') && Math.random() < 0.3) return pick([
    'The body keeps the record longer than the mind wants it to.',
    'What was done to you in that room is not something you carry in one place. It is distributed.',
    phase === 'late_life'
      ? 'You have lived long enough to see some of those who did it face questions. Not all of them. Not enough.'
      : 'You know things about human capacity — your own and others\' — that you wish you didn\'t know.',
  ])
  if (F.has('traumatized_by_violence') && Math.random() < 0.3) return pick([
    'There is a category of knowledge you carry that most people don\'t have. You did not choose to have it.',
    'The nervous system has its own memory. Faster than thought, older than language.',
    phase === 'late_life'
      ? 'You have spent decades learning to live alongside what you saw. It is still there. So are you.'
      : 'You know how to move through most situations. There are specific situations where you know this in a different way.',
  ])
  if (F.has('abusive_relationship') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'You still notice, sometimes, the reflex — the calculation of mood, the body\'s alertness to tone.',
    'You left. That was the hardest thing you\'ve done and it doesn\'t have a ceremony.',
    'You are in a different life now. The old one still has a gravity you sometimes feel.',
  ])
  if (F.has('double_consciousness') && Math.random() < 0.3) return pick([
    'You move between worlds. The fluency costs something. You have stopped counting what.',
    'There is the self you are in one room and the self you are in another. Both are real.',
    phase === 'late_life'
      ? 'You have been translating yourself your entire life. That is a kind of labour that doesn\'t retire.'
      : 'The navigation is automatic now. That doesn\'t mean it\'s gone.',
  ])
  if (F.has('permanently_estranged') && Math.random() < 0.3) return pick([
    'The door has been closed for long enough that it\'s the shape of the wall now.',
    'You do not think about them every day. Some days you don\'t think about them at all. Then a day comes when you do.',
    'The estrangement is permanent. You have accepted that in some part of yourself.',
  ])
  if (F.has('sibling_estranged') && Math.random() < 0.3) return pick([
    phase === 'young_adult'
      ? 'You and your sibling are not speaking. You don\'t know how permanent this is. Some days you think about reaching out. You don\'t reach out.'
      : phase === 'midlife'
        ? 'The estrangement is old enough now that it has become structural. You have stopped performing openness to reconnection you don\'t fully feel.'
        : 'Your sibling is somewhere in the world. You have not spoken in years. You have organised your later life around that fact.',
    'There are conversations you will not be able to have when the time comes. You have started to understand what that means.',
    'The falling out was real. What is harder to hold is that the love was also real, and probably still is, in whatever form love takes when it is not being expressed.',
    phase === 'late_life'
      ? 'Someone at a family event mentions them. You receive the mention with a face that gives nothing away. You have had practice.'
      : 'A mutual family member mentions them in passing. You ask something neutral. You leave the conversation knowing as little as you needed to know.',
    'Your sibling is somewhere. You don\'t always know the specifics. You are not entirely sure whether that is a choice or an accommodation.',
  ])
  if (F.has('lost_sibling') && Math.random() < 0.3) return pick([
    'Your sibling is gone. The particular absence of someone who knew you from the beginning is its own category.',
    'There are references only they would have understood. You keep making them to no one.',
    phase === 'late_life'
      ? 'You are the last one who remembers certain things. That is a weight you were not warned about.'
      : 'The sibling-shaped space in your life has a specific contour. You have learned its shape.',
  ])
  if (F.has('multiple_miscarriage') && Math.random() < 0.35) return pick([
    phase === 'young_adult'
      ? 'The hope came more than once. The specific quality of hoping again, knowing what came before, is what you have not been able to explain to anyone who wasn\'t there.'
      : phase === 'late_life'
        ? 'There were pregnancies that didn\'t continue. More than one. You folded each loss into yourself and continued. They are still folded in there.'
        : 'The body tried, more than once. The trying and the not-arriving are both part of what the year carries.',
    'A due date passed without arriving. You still know which month. That knowledge doesn\'t require summoning — it arrives on its own.',
    partner
      ? `You and ${partner.name.split(' ')[0]} are different for it. Not worse than you might have been. Different.`
      : 'You processed most of it without much support. That was the circumstance. The circumstance shaped things in ways you are still accounting for.',
    phase === 'late_life'
      ? 'The grief was real and most people around you never knew. That was the arrangement: you carried it in private, and that arrangement has never fully ended.'
      : 'What you hoped for each time had a specific shape. Losing the shape, repeatedly, is what the grief actually is.',
  ])
  if (F.has('experienced_miscarriage') && !F.has('multiple_miscarriage') && Math.random() < 0.30) return pick([
    phase === 'young_adult'
      ? 'The body did something and then didn\'t. The clinical language doesn\'t cover the thing itself. You know the gap between those two things now.'
      : phase === 'late_life'
        ? 'There was a pregnancy that didn\'t continue. It is part of the map of your life. You know where it sits.'
        : 'The loss was real, even without a name for it, even without a ceremony. You know what you lost.',
    partner
      ? `You told ${partner.name.split(' ')[0]} first. That conversation is part of what you are made of now.`
      : 'You processed it largely alone, not entirely by choice. You learned what the private version of that grief requires.',
    phase === 'midlife'
      ? 'You have made something of your life since then. The loss is still in the architecture.'
      : 'It comes back occasionally, specific and complete. It doesn\'t require explanation.',
  ])
  if (F.has('bereaved') && !F.has('lost_parent') && !F.has('lost_child') && !F.has('widowed') && Math.random() < 0.25) return pick([
    'Someone is gone from your life who cannot be replaced by someone else.',
    'The grief from last year is quieter. It hasn\'t left. It has found a different room.',
  ])
  if (F.has('aids_crisis_generation') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'There was a time when the funerals were every few months. You learned to grieve on a schedule, which is a specific kind of damage.',
    'You watched the community thin out in the years when the government had a name for it but not a response to it.',
    phase === 'late_life'
      ? 'Some of the people who should be in this room with you are not. You know their names. You know what they would have become.'
      : 'The losses were so concentrated in such a short span that the grief still has a particular density.',
    'You came of age in an epidemic that the world outside did not treat as a crisis until it was mostly over. You know what that cost.',
    F.has('lgbtq_identity')
      ? 'The community that found you — the community that saved you, in the ways communities save people — was being erased at the same time you were arriving in it.'
      : 'You watched a generation be erased. The machinery of the erasure — the silence, the indifference, the specific bureaucratic cruelty — is not something you forget.',
  ])
  if (F.has('aids_generation') && !F.has('aids_crisis_generation') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'The epidemic took people who should still be here. You carry their absence in a specific way.',
    'You watched a generation thin out faster than it should have. The gaps are still legible to you.',
    'The death rate changed everything. The community after was built around what had been lost.',
  ])
  if (F.has('survived_aids_crisis') && Math.random() < 0.25) return pick([
    'You survived when others didn\'t. The arithmetic of that has never fully resolved.',
    'Your body held when other bodies didn\'t. You still don\'t know entirely what to do with that.',
    phase === 'late_life'
      ? 'You have lived long enough that the medication changed — that the death sentence became a manageable condition for those who got the treatment. That timeline is worth something.'
      : 'The doctors who treated you in those years were working with what existed. Some of them are still there. You have thought about thanking them.',
  ])
  if (F.has('grief_drinking') && !F.has('in_recovery') && Math.random() < 0.3) return pick([
    phase === 'young_adult'
      ? 'You drank your way through the worst of it. You came through. You are keeping an eye on what \'came through\' actually required.'
      : 'There was a period when you drank more than you should have. That was the grief working. You came through the other side of it.',
    'You were not at your best in the year after. You know that. You did what you could with what you had.',
    'The drinking was how you got through it. You got through it. Both things are true.',
    phase === 'late_life'
      ? 'Looking back, you can see the shape of it — the loss, the year of not-coping, the slow return. You are grateful for the return.'
      : 'You have not forgotten what that period felt like. It keeps you honest about certain things.',
  ])
  if (F.has('business_failed_and_restarted') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'You built something that fell, and built again. The second time had a different quality to it.',
    'Failure is information. You collected more than you wanted and used what you could.',
    'The restart was harder than the start. You know that now.',
  ])
  if (F.has('end_of_history_generation') && phase === 'late_life' && Math.random() < 0.3) return pick([
    'You came of age when the answer seemed obvious. The question turned out to be harder than that.',
    'The 90s confidence looks different from here. You believed it, though. That part was real.',
  ])

  // ─── ERA AND IDENTITY TEXTURE ─────────────────────────────────────────────────

  if (F.has('cold_war_generation') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'The world you were born into was divided by something that seemed permanent and then wasn\'t.',
    phase === 'late_life'
      ? 'The Cold War is history to people you know well. To you it was the shape of things.'
      : 'You learned to read the world as two halves. The habit didn\'t fully leave when the wall came down.',
    'There was a specific seriousness to growing up when the stakes felt that large.',
  ])
  if (F.has('berlin_wall_era_lived') && Math.random() < 0.3) return pick([
    'You remember a divided city — or a divided world — as a fact of ordinary life.',
    phase === 'late_life'
      ? 'You watched the wall come down on television. There was a year before that when it could not have happened, and then it did.'
      : 'The border was real in a way that maps don\'t fully convey. People were shot crossing it.',
    'The cold certainty of that era had something in it. It also had something monstrous.',
  ])
  if (F.has('apartheid_era') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'You grew up inside a system that required you to act as if certain things were normal. They weren\'t.',
    phase === 'late_life'
      ? 'The country changed. You changed with it, as much as you could. That process is not finished.'
      : 'What apartheid did to people — all the people in it, in different ways — is not settled yet.',
    'There are things you didn\'t say during those years that you could say now. Some of them you still don\'t.',
  ])
  if (F.has('apartheid_generation') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'You were young when the structures fell. What came after was not what the structures had promised.',
    'The generation that grew up during apartheid carries it differently from the generation that fought it.',
    phase === 'late_life'
      ? 'You have lived on both sides of a historical divide. Not everyone understands what that costs.'
      : 'The new South Africa was real. So were its limits. You hold both.',
  ])
  if (F.has('survived_soviet_collapse') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'You watched the world you were born into dissolve in under two years. Some of it you didn\'t miss.',
    phase === 'late_life'
      ? 'The collapse was complete. You built something in what remained. That is not a small thing.'
      : 'The certainties of the Soviet years have the quality of a dream now. You remember believing them.',
    'What came after was not what anyone had promised either. You know this in a way the history books don\'t quite capture.',
  ])
  if (F.has('oil_delta_witness') && Math.random() < 0.3) return pick([
    'You grew up watching what the oil did to the delta. The damage was not incidental — it was the arrangement.',
    'The river was wrong when you were a child and it is still wrong. You still know what it was like before.',
    phase === 'late_life'
      ? 'You have been watching what happens when a place is treated as a resource rather than a home for most of your life.'
      : 'There is a cost to growing up next to something being destroyed for someone else\'s profit.',
  ])
  if (F.has('collectivization_witness') && Math.random() < 0.3) return pick([
    'You watched them write numbers in a book and take the animals. The act of recording something is still not neutral to you.',
    phase === 'late_life'
      ? 'The steppe routes your family used for generations. You know them. No one is using them anymore.'
      : 'The knowledge of how to read the land is still in you. There is almost nowhere left to use it.',
    'They collectivised the land but not the memory of what the land was before.',
  ])
  if (F.has('cotton_childhood') && Math.random() < 0.3) return pick([
    'September still feels wrong to you — the season of missing school, of rows of cotton, of quotas on a board.',
    'Your education has gaps from those years. Some of the gaps you filled later. Some you didn\'t.',
    phase === 'midlife'
      ? 'Your children\'s school runs a full year, September to June, no exceptions. You make sure of it.'
      : 'The teachers were there too, counting what had been picked. That is the part that stayed with you.',
  ])
  if (F.has('environmental_witness') && Math.random() < 0.3) return pick([
    'You saw what was left when the water retreated. Salt flats where fishing boats sat. The fishermen still in the town.',
    'Large-scale destruction is slow and then complete. The slow part is what you witnessed. The complete part came after you had already understood what was happening.',
    phase === 'late_life'
      ? 'The sea was gone within a generation. You are the generation that saw it go.'
      : 'The photographs of what it was look like a different place. They are not a different place.',
  ])
  if (F.has('oil_economy_participant') && Math.random() < 0.3) return pick([
    'The money was real. The questions it didn\'t ask were also real. You found a way to live with both.',
    'You worked in a system that extracted and distributed unevenly. You knew this. You stayed anyway.',
    phase === 'late_life'
      ? 'The towers are still there. The people who built them are not all in them. That was always the arrangement.'
      : 'The salary solved problems that had no other solution. The accounting was complex.',
  ])
  if (F.has('interrogated_by_state') && Math.random() < 0.3) return pick([
    'The room where they questioned you is still a room you are in sometimes.',
    'You know now what it feels like when the state turns toward you. The knowledge reorganised certain things.',
    phase === 'late_life'
      ? 'Decades since, and certain voices, certain silences, still activate something. You have learned to name it.'
      : 'The hypervigilance is not gone. It\'s mostly useful. Sometimes it isn\'t.',
  ])
  if (F.has('internally_displaced') && Math.random() < 0.3) return pick([
    'You were displaced within your own country — stranger and citizen simultaneously.',
    'The place you came from is still a place that exists. You just cannot go back to it, or what is there has changed.',
    'Internal displacement is not recorded the way refugee status is. The experience was not smaller for that.',
  ])
  if (F.has('climate_displaced') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'The place you left did not become uninhabitable slowly. It happened faster than the words for it.',
    'You are a climate refugee in a world that is still debating whether climate refugees exist.',
    phase === 'late_life'
      ? 'You have been watching the world catch up to what you already knew. There is no satisfaction in being right about this.'
      : 'You are ahead of a curve that most people don\'t yet understand they are on.',
  ])
  if (F.has('first_gen_graduate') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'You were the first in your family to graduate. That is a thing that can only happen once, and you were it.',
    phase === 'late_life'
      ? 'The degree opened things that it wouldn\'t have opened for someone else. You knew it at the time. You know it more clearly now.'
      : 'You carry the education and the distance it created at the same time. Both are real.',
    'What it cost the family to send you, and what it returned, are two calculations that don\'t quite balance.',
  ])
  if (F.has('lost_friend') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'Your friend is gone. There are things that were only funny to you and them that are now yours alone.',
    'You still notice when something happens that they would have said the perfect thing about.',
    phase === 'late_life'
      ? 'The longer you live the more of them you carry. That is just what living this long means.'
      : 'You think about them less frequently now. When you do, it is complete — the whole person, not just the fact of loss.',
  ])
  if (F.has('lost_parent_young') && Math.random() < 0.3) return pick([
    'You grew up with a parent who wasn\'t there. The absence has a specific shape that presence never has.',
    phase === 'late_life'
      ? 'You are older now than they were when they died. That is a strange crossing to make.'
      : phase === 'midlife'
        ? 'There are milestones they didn\'t see. Each one is partly theirs and mostly yours, and you have learned to hold both.'
        : 'You constructed them from other people\'s accounts and your own incomplete memories. That construction is them now.',
    'You wonder sometimes who you would have been if they had stayed. It is not a productive question. You ask it anyway.',
  ])
  if (F.has('built_something_solo') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'You built the life without the architecture most people use. It took longer to understand what you were building.',
    phase === 'late_life'
      ? 'What you made is yours in a way that partnerships can\'t quite achieve. The tradeoffs were real. So was the thing.'
      : 'You moved through your 30s and 40s on your own terms. There were years when that felt like freedom and years when it felt like something else.',
    'You are the primary architect of your own life. That is a statement that contains more than it sounds like.',
  ])
  if (F.has('long_marriage_intimacy') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) return pick([
    'The marriage has become something different from what it was. Not worse — different. The word for it is harder to find.',
    phase === 'late_life'
      ? 'You have been with this person long enough that they are part of the furniture of your self. You do not know what the room looks like without them.'
      : 'The early urgency has become something steadier. You are still discovering things about them, but slowly, the way things reveal themselves over decades.',
    'What you have is not what you expected when you started. It turned out to be something specific and irreplaceable.',
  ])
  if (F.has('conflict_injury') && Math.random() < 0.3) return pick([
    'The injury from that time is still in the body. The body remembers what the mind has learned to manage.',
    'You carry something from the conflict that is physical as well as everything else.',
    phase === 'late_life'
      ? 'Decades on, and the wound is still part of the architecture. You have built everything else around it.'
      : 'The damage was real. You have built a life anyway. The two facts coexist.',
  ])

  // ─── POLITICAL LEANING TEXTURE (~25% when leaning is set) ───────────────────
  if (political_leaning && phase !== 'early_childhood' && Math.random() < 0.25) {
    const leaningLines = {
      left: {
        childhood:   'There is already something in you that registers unfairness before it registers anything else.',
        adolescence: 'The inequality you see is not abstract. It has a shape and a texture. You are starting to understand it.',
        young_adult: 'The political convictions are clear enough to cause friction now. That seems right.',
        midlife:     'The analysis has not changed much over the decades. The question is what it demands of you now.',
        late_life:   'You have spent a life noticing what is unjust. Whether noticing was enough is a question that does not resolve.',
      },
      centre: {
        childhood:   'You try to understand both sides. You find the extremes of both unsatisfying.',
        adolescence: 'You occupy a position in arguments that satisfies no one completely, including yourself.',
        young_adult: 'The centre is not a comfortable position. Both sides find it suspect.',
        midlife:     'You are pragmatic about politics in ways that some find principled and others find evasive.',
        late_life:   'You never attached fully to any flag. You are not sure whether that was wisdom or something else.',
      },
      right: {
        childhood:   'Order and tradition feel solid to you in a way that feels right.',
        adolescence: 'You are skeptical of the theories that would upend what has been built. You trust what has survived.',
        young_adult: 'The politics are ordered around what you have and want to protect. You do not see this as selfish.',
        midlife:     'The conservative instinct has served you in some ways and blinded you in others. You know which.',
        late_life:   'You have defended the institutions you believed in. Whether they deserved the defense is a question you revisit.',
      },
      nationalist: {
        childhood:   'The nation is something you feel before you understand it.',
        adolescence: 'National pride feels like clarity when other things are confusing.',
        young_adult: 'The national identity is the container for most of your political feeling. This gives it shape and limits.',
        midlife:     'The nationalism you hold is not simple. You know enough history to know that.',
        late_life:   'What you loved about the nation was real. What was done in its name is also real. Both are true.',
      },
      dissident: {
        childhood:   'You notice the gap between what you are told and what you see. This is your particular curse.',
        adolescence: 'Dissidence is not a choice so much as a reflex. The official version rarely holds.',
        young_adult: 'The cost of saying what you think is visible now. You say it anyway, mostly.',
        midlife:     'You have paid for your opinions in specific ways. You would pay again. This is not bravery so much as necessity.',
        late_life:   'The positions that got you into trouble were right, mostly. That is not the same as saying they were safe.',
      },
      apolitical: {
        childhood:   'The arguments about power bore you. The people having them seem very certain about things that seem uncertain.',
        adolescence: 'You stay out of the political arguments. This is its own kind of position, which you do not fully acknowledge.',
        young_adult: 'Apolitical is a stance that works until the political finds you. You have not yet been found.',
        midlife:     'The events of the last years have made neutrality harder to maintain. You maintain it anyway.',
        late_life:   'You stayed out of it, mostly. The world came to you anyway, as it does.',
      },
    }
    const phaseKey = (phase === 'childhood' || phase === 'early_childhood') ? 'childhood'
      : (phase === 'adolescence') ? 'adolescence'
      : (phase === 'young_adult') ? 'young_adult'
      : (phase === 'midlife') ? 'midlife'
      : 'late_life'
    const line = leaningLines[political_leaning]?.[phaseKey]
    if (line) return line
  }

  // ─── DESIRE-AWARE TEXTURE (fires ~40% of remaining quiet years) ───────────────
  if (desire && Math.random() < 0.4) {
    const desireLines = {
      prove_worth: {
        early_childhood: 'You are already trying to be the best at something. You are not sure who you are trying to show.',
        childhood: 'You work hard at the things that get noticed. It matters to you that they get noticed.',
        adolescence: 'There is still the question of whether you are enough. You are trying to answer it with evidence.',
        young_adult: 'You are building the evidence that you matter. The accumulation is slow.',
        midlife: 'The accumulation of proof has not settled the question. You wonder sometimes if it ever will.',
        late_life: 'You have stopped trying to prove it. That is either peace or the thing that comes before peace.',
      },
      belong: {
        early_childhood: 'The world has rooms in it. You are learning which ones are yours.',
        childhood: 'You watch how the other children are with each other. You are learning the rules.',
        adolescence: 'The need to be included is almost physical. You would not admit that to anyone.',
        young_adult: 'The search for a room where you don\'t feel like a guest continues.',
        midlife: 'You have found, maybe, a few people who don\'t require you to perform. You hold onto them.',
        late_life: 'You know now who loves you. The list is smaller than you thought and enough.',
      },
      be_seen: {
        early_childhood: 'You do things hoping someone will notice. Sometimes they do.',
        childhood: 'You have a sense that there is more of you than people are seeing. You don\'t know how to show it.',
        adolescence: 'Visibility is everything. It is also terrifying. You want both at once.',
        young_adult: 'The need to be recognized is still the engine of a lot of your decisions. You are becoming aware of this.',
        midlife: 'You have made your mark, small or not. The question of whether it was enough is still there.',
        late_life: 'You are seen by the people who matter. That took longer to understand than it should have.',
      },
      safety: {
        early_childhood: 'You are always reading the room. You have been doing it for as long as you can remember.',
        childhood: 'You are good at knowing when things are about to change. You watch for it.',
        adolescence: 'The ground feels solid today. You are aware it can shift.',
        young_adult: 'You build routines. Routines feel like shelter. You are aware this is a strategy.',
        midlife: 'You have built something stable. You check it constantly, the way you check a lock.',
        late_life: 'The fear of instability has dulled. Not gone. Dulled. That is progress.',
      },
      connection: {
        early_childhood: 'You notice which children have friends and which don\'t. You watch this carefully.',
        childhood: 'A good friend is the most important thing. You know this without being able to say it.',
        adolescence: 'A close friendship is the whole world. You know this but cannot say it without it sounding small.',
        young_adult: 'What you want most is someone who knows what you mean before you\'ve finished.',
        midlife: 'The people who matter are fewer than they were. They are also more real.',
        late_life: 'The longevity of some relationships is its own kind of proof of something you couldn\'t have named at twenty.',
      },
      leave_mark: {
        early_childhood: 'You are already thinking about what you want to be. This seems important.',
        childhood: 'You have an idea of the future you. The future you is larger than the current one.',
        adolescence: 'The future you is more real to you than the present one. You are impatient.',
        young_adult: 'You are trying to build something that will outlast the year.',
        midlife: 'The work is there. Whether it matters is a separate question you try not to ask too often.',
        late_life: 'Whatever you have made is mostly made. You are learning to let that be enough.',
      },
      freedom: {
        early_childhood: 'The rules chafe. You don\'t have words for this yet.',
        childhood: 'You test the edges of things. You want to know where they are.',
        adolescence: 'What you want is out. You don\'t know what\'s on the other side of out. You want it anyway.',
        young_adult: 'You resist the things that would bind you. You are aware this has costs. You are paying some of them.',
        midlife: 'You are freer than you have been in some ways. Constrained in others you didn\'t anticipate.',
        late_life: 'You have lived on your own terms, mostly. You are still deciding whether mostly is enough.',
      },
      redemption: {
        early_childhood: 'There is already something you feel you owe. You couldn\'t name it if you tried.',
        childhood: 'There is something you carry. You are not sure yet if it is yours to carry.',
        adolescence: 'The weight of something is there. You move around it more than you face it.',
        young_adult: 'The desire to make something right is still there, below the ordinary days.',
        midlife: 'Some accounts have been settled. Others you are still working on. You don\'t know how many are left.',
        late_life: 'What remains to be made right has become clearer. You are doing what you can with the time.',
      },
    }
    const phaseKey = (phase === 'early_childhood') ? 'early_childhood'
      : (phase === 'childhood') ? 'childhood'
      : (phase === 'adolescence') ? 'adolescence'
      : (phase === 'young_adult') ? 'young_adult'
      : (phase === 'midlife') ? 'midlife'
      : 'late_life'
    const line = desireLines[desire]?.[phaseKey]
    if (line) return line
  }

  // ─── MEMORY LAYER (~30% of remaining quiet years) ────────────────────────────
  // Surfaces specific past flags by name, using elapsed years for texture.
  // Only fires when the flag was set and enough time has passed to feel like memory.
  if (Math.random() < 0.30) {
    const yr = state.currentYear
    const mem = state.mem ?? {}
    const age = state.age

    const yrsAgo = (flagYear) => yr - (flagYear ?? yr)

    if (mem.widowedYear && yrsAgo(mem.widowedYear) >= 2 && yrsAgo(mem.widowedYear) <= 12) {
      const n = yrsAgo(mem.widowedYear)
      return pick([
        `${n === 2 ? 'Two' : n === 3 ? 'Three' : n} years since ${state.partner ? state.partner.name.split(' ')[0] : 'them'}. The house still holds the shape of two people.`,
        `You have learned to do the things that used to be shared. You are still learning.',`,
      ])
    }
    if (mem.partnerDeathYear && yrsAgo(mem.partnerDeathYear) >= 2 && yrsAgo(mem.partnerDeathYear) <= 15) {
      return pick([
        'You still reach for the phone to tell them something. That reflex has not gone.',
        'The grief has changed shape. It is not smaller. It is more familiar.',
      ])
    }
    if (mem.parentDeathYear && yrsAgo(mem.parentDeathYear) >= 1 && yrsAgo(mem.parentDeathYear) <= 8) {
      const n = yrsAgo(mem.parentDeathYear)
      return pick([
        n <= 2
          ? 'You are still finding things that bring it back. A sound, a smell, a phrase they used.'
          : 'You think of them more than you say. That is probably true of most people.',
        'Some things you only understand now that you cannot ask.',
      ])
    }
    if (F.has('knows_failure') && mem.knows_failureYear && yrsAgo(mem.knows_failureYear) >= 2 && yrsAgo(mem.knows_failureYear) <= 10 && phase !== 'early_childhood') {
      return pick([
        'The failure was real. You have built on it, or around it, depending on the year.',
        'You know what it feels like when something you believed in doesn\'t work. That is a kind of knowledge.',
      ])
    }
    if (F.has('first_love_over') && mem.first_love_overYear && yrsAgo(mem.first_love_overYear) >= 3 && yrsAgo(mem.first_love_overYear) <= 15 && age <= 38) {
      return pick([
        'You think of them occasionally, without the weight you expected.',
        'What you had was real. That it ended doesn\'t change what it was.',
      ])
    }
    if (F.has('emigrated') && mem.emigratedYear && yrsAgo(mem.emigratedYear) >= 5 && yrsAgo(mem.emigratedYear) <= 20 && Math.random() < 0.5) {
      return pick([
        'The place you left exists without you. You have stopped being surprised by this.',
        'You are fluent in the life here now. The old one comes back in small things.',
      ])
    }
    if (F.has('cancer_survivor') && mem.cancer_survivorYear && yrsAgo(mem.cancer_survivorYear) >= 1 && yrsAgo(mem.cancer_survivorYear) <= 10) {
      return pick([
        'You have had years since then. You do not take that for granted.',
        'The clear scan is still the most important appointment of the year.',
      ])
    }
    if (F.has('business_failed') && mem.business_failedYear && yrsAgo(mem.business_failedYear) >= 2 && yrsAgo(mem.business_failedYear) <= 12) {
      return pick([
        'You built something and it didn\'t hold. You know more than you did. Both things are true.',
        'The failure has become a reference point. You use it as one.',
      ])
    }
    if (F.has('graduated') && mem.graduatedYear && yrsAgo(mem.graduatedYear) >= 5 && yrsAgo(mem.graduatedYear) <= 25 && phase === 'midlife') {
      return 'The education is further behind you than it felt at the time. You still use it.'
    }
    if (F.has('affair_not_taken') && mem.affair_not_takenYear && yrsAgo(mem.affair_not_takenYear) >= 3 && yrsAgo(mem.affair_not_takenYear) <= 20) {
      return pick([
        'There was a door. You didn\'t open it. That is still occasionally present.',
        'You made a choice and it became part of how you understand yourself.',
      ])
    }
    if (F.has('lgbtq_family_rejection') && mem.lgbtq_family_rejectionYear && yrsAgo(mem.lgbtq_family_rejectionYear) >= 3) {
      return pick([
        'The family you chose is the one that held.',
        'You have made a life that doesn\'t require their approval. Most of the time that is enough.',
      ])
    }
    if (F.has('experienced_racism') && mem.experienced_racismYear && yrsAgo(mem.experienced_racismYear) >= 2 && phase !== 'early_childhood') {
      return pick([
        'You carry certain knowledge about how the world works. You did not ask to learn it this way.',
        'The incident is in the past. Its shape is still present in certain rooms.',
      ])
    }
    if (F.has('compromised') && mem.compromisedYear && yrsAgo(mem.compromisedYear) >= 3) {
      return pick([
        'There is something you did that you would have told your younger self you wouldn\'t do. You did it.',
        'The compromise is the kind of thing that doesn\'t go away. It has become part of how you understand what you are capable of.',
        phase === 'late_life'
          ? 'You have been living with what you did for long enough that it has changed shape. You are not sure if that is wisdom or accommodation.'
          : 'You made a calculation. The calculation was correct by its own logic. Something else says it wasn\'t.',
      ])
    }
    if (F.has('affair_brief_secret') && mem.affair_brief_secretYear && yrsAgo(mem.affair_brief_secretYear) >= 4) {
      return pick([
        'The thing that happened — the brief thing — is still there. Not as a wound but as a weight.',
        'You carried it quietly. You are still carrying it. Some secrets don\'t expire.',
        phase === 'late_life'
          ? 'From here it looks different. Not forgiven, not forgotten. Just further away and still present.'
          : 'You ended it before it became more than it was. You are not sure if that matters.',
      ])
    }
    if (F.has('experienced_miscarriage') && mem.experienced_miscarriageYear && yrsAgo(mem.experienced_miscarriageYear) >= 1 && yrsAgo(mem.experienced_miscarriageYear) <= 8) {
      const n = yrsAgo(mem.experienced_miscarriageYear)
      return pick([
        n <= 2
          ? 'The loss is still fresh enough to return on certain days without warning.'
          : 'The loss has settled into a different part of the self. Present still. Less immediately in reach.',
        'A pregnancy announcement lands differently than it would have before. You feel the shape of what you lost before you feel anything else.',
      ])
    }
    if (F.has('multiple_miscarriage') && mem.multiple_miscarriageYear && yrsAgo(mem.multiple_miscarriageYear) >= 1 && yrsAgo(mem.multiple_miscarriageYear) <= 12) {
      return pick([
        'You know exactly how many times. That number is not something you have put down.',
        'What you hoped for each time had a specific shape. Losing the shape, repeatedly, is its own kind of accumulation.',
      ])
    }
    if (F.has('sibling_estranged') && mem.sibling_estrangedYear && yrsAgo(mem.sibling_estrangedYear) >= 1 && yrsAgo(mem.sibling_estrangedYear) <= 12) {
      const n = yrsAgo(mem.sibling_estrangedYear)
      return pick([
        n <= 3
          ? 'The silence between you and your sibling is still new enough that you sometimes reach for the phone before you remember.'
          : 'The estrangement has been going on long enough that you have built your life around its shape.',
        'You think of things your sibling would find funny. There is no one to tell them to.',
      ])
    }
    if (F.has('art_in_drawer') && mem.art_in_drawerYear && yrsAgo(mem.art_in_drawerYear) >= 2) {
      return pick([
        'There is work that you made and didn\'t show. It is still there. So are you.',
        'The drawer is still closed. You don\'t open it often. When you do, the work is better than you remembered.',
        'You made something you couldn\'t release. That is a particular kind of holding on.',
      ])
    }
    if (F.has('uyghur_suppressed') && mem.uyghur_suppressedYear && yrsAgo(mem.uyghur_suppressedYear) >= 3) {
      return pick([
        'The learned silence still comes first. Before the thought, before the sentence, the calculation.',
        'You say yes when you mean something else. That has become automatic in the way breathing is automatic.',
      ])
    }
    if (F.has('kafala_documented') && mem.kafala_documentedYear && yrsAgo(mem.kafala_documentedYear) >= 1 && yrsAgo(mem.kafala_documentedYear) <= 15) {
      return pick([
        'You know what it is to hold your own document after someone else has held it.',
        'The passport lives in the bag you carry. That is a decision you make every morning.',
      ])
    }
    if (F.has('forced_harvest') && mem.forced_harvestYear && yrsAgo(mem.forced_harvestYear) >= 5) {
      return pick([
        'September still has a particular texture. The body remembers the work before the mind does.',
        'You were not asked. That is the part that has lasted.',
      ])
    }
    if (F.has('ebola_survivor') && mem.ebola_survivorYear && yrsAgo(mem.ebola_survivorYear) >= 1 && yrsAgo(mem.ebola_survivorYear) <= 12) {
      return pick([
        'The reflex from the outbreak years is still in you. You notice your own temperature before other people do.',
        'Quarantine taught you what the walls of a room actually look like. You still sometimes count them.',
      ])
    }
  }

  // ─── CONDITIONS LAYER (~30% when chronic conditions present) ─────────────────
  // Generates year-specific prose for living with a chronic condition.
  // Picks the most severe active condition; prose varies by severity × managed.
  const _activeConds = (state.conditions ?? []).filter(c => c.id !== 'cancer_survivable')
  if (_activeConds.length > 0 && Math.random() < 0.30) {
    const _SEV = { mild: 1, moderate: 2, severe: 3 }
    const _c = [..._activeConds].sort((a, b) => (_SEV[b.severity] ?? 2) - (_SEV[a.severity] ?? 2))[0]
    const _s = _c.severity ?? 'moderate'
    const _m = _c.managed ? 'y' : 'n'
    const _CP = {
      diabetes: {
        mild: {
          y: ['You check your blood sugar before meals. It has become as automatic as checking the time.',
              'The carbohydrate count is in your head now. You do it without a calculator.'],
          n: ['The numbers are not where they should be. You know this without being told.',
              'The thirst some mornings when you wake — you know what it means and what you are not doing about it.'],
        },
        moderate: {
          y: ['The A1C came back better this time. That is the goal — every three months, that is the whole goal.',
              'The medication is working, more or less. "More or less" is what managed looks like from the inside.'],
          n: ['The doctor has said this before, in different words. You have heard it before, in a different register.',
              'The feet are starting to be a concern. The specialist uses the word neuropathy and you carry it home.'],
        },
        severe: {
          y: ['The insulin schedule is its own calendar. You live inside it now, and have for years.',
              'The kidney function is being watched. A different kind of watching from what you were used to.'],
          n: ['The complications the doctor described years ago are arriving on schedule.',
              'The peripheral neuropathy is no longer a risk they mention — it is a thing you manage every day.'],
        },
      },
      heart_disease: {
        mild: {
          y: ['The morning pill is the first thing. That is the protocol, and you have kept it.',
              'You know which exertions to moderate. The body sends the signal; you have learned to read it.'],
          n: ['The shortness of breath on stairs is something you have been attributing to other things.',
              'The cardiologist said things about lifestyle. You are still working out what working on it means.'],
        },
        moderate: {
          y: ['The stent has been in for three years. You do not feel it — you feel the absence of what came before.',
              'Four medications on schedule. This is what managed heart disease looks like from the inside.'],
          n: ['The tightness in your chest is the kind that makes you stop what you are doing. Not dramatic. Just stop.',
              'The doctor is recommending intervention again. You are still deciding what you are deciding.'],
        },
        severe: {
          y: ['The cardiac rehab was six months. You finished it. The condition is stable. That is not nothing.',
              'You know what you are carrying now and what it requires of you. That clarity is a kind of health.'],
          n: ['The last episode changed the texture of ordinary days. Everything is slightly to the side of before.',
              'You are counting exertions now. That is not the life, but it is the condition of the life.'],
        },
      },
      copd: {
        mild: {
          y: ['The inhaler is in your pocket. You use it before stairs. It has been two years and you don\'t think about it.',
              'The spirometry numbers are holding. Holding is the goal for now.'],
          n: ['The cough is part of mornings now. You do not think about it until someone asks.',
              'Winter is harder on your lungs than summer. That is knowledge now, not something you are still figuring out.'],
        },
        moderate: {
          y: ['A bad air quality day means staying in. That is not dramatic — that is the arithmetic of breathing.',
              'The maintenance inhaler is twice daily. You have not missed a dose in months.'],
          n: ['The breathlessness on flat ground is something you have catalogued as new this year.',
              'The cough keeps you up some nights. This is information you have not yet acted on.'],
        },
        severe: {
          y: ['The portable oxygen is small enough to carry. You are still getting used to what people\'s faces do.',
              'You know the difference between a good breathing day and a functional breathing day.'],
          n: ['A flight of stairs is a project now. You have stopped treating that as temporary.',
              'The question of what you can do has a different answer every season.'],
        },
      },
      back_pain: {
        mild: {
          y: ['You know which chairs will betray you by the second hour. You have learned to choose accordingly.',
              'The physio exercises are twenty minutes each morning. Some mornings that is the first thing you accomplish.'],
          n: ['The lower back announces itself after sitting too long, which is most of the work day.',
              'You have learned to stand differently. That was not a choice — it was an adaptation.'],
        },
        moderate: {
          y: ['Some mornings the first step out of bed is the hardest part of the day. It gets better after moving. You know this.',
              'The programme takes thirty minutes. You do it most days. That is what most days looks like.'],
          n: ['Certain positions are catalogued as unavailable. The list is longer than it was a year ago.',
              'The pain management specialist has a waiting list. You are somewhere on it.'],
        },
        severe: {
          y: ['The pain is a landscape now rather than an event. On good days you notice it less. That is the measure.',
              'The nerve block helped — less than promised, more than nothing. That is the register you work in.'],
          n: ['There are things you no longer attempt. This is not self-pity — it is information about the body.',
              'Some weeks the pain is the whole context and everything else fits around it.'],
        },
      },
      hiv: {
        mild: {
          y: ['The pill is small. You take it at the same time every morning. That is what undetectable requires.',
              'Undetectable. You know what that word means in clinical terms and in the terms of your actual life.'],
          n: ['The count is what the doctor watches. You have learned to understand the numbers.',
              'The CD4 is higher than last year. You know the direction you need to go and are working toward it.'],
        },
        moderate: {
          y: ['The regimen has been the same for four years. The stability is its own kind of progress.',
              'The viral load is undetectable. That is the word you carry. You know what it cost to get here.'],
          n: ['The count is lower than it was last year. The doctor is watching. You are also watching.',
              'The medication is available. The decision about when to start it is getting harder to defer.'],
        },
        severe: {
          y: ['You are here. The sentence required the most work. You are here.',
              'The combination that is working now was not available when you were first diagnosed. Time did something.'],
          n: ['The infections that come with a compromised immune system are the body\'s announcement.',
              'This is the point the doctors described at the beginning. You are past due for treatment.'],
        },
      },
      chronic_depression: {
        mild: {
          y: ['The medication has been the same for a year. Stability is not the same as joy. It is something.',
              'The therapy appointment is Tuesday. That is an anchor. You have found it useful to have anchors.'],
          n: ['A flat week. Nothing wrong exactly and nothing right exactly.',
              'You are performing functioning. You are good at performing functioning. That is not the same thing.'],
        },
        moderate: {
          y: ['The medication has been adjusted twice. The current version is better than the last. That counts.',
              'You know the early signs now. Sleep changes first. Then appetite. Then the rest follows.'],
          n: ['Getting out of bed was the goal this week. Whether you achieved it is the whole question.',
              'The energy goes somewhere you cannot locate. You have enough to survive but not much beyond that.'],
        },
        severe: {
          y: ['The hospitalisation was two years ago. You have been building something carefully since then.',
              'Treatment is working in the sense that you are here, which is the baseline from which everything is measured.'],
          n: ['The days are very long right now and very empty at the same time.',
              'You have not told anyone how bad this is. You are not sure if that is protective or something else.'],
        },
      },
      blindness: {
        mild: {
          y: ['The glasses do some of the work they used to. Not all of it, but some.',
              'The injections are quarterly now. The progression has slowed. Slowed is the goal.'],
          n: ['Reading takes longer than it used to. You have started attributing it to other things.',
              'The central vision is where the loss is. The peripheral compensates, somewhat.'],
        },
        moderate: {
          y: ['The magnifier lives by the kitchen table. You do not think about it anymore — you just use it.',
              'The audiodescription is on by default now. That is a setting that has become a preference.'],
          n: ['Faces at distance are uncertain now. You are working around this without fully naming it.',
              'The macular specialist confirmed what you already knew: progressive. The word means what it says.'],
        },
        severe: {
          y: ['The navigation is mostly tactile and aural now. You know your home by its sounds and resistances.',
              'What you cannot see you reconstruct from other information. You have gotten good at reconstruction.'],
          n: ['The aids available would help. The distance between knowing that and acting on it has been a year.',
              'The independence you relied on is requiring more negotiation than it used to.'],
        },
      },
      deafness: {
        mild: {
          y: ['The hearing aids take two weeks to stop noticing. You stopped noticing them months ago.',
              'What you were missing before the aids you didn\'t know you were missing. Now you know.'],
          n: ['You ask people to repeat themselves more than before. You have become expert at seeming not to need to.',
              'You know the television volume is too loud. So do the neighbours.'],
        },
        moderate: {
          y: ['Group conversations still require effort. One-on-one, the aids do what they are supposed to.',
              'The batteries are a weekly ritual. You keep spares in three places.'],
          n: ['Meetings at work have become something you navigate by context rather than content.',
              'The hearing has been declining for three years. The denial has been declining more slowly.'],
        },
        severe: {
          y: ['You communicate differently than you used to. Differently is not the same as less.',
              'The community around what you share with other people in this situation was not what you expected. It exists.'],
          n: ['You have withdrawn from things that require what you no longer have. The withdrawal is quiet and gradual.',
              'The isolation is made of small social costs that accumulate without announcement.'],
        },
      },
      disability_injury: {
        mild: {
          y: ['The adaptation — the brace, the workaround, the modified approach — is yours now in the way tools become yours.',
              'The physiotherapy continues. Progress is measured differently than it was in the first year.'],
          n: ['What the body can do and what you ask of it are in ongoing negotiation.',
              'You have found workarounds. Some of them are better than the original.'],
        },
        moderate: {
          y: ['The rehabilitation was a year of learning a body you didn\'t choose. You know it now.',
              'There are good days and days that remind you what the injury cost. The ratio has improved.'],
          n: ['The gap between what you expected to recover and what you have recovered has narrowed — mostly.',
              'The accommodation you didn\'t ask for at work is the accommodation you need. That is its own adjustment.'],
        },
        severe: {
          y: ['The life has reorganised around what you have rather than what you lost. That reorganisation took years.',
              'You know your body\'s architecture very specifically now — intimate knowledge, earned at a cost.'],
          n: ['The secondary conditions that come with the injury are what the doctor is watching this year.',
              'Some things remain closed. You have stopped waiting for them to open.'],
        },
      },
    }
    const _pool = _CP[_c.id]?.[_s]?.[_m]
    if (_pool?.length) return pick(_pool)
  }

  // ─── PROJECT LAYER (~35% when project active) ────────────────────────────────
  const proj = state.currentProject
  if (proj && proj.phase !== 'abandoned' && Math.random() < 0.35) {
    const pname = proj.name ? ` on ${proj.name}` : ''
    const projectLines = {
      writing: {
        early: [
          `You are writing${pname}. It is mostly bad. You continue.`,
          'The pages accumulate. You don\'t show them to anyone yet.',
          'The work asks for early mornings and late nights. You are giving them.',
        ],
        middle: [
          'The writing is in a difficult phase. You are pushing through it.',
          'There are good paragraphs and bad ones. More of the latter. You keep going.',
          'The project is real enough now that abandoning it would cost something.',
        ],
        late: [
          'The work is further along than it has ever been. You don\'t say this to anyone.',
          'You can see the shape of it now. Whether the shape is right is another question.',
          'The end is somewhere ahead. You have been working toward it for years.',
        ],
        established: [
          'You have been writing for long enough that it is part of who you are.',
          'The practice has become something you don\'t question. You do it the way you brush your teeth.',
          'You have made something. Whether it is good is a question you have stopped asking every day.',
        ],
      },
      running: {
        early: [
          'The running is new enough that it still hurts the way new things hurt.',
          'You are building the habit. Some weeks it holds; some weeks it doesn\'t.',
          'You are slower than you want to be. You keep going anyway.',
        ],
        middle: [
          'The body knows what to do now. The mind follows.',
          'The run is the part of the day that belongs entirely to you.',
          'You have been at this long enough that missing it feels wrong.',
        ],
        late: [
          'The running has become a fact about you, the way height is a fact.',
          'You can cover distances now that you couldn\'t have imagined starting out.',
          'The habit is yours. You have carried it through years that tried to take it from you.',
        ],
        established: [
          'You have been running for years. The body is different for it.',
          'The early mornings are a constant. They have outlasted many other things.',
          'You are still at it. Not everyone who starts is.',
        ],
      },
      music: {
        early: [
          'The practice is rough and necessary. You do it anyway.',
          'The instrument asks more than you have. You give it.',
          'The music is somewhere ahead of your current ability. You are walking toward it.',
        ],
        middle: [
          'You can play things now that would have defeated you two years ago.',
          'The practice has a different quality — harder but closer to something real.',
          'The music is becoming yours. It still belongs partly to the form. Less so each year.',
        ],
        late: [
          'You have been playing long enough that the instrument feels like a part of the body.',
          'The music you make is specific to you. No one else would make exactly this.',
          'You have a sound now. It took years.',
        ],
        established: [
          'The music has been with you so long that you don\'t know who you are without it.',
          'You still practice. After all this time, still.',
          'The playing has outlasted careers, relationships, houses. It continues.',
        ],
      },
      art: {
        early: [
          'The work is private. You are not ready for it to be anything else.',
          'You are making things you have no name for yet. That seems right.',
          'The practice is tentative. You are learning to trust it.',
        ],
        middle: [
          'The work has found its own logic. You are following it.',
          'You are making things that surprise you. That is the sign.',
          'The art is getting harder to hide, which means it is getting more real.',
        ],
        late: [
          'You have been making this work for years. Its shape is clearer to you now.',
          'The practice has accumulated into something. You are still deciding what.',
          'The work is there whether anyone sees it or not. That has become enough, mostly.',
        ],
        established: [
          'You are a person who makes things. That is a settled fact about you.',
          'The work continues. It has outlasted doubt.',
          'You have made enough by now that the quantity itself means something.',
        ],
      },
      business: {
        early: [
          `The business${pname ? ` — ${proj.name} —` : ''} is in its first years. Everything is provisional.`,
          'You are learning the distance between a plan and an operation.',
          'The business is consuming more than you expected. You knew it would.',
        ],
        middle: [
          'The business has found its footing. The crisis is ordinary now.',
          'You are building something. What it becomes is still being decided.',
          `${proj.name ?? 'The business'} has survived its first real tests. Not all businesses do.`,
        ],
        late: [
          `${proj.name ?? 'The business'} is what it has become. You have some pride in that.`,
          'You have built something that works without requiring you every hour. That took years.',
          'The work has a shape now. Whether it is the shape you intended is another question.',
        ],
        established: [
          `${proj.name ?? 'The business'} has been running for years. That is itself an achievement.`,
          'You have built something that employs people and pays its bills. Not every idea gets this far.',
          'The business is a fact of your life now. You have grown around it.',
        ],
      },
    }
    const lines = projectLines[proj.type]?.[proj.phase]
    if (lines) return pickFrom(lines)
  }

  // ─── FLAG-AWARE TEXTURE PATHS (~22% each, fires before generic pools) ─────────
  // Surfaces flags whose follow-through lives in year texture rather than events.

  if (F.has('interrupted_career') && phase === 'midlife' && Math.random() < 0.22) {
    return pick([
      'The career you left behind is still a presence. You don\'t name it most days. It is there when you account for things.',
      'You took a different path than the one you were on. The original path still exists somewhere as a version of you that didn\'t.',
    ])
  }
  if (F.has('francophone_educated') && Math.random() < 0.22) {
    return pick([
      'You think in two languages still. The one you were schooled in carries a particular kind of authority you are still measuring.',
      'French was the language of advancement. You learned it. That was a transaction, and you got what you paid for.',
    ])
  }
  if (F.has('id98_reckoned') && phase !== 'early_childhood' && phase !== 'childhood' && Math.random() < 0.22) {
    return pick([
      'You reckoned with what 1998 was. That reckoning doesn\'t end with the decision.',
      'What you understood about Jakarta — about what the city did to people who looked like certain people — is still knowledge you carry.',
    ])
  }
  if (F.has('kurd_reform_era') && Math.random() < 0.22) {
    return pick([
      'The reforms arrived. You watched what they gave and what they didn\'t. That watching has become part of how you see things.',
      'The language is permitted in more places now. That is not the same as the weight being lifted.',
    ])
  }
  if (F.has('colonial_subject') && phase !== 'early_childhood' && Math.random() < 0.22) {
    return pick([
      'You were born into a document that described you as a subject. That word is behind you now. Its structure is not entirely behind you.',
      'Independence changed the flag. The deeper architecture — who gets what, who decides — those changed more slowly.',
    ])
  }
  if (F.has('institutional_doubt') && phase !== 'early_childhood' && Math.random() < 0.20) {
    return pick([
      'You do not trust the institution the way you once did. That is an earned position, not a chosen one.',
      'The doubt came from somewhere specific. You remember what it was. It has become a permanent part of your assessment.',
    ])
  }

  // ─── EXPANDED PHASE POOLS ────────────────────────────────────────────────────

  // Latin America historical trauma texture
  if (F.has('tlatelolco_generation') && Math.random() < 0.3) {
    const opts = phase === 'late_life'
      ? ['The October of 1968 is still a date you know differently from the way the history books say it. The Olympics opened on schedule. You know what that cost.',
         'The state that did it was the same state that ran the election, built the school, and issued the identity document. You have had a long time to think about what that means.',
         'You have watched how Mexico handles its memory of Tlatelolco — what gets taught, what gets elided, what gets named. The anniversary is in the calendar.']
      : ['There was a night in October. The newspapers did not report what happened. You know the gap between those two facts.',
         'The state that did it was the same state that ran the election, built the school, and issued the identity document. You have had a long time to think about what that means.',
         'The version in the official account is not the version you carry.']
    return opts[Math.floor(Math.random() * opts.length)]
  }
  if (F.has('caracazo_generation') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) {
    const opts = phase === 'late_life'
      ? ['The mass graves from 1989 were found years later. The accounting was slow and incomplete. That is the pattern you have been watching ever since.',
         'You were in Venezuela when the army was given orders to fire on its own people. That is knowledge about what a government will do that does not leave you.',
         'Twenty years later they found the bodies near Caracas. You had known approximately where they would be.']
      : ['The Caracazo is the line in your life that separates what you believed about the state from what you know about it.',
         'You were in Venezuela when the army was given orders to fire on its own people. That is knowledge about what a government will do that does not leave you.',
         'The Caracazo is the beginning of the end of the old Venezuela — and the beginning of something else. You watched both.']
    return opts[Math.floor(Math.random() * opts.length)]
  }
  if (F.has('la_violencia_generation') && (phase === 'midlife' || phase === 'late_life') && Math.random() < 0.3) {
    const opts = phase === 'late_life'
      ? ['You lived through La Violencia and what came after. The FARC, the paramilitaries, the cartels — you have watched your country find new containers for the same impulse. That is a long observation.',
         'The decade that divided your country by party affiliation still structures certain silences. Not everyone forgave. Not everyone forgot what was done in the name of belonging to one side.']
      : ['You know what Colombia is capable of because you were there for one of the earlier versions of it.',
         'The decade that divided your country by party affiliation still structures certain silences. Not everyone forgave. Not everyone forgot what was done in the name of belonging to one side.']
    return opts[Math.floor(Math.random() * opts.length)]
  }
  if (F.has('narco_era_generation') && Math.random() < 0.3) return pick([
    'You still read the news from certain Mexican cities the way you learned to: not for information about events but for information about which routes, which towns, which names have become dangerous to say.',
    'The arithmetic of the narco years: who you knew, which city they were in, whether they are still there. You run the calculation without meaning to.',
    'A name appears in the news. You know which city that name operates from because everyone in your generation knows which city each name operates from.',
  ])
  if (F.has('paramilitary_era_lived') && Math.random() < 0.25) return pick([
    'The arithmetic of speaking under the AUC was: who is in the room, who might report what, what is safe to say and what requires the indirect version. You still do this without thinking.',
    'You have known people who disappeared during the paramilitary years and people who did the disappearing, and in some cases they are the same person at different ages.',
    'The peace process produced paper. What it could not produce was the version of you that existed before you learned to calculate every room.',
  ])
  if (F.has('femicidio_generation') && Math.random() < 0.3) return pick([
    'The arithmetic you learned young: what time, which route, who to tell when you leave, who to text when you arrive. You do it automatically. You will do it until you can\'t.',
    'A name appears. Another name. The news gives an age and a city. You read it and move on because the alternative — stopping to feel the weight of each one — is not something you can afford to do every day.',
    'You know the route home at night the way you know your own face. By the parts that require attention.',
  ])

  // ─── SOUTHEAST EUROPE TEXTURE ────────────────────────────────────────────────
  if (F.has('romania_decree_generation') && Math.random() < 0.3) return pick([
    'The women in your generation know something about what the state will and will not allow you. The knowledge was passed between you in a register just below speech.',
    'Decree 770 is not something you discuss. It is something you managed. What it cost is in the management.',
    'You know what it means to have a decision made for you by people who did not consider your situation among their variables.',
  ])
  if (F.has('romanian_austerity_generation') && Math.random() < 0.25) return pick([
    'The electricity went off on a schedule. The bread was rationed. You know how to manage on less than the official definition of subsistence, which is information that stays with you.',
    'Something about the way food is wasted now — by people who have never had to calculate the calories — stays unpleasant in a way you cannot entirely account for.',
  ])
  if (F.has('yugoslav_dissolution_lived') && Math.random() < 0.3) return pick([
    'The category that was supposed to supersede the others turned out to have been organizing them. You still think about that.',
    'You grew up with a word for what you were that no longer applies to a country. The word still applies to you in some register you cannot quite name.',
    'The dissolution produced people who are very certain about which category they belong to. You understand the certainty. You did not arrive at it yourself.',
  ])
  if (F.has('yugoslav_hyperinflation_lived') && Math.random() < 0.25) return pick([
    'You learned to keep savings in Deutschmarks, or cigarettes. The conversion tables from that year are still in your head. You notice that this is not something people who weren\'t there understand instinctively.',
    'The year the dinar lost all meaning was also the year you understood that money is an agreement, and agreements can be revoked.',
  ])
  if (F.has('nato_bombing_survived') && Math.random() < 0.3) return pick([
    'You learned the sound of the air-raid warning so well that you heard it in your sleep for years after it stopped.',
    'Seventy-eight nights. The bridges came down. The justification and the experience were separate things that didn\'t reduce to each other, and you lived on the side of the experience.',
    'The electricity went out in rotation during the bombing. You still notice when the lights flicker.',
  ])
  if (F.has('tito_generation') && Math.random() < 0.2) return pick([
    'You remember the mourning in 1980 as genuine and enormous. What came after took a decade to arrive, but it was already implied in the question nobody was asking yet.',
    'Tito held it together. The question of who holds it together after Tito turned out to have the answer you didn\'t want.',
  ])
  if (F.has('romanian_transition_generation') && Math.random() < 0.25) return pick([
    'The revolution produced a new government that was not quite a new government, and the decade after was neither the thing you had nor the thing you wanted. You built inside that.',
    'The jubilation in December 1989 was real. The Mineriads in 1990 were also real. You were there for both.',
    'What foreign correspondents filmed was the jubilation. What they didn\'t film was the next decade, which is what you actually lived.',
  ])
  if (F.has('romania_orphan_generation') && Math.random() < 0.25) return pick([
    'You learned early that institutions do not have space for the individual child. The lesson generalized.',
    'The orphanage taught you to manage in large groups with limited resources. You notice that this is not a skill that gets named as such, but it is a skill.',
    'There were 170,000 of you in state care. The number makes you legible as a category. The category doesn\'t quite fit the specific contours of what it was.',
  ])
  if (F.has('serbian_democratic_transition') && Math.random() < 0.2) return pick([
    'October 5, 2000: the specific feeling of something you\'d been pressing against for eleven years suddenly not being there. You didn\'t expect it to feel like that.',
    'The thing that was true about Serbia for eleven years stopped being true in an afternoon. The adjustment took longer.',
  ])

  // ─── SOUTH KOREA TEXTURE ─────────────────────────────────────────────────────
  if (F.has('gwangju_generation') && Math.random() < 0.3) return pick([
    'Gwangju was suppressed from the national record for almost a decade. You knew before the record admitted it. That gap is a specific kind of knowledge.',
    phase === 'late_life'
      ? 'The country has now officially named what happened in Gwangju. The naming came thirty years after the fact. You were there for the thirty years of not-naming.'
      : 'May 18, 1980: the paratroopers, the nine days, the disputed number. You have held this in an unofficial way for years.',
  ])
  if (F.has('korean_imf_generation') && Math.random() < 0.3) return pick([
    'IMF agejeong — the category large enough to have a name. The desks that emptied stayed empty. The people who lost their jobs that year have a specific relationship to job security that those who didn\'t cannot quite access.',
    'The gold donation drives: wedding rings, school medals. The gesture was real. The structural adjustment happened anyway. You remember both.',
    phase === 'late_life'
      ? 'The 1997 crisis restructured an economy and a generation. The generation got restructured whether it wanted to or not.'
      : 'The won fell, the IMF came, the conditions arrived. You were in the middle of your working life. You adjusted.',
  ])
  if (F.has('june_struggle_generation') && Math.random() < 0.2) return pick([
    'June 1987: Lee Han-yeol falls, the photograph circulates, and the office workers come out into the street beside the students. The direct election happens. You voted in it.',
    'After twenty-six years of military government, democracy arrived because enough people were in the street at the same time. You were one of the conditions for its arrival.',
  ])
  if (F.has('hallyu_generation') && Math.random() < 0.2) return pick([
    'Korean drama is on screens in countries your grandparents never heard of. You grew up in a country that was not a cultural exporter. The country that exports culture now is the same country with a different relationship to what it made.',
    'The hallyu wave was not an accident. After 1997, the government put money into cultural industries. The music and the dramas are real things that also happened to be policy.',
  ])
  if (F.has('korean_speed_culture') && Math.random() < 0.2) return pick([
    'Ppalli-ppalli: the pace you were raised at. Somewhere else, you notice slowness the way other people notice speed. The default is set and you cannot unset it.',
    'The broadband is the fastest. The delivery comes in thirty minutes. The expectation is that everything arrives before it has finished being made. You have internalized this.',
  ])
  if (F.has('korean_economic_miracle_worker') && Math.random() < 0.2) return pick([
    'You worked in the factory during the miracle years. The country\'s GDP doubled. Your wages rose slightly. The ratio stayed roughly constant. You built the thing that gets called the miracle.',
    'The Saemaul Undong posters said diligence, self-help, cooperation. The posters were correct about what was required. They were less clear about who it was required for.',
  ])

  // ─── ERA TEXTURE ─────────────────────────────────────────────────────────────
  if (F.has('spanish_flu_generation') && Math.random() < 0.25) return pick([
    'The disease moved through the city in 1918 faster than any official account could follow. You remember the funerals, or the absence of funerals — the bodies moved quietly.',
    'You grew up knowing that the world had almost ended in 1918 and nobody had been allowed to say so clearly at the time. That knowledge has a specific texture.',
    phase === 'late_life'
      ? 'You have outlived the pandemic and the war that ran alongside it. The doctors said the second wave killed the young and healthy fastest. You were young and healthy. You are still here.'
      : 'Your generation learned early that institutions do not tell you the full number. You count what you can count yourself.',
  ])
  if (F.has('independence_disillusionment') && Math.random() < 0.3) return pick([
    phase === 'late_life'
      ? 'You watched the independence generation age into the thing it replaced. You are not sure this is a betrayal, exactly. You are not sure it isn\'t.'
      : 'The gap between what independence was supposed to produce and what it produced has been your generation\'s primary political education.',
    'The faces on the currency changed. The underlying question — who owns the land, who holds the contracts — has been slower to change.',
    'The leaders who led the independence movement are older now, and some of them have become the thing they replaced. You noticed this when you were old enough to notice it, and you have not forgotten.',
  ])

  // ─── EGYPT TEXTURE ───────────────────────────────────────────────────────────
  if (F.has('naksa_generation') && Math.random() < 0.3) return pick([
    'The radio in 1967 reported victories until it couldn\'t. The gap between the broadcast and what came back from the front was the education.',
    phase === 'late_life'
      ? 'You have watched Egypt contain the 1967 defeat for decades. The word Naksa — setback — was calibrated to minimize what happened. You know what happened.'
      : 'June 1967: the Sinai gone in six days. Nasser\'s resignation offered and then taken back because the crowds in the streets would not accept it. You were in those streets.',
    'The dream of Arab unity was tested against the morning of June 5, 1967, and the morning answered. You have been living with the answer since.',
  ])
  if (F.has('tahrir_generation') && Math.random() < 0.3) return pick([
    phase === 'late_life'
      ? 'You were in Tahrir for eighteen days. You have been describing what the nights in the square were like for a decade and the description does not fully arrive.'
      : 'February 11, 2011: the vice president reads the statement. The sound from Tahrir enters every window in Cairo at the same time.',
    'Eighteen days. The thing that was assumed to be permanent ended in eighteen days. You were there for both assumptions.',
  ])
  if (F.has('arab_spring_disillusionment') && Math.random() < 0.3) return pick([
    'The counter-revolution has a specific texture: the emergency law coming back, the square meaning something different now, the people you knew in 2011 in three places — prison, exile, silence.',
    'What followed Tahrir is the long answer to the short question of February 11. You have been living inside the long answer.',
    phase === 'late_life'
      ? 'You are old enough to have watched two versions of Egypt promise something and then not deliver it. The specific quality of the second disappointment is that you knew better.'
      : 'The revolution produced a counter-revolution that produced the features of the old system with some of the personnel changed. That is also a piece of information.',
  ])
  if (F.has('nasser_generation') && Math.random() < 0.2) return pick([
    'Nasser\'s voice on the radio had a quality that made people stop what they were doing. You remember the stopping.',
    'The Suez Canal, returned. The canal that had been someone else\'s for seventy-five years, returned. The radio made it sound like what it was: the first thing in a long time that went correctly.',
  ])
  if (F.has('mubarak_emergency_generation') && Math.random() < 0.2) return pick([
    'Thirty years of emergency law: the things you do not say in certain contexts, the groups you do not join, the petitions you do not sign. These are the shape of the law expressed in behaviour.',
    'The Emergency Law was renewed every three years. Each renewal was a statement about what the state assumed about the people it governed.',
  ])
  if (F.has('infitah_generation') && Math.random() < 0.2) return pick([
    'The door was open. Not everyone was on the same side of it. This is the sentence that describes the infitah most accurately.',
    'Consumer goods appeared in Cairo that had not been there before. The people who benefited immediately were those who already had capital or connections. That is also an economic policy.',
  ])
  if (F.has('egypt_bread_generation') && Math.random() < 0.2) return pick([
    'January 1977: the bread price doubled overnight. The streets filled. Seventy-nine people died. The government re-imposed the subsidies two days later. The government backed down. That fact is a piece of information that stays.',
    'Intifadat al-haita — the uprising of the thieves, the government called it. The people who were in the streets called it bread, honour, freedom. You know which account is more accurate.',
  ])

  // ─── INDIA TEXTURE ────────────────────────────────────────────────────────────
  if (F.has('emergency_generation') && Math.random() < 0.25) return pick([
    'The Emergency was twenty-one months in which India inserted a parenthesis into its own democracy and then closed it again. The country has not fully processed what was inside the parenthesis.',
    phase === 'late_life'
      ? 'You lived through the Emergency and came out the other side. The elections of 1977 produced a result that could not have been predicted from inside the Emergency. That fact still surprises you slightly.'
      : 'Indira Gandhi called elections in 1977 and lost. The parenthesis closed. The fact that it could be closed by elections is a piece of information about the country that coexists with the fact that the parenthesis was opened.',
  ])
  if (F.has('india_1984_generation') && Math.random() < 0.3) return pick([
    'The official figure is 2,733. Other counts are higher. The commissions of inquiry produced findings. The findings did not produce most of the convictions. That gap is also a piece of information.',
    phase === 'late_life'
      ? 'You have watched India process 1984 over four decades. The processing is incomplete. The gap between what you saw and what was subsequently said about it has narrowed somewhat and not entirely.'
      : 'October 31, 1984: the specific thing that was organized and how. What you saw and what was said about it do not match. You have filed the mismatch.',
  ])
  if (F.has('babri_generation') && Math.random() < 0.25) return pick([
    'December 6, 1992: the mosque was 464 years old. The crowd was several hundred thousand. The constitutional principle of secularism survived the afternoon as a word. What it was as a practice is a longer question.',
    'The Babri demolition produced a line in Indian politics that is still visible. The question of which side of the line you are on is not optional. You chose, or the category chose for you.',
  ])
  if (F.has('liberalization_generation') && Math.random() < 0.2) return pick([
    'The licence raj ended in 1991. What replaced it produced a class that did not exist in the 1980s and concentrations of wealth that the old model, for all its inefficiencies, did not produce either.',
    'Manmohan Singh\'s 1991 budget changed the language of the Indian economy. The new words — outsourcing, software, Bangalore — arrived in your life at a specific age and made different things possible.',
  ])
  if (F.has('bpo_generation') && Math.random() < 0.2) return pick([
    'Twelve-hour shifts on American time. The work name — Michael, Jessica — because the clients find the Indian name harder. The accent shift after eighteen months. You know what it cost and what it produced.',
    'Your salary was four times your father\'s government salary. He does not entirely understand what you do. He understands the salary. The suburb where you rented was full of people on similar shifts.',
  ])
  if (F.has('gujarat_2002_generation') && Math.random() < 0.2) return pick([
    '2002: organized violence, three months, the chief minister\'s role disputed in courts for years. You know what the account looked like from inside Gujarat and what it looked like from outside it.',
    'The question of state accountability for 2002 structured Indian politics for a generation. You were alive for both the events and the accounting, and you have watched the gap between them.',
  ])
  if (F.has('demonetization_generation') && Math.random() < 0.2) return pick([
    'November 8, 2016, 8pm: 86 percent of the currency in circulation, gone by midnight. The informal economy runs on cash. It was not given four hours to prepare.',
    'The queue lasted weeks. The government\'s assumption was that cash savings meant black money. Your savings were in cash because the bank was two hours away. The assumption did not include you.',
  ])

  // ─── IRELAND TEXTURE ─────────────────────────────────────────────────────────
  if (F.has('irish_emigrant_generation') && Math.random() < 0.3) return pick([
    'You are Irish at one remove. The remove is maintained by the specific labour of keeping up with what is happening in a place you are not.',
    phase === 'late_life'
      ? 'You left on the boat-train. You have been calculating the distance ever since — between here and there, between who you became here and who you would have been there.'
      : 'The emigrant\'s specific condition: belonging to a place you are not in, which is a form of belonging that requires more maintenance than the other kind.',
  ])
  if (F.has('celtic_tiger_generation') && Math.random() < 0.2) return pick([
    'The cranes were everywhere. The feeling of wealth was specific and convincing and based on house prices that assumed the growth continued. The growth did not continue.',
    'The Celtic Tiger was real and it was built on an assumption. The assumption was tested in 2008 and answered. You were in it before and after the answer.',
  ])
  if (F.has('irish_crash_generation') && Math.random() < 0.25) return pick([
    'The government guaranteed the bank debts in a single September night in 2008. Four hundred billion euros. The guarantee is still being discussed. The austerity happened immediately.',
    phase === 'late_life'
      ? 'You lived through two Irish economic collapses and two emigration waves. The pattern is more visible from here than it was from inside either one.'
      : 'The people who left in 2010 and 2011 were the children of the people who left in 1983. The country exported its young twice in thirty years.',
  ])
  if (F.has('irish_church_reckoning') && Math.random() < 0.25) return pick([
    'The institution that ran the schools and the hospitals and the Magdalene laundries is producing findings. The findings do not produce most of the convictions. The country is becoming something else.',
    'You grew up Catholic in a structural sense — the Church was not a choice, it was the furniture of the country. What the reports revealed about the furniture has not been fully processed.',
  ])
  if (F.has('stayed_in_ireland') && Math.random() < 0.2) return pick([
    'You watched the town empty in increments. The people who left sent back letters and then phone calls and then nothing much. You are still here and the question of whether staying was a choice or a default has never fully resolved.',
    phase === 'late_life'
      ? 'Everyone in your generation either left or came back. You never left. The ones who came back are different from the ones who stayed. You are one of the ones who stayed.'
      : 'The structural condition of twentieth-century Ireland was emigration. You are the exception to the structural condition. The exception has its own costs.',
  ])
  if (F.has('troubles_adjacent') && Math.random() < 0.2) return pick([
    'In the Republic, technically not in the conflict. The bombs in Dublin in 1974 clarified the word technically.',
    'The Troubles were on the other side of the border in the way that a fire in a shared building is on the other side of a wall.',
  ])

  // ─── TURKEY TEXTURE ──────────────────────────────────────────────────────────
  if (F.has('turkish_coup_generation') && Math.random() < 0.3) return pick([
    'September 12, 1980: 650,000 detained in three years. The torture in the military prisons was documented, systematic, and denied. You know this from inside the category or from its immediate vicinity.',
    phase === 'late_life'
      ? 'You have watched Turkey have three coups and one coup attempt. The pattern is not accident. The country has a specific relationship between the military and civilian government that takes decades to change.'
      : 'The constitution was rewritten in 1982 under military supervision. You have been living in the country produced by the rewriting since then.',
  ])
  if (F.has('marmara_earthquake_generation') && Math.random() < 0.25) return pick([
    'The buildings fell because the permits were obtainable without the construction. Corruption made concrete, which is what much corruption eventually becomes. You know this in your body.',
    'August 17, 1999, 3:02am. Seventeen thousand dead in the official count. The specific thing that killed people was a system, not a force of nature alone.',
  ])
  if (F.has('gezi_generation') && Math.random() < 0.25) return pick([
    'Gezi was the line. Before it you could argue about whether what was coming was what was coming. After it you could not. You were there for both sides of the line.',
    phase === 'late_life'
      ? 'The protest started over a park and became a question about what kind of country this was. The answer has been arriving in stages since 2013.'
      : 'Water cannon and tear gas and seven thousand detained. The crackdown clarified something that the preceding decade had left ambiguous.',
  ])
  if (F.has('turkish_historical_silence') && Math.random() < 0.2) return pick([
    'You know the shape of what the state has decided the past is allowed to be. The shape includes 1915 and the word that is not used and the people charged for using it.',
    'Orhan Pamuk charged for telling a Swiss newspaper the numbers. Charges dropped under international pressure. The pressure required is itself a piece of information about the country.',
  ])
  if (F.has('turkish_growth_generation') && Math.random() < 0.2) return pick([
    'The decade when GDP tripled: highways, hospitals, inflation down from 68 to 8 percent. The growth was real. The question of what it was building toward took a decade to arrive at an answer.',
    'The AKP\'s first decade produced something real in the economy and something real in the political landscape that were related and would take years to fully disentangle.',
  ])
  if (F.has('kemalist_generation') && Math.random() < 0.2) return pick([
    'The Kemalist settlement: secularism enforced from above, the military as its guardian, the headscarf question as one of its recurring tests. You grew up inside the settlement and its terms feel correct to you.',
    'Ataturk\'s republic at its core: the state secular, the army watching, the laicite not a preference but a constitutional principle. You know what was built and what the building required.',
  ])
  if (F.has('post_kemalist_generation') && Math.random() < 0.2) return pick([
    'The headscarf ban excluded specific women from specific universities for a specific religious practice. The principle of secularism and the exclusion of those women were not, to you, the same thing.',
    'You watched Kemalist secularism hold the line by barring women from lecture halls. The line it held began to look different from where you were standing than from where it was being defended.',
  ])
  if (F.has('turkish_conservative_generation') && Math.random() < 0.2) return pick([
    'The AKP spoke to people who had been outside the Kemalist networks — the Anatolian middle class, the practicing Muslim professional, the voter the Republican People\'s Party had not found a way to address. You were one of those people.',
    'The 2002 election was a realignment. The people who voted for it were not voting against democracy. They were voting against the version of Turkey that had excluded them from its benefits.',
  ])

  // ─── WEST AFRICA TEXTURE ─────────────────────────────────────────────────────
  if (F.has('nkrumah_generation') && Math.random() < 0.2) return pick([
    'Ghana, free forever. The idea was large enough for the whole continent to borrow from. You grew up in the country that was supposed to show what African self-governance could be.',
    phase === 'late_life'
      ? 'You watched the pan-African project begin in Ghana in 1957 and watched what happened over the decades after. The idea survived the disappointments differently than Nkrumah survived his coup.'
      : 'The coup happened in 1966 while Nkrumah was in Hanoi on a peace mission. The army took the airport back and renamed it. The idea took longer to name differently.',
  ])
  if (F.has('rawlings_generation') && Math.random() < 0.2) return pick([
    'The PNDC years: the corruption tribunals, the executions, the structural adjustment the IMF required. Ghana was being remade. The people you knew were paying for the remaking.',
    phase === 'late_life'
      ? 'Rawlings is the only person you know of who led two coups, then won a democratic election, then stepped down when he lost. The trajectory of it is not easy to summarise.'
      : 'The economy grew in the statistics during the adjustment years. The people you knew were careful with money in ways that statistics do not record.',
  ])
  if (F.has('ghana_democracy_generation') && Math.random() < 0.2) return pick([
    'The 2000 election: Kufuor wins, Rawlings steps down, the army stays in the barracks. Ghana became the thing the continent was promised in 1957 through the long route of several coups and structural adjustments.',
    'Ghana is one of the few African countries with a clean record of peaceful democratic transfers of power now. You were alive for the transitions. You know what it cost to get here.',
  ])
  if (F.has('ivorian_miracle_generation') && Math.random() < 0.2) return pick([
    'The Ivorian Miracle: 7 percent growth per year, the cocoa and coffee economy, Abidjan as the model African city. The miracle required four million migrants. The question of who belonged came later.',
    phase === 'late_life'
      ? 'Houphouët-Boigny ruled for thirty-three years. The miracle years were the first half. The second half was the slow emergence of the question his miracle had suppressed.'
      : 'The economy worked, in the years you grew up, in the way that economies work when commodity prices are high and the government is stable and the labour costs are kept low by the presence of people who have fewer rights than you.',
  ])
  if (F.has('ivoirite_generation') && Math.random() < 0.25) return pick([
    'Ivoirité: the concept was introduced to exclude a presidential candidate and expanded into a theory of who belongs in a country that was built on migrant labour. The civil war was inside the concept before the civil war was in the streets.',
    phase === 'late_life'
      ? 'You lived through the miracle years when the question of who was truly Ivorian was not asked, and then through the years when it was asked at volume and with violence.'
      : 'Four million people from Burkina Faso and Mali who built the cocoa economy found themselves in an ambiguous legal position when the concept arrived. The concept did not arrive from nowhere.',
  ])
  if (F.has('ivorian_civil_war_generation') && Math.random() < 0.25) return pick([
    'The line across the middle of the country. The zone of confidence. Abidjan in the south, Bouaké in the north, French troops and UN peacekeepers in the middle. You learned to navigate a country that had become two.',
    'The ceasefire line ran across the country for nine years. The things that crossed it — goods, people, phone signals — all crossed under specific conditions that you knew.',
  ])
  if (F.has('nigerian_oil_boom_generation') && Math.random() < 0.2) return pick([
    'The boom years: the naira strong, the roads being built, the government salaries that made sense. The structural problem was legible but the feeling of the moment was abundance. You remember the abundance.',
    'Oil at $35 a barrel and then higher. The federal government suddenly wealthy. The problem — that the wealth was flowing through patronage rather than into productive capacity — would become visible later.',
  ])
  if (F.has('sap_generation') && Math.random() < 0.25) return pick([
    'The SAP generation: the structural adjustment programme that removed the floor. Naira devaluation. University fees. Government salaries that could not keep up. You are one of the people the word SAP describes.',
    phase === 'late_life'
      ? 'You watched the oil boom become the SAP in the space of a decade. The generation that came after you inherited the aftermath. You inherited it first.'
      : 'The gap between the oil boom your parents described and the structural adjustment you lived is the gap that explains much of what followed.',
  ])
  if (F.has('saro_wiwa_generation') && Math.random() < 0.2) return pick([
    'November 10, 1995. The execution went ahead. The Commonwealth suspended Nigeria. The oil continued to be extracted. The delta continued to burn. These things happened in sequence and the sequence is information.',
    'Ken Saro-Wiwa documented what Shell\'s extraction had done to the Ogoni land and water and was hanged for it. The documentation is still accurate. The delta is still burning.',
  ])
  if (F.has('nigerian_diaspora_stigma') && Math.random() < 0.2) return pick([
    'The 419 stereotype: 120 million people held responsible for the reputation established by a smaller number. You have managed the assumption in rooms where it was already made. You will manage it again.',
    'Being Nigerian abroad in the 1990s and 2000s: the email opens and the person across the desk has already decided something. You have learned the specific labour of undeciding it.',
  ])

  // ─── UGANDA TEXTURE ──────────────────────────────────────────────────────────
  if (F.has('amin_generation') && Math.random() < 0.22) return pick([
    'The Amin years: the ambient fear of a government that killed without accounting. You learned to read the environment for signals that people elsewhere did not have to read.',
    phase === 'late_life'
      ? 'You have outlasted Idi Amin. You have outlasted several of the people who served him. The length of a life is sometimes measured in who you have outlasted.'
      : 'The word "disappeared" acquired its Ugandan meaning in those years. You use it with the weight of someone who was present when the word changed.',
  ])
  if (F.has('amin_asian_expulsion') && Math.random() < 0.25) return pick([
    'Ninety days to pack three generations. The business, the property, the network of relationships — all of it left, or abandoned, which is not the same thing.',
    phase === 'late_life'
      ? 'You built something new after the expulsion, in the country that took you in. The thing you built is real. The thing left behind is also real. You carry both.'
      : 'Uganda is where your family was from, in the sense that matters — the streets known, the language learned, the decades accumulated there. The passport said otherwise.',
  ])
  if (F.has('lra_northern_generation') && Math.random() < 0.25) return pick([
    'The night commute: the mat by the door, the route known by dark, the return in the morning light. That is a childhood texture that does not dissolve when the war ends.',
    'Gulu. Kitgum. Pader. The names of the towns were the names of the crisis. You know what those names contain.',
    phase === 'late_life'
      ? 'The LRA years in the north are over. The trauma counsellors call it post-conflict recovery. You call it continuing to live in a place that had something done to it.'
      : 'The children abducted by the LRA came back changed, when they came back. The ones who didn\'t come back did not come back.',
  ])
  if (F.has('ugandan_aids_generation') && Math.random() < 0.22) return pick([
    '"Slim." The village learned the word before the word AIDS arrived. The learning was in watching — the weight lost, the progression, the specific shape of it.',
    'Uganda was first. That is both true and not something that explains what it meant to be in a village where people were dying of something that had no name yet.',
    phase === 'late_life'
      ? 'The ABC campaign came. The numbers improved. Uganda is held up in global health discussions as a success story. The success story includes the village you knew in 1988.'
      : 'The disease followed the roads — truck routes, trading routes, the routes of movement. That is how you understood the geography of risk before you had that vocabulary.',
  ])
  if (F.has('museveni_liberation_generation') && Math.random() < 0.18) return pick([
    '"No army has the right to mishandle you." You were present for the speech. You knew what it meant to hear that sentence in Uganda in January 1986.',
    phase === 'late_life'
      ? 'You remember what the 1986 hope felt like. The distance between that hope and what followed is the education. You have it. You would not give it back.'
      : 'The liberation was real. The question of what it became is also real. You are old enough to hold both.',
  ])
  if (F.has('museveni_consolidation_generation') && Math.random() < 0.2) return pick([
    'He removed the term limits. The man who had called term limits essential for African democracy removed his own. You were present for the original speech and for the amendment.',
    phase === 'late_life'
      ? 'Thirty-five years. You have lived your entire adult life under the same government. That is a specific kind of knowledge about what governments become.'
      : 'The NRM that liberated Uganda and the NRM that managed the 2021 election are technically the same party. The distance between them is the story.',
  ])
  if (F.has('kampala_informal_generation') && Math.random() < 0.15) return pick([
    'The boda-boda gets you there faster than anything else in Kampala traffic. That it also kills more people than almost anything else in Uganda is the trade-off you have learned to make.',
  ])

  // ─── SOMALIA TEXTURE ─────────────────────────────────────────────────────────
  if (F.has('somalia_state_collapse') && Math.random() < 0.25) return pick([
    'The city that existed before 1991 exists now only in what people your parents\' age describe. The city you grew up in was the one built on top of the collapse.',
    phase === 'late_life'
      ? 'You have lived in a country that had no government for most of your adult life. You have outlasted the warlords, the famines, the interventions. That is a specific kind of durability.'
      : 'The checkpoint was where you learned what your clan was worth on that particular day, to that particular person. The arithmetic was always changing.',
  ])
  if (F.has('somali_clan_identity') && Math.random() < 0.2) return pick([
    'The clan question: which one, from which lineage, from where. You have answered it at checkpoints and at weddings and at job interviews and in hospitals. The answer changes what happens next.',
    'The xeer — the customary law — runs on clan. The state was absent. The clan was not. You have been grateful for this and burdened by it in the same years.',
  ])
  if (F.has('mogadishu_1993_generation') && Math.random() < 0.18) return pick([
    'The Battle of Mogadishu was a film title in America. In Mogadishu it was an October day in a city that had been fighting for two years. The film and the day are different things.',
    'The American soldiers came to capture one man. The helicopter went down. Eighteen Americans died, and several hundred Somalis, and the Americans went home. The Somalis stayed in the city.',
  ])
  if (F.has('alshabaab_generation') && Math.random() < 0.25) return pick([
    'The music was the first thing. No music in the streets, no music in the teahouses, no music from the phones. You understand now that the music was the announcement — everything else followed from it.',
    phase === 'late_life'
      ? 'Al-Shabaab is still there, in the rural south, in the checkpoints, in the bombs in Mogadishu markets. It is not the whole country. It is a permanent fact of the country.'
      : 'The rules change by district. In this district: phones require registration. In that district: women do not travel without a male relative. You know the map of the rules the way you know a geography.',
  ])
  if (F.has('somali_diaspora_connection') && Math.random() < 0.2) return pick([
    'The money comes through the hawala broker. The broker\'s system works because it runs on trust and on reputation across generations of the same network. You trust it. It has not failed you yet.',
    'Your relative in Oslo calls. The call is about the money and also about everything else — the family, the news, the distance. The call is the lifeline in both directions.',
  ])
  if (F.has('somalia_famine_2011') && Math.random() < 0.22) return pick([
    '260,000 people. The number was announced by the UN after the fact. From inside it, the number did not exist. The specific people did.',
    phase === 'late_life'
      ? 'The 2011 famine is one of the things you describe when people ask what it was like. It is not the only thing, but it is one of the things that landed differently from the usual hardship.'
      : 'The drought and the fighting were in the same places that year. The aid could not reach where the fighting was. The people in those places are in both facts at once.',
  ])
  if (F.has('somaliland_generation') && Math.random() < 0.2) return pick([
    'Somaliland is not recognised. It has a government, elections, a currency, a police force, a constitution. The non-recognition is an international administrative fact. The governance is a lived fact.',
    'You grew up in a place the world decided did not officially exist. The place exists. You exist in it. The decision is the world\'s problem.',
  ])

  // ─── THAILAND TEXTURE ────────────────────────────────────────────────────────
  if (F.has('thai_uncolonized_identity') && Math.random() < 0.15) return pick([
    'The curriculum taught that Thailand survived by playing the colonial powers against each other. The curriculum was right about the survival and incomplete about the cost of it.',
    phase === 'late_life'
      ? 'You have lived in the country that did not become a colony. The history of what that required — ceded territories, tributary relationships — is something you understand better late than you did young.'
      : 'To be Thai is to carry a particular national pride. That pride has a specific shape: we were not taken. What we gave to stay free is a different conversation.',
  ])
  if (F.has('thai_lese_majeste_awareness') && Math.random() < 0.22) return pick([
    'The pause before the opinion. That pause is what Article 112 produces — not silence, exactly, but the awareness that silence is available and speaking is not always safe.',
    'You know people who were careful and still found themselves accused. The law does not require actual insult — only accusation. You have learned the specific shape of that risk.',
    phase === 'late_life'
      ? 'You have lived your entire adult life inside Article 112. The self-censorship is so practised now that you cannot always tell where the law ends and your own caution begins.'
      : 'Every phone, every post, the forwarded article — each is potentially a count. The counts accumulate. People you know have had a decade assembled from individual counts.',
  ])
  if (F.has('thai_1997_generation') && Math.random() < 0.2) return pick([
    'The baht. The construction sites that stopped. The cranes left up while the buildings below them stalled. The 1997 crisis arrives in your memory as a set of specific images.',
    'Thailand started it — or the speculator who bet against the baht started it, depending on your economics. The contagion spread to the whole region. You were in the country that was the trigger.',
  ])
  if (F.has('thai_red_generation') && Math.random() < 0.2) return pick([
    'Thirty baht to see a doctor. The village fund. You remember what the policy was before the coup ended it. The election result that brought it back was overturned too. You track this.',
    'The Red Shirts stood in Bangkok for two months in 2010. Ninety people died when the army moved in. The government that came after repealed the policies that the Red Shirts had voted for.',
  ])
  if (F.has('thai_yellow_generation') && Math.random() < 0.18) return pick([
    'The corruption was real. The question was whether a corrupt democracy is preferable to a managed transition. You answered it the way you answered it. You are still living with the answer.',
    'Thaksin is in exile. His party wins the next election. Is dissolved by the court. Wins again. Is dissolved again. You have watched this cycle enough times to know it does not resolve.',
  ])
  if (F.has('thai_coup_generation') && Math.random() < 0.18) return pick([
    'Thailand has had more successful coups than most countries have had elections. That is an odd thing to be from.',
    'The general on television said: this is temporary, for national stability, elections will follow. You have heard this before. You have noticed what "temporary" means here.',
    phase === 'late_life'
      ? 'You have lived through multiple coups. The pattern is legible now: the tanks, the curfew, the junta with a roadmap to elections, the elections that produce the wrong result, the tanks again.'
      : 'The coup is not violent in the way you expected. The tanks are in the streets and the sky is blue and the restaurants are open. This is specifically Thai.',
  ])
  if (F.has('thai_middle_income_generation') && Math.random() < 0.15) return pick([
    'The economists call it the middle-income trap: you leave agriculture, you enter manufacturing, you grow, and then the growth slows before you cross into the wealthy tier. Thailand has been in the trap for thirty years.',
    'The factory gave you a wage and the wage gave you a life that your parents did not have. The question of what the next step is has been open for a generation.',
  ])

  // ─── NEPAL TEXTURE ───────────────────────────────────────────────────────────
  if (F.has('nepal_maoist_generation') && Math.random() < 0.2) return pick([
    'The Maoists had a presence in this area. That meant something specific about who you reported a dispute to, and who you did not.',
    'The People\'s War lasted ten years. 13,000 people died. Most of them are not in any history your children will read.',
    phase === 'late_life'
      ? 'The Maoist war is a history lesson now. You remember it as weather — something that changed the air, changed who could be in a room together, changed what you said out loud.'
      : 'The distinction between the Maoists and the army was not always clear from the ground. The clearness was in the newspaper. The ground was something else.',
  ])
  if (F.has('nepal_royal_massacre_generation') && Math.random() < 0.18) return pick([
    'Crown Prince Dipendra shot his parents, shot eight members of the royal family, then shot himself. He was declared king while on life support. He died three days later. The official account is disputed.',
    'The royal massacre happened in the palace. The conspiracy theories accumulated in the absence of a credible investigation. A country in which the king was also a god found that the god had bled.',
  ])
  if (F.has('nepal_republic_generation') && Math.random() < 0.18) return pick([
    'In May 2008 the Constituent Assembly voted to abolish the monarchy. The world\'s only Hindu kingdom — 240 years of Shah dynasty — ended by vote.',
    phase === 'late_life'
      ? 'You were born a subject of the Shah dynasty and became a citizen of the federal republic. That arc took forty years and a people\'s movement and a civil war to complete.'
      : 'The republic is new. The flags are new. The government is new. The habits of hierarchy that the monarchy ran on are older than the republic and take longer to change.',
  ])
  if (F.has('nepal_gulf_worker') && Math.random() < 0.22) return pick([
    'The remittance comes every month. The money crosses a border your body crossed years ago.',
    'Kafala means your employer holds your residency. You knew this before you went. Knowing it did not change what the money meant at home.',
    phase === 'late_life'
      ? 'The years in the Gulf were a transaction. You knew that when you went. The question is whether the transaction was worth what it cost in the ways that cannot be counted.'
      : 'You are one of the 1,500 young Nepalis who leave every day. The statistic does not capture what the airport felt like.',
  ])
  if (F.has('nepal_earthquake_generation') && Math.random() < 0.22) return pick([
    'The shaking lasted almost a minute. You know what that feels like. Most people do not.',
    'After the 2015 earthquake, Kathmandu\'s brick buildings — the ones that had been buildings for a hundred years — were rubble. The medieval squares of Bhaktapur were rubble.',
    phase === 'late_life'
      ? 'You have described where you were when the earthquake hit more times than you can count. The story has settled into a shape. The feeling underneath the shape has not.'
      : '9,000 people died in the earthquake. The international aid arrived faster than the government could distribute it. You spent weeks navigating that gap.',
  ])
  if (F.has('nepal_youth_exodus_generation') && Math.random() < 0.17) return pick([
    'The village is full of women and older people and children. The young men are in Qatar or Malaysia or Kuwait. This is what a remittance economy looks like from the inside.',
    'The economy cannot absorb the educated youth. The alternative — Kathmandu\'s government jobs, going to the connected — is not enough either. The airport is the third option.',
  ])

  // ─── MYANMAR TEXTURE ─────────────────────────────────────────────────────────
  if (F.has('myanmar_socialist_generation') && Math.random() < 0.14) return pick([
    'The Burmese Way to Socialism kept the world at a specific distance. You grew up knowing the outside was there the way you know about countries you have never visited.',
    'The economy was nationalised and the result was shortage. Not catastrophic — just persistent. The word for it was "scarcity." The shelves had something on them; not always what you needed.',
  ])
  if (F.has('myanmar_1988_generation') && Math.random() < 0.22) return pick([
    'August 1988. You are not sure you have fully put it somewhere. The feeling of the city that week — the hundreds of thousands of people who came out — is not something that fits in a sentence.',
    'The generals came back. That is the thing about 1988 that matters most in retrospect. The crowd was real. The army was also real. The army was more persistent.',
    phase === 'late_life'
      ? 'You were young during the uprising. You have spent your adult life in the country the crackdown made. The arithmetic of that is not something you have finished with.'
      : 'Three thousand people died in September 1988. The official number is lower. You don\'t use the official number.',
  ])
  if (F.has('myanmar_activist') && Math.random() < 0.2) return pick([
    'You were in the streets in 1988. You know what it felt like when the city was briefly something else. That feeling is yours and has no safe destination.',
    'The activist in you did not disappear when the army came back. It went underground. That is a different shape but it is still the same thing.',
  ])
  if (F.has('myanmar_junta_generation') && Math.random() < 0.18) return pick([
    'The NLD won 82 percent of the seats in 1990. The junta never transferred power. That fact is still the foundation underneath everything that has happened since.',
    'Life under the SPDC had its own protocols: what you said, to whom, in what room, with which windows closed. You learned these before you learned their names.',
  ])
  if (F.has('myanmar_saffron_generation') && Math.random() < 0.2) return pick([
    'The monks walked with their bowls upside down. That gesture — refusing to accept alms from the military — was a religious condemnation the generals had no answer for except the one they gave.',
    'The Saffron Revolution was crushed in a week. The internet was shut down. The camera footage that survived went out on drives and memory cards carried by hand.',
    phase === 'late_life'
      ? 'You saw the monks in the streets in 2007. That image is part of your memory of what Myanmar is, alongside the crackdown that followed.'
      : 'The question of what a nonviolent protest can achieve against an army that is willing to shoot monks is a question 2007 answered.',
  ])
  if (F.has('myanmar_nargis_generation') && Math.random() < 0.22) return pick([
    'The Irrawaddy Delta in May 2008: 140,000 dead. The junta blocked the foreign aid teams for weeks. The two facts belong together.',
    'Nargis arrived faster than the warning did. You remember where you were and what the air smelled like before the storm changed everything about what was possible to remember from before.',
    phase === 'late_life'
      ? 'You have lived in the country the cyclone made and the country the junta\'s response to the cyclone made. They are the same country. The coincidence tells you something.'
      : 'You spent weeks trying to find out who survived. The information came slowly. Some of it never came.',
  ])
  if (F.has('myanmar_civilian_hope_generation') && Math.random() < 0.17) return pick([
    'The newspapers published things in 2012 that would have meant prison in 2010. You noticed that. You also noticed the military still controlled the ministries.',
    'The decade from 2011 to 2021 had a specific texture: the feeling that the opening was real but narrow, that something better was possible if the generals could be managed. You gave that texture its due. Then 2021 happened.',
  ])
  if (F.has('myanmar_coup_2021') && Math.random() < 0.22) return pick([
    'February 1, 2021: the NLD won 83 percent of the vote and the military\'s answer was to arrest the government before dawn.',
    phase === 'late_life'
      ? 'You have now lived through both 1988 and 2021. The pattern is legible. The army does not surrender power. That is the axiom everything else follows from.'
      : 'The Civil Disobedience Movement was millions of people refusing to function as the coup required. The military had guns. The question of which force wins is still being answered.',
    'The decade of opening was real. It was also reversible. You know both of those things now.',
  ])
  if (F.has('myanmar_cdm_participant') && Math.random() < 0.2) return pick([
    'You joined the Civil Disobedience Movement. Your name is in someone\'s records somewhere. You have decided to live with that.',
    'The strike meant no salary, possibly no career, and the particular courage of refusing to make the coup function. You know why you did it. You check the decision sometimes and it holds.',
    phase === 'late_life'
      ? 'The years after the CDM cost specific things. You are still accounting for what you gained that cannot be subtracted.'
      : 'You are in the generation that had to decide what to do when the army came back in 2021. You made your decision. You live in it.',
  ])

  // ─── NEIGHBORHOOD TIER TEXTURE ───────────────────────────────────────────────
  {
    const nbhTier = state.currentNeighborhoodTier
    const nbhName = state.currentNeighborhoodName
    if (nbhTier === 'informal' && Math.random() < 0.3) return pick([
      nbhName
        ? `The water in ${nbhName} runs from the standpipe at the corner until mid-morning. You have arranged your life around this.`
        : 'The water runs from the standpipe until mid-morning. You have arranged your life around this.',
      'The title to the land the house is on is not the kind of title that appears in government records. You know this and you have learned to live with knowing it.',
      'The electricity comes from a line that someone ran off the main grid years ago. It is reliable in the way things are reliable when a community maintains them together.',
      'When it rains hard, the lane floods. You know which rains are the kind you prepare for and which are the kind you just wait out.',
      phase === 'late_life'
        ? 'You have lived here long enough to see the settlement become a neighbourhood — the shops, the school, the church or mosque, the names the streets acquired because someone started using them.'
        : 'The neighbourhood was not built by a plan. It was built by people solving immediate problems one decision at a time, and it works with the logic of that.',
    ])
    if (nbhTier === 'working_class' && Math.random() < 0.2) return pick([
      'A quiet year. The work is steady. The margin is thin but it is there.',
      'The neighbours know your name. This has value that is not easy to account for in any framework that doesn\'t include it.',
      phase === 'midlife' || phase === 'late_life'
        ? 'You have lived in this neighbourhood long enough to see it change and not change. The things that are the same are the things that matter most.'
        : 'The neighbourhood is not what the magazines show but it is yours — the specific corner, the specific shop, the specific route you take.',
    ])
    if (nbhTier === 'elite' && Math.random() < 0.2) return pick([
      'The neighbourhood has a quality of maintained distance from the problems of other parts of the city. You notice this more in some years than others.',
      'You can afford not to think about certain things that people in other parts of the city cannot stop thinking about. This is the structural fact underneath the comfort.',
      phase === 'late_life'
        ? 'The walls, the guards, the distance from what is difficult. You have been comfortable for long enough to understand that the comfort is not neutral.'
        : 'The address opens certain doors. You did not choose to be born to this or to arrive here — or you did choose, and the choice required a specific set of prior circumstances. Either way, the address is real.',
    ])
  }

  // ─── RETIREMENT TEXTURE ──────────────────────────────────────────────────────

  if ((state.retired || F.has('retired') || F.has('semi_retired')) && phase === 'late_life' && Math.random() < 0.28) {
    const forcedOut = F.has('forced_out')
    const semiRetired = F.has('semi_retired') && !F.has('retired')
    if (semiRetired) return pick([
      'You are still doing some of the work. Less of it, and differently. That adjustment is ongoing.',
      'The partial version of the career turns out to have its own rhythms. You are still finding them.',
      'The years of full-time have become the years of some-time. The some-time has its own pleasures.',
    ])
    if (forcedOut) return pick([
      'You did not choose to stop. The career made the decision and you are still accounting for it.',
      'The work ended before you were ready. You are doing the thing of finding what comes after a thing you did not finish.',
      'You have built something in the years since the job ended. It is not the same thing. It is something.',
      phase === 'late_life' && age >= 70
        ? 'From this distance, the forced retirement looks different. You had more years than the job was going to give you. You used them.'
        : 'The ending was not yours to choose. The years after it are.',
    ])
    return pick([
      'You are retired. The word still requires some adjustment, depending on the day.',
      'The structure of a working life — the schedule, the identity, the reason to be somewhere at a specific time — is something you are replacing slowly.',
      'The mornings are yours now in a way they have never been yours before. You are working out what to do with that.',
      'You have been the person with the job for forty years. Becoming a different version of the person is the project now.',
      age >= 70
        ? 'The retirement has settled into something. Not the absence of work — something with its own texture. You are in it.'
        : 'The first year of retirement was strange. You are somewhere past the first year now.',
      partner
        ? `You and ${partner.name.split(' ')[0]} are in each other's space in a new way. You are negotiating the hours together that were previously filled by the separate going-away.`
        : 'The days have a shape that is yours to set. You are still setting it.',
      career
        ? `The ${career.title} years are behind you now. You look at younger people doing what you did and you recognise something in how they carry it.`
        : 'You have more time than you know what to do with, which is the problem of a life that was previously too busy to encounter it.',
    ])
  }

  // ─── EXPANDED PHASE POOLS ────────────────────────────────────────────────────

  // Late life specific
  if (phase === 'late_life') {
    // Very old (85+)
    if (age >= 85 && Math.random() < 0.45) return pick([
      'You have outlived most of the people who knew you at thirty. That is the arithmetic of a long life.',
      'The world has changed so many times that you have stopped being surprised by the next change.',
      'Your body is not what you have. It is what you are negotiating with.',
      'You are one of the last people who remember certain things. You are aware of this.',
      partner ? `You and ${partner.name.split(' ')[0]} are still here. After all of this, still here.` : 'You have made it this far alone. That required something. You are not entirely sure what.',
      'The life has been longer than you expected. That is a gift with its own weight.',
      'Some mornings are better than others. The others are still mornings.',
    ])
    // Older (75+)
    if (age >= 75 && Math.random() < 0.35) return pick([
      'The body\'s limitations are no longer surprises — they are the conditions of the day.',
      'You are at the age where doctors describe your results as "good for your age." You have learned to receive this.',
      'The generation ahead of you is mostly gone. You are now the generation ahead.',
      'You have been doing most things for fifty or sixty years. The things you have not done are clearly not going to be done.',
      'Some people your age are sharp and some are not. You are watching which way the wind is blowing for you.',
      'The phone contains more dead contacts than you realized until you looked.',
      'You move at the speed you move at now. That is a negotiation with yourself that took some years to complete.',
    ])
    return pick([
      'The body keeps its own calendar. You have learned to negotiate.',
      'You know more people who have died than you used to. That is how it goes.',
      'A slower year. You are not sure if slower is worse or just different.',
      'The years are shorter now. Each one passes before you have finished with it.',
      'You notice small things more than you used to. The quality of morning light. How coffee smells before you drink it.',
      'Some of the people who made you possible are gone now. You carry them.',
      'You have opinions about fewer things than you used to. The ones that remain are firm.',
      'The body makes suggestions. You take most of them now.',
      'You have learned to let some things go. You are still learning which things.',
      'There is a satisfaction in days that are simply good. You have stopped waiting for them to add up to something.',
      'The grandchildren are impossible and wonderful. Time with them passes at a different speed.',
      'You have started to understand your parents. The understanding came too late for them to know.',
      'Sleep is its own country now. You visit at odd hours.',
      'Your memory is selective in ways you didn\'t authorize.',
      'Some friendships have lasted forty years. You don\'t take that for granted anymore.',
      'You have become the person younger people ask for advice. You give it carefully.',
      'The things you were certain of at thirty look different from here.',
      'A year of more behind than ahead. That is the arithmetic now.',
      'You are learning the grammar of this phase. The sentences are shorter.',
      'You have done most of the things. The undone ones are either being set aside or being started.',
      'The expectations are off now — from yourself and from the people around you. That is a form of freedom.',
      'You have lived long enough to see which of your certainties were correct and which were posture.',
    ])
  }

  if (phase === 'midlife') {
    return pick([
      'The middle of things. You are managing it, more or less.',
      'Another year of more obligations than time.',
      'Some weeks are almost invisible they are so routine. That is not necessarily bad.',
      'You are becoming more yourself, or less — it is hard to tell from inside it.',
      'The days are full in the way that midlife days are full: too much and none of it quite enough.',
      'You catch yourself in mirrors in public places and are briefly surprised.',
      'The children are growing in a direction that no longer requires you at every step. You are still adjusting.',
      'Your body has started keeping a different kind of account.',
      'There is a version of yourself you thought you would be by now. You have stopped waiting for it.',
      'The work takes up the same space it always has. The question of whether it is the right work is louder some years.',
      'You know more now than you did. That is useful and insufficient simultaneously.',
      'The relationships that have lasted have their own density now.',
      'You have started to understand that most things cannot be fixed, only carried.',
      'There is less drama than there used to be. You are not sure if that is maturity or just exhaustion.',
      'The world has changed and you have changed and neither of you is quite what the other expected.',
      'Some days are entirely administration. You have made peace with this, mostly.',
      'You are in the middle of several things at once. That is the condition.',
      'The years are getting their own texture now — not just generic time but specific weather, specific griefs.',
      'Something that mattered enormously at twenty-five you have quietly let go of. You are not sure when.',
      'The body is not unreliable yet. But it has started to leave notes.',
      'You have fewer people to impress. The remaining ones matter more.',
      'The question of what kind of person you have become is harder to avoid at this distance.',
      'Some friendships are built deep enough now that they require less maintenance than a houseplant.',
      'You have stopped needing the thing you thought you needed at twenty. That took longer than it should have.',
      'There is a pleasure in competence — in knowing how to do things — that is different from ambition.',
      'You are far enough from youth to see it clearly and close enough to late life to feel the arithmetic.',
      'The accumulation of ordinary days has become something. You are not entirely sure what.',
      'You have opinions about things you didn\'t used to notice. Neighbours. Sleep. How people eat.',
      'This is, statistically, the middle. You try not to think about the second half too directly.',
    ])
  }

  if (phase === 'young_adult') {
    return pick([
      'The shape of things is still forming.',
      'You are working something out. You will be working it out for a while.',
      'A year of learning what matters to you by process of elimination.',
      'The future is still mostly theoretical.',
      'You have not become who you are going to be yet. That is not a problem.',
      'You are building something — a life, a self, a version of both — and the blueprint keeps changing.',
      'You are in the city / in the world / in the thing. It is larger than you expected.',
      'The decisions that matter are not always the ones that look like decisions.',
      'You have made some mistakes. The useful ones are teaching you something.',
      'The people who knew you before are seeing you become someone they don\'t entirely recognise. You are learning to let that be.',
      'You do not have enough money and you are fine. For now.',
      'There is a gap between the life you imagined and the one you are building. You are learning which parts of that gap to close.',
      'Your opinions are forming and hardening and sometimes cracking. You are letting them.',
      'You are acquiring a self by trial and error, which is the only way.',
    ])
  }

  if (phase === 'adolescence') {
    return pick([
      'The year moves in the way that years do when you are watching them closely.',
      'You are bigger than you were. That is the year\'s clearest fact.',
      'Something is being decided that you won\'t fully understand until later.',
      'The body is doing things without your permission. You are making the best of it.',
      'The world outside the family is becoming the more real one.',
      'You are paying close attention to who you want to be. The answer changes.',
      'Your friendships are the whole world. This is embarrassing to admit.',
      'You are learning the distance between what you feel and what you say.',
      'The future is abstract and extremely loud inside your head at the same time.',
      'Something in you is building up pressure. You are not sure yet which direction it will go.',
      'You are rehearsing yourself constantly. The audience is everyone and no one.',
      'The adults are less sure of things than they seemed from a distance.',
    ])
  }

  if (phase === 'childhood') {
    return pick([
      'A year of ordinary things that will look remarkable from far enough away.',
      'The world is still the size of the people in it.',
      'Another year of the life you have been given.',
      'You are learning who you are by watching everyone around you be who they are.',
      'The days are long in the way that childhood days are long — the afternoon is its own country.',
      'You have a best friend. This is everything.',
      'School is the main project of the year. You approach it accordingly.',
      'Something your mother or father says will stay with you longer than they intend.',
      'The world is large and mostly benign and occasionally strange.',
      'You are storing things away without knowing you are storing them.',
      'A year of questions. Most of them don\'t have the answer you wanted.',
      'You are learning what the family expects of you. You are also learning what you think of that.',
    ])
  }

  if (phase === 'early_childhood') {
    return pick([
      'The world is very close. Adults are very tall.',
      'A year of firsts, most of which you will not remember.',
      'You are learning the names of things. The names feel large.',
      'The people around you are the entire world. You sense this.',
      'You are discovering that you are a separate person from everyone else. This takes time.',
    ])
  }

  // ─── UNIVERSAL FALLBACK ───────────────────────────────────────────────────────
  return pick([
    'A year without incident. These exist.',
    'The days have a rhythm to them.',
    'Nothing remarkable. You are grateful for that, mostly.',
    'Time passes, as it does.',
    'A quiet year. Not every year needs to be a story.',
    'The life continues.',
    'A year of small decisions that add up to something.',
    'You are here. That is the year\'s summary.',
    'The ordinary is underrated.',
    'Another year done. Not every year needs a name.',
    'The routine holds. Routine is not nothing.',
    'You are making your way through it. Everyone is.',
    'A year of maintenance — of the life, of yourself, of the people in it.',
    'Nothing major. The quiet kind of year that is sometimes the one you need.',
    'The world did its thing. You did yours. Neither of you asked the other\'s permission.',
    'You got through the year. Some years that is the achievement.',
  ])
}



function applyWorldEvents(state) {
  let updated = { ...state }
  const G = buildG(state)
  for (const we of WORLD_EVENTS) {
    if (updated.worldEventsFired.has(we.id)) continue
    if (state.currentYear < we.years[0] || state.currentYear > we.years[1]) continue
    const archetypesMatch = !we.archetypes || we.archetypes === 'all' || we.archetypes.includes(state.character.country.archetype)
    const countryMatch = !we.countries || we.countries.includes(state.character.country.name)
    if (!archetypesMatch || !countryMatch) continue
    if (we.minAge && state.age < we.minAge) continue
    if (we.maxAge && state.age > we.maxAge) continue
    if (we.when && !we.when(G)) continue
    const proxy = buildEffectProxy(updated)
    we.effect(proxy)
    updated = applyProxy(updated, proxy)
    updated.worldEventsFired = new Set([...updated.worldEventsFired, we.id])
    const narrativeText = typeof we.narrative === 'function' ? we.narrative(G) : we.narrative
    updated.log = [...updated.log, { age: updated.age, text: narrativeText, worldEventName: we.name, isKey: true, isWorld: true }]
    if (we.addFlags) updated.flags = [...new Set([...updated.flags, ...we.addFlags])]
  }
  return updated
}

function applyHeadlines(state) {
  const year = state.currentYear
  const archetype = state.character?.country?.archetype
  const countryName = state.character?.country?.name
  const seenKey = `headline_${year}`
  if (state.mem?.[seenKey]) return state
  const matching = HEADLINES.filter(h => {
    if (h.year !== year) return false
    if (h.minAge && state.age < h.minAge) return false
    if (h.archetypes !== 'all' && !h.archetypes.includes(archetype)) return false
    if (h.countries && !h.countries.includes(countryName)) return false
    return true
  })
  if (matching.length === 0) return state
  const newEntries = matching.map(h => ({ age: state.age, text: h.text, isKey: false, isHeadline: true }))
  return {
    ...state,
    mem: { ...(state.mem ?? {}), [seenKey]: true },
    log: [...state.log, ...newEntries],
  }
}

// ─── Death ────────────────────────────────────────────────────────────────────

function checkDeath(state) {
  const { age, stats, character, flags } = state
  let prob = 0
  if (age < 2) {
    const neonatal = { very_poor: 0.06, poor: 0.03, fair: 0.015, good: 0.005, excellent: 0.002 }
    prob = neonatal[character.country.healthcare] ?? 0.015
  } else if (age < 6) {
    const infant = { very_poor: 0.03, poor: 0.015, fair: 0.006, good: 0.002, excellent: 0.001 }
    prob = infant[character.country.healthcare] ?? 0.006
    prob += character.country.conflictRisk * 0.05
  } else if (age < 18) {
    prob = 0.001 + character.country.conflictRisk * 0.08
    if (flags.includes('child_soldier')) prob += 0.05
  } else if (age < 35) {
    prob = 0.002 + character.country.conflictRisk * 0.04
    if (flags.includes('criminal_life')) prob += 0.015
    if (stats.happiness < 15) prob += 0.02
  } else if (age < 50) {
    prob = 0.004 + (age - 35) * 0.0003
    if (stats.health < 25) prob += 0.025
    if (flags.includes('smoker')) prob += 0.005
  } else if (age < 65) {
    prob = 0.012 + (age - 50) * 0.001
    if (stats.health < 35) prob += 0.04
    if (flags.includes('smoker')) prob += 0.01
  } else if (age < 75) {
    prob = 0.03 + (age - 65) * 0.003
    if (stats.health < 40) prob += 0.05
  } else if (age < 85) {
    prob = 0.07 + (age - 75) * 0.007
  } else if (age < 95) {
    prob = 0.14 + (age - 85) * 0.015
  } else {
    prob = 0.30 + (age - 95) * 0.06
  }
  const hcMod = { excellent: 0.65, good: 0.8, fair: 1.0, poor: 1.25, very_poor: 1.5 }
  prob *= hcMod[character.country.healthcare] ?? 1.0
  if (stats.health < 10) prob += 0.15
  // Karma very slightly modifies survival odds
  const karma = state.karma ?? 50
  prob *= clamp(1 - (karma - 50) * 0.002, 0.8, 1.2)
  if (!chance(prob)) return { dead: false }
  return { dead: true, cause: determineCause(state) }
}

function determineCause({ age, stats, flags, character }) {
  if (age < 5) return 'complications in early childhood'
  if (flags.includes('child_soldier') && age < 18) return 'caught in armed conflict'
  if (character.country.conflictRisk > 0.15 && age < 30 && chance(0.3)) return 'killed in conflict'
  if (flags.includes('criminal_life') && age < 40 && chance(0.3)) return 'violence related to criminal activity'
  if (stats.happiness < 15 && age < 45 && chance(0.4)) return 'suicide'
  if (flags.includes('cancer') && chance(0.6)) return 'cancer'
  if (flags.includes('smoker') && age > 50 && chance(0.3)) return 'lung cancer'
  if (stats.health < 25 && age > 40) return 'organ failure'
  if (age > 80) return 'old age'
  if (age > 65) return chance(0.5) ? 'heart disease' : 'stroke'
  if (age > 50) return chance(0.4) ? 'heart attack' : 'cancer'
  return 'illness'
}

// ─── Ribbon assignment ────────────────────────────────────────────────────────

function assignRibbon(state) {
  const G = buildG(state)
  const sorted = [...RIBBONS].sort((a, b) => b.priority - a.priority)
  return sorted.find(r => r.condition(G)) ?? { name: 'The Quiet Life', description: 'You lived, and that was enough.', color: 'gray' }
}

// ─── Career ───────────────────────────────────────────────────────────────────

export function getAvailableCareers(state) {
  return CAREERS.filter(career => {
    if (career.requirements.minAge && state.age < career.requirements.minAge) return false
    if (career.requirements.maxAge && state.age > career.requirements.maxAge) return false
    if (career.partTime && state.career?.field !== 'casual' && state.career) return false
    if (career.requirements.education !== 'none') {
      const eduOrder = ['none', 'primary', 'secondary', 'university', 'graduate']
      const playerEdu = eduOrder.indexOf(state.education.level)
      const reqEdu = eduOrder.indexOf(career.requirements.education)
      if (playerEdu < reqEdu) return false
      if (career.requirements.field && state.education.field !== career.requirements.field) return false
    }
    if (career.requirements.minSmarts && state.stats.smarts < career.requirements.minSmarts) return false
    if (career.gdpRequired && career.gdpRequired !== 'any') {
      const gdpOrder = ['very_low', 'low', 'low_medium', 'medium', 'medium_high', 'high', 'very_high']
      if (gdpOrder.indexOf(state.character.country.gdp) < gdpOrder.indexOf(career.gdpRequired)) return false
    }
    if (Array.isArray(career.archetypeAvailable) && !career.archetypeAvailable.includes(state.character.country.archetype)) return false
    if (career.requirements.flags && !career.requirements.flags.some(f => state.flags.includes(f))) return false
    if (career.minYear && state.currentYear < career.minYear) return false
    if (career.maxYear && state.currentYear > career.maxYear) return false
    if (state.career?.id === career.id) return false
    return true
  })
}

export function enterCareer(state, careerId) {
  const career = CAREERS.find(c => c.id === careerId)
  if (!career) return state
  // Criminal record blocks certain careers
  const recordBlockedFields = ['law_enforcement', 'military', 'government', 'finance', 'medical']
  const hasRecord = (state.criminalRecord ?? []).length > 0
  const hasViolent = (state.criminalRecord ?? []).some(e => {
    if (typeof e === 'object' && e.category) return ['violent'].includes(e.category)
    const crime = typeof e === 'string' ? e : (e.crime ?? '')
    return /murder|assault|robbery|manslaughter|killer/i.test(crime)
  })
  if (hasRecord && recordBlockedFields.includes(career.field)) {
    return { ...state, log: [...state.log, { age: state.age, text: `Your criminal record disqualifies you from a career in ${career.field.replace(/_/g, ' ')}.`, isKey: false }] }
  }
  const level = career.levels[0]
  const baseSalary = randomBetween(level.salaryRange[0], level.salaryRange[1])
  // Scale salary to country purchasing power
  const gdpSalaryMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.22, low_medium: 0.1, low: 0.055, very_low: 0.03 }
  const salaryMult = gdpSalaryMult[state.character.country.gdp] ?? 1.0
  const salary = Math.round(baseSalary * salaryMult)
  const newCareer = {
    id: career.id, title: level.title, level: 0, salary,
    field: career.field, yearsInRole: 0, performance: 70,
    partTime: career.partTime ?? false,
    promotionChance: career.promotionChance ?? 0.10,
    maxLevel: career.levels.length - 1,
  }
  const log = [...state.log, { age: state.age, text: `You begin working as a ${level.title}. Starting salary: $${salary.toLocaleString()}/yr.`, isKey: true }]
  return { ...state, career: newCareer, log }
}

export function checkPromotion(state) {
  if (!state.career) return state
  const careerDef = CAREERS.find(c => c.id === state.career.id)
  if (!careerDef) return state
  const nextIdx = state.career.level + 1
  if (nextIdx >= careerDef.levels.length) return state

  const baseChance = careerDef.promotionChance ?? 0.15
  const smartsBonus = (state.stats.smarts - 50) * 0.001
  const perfBonus   = ((state.career.performance ?? 70) - 70) * 0.003
  const yearsBonus  = Math.min(state.career.yearsInRole * 0.03, 0.15)
  const peopleFacing = ['politics', 'law', 'entertainment', 'sports', 'education', 'healthcare', 'social_services', 'media'].includes(careerDef.field)
  const charismaBonus = (state.stats.charisma - 50) * (peopleFacing ? 0.003 : 0.001)
  if (!chance(baseChance + smartsBonus + perfBonus + yearsBonus + charismaBonus)) return state

  const newLevel = careerDef.levels[nextIdx]
  const gdpSalaryMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.22, low_medium: 0.1, low: 0.055, very_low: 0.03 }
  const salaryMult = gdpSalaryMult[state.character.country.gdp] ?? 1.0
  const salary = Math.round(randomBetween(newLevel.salaryRange[0], newLevel.salaryRange[1]) * salaryMult)
  const career = { ...state.career, level: nextIdx, title: newLevel.title, salary, yearsInRole: 0 }
  const log = [...state.log, { age: state.age, text: `You are promoted to ${newLevel.title}. New salary: $${salary.toLocaleString()}/yr.`, isKey: true }]
  return { ...state, career, log }
}

export function askForRaise(state) {
  if (!state.career) return state
  if (state.career.yearsInRole < 1) {
    return { ...state, log: [...state.log, { age: state.age, text: "You haven't been in the role long enough to ask for a raise.", isKey: false }] }
  }
  const perf = state.career.performance ?? 70
  const successChance = clamp(0.25 + (perf - 50) * 0.006 + (state.stats.charisma - 50) * 0.004, 0.05, 0.85)
  if (chance(successChance)) {
    const pct = randomBetween(5, 20) / 100
    const newSalary = Math.round(state.career.salary * (1 + pct))
    const gained = newSalary - state.career.salary
    return {
      ...state,
      career: { ...state.career, salary: newSalary },
      log: [...state.log, { age: state.age, text: `Raise approved — salary up $${gained.toLocaleString()} to $${newSalary.toLocaleString()}/yr.`, isKey: true }],
    }
  }
  return {
    ...state,
    career: { ...state.career, performance: clamp(perf - 5, 0, 100) },
    log: [...state.log, { age: state.age, text: "Raise request denied. Your manager seems unimpressed.", isKey: false }],
  }
}

export function quitJob(state) {
  if (!state.career) return state
  return {
    ...state,
    career: null,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 8, 0, 100) },
    log: [...state.log, { age: state.age, text: `You resign from your position as ${state.career.title}.`, isKey: true }],
  }
}

function fireFromJob(state) {
  return {
    ...state,
    career: null,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness - 15, 0, 100) },
    log: [...state.log, { age: state.age, text: `You are fired from your job as ${state.career.title} due to poor performance.`, isKey: true }],
  }
}

// ─── Relationship system ──────────────────────────────────────────────────────

const ADULT_TRAITS = [
  'patient', 'restless', 'proud', 'gentle', 'stubborn', 'anxious',
  'warm', 'distant', 'ambitious', 'funny', 'serious', 'generous',
  'demanding', 'quiet', 'affectionate', 'critical', 'idealistic',
  'practical', 'melancholy', 'cheerful',
]

// Prose surfaced in year texture and partner moment generation.
// Each trait maps to 2 lines so variety is possible across years.
const TRAIT_PROSE = {
  warm:        ['They still bring you tea when you\'re working late. You have stopped remarking on it.', 'The ease of being around them. You notice it most on the days when it isn\'t there.'],
  funny:       ['A thing they said three years ago still makes you laugh when it comes back.', 'Their timing. No one else has their timing.'],
  stubborn:    ['There is an argument you have been having, in various forms, for years now.', 'They don\'t change their mind easily. You have learned when to stop trying.'],
  anxious:     ['Their worry before your trip, which annoyed you and also meant something.', 'They catastrophize. They are almost always wrong. You have learned to say so kindly.'],
  ambitious:   ['The nights they stayed up finishing something. You learned not to wait up.', 'Their drive. You admire it. Some days you find it exhausting. Both things are true.'],
  private:     ['There are parts of them you have never fully reached. You have made peace with that.', 'They keep things. You have learned not to push.'],
  quiet:       ['The comfortable silences. Not every couple has them.', 'You can be in the same room without speaking and it isn\'t empty.'],
  affectionate:['They still reach for your hand. You didn\'t expect that to last.', 'The hand on your back without thinking about it. Still.'],
  gentle:      ['The way they are with small things — children, animals, anything broken.', 'How they speak to people they don\'t need to be kind to.'],
  generous:    ['They give things away without calculating. You\'ve stopped being surprised by it.', 'There is always something for the person who needs it. This is how they move through the world.'],
  melancholy:  ['Something quiet underneath them, always. You learned to sit with it instead of trying to fix it.', 'The sadness in them has no particular cause. You have learned not to make it worse.'],
  cheerful:    ['They find the thing that\'s working. You don\'t always say so, but you depend on it.', 'Their ability to be fine when you can\'t be. You have borrowed it more than once.'],
  patient:     ['They wait. You are not sure you have fully understood what it costs them.', 'They have never rushed you. After all this time, still.'],
  restless:    ['The projects that start and don\'t finish. You have made room for this.', 'Their need for something new. You have learned when to follow and when to let it pass.'],
  critical:    ['The standard they hold things to. You. This is part of how they love and it is not always easy.', 'Their expectations are high. You have decided this means they believe in you.'],
  practical:   ['They fix things. Years in, you are still grateful for this.', 'The solution you couldn\'t see, they found in five minutes. This still happens.'],
  serious:     ['When they laugh it means something because they don\'t do it constantly.', 'Their seriousness has a beauty to it that you didn\'t appreciate immediately.'],
  demanding:   ['They want a lot. You have decided this is a form of respect.', 'Their standards are high. Trying to meet them has made you better, which was probably the plan.'],
  idealistic:  ['They still believe things can be better. You have borrowed this belief more than you\'ve admitted.', 'The quality of their hope. It has kept something alive in you.'],
  distant:     ['There are rooms in them you have been outside of for your entire relationship.', 'The parts of them that stay at a remove. You have learned not to take it personally. Most of the time.'],
  proud:       ['They don\'t ask for help easily. You have learned to offer without being asked.', 'Their pride. It is both a limitation and the thing that got them where they are.'],
}
const CHILD_TRAITS = [
  'curious', 'shy', 'spirited', 'sensitive', 'stubborn', 'gentle',
  'funny', 'serious', 'dreamy', 'anxious', 'affectionate', 'restless',
]
function pickTraits(pool, count = 2) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count)
}

export const DESIRE_LABELS = {
  prove_worth: 'You want to prove you are not what they said.',
  belong: 'You want to find somewhere that feels like yours.',
  leave_mark: 'You want to make something that outlasts you.',
  be_seen: 'You want to be known for something that is actually you.',
  safety: 'You want to never feel that kind of fear again.',
  connection: 'You want someone who stays.',
  freedom: 'You want to not be owned by anyone\'s idea of you.',
  redemption: 'You want to undo something.',
}

const PARTNER_OCCUPATIONS = [
  'Software Engineer', 'Teacher', 'Nurse', 'Doctor', 'Lawyer', 'Accountant',
  'Graphic Designer', 'Chef', 'Bartender', 'Sales Manager', 'Marketing Director',
  'Real Estate Agent', 'Police Officer', 'Firefighter', 'Architect', 'Journalist',
  'Pharmacist', 'Social Worker', 'Personal Trainer', 'Electrician', 'Plumber',
  'Mechanic', 'Store Manager', 'Bank Teller', 'Dental Hygienist', 'Librarian',
  'Barista', 'Photographer', 'Event Planner', 'Insurance Agent', 'Veterinarian',
  'Student', 'Freelancer', 'Artist', 'Musician', 'Actor', 'Model',
  'Entrepreneur', 'Consultant', 'Waiter', 'Driver', 'Cleaner', 'Security Guard',
]

function genPartnerName(state, gender) {
  const c = state.character.country
  return `${pickFrom(gender === 'male' ? c.namePool.male : c.namePool.female)} ${pickFrom(c.surnames)}`
}

export function generatePartnerProfile(state, overrides = {}) {
  const myGender = state.character.gender
  const preferredGender = myGender === 'male' ? 'female' : myGender === 'female' ? 'male' : pickFrom(['male', 'female'])
  const gender = overrides.gender ?? preferredGender
  const nameGender = gender === 'non-binary' ? pickFrom(['male', 'female']) : gender
  const name = genPartnerName(state, nameGender)
  const birthGender = Math.random() < 0.04 ? (gender === 'male' ? 'female' : 'male') : gender === 'non-binary' ? pickFrom(['male', 'female']) : gender

  const minAge = overrides.minAge ?? Math.max(18, state.age - 8)
  const maxAge = overrides.maxAge ?? (state.age + 12)
  const age = clamp(randomBetween(minAge, maxAge), 16, 99)

  const looks = randomBetween(15, 95)
  const smarts = randomBetween(15, 95)
  const wealthStat = overrides.minWealthStat != null
    ? randomBetween(overrides.minWealthStat, 100)
    : randomBetween(5, 90)
  const craziness = randomBetween(10, 90)

  return {
    name, gender, birthGender, age,
    occupation: pickFrom(PARTNER_OCCUPATIONS),
    looks, smarts, wealthStat, craziness,
    relationshipQuality: randomBetween(45, 72),
    married: false, engaged: false, years: 0,
    traits: pickTraits(ADULT_TRAITS),
  }
}

export function meetPotentialPartner(state) {
  if (state.partner) return { ...state, log: [...state.log, { age: state.age, text: "You already have a partner.", isKey: false }] }
  if (state.age < 16) return state
  const attractScore = (state.stats.looks + state.stats.charisma) / 2
  if (!chance(clamp(attractScore / 100 + 0.1, 0.15, 0.9))) {
    return { ...state, log: [...state.log, { age: state.age, text: "You try to meet someone, but nothing clicks.", isKey: false }] }
  }
  const profile = generatePartnerProfile(state)
  return {
    ...state,
    pendingPartner: profile,
    log: [...state.log, { age: state.age, text: `You meet ${profile.name}.`, isKey: false }],
  }
}

export function hookUp(state) {
  if (state.age < 14) return state
  const updatedCount = (state.hooksUpCount ?? 0) + 1
  const stdRisk = 0.06 + (state.flags.includes('risky_behavior') ? 0.08 : 0)
  if (chance(stdRisk)) {
    const std = pickFrom(['chlamydia', 'gonorrhea', 'herpes'])
    return {
      ...state, hooksUpCount: updatedCount,
      flags: [...new Set([...state.flags, std, 'has_std'])],
      stats: { ...state.stats, health: clamp(state.stats.health - 5, 0, 100), happiness: clamp(state.stats.happiness + 4, 0, 100) },
      log: [...state.log, { age: state.age, text: `A casual hook-up — but you've contracted ${std}.`, isKey: true }],
    }
  }
  return {
    ...state, hooksUpCount: updatedCount,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 6, 0, 100) },
    log: [...state.log, { age: state.age, text: "A casual hook-up. No complications.", isKey: false }],
  }
}

export function goOnDate(state) {
  if (!state.partner) return state
  const gain = randomBetween(5, 14)
  const cost = randomBetween(40, 180)
  return {
    ...state,
    partner: { ...state.partner, relationshipQuality: clamp(state.partner.relationshipQuality + gain, 0, 100) },
    money: Math.max(0, (state.money ?? 0) - cost),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 4, 0, 100) },
    log: [...state.log, { age: state.age, text: `You go on a date with ${state.partner.name}. The evening is a good one.`, isKey: false }],
  }
}

export function complimentPartner(state) {
  if (!state.partner) return state
  const gain = randomBetween(4, 10)
  return {
    ...state,
    partner: { ...state.partner, relationshipQuality: clamp(state.partner.relationshipQuality + gain, 0, 100) },
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 3, 0, 100) },
    log: [...state.log, { age: state.age, text: `You tell ${state.partner.name} something true and kind.`, isKey: false }],
  }
}

export function proposeMarriage(state) {
  if (!state.partner || state.partner.engaged || state.partner.married) return state
  if (state.partner.relationshipQuality < 55) {
    return { ...state, log: [...state.log, { age: state.age, text: `${state.partner.name} isn't ready for that yet.`, isKey: false }] }
  }
  return {
    ...state,
    partner: { ...state.partner, engaged: true },
    log: [...state.log, { age: state.age, text: `You propose to ${state.partner.name}. They say yes.`, isKey: true }],
  }
}

export function getMarried(state) {
  if (!state.partner?.engaged) return state
  const cost = randomBetween(800, 18000)
  return {
    ...state,
    partner: { ...state.partner, married: true, engaged: false, relationshipQuality: clamp(state.partner.relationshipQuality + 10, 0, 100) },
    money: Math.max(0, (state.money ?? 0) - cost),
    flags: [...new Set([...state.flags, 'married'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 12, 0, 100) },
    log: [...state.log, { age: state.age, text: `You marry ${state.partner.name}. The ceremony costs $${cost.toLocaleString()}.`, isKey: true }],
  }
}

export function fileForDivorce(state) {
  if (!state.partner) return state
  const name = state.partner.name
  const wasMarried = state.partner.married
  const cost = wasMarried ? randomBetween(2000, 25000) : 0
  const updatedChildren = (state.children ?? []).map(child => ({
    ...child,
    relationshipQuality: clamp((child.relationshipQuality ?? 60) - 12, 0, 100),
  }))
  return {
    ...state,
    partner: null,
    children: updatedChildren,
    money: Math.max(0, (state.money ?? 0) - cost),
    flags: [...new Set([...state.flags, wasMarried ? 'divorced' : 'breakup'])],
    regret: clamp(state.regret + 8, 0, 100),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness - 20, 0, 100) },
    log: [...state.log, {
      age: state.age,
      text: wasMarried
        ? `You divorce ${name}. Legal costs: $${cost.toLocaleString()}.`
        : `You break up with ${name}.`,
      isKey: true,
    }],
  }
}

export function tryForChild(state) {
  if (!state.partner) return state
  if (state.flags.includes('pregnant')) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You are already expecting.', isKey: false }] }
  }
  if (state.birthControl) {
    return { ...state, log: [...state.log, { age: state.age, text: "You're currently using birth control.", isKey: false }] }
  }
  if (state.age > 50 || (state.partner.age ?? 30) > 48) {
    return { ...state, log: [...state.log, { age: state.age, text: "Having a biological child is no longer possible.", isKey: false }] }
  }
  const fertChance = state.partner.married ? 0.65 : 0.38
  if (!chance(fertChance)) {
    return {
      ...state,
      flags: [...new Set([...state.flags, 'trying_for_child'])],
      log: [...state.log, { age: state.age, text: "You try for a child — it doesn't happen this year.", isKey: false }],
    }
  }
  // Conception — store child details in mem; birth will be delivered by tick() ~2 years later
  const cGender = chance(0.5) ? 'male' : 'female'
  const c = state.character.country
  const childName = `${pickFrom(cGender === 'male' ? c.namePool.male : c.namePool.female)} ${state.character.surname}`
  const traits = pickTraits(CHILD_TRAITS)
  return {
    ...state,
    flags: [...new Set([...state.flags, 'pregnant', 'trying_for_child'])],
    mem: { ...(state.mem ?? {}), pregnancyYear: state.age, pendingChild: { name: childName, gender: cGender, traits } },
    log: [...state.log, { age: state.age, text: 'You are pregnant. The knowledge of it sits in your body before you have words for it.', isKey: true }],
  }
}

export function spendTimeWithChild(state, childIndex) {
  const child = state.children[childIndex]
  if (!child) return state
  const updated = [...state.children]
  updated[childIndex] = { ...child, relationshipQuality: clamp(child.relationshipQuality + randomBetween(5, 12), 0, 100) }
  return {
    ...state, children: updated,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 3, 0, 100) },
    log: [...state.log, { age: state.age, text: `You spend time with ${child.name}. It matters more than you say.`, isKey: false }],
  }
}

export function callParent(state, key) {
  const parent = state.parents?.[key]
  if (!parent?.alive) return state
  const gain = randomBetween(3, 10)
  return {
    ...state,
    parents: { ...state.parents, [key]: { ...parent, relationshipQuality: clamp(parent.relationshipQuality + gain, 0, 100) } },
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 2, 0, 100) },
    log: [...state.log, { age: state.age, text: `You call your ${key}. It is a good conversation.`, isKey: false }],
  }
}

// ─── Health actions ───────────────────────────────────────────────────────────

export function getPlasticSurgery(state, surgeryType) {
  if (state.age < 18) return state
  const surgeries = {
    minor:    { cost: 3000,  successChance: 0.85, looksGain: 8  },
    major:    { cost: 12000, successChance: 0.62, looksGain: 18 },
    facelift: { cost: 7500,  successChance: 0.75, looksGain: 12 },
  }
  const s = surgeries[surgeryType] ?? surgeries.minor
  const money = state.money ?? 0
  if (money < s.cost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford that surgery.", isKey: false }] }
  }
  if (chance(s.successChance)) {
    return {
      ...state, money: money - s.cost,
      stats: { ...state.stats, looks: clamp(state.stats.looks + s.looksGain, 0, 100), happiness: clamp(state.stats.happiness + 5, 0, 100) },
      flags: [...new Set([...state.flags, 'plastic_surgery'])],
      log: [...state.log, { age: state.age, text: `The surgery is a success. You look noticeably different.`, isKey: false }],
    }
  }
  return {
    ...state, money: money - s.cost,
    stats: { ...state.stats, looks: clamp(state.stats.looks - 15, 0, 100), health: clamp(state.stats.health - 10, 0, 100), happiness: clamp(state.stats.happiness - 20, 0, 100) },
    log: [...state.log, { age: state.age, text: `The surgery is botched. The results are worse than before.`, isKey: true }],
  }
}

// ─── Activity system ──────────────────────────────────────────────────────────

export function applyActivity(state, activityId) {
  // ── Hobby practice activities ────────────────────────────────────────────────
  const hobbyActivity = (ACTIVITIES.hobbies ?? []).find(a => a.id === activityId)
  if (hobbyActivity) {
    let updated = { ...state }
    const cost = hobbyActivity.cost ?? 0
    if (cost > 0 && (updated.money ?? 0) < cost) {
      return { ...updated, log: [...updated.log, { age: updated.age, text: `You can't afford the ${hobbyActivity.label} ($${cost}).`, isKey: false }] }
    }
    updated.money = (updated.money ?? 0) - cost
    // Progress the hobby
    const current = updated.hobbies?.[hobbyActivity.hobbyId] ?? 0
    updated.hobbies = { ...(updated.hobbies ?? {}), [hobbyActivity.hobbyId]: Math.min(100, current + hobbyActivity.delta) }
    // Store primary hobby in mem if not set
    if (!updated.mem?.primaryHobby) updated.mem = { ...(updated.mem ?? {}), primaryHobby: hobbyActivity.hobbyId }
    // Increment per-hobby activity counter so story events can fire at thresholds
    const _countKey = `actCount_${hobbyActivity.hobbyId}`
    updated.mem = { ...(updated.mem ?? {}), [_countKey]: ((updated.mem ?? {})[_countKey] ?? 0) + 1 }
    // Apply stat bonuses
    const b = hobbyActivity.statBonus ?? {}
    const s = updated.stats
    updated.stats = {
      ...s,
      happiness: Math.min(100, (s.happiness ?? 80) + (b.m ?? 0)),
      health:    Math.min(100, (s.health    ?? 80) + (b.h ?? 0)),
      smarts:    Math.min(100, (s.smarts    ?? 50) + (b.e ?? 0)),
      looks:     Math.min(100, (s.looks     ?? 50) + (b.s ?? 0)),
    }
    const newLevel = updated.hobbies[hobbyActivity.hobbyId]
    const _hobbyProse = {
      music:    ['You play for a while.', 'The practice session runs longer than you planned.', 'Something in a passage clicks that didn\'t last time.', 'You work through the same difficult section several times.'],
      art:      ['You work on something for an hour or two.', 'The piece goes somewhere you didn\'t expect.', 'You discard what you started and begin again.', 'A version of it comes together.'],
      writing:  ['You write.', 'The pages accumulate.', 'You work through a passage that has been resisting you.', 'The words come more easily today.'],
      cooking:  ['You try a new dish.', 'The kitchen smells like something is working.', 'You adjust the recipe until it tastes right.', 'You cook for a while, attentively.'],
      coding:   ['You build something small.', 'You debug something that has been broken for days.', 'A piece of logic clicks into place.', 'You write code for a few hours.'],
      sport:    ['You train.', 'The run is harder than last time and that is the point.', 'You push past where you usually stop.', 'The body does what you ask of it.'],
      reading:  ['You read.', 'A chapter turns into several.', 'You sit with the book longer than you meant to.', 'You finish a section and think about it for a while.'],
      meditation: ['You sit with it.', 'The practice goes quietly.', 'The mind settles, eventually.', 'Fifteen minutes that are harder and more useful than they look.'],
    }
    const _prosePool = _hobbyProse[hobbyActivity.hobbyId] ?? [`You spend time on ${hobbyActivity.hobbyId}.`]
    const _proseLine = _prosePool[Math.floor(Math.random() * _prosePool.length)]
    updated.log = [...updated.log, { age: updated.age, text: _proseLine, isKey: false }]
    updated.actionsThisYear = (updated.actionsThisYear ?? 0) + 1
    return updated
  }

  // ── Therapy booking ──────────────────────────────────────────────────────────
  if (activityId === 'book_therapy') {
    const cost = 120
    if ((state.money ?? 0) < cost) {
      return { ...state, log: [...state.log, { age: state.age, text: "You can't afford therapy right now.", isKey: false }] }
    }
    let updated = { ...state }
    updated.money = (updated.money ?? 0) - cost
    updated.mentalHealth = {
      ...(updated.mentalHealth ?? {}),
      therapy: true,
      condition: updated.mentalHealth?.condition ?? null,
    }
    const happyBoost = updated.mentalHealth?.condition ? 6 : 4
    updated.stats = { ...updated.stats, happiness: Math.min(100, updated.stats.happiness + happyBoost) }
    updated.log = [...updated.log, { age: updated.age, text: 'You attend a therapy session. Progress is slow and meaningful.', isKey: false }]
    updated.actionsThisYear = (updated.actionsThisYear ?? 0) + 1
    return updated
  }

  // ── Debt management ──────────────────────────────────────────────────────────
  if (activityId === 'pay_debt') {
    if (!state.debt || state.debt <= 0) {
      return { ...state, log: [...state.log, { age: state.age, text: 'You have no debt to pay off.', isKey: false }] }
    }
    const payment = Math.min(state.debt, Math.max(500, Math.round((state.money ?? 0) * 0.1)))
    if (payment <= 0 || (state.money ?? 0) < payment) {
      return { ...state, log: [...state.log, { age: state.age, text: "You don't have enough to make an extra payment.", isKey: false }] }
    }
    let updated = { ...state }
    updated.money = (updated.money ?? 0) - payment
    updated.debt = Math.max(0, updated.debt - payment)
    updated.log = [...updated.log, { age: updated.age, text: `You pay $${payment.toLocaleString()} off your debt. Remaining: $${updated.debt.toLocaleString()}.`, isKey: false }]
    updated.actionsThisYear = (updated.actionsThisYear ?? 0) + 1
    return updated
  }

  if (activityId === 'take_loan') {
    let updated = { ...state }
    const maxLoan = Math.max(1000, Math.round((updated.money ?? 0) * 3 + 5000))
    const amount = Math.min(maxLoan, 10000)
    updated.money = (updated.money ?? 0) + amount
    updated.debt = (updated.debt ?? 0) + amount
    updated.mem = { ...(updated.mem ?? {}), debtType: 'personal' }
    updated.log = [...updated.log, { age: updated.age, text: `You borrow $${amount.toLocaleString()} at 18% annual interest.`, isKey: false }]
    updated.actionsThisYear = (updated.actionsThisYear ?? 0) + 1
    return updated
  }

  // ── ROSCA joining ────────────────────────────────────────────────────────────
  if (activityId === 'join_rosca') {
    if (state.rosca) return { ...state, log: [...state.log, { age: state.age, text: 'You are already part of a savings circle.', isKey: false }] }
    const gdp = state.character?.country?.gdp
    const mult = GDP_MULT[gdp] ?? 0.1
    const cycleLength = 10
    const monthlyContribution = Math.max(3, Math.round(50 * mult))
    const joinFee = monthlyContribution * 2
    if ((state.money ?? 0) < joinFee) return { ...state, log: [...state.log, { age: state.age, text: `You can't afford the joining fee ($${joinFee}).`, isKey: false }] }
    const position = Math.ceil(Math.random() * cycleLength)
    const nextPayoutYear = state.currentYear + position
    const updated = {
      ...state,
      money: (state.money ?? 0) - joinFee,
      rosca: { monthlyContribution, cycleLength, cyclePosition: position, nextPayoutYear },
      flags: [...new Set([...state.flags, 'rosca_member'])],
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    }
    updated.log = [...updated.log, { age: updated.age, text: `You join a savings circle — ${cycleLength} members, $${monthlyContribution}/month. Your payout year: ${nextPayoutYear}.`, isKey: true }]
    return updated
  }

  if (activityId === 'leave_rosca') {
    if (!state.rosca) return { ...state, log: [...state.log, { age: state.age, text: 'You are not in a savings circle.', isKey: false }] }
    return {
      ...state,
      rosca: null,
      flags: state.flags.filter(f => f !== 'rosca_member'),
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      log: [...state.log, { age: state.age, text: 'You leave the savings circle. You lose your place in the rotation.', isKey: false }],
    }
  }

  // ── Buy / sell gold ──────────────────────────────────────────────────────────
  if (activityId === 'buy_gold') {
    const gdp = state.character?.country?.gdp
    const mult = GDP_MULT[gdp] ?? 0.2
    const amount = Math.round(200 * mult)
    if ((state.money ?? 0) < amount) return { ...state, log: [...state.log, { age: state.age, text: `You can't afford to buy gold right now ($${amount} needed).`, isKey: false }] }
    return {
      ...state,
      money: (state.money ?? 0) - amount,
      gold: (state.gold ?? 0) + amount,
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      log: [...state.log, { age: state.age, text: `You convert $${amount.toLocaleString()} into gold. A tangible store of value.`, isKey: false }],
    }
  }

  if (activityId === 'sell_gold') {
    const gold = state.gold ?? 0
    if (gold <= 0) return { ...state, log: [...state.log, { age: state.age, text: 'You have no gold to sell.', isKey: false }] }
    const sellAmount = Math.round(gold * 0.92) // small transaction cost
    return {
      ...state,
      money: (state.money ?? 0) + sellAmount,
      gold: 0,
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      log: [...state.log, { age: state.age, text: `You sell your gold for $${sellAmount.toLocaleString()}.`, isKey: false }],
    }
  }

  // ── Standard activities ──────────────────────────────────────────────────────
  const allActivities = [
    ...(ACTIVITIES.mind ?? []),
    ...(ACTIVITIES.body ?? []),
    ...(ACTIVITIES.social ?? []),
    ...(ACTIVITIES.money ?? []),
    ...(ACTIVITIES.extracurricular ?? []),
    ...(ACTIVITIES.appearance ?? []),
  ]
  const activity = allActivities.find(a => a.id === activityId)
  if (!activity) return state

  const G = buildG(state)
  if (activity.condition && !activity.condition(G)) return state
  if (activity.minAge && state.age < activity.minAge) return state
  if (activity.maxAge && state.age > activity.maxAge) return state

  const proxy = buildEffectProxy(state)
  // Deduct actual money for activities with a dollar cost
  if (activity.cost) proxy.mo -= activity.cost
  activity.effect(proxy)
  let updated = applyProxy(state, proxy)
  updated = resolveProxyExtras(updated, proxy)

  // Fitness bonuses for physical activities
  const fitnessGain = activityId === 'gym' ? 5 : activityId === 'walk' ? 2 : activityId === 'join_sports_team' ? 8 : 0
  if (fitnessGain > 0) {
    updated = { ...updated, fitness: clamp((updated.fitness ?? 50) + fitnessGain, 0, 100) }
  }

  updated.actionsThisYear = state.actionsThisYear + 1
  updated.log = [...updated.log, { age: state.age, text: activity.outcome, isKey: false }]

  // Track cumulative activity counts for flag generation in tick()
  const countKey = `act_count_${activityId}`
  updated.mem = { ...(updated.mem ?? {}), [countKey]: ((updated.mem?.[countKey] ?? 0) + 1) }

  return updated
}

// ─── Crime system ─────────────────────────────────────────────────────────────

export function attemptCrime(state, crimeId) {
  const crime = CRIMES.find(c => c.id === crimeId)
  if (!crime) return state
  if (crime.minAge && state.age < crime.minAge) return state
  if (crime.requiresFlag && !state.flags.includes(crime.requiresFlag)) return state
  if (crime.requiresYear && state.currentYear < crime.requiresYear) {
    return { ...state, log: [...state.log, { age: state.age, text: "This type of crime doesn't exist yet.", isKey: false }] }
  }
  if (crime.minSmarts && state.stats.smarts < crime.minSmarts) {
    return { ...state, log: [...state.log, { age: state.age, text: "You don't have the technical knowledge for this.", isKey: false }] }
  }

  const archetypeMod = crime.archetypeModifier?.[state.character.country.archetype] ?? 0
  // Support both old format (arrestRisk/successEffect/caughtEffect) and new format (baseSuccessRate/effect/failEffect)
  const useNewFormat = typeof crime.effect === 'function'
  const failProb = useNewFormat
    ? clamp(crime.arrestRisk + archetypeMod, 0.01, 0.99)
    : clamp(crime.arrestRisk + archetypeMod, 0.01, 0.99)
  const successProb = useNewFormat ? (crime.baseSuccessRate ?? (1 - failProb)) : null
  let updated = { ...state, actionsThisYear: state.actionsThisYear + 1 }

  // Determine outcome: for new format use baseSuccessRate; for old format use arrestRisk
  const succeeded = useNewFormat ? chance(successProb) : !chance(failProb)

  if (!succeeded) {
    const proxy = buildEffectProxy(updated)
    if (useNewFormat) crime.failEffect(proxy)
    else crime.caughtEffect(proxy)
    updated = applyProxy(updated, proxy)
    // Sentence format: old = {min, max}, new = [min, max]
    const sentMin = Array.isArray(crime.sentence) ? crime.sentence[0] : crime.sentence.min
    const sentMax = Array.isArray(crime.sentence) ? crime.sentence[1] : crime.sentence.max
    const sentence = randomBetween(sentMin, sentMax)
    if (crime.criminalRecordEntry) updated.criminalRecord = [...updated.criminalRecord, { crime: crime.criminalRecordEntry, age: updated.age, category: crime.category ?? 'other' }]
    const flagToAdd = useNewFormat ? (crime.flagsAdded?.[0] ?? null) : crime.addFlag
    if (flagToAdd) updated.flags = [...new Set([...updated.flags, flagToAdd])]
    updated.log = [...updated.log, { age: state.age, text: `You are arrested for ${crime.name.toLowerCase()}.`, isKey: true }]
    if (sentence > 0) {
      // Scale lawyer fees by country GDP
      const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.18, low_medium: 0.08, low: 0.04, very_low: 0.02 }
      const mult = gdpMult[updated.character?.country?.gdp] ?? 1.0
      const midFee  = Math.round(clamp(2500  * mult, 100, 25000) / 100) * 100
      const topFee  = Math.round(clamp(15000 * mult, 500, 150000) / 500) * 500
      updated.pendingTrial = {
        crimeName: crime.name,
        crimeCategory: crime.category,
        sentence,
        lawyerCosts: { none: 0, mid: midFee, top: topFee },
      }
    }
  } else {
    const proxy = buildEffectProxy(updated)
    if (useNewFormat) crime.effect(proxy)
    else crime.successEffect(proxy)
    updated = applyProxy(updated, proxy)
    const flagToAdd = useNewFormat ? (crime.flagsAdded?.[0] ?? null) : crime.addFlag
    if (flagToAdd) updated.flags = [...new Set([...updated.flags, flagToAdd])]
    updated.log = [...updated.log, { age: state.age, text: `You ${crime.name.toLowerCase()} and get away with it.`, isKey: false }]
  }
  return updated
}

// ─── Parent aging and inheritance ────────────────────────────────────────────

function tickParents(state) {
  if (!state.parents) return state
  let { mother, father } = state.parents
  let log = [...state.log]
  let money = state.money ?? 0

  function ageParent(parent, label) {
    if (!parent.alive) return parent
    const newAge = parent.currentAge + 1
    let deathProb = 0
    if (newAge > 90)      deathProb = 0.20 + (newAge - 90) * 0.05
    else if (newAge > 80) deathProb = 0.08 + (newAge - 80) * 0.012
    else if (newAge > 70) deathProb = 0.025 + (newAge - 70) * 0.005
    else if (newAge > 60) deathProb = 0.008

    if (chance(deathProb)) {
      const inheritance = Math.round(randomBetween(500, 60000) * (parent.relationshipQuality / 100))
      money += inheritance
      log.push({ age: state.age, text: `Your ${label}, ${parent.name}, passes away at age ${newAge}. You inherit $${inheritance.toLocaleString()}.`, isKey: true, isDeath: true })
      return { ...parent, currentAge: newAge, alive: false }
    }
    const drift = (60 - parent.relationshipQuality) * 0.02
    return { ...parent, currentAge: newAge, relationshipQuality: clamp(parent.relationshipQuality + drift, 0, 100) }
  }

  mother = ageParent(mother, 'mother')
  father = ageParent(father, 'father')
  return { ...state, parents: { mother, father }, log, money }
}

// ─── Asset ticking ───────────────────────────────────────────────────────────

// ─── Poverty premium tick ─────────────────────────────────────────────────────
function tickPovertyPremium(state) {
  const money = state.money ?? 0
  if (money <= 0) return state
  const archetype = state.character?.country?.archetype
  const gdp = state.character?.country?.gdp
  const mult = GDP_MULT[gdp] ?? 0.2
  // Welfare states reduce (but don't eliminate) the poverty premium
  const welfareReduction = ['wealthy_west', 'wealthy_east'].includes(archetype) ? 0.4 : 1.0
  let rate = 0
  if      (money < 500   * mult) rate = 0.18
  else if (money < 2000  * mult) rate = 0.12
  else if (money < 8000  * mult) rate = 0.07
  else if (money < 20000 * mult) rate = 0.03
  else return state
  const premium = Math.round(money * rate * welfareReduction)
  if (premium <= 0) return state
  return { ...state, money: Math.max(0, money - premium) }
}

// ─── Household contribution tick ──────────────────────────────────────────────
function tickHouseholdContribution(state) {
  if (state.inPrison) return state
  const contrib = calculateHouseholdContribution(state)
  if (contrib.annualAmount <= 0) {
    // Keep obligationType visible even when amount is 0
    return { ...state, householdContribution: { annualAmount: 0, obligationType: contrib.obligationType, reduced: state.householdContribution?.reduced ?? false } }
  }
  return {
    ...state,
    money: Math.max(0, (state.money ?? 0) - contrib.annualAmount),
    householdContribution: { annualAmount: contrib.annualAmount, obligationType: contrib.obligationType, reduced: state.householdContribution?.reduced ?? false },
  }
}

// ─── ROSCA tick ───────────────────────────────────────────────────────────────
function tickROSCA(state) {
  if (!state.rosca) return state
  const { monthlyContribution, cycleLength, nextPayoutYear } = state.rosca
  const annualContribution = monthlyContribution * 12
  let s = { ...state, money: Math.max(0, (state.money ?? 0) - annualContribution) }
  // Payout year: receive the whole pot
  if (state.currentYear === nextPayoutYear) {
    const payout = monthlyContribution * 12 * cycleLength
    s.money = (s.money ?? 0) + payout
    s.log = [...s.log, { age: s.age, text: `Your savings circle pays out — $${payout.toLocaleString()} arrives as a lump sum. ${cycleLength} months of everyone's contributions, yours to use.`, isKey: true }]
    s.rosca = { ...s.rosca, nextPayoutYear: nextPayoutYear + cycleLength }
    s.flags = [...new Set([...s.flags, 'rosca_payout_received'])]
  }
  return s
}

// ─── Gold appreciation tick ───────────────────────────────────────────────────
function tickGold(state) {
  if (!state.gold || state.gold <= 0) return state
  // Gold averages 2-4% real return with high volatility
  const returnRate = 1 + randomBetween(-6, 9) / 100
  return { ...state, gold: Math.max(0, Math.round(state.gold * returnRate)) }
}

// ─── Hyperinflation tick ──────────────────────────────────────────────────────
function tickHyperinflation(state) {
  const countryName = (state.currentCountry ?? state.character?.country)?.name
  const hyperinflation = getHyperinflation(countryName, state.currentYear, state.flags)
  if (!hyperinflation) return state
  const drain = HYPERINFLATION_DRAIN[hyperinflation.severity] ?? 0.3
  const localMoney = state.money ?? 0
  if (localMoney <= 0) return state
  const lost = Math.round(localMoney * drain)
  if (lost <= 0) return state
  // First time: log the experience
  const alreadyFlagged = state.flags.includes('hyperinflation_experienced')
  let s = { ...state, money: Math.max(0, localMoney - lost) }
  if (!alreadyFlagged) {
    s.flags = [...new Set([...s.flags, 'hyperinflation_experienced'])]
    const msgs = { moderate: 'Inflation eats into savings.', severe: 'Hyperinflation. Prices change while you queue. You lose a significant portion of your savings to currency collapse.', extreme: 'The currency is worthless. Prices triple overnight. Your savings are almost entirely erased.' }
    s.log = [...s.log, { age: s.age, text: msgs[hyperinflation.severity] ?? msgs.severe, isKey: true }]
  }
  return s
}

// ─── Farming income variance ──────────────────────────────────────────────────
// Applied inside tick() directly during career income calculation.

function tickAssets(state) {
  if (!state.assets) return state
  const { properties, vehicles } = state.assets
  let money = state.money ?? 0

  const updatedProperties = properties.map(p => {
    const type = PROPERTY_TYPES.find(t => t.id === p.typeId)
    if (!type) return p
    const newValue = Math.round(p.currentValue * (1 + type.appreciationRate + randomBetween(-2, 2) / 100))
    money -= type.annualMaintenance
    if (p.mortgage > 0) {
      const interest = Math.round(p.mortgage * 0.04)
      const payment = Math.min(Math.round(p.mortgage / 25) + interest, p.mortgage + interest)
      money -= payment
      return { ...p, currentValue: newValue, mortgage: Math.max(0, p.mortgage - (payment - interest)) }
    }
    return { ...p, currentValue: newValue }
  })

  const updatedVehicles = vehicles.map(v => {
    const type = VEHICLE_TYPES.find(t => t.id === v.typeId)
    if (!type) return v
    money -= type.annualMaintenance
    return { ...v, currentValue: Math.max(100, Math.round(v.currentValue * (1 - type.depreciationRate))) }
  })

  return { ...state, assets: { properties: updatedProperties, vehicles: updatedVehicles }, money: Math.max(0, money) }
}

// ─── Pet ticking ──────────────────────────────────────────────────────────────

function tickPets(state) {
  if (!state.pets || state.pets.length === 0) return state
  let log = [...state.log]
  let happinessDelta = 0
  const maxAge = { dog: 14, cat: 17, rabbit: 10, hamster: 3, parrot: 25, fish: 5, bird: 12 }

  const pets = state.pets.map(pet => {
    if (!pet.alive) return pet
    const newAge = pet.age + 1
    const lifespan = maxAge[pet.species] ?? 12
    const deathProb = newAge > lifespan * 0.75 ? (newAge / lifespan) * 0.2 : 0.005
    if (chance(deathProb)) {
      log.push({ age: state.age, text: `Your ${pet.species} ${pet.name} passes away after ${newAge} years.`, isKey: true })
      happinessDelta -= 12
      return { ...pet, age: newAge, alive: false }
    }
    return { ...pet, age: newAge }
  })

  const stats = happinessDelta
    ? { ...state.stats, happiness: clamp(state.stats.happiness + happinessDelta, 0, 100) }
    : state.stats
  return { ...state, pets, stats, log }
}

// ─── Sibling ticking ──────────────────────────────────────────────────────────

function tickSiblings(state) {
  if (!state.siblings || state.siblings.length === 0) return state
  let log = [...state.log]

  const siblings = state.siblings.map(sib => {
    if (!sib.alive) return sib
    const sibAge = state.age + sib.ageDiff
    let deathProb = 0
    if (sibAge > 80) deathProb = 0.06 + (sibAge - 80) * 0.01
    else if (sibAge > 65) deathProb = 0.015
    if (chance(deathProb)) {
      log.push({ age: state.age, text: `Your sibling ${sib.name} passes away.`, isKey: true, isDeath: true })
      return { ...sib, alive: false }
    }
    const drift = (60 - sib.relationshipQuality) * 0.01
    return { ...sib, relationshipQuality: clamp(sib.relationshipQuality + drift + randomBetween(-1, 1), 0, 100) }
  })

  return { ...state, siblings, log }
}

// ─── Fame ticking ─────────────────────────────────────────────────────────────

function tickPartner(state) {
  if (!state.partner || !state.partner.alive) return state
  // Partner ages each year; approximate age from stored value
  const partnerAge = (state.partner.age ?? 0) + 1
  let partner = { ...state.partner, age: partnerAge }
  // Natural death probability increases with age
  let deathProb = 0
  if (partnerAge >= 75) deathProb = 0.04 + (partnerAge - 75) * 0.012
  else if (partnerAge >= 65) deathProb = 0.015 + (partnerAge - 65) * 0.0025
  if (deathProb > 0 && chance(deathProb)) {
    const log = [...state.log, { age: state.age, text: `${partner.name.split(' ')[0]} dies. You have been together for years. The house is immediately different.`, isKey: true, isDeath: true }]
    return { ...state, partner: { ...partner, alive: false }, flags: [...new Set([...state.flags, 'widowed', 'lost_partner'])], log }
  }
  // Relationship quality drifts slightly based on engagement
  const drift = chance(0.3) ? (chance(0.5) ? 1 : -1) : 0
  partner = { ...partner, relationshipQuality: clamp((partner.relationshipQuality ?? 60) + drift, 10, 100) }
  return { ...state, partner }
}

function tickFame(state) {
  const fame = state.fame ?? 0
  if (fame <= 0) return state
  const isEntCareeer = state.career?.field === 'entertainment' || state.career?.field === 'sports'
  if (!isEntCareeer) {
    return { ...state, fame: clamp(fame - fame * 0.07, 0, 100) }
  }
  return state
}

// ─── Illness risk ─────────────────────────────────────────────────────────────

function checkIllnessRisk(state) {
  let updated = state
  for (const illness of ILLNESSES) {
    const { minAge, maxAge: maxA, flagRequired, riskFactors } = illness.triggerConditions
    if (state.flags.includes(illness.flag)) continue
    if (state.flags.includes(`${illness.id}_diagnosed`)) continue
    if (minAge && state.age < minAge) continue
    if (maxA && state.age > maxA) continue
    if (flagRequired && !state.flags.includes(flagRequired)) continue

    let prob = 0.002
    if (illness.id === 'cancer' && state.age > 50) prob += (state.age - 50) * 0.001
    if (illness.id === 'heart_disease' && state.age > 55) prob += (state.age - 55) * 0.0015
    if (illness.id === 'clinical_depression' && state.stats.happiness < 30) prob += 0.04
    if (illness.id === 'anxiety_disorder' && state.stats.happiness < 40) prob += 0.03
    if (illness.id === 'addiction' && state.flags.includes('heavy_drinker')) prob += 0.025
    const riskCount = riskFactors.filter(f => state.flags.includes(f)).length
    prob += riskCount * 0.005
    if (state.stats.health < 40) prob *= 1.5

    // Comorbidity modifiers
    if (illness.id === 'heart_disease') {
      if (state.flags.includes('smoker')) prob *= 2.5
      if (state.flags.includes('heavy_drinker')) prob *= 1.8
      if (state.flags.includes('diagnosed_diabetes')) prob *= 2.0
      if ((state.fitness ?? 50) < 30) prob *= 1.5
    }
    if (illness.id === 'cancer') {
      if (state.flags.includes('smoker')) prob *= 3.0
    }
    if (illness.id === 'clinical_depression' || illness.id === 'anxiety_disorder') {
      if (state.flags.includes('alcohol_addiction') || state.flags.includes('drug_addiction')) prob *= 2.0
      if (state.regret > 70) prob *= 1.5
    }
    if (illness.id === 'diabetes') {
      if ((state.fitness ?? 50) < 25) prob *= 2.0
      if (state.stats.health < 40) prob *= 1.5
    }

    // Country healthcare quality multiplies base illness risk
    const hcIllnessMod = { excellent: 0.7, good: 0.85, fair: 1.0, poor: 1.3, very_poor: 1.6 }
    prob *= hcIllnessMod[state.character.country.healthcare] ?? 1.0

    // Pollution exposure increases illness risk significantly
    if (state.flags.includes('pollution_exposure')) prob *= 1.4

    if (!chance(prob)) continue

    // Scale treatment costs to country GDP (developing-world costs are lower but so are wages)
    const gdpCostMult = { very_high: 1.4, high: 1.1, medium_high: 0.9, medium: 0.7, low_medium: 0.5, low: 0.35, very_low: 0.2 }
    const costMult = gdpCostMult[state.character.country.gdp] ?? 1.0
    // Also scale treatment success by healthcare quality (poor healthcare = worse outcomes)
    const hcSuccessMod = { excellent: 1.15, good: 1.05, fair: 1.0, poor: 0.85, very_poor: 0.7 }
    const successMod = hcSuccessMod[state.character.country.healthcare] ?? 1.0

    const archetype = state.character.country.archetype ?? 'wealthy_west'
    const healthcare = state.character.country.healthcare ?? 'fair'
    const illnessContext = {
      excellent: `The tests come back quickly. The specialist explains everything clearly. You have options.`,
      good:      `The GP refers you to a specialist. There is a wait. When you get there, the diagnosis is clear.`,
      fair:      `The clinic is busy. You wait two hours. The doctor is straightforward. Treatment is available if you can afford it.`,
      poor:      `The nearest hospital is hours away or the local clinic is understaffed. The diagnosis takes longer than it should.`,
      very_poor: `There is no specialist here. The diagnosis is made by a doctor managing too many patients with too little. Treatment, if available, is rationed.`,
    }
    const illnessText = `${illnessContext[healthcare] ?? illnessContext.fair} You are diagnosed with ${illness.name}.`

    const event = {
      id: `illness_${illness.id}_${state.age}`,
      phase: getPhase(state.age),
      weight: 10,
      text: illnessText,
      choices: illness.treatments.map(t => {
        const adjustedCost = Math.round(t.cost * costMult)
        const willSucceed = Math.random() < clamp(t.successChance * successMod, 0.05, 0.98)
        return {
          text: `${t.name}${adjustedCost > 0 ? ` ($${adjustedCost.toLocaleString()})` : ' (free)'}`,
          tag: null,
          outcome: willSucceed ? t.outcomeSuccess : t.outcomeFailure,
          effect: (p) => {
            p.mo -= adjustedCost
            p.m += t.happinessEffect ?? 0
            if (willSucceed) {
              p.h += Math.abs(t.healthEffect ?? 0)
            } else {
              p.h -= Math.abs(t.healthEffect ?? 0)
              p.addFlag(illness.flag)
            }
          },
          inject: null,
        }
      }),
      effect: null,
      when: () => true,
    }

    updated = {
      ...updated,
      flags: [...new Set([...updated.flags, `${illness.id}_diagnosed`])],
      queue: [...updated.queue, event],
    }
    break
  }
  return updated
}

// ─── Education enrollment tick ────────────────────────────────────────────────

function tickEnrollment(state) {
  const enrolled = state.education?.enrolled
  if (!enrolled) return state
  const { type, field, year } = enrolled
  const newYear = year + 1
  const totalYears = type === 'university' ? 4 : 2
  let s = { ...state }

  if (type === 'university') {
    if (!s.flags.includes('scholarship_won')) {
      const tuition = { healthcare: 12000, business: 9000, science: 10000, arts: 7000, general: 8000 }[field] ?? 8000
      s.money = Math.max(0, (s.money ?? 0) - tuition)
    }
    s.gpa = Math.min(4.0, parseFloat(((s.gpa ?? 2.5) + randomBetween(-5, 10) / 100).toFixed(2)))
  } else if (type === 'vocational' && newYear === 1) {
    const cost = { electrician: 2500, plumber: 2500, construction: 2000, IT: 3000 }[field] ?? 2500
    s.money = Math.max(0, (s.money ?? 0) - cost)
  }

  s.stats = { ...s.stats, smarts: clamp(s.stats.smarts + 2, 0, 100) }

  if (newYear >= totalYears) {
    if (type === 'university') {
      const isFirstGen = (s.character?.wealthTier ?? 3) <= 2
      s.education = { level: 'university', field, enrolled: null }
      s.flags = [...new Set([...s.flags, 'university_graduate', ...(isFirstGen ? ['first_gen_graduate'] : [])])]
      s.mem = { ...s.mem, graduated: 'university', uniField: field, uniGpa: s.gpa ?? 2.5 }
      s.stats = { ...s.stats, smarts: clamp(s.stats.smarts + 5, 0, 100), happiness: clamp(s.stats.happiness + 12, 0, 100) }
      const gpaStr = s.gpa ? ` Final GPA: ${s.gpa.toFixed(2)}.` : ''
      s.log = [...s.log, { age: s.age, text: `🎓 You graduate from university with a degree in ${field}.${isFirstGen ? ' The first in your family to do so.' : ''}${gpaStr}`, isKey: true }]
    } else {
      s.education = { ...s.education, level: 'secondary', field, enrolled: null }
      s.flags = [...new Set([...s.flags, 'vocational_trained', `trade_${field}`])]
      s.mem = { ...s.mem, graduated: 'vocational', vocField: field }
      s.stats = { ...s.stats, smarts: clamp(s.stats.smarts + 3, 0, 100), happiness: clamp(s.stats.happiness + 8, 0, 100) }
      s.log = [...s.log, { age: s.age, text: `🔧 You complete your ${field} certification.`, isKey: true }]
    }
  } else {
    s.education = { ...s.education, enrolled: { type, field, year: newYear } }
    if (type === 'university') {
      s.log = [...s.log, { age: s.age, text: `University — year ${newYear} of 4 (${field}).`, isKey: false }]
    } else {
      s.log = [...s.log, { age: s.age, text: `Trade school — year ${newYear} of 2 (${field}).`, isKey: false }]
    }
  }
  return s
}

// ─── Main tick ────────────────────────────────────────────────────────────────

export function tick(state) {
  const isAbroad = state.flags.includes('emigrated') &&
    state.currentCountry?.name !== state.character?.country?.name
  let s = {
    ...state,
    age: state.age + 1,
    currentYear: state.currentYear + 1,
    actionsThisYear: 0,
    yearsAbroad: isAbroad ? (state.yearsAbroad ?? 0) + 1 : (state.yearsAbroad ?? 0),
  }

  // Phase transition marker — one quiet sentence when crossing a life phase boundary
  const prevPhase = getPhase(state.age)
  const newPhase = getPhase(s.age)
  if (prevPhase !== newPhase) {
    const _phaseLines = {
      childhood:   'The early years end. You begin to know where you are.',
      adolescence: 'The body is changing. The world is starting to require something from you.',
      young_adult: 'You are eighteen. The life begins in earnest.',
      midlife:     'You are thirty. The life you have been building has become recognizable as a life.',
      late_life:   'You are fifty. What you carry into this half is mostly set.',
    }
    const _t = _phaseLines[newPhase]
    if (_t) s.log = [...s.log, { age: s.age, text: _t, isKey: true, isPhaseTransition: true }]
  }

  // Prison year
  if (s.inPrison) {
    s.stats = { ...s.stats, health: clamp(s.stats.health - 1, 0, 100), happiness: clamp(s.stats.happiness - 2, 0, 100) }
    const d = checkDeath(s)
    if (d.dead) {
      if (s.pendingTrial) s = { ...s, pendingTrial: null }
      return { ...s, dead: true, causeOfDeath: `${d.cause} (in prison)`, ribbon: assignRibbon(s), screen: 'death' }
    }
    const remaining = s.prisonSentence - 1
    if (remaining <= 0) {
      s.inPrison = false; s.prisonSentence = 0
      if (!s.flags.includes('served_prison_time')) s.flags = [...s.flags, 'served_prison_time']
      s.log = [...s.log, { age: s.age, text: 'You are released from prison.', isKey: true }]
      // Parole event — queue if sentence was long
      if ((s.mem?.originalSentence ?? 0) >= 3) {
        s.queue = [...s.queue, {
          id: `prison_parole_release_${s.age}`,
          phase: getPhase(s.age),
          text: 'You walk out of the gates. The sunlight feels wrong — too bright, too open. Reintegration begins now.',
          choices: [
            { text: 'Find work and start over', tag: 'determined', outcome: 'The record follows you everywhere. But you keep applying.', effect: (p) => { p.m += 8; p.e += 5; p.addFlag('determined_student'); }, inject: null },
            { text: 'Reconnect with old contacts', tag: null, outcome: 'Some are glad to see you. Some pull you back toward the life you tried to leave.', effect: (p) => { p.m += 4; p.karma -= 5; }, inject: null },
          ],
          effect: null,
          when: () => true,
        }]
      }
    } else {
      s.prisonSentence = remaining
      // Queue a prison event roughly every other year
      const prisonEvent = getNextEvent(s)
      if (prisonEvent) {
        if (s.queue.some(e => e.id === prisonEvent.id)) s.queue = s.queue.filter(e => e.id !== prisonEvent.id)
        s.usedEventMap = new Map([...(s.usedEventMap ?? new Map()), [prisonEvent.id, s.currentYear]])
        if (!prisonEvent.choices || prisonEvent.choices.length === 0) {
          const proxy = buildEffectProxy(s)
          if (prisonEvent.effect) prisonEvent.effect(proxy)
          s = applyProxy(s, proxy)
          s = resolveProxyExtras(s, proxy)
          s.log = [...s.log, { age: s.age, text: typeof prisonEvent.text === 'function' ? prisonEvent.text(buildG(s)) : prisonEvent.text, isKey: false }]
        } else {
          s.pendingEvent = prisonEvent
          return s
        }
      } else {
        s.log = [...s.log, { age: s.age, text: `Another year behind bars. ${remaining} year${remaining === 1 ? '' : 's'} remain.`, isKey: false }]
      }
    }
    return s
  }

  // Wanted / fugitive annual capture risk
  if (s.wanted) {
    let captureChance = 0.15
    if (s.flags.includes('emigrated')) captureChance -= 0.07
    if (s.flags.includes('assumed_identity')) captureChance -= 0.08
    if (s.flags.includes('appearance_changed')) captureChance -= 0.05
    if (s.flags.includes('illegal_immigrant')) captureChance -= 0.04
    captureChance = Math.max(0.02, captureChance)
    if (Math.random() < captureChance) {
      const bonus = s.flags.includes('escaped_prisoner') ? 5 : 0
      const sentence = Math.max(1, (s.prisonSentence ?? 0) + bonus)
      s.wanted = false
      s.inPrison = true
      s.prisonSentence = sentence
      s.flags = [...new Set([...s.flags, 'recaptured'])]
      s.log = [...s.log, { age: s.age, text: `Police catch up with you after ${s.flags.includes('escaped_prisoner') ? 'your escape' : 'going on the run'}. You are arrested.${bonus > 0 ? ` An additional ${bonus} years added for the escape.` : ''}`, isKey: true }]
      return s
    }
    // Still free — small stress effect
    s.stats = { ...s.stats, happiness: clamp(s.stats.happiness - 3, 0, 100), health: clamp(s.stats.health - 1, 0, 100) }
  }

  // Post-murder investigation window (fires in the year after murder)
  if (s.mem?.murder_pending_detection) {
    const { risk } = s.mem.murder_pending_detection
    if (Math.random() < risk) {
      const sentence = 15 + Math.floor(Math.random() * 26)
      s.mem = { ...s.mem, murder_pending_detection: null }
      s.wanted = false
      s.inPrison = true
      s.prisonSentence = sentence
      s.criminalRecord = [...(s.criminalRecord ?? []), { crime: 'Murder (convicted)', age: s.age, category: 'violent' }]
      s.log = [...s.log, { age: s.age, text: `Investigators piece together evidence. You are charged with murder and sentenced to ${sentence} years.`, isKey: true }]
      return s
    } else {
      // Reduce remaining detection window each year
      const newRisk = (s.mem.murder_pending_detection.risk ?? 0) * 0.6
      if (newRisk < 0.02) {
        s.mem = { ...s.mem, murder_pending_detection: null }
        s.log = [...s.log, { age: s.age, text: 'The murder investigation goes cold. You appear to have gotten away with it.', isKey: false }]
      } else {
        s.mem = { ...s.mem, murder_pending_detection: { ...s.mem.murder_pending_detection, risk: newRisk } }
      }
    }
  }

  // Natural aging
  s = applyNaturalAging(s)

  // Pending birth — deliver child after ~2 age-up cycles from conception
  // This allows pregnancy texture events to fire before the birth year
  if (s.flags.includes('pregnant')) {
    // Normalise: if pregnancyYear not in mem (e.g. set by IVF event), initialise it
    if (s.mem?.pregnancyYear === undefined) {
      const cGender = chance(0.5) ? 'male' : 'female'
      const c = s.character?.country
      const childName = c ? `${pickFrom(cGender === 'male' ? c.namePool.male : c.namePool.female)} ${s.character.surname}` : 'Baby'
      s.mem = { ...(s.mem ?? {}), pregnancyYear: s.age - 1, pendingChild: { name: childName, gender: cGender, traits: pickTraits(CHILD_TRAITS) } }
    }
    // Birth fires when age >= pregnancyYear + 2 (one year of pregnancy events, then birth)
    if (s.age >= (s.mem.pregnancyYear ?? 0) + 2) {
      const pc = s.mem.pendingChild
      const archetype = s.character?.country?.archetype
      const healthcare = s.character?.country?.healthcare
      const isHighRisk = (s.currentYear < 1950) || archetype === 'subsaharan' || archetype === 'conflict_zone' ||
        archetype === 'developing_unstable' || s.flags.includes('high_risk_pregnancy') ||
        healthcare === 'very_poor' || healthcare === 'poor'
      const deathProb   = isHighRisk ? 0.018 : 0.001
      const compProb    = isHighRisk ? 0.10  : 0.03

      // Generate child if somehow still missing
      const childData = pc ?? (() => {
        const cg = chance(0.5) ? 'male' : 'female'
        const cc = s.character?.country
        const cn = cc ? `${pickFrom(cg === 'male' ? cc.namePool.male : cc.namePool.female)} ${s.character.surname}` : 'Baby'
        return { name: cn, gender: cg, traits: pickTraits(CHILD_TRAITS) }
      })()

      const child = { name: childData.name, gender: childData.gender, ageAtBirth: s.age, relationshipQuality: 80, traits: childData.traits }
      s.children = [...s.children, child]
      s.mem = { ...s.mem, pregnancyYear: undefined, pendingChild: undefined }

      if (chance(deathProb)) {
        // Maternal death — rare; child survives
        s.flags = [...new Set([...s.flags.filter(f => f !== 'pregnant'), 'parent'])]
        s.log = [...s.log, { age: s.age, text: `${child.name} is born. You do not survive the labour.`, isKey: true }]
        return { ...s, dead: true, causeOfDeath: 'Complications in childbirth', ribbon: assignRibbon(s), screen: 'death' }
      } else if (chance(compProb)) {
        // Near-miss complication — events will pick this up via birth_complication_survived flag
        s.flags = [...new Set([...s.flags.filter(f => f !== 'pregnant'), 'parent', 'birth_complication_survived'])]
        s.stats = { ...s.stats, health: clamp(s.stats.health - 20, 0, 100) }
        s.log = [...s.log, { age: s.age, text: `${child.name} is born. There were complications. You came close to not surviving.`, isKey: true }]
      } else {
        s.flags = [...new Set([...s.flags.filter(f => f !== 'pregnant'), 'parent'])]
        s.stats = { ...s.stats, happiness: clamp(s.stats.happiness + 10, 0, 100) }
        s.log = [...s.log, { age: s.age, text: `${child.name} is born. Everything shifts.`, isKey: true }]
      }
    }
  }

  // Family income during childhood (before career income, no career yet)
  if (s.age < 18 && !s.career) s = tickFamilyIncome(s)

  // Debt interest accrual
  if (s.debt > 0) {
    const interestRate = (s.mem?.debtType === 'mortgage') ? 0.06 : 0.18
    const interest = Math.round(s.debt * interestRate)
    s.debt = s.debt + interest
    s.money = (s.money ?? 0) - Math.round(s.debt * 0.05) // minimum payment
    if (s.money < -8000) {
      s.flags = [...new Set([...s.flags, 'bankrupt', 'declared_bankrupt', 'debt_spiral_survived'])]
      s.debt = 0
      s.money = -2000
      s.creditScore = 320
      s.log = [...s.log, { age: s.age, text: 'You are declared bankrupt. A relief and a shame at once.', isKey: true }]
    }
  }
  // Auto-flag debt spiral when in trouble
  if ((s.debt ?? 0) > 3000 && (s.money ?? 0) < 500) {
    s.flags = [...new Set([...s.flags, 'debt_spiral_active'])]
  }
  // Credit score recovery: faster when debt-free, slower when in debt
  if (!s.debt && (s.creditScore ?? 700) < 800) {
    s.creditScore = Math.min(800, (s.creditScore ?? 700) + 15)
  }

  // Parent aging and possible inheritance
  s = tickParents(s)

  // Sibling aging
  s = tickSiblings(s)

  // Pet aging
  s = tickPets(s)

  // Asset appreciation/depreciation/maintenance
  s = tickAssets(s)

  // Gold appreciation
  s = tickGold(s)

  // Partner aging and natural death
  s = tickPartner(s)

  // Undocumented / overstay annual pressure
  if (s.residencyStatus === 'undocumented' || s.residencyStatus === 'tourist_overstay') {
    s.stats = { ...s.stats, health: clamp((s.stats.health ?? 80) - 2, 0, 100), happiness: clamp((s.stats.happiness ?? 50) - 3, 0, 100) }
    s.money = (s.money ?? 0) - 200
  }

  // Climate-displaced pressure (limbo residency — no legal status, limited services)
  if (s.residencyStatus === 'climate_displaced') {
    s.stats = { ...s.stats, health: clamp((s.stats.health ?? 80) - 2, 0, 100), happiness: clamp((s.stats.happiness ?? 50) - 4, 0, 100) }
    s.money = (s.money ?? 0) - 150
  }

  // Extreme heat drain — Gulf/MENA countries post-2055 (wet-bulb seasonal uninhabitability)
  {
    const _heatCountry = s.currentCountry?.name || s.character?.country?.name
    const HEAT_T1 = new Set(['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain'])
    const HEAT_T2 = new Set(['Oman', 'Yemen', 'Iraq', 'Iran', 'Sudan', 'Djibouti'])
    if (HEAT_T1.has(_heatCountry) && (s.currentYear ?? 0) >= 2055) {
      s.stats = { ...s.stats, health: clamp((s.stats.health ?? 80) - 3, 0, 100), happiness: clamp((s.stats.happiness ?? 50) - 3, 0, 100) }
    } else if (HEAT_T2.has(_heatCountry) && (s.currentYear ?? 0) >= 2065) {
      s.stats = { ...s.stats, health: clamp((s.stats.health ?? 80) - 2, 0, 100), happiness: clamp((s.stats.happiness ?? 50) - 2, 0, 100) }
    }
  }

  // Hobby milestone flags — set once when skill crosses threshold
  {
    const hb = s.hobbies ?? {}
    const flagsSet = new Set(s.flags)
    const HOBBY_FLAGS = [
      [hb.music    ?? 0, 60, 'serious_musician'],
      [hb.writing  ?? 0, 60, 'serious_writer'],
      [hb.art      ?? 0, 60, 'serious_artist'],
      [hb.fitness  ?? 0, 70, 'fitness_devotee'],
      [hb.cooking  ?? 0, 65, 'accomplished_cook'],
      [hb.language ?? 0, 65, 'polyglot'],
      [hb.reading  ?? 0, 60, 'avid_reader'],
      [hb.gardening?? 0, 60, 'dedicated_gardener'],
    ]
    let newFlags = [...s.flags]
    for (const [skill, threshold, flag] of HOBBY_FLAGS) {
      if (skill >= threshold && !flagsSet.has(flag)) newFlags = [...newFlags, flag]
    }
    if (newFlags.length !== s.flags.length) s = { ...s, flags: newFlags }
  }

  // Activity milestone flags — set once when cumulative count crosses threshold
  {
    const m = s.mem ?? {}
    const flagsSet = new Set(s.flags)
    const ACT_FLAGS = [
      [m.act_count_meditate  ?? 0, 8,  'contemplative'],
      [m.act_count_volunteer ?? 0, 5,  'generous'],
      [m.act_count_donate    ?? 0, 5,  'generous'],
      [m.act_count_read      ?? 0, 10, 'avid_reader'],
      [m.act_count_journal   ?? 0, 8,  'reflective_writer'],
      [m.act_count_gym + (m.act_count_join_sports_team ?? 0) + (m.act_count_yoga ?? 0) ?? 0, 10, 'fitness_devotee'],
      [m.act_count_philosophy?? 0, 6,  'philosophical_mind'],
      [m.act_count_networking?? 0, 6,  'networker'],
      [m.act_count_save      ?? 0, 5,  'disciplined_saver'],
    ]
    let newFlags = [...s.flags]
    for (const [count, threshold, flag] of ACT_FLAGS) {
      if ((count ?? 0) >= threshold && !flagsSet.has(flag)) newFlags = [...newFlags, flag]
    }
    if (newFlags.length !== s.flags.length) s = { ...s, flags: newFlags }
  }

  // Fame decay if not in entertainment/sports
  s = tickFame(s)

  // World events
  s = applyWorldEvents(s)
  s = applyHeadlines(s)

  // Education progression
  s = tickEnrollment(s)

  // High school graduation at 18
  if (s.age === 18 && !s.flags.includes('graduated_hs') && !s.flags.includes('dropped_out') && !s.flags.includes('child_labor') && !s.flags.includes('left_school_early') && !s.education?.enrolled && !s.usedEventMap?.has('hs_graduation')) {
    const rawGpa = Math.min(4.0, parseFloat(((s.gpa ?? 2.0) + 0.1).toFixed(2)))
    s.education = { ...s.education, level: 'secondary' }
    s.flags = [...new Set([...s.flags, 'graduated_hs'])]
    s.gpa = rawGpa
    s.mem = { ...s.mem, hsGpa: rawGpa }
    const smarts = s.stats.smarts
    const canAfford = (s.money ?? 0) >= 8000 || smarts >= 72
    const scholarship = smarts >= 75 || rawGpa >= 3.7
    const uniChoices = (smarts >= 50 && canAfford) ? [{
      text: '🎓 Go to University',
      tag: null,
      outcome: scholarship ? 'You earn a partial scholarship and enroll in university.' : 'You enroll in university. The next four years will shape your career.',
      effect: (p) => {
        p.addFlag('university_enrolled')
        p.m += 5
        if (scholarship) p.addFlag('scholarship_won')
        p.setMem('educationPath', 'university')
      },
      inject: {
        id: 'uni_field_choice',
        phase: 'young_adult',
        text: 'What will you study at university?',
        choices: [
          { text: '🏥 Medicine / Healthcare', tag: null, outcome: 'Demanding, long hours, significant reward.', effect: (p) => { p.setEnrolled({ type: 'university', field: 'healthcare', year: 0 }); p.setMem('uniField', 'healthcare') }, inject: null },
          { text: '⚖️ Law / Business', tag: null, outcome: 'Competitive and potentially lucrative.', effect: (p) => { p.setEnrolled({ type: 'university', field: 'business', year: 0 }); p.setMem('uniField', 'business') }, inject: null },
          { text: '🔬 Science / Engineering', tag: null, outcome: 'Rigorous with strong career prospects.', effect: (p) => { p.setEnrolled({ type: 'university', field: 'science', year: 0 }); p.setMem('uniField', 'science') }, inject: null },
          { text: '📚 Arts / Humanities', tag: null, outcome: 'You follow your passion. The path is less prescribed.', effect: (p) => { p.setEnrolled({ type: 'university', field: 'arts', year: 0 }); p.setMem('uniField', 'arts') }, inject: null },
        ],
        effect: null,
        when: () => true,
      },
    }] : []
    const graduationEvent = {
      id: 'hs_graduation',
      phase: 'young_adult',
      text: `You graduate from high school. GPA: ${rawGpa.toFixed(2)}. The world is waiting — what comes next?`,
      choices: [
        ...uniChoices,
        {
          text: '🔧 Trade / Vocational School',
          tag: null,
          outcome: 'A practical path. Two years to a certified trade.',
          effect: (p) => { p.m += 3; p.addFlag('vocational_enrolled'); p.setMem('educationPath', 'vocational') },
          inject: {
            id: 'vocational_field_choice',
            phase: 'young_adult',
            text: 'Which trade will you train in?',
            choices: [
              { text: '🔌 Electrician', tag: null, outcome: 'In-demand work. Good pay.', effect: (p) => { p.setEnrolled({ type: 'vocational', field: 'electrician', year: 0 }); p.setMem('vocField', 'electrician') }, inject: null },
              { text: '🔧 Plumbing', tag: null, outcome: 'Essential trade. Steady income.', effect: (p) => { p.setEnrolled({ type: 'vocational', field: 'plumber', year: 0 }); p.setMem('vocField', 'plumber') }, inject: null },
              { text: '🏗️ Construction', tag: null, outcome: 'Physical work. You build real things.', effect: (p) => { p.setEnrolled({ type: 'vocational', field: 'construction', year: 0 }); p.setMem('vocField', 'construction') }, inject: null },
              { text: '💻 IT / Technical', tag: null, outcome: 'Fast-growing field, strong demand.', effect: (p) => { p.setEnrolled({ type: 'vocational', field: 'IT', year: 0 }); p.setMem('vocField', 'IT') }, inject: null },
            ],
            effect: null,
            when: () => true,
          },
        },
        {
          text: '💼 Enter the Workforce',
          tag: 'workforce_direct',
          outcome: 'No more school. You start earning right away.',
          effect: (p) => { p.m += 2; p.addFlag('workforce_direct'); p.setMem('educationPath', 'workforce') },
          inject: null,
        },
      ],
      effect: null,
      when: () => true,
    }
    s.queue = [graduationEvent, ...s.queue]
  }

  // Addiction health drain
  if (s.flags.includes('alcohol_addiction')) {
    s.stats = { ...s.stats, health: clamp(s.stats.health - 2, 0, 100), happiness: clamp(s.stats.happiness - 3, 0, 100) }
  }
  if (s.flags.includes('drug_addiction')) {
    s.stats = { ...s.stats, health: clamp(s.stats.health - 3, 0, 100), happiness: clamp(s.stats.happiness - 2, 0, 100) }
    // Overdose risk (random annual check)
    if (chance(0.04)) {
      s.stats = { ...s.stats, health: clamp(s.stats.health - 20, 0, 100) }
      s.flags = [...new Set([...s.flags, 'overdosed'])]
      s.log = [...s.log, { age: s.age, text: 'You suffer an overdose. You survive, but barely.', isKey: true }]
    }
  }

  // Relapse risk for those in recovery under high stress
  if (s.flags.includes('in_recovery') && s.stats.happiness < 30 && chance(0.18)) {
    const hadAlcohol = s.flags.includes('rehab_graduate') && (s.mem?.alcoholUses ?? 0) > 3
    const relapseTo = hadAlcohol ? 'alcohol_addiction' : 'drug_addiction'
    s.flags = [...new Set([...s.flags, relapseTo, 'relapsed'])]
    s.flags = s.flags.filter(f => f !== 'in_recovery')
    s.log = [...s.log, { age: s.age, text: 'The recovery holds until it doesn\'t. The stress is too much and the old pattern reasserts itself. You relapse.', isKey: true }]
  }

  // Chronic condition passive drain
  if ((s.conditions ?? []).length > 0) {
    let hDrain = 0, mDrain = 0
    for (const cond of s.conditions) {
      if (cond.severity === 'mild' && !cond.managed) { hDrain += 1 }
      else if (cond.severity === 'moderate' && cond.managed) { hDrain += 1 }
      else if (cond.severity === 'moderate' && !cond.managed) { hDrain += 3; mDrain += 2 }
      else if (cond.severity === 'severe' && cond.managed) { hDrain += 2; mDrain += 1 }
      else if (cond.severity === 'severe' && !cond.managed) { hDrain += 6; mDrain += 4 }
    }
    if (hDrain > 0 || mDrain > 0) {
      s.stats = {
        ...s.stats,
        health:    clamp(s.stats.health    - hDrain, 0, 100),
        happiness: clamp(s.stats.happiness - mDrain, 0, 100),
      }
    }
  }

  // Auto-detect and advance slow-burn personal project
  if (!s.currentProject) {
    // Detect project from existing flags
    const fl = s.flags
    if (fl.includes('writing_in_drawer') || fl.includes('reflective_writer') || fl.includes('serious_writer')) {
      s = { ...s, currentProject: { type: 'writing', startYear: s.currentYear, phase: 'early', name: null } }
    } else if (fl.includes('runner_habit') || fl.includes('runner_entered_race')) {
      s = { ...s, currentProject: { type: 'running', startYear: s.currentYear, phase: 'early', name: null } }
    } else if (fl.includes('music_private') || fl.includes('musician_performing') || fl.includes('serious_musician')) {
      s = { ...s, currentProject: { type: 'music', startYear: s.currentYear, phase: 'early', name: null } }
    } else if (fl.includes('art_in_drawer') || fl.includes('serious_artist')) {
      s = { ...s, currentProject: { type: 'art', startYear: s.currentYear, phase: 'early', name: null } }
    } else if (fl.includes('business_started')) {
      s = { ...s, currentProject: { type: 'business', startYear: s.currentYear, phase: 'early', name: s.business?.name ?? null } }
    }
  } else if (s.currentProject) {
    // Advance phase based on years into project
    const proj = s.currentProject
    const yearsIn = s.currentYear - (proj.startYear ?? s.currentYear)
    const newPhase = yearsIn >= 10 ? 'established' : yearsIn >= 5 ? 'late' : yearsIn >= 2 ? 'middle' : 'early'
    if (newPhase !== proj.phase) {
      s = { ...s, currentProject: { ...proj, phase: newPhase } }
    }
    // Clear project if the underlying flags are gone (abandoned)
    const fl = s.flags
    const typeActive = {
      writing: fl.includes('writing_in_drawer') || fl.includes('reflective_writer') || fl.includes('serious_writer'),
      running: fl.includes('runner_habit') || fl.includes('runner_entered_race') || fl.includes('played_into_adulthood'),
      music: fl.includes('music_private') || fl.includes('musician_performing') || fl.includes('serious_musician'),
      art: fl.includes('art_in_drawer') || fl.includes('serious_artist'),
      business: fl.includes('business_started'),
    }
    if (proj.type && typeActive[proj.type] === false) {
      s = { ...s, currentProject: { ...proj, phase: 'abandoned' } }
    }
  }

  // Illness risk check
  s = checkIllnessRisk(s)

  // Charisma passive drain under authoritarian regimes (self-suppression of social energy)
  if (s.flags.includes('learned_silence') || s.flags.includes('authoritarian_childhood')) {
    const liveCountry = s.currentCountry ?? s.character?.country
    const regime = getCountryRegime(liveCountry, s.currentYear)
    const authRegimes = ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy', 'absolute_monarchy']
    if (authRegimes.includes(regime)) {
      s.stats = { ...s.stats, charisma: clamp(s.stats.charisma - 1, 10, 100) }
    }
  }

  // Death check
  const death = checkDeath(s)
  if (death.dead) {
    if (s.pendingTrial) {
      s.log = [...s.log, { age: s.age, text: `The case against you — ${s.pendingTrial.crimeName} — is dropped when you die. Courts do not try the dead.`, isKey: false }]
      s = { ...s, pendingTrial: null }
    }
    return { ...s, dead: true, causeOfDeath: death.cause, ribbon: assignRibbon(s), screen: 'death' }
  }

  // Career: performance drift, promotion, income, firing
  if (s.career) {
    let perfDrift = (70 - (s.career.performance ?? 70)) * 0.05
    if (s.stats.happiness > 65) perfDrift += 1.5
    else if (s.stats.happiness < 35) perfDrift -= 2
    if (s.stats.health < 40) perfDrift -= 2
    const newPerf = clamp((s.career.performance ?? 70) + perfDrift, 0, 100)
    s.career = { ...s.career, yearsInRole: s.career.yearsInRole + 1, performance: newPerf }

    if (newPerf < 15 && chance(0.35)) {
      s = fireFromJob(s)
    } else {
      s = checkPromotion(s)
    }
  }

  // Career income (actual salary → money)
  if (s.career) {
    let annual = s.career.partTime ? Math.round(s.career.salary * 0.5) : s.career.salary
    // Agriculture: harvest variance ±50% — a good year and a bad year feel completely different
    if (s.career.field === 'agriculture') {
      const harvestFactor = 1 + randomBetween(-50, 60) / 100
      annual = Math.max(0, Math.round(annual * harvestFactor))
      if (harvestFactor < 0.6) s.log = [...s.log, { age: s.age, text: 'A bad year for the harvest. You earn significantly less than expected.', isKey: false }]
      else if (harvestFactor > 1.4) s.log = [...s.log, { age: s.age, text: 'A good harvest. The yield is better than most years.', isKey: false }]
    }
    s.money = (s.money ?? 0) + annual
    // Sync wealth stat loosely from money (logarithmic quality-of-life indicator)
    const wealthLevel = clamp(Math.round((Math.log10(Math.max(1, s.money)) - 2.5) * 22), 5, 98)
    s.stats = { ...s.stats, wealth: wealthLevel }
    // Fame accumulation for entertainment/sports careers
    if (s.career.field === 'entertainment' || s.career.field === 'sports') {
      const fameGain = clamp((s.career.level + 1) * 5 + randomBetween(-3, 6), 1, 25)
      s.fame = clamp((s.fame ?? 0) + fameGain, 0, 100)
    }
  }

  // Household contribution (filial / extended family / zakat)
  s = tickHouseholdContribution(s)

  // ROSCA cycle: deduct contribution, pay out on schedule
  s = tickROSCA(s)

  // Poverty premium: cost of being poor
  s = tickPovertyPremium(s)

  // Hyperinflation: currency devaluation
  s = tickHyperinflation(s)

  // Business annual income
  if (s.business?.active) {
    const bt = BUSINESS_TYPES.find(b => b.id === s.business.id)
    if (bt) {
      const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
      const mult = gdpMult[s.character?.country?.gdp] ?? 1.0
      const perf = s.business.performance ?? 50
      const [minRev, maxRev] = bt.baseRevenue
      const scaledMin = Math.round(minRev * mult)
      const scaledMax = Math.round(maxRev * mult)
      const rawRevenue = Math.round(randomBetween(scaledMin, scaledMax) * (perf / 60))
      const expenses = Math.round(rawRevenue * randomBetween(0.35, 0.55))
      const profit = rawRevenue - expenses
      const newValue = Math.round(s.business.value * 1.05 + profit * 0.3)
      // Performance drifts toward 50 without management
      const perfDrift = clamp(perf + randomBetween(-8, 5), 10, 95)
      s.business = { ...s.business, yearsOpen: (s.business.yearsOpen ?? 0) + 1, revenue: rawRevenue, expenses, performance: perfDrift, value: newValue }
      s.money = (s.money ?? 0) + profit
      s.stats = { ...s.stats, wealth: clamp(s.stats.wealth + (profit > 0 ? 2 : -2), 0, 100) }
      if (s.business.yearsOpen === 1) s.log = [...s.log, { age: s.age, text: `First year of ${s.business.name}: revenue $${rawRevenue.toLocaleString()}, profit $${profit.toLocaleString()}.`, isKey: true }]
      else if (profit < 0) s.log = [...s.log, { age: s.age, text: `${s.business.name} had a tough year. Lost $${Math.abs(profit).toLocaleString()}.`, isKey: false }]
      else s.log = [...s.log, { age: s.age, text: `${s.business.name} earned $${profit.toLocaleString()} profit this year.`, isKey: false }]
    }
  }

  // Partner relationship drift
  if (s.partner) {
    const drift = (55 - s.partner.relationshipQuality) * 0.03 + randomBetween(-2, 2)
    const newQ = clamp(s.partner.relationshipQuality + drift, 0, 100)
    s.partner = { ...s.partner, relationshipQuality: newQ, years: (s.partner.years ?? 0) + 1 }
    if (newQ < 20 && !s.partner.married && chance(0.3)) {
      const name = s.partner.name
      s.partner = null
      s.flags = [...new Set([...s.flags, 'breakup'])]
      s.stats = { ...s.stats, happiness: clamp(s.stats.happiness - 12, 0, 100) }
      s.log = [...s.log, { age: s.age, text: `Your relationship with ${name} falls apart.`, isKey: true }]
    }
  }

  // Auto-generate partner moments from traits (lazy init on first qualifying year)
  if (s.partner && s.partner.traits?.length && (s.partner.years ?? 0) >= 3 && !s.mem?.partnerMomentsGenerated) {
    const moments = []
    const shuffled = [...s.partner.traits].sort(() => Math.random() - 0.5)
    for (const trait of shuffled.slice(0, 3)) {
      const lines = TRAIT_PROSE[trait]
      if (lines) moments.push(pick(lines))
    }
    s.mem = { ...(s.mem ?? {}), partnerMoments: moments, partnerMomentsGenerated: true }
  }
  // Refresh partner moments occasionally as the relationship continues
  if (s.partner && s.partner.traits?.length && s.mem?.partnerMomentsGenerated && (s.partner.years ?? 0) > 0 && s.partner.years % 7 === 0) {
    const existing = s.mem.partnerMoments ?? []
    const trait = pickFrom(s.partner.traits.filter(t => TRAIT_PROSE[t]))
    if (trait) {
      const newMoment = pick(TRAIT_PROSE[trait])
      if (!existing.includes(newMoment)) {
        s.mem = { ...s.mem, partnerMoments: [...existing, newMoment].slice(-12) }
      }
    }
  }

  // Children relationship drift
  if (s.children.length > 0) {
    s.children = s.children.map(child => ({
      ...child,
      relationshipQuality: clamp(child.relationshipQuality + (70 - child.relationshipQuality) * 0.02 + randomBetween(-1, 2), 0, 100),
    }))
  }

  // Friend drift
  if (s.friends && s.friends.length > 0) {
    s.friends = s.friends.map(friend => {
      if (!friend.alive) return friend
      const drift = (50 - friend.relationshipQuality) * 0.01
      return { ...friend, relationshipQuality: clamp(friend.relationshipQuality + drift + randomBetween(-1, 1), 0, 100) }
    })
  }

  // Get next event
  const event = getNextEvent(s)
  if (!event) {
    s.pendingEvent = null
    s.log = [...s.log, { age: s.age, text: buildYearTexture(s), isKey: false }]
    return s
  }

  if (s.queue.some(e => e.id === event.id)) s.queue = s.queue.filter(e => e.id !== event.id)
  s.usedEventMap = new Map([...(s.usedEventMap ?? new Map()), [event.id, s.currentYear]])

  // Resolve function text so EventBox and logs always receive strings
  const resolvedText = typeof event.text === 'function' ? event.text(buildG(s)) : (event.text ?? '')
  const resolvedEvent = resolvedText !== event.text ? { ...event, text: resolvedText } : event

  if (!resolvedEvent.choices || resolvedEvent.choices.length === 0) {
    const proxy = buildEffectProxy(s)
    if (resolvedEvent.effect) resolvedEvent.effect(proxy)
    s = applyProxy(s, proxy)
    s = resolveProxyExtras(s, proxy)
    s.log = [...s.log, { age: s.age, text: resolvedText, isKey: resolvedEvent.isKey ?? false }]
    return s
  }

  s.pendingEvent = resolvedEvent
  return s
}

export function resolveChoice(state, choiceIndex) {
  const { pendingEvent } = state
  if (!pendingEvent?.choices) return state
  const choice = pendingEvent.choices[choiceIndex]
  if (!choice) return state

  const proxy = buildEffectProxy(state)
  if (choice.effect) choice.effect(proxy)
  let s = applyProxy(state, proxy)
  s = resolveProxyExtras(s, proxy)
  if (choice.tag) s.flags = [...new Set([...s.flags, choice.tag])]
  if (choice.inject) s.queue = [...s.queue, choice.inject]
  const evtText = typeof pendingEvent.text === 'function' ? pendingEvent.text(buildG(state)) : (pendingEvent.text ?? '')
  const outcomeText = typeof choice.outcome === 'function' ? choice.outcome(buildG(s)) : (choice.outcome ?? '')
  s.log = [...s.log, { age: state.age, text: `${evtText.slice(0, 80)}… — ${outcomeText}`, isKey: true }]
  s.pendingEvent = null
  return s
}

// ─── Asset system ────────────────────────────────────────────────────────────

export function buyProperty(state, typeId) {
  if (state.age < 18) return state
  const type = PROPERTY_TYPES.find(t => t.id === typeId)
  if (!type) return state
  const price = Math.round(randomBetween(type.priceRange[0], type.priceRange[1]))
  const downPayment = Math.round(price * type.downPaymentRate)
  if ((state.money ?? 0) < downPayment) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford the down payment for a ${type.name}.`, isKey: false }] }
  }
  const mortgage = price - downPayment
  const property = { typeId: type.id, name: type.name, purchasePrice: price, currentValue: price, mortgage }
  return {
    ...state,
    money: (state.money ?? 0) - downPayment,
    assets: { ...state.assets, properties: [...(state.assets?.properties ?? []), property] },
    flags: [...new Set([...state.flags, 'homeowner'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 8, 0, 100) },
    log: [...state.log, { age: state.age, text: `You buy a ${type.name} for $${price.toLocaleString()}. Down payment: $${downPayment.toLocaleString()}.`, isKey: true }],
  }
}

export function sellProperty(state, propertyIdx) {
  const properties = state.assets?.properties ?? []
  const prop = properties[propertyIdx]
  if (!prop) return state
  const equity = prop.currentValue - (prop.mortgage ?? 0)
  const agentFee = Math.round(prop.currentValue * 0.025)
  const proceeds = Math.max(0, equity - agentFee)
  const newProperties = properties.filter((_, i) => i !== propertyIdx)
  return {
    ...state,
    money: (state.money ?? 0) + proceeds,
    assets: { ...state.assets, properties: newProperties },
    log: [...state.log, { age: state.age, text: `You sell your ${prop.name} for $${prop.currentValue.toLocaleString()}, netting $${proceeds.toLocaleString()} after fees and mortgage.`, isKey: true }],
  }
}

export function buyVehicle(state, typeId) {
  const bicycleTiers = ['bicycle']
  const type = VEHICLE_TYPES.find(t => t.id === typeId)
  if (!type) return state
  if (!state.licenceObtained && !bicycleTiers.includes(type.tier)) {
    return { ...state, log: [...state.log, { age: state.age, text: "You need a driving licence first.", isKey: false }] }
  }
  const price = Math.round(randomBetween(type.priceRange[0], type.priceRange[1]))
  const displayName = type.make ? `${type.make} ${type.model}` : type.name
  if ((state.money ?? 0) < price) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford a ${displayName}.`, isKey: false }] }
  }
  const happinessDelta = type.tier === 'supercar' ? 12 : type.tier === 'luxury_car' ? 8 : type.tier === 'watercraft' ? 10 : 4
  const vehicle = { typeId: type.id, tier: type.tier, name: displayName, purchasePrice: price, currentValue: price }
  const newFlags = state.flags.includes('has_vehicle') ? state.flags : [...state.flags, 'has_vehicle']
  return {
    ...state,
    money: (state.money ?? 0) - price,
    assets: { ...state.assets, vehicles: [...(state.assets?.vehicles ?? []), vehicle] },
    flags: newFlags,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + happinessDelta, 0, 100) },
    log: [...state.log, { age: state.age, text: `You buy a ${displayName} for $${price.toLocaleString()}.`, isKey: false }],
  }
}

export function sellVehicle(state, vehicleIdx) {
  const vehicles = state.assets?.vehicles ?? []
  const vehicle = vehicles[vehicleIdx]
  if (!vehicle) return state
  const newVehicles = vehicles.filter((_, i) => i !== vehicleIdx)
  return {
    ...state,
    money: (state.money ?? 0) + vehicle.currentValue,
    assets: { ...state.assets, vehicles: newVehicles },
    log: [...state.log, { age: state.age, text: `You sell your ${vehicle.name} for $${vehicle.currentValue.toLocaleString()}.`, isKey: false }],
  }
}

export function abandonChild(state, childIndex) {
  const child = state.children[childIndex]
  if (!child) return state
  const updated = state.children.filter((_, i) => i !== childIndex)
  return {
    ...state,
    children: updated,
    flags: [...new Set([...state.flags, 'deadbeat_parent'])],
    regret: clamp(state.regret + 25, 0, 100),
    karma: clamp((state.karma ?? 50) - 20, 0, 100),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness - 15, 0, 100) },
    log: [...state.log, { age: state.age, text: `You abandon ${child.name.split(' ')[0]}. The weight of this will not leave you.`, isKey: true }],
  }
}

// ─── Pets ─────────────────────────────────────────────────────────────────────

const PET_NAMES = ['Buddy', 'Luna', 'Max', 'Bella', 'Charlie', 'Milo', 'Daisy', 'Rocky', 'Cleo', 'Oscar']

export function adoptPet(state, species) {
  if (state.age < 8) return state
  const name = pickFrom(PET_NAMES)
  const adoptionCost = { dog: 400, cat: 200, rabbit: 80, hamster: 30, parrot: 300, fish: 20, bird: 150 }[species] ?? 200
  if ((state.money ?? 0) < adoptionCost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford the adoption fee.`, isKey: false }] }
  }
  const pet = { name, species, age: 0, alive: true }
  return {
    ...state,
    money: (state.money ?? 0) - adoptionCost,
    pets: [...(state.pets ?? []), pet],
    flags: [...new Set([...state.flags, 'pet_owner'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 8, 0, 100) },
    log: [...state.log, { age: state.age, text: `You adopt a ${species} named ${name}.`, isKey: true }],
  }
}

export function visitVet(state, petIdx) {
  const pets = state.pets ?? []
  const pet = pets[petIdx]
  if (!pet?.alive) return state
  const cost = randomBetween(150, 600)
  if ((state.money ?? 0) < cost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford the vet bill right now.`, isKey: false }] }
  }
  return {
    ...state,
    money: (state.money ?? 0) - cost,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 3, 0, 100) },
    log: [...state.log, { age: state.age, text: `You take ${pet.name} to the vet. Cost: $${cost.toLocaleString()}.`, isKey: false }],
  }
}

// ─── Career actions (continued) ──────────────────────────────────────────────

export function workHarder(state) {
  if (!state.career) return state
  const gain = randomBetween(5, 14)
  return {
    ...state,
    career: { ...state.career, performance: clamp((state.career.performance ?? 70) + gain, 0, 100) },
    stats: { ...state.stats, health: clamp(state.stats.health - 3, 0, 100), happiness: clamp(state.stats.happiness - 2, 0, 100) },
    log: [...state.log, { age: state.age, text: `You put in extra hours. Performance improves. The body notices.`, isKey: false }],
  }
}

export function schmoozeBoss(state) {
  if (!state.career) return state
  const successChance = clamp(0.3 + (state.stats.charisma - 50) * 0.006, 0.1, 0.8)
  if (chance(successChance)) {
    const gain = randomBetween(8, 18)
    return {
      ...state,
      career: { ...state.career, performance: clamp((state.career.performance ?? 70) + gain, 0, 100) },
      stats: { ...state.stats, happiness: clamp(state.stats.happiness - 1, 0, 100) },
      log: [...state.log, { age: state.age, text: `Your charm lands. Your manager thinks well of you.`, isKey: false }],
    }
  }
  return {
    ...state,
    log: [...state.log, { age: state.age, text: `The schmoozing reads as transparent. No ground gained.`, isKey: false }],
  }
}

// ─── Life transitions ─────────────────────────────────────────────────────────

export function retire(state) {
  if (!state.career && state.retired) return state
  const pension = state.career ? Math.round(state.career.salary * 0.35) : 0
  return {
    ...state,
    career: null,
    retired: true,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 10, 0, 100) },
    log: [...state.log, { age: state.age, text: `You retire.${pension > 0 ? ` You'll receive approximately $${pension.toLocaleString()}/yr in pension.` : ''}`, isKey: true }],
  }
}

// ─── Internal relocation ─────────────────────────────────────────────────────

export function relocate(state, destPlaceId, destNeighborhoodTier) {
  const destPlace = PLACES.find(p => p.id === destPlaceId)
  if (!destPlace) return state

  const fromPlace = state.currentPlace ?? state.character?.birthPlace
  if (fromPlace?.id === destPlace.id) return state

  const moveCost = getRelocationCost(fromPlace, destPlace)
  if ((state.money ?? 0) < moveCost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You need $${moveCost.toLocaleString()} to move to ${destPlace.name}. You can't afford it right now.`, isKey: false }] }
  }

  const tier = destNeighborhoodTier ?? pickNeighborhoodTier(state.classTier ?? state.character?.wealthTier ?? 3)
  const nbrName = pickNamedNeighborhood(destPlace, tier)
  const fromName = fromPlace?.name ?? (state.currentCountry ?? state.character?.country)?.name ?? 'where you were'

  const isSameCountry = destPlace.country === (state.currentCountry ?? state.character?.country)?.name

  const logText = isSameCountry
    ? `You move from ${fromName} to ${destPlace.name}${nbrName ? ` — ${nbrName}` : ''}. Moving costs $${moveCost.toLocaleString()}.`
    : `You move to ${destPlace.name}, ${destPlace.country}${nbrName ? ` — ${nbrName}` : ''}. Moving costs $${moveCost.toLocaleString()}.`

  return {
    ...state,
    currentPlace: destPlace,
    currentNeighborhoodTier: tier,
    currentNeighborhoodName: nbrName,
    money: Math.max(0, (state.money ?? 0) - moveCost),
    flags: [...new Set([...state.flags, 'relocated'])],
    queue: [...(state.queue ?? []), {
      id: `place_arrival_${destPlace.id}_${state.age}`,
      phase: null, cooldown: 0, when: null,
      text: buildArrivalText(fromPlace, destPlace, state),
      choices: null,
      effect: (p) => { p.m -= 3; p.s += 2 },
    }],
    log: [...state.log, { age: state.age, text: logText, isKey: true }],
  }
}

function buildArrivalText(fromPlace, toPlace, state) {
  const fromCity = fromPlace?.name ?? 'where you were'
  const toCity = toPlace.name
  const isUrbanArrival = ['urban', 'major_city', 'megacity'].includes(toPlace.type) || ['major_city', 'megacity', 'mid_city'].includes(toPlace.scale)
  const isRuralArrival = toPlace.type === 'rural'

  if (isUrbanArrival) {
    return `${toCity} is larger than anything you expected. The volume of it — the traffic, the crowds, the distances between things — takes adjustment. You learn the routes. You find where the cheap food is. You begin the work of making a new place ordinary.`
  }
  if (isRuralArrival) {
    return `The quiet of ${toCity} is the first thing. After ${fromCity}, the absence of constant sound is its own kind of sound. The pace is different here. The days have different shapes.`
  }
  return `${toCity} takes time to become familiar. The streets, the rhythms, the unwritten rules of who goes where. You are still learning which of these will become yours.`
}

export function emigrate(state, destCountryName, destPlaceId) {
  if (state.wanted) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You are wanted — border control will arrest you on sight. You must emigrate illegally.', isKey: false }] }
  }
  const dest = COUNTRIES.find(c => c.name === destCountryName)
  if (!dest) return state
  const alreadyAbroad = state.flags.includes('emigrated')
  if (alreadyAbroad && state.currentCountry?.name === dest.name) return state
  const moveCost = randomBetween(3000, 15000)
  const isRefugee = state.flags.includes('refugee') || state.flags.includes('displaced')
  const isIllegal = state.flags.includes('illegal_immigrant')
  const initialStatus = isRefugee ? 'refugee_status' : isIllegal ? 'undocumented' : 'work_visa'
  const fromName = (state.currentCountry ?? state.character?.country)?.name ?? state.character?.country?.name

  // Pick destination place: explicit placeId > largest city in dest country > null
  let destPlace = null
  if (destPlaceId) {
    destPlace = PLACES.find(p => p.id === destPlaceId) ?? null
  }
  if (!destPlace) {
    const destPlaces = getPlacesForCountry(dest.name)
    // Pick the largest city as default immigration destination
    const scaleOrder = ['megacity', 'major_city', 'mid_city', 'town', 'village']
    for (const scale of scaleOrder) {
      const match = destPlaces.find(p => p.scale === scale)
      if (match) { destPlace = match; break }
    }
    if (!destPlace && destPlaces.length) destPlace = destPlaces[0]
  }

  const destTier = pickNeighborhoodTier(state.classTier ?? state.character?.wealthTier ?? 2)
  const destNbr = destPlace ? pickNamedNeighborhood(destPlace, destTier) : null

  const logText = alreadyAbroad
    ? `You move from ${fromName} to ${dest.name}${destPlace ? ` — ${destPlace.name}` : ''}. Moving costs: $${moveCost.toLocaleString()}.`
    : `You emigrate to ${dest.name}${destPlace ? ` — ${destPlace.name}` : ''}. Moving costs: $${moveCost.toLocaleString()}.`

  return {
    ...state,
    currentCountry: dest,
    currentPlace: destPlace ?? state.currentPlace,
    currentNeighborhoodTier: destTier,
    currentNeighborhoodName: destNbr,
    residencyStatus: initialStatus,
    money: Math.max(0, (state.money ?? 0) - moveCost),
    flags: [...new Set([...state.flags, 'emigrated'])],
    stats: {
      ...state.stats,
      happiness: clamp(state.stats.happiness - 10, 0, 100),
      charisma: clamp(state.stats.charisma - 5, 0, 100),
      smarts: clamp(state.stats.smarts + 5, 0, 100),
    },
    log: [...state.log, { age: state.age, text: logText, isKey: true }],
  }
}

// ─── Residency upgrade ───────────────────────────────────────────────────────

const RESIDENCY_LADDER = {
  work_visa:          { next: 'permanent_resident', yearsRequired: 5,  fee: 3000  },
  permanent_resident: { next: 'citizen',            yearsRequired: 10, fee: 1500  },
  refugee_status:     { next: 'permanent_resident', yearsRequired: 3,  fee: 500   },
  asylum_seeker:      { next: 'refugee_status',     yearsRequired: 1,  fee: 0     },
  undocumented:       { next: 'work_visa',           yearsRequired: 0,  fee: 2000  },
  tourist_overstay:   { next: 'work_visa',           yearsRequired: 0,  fee: 2000  },
  climate_displaced:  { next: 'refugee_status',     yearsRequired: 2,  fee: 0     },
}

export function upgradeResidency(state) {
  const status = state.residencyStatus ?? 'citizen'
  const path = RESIDENCY_LADDER[status]
  if (!path) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You are already a citizen.', isKey: false }] }
  }
  const yearsAbroad = state.yearsAbroad ?? 0
  if (yearsAbroad < path.yearsRequired) {
    const rem = path.yearsRequired - yearsAbroad
    return { ...state, log: [...state.log, { age: state.age, text: `You need ${rem} more year${rem !== 1 ? 's' : ''} of residency before you can apply.`, isKey: false }] }
  }
  if ((state.money ?? 0) < path.fee) {
    return { ...state, log: [...state.log, { age: state.age, text: `The application fee is $${path.fee.toLocaleString()}. You can't afford it right now.`, isKey: false }] }
  }

  const hasSeriousCrime = (state.criminalRecord ?? []).some(r => {
    const c = typeof r === 'string' ? r : (r.crime ?? '')
    return /murder|assault|robbery|trafficking|terrorism|rape|manslaughter/i.test(c)
  })
  const hasCriminalRecord = (state.criminalRecord ?? []).length > 0
  let successChance = status === 'undocumented' || status === 'tourist_overstay' ? 0.35 : status === 'asylum_seeker' ? 0.55 : 0.75
  if (hasSeriousCrime) successChance *= 0.15
  else if (hasCriminalRecord) successChance *= 0.55
  if (Math.random() > successChance) {
    return {
      ...state,
      money: Math.max(0, (state.money ?? 0) - path.fee),
      log: [...state.log, { age: state.age, text: `Your application for ${path.next.replace(/_/g, ' ')} was rejected. The fee is gone. You can try again later.`, isKey: true }],
    }
  }

  const msgs = {
    permanent_resident: `After years of paperwork and waiting, permanent residency is granted. You now have the right to stay.`,
    citizen:            `The citizenship certificate arrives. You hold a passport with a different flag on the cover than the one you were born with.`,
    refugee_status:     `Your refugee status is officially recognised. You realise you had been holding your breath for years.`,
    work_visa:          `Your status is regularised. You are no longer invisible to the system.`,
  }

  return {
    ...state,
    residencyStatus: path.next,
    money: Math.max(0, (state.money ?? 0) - path.fee),
    flags: [...new Set([...state.flags, `achieved_${path.next}`])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 10, 0, 100) },
    log: [...state.log, { age: state.age, text: msgs[path.next] ?? `Status upgraded to ${path.next.replace(/_/g, ' ')}.`, isKey: true }],
  }
}

export function seekAsylum(state) {
  if (['citizen', 'permanent_resident'].includes(state.residencyStatus)) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You already have secure status here.', isKey: false }] }
  }
  if (state.residencyStatus === 'asylum_seeker' || state.residencyStatus === 'refugee_status') {
    return { ...state, log: [...state.log, { age: state.age, text: 'Your asylum application is already in progress.', isKey: false }] }
  }
  const isConflict = state.flags.some(f => ['war_childhood', 'displaced', 'persecution', 'genocide_survivor', 'revolution_generation', 'learned_silence'].includes(f))
  const accepted = Math.random() < (isConflict ? 0.65 : 0.35)
  const dest = state.currentCountry ?? state.character?.country
  return {
    ...state,
    residencyStatus: accepted ? 'refugee_status' : 'asylum_seeker',
    flags: [...new Set([...state.flags, 'sought_asylum', 'emigrated'])],
    currentCountry: dest,
    yearsAbroad: state.yearsAbroad ?? 0,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + (accepted ? 12 : -5), 0, 100) },
    log: [...state.log, {
      age: state.age,
      text: accepted
        ? `Your asylum claim is accepted. You have the right to remain in ${dest?.name}. The relief is physical.`
        : `You file for asylum in ${dest?.name}. The decision is pending. You enter a waiting period with no defined end.`,
      isKey: true,
    }],
  }
}

// ─── Sibling interaction ──────────────────────────────────────────────────────

export function callSibling(state, siblingIdx) {
  const siblings = state.siblings ?? []
  const sib = siblings[siblingIdx]
  if (!sib?.alive) return state
  const gain = randomBetween(3, 10)
  const updated = [...siblings]
  updated[siblingIdx] = { ...sib, relationshipQuality: clamp(sib.relationshipQuality + gain, 0, 100) }
  return {
    ...state,
    siblings: updated,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 3, 0, 100) },
    log: [...state.log, { age: state.age, text: `You call ${sib.name}. It is a good conversation.`, isKey: false }],
  }
}

// ─── Child adoption ───────────────────────────────────────────────────────────

export function adoptChild(state) {
  if (state.age < 25 || state.age > 55) return state
  const adoptionCost = randomBetween(8000, 35000)
  if ((state.money ?? 0) < adoptionCost) {
    return { ...state, log: [...state.log, { age: state.age, text: `The adoption process requires funds you don't currently have.`, isKey: false }] }
  }
  const cGender = chance(0.5) ? 'male' : 'female'
  const c = state.character.country
  const childName = `${pickFrom(cGender === 'male' ? c.namePool.male : c.namePool.female)} ${state.character.surname}`
  const childAge = randomBetween(0, 8)
  const child = { name: childName, gender: cGender, ageAtBirth: state.age - childAge, relationshipQuality: 75, adopted: true }
  return {
    ...state,
    money: (state.money ?? 0) - adoptionCost,
    children: [...state.children, child],
    flags: [...new Set([...state.flags, 'parent', 'adoptive_parent'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 12, 0, 100) },
    log: [...state.log, { age: state.age, text: `You adopt ${childName}. Adoption costs: $${adoptionCost.toLocaleString()}.`, isKey: true }],
  }
}

// ─── Study harder ─────────────────────────────────────────────────────────────

export function studyHarder(state) {
  const gpaGain = parseFloat((Math.random() * 0.2 + 0.05).toFixed(2))
  const newGpa = Math.min(4.0, parseFloat(((state.gpa ?? 2.0) + gpaGain).toFixed(2)))
  return {
    ...state,
    gpa: newGpa,
    stats: { ...state.stats, smarts: clamp(state.stats.smarts + 3, 0, 100), happiness: clamp(state.stats.happiness - 3, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `You put in extra study hours. GPA: ${newGpa.toFixed(2)}.`, isKey: false }],
  }
}

// ─── Movie theater ────────────────────────────────────────────────────────────

export function goToMovies(state) {
  const cost = randomBetween(15, 25)
  const genres = ['action blockbuster', 'indie drama', 'horror film', 'romantic comedy', 'documentary']
  const genre = pickFrom(genres)
  return {
    ...state,
    money: Math.max(0, (state.money ?? 0) - cost),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 5, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `You catch a ${genre} at the cinema. $${cost} well spent.`, isKey: false }],
  }
}

// ─── Nightlife ────────────────────────────────────────────────────────────────

export function goClubbing(state) {
  if (state.age < 18) return { ...state, log: [...state.log, { age: state.age, text: "You're not old enough to go clubbing.", isKey: false }] }
  const cost = randomBetween(50, 120)
  const newFlags = [...state.flags]
  if (!newFlags.includes('heavy_drinker') && chance(0.15)) newFlags.push('heavy_drinker')
  if (newFlags.includes('heavy_drinker') && !newFlags.includes('alcohol_addiction') && chance(0.08)) newFlags.push('alcohol_addiction')
  const met = !state.partner && chance(0.2)
  let next = {
    ...state,
    money: Math.max(0, (state.money ?? 0) - cost),
    flags: [...new Set(newFlags)],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 8, 0, 100), health: clamp(state.stats.health - 2, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `You spend the night out clubbing. Cost: $${cost}.${met ? ' You meet someone interesting.' : ''}`, isKey: false }],
  }
  if (met) next = meetPotentialPartner({ ...next, actionsThisYear: next.actionsThisYear - 1 })
  return next
}

// ─── Shopping ────────────────────────────────────────────────────────────────

export function goShopping(state, category) {
  const opts = {
    clothes:     { cost: 200,  happiness: 5, looks: 2, text: 'You pick up some new clothes.' },
    electronics: { cost: 800,  happiness: 7, looks: 0, text: 'You treat yourself to new electronics.' },
    luxury:      { cost: 3000, happiness: 10, looks: 3, text: 'A luxury purchase. Worth every penny.' },
  }
  const opt = opts[category] ?? opts.clothes
  if ((state.money ?? 0) < opt.cost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford that right now.", isKey: false }] }
  }
  return {
    ...state,
    money: (state.money ?? 0) - opt.cost,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + opt.happiness, 0, 100), looks: clamp(state.stats.looks + opt.looks, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `${opt.text} $${opt.cost.toLocaleString()} spent.`, isKey: false }],
  }
}

// ─── Salon & Spa ──────────────────────────────────────────────────────────────

export function visitSalonSpa(state, service) {
  const services = {
    haircut:   { cost: 60,  happiness: 5, looks: 1, health: 0, text: 'A fresh haircut lifts your spirits.' },
    hairdye:   { cost: 120, happiness: 6, looks: 2, health: 0, text: 'You color your hair. A new look.' },
    massage:   { cost: 150, happiness: 9, looks: 0, health: 3, text: 'A full-body massage melts the tension away.' },
    facial:    { cost: 100, happiness: 5, looks: 3, health: 0, text: 'A rejuvenating facial treatment.' },
    manicure:  { cost: 50,  happiness: 4, looks: 1, health: 0, text: 'Small luxury, noticeable effect.' },
  }
  const svc = services[service]
  if (!svc) return state
  if ((state.money ?? 0) < svc.cost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford that service right now.", isKey: false }] }
  }
  return {
    ...state,
    money: (state.money ?? 0) - svc.cost,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + svc.happiness, 0, 100), looks: clamp(state.stats.looks + svc.looks, 0, 100), health: clamp(state.stats.health + svc.health, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: svc.text, isKey: false }],
  }
}

// ─── Social media ─────────────────────────────────────────────────────────────

export function postSocialMedia(state) {
  const sm = state.socialMedia ?? { followers: 0, verified: false, genre: null }
  const famous = (state.fame ?? 0) > 20
  // Genre-based multipliers — niche audiences grow faster, mass-appeal grows big
  const genreBonus = {
    comedy: 1.3, gaming: 1.2, fitness: 1.1, lifestyle: 1.15,
    beauty: 1.1, music: 1.2, food: 1.1, politics: 0.85,
  }
  const mult = sm.genre ? (genreBonus[sm.genre] ?? 1.0) : 0.7
  const baseMin = famous ? 200 : sm.genre ? -50 : -100
  const baseMax = famous ? 5000 : sm.genre ? 400 : 300
  const charismaMult = 1 + (state.stats.charisma - 50) / 200
  const followerDelta = Math.round(randomBetween(baseMin, baseMax) * mult * charismaMult)
  const newFollowers = Math.max(0, sm.followers + followerDelta)
  const nowVerified = sm.verified || (newFollowers >= 100000 && (state.fame ?? 0) >= 25)
  const genreLabel = sm.genre ? ` (${sm.genre})` : ''
  return {
    ...state,
    socialMedia: { ...sm, followers: newFollowers, verified: nowVerified },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, {
      age: state.age,
      text: followerDelta > 0
        ? `Your${genreLabel} post gets traction. Followers: ${newFollowers.toLocaleString()}.${nowVerified && !sm.verified ? ' You\'re now verified!' : ''}`
        : sm.genre
          ? `Your${genreLabel} post underperforms. Followers: ${newFollowers.toLocaleString()}.`
          : `Your post flops — try picking a niche. Followers: ${newFollowers.toLocaleString()}.`,
      isKey: nowVerified && !sm.verified,
    }],
  }
}

export function promoteSocialMedia(state) {
  const sm = state.socialMedia ?? { followers: 0, verified: false, genre: null }
  if (sm.followers < 5000) {
    return { ...state, log: [...state.log, { age: state.age, text: "You need more followers before brands will work with you.", isKey: false }] }
  }
  const income = Math.round(sm.followers * randomBetween(1, 5) / 100)
  const followerRisk = chance(0.3) ? -randomBetween(100, 2000) : randomBetween(0, 500)
  const newFollowers = Math.max(0, sm.followers + followerRisk)
  return {
    ...state,
    money: (state.money ?? 0) + income,
    socialMedia: { ...sm, followers: newFollowers },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, {
      age: state.age,
      text: followerRisk < 0
        ? `The sponsored post alienates some followers. You earn $${income.toLocaleString()} but lose ${Math.abs(followerRisk).toLocaleString()} followers.`
        : `The sponsored post lands well. You earn $${income.toLocaleString()}.`,
      isKey: income > 10000,
    }],
  }
}

// ─── Race tracks ─────────────────────────────────────────────────────────────

const HORSE_NAMES = [
  'Thunderhooves', 'Lucky Lightning', 'Desert Rose', 'Iron Maiden', 'Golden Gallop',
  'Dark Tempest', 'Silver Bullet', 'Morning Star', 'Storm Chaser', 'Wild Card',
  'Blazing Saddle', 'Night Fury', 'Crimson Dawn', 'Dusty Trail', 'Velvet Thunder',
]

export function betOnHorses(state, horseIdx, betAmount) {
  const bet = Math.max(1, Math.round(betAmount))
  if ((state.money ?? 0) < bet) {
    return { ...state, log: [...state.log, { age: state.age, text: "You don't have enough to place that bet.", isKey: false }] }
  }
  const raceHorses = Array.from({ length: 5 }, () => pickFrom(HORSE_NAMES))
  const winner = randomBetween(0, 4)
  const won = winner === horseIdx
  const payout = won ? bet * 5 : 0
  const net = payout - bet
  const newFlags = [...state.flags]
  if (!newFlags.includes('gambler')) newFlags.push('gambler')
  if (newFlags.includes('gambler') && !newFlags.includes('gambling_addiction') && chance(0.06)) newFlags.push('gambling_addiction')
  return {
    ...state,
    money: (state.money ?? 0) + net,
    flags: [...new Set(newFlags)],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + (won ? 15 : -4), 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    mem: { ...state.mem, lastRaceHorses: raceHorses, lastRaceWinner: winner },
    log: [...state.log, {
      age: state.age,
      text: won
        ? `${raceHorses[horseIdx]} wins! You pocket $${payout.toLocaleString()} on a $${bet.toLocaleString()} bet.`
        : `${raceHorses[horseIdx]} doesn't place. ${raceHorses[winner]} takes it. You lose $${bet.toLocaleString()}.`,
      isKey: won && bet > 1000,
    }],
  }
}

// ─── Rehab ────────────────────────────────────────────────────────────────────

export function goToRehab(state) {
  const addictions = ['alcohol_addiction', 'gambling_addiction', 'drug_addiction'].filter(f => state.flags.includes(f))
  if (addictions.length === 0) {
    return { ...state, log: [...state.log, { age: state.age, text: "You don't have any active addictions to treat.", isKey: false }] }
  }
  const cost = randomBetween(5000, 25000)
  if ((state.money ?? 0) < cost) {
    return { ...state, log: [...state.log, { age: state.age, text: `Rehab would cost about $${cost.toLocaleString()}. You can't afford it right now.`, isKey: false }] }
  }
  const newFlags = state.flags.filter(f => !addictions.includes(f))
  return {
    ...state,
    money: (state.money ?? 0) - cost,
    flags: [...new Set([...newFlags, 'rehab_graduate', 'in_recovery'])],
    mem: { ...(state.mem ?? {}), recoveryStartYear: state.currentYear },
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 12, 0, 100), health: clamp(state.stats.health + 8, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `You complete a stint in rehab. Cost: $${cost.toLocaleString()}. You feel genuinely renewed.`, isKey: true }],
  }
}

// ─── Birth control ────────────────────────────────────────────────────────────

export function toggleBirthControl(state) {
  const current = state.birthControl ?? false
  return {
    ...state,
    birthControl: !current,
    log: [...state.log, { age: state.age, text: !current ? 'You start using birth control.' : 'You stop using birth control.', isKey: false }],
  }
}

export function useSubstance(state, substance) {
  const opts = {
    alcohol:  { cost: 30,  hDelta: -3, mDelta: 8,  addFlag: 'heavy_drinker',    addictionFlag: 'alcohol_addiction', addictChance: 0.08 },
    cannabis: { cost: 40,  hDelta: -2, mDelta: 7,  addFlag: 'drug_user',        addictionFlag: 'drug_addiction',    addictChance: 0.06 },
    cocaine:  { cost: 200, hDelta: -5, mDelta: 12, addFlag: 'substance_abuser', addictionFlag: 'drug_addiction',    addictChance: 0.18 },
    heroin:   { cost: 150, hDelta: -8, mDelta: 10, addFlag: 'substance_abuser', addictionFlag: 'drug_addiction',    addictChance: 0.30 },
    pills:    { cost: 60,  hDelta: -4, mDelta: 9,  addFlag: 'drug_user',        addictionFlag: 'drug_addiction',    addictChance: 0.12 },
  }
  const opt = opts[substance]
  if (!opt) return state
  if ((state.money ?? 0) < opt.cost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford that right now.", isKey: false }] }
  }
  const newFlags = [...state.flags]
  if (!newFlags.includes(opt.addFlag)) newFlags.push(opt.addFlag)
  if (!newFlags.includes(opt.addictionFlag) && chance(opt.addictChance + (newFlags.includes(opt.addFlag) ? 0.05 : 0))) {
    newFlags.push(opt.addictionFlag)
  }
  // Track use count for addiction stage display
  const substKey = ['alcohol'].includes(substance) ? 'alcoholUses' : 'drugUses'
  const newUses = (state.mem?.[substKey] ?? 0) + 1
  const newMem = { ...state.mem, [substKey]: newUses }
  // Overdose risk for hard drugs
  const overdoseRisk = { heroin: 0.06, cocaine: 0.03, pills: 0.02 }[substance] ?? 0
  if (chance(overdoseRisk)) {
    return {
      ...state,
      money: Math.max(0, (state.money ?? 0) - opt.cost),
      flags: [...new Set([...newFlags, 'overdosed'])],
      mem: newMem,
      stats: { ...state.stats, health: clamp(state.stats.health - 25, 0, 100), happiness: clamp(state.stats.happiness - 10, 0, 100) },
      actionsThisYear: state.actionsThisYear + 1,
      log: [...state.log, { age: state.age, text: `You overdose on ${substance}. Someone finds you in time. Barely.`, isKey: true }],
    }
  }
  return {
    ...state,
    money: Math.max(0, (state.money ?? 0) - opt.cost),
    flags: [...new Set(newFlags)],
    mem: newMem,
    stats: { ...state.stats, health: clamp(state.stats.health + opt.hDelta, 0, 100), happiness: clamp(state.stats.happiness + opt.mDelta, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `You use ${substance}. The effect is immediate.`, isKey: false }],
  }
}

// ─── Martial arts ─────────────────────────────────────────────────────────────

const BELT_NAMES = ['white', 'yellow', 'orange', 'green', 'blue', 'purple', 'red', 'brown', 'black']

export function practiceMartalArts(state, discipline) {
  const ma = state.martialArts ?? { discipline: null, belt: 0 }
  const active = discipline ?? ma.discipline
  if (!active) return state
  const belt = ma.belt ?? 0
  const progressChance = clamp(0.25 + state.stats.health * 0.003, 0.1, 0.65)
  if (belt < BELT_NAMES.length - 1 && chance(progressChance)) {
    const newBelt = belt + 1
    return {
      ...state,
      martialArts: { discipline: active, belt: newBelt },
      stats: { ...state.stats, health: clamp(state.stats.health + 4, 0, 100), happiness: clamp(state.stats.happiness + 3, 0, 100) },
      flags: [...new Set([...state.flags, 'martial_arts'])],
      actionsThisYear: state.actionsThisYear + 1,
      log: [...state.log, { age: state.age, text: `You earn your ${BELT_NAMES[newBelt]} belt in ${active}!`, isKey: newBelt === 8 }],
    }
  }
  return {
    ...state,
    martialArts: { discipline: active, belt },
    stats: { ...state.stats, health: clamp(state.stats.health + 2, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `You train ${active}. Slow and steady progress.`, isKey: false }],
  }
}

// ─── Licenses ─────────────────────────────────────────────────────────────────

export function obtainLicense(state, licType) {
  const defs = {
    driver:  { cost: 500,  flag: 'has_licence',     minAge: 16, text: "You pass your driving test. Driver's licence obtained." },
    pilot:   { cost: 8000, flag: 'pilot_licence',   minAge: 18, text: "After extensive training, you earn your pilot's licence." },
    boating: { cost: 600,  flag: 'boating_licence', minAge: 16, text: "You pass your boating safety course. Boating licence obtained." },
  }
  const lic = defs[licType]
  if (!lic) return state
  if (state.age < lic.minAge) return { ...state, log: [...state.log, { age: state.age, text: "You're not old enough for that licence yet.", isKey: false }] }
  if (state.flags.includes(lic.flag)) return { ...state, log: [...state.log, { age: state.age, text: "You already have that licence.", isKey: false }] }
  if ((state.money ?? 0) < lic.cost) return { ...state, log: [...state.log, { age: state.age, text: "You can't afford the licence fees right now.", isKey: false }] }
  return {
    ...state,
    money: (state.money ?? 0) - lic.cost,
    flags: [...new Set([...state.flags, lic.flag])],
    licenceObtained: licType === 'driver' ? true : (state.licenceObtained ?? false),
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: lic.text, isKey: true }],
  }
}

// ─── Friend interactions ──────────────────────────────────────────────────────

export function interactWithFriend(state, friendIdx, action) {
  const friends = state.friends ?? []
  const friend = friends[friendIdx]
  if (!friend?.alive) return state
  const acts = {
    hangout:   { rqDelta: 8,  happiness: 6, cost: 30,  text: `You hang out with ${friend.name}. A good time.` },
    compliment:{ rqDelta: 6,  happiness: 3, cost: 0,   text: `You say something kind to ${friend.name}.` },
    gift:      { rqDelta: 12, happiness: 4, cost: 100, text: `You give ${friend.name} a thoughtful gift.` },
    prank: {
      rqDelta: chance(0.5) ? 5 : -10,
      happiness: 4,
      cost: 0,
      text: chance(0.5) ? `You prank ${friend.name}. They laugh it off.` : `You prank ${friend.name}. They don't find it funny.`,
    },
  }
  const act = acts[action]
  if (!act) return state
  if ((state.money ?? 0) < act.cost) return { ...state, log: [...state.log, { age: state.age, text: "You can't afford to do that right now.", isKey: false }] }
  const updatedFriends = friends.map((f, i) => i === friendIdx ? { ...f, relationshipQuality: clamp(f.relationshipQuality + act.rqDelta, 0, 100) } : f)
  return {
    ...state,
    friends: updatedFriends,
    money: Math.max(0, (state.money ?? 0) - act.cost),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + act.happiness, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: act.text, isKey: false }],
  }
}

// ─── Drop out of school ───────────────────────────────────────────────────────

export function dropOutOfSchool(state) {
  if (!state.education?.enrolled) return state
  const { type, field, year } = state.education.enrolled
  return {
    ...state,
    education: { ...state.education, enrolled: null },
    flags: [...new Set([...state.flags, 'dropped_out'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness - 8, 0, 100) },
    log: [...state.log, { age: state.age, text: `You drop out of ${type === 'university' ? 'university' : 'trade school'} after year ${year + 1}.`, isKey: true }],
  }
}

// ─── Travel / Vacation ────────────────────────────────────────────────────────

export function bookTrip(state, destinationId) {
  const dest = DESTINATIONS.find(d => d.id === destinationId)
  if (!dest) return state
  if (state.age < dest.minAge) return { ...state, log: [...state.log, { age: state.age, text: `You're too young for ${dest.name}.`, isKey: false }] }
  if (dest.minYear && state.currentYear < dest.minYear) return { ...state, log: [...state.log, { age: state.age, text: `${dest.name} isn't available yet.`, isKey: false }] }
  if (dest.requiresLicence && !state.licenceObtained) return { ...state, log: [...state.log, { age: state.age, text: "You need a driver's licence for a road trip.", isKey: false }] }

  // Scale cost by GDP
  const gdpCostMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
  const costMult = gdpCostMult[state.character?.country?.gdp] ?? 1.0
  const cost = Math.round(dest.cost * costMult)

  if ((state.money ?? 0) < cost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford ${dest.name} right now ($${cost.toLocaleString()}).`, isKey: false }] }
  }

  const travels = [...(state.travels ?? []), { id: dest.id, name: dest.name, age: state.age, year: state.currentYear, type: dest.type }]
  const newFlags = [...state.flags]
  if (travels.length >= 5 && !newFlags.includes('well_traveled')) newFlags.push('well_traveled')
  if (travels.length >= 10 && !newFlags.includes('world_explorer')) newFlags.push('world_explorer')

  // Queue a random travel event
  const travelEventPool = [
    { id: `travel_food_poison_${state.age}`, phase: getPhase(state.age), weight: 5, text: `You get food poisoning in ${dest.name}. Two days in bed. Still worth it.`, effect: (p) => { p.m -= 10; p.h -= 5 }, choices: null },
    { id: `travel_pickpocket_${state.age}`, phase: getPhase(state.age), weight: 4, text: `Someone picks your pocket in a crowded market. You lose some cash but not your passport.`, effect: (p) => { p.mo -= Math.round(cost * 0.1); p.h -= 5 }, choices: null },
    { id: `travel_beautiful_${state.age}`, phase: getPhase(state.age), weight: 8, text: `${dest.name} is more beautiful than the photos. You watch the sunset from a hillside and feel genuinely alive.`, effect: (p) => { p.h += 15; p.e += 3 }, choices: null },
    { id: `travel_culture_${state.age}`, phase: getPhase(state.age), weight: 7, text: `You spend a morning in a local market in ${dest.name}, eating things you can't name and watching how people live. Something shifts in how you see the world.`, effect: (p) => { p.h += 10; p.e += 8 }, choices: null },
    { id: `travel_romance_${state.age}`, phase: getPhase(state.age), weight: 3, text: `You meet someone interesting on the trip. It doesn't last past the airport, but while it lasted it was perfect.`, effect: (p) => { p.h += 20; p.s += 3 }, choices: null, when: (G) => !G.partner },
    { id: `travel_delay_${state.age}`, phase: getPhase(state.age), weight: 4, text: `Your flight home is delayed by 18 hours. The airport floor. The single power outlet. The long conversations with strangers.`, effect: (p) => { p.h -= 3; p.e += 5 }, choices: null },
    { id: `travel_adventure_${state.age}`, phase: getPhase(state.age), weight: 6, text: `You do something you've never done before — a hike, a dive, a climb. Your body reminds you what it's for.`, effect: (p) => { p.h += 12; p.m += 5 }, choices: null, when: (G) => dest.type === 'adventure' },
    { id: `travel_homesick_${state.age}`, phase: getPhase(state.age), weight: 3, text: `Two weeks in, you miss home. Not the place, exactly — the feeling. You book an earlier flight.`, effect: (p) => { p.h -= 5; p.e += 3 }, choices: null },
  ]

  // Pick a random event from pool (filter by when if applicable)
  const G = buildG(state)
  const eligible = travelEventPool.filter(e => !e.when || e.when(G))
  const travelEvent = eligible[Math.floor(Math.random() * eligible.length)]

  return {
    ...state,
    money: (state.money ?? 0) - cost,
    travels,
    flags: newFlags,
    actionsThisYear: state.actionsThisYear + 1,
    queue: [...state.queue, travelEvent],
    log: [...state.log, { age: state.age, text: `You take a trip to ${dest.name}. Cost: $${cost.toLocaleString()}.`, isKey: true }],
  }
}

// ─── Business ownership ───────────────────────────────────────────────────────

const BUSINESS_TYPES = [
  { id: 'corner_shop',    name: 'Corner Shop',       emoji: '🏪', startupCost: 5000,   baseRevenue: [8000, 18000],   minAge: 21, description: 'A small retail shop. Low risk, steady income.' },
  { id: 'restaurant',     name: 'Restaurant',        emoji: '🍽️', startupCost: 30000,  baseRevenue: [25000, 80000],  minAge: 21, description: 'Food service. High overhead, high reward.' },
  { id: 'consulting',     name: 'Consulting Firm',   emoji: '💼', startupCost: 2000,   baseRevenue: [15000, 60000],  minAge: 25, description: 'Sell your expertise. Needs smarts 60+.' , minSmarts: 60 },
  { id: 'bar',            name: 'Bar / Nightclub',   emoji: '🍸', startupCost: 20000,  baseRevenue: [20000, 70000],  minAge: 21, description: 'Entertainment venue. Volatile income.' },
  { id: 'tech_startup',   name: 'Tech Startup',      emoji: '💻', startupCost: 50000,  baseRevenue: [0, 200000],     minAge: 21, description: 'High risk, high reward. Needs smarts 70+.', minSmarts: 70, minYear: 1995 },
  { id: 'online_shop',    name: 'Online Shop',       emoji: '📦', startupCost: 1000,   baseRevenue: [5000, 40000],   minAge: 18, description: 'E-commerce. Low overhead.', minYear: 2005 },
  { id: 'gym',            name: 'Gym / Fitness',     emoji: '🏋️', startupCost: 40000,  baseRevenue: [30000, 90000],  minAge: 21, description: 'Health & fitness. Growing market.' },
]
export { BUSINESS_TYPES }

export function getAvailableBusinessTypes(state) {
  return BUSINESS_TYPES.filter(bt => {
    if (state.age < bt.minAge) return false
    if (bt.minSmarts && state.stats.smarts < bt.minSmarts) return false
    if (bt.minYear && state.currentYear < bt.minYear) return false
    return true
  })
}

export function startBusiness(state, typeId) {
  if (state.business?.active) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You already run a business.', isKey: false }] }
  }
  const bt = BUSINESS_TYPES.find(b => b.id === typeId)
  if (!bt) return state

  // Scale startup cost to country GDP
  const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
  const mult = gdpMult[state.character?.country?.gdp] ?? 1.0
  const cost = Math.round(bt.startupCost * mult)

  if ((state.money ?? 0) < cost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You need $${cost.toLocaleString()} to start a ${bt.name}.`, isKey: false }] }
  }

  const business = {
    id: bt.id, name: bt.name, emoji: bt.emoji,
    active: true, yearsOpen: 0,
    performance: 50, // 0-100
    employees: 0, value: cost,
    revenue: 0, expenses: 0,
  }

  return {
    ...state,
    money: (state.money ?? 0) - cost,
    business,
    actionsThisYear: state.actionsThisYear + 1,
    flags: [...new Set([...state.flags, 'entrepreneur'])],
    log: [...state.log, { age: state.age, text: `You open a ${bt.name}. Startup cost: $${cost.toLocaleString()}.`, isKey: true }],
  }
}

export function manageBusiness(state) {
  if (!state.business?.active) return state
  const perf = clamp((state.business.performance ?? 50) + randomBetween(5, 15), 0, 100)
  const business = { ...state.business, performance: perf }
  return {
    ...state,
    business,
    actionsThisYear: state.actionsThisYear + 1,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness - 3, 0, 100) },
    log: [...state.log, { age: state.age, text: `You put in extra hours managing the ${business.name}. Performance improves.`, isKey: false }],
  }
}

export function hireEmployee(state) {
  if (!state.business?.active) return state
  const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
  const mult = gdpMult[state.character?.country?.gdp] ?? 1.0
  const hiringCost = Math.round(2000 * mult)
  if ((state.money ?? 0) < hiringCost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford to hire right now.", isKey: false }] }
  }
  const business = { ...state.business, employees: (state.business.employees ?? 0) + 1, performance: clamp((state.business.performance ?? 50) + 8, 0, 100) }
  return {
    ...state,
    money: (state.money ?? 0) - hiringCost,
    business,
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `You hire a new employee for the ${business.name}. Staff: ${business.employees}.`, isKey: false }],
  }
}

export function closeBusiness(state) {
  if (!state.business?.active) return state
  const salvage = Math.round(state.business.value * (state.business.performance >= 60 ? 0.5 : 0.2))
  return {
    ...state,
    money: (state.money ?? 0) + salvage,
    business: { ...state.business, active: false },
    log: [...state.log, { age: state.age, text: `You close the ${state.business.name}. Salvage value: $${salvage.toLocaleString()}.`, isKey: true }],
  }
}

// ─── Fugitive system ─────────────────────────────────────────────────────────

export function breakOut(state) {
  // Called after a successful prison escape minigame
  return {
    ...state,
    inPrison: false,
    wanted: true,
    wantedFor: state.wantedFor ?? 'escaped_conviction',
    flags: [...new Set([...state.flags, 'escaped_prisoner'])],
    log: [...state.log, { age: state.age, text: 'You slip through the gaps and escape from prison. You are now a fugitive.', isKey: true }]
  }
}

export function assumeIdentity(state) {
  const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
  const mult = gdpMult[state.character?.country?.gdp] ?? 1.0
  const cost = Math.round(8000 * mult)
  if ((state.money ?? 0) < cost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You need $${cost.toLocaleString()} for forged documents.`, isKey: false }] }
  }
  if (state.flags.includes('assumed_identity')) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You are already living under an assumed identity.', isKey: false }] }
  }
  const c = state.character?.country
  const g = state.character?.gender
  const namePool = g === 'male' ? c?.namePool?.male : c?.namePool?.female
  const fakeName = (pickFrom(namePool ?? ['Alex', 'Sam', 'Jordan'])) + ' ' + (pickFrom(c?.surnames ?? ['Smith', 'Jones']))
  return {
    ...state,
    money: (state.money ?? 0) - cost,
    assumedIdentity: { name: fakeName, adoptedAt: state.age },
    flags: [...new Set([...state.flags, 'assumed_identity'])],
    log: [...state.log, { age: state.age, text: `For $${cost.toLocaleString()} you obtain forged documents and become ${fakeName}. Your old identity is buried.`, isKey: true }]
  }
}

export function goIllegal(state, destCountryName) {
  const dest = COUNTRIES.find(c => c.name === destCountryName)
  if (!dest) return state
  const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
  const mult = gdpMult[state.character?.country?.gdp] ?? 1.0
  const fee = Math.round(randomBetween(8000, 20000) * mult)
  if ((state.money ?? 0) < fee) {
    return { ...state, log: [...state.log, { age: state.age, text: `The smuggler wants $${fee.toLocaleString()}. You can't afford it.`, isKey: false }] }
  }
  if (chance(0.30)) {
    const added = 2
    return {
      ...state,
      money: (state.money ?? 0) - fee,
      inPrison: true,
      prisonSentence: (state.prisonSentence ?? 0) + added,
      wanted: false,
      log: [...state.log, { age: state.age, text: `You pay $${fee.toLocaleString()} but border guards intercept you. Deported and sentenced to ${added} additional years.`, isKey: true }]
    }
  }
  return {
    ...state,
    money: (state.money ?? 0) - fee,
    character: { ...state.character, country: dest },
    flags: [...new Set([...state.flags, 'emigrated', 'illegal_immigrant'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 5, 0, 100) },
    log: [...state.log, { age: state.age, text: `You pay a smuggler $${fee.toLocaleString()} and slip across the border into ${destCountryName}. A dangerous new chapter begins.`, isKey: true }]
  }
}

// ─── Prison activities ────────────────────────────────────────────────────────

export function prisonWork(state) {
  if (!state.inPrison) return state
  const earned = randomBetween(50, 200)
  let healthDelta = -2
  let logText = `You put in hours in the prison laundry/kitchen. $${earned} earned.`
  const injured = chance(0.05)
  if (injured) {
    healthDelta -= 10
    logText = `You put in hours in the prison laundry/kitchen. $${earned} earned. A work accident leaves you bruised and aching.`
  }
  return {
    ...state,
    money: (state.money ?? 0) + earned,
    stats: {
      ...state.stats,
      health: clamp((state.stats.health ?? 50) + healthDelta, 0, 100),
      happiness: clamp((state.stats.happiness ?? 50) - 3, 0, 100),
    },
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: logText, isKey: false }],
  }
}

export function prisonCry(state) {
  if (!state.inPrison) return state
  const comforted = chance(0.30)
  const happinessDelta = comforted ? 8 + 3 : 8
  const regretDelta = -3
  const logText = comforted
    ? 'You break down in your cell. Another inmate sits beside you in silence until you steady yourself — a small, unexpected kindness.'
    : 'You allow yourself to fall apart for a while. The tears come, and then they stop. You feel hollow but lighter.'
  return {
    ...state,
    stats: {
      ...state.stats,
      happiness: clamp((state.stats.happiness ?? 50) + happinessDelta, 0, 100),
    },
    regret: clamp((state.regret ?? 50) + regretDelta, 0, 100),
    log: [...state.log, { age: state.age, text: logText, isKey: false }],
  }
}

export function prisonConjugalVisit(state) {
  if (!state.inPrison || !state.partner) return state
  if (!state.partner.alive || (state.partner.relationshipQuality ?? 50) <= 30) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'A conjugal visit isn\'t possible right now.', isKey: false }],
    }
  }
  const noShow = chance(0.10)
  if (noShow) {
    return {
      ...state,
      stats: {
        ...state.stats,
        happiness: clamp((state.stats.happiness ?? 50) - 8, 0, 100),
      },
      regret: clamp((state.regret ?? 50) + 5, 0, 100),
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      log: [...state.log, { age: state.age, text: `${state.partner.name} never shows. You wait in the visitation room until the guard walks you back.`, isKey: false }],
    }
  }
  return {
    ...state,
    stats: {
      ...state.stats,
      happiness: clamp((state.stats.happiness ?? 50) + 15, 0, 100),
    },
    partner: {
      ...state.partner,
      relationshipQuality: clamp((state.partner.relationshipQuality ?? 50) + 10, 0, 100),
    },
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: `${state.partner.name} visits. For a brief hour the walls don't feel so permanent.`, isKey: false }],
  }
}

export function prisonBribeGuard(state) {
  if (!state.inPrison) return state
  const bribe = randomBetween(500, 3000)
  if ((state.money ?? 0) < bribe) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: `You don't have enough money to bribe a guard right now.`, isKey: false }],
    }
  }
  const roll = Math.random()
  let newSentence = state.prisonSentence ?? 0
  let happinessDelta = 0
  let regretDelta = 0
  let logText
  if (roll < 0.50) {
    newSentence = Math.max(0, newSentence - 1)
    happinessDelta = 10
    logText = `You slip a guard $${bribe.toLocaleString()}. Days later, paperwork goes missing and a year disappears from your sentence.`
  } else if (roll < 0.75) {
    logText = `You pay the guard $${bribe.toLocaleString()}. He pockets it and nothing changes. You've been had.`
  } else {
    newSentence = newSentence + 1
    regretDelta = 10
    logText = `The guard reports you. $${bribe.toLocaleString()} confiscated, an extra year added to your sentence.`
  }
  return {
    ...state,
    money: (state.money ?? 0) - bribe,
    prisonSentence: newSentence,
    stats: {
      ...state.stats,
      happiness: clamp((state.stats.happiness ?? 50) + happinessDelta, 0, 100),
    },
    regret: clamp((state.regret ?? 50) + regretDelta, 0, 100),
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: logText, isKey: false }],
  }
}

export function prisonStartRiot(state) {
  if (!state.inPrison) return state
  const success = chance(0.40)
  let newState
  if (success) {
    const sentenceReduced = chance(0.25)
    const newSentence = sentenceReduced
      ? Math.max(0, (state.prisonSentence ?? 0) - 1)
      : (state.prisonSentence ?? 0)
    const logText = sentenceReduced
      ? 'The riot you sparked descends into chaos. Guards retreat, paperwork burns — somehow a year gets wiped from your record in the confusion.'
      : 'You ignite the ward. For a few violent hours the inmates run the block. The rush is like nothing else.'
    newState = {
      ...state,
      prisonSentence: newSentence,
      stats: {
        ...state.stats,
        happiness: clamp((state.stats.happiness ?? 50) + 20, 0, 100),
      },
      karma: clamp((state.karma ?? 50) - 5, 0, 100),
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      flags: [...new Set([...state.flags, 'riot_instigator'])],
      log: [...state.log, { age: state.age, text: logText, isKey: true }],
    }
  } else {
    const extraYears = randomBetween(1, 2)
    newState = {
      ...state,
      prisonSentence: (state.prisonSentence ?? 0) + extraYears,
      stats: {
        ...state.stats,
        health: clamp((state.stats.health ?? 50) - 15, 0, 100),
        happiness: clamp((state.stats.happiness ?? 50) - 10, 0, 100),
        discipline: clamp((state.stats.discipline ?? 50) - 5, 0, 100),
      },
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      flags: [...new Set([...state.flags, 'riot_instigator'])],
      log: [...state.log, { age: state.age, text: `The riot collapses almost immediately. You take a beating and earn ${extraYears} more year${extraYears > 1 ? 's' : ''} on your sentence.`, isKey: true }],
    }
  }
  return newState
}

// ─── Stocks / Investment system ───────────────────────────────────────────────

const STOCKS = [
  { symbol: 'TECH', name: 'TechCorp',     sector: 'tech',    basePrice: 150, volatility: 0.15, minYear: 1990 },
  { symbol: 'BANK', name: 'GlobalBank',   sector: 'finance', basePrice: 80,  volatility: 0.10 },
  { symbol: 'HLTH', name: 'HealthPlus',   sector: 'health',  basePrice: 60,  volatility: 0.12 },
  { symbol: 'ENRG', name: 'EnergyFirst',  sector: 'energy',  basePrice: 45,  volatility: 0.18 },
  { symbol: 'RETL', name: 'RetailMax',    sector: 'retail',  basePrice: 30,  volatility: 0.20 },
  { symbol: 'REIT', name: 'PropertyFund', sector: 'realty',  basePrice: 100, volatility: 0.08 },
  { symbol: 'CRPT', name: 'CryptoCoin',   sector: 'crypto',  basePrice: 200, volatility: 0.50, minYear: 2010 },
]

export function getAvailableStocks(state) {
  const currentYear = state.currentYear ?? 2000
  const portfolio = state.stockPortfolio ?? []
  return STOCKS
    .filter(s => !s.minYear || currentYear >= s.minYear)
    .map(s => {
      const owned = portfolio.find(p => p.symbol === s.symbol)
      return owned
        ? { ...s, currentPrice: owned.currentPrice, sharesOwned: owned.shares }
        : { ...s, currentPrice: s.basePrice, sharesOwned: 0 }
    })
}

export function buyStock(state, symbol, shares) {
  const stockDef = STOCKS.find(s => s.symbol === symbol)
  if (!stockDef) {
    return { ...state, log: [...state.log, { age: state.age, text: `Unknown stock symbol: ${symbol}.`, isKey: false }] }
  }
  if (!shares || shares <= 0) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You must buy at least one share.', isKey: false }] }
  }
  const portfolio = state.stockPortfolio ?? []
  const existing = portfolio.find(p => p.symbol === symbol)
  const currentPrice = existing ? existing.currentPrice : stockDef.basePrice
  const cost = Math.round(shares * currentPrice)
  if ((state.money ?? 0) < cost) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: `You need $${cost.toLocaleString()} to buy ${shares} share${shares > 1 ? 's' : ''} of ${stockDef.name}. Not enough funds.`, isKey: false }],
    }
  }
  let updatedPortfolio
  if (existing) {
    const totalShares = existing.shares + shares
    const newAvg = ((existing.avgBuyPrice * existing.shares) + (currentPrice * shares)) / totalShares
    updatedPortfolio = portfolio.map(p =>
      p.symbol === symbol
        ? { ...p, shares: totalShares, avgBuyPrice: Math.round(newAvg * 100) / 100 }
        : p
    )
  } else {
    updatedPortfolio = [
      ...portfolio,
      { symbol, name: stockDef.name, shares, avgBuyPrice: currentPrice, currentPrice, sector: stockDef.sector },
    ]
  }
  return {
    ...state,
    money: (state.money ?? 0) - cost,
    stockPortfolio: updatedPortfolio,
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: `You buy ${shares} share${shares > 1 ? 's' : ''} of ${stockDef.name} at $${currentPrice.toLocaleString()} each. Total cost: $${cost.toLocaleString()}.`, isKey: false }],
  }
}

export function sellStock(state, symbol, shares) {
  const portfolio = state.stockPortfolio ?? []
  const existing = portfolio.find(p => p.symbol === symbol)
  if (!existing) {
    return { ...state, log: [...state.log, { age: state.age, text: `You don't own any shares of ${symbol}.`, isKey: false }] }
  }
  if (!shares || shares <= 0 || shares > existing.shares) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: `You only own ${existing.shares} share${existing.shares !== 1 ? 's' : ''} of ${existing.name}.`, isKey: false }],
    }
  }
  const salePrice = existing.currentPrice
  const grossProceeds = Math.round(shares * salePrice)
  const costBasis = Math.round(shares * existing.avgBuyPrice)
  const rawGain = grossProceeds - costBasis
  let taxPaid = 0
  let netProceeds = grossProceeds
  if (rawGain > 0) {
    taxPaid = Math.round(rawGain * 0.15)
    netProceeds = grossProceeds - taxPaid
  }
  const remainingShares = existing.shares - shares
  const updatedPortfolio = remainingShares > 0
    ? portfolio.map(p => p.symbol === symbol ? { ...p, shares: remainingShares } : p)
    : portfolio.filter(p => p.symbol !== symbol)
  let logText
  if (rawGain > 0) {
    logText = `You sell ${shares} share${shares > 1 ? 's' : ''} of ${existing.name} for $${grossProceeds.toLocaleString()}. Gain: $${rawGain.toLocaleString()} — capital gains tax of $${taxPaid.toLocaleString()} applied. Net: $${netProceeds.toLocaleString()}.`
  } else if (rawGain < 0) {
    logText = `You sell ${shares} share${shares > 1 ? 's' : ''} of ${existing.name} for $${grossProceeds.toLocaleString()}. Loss: $${Math.abs(rawGain).toLocaleString()}.`
  } else {
    logText = `You sell ${shares} share${shares > 1 ? 's' : ''} of ${existing.name} at break-even for $${grossProceeds.toLocaleString()}.`
  }
  return {
    ...state,
    money: (state.money ?? 0) + netProceeds,
    stockPortfolio: updatedPortfolio,
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: logText, isKey: false }],
  }
}

export function tickStocks(state) {
  const portfolio = state.stockPortfolio ?? []
  if (portfolio.length === 0) return state

  const DIVIDEND_SECTORS = new Set(['finance', 'realty', 'health'])

  const oldTotalValue = portfolio.reduce((sum, p) => sum + p.shares * p.currentPrice, 0)

  const marketCrash = Math.random() < 0.05
  const marketBoom = !marketCrash && Math.random() < 0.03

  let dividendTotal = 0
  const updatedPortfolio = portfolio.map(p => {
    const stockDef = STOCKS.find(s => s.symbol === p.symbol)
    const volatility = stockDef ? stockDef.volatility : 0.15
    const basePrice = stockDef ? stockDef.basePrice : p.currentPrice

    let newPrice = p.currentPrice * (1 + (Math.random() - 0.5) * 2 * volatility)

    if (marketCrash) {
      newPrice *= 1 - (0.30 + Math.random() * 0.20)
    } else if (marketBoom) {
      newPrice *= 1 + (0.20 + Math.random() * 0.20)
    }

    newPrice = clamp(newPrice, basePrice * 0.10, basePrice * 20)
    newPrice = Math.round(newPrice * 100) / 100

    if (DIVIDEND_SECTORS.has(p.sector)) {
      const dividend = Math.round(p.shares * newPrice * 0.02)
      dividendTotal += dividend
    }

    return { ...p, currentPrice: newPrice }
  })

  const newTotalValue = updatedPortfolio.reduce((sum, p) => sum + p.shares * p.currentPrice, 0)

  const newLogs = [...state.log]

  if (marketCrash) {
    newLogs.push({ age: state.age, text: 'A market crash hammers your portfolio. Stock prices drop sharply across the board.', isKey: true })
  } else if (marketBoom) {
    newLogs.push({ age: state.age, text: 'A market-wide surge lifts your portfolio. Everything is up.', isKey: false })
  } else if (oldTotalValue > 0) {
    const pctChange = (newTotalValue - oldTotalValue) / oldTotalValue
    if (Math.abs(pctChange) >= 0.20) {
      const direction = pctChange > 0 ? 'up' : 'down'
      const pctDisplay = Math.round(Math.abs(pctChange) * 100)
      newLogs.push({ age: state.age, text: `Your stock portfolio is ${direction} ${pctDisplay}% this year. Total value: $${Math.round(newTotalValue).toLocaleString()}.`, isKey: false })
    }
  }

  if (dividendTotal > 0) {
    newLogs.push({ age: state.age, text: `Dividend payments deposited: $${dividendTotal.toLocaleString()}.`, isKey: false })
  }

  return {
    ...state,
    money: (state.money ?? 0) + dividendTotal,
    stockPortfolio: updatedPortfolio,
    log: newLogs,
  }
}

// ─── Living identity card ─────────────────────────────────────────────────────
// 4 sentences in two pairs: exterior (place/era/situation) + interior (wound/desire).
// Displayed in the Stats tab, regenerated each year.
export function generateIdentityCard(state) {
  const F = new FlagSet(state.flags ?? [])
  const { age, partner, children, career, education, desire } = state
  const G = buildG(state)
  const country = G.currentCountry ?? state.character?.country
  const birthCountry = state.character?.country
  const phase = getPhase(age)

  const exterior = [] // 2 sentences: objective, observable
  const interior = [] // 2 sentences: subjective, formative

  // ── EXTERIOR 1: Age + place + occupation ─────────────────────────────────────
  const place = country?.name ?? 'somewhere'
  const occupationPhrase = (() => {
    if (state.inPrison) return null // handled in exterior 2
    if (career) return `working as a ${career.title}`
    if (state.retired) return 'retired'
    if (education?.enrolled) return 'studying'
    if (phase === 'early_childhood' || phase === 'childhood') return 'still a child'
    if (phase === 'adolescence') return 'a teenager'
    if (state.workStatus === 'informal') return 'working informally'
    return null
  })()
  exterior.push(
    occupationPhrase
      ? `You are ${age}, living in ${place}, ${occupationPhrase}.`
      : `You are ${age} and living in ${place}.`
  )

  // ── EXTERIOR 2: Current situation ────────────────────────────────────────────
  if (state.inPrison) {
    exterior.push('You are in prison.')
  } else if (state.wanted || F.has('escaped_prisoner')) {
    exterior.push('You are wanted. Every introduction carries risk.')
  } else if (G.residencyStatus === 'undocumented' || G.residencyStatus === 'refugee_status') {
    exterior.push('You are living without secure papers — present without permission.')
  } else if (F.has('climate_displaced')) {
    exterior.push('You have been displaced by the changing climate, still looking for where this life lands.')
  } else if (partner?.married) {
    const c = (children ?? []).length
    exterior.push(c > 0
      ? `You are married to ${partner.name} and have ${c === 1 ? 'a child' : `${c} children`}.`
      : `You are married to ${partner.name}.`)
  } else if (partner) {
    const c = (children ?? []).length
    exterior.push(c > 0
      ? `You are with ${partner.name} and have ${c === 1 ? 'a child' : `${c} children`}.`
      : `You are with ${partner.name}.`)
  } else if (F.has('widowed') || F.has('partner_died')) {
    const c = (children ?? []).length
    exterior.push(c > 0
      ? `You are widowed, raising ${c === 1 ? 'a child' : `${c} children`}.`
      : 'You are widowed.')
  } else if (F.has('divorced')) {
    exterior.push('You are divorced.')
  } else if ((children ?? []).length > 0) {
    exterior.push(`You are a single parent with ${children.length === 1 ? 'one child' : `${children.length} children`}.`)
  } else if (F.has('emigrated') && birthCountry && country && birthCountry.name !== country.name) {
    const yrs = Math.max(0, G.currentYear - (G.currentYear - (G.yearsAbroad ?? 1)))
    exterior.push(`You moved here from ${birthCountry.name}.`)
  }

  // ── INTERIOR 1: The dominant formative fact ───────────────────────────────────
  const interiorFact = (() => {
    // Extreme survivals first
    if (F.has('holocaust_survived') || F.has('genocide_survived') || F.has('survived_khmer_rouge')) return 'You have survived things that most people only read about in the past tense.'
    if (F.has('gulag_survived')) return 'You survived the camps. That knowledge lives in your body.'
    if (F.has('lost_child')) return 'You lost a child. That does not become a past thing.'
    if (F.has('partition_survivor') || F.has('partition_refugee')) return 'You crossed the border during the Partition, carrying what you could.'
    // Heavy personal facts
    if (F.has('cancer_survivor')) return 'You are a cancer survivor. The word still sits differently than you expected.'
    if (F.has('escaped_prisoner') && !state.inPrison) return 'You escaped from prison. You still watch doors.'
    if (F.has('lgbtq_identity') || F.has('orientation_gay') || F.has('orientation_bisexual')) {
      return G.lgbtqCriminalized
        ? 'You are queer in a country where that is still not safe to name.'
        : 'Being queer is simply part of who you are. It has shaped what you notice in the world.'
    }
    if (F.has('fled_child_marriage')) return 'You refused the life that was arranged for you, and built another one from nothing.'
    if (F.has('defied_caste') && G.casteSystem) return 'You have spent your life building outside the position you were born into.'
    // Immigration / displacement
    if (F.has('emigrated') && birthCountry && country && birthCountry.name !== country.name) {
      const yrs = G.yearsAbroad ?? 0
      if (yrs >= 15) return `You left ${birthCountry.name} ${yrs} years ago. It appears in your dreams more than you expected.`
      if (yrs >= 5) return `You have been away from ${birthCountry.name} for ${yrs} years. The distance is still not neutral.`
      return `You left ${birthCountry.name} not long ago. You are still finding out what this life is.`
    }
    // Formative history
    if (F.has('communist_childhood') && G.currentYear >= 1991) return 'You grew up certain of things the world is no longer certain of.'
    if (F.has('authoritarian_childhood')) return 'You grew up in a place that taught you to read a room before you spoke in it.'
    if (F.has('experienced_racism') || F.has('double_consciousness')) return 'You have spent years navigating rooms not built with you in mind. You have learned to read the furniture.'
    if (F.has('first_gen_university')) return 'You were the first in your family to go to university. The gap that made has not fully closed.'
    if (F.has('famine_memory') || F.has('food_insecurity')) return 'You grew up knowing hunger. That knowledge changed how you relate to having enough.'
    if (F.has('war_childhood')) return 'You grew up during a conflict. The body still knows certain sounds.'
    if (F.has('abusive_relationship') && !partner) return 'You got out of something that was damaging you. That took longer than it should have.'
    return null
  })()
  if (interiorFact) interior.push(interiorFact)

  // ── INTERIOR 2: Desire / wound / something quietly earned ────────────────────
  const desireMap = {
    prove_worth: 'There is still a part of you that needs to be seen as capable — even now, even after everything.',
    belong: 'You have spent much of your life looking for the room where you finally fit.',
    be_seen: 'You want to matter — to someone, somewhere. This has shaped more decisions than you admit.',
    safety: 'You make decisions the way someone does who knows without doubt that things can fall apart.',
    connection: 'The thing you want most is genuine closeness. It is also what you are most careful around.',
    leave_mark: 'You are aware that you will be forgotten. You have been trying to build something that outlasts that.',
    freedom: 'You have always needed an exit. This has cost you some things and saved you others.',
    redemption: 'You are still trying to make up for something. Whether that is even necessary is a different question.',
  }

  if (desire && desireMap[desire]) {
    interior.push(desireMap[desire])
  } else {
    // Fallback: earned insight from flags
    if (F.has('lost_faith') || F.has('apostasy')) {
      interior.push('You left your faith behind. The shape it occupied is still there.')
    } else if (F.has('faith_deepened') || F.has('religion_returned')) {
      interior.push('Your faith has become more important, not less, as you have gotten older.')
    } else if (F.has('went_to_therapy') || F.has('therapy_veteran')) {
      interior.push('You have done the work of looking at yourself honestly. That is not nothing.')
    } else if (F.has('is_mentor') || F.has('mentor')) {
      interior.push("You have been someone's first real break. You remember what that felt like.")
    } else if (F.has('long_marriage') || (partner?.married && (partner?.years ?? 0) > 20)) {
      interior.push('You have been married for a long time. That is its own kind of work.')
    } else if (F.has('career_fulfilled') && career) {
      interior.push("The work is genuinely good. You don't say that often, but you know it.")
    } else if (F.has('philanthropist')) {
      interior.push('You give money away deliberately. This is not accidental.')
    } else if (F.has('in_recovery') || F.has('addiction_recovered')) {
      interior.push('You got sober. Holding that is still the most important thing you do each day.')
    }
  }

  // ── INTERIOR 3: Relationship quality insight ─────────────────────────────────
  if (interior.length < 3) {
    if (partner) {
      const q = partner.relationshipQuality ?? 60
      const pn = partner.name.split(' ')[0]
      if (q > 85 && (partner.years ?? 0) > 10) {
        interior.push(`What you have built with ${pn} is the kind of thing people mean when they say they got lucky.`)
      } else if (q < 32 && partner.married) {
        interior.push(`You and ${pn} are still married. That fact is more complicated than it sounds.`)
      }
    } else if ((children ?? []).length > 0) {
      const closeChild = (children ?? []).find(c => c.age >= 16 && (c.relationshipQuality ?? 50) > 82)
      if (closeChild) interior.push(`${closeChild.name.split(' ')[0]} is someone you genuinely like. That is not automatic between parents and children.`)
    }
  }

  // ── INTERIOR 4: Weight — regret translated to prose ───────────────────────
  const regret = state.regret ?? 0
  if (interior.length < 4) {
    const weightLine = (() => {
      if (regret > 70) return 'The accumulation of what you carry shapes how you hold yourself.'
      if (regret > 50) return 'The weight of certain decisions has not diminished the way you expected it to.'
      if (regret > 30) return 'You carry more than you planned to. Some of it you can name.'
      if (regret > 15) return 'There are one or two things you would do differently, given another run at them.'
      return null
    })()
    if (weightLine) interior.push(weightLine)
  }

  const all = [...exterior, ...interior].filter(Boolean)
  // Cap at 6 sentences so the card doesn't become a wall
  return all.length >= 2 ? all.slice(0, 6).join(' ') : null
}

// ─── Epitaph generator ───────────────────────────────────────────────────────

export function generateEpitaph(state) {
  const { character, flags, stats, regret, age, children, partner, career, money } = state
  const name = character.firstName
  const He = character.gender === 'male' ? 'He' : 'She'
  const he = He.toLowerCase()
  const His = character.gender === 'male' ? 'His' : 'Her'
  const his = His.toLowerCase()
  const him = character.gender === 'male' ? 'him' : 'her'
  const country = character.country.name
  const birthCountryName = getCountryDisplayName(character.country, character.birthYear)
  const { fame, assets, siblings } = state

  const f = (flag) => flags.includes(flag)
  const any = (...fs) => fs.some(g => flags.includes(g))

  const bornIn = birthCountryName !== country
    ? `${birthCountryName} (now ${country})`
    : country

  // Paragraphs accumulate as string arrays; joined with double newline at end
  const para1 = [] // origin + childhood
  const para2 = [] // historical witness + displacement (the heavy weight)
  const para3 = [] // dark path, work, ethics, identity
  const para4 = [] // relationships, family, grief
  const para5 = [] // close

  // ── PARAGRAPH 1: Origin ──────────────────────────────────────────────────────
  if (age < 20) {
    para1.push(`${name} was born in ${bornIn} and was gone at ${age} — a life that barely had time to begin.`)
  } else if (age < 40) {
    para1.push(`${name} was born in ${bornIn} and died at ${age}, too soon.`)
  } else {
    para1.push(`${name} was born in ${bornIn} and lived to ${age}.`)
  }

  // Childhood texture — weave related facts together
  const hadHardChildhood = any('war_childhood', 'conflict_zone_birth', 'poverty_childhood', 'food_insecurity', 'lost_parent_young', 'orphaned')
  const hadWarmChildhood = f('secure_childhood')
  if (any('war_childhood', 'conflict_zone_birth')) {
    para1.push(`The first years were shaped by conflict before ${he} had language for it.`)
  } else if (any('lost_parent_young', 'orphaned')) {
    if (any('poverty_childhood', 'food_insecurity')) {
      para1.push(`A parent was gone before there was a clear memory of them, and the early years were lean.`)
    } else {
      para1.push(`A parent was gone before there was a clear memory of them — a founding absence.`)
    }
  } else if (any('poverty_childhood', 'food_insecurity')) {
    para1.push(`The early years were lean. Hunger was part of the childhood.`)
  } else if (hadWarmChildhood) {
    para1.push(`${He} had a childhood with warmth in it — something ${he} would spend the rest of ${his} life trying to pass on.`)
  }

  if (f('water_walk_childhood')) {
    para1.push(`For years, ${he} carried water before school. The weight of it became part of ${his} constitution.`)
  }
  if (f('talent_discovered')) {
    para1.push(`${He} found a talent young and spent decades finding out where it led.`)
  }
  if (f('political_awareness_early')) {
    para1.push(`${He} understood early what kind of country ${he} was living in.`)
  }

  // ── PARAGRAPH 2: Historical weight + displacement ─────────────────────────────
  // The heaviest flags; only write this paragraph if something significant applies
  const heavyHistory = any(
    'genocide_survivor', 'tutsi_hidden', 'survived_khmer_rouge',
    'partition_survivor', 'partition_refugee',
    'buenos_aires_junta_era', 'tehran_revolution_witness',
    'cultural_revolution_survived', 'derg_era_survived',
    'harare_hyperinflation_lived', 'solidarity_era_lived',
    'post_apartheid_generation', 'witnessed_wall_fall',
    'ghana_independence_generation', 'nairobi_independence_generation',
    'bolivarian_collapse_lived', 'left_junta_chile',
    'maidan_generation', 'euromaidan_lived',
    'independence_generation_self', 'beirut_blast_survived',
    'refugee', 'displaced', 'emigrated', 'diaspora',
  )

  if (any('genocide_survivor', 'tutsi_hidden')) {
    para2.push(`${He} survived something that killed many of the people around ${him}. The rest of ${his} life was lived in the long shadow of that fact, and somehow, beyond it.`)
  } else if (f('survived_khmer_rouge')) {
    para2.push(`${He} survived the Khmer Rouge years. That ${he} survived at all placed ${him} in a statistical minority.`)
  } else if (any('partition_survivor', 'partition_refugee')) {
    para2.push(`${He} lived through the Partition — one of the largest forced migrations in human history — and carried it quietly for decades.`)
  } else if (f('tehran_revolution_witness')) {
    para2.push(`${He} was in Tehran for the Revolution. The world it made was not the world it had promised.`)
  } else if (f('cultural_revolution_survived')) {
    para2.push(`The Cultural Revolution demanded a particular calibration of public and private self. ${name} navigated it.`)
  } else if (f('derg_era_survived')) {
    para2.push(`${He} survived the Derg years in Ethiopia — the Red Terror, the famine, and the long years after both.`)
  } else if (f('harare_hyperinflation_lived')) {
    para2.push(`Zimbabwe's hyperinflation turned daily arithmetic into survival. ${He} had that education, and kept it.`)
  } else if (f('bolivarian_collapse_lived')) {
    para2.push(`${He} watched Venezuela collapse — the pharmacy shelves, the currency, the people crossing the border on foot.`)
  } else if (any('buenos_aires_junta_era', 'witnessed_madres')) {
    if (f('witnessed_madres')) {
      para2.push(`${He} lived under the Argentine military junta and watched the Mothers circle the plaza with photographs of people who had not come back.`)
    } else {
      para2.push(`${He} lived under the Argentine military junta. ${He} knew people who did not come back from it.`)
    }
  } else if (f('left_junta_chile')) {
    para2.push(`${He} left Chile after the coup. The leaving was its own kind of loss alongside everything else the coup took.`)
  } else if (f('solidarity_era_lived')) {
    para2.push(`${He} lived the Solidarity years in Poland — the underground presses, the church halls, the specific risk of visible hope.`)
  } else if (any('maidan_generation', 'euromaidan_lived')) {
    para2.push(`${He} stood in the Maidan. What followed was harder than the night on the square.`)
  } else if (f('witnessed_wall_fall')) {
    para2.push(`${He} was in Berlin the night the Wall came down. The details never fully translated into words.`)
  } else if (f('berlin_wall_era_lived')) {
    para2.push(`${He} grew up in a city divided by concrete and wire, and knew both sides of what that meant.`)
  } else if (any('post_apartheid_generation', 'witnessed_truth_commission')) {
    if (f('witnessed_truth_commission')) {
      para2.push(`${He} cast a vote in the first free election, and later sat in the room where a country tried, in public, to say what had happened to it.`)
    } else {
      para2.push(`${He} cast a vote in the first free election. ${He} knew what it had cost to get there.`)
    }
  } else if (any('ghana_independence_generation', 'nairobi_independence_generation', 'independence_generation_self')) {
    para2.push(`${He} was alive when independence came — heard it announced and believed, in that moment, that the world had changed.`)
  }

  // Displacement / migration
  if (any('refugee', 'displaced') && !any('genocide_survivor', 'tutsi_hidden')) {
    if (any('sought_asylum', 'refugee_status')) {
      para2.push(`${He} fled and was eventually granted refuge. The years of waiting between were their own kind of sentence.`)
    } else {
      para2.push(`${He} was carried across borders by forces larger than any single life.`)
    }
  } else if (any('emigrated', 'diaspora') && para2.length === 0) {
    // Only add emigration if no heavy history already took up this paragraph
    if (f('illegal_immigrant') && !f('achieved_citizen')) {
      para2.push(`${He} crossed without papers and built a life in a country that barely acknowledged ${his} existence.`)
    } else if (f('achieved_citizen') || (state.residencyStatus === 'citizen')) {
      para2.push(`${He} left ${bornIn} and eventually earned citizenship in an adopted country — paperwork that meant more than its bureaucratic weight.`)
    } else {
      para2.push(`${He} left ${bornIn} in search of something different, and found it, at a cost.`)
    }
  }

  if (f('famine_memory') || f('drought_survived')) {
    para2.push(`${He} knew what a failed harvest meant at the level of a family's daily choices. The knowledge stayed longer than the hunger did.`)
  }
  if (f('kolkhoz_dissolved')) {
    para2.push(`${He} lived through the dissolution of collective farming — the paper that said you owned land, and the reality that was more complicated.`)
  }

  // ── PARAGRAPH 3: Dark path, work, ethics, identity ────────────────────────────
  // Crime
  if (any('convicted_murder', 'murderer')) {
    para3.push(`${He} killed someone. It defined ${him} in ways ${he} spent the rest of ${his} life either fleeing or accepting.`)
  } else if (f('convicted_manslaughter')) {
    para3.push(`${He} caused a death. Whether by accident or recklessness, the courts had a word for it.`)
  } else if (any('violent_criminal', 'assault_record')) {
    para3.push(`${He} had a capacity for violence that led ${him} into serious trouble.`)
  }
  if (f('escaped_prisoner')) {
    para3.push(`${He} escaped from prison and lived as a fugitive for a time — a chapter most people would find hard to believe.`)
  } else if (any('served_prison_time', 'incarcerated', 'served_time', 'prison_phone')) {
    para3.push(`${He} served time. Prison changes people.`)
  }
  if (any('gang_member', 'organized_crime')) {
    para3.push(`${He} ran with people the law had files on. Some of that life ${he} chose; some of it chose ${him}.`)
  }

  // Addiction
  if (any('drug_addiction', 'alcohol_addiction', 'addiction')) {
    if (any('addiction_recovered', 'sobriety', 'recovery_established', 'in_recovery', 'rehab_graduate')) {
      para3.push(`${He} fought an addiction and won — or came close enough to winning that it amounted to the same thing.`)
    } else {
      para3.push(`${He} struggled with addiction. It cost ${him} things ${he} never got back.`)
    }
  }

  // LGBTQ
  if (any('lgbtq_persecuted', 'arrested_for_orientation')) {
    para3.push(`${He} was persecuted for who ${he} was and endured it.`)
  } else if (any('came_out', 'lgbtq_accepted')) {
    para3.push(`${He} lived openly as ${he} was. In some eras and places, that required more courage than it should have.`)
  } else if (f('lgbtq_identity') && f('lgbtq_criminalized_country')) {
    para3.push(`${He} lived in a country that criminalised what ${he} was, and navigated it with care.`)
  }

  // Caste / discrimination
  if (any('caste_discrimination', 'dalit_discrimination', 'defied_caste')) {
    para3.push(`${He} spent ${his} life fighting a hierarchy ${he} was born into.`)
  } else if (any('experienced_discrimination', 'experienced_racism', 'gender_barrier_faced')) {
    para3.push(`${He} encountered barriers that others did not. ${He} found ways through most of them.`)
  }

  // Ethics and integrity
  if (any('corruption_exposed', 'bribery', 'fraud')) {
    para3.push(`A corruption scandal marked the record and the reputation never fully recovered.`)
  } else if (any('compromised', 'sold_out', 'censored_work')) {
    para3.push(`There were choices ${he} made that ${he} couldn't fully justify later.`)
  }
  if (f('whistleblower')) {
    para3.push(`${He} exposed something that needed exposing, at real personal cost.`)
  }
  if (any('journalism_threat', 'censored', 'censored_journalist')) {
    para3.push(`${He} worked in journalism and learned what it costs to tell the truth somewhere that prefers silence.`)
  } else if (f('story_killed') || f('art_in_drawer')) {
    para3.push(`There was a thing ${he} knew — or made — that never reached the world. ${He} carried it.`)
  } else if (f('resistance_through_art')) {
    para3.push(`${He} made work that said what couldn't be said directly, in a time and place when that mattered.`)
  }
  if (any('dissident_writer', 'dissident_reader') && !f('journalism_threat')) {
    para3.push(`${He} was someone the state kept a file on.`)
  }

  // Education and career
  const educationLine = (() => {
    if (f('first_gen_graduate')) return `the first in the family to earn a university degree`
    if (f('university_graduate')) return `someone who pulled hard on the thread of education`
    if (any('school_dropout', 'expelled', 'illiterate')) return null
    return null
  })()
  const careerLine = (() => {
    if (!career) return null
    if (f('sold_business')) return `built a business and sold it`
    if (f('business_failed') && f('business_restart')) return `built a business, watched it fail, and built another — the second time went better`
    if (f('career_defining_work')) return `did the best of ${his} professional work as a ${career.title}`
    return `spent the working years as a ${career.title}`
  })()

  if (educationLine && careerLine) {
    para3.push(`${He} was ${educationLine}, and ${careerLine}.`)
  } else if (educationLine) {
    para3.push(`${He} was ${educationLine}.`)
  } else if (careerLine) {
    para3.push(`${He} ${careerLine}.`)
  } else if (any('school_dropout', 'expelled')) {
    para3.push(`${He} left school early. Whether that was a choice or a consequence depends who you ask.`)
  }

  // Fame and wealth (only if notable)
  if (fame > 70) {
    para3.push(`${He} was famous — the kind that changes what it means to walk into a room.`)
  } else if (fame > 40) {
    para3.push(`In certain circles, ${name} was well-known.`)
  }
  if (money > 5000000) {
    para3.push(`${He} accumulated serious wealth, though what it cost is harder to measure than what it came to.`)
  } else if (money > 1000000) {
    para3.push(`${He} left behind more than most.`)
  } else if (any('destitute', 'homeless')) {
    para3.push(`${He} died with almost nothing. The circumstances were not entirely of ${his} making.`)
  }

  // Faith
  if (f('completed_hajj')) {
    para3.push(`${He} made the pilgrimage to Mecca. Whatever ${he} went looking for, ${he} found something.`)
  } else if (f('faith_deepened')) {
    para3.push(`${His} faith grew rather than dimmed with age — the kind that asks hard questions and survives them.`)
  } else if (f('left_religion') && f('faith_crisis')) {
    para3.push(`${He} walked away from the faith ${he} was raised in. It was not a small thing.`)
  }

  // Place and movement
  if (f('village_electrified')) {
    para3.push(`${He} was there the night the first light came on in the village and never lost the specific memory of what came before it.`)
  }
  if (f('rural_to_urban') && !any('emigrated', 'refugee')) {
    para3.push(`${He} made the move from village to city — the defining migration of ${his} generation in that part of the world.`)
  } else if (f('left_dying_city')) {
    para3.push(`${He} left a city that was becoming something smaller. Probably the right call.`)
  } else if (f('rust_belt_stayer')) {
    para3.push(`${He} stayed when others left. The place ${he} refused to abandon wasn't the same at the end, but it was still there.`)
  } else if (f('postsoviet_stayer')) {
    para3.push(`${He} chose to stay in a city most people were leaving. The city stabilised, eventually. ${He} was already there.`)
  }

  // ── PARAGRAPH 4: Relationships, family, grief ─────────────────────────────────
  // The heaviest grief comes first
  if (f('lost_child')) {
    para4.push(`${He} outlived a child. There is no adequate sentence for this.`)
  }

  if (f('strong_marriage') && partner) {
    para4.push(`${He} loved ${partner.name} with a steadiness that was its own kind of achievement.`)
  } else if (f('long_marriage') && partner) {
    para4.push(`${He} and ${partner.name} were married for a long time. The length of it was its own statement.`)
  } else if (any('lost_partner', 'widowed')) {
    para4.push(`${He} lost the person ${he} had built a life with, and had to learn what came after.`)
  } else if (partner && !any('divorced', 'divorce')) {
    para4.push(`${He} shared ${his} life with ${partner.name}.`)
  } else if (any('divorced', 'divorce')) {
    para4.push(`${He} married, and the marriage ended — a chapter ${he} rarely spoke of directly.`)
  } else if (any('heartbroken', 'lost_love')) {
    para4.push(`${He} loved someone ${he} couldn't hold onto. It stayed with ${him}.`)
  }

  if (children?.length > 0) {
    const n = children.length
    const verb = f('absent_parent') ? (character.gender === 'male' ? 'fathered' : 'had') : 'raised'
    para4.push(`${He} ${verb} ${n === 1 ? 'a child' : `${n} children`}.`)
  } else if (f('chose_childless')) {
    para4.push(`${He} chose not to have children. It was a complete answer.`)
  } else if (f('ivf_success')) {
    para4.push(`The family ${he} built required real persistence to build.`)
  } else if (any('multiple_miscarriage', 'experienced_miscarriage')) {
    para4.push(`${He} lost pregnancies. The losses were private and not small.`)
  }

  if (f('sibling_bond_strong')) {
    para4.push(`${He} kept close with ${his} siblings — a bond that outlasted many of the other constants.`)
  }
  if (f('mentor') || f('is_mentor')) {
    para4.push(`${He} was someone others came to with questions about what to do next.`)
  }
  if (any('depression_managed', 'anxiety_managed', 'mental_health_journey')) {
    para4.push(`${He} lived with a condition that made ordinary things harder, and managed it more often than not.`)
  }
  if (f('heritage_language_preserved') || f('oral_historian')) {
    para4.push(`${He} kept things alive that might otherwise have been lost.`)
  }

  // ── PARAGRAPH 5: Closing ──────────────────────────────────────────────────────
  if (any('found_meaning', 'acceptance', 'peace')) {
    para5.push(`Near the end, ${name} seemed at peace with the shape of the life.`)
  } else if (f('life_reviewed') || f('legacy_thought')) {
    para5.push(`${He} reviewed the life honestly before the end.`)
  } else if (regret > 75) {
    para5.push(`${He} carried something unresolved into the last years — a persistent sense that something essential had been missed.`)
  } else if (regret > 50) {
    para5.push(`There were regrets. Most people have them.`)
  } else if (f('retired_comfortable')) {
    para5.push(`${He} retired with enough, which is more than enough to say.`)
  } else if (stats.happiness > 70) {
    para5.push(`By most measures, it was a life worth having.`)
  } else {
    para5.push(`${name}'s life was shaped by circumstances ${he} did not choose, and decisions ${he} made from within them.`)
  }

  // Fallback
  if (para1.length + para2.length + para3.length + para4.length < 3) {
    para5.push(`${name}'s life was shaped by circumstances ${he} did not choose, and decisions ${he} made from within them.`)
  }

  const parts = [para1, para2, para3, para4, para5]
    .filter(p => p.length > 0)
    .map(p => p.join(' '))
  return parts.join('\n\n')
}

// ─── Life notes generator ─────────────────────────────────────────────────────
// Returns up to 8 short factual fragments for the death screen's "Life in brief"
// section. Prioritises the most significant flags; filters out minor ones.

export function generateLifeNotes(state) {
  const { character, flags, age, children, partner, career, money, siblings, fame } = state
  const f = (flag) => flags.includes(flag)
  const any = (...fs) => fs.some(g => flags.includes(g))
  const He = character.gender === 'male' ? 'He' : 'She'
  const he = He.toLowerCase()
  const his = character.gender === 'male' ? 'his' : 'her'

  const notes = [] // [{ priority, text }]

  const add = (priority, text) => notes.push({ priority, text })

  // Extreme survival (priority 100)
  if (any('genocide_survivor', 'tutsi_hidden')) add(100, 'Survived genocide.')
  if (f('survived_khmer_rouge')) add(100, 'Survived the Khmer Rouge.')
  if (any('partition_survivor', 'partition_refugee')) add(100, 'Survived the Partition.')

  // Major historical witness (priority 90)
  if (f('tehran_revolution_witness')) add(90, 'Witnessed the Iranian Revolution.')
  if (f('cultural_revolution_survived')) add(90, 'Survived the Cultural Revolution.')
  if (f('derg_era_survived')) add(90, 'Survived the Derg years in Ethiopia.')
  if (f('post_apartheid_generation')) add(90, 'Voted in the first free South African election.')
  if (f('witnessed_wall_fall')) add(90, 'Present in Berlin the night the Wall came down.')

  // Personal extremis (priority 80)
  if (f('lost_child')) add(80, 'Outlived a child.')
  if (any('convicted_murder', 'murderer')) add(80, 'Convicted of murder.')
  if (f('escaped_prisoner')) add(80, 'Escaped from prison.')
  if (f('whistleblower')) add(80, 'A whistleblower.')
  if (any('genocide_family_memory', 'holocaust_family_memory')) add(80, "Carried a family's memory of atrocity.")

  // Significant life facts (priority 70)
  if (f('first_gen_graduate')) add(70, 'First in the family to graduate university.')
  if (any('lgbtq_persecuted', 'arrested_for_orientation')) add(70, 'Persecuted for who they were.')
  if (any('served_prison_time', 'incarcerated', 'served_time')) add(70, 'Served time in prison.')
  if (any('refugee', 'displaced') && !any('genocide_survivor', 'tutsi_hidden')) add(70, 'A refugee.')
  if (f('famine_memory') || f('famine_survivor')) add(70, 'Survived famine.')

  // Notable choices (priority 60)
  if (f('sold_business')) add(60, 'Built and sold a business.')
  if (f('completed_hajj')) add(60, 'Made the pilgrimage to Mecca.')
  if (f('chose_childless')) add(60, 'Chose not to have children.')
  if (f('ivf_success')) add(60, 'Fought to have a family.')
  if (any('came_out', 'lgbtq_accepted')) add(60, 'Lived openly.')
  if (f('left_religion') && f('faith_crisis')) add(60, 'Walked away from the faith.')
  if (any('drug_addiction', 'alcohol_addiction') && any('addiction_recovered', 'sobriety')) add(60, 'Fought addiction.')
  if (fame > 70) add(60, 'Was famous.')

  // Carried things (priority 50)
  if (f('story_killed') || f('art_in_drawer')) add(50, 'Made something that never reached the world.')
  if (f('resistance_through_art')) add(50, 'Made work that said what couldn\'t be said directly.')
  if (any('dissident_writer', 'dissident_reader')) add(50, 'A person the state kept a file on.')
  if (f('oral_historian') || f('heritage_language_preserved')) add(50, 'Kept something alive that might have been lost.')
  if (f('mentor') || f('is_mentor')) add(50, 'Mentored others.')
  if (f('water_walk_childhood')) add(50, 'Carried water before school for years.')
  if (f('village_electrified')) add(50, 'Present when the first light came on in the village.')

  // Sort by priority, take top 8
  notes.sort((a, b) => b.priority - a.priority)
  return notes.slice(0, 8).map(n => n.text)
}
