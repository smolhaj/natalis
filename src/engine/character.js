import { COUNTRIES } from '../data/countries'
import { getCountryDisplayName } from '../utils/countryUtils'
import { PLACES, pickBirthPlace, pickNeighborhoodTier, pickNamedNeighborhood } from '../data/places'
import { randomBetween, pickFrom, rollWeighted, clamp, chance } from '../utils/random'
import { LIFE_SKELETON_EVENTS } from '../data/events/lifecycle/events_life_skeleton'
import { PHASE_ENTRY_EVENTS } from '../data/events/lifecycle/events_phase_entries'

// ─── FlagSet ──────────────────────────────────────────────────────────────────
// Extends Set with Array.prototype.includes as an alias for has(), so existing
// event guards written as G.flags.includes('x') continue to work while getting
// O(1) lookup instead of O(n) linear scan. New guards should prefer .has().
export class FlagSet extends Set {
  includes(flag) { return this.has(flag) }
  some(predicate) { for (const v of this) { if (predicate(v)) return true } return false }
  filter(predicate) { return [...this].filter(predicate) }
  find(predicate) { for (const v of this) { if (predicate(v)) return v } return undefined }
}

// ─── Life Skeleton & Phase Entry lookup maps ──────────────────────────────────
// Populated lazily after module load so circular dependency with events.js resolves.
let _LIFE_SKELETON_MAP = null
let _PHASE_ENTRY_MAP = null
export function getLifeSkeletonMap() {
  if (!_LIFE_SKELETON_MAP) _LIFE_SKELETON_MAP = new Map(LIFE_SKELETON_EVENTS.map(e => [e.id, e]))
  return _LIFE_SKELETON_MAP
}
export function getPhaseEntryMap() {
  if (!_PHASE_ENTRY_MAP) _PHASE_ENTRY_MAP = new Map(PHASE_ENTRY_EVENTS.map(e => [e.id, e]))
  return _PHASE_ENTRY_MAP
}

// ─── Weighted random helpers ──────────────────────────────────────────────────

export function weightedRandom(weights) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0)
  if (total <= 0) return Object.keys(weights)[0]
  let r = Math.random() * total
  for (const [key, weight] of Object.entries(weights)) {
    r -= weight
    if (r <= 0) return key
  }
  return Object.keys(weights)[Object.keys(weights).length - 1]
}

export function weightedRandomFromArray(arr, shareKey = 'share') {
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
export const GDP_MULT = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }

// ─── Wealth tier labels (archetype-aware) ────────────────────────────────────
export const WEALTH_TIER_LABEL_MAP = {
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
  if (cn === 'Israel' && char.ethnicity === 'ashkenazi_jewish' && birthYear >= 1948 && birthYear <= 1972) flags.push('holocaust_family_memory')

  // ── Gift roll — 4% chance of exceptional innate ability ───────────────────
  if (Math.random() < 0.04) {
    const GIFT_TYPES = [
      'born_gifted_intellectual',
      'born_gifted_musical',
      'born_gifted_athletic',
      'born_gifted_artistic',
      'born_gifted_linguistic',
    ]
    const GIFT_WEIGHTS = [0.25, 0.25, 0.25, 0.15, 0.10]
    let r = Math.random()
    let cum = 0
    for (let i = 0; i < GIFT_TYPES.length; i++) {
      cum += GIFT_WEIGHTS[i]
      if (r < cum) { flags.push(GIFT_TYPES[i]); break }
    }
  }

  // ── Disability rolls ──────────────────────────────────────────────────────
  const archetype = country.archetype ?? ''
  const disabilityBaseRate = archetype === 'conflict_zone' ? 0.04 : 0.02
  if (Math.random() < disabilityBaseRate) flags.push('born_with_disability')
  if (Math.random() < 0.0015) flags.push('born_deaf')

  // ── Child soldier path — conflict zone, born before 2005 ─────────────────
  if (archetype === 'conflict_zone' && birthYear < 2005 && Math.random() < 0.15) {
    flags.push('child_soldier_path')
  }

  // ── Addiction in family — elevated in certain archetypes ─────────────────
  const addictionFamilyRate = {
    wealthy_west: 0.10,
    post_soviet: 0.14,
    developing_urban: 0.07,
    developing_unstable: 0.06,
    subsaharan: 0.05,
    conflict_zone: 0.08,
  }[archetype] ?? 0.06
  if (Math.random() < addictionFamilyRate) flags.push('addiction_in_family')

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
export const HYPERINFLATION_PERIODS = [
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
export const HYPERINFLATION_DRAIN = { moderate: 0.22, severe: 0.55, extreme: 0.88 }

export function getHyperinflation(countryName, year, flags) {
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

// ─── Adult and child traits ───────────────────────────────────────────────────

export const ADULT_TRAITS = [
  'patient', 'restless', 'proud', 'gentle', 'stubborn', 'anxious',
  'warm', 'distant', 'ambitious', 'funny', 'serious', 'generous',
  'demanding', 'quiet', 'affectionate', 'critical', 'idealistic',
  'practical', 'melancholy', 'cheerful',
]

// Prose surfaced in year texture and partner moment generation.
// Each trait maps to 2 lines so variety is possible across years.
export const TRAIT_PROSE = {
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
export const CHILD_TRAITS = [
  'curious', 'shy', 'spirited', 'sensitive', 'stubborn', 'gentle',
  'funny', 'serious', 'dreamy', 'anxious', 'affectionate', 'restless',
]
export function pickTraits(pool, count = 2) {
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

export const PARTNER_OCCUPATIONS = [
  'Software Engineer', 'Teacher', 'Nurse', 'Doctor', 'Lawyer', 'Accountant',
  'Graphic Designer', 'Chef', 'Bartender', 'Sales Manager', 'Marketing Director',
  'Real Estate Agent', 'Police Officer', 'Firefighter', 'Architect', 'Journalist',
  'Pharmacist', 'Social Worker', 'Personal Trainer', 'Electrician', 'Plumber',
  'Mechanic', 'Store Manager', 'Bank Teller', 'Dental Hygienist', 'Librarian',
  'Barista', 'Photographer', 'Event Planner', 'Insurance Agent', 'Veterinarian',
  'Student', 'Freelancer', 'Artist', 'Musician', 'Actor', 'Model',
  'Entrepreneur', 'Consultant', 'Waiter', 'Driver', 'Cleaner', 'Security Guard',
]

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
