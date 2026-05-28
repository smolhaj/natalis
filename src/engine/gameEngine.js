import { COUNTRIES } from '../data/countries'
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
import { randomBetween, pickFrom, rollWeighted, clamp, chance } from '../utils/random'

// ─── FlagSet ──────────────────────────────────────────────────────────────────
// Extends Set with Array.prototype.includes as an alias for has(), so existing
// event guards written as G.flags.includes('x') continue to work while getting
// O(1) lookup instead of O(n) linear scan. New guards should prefer .has().
class FlagSet extends Set {
  includes(flag) { return this.has(flag) }
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
  const familyStability =
    adjustedRoll < 0.2 ? 'unstable' :
    adjustedRoll < 0.45 ? 'struggling' :
    adjustedRoll < 0.75 ? 'stable' : 'secure'

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
  const religion = (() => {
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
  const ruralUrban = Math.random() < adjustedUrbanRate
    ? (Math.random() < 0.3 ? 'suburban' : 'urban')
    : 'rural'

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
      ageDiff: randomBetween(-8, 8),
      alive: true,
      relationshipQuality: clamp(baseQ + randomBetween(-15, 15), 10, 100),
    }
  })
}

export function deriveBirthText(char) {
  const { country, birthYear, familyStability, familySize, wealthTier, firstName, surname } = char
  const arch = country.archetype
  const name = `${firstName} ${surname}`

  const stabilityCtx = {
    secure: 'into a household of stability and warmth',
    stable: 'to a family of modest means but solid foundations',
    struggling: 'into a family navigating real hardship',
    unstable: 'into difficult circumstances from the first day',
  }[familyStability] ?? 'into the world'

  const archCtx = {
    wealthy_west: `In ${country.name} in ${birthYear}, the maternity ward is clean, the forms are in triplicate, and your parents drive home on a road with lane markings.`,
    wealthy_east: `${country.name}, ${birthYear}. A modern hospital, careful documentation, grandparents waiting in the corridor with specific opinions about your name.`,
    post_soviet: `${country.name}, ${birthYear}. The maternity ward smells of disinfectant. Your mother was not allowed to have your father in the room.`,
    developing_urban: `${country.name}, ${birthYear}. The city is enormous and still growing. The neighbourhood you are born into will shape everything that follows.`,
    developing_unstable: `${country.name}, ${birthYear}. The country is in motion — politically, economically, always. You arrive ${stabilityCtx}.`,
    subsaharan: `${country.name}, ${birthYear}. You are born ${stabilityCtx}${familySize > 4 ? ', the newest in a large family' : ''}. ${country.name}'s sun is already through the window.`,
    conflict_zone: `${country.name}, ${birthYear}. You are born during a time of conflict. Your mother's first priority was keeping you safe.`,
    wealthy_gulf: `${country.name}, ${birthYear}. The hospital is modern, the air conditioning precise. You are born into a country of vast resources and layered rules.`,
  }[arch] ?? `${name} enters the world in ${country.name}, ${birthYear}.`

  return archCtx
}

export function deriveInitialMoney(char) {
  const base = { 0: 0, 1: 300, 2: 2000, 3: 12000, 4: 60000 }
  const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
  const mult = gdpMult[char.country.gdp] ?? 1.0
  return Math.round(((base[char.wealthTier] ?? 0) + randomBetween(-200, 200) * char.wealthTier) * mult)
}

export function deriveInitialParents(char) {
  const { country, familyStability, surname } = char
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
    },
    father: {
      name: `${fatherFirst} ${altSurname}`,
      currentAge: randomBetween(24, 40),
      alive: fatherPresent,
      relationshipQuality: fatherPresent ? clamp(baseQ + randomBetween(-15, 10), 8, 100) : 0,
      traits: fatherPresent ? pickTraits(ADULT_TRAITS) : [],
    },
  }
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
  proxy.addFlag = (flag) => { if (!proxy.flags.includes(flag)) proxy.flags.push(flag) }
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
  proxy.relocate = (placeId, neighborhoodTier) => {
    proxy._relocateTo = placeId
    if (neighborhoodTier) proxy._relocateNeighborhoodTier = neighborhoodTier
  }
  proxy.practiceHobby = (hobbyId, delta = 1) => {
    if (!proxy._hobbyDeltas) proxy._hobbyDeltas = {}
    proxy._hobbyDeltas[hobbyId] = (proxy._hobbyDeltas[hobbyId] ?? 0) + delta
  }
  proxy.partnerRel = (delta) => { proxy._partnerRelDelta = (proxy._partnerRelDelta ?? 0) + delta }
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
  // Track year-of-death for grief fog in buildYearTexture
  if (proxy._killParent && next.parents?.[proxy._killParent]) {
    next = { ...next, mem: { ...(next.mem ?? {}), parentDeathYear: next.currentYear } }
  }
  if (proxy._killPartner && next.partner) {
    next = { ...next, mem: { ...(next.mem ?? {}), partnerDeathYear: next.currentYear } }
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

  const totalWeight = pool.reduce((sum, e) => sum + (e.weight ?? 1), 0)
  let r = Math.random() * totalWeight
  for (const event of pool) {
    r -= event.weight ?? 1
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
    criminalRecord: state.criminalRecord,
    inPrison: state.inPrison,
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
    wealthTier: state.classTier ?? state.character?.wealthTier ?? 3,
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
  const { partner, children, age, currentYear, mem, career, friends, siblings, residencyStatus, yearsAbroad } = state
  const phase = getPhase(age)
  const mh = state.mentalHealth ?? {}

  const yearsSincePartnerDeath = mem?.partnerDeathYear != null ? currentYear - mem.partnerDeathYear : null
  const yearsSinceParentDeath  = mem?.parentDeathYear  != null ? currentYear - mem.parentDeathYear  : null

  // Recent partner loss — immediate (grief events haven't fired yet)
  if (F.has('partner_died') && mem?.griefPartnerFirst && !mem?.griefPartnerDating) {
    const name = state.exPartners?.slice(-1)[0]?.name
    return name ? `${name}'s absence is still present in everything.` : 'The house is still the wrong size.'
  }
  if (F.has('partner_died') && !partner) {
    const name = state.exPartners?.slice(-1)[0]?.name
    return name ? `You still reach for ${name} sometimes. The habit hasn't broken yet.` : 'Some mornings the quiet is a different kind of quiet.'
  }

  // Grief fog: 1–3 years after partner death (fills gap between discrete grief events)
  if (yearsSincePartnerDeath !== null && yearsSincePartnerDeath >= 1 && yearsSincePartnerDeath <= 3) {
    if (yearsSincePartnerDeath === 1) return 'There are still whole days that belong to the grief. Fewer than before.'
    return 'The grief has changed shape. It has not left.'
  }
  // Grief fog: years 4–5, dimming
  if (yearsSincePartnerDeath !== null && yearsSincePartnerDeath >= 4 && yearsSincePartnerDeath <= 5) {
    return 'The grief is quiet enough now that you can sometimes forget it. Not always.'
  }

  // Recent parent loss
  if (mem?.griefParentCall && !mem?.griefParentBelongings) {
    return 'Some mornings you reach for the phone before you remember.'
  }
  if (F.has('lost_parent') && !mem?.griefParentYearsLater) {
    return 'The absence of them is specific. It shows up in strange places.'
  }

  // Grief fog: 1–3 years after parent death
  if (yearsSinceParentDeath !== null && yearsSinceParentDeath >= 1 && yearsSinceParentDeath <= 3) {
    return 'You catch yourself sometimes about to tell them something.'
  }

  // Child death — never normalises
  if (F.has('lost_child')) {
    return 'The year moves. You move with it, or something like you does.'
  }

  // Active health crisis
  if (F.has('cancer_treatment')) {
    return 'Treatment continues. You measure time in appointments now.'
  }
  if (mh.condition === 'depression' && !mh.therapy && !mh.medicating) {
    return 'The days are heavy in ways that are hard to explain to someone who hasn\'t felt it.'
  }
  if (mh.condition === 'anxiety' && !mh.therapy && !mh.medicating) {
    return 'There is a low hum underneath everything. You have learned to work around it.'
  }
  if (mh.condition && !mh.therapy && !mh.medicating) {
    return 'Something is off. You are managing, which is not the same as being fine.'
  }

  // Relationship tensions and warmth
  if (partner) {
    const q = partner.relationshipQuality ?? 60
    if (q < 28) return `You and ${partner.name} are still in the same house. That is accurate and not quite the whole story.`
    if (q < 40) return `You and ${partner.name} are polite in ways you didn't used to have to be.`
    if (q > 85 && partner.married) return `A good year with ${partner.name}. The small things are the whole thing, some years.`
    if (q > 78) return `A good year with ${partner.name}. Nothing dramatic — that's how the good ones go.`
  }

  // Estranged adult child
  const estrangedChild = (children ?? []).find(c => c.age >= 18 && (c.relationshipQuality ?? 50) < 32)
  if (estrangedChild) return `You haven't spoken to ${estrangedChild.name.split(' ')[0]} in a while. The silence has a weight.`

  // Post-prison adjustment
  if (F.has('recently_released')) {
    return 'You are getting used to being outside again. It takes longer than people say it will.'
  }

  // Post-divorce, living alone
  if ((F.has('divorced') || F.has('breakup')) && !partner && phase === 'midlife') {
    return 'The first years alone have their own specific calendar.'
  }

  // Business failure aftermath
  if (F.has('business_failed') && !F.has('business_started')) {
    return 'You think about the business sometimes. Less than before, but still.'
  }

  // Undocumented / precarious residency
  if (residencyStatus === 'undocumented' || residencyStatus === 'tourist_overstay') {
    return 'You exist in the margins of official life, which has its own routines by now.'
  }

  // New emigrant (first 3 years)
  if (F.has('emigrated') && (yearsAbroad ?? 0) <= 3 && (yearsAbroad ?? 0) > 0) {
    return 'You are still learning what normal means here.'
  }

  // Authoritarian context
  if (F.has('learned_silence') || F.has('authoritarian_childhood')) {
    return 'Another year of knowing what not to say in which room.'
  }

  // Phase and age texture (sampled, not every year)
  if (phase === 'midlife' && age >= 40 && age <= 43 && !mem?.quietYearMidlifeAck) {
    const opts = [
      'The middle of things. You are somewhere in the middle of things.',
      'Forty. The years have a different weight from here.',
    ]
    return opts[Math.floor(Math.random() * opts.length)]
  }
  if (phase === 'late_life' && age >= 60 && age <= 63) {
    const opts = [
      'The body takes longer to begin in the mornings.',
      'There is more behind you than ahead. That is not a sad thought, just a true one.',
    ]
    return opts[Math.floor(Math.random() * opts.length)]
  }
  if (phase === 'young_adult' && age >= 22 && age <= 26 && !partner && !career) {
    return 'You are still working out the shape of things.'
  }

  // Career satisfaction (when present)
  if (career && F.has('career_fulfilled')) return 'The work is good. You don\'t say that to people much, but it\'s true.'

  // Generic fallback pool — better than one static string
  const fallbacks = [
    'A year without incident. These exist.',
    'The days have a rhythm to them.',
    'Nothing remarkable. You are grateful for that, mostly.',
    'Time passes, as it does.',
    'A quiet year.',
  ]
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}



function applyWorldEvents(state) {
  let updated = { ...state }
  const G = buildG(state)
  for (const we of WORLD_EVENTS) {
    if (updated.worldEventsFired.has(we.id)) continue
    if (state.currentYear < we.years[0] || state.currentYear > we.years[1]) continue
    const archetypesMatch = we.archetypes === 'all' || we.archetypes.includes(state.character.country.archetype)
    const countryMatch = !we.countries || we.countries.includes(state.character.country.name)
    if (!archetypesMatch || !countryMatch) continue
    if (we.minAge && state.age < we.minAge) continue
    if (we.maxAge && state.age > we.maxAge) continue
    if (we.when && !we.when(G)) continue
    const proxy = buildEffectProxy(updated)
    we.effect(proxy)
    updated = applyProxy(updated, proxy)
    updated.worldEventsFired = new Set([...updated.worldEventsFired, we.id])
    updated.log = [...updated.log, { age: updated.age, text: we.narrative, worldEventName: we.name, isKey: true, isWorld: true }]
    if (we.addFlags) updated.flags = [...new Set([...updated.flags, ...we.addFlags])]
  }
  return updated
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
  const cGender = chance(0.5) ? 'male' : 'female'
  const c = state.character.country
  const childName = `${pickFrom(cGender === 'male' ? c.namePool.male : c.namePool.female)} ${state.character.surname}`
  const child = { name: childName, gender: cGender, ageAtBirth: state.age, relationshipQuality: 80, traits: pickTraits(CHILD_TRAITS) }
  return {
    ...state,
    children: [...state.children, child],
    flags: [...new Set([...state.flags, 'parent', 'trying_for_child'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 10, 0, 100) },
    log: [...state.log, { age: state.age, text: `${childName} is born. Everything shifts.`, isKey: true }],
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
    const tier = newLevel >= 80 ? 'master' : newLevel >= 60 ? 'expert' : newLevel >= 40 ? 'skilled' : newLevel >= 20 ? 'learning' : 'beginner'
    updated.log = [...updated.log, { age: updated.age, text: `You practice ${hobbyActivity.hobbyId}. Skill: ${newLevel}/100 (${tier}).`, isKey: false }]
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
    if (crime.criminalRecordEntry) updated.criminalRecord = [...updated.criminalRecord, crime.criminalRecordEntry]
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
      log.push({ age: state.age, text: `Your ${label}, ${parent.name}, passes away at age ${newAge}. You inherit $${inheritance.toLocaleString()}.`, isKey: true })
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
      log.push({ age: state.age, text: `Your sibling ${sib.name} passes away.`, isKey: true })
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
    const log = [...state.log, { age: state.age, text: `${partner.name.split(' ')[0]} dies. You have been together for years. The house is immediately different.`, isKey: true }]
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
      s.criminalRecord = [...(s.criminalRecord ?? []), { crime: 'Murder (convicted)', age: s.age }]
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

  // Debt interest accrual
  if (s.debt > 0) {
    const interestRate = (s.mem?.debtType === 'mortgage') ? 0.06 : 0.18
    const interest = Math.round(s.debt * interestRate)
    s.debt = s.debt + interest
    s.money = (s.money ?? 0) - Math.round(s.debt * 0.05) // minimum payment
    if (s.money < -50000) {
      s.flags = [...new Set([...s.flags, 'bankrupt'])]
      s.debt = 0
      s.money = -5000
      s.creditScore = Math.max(300, (s.creditScore ?? 700) - 200)
      s.log = [...s.log, { age: s.age, text: 'You are declared bankrupt. A relief and a shame at once.', isKey: true }]
    }
  }
  // Credit score slow recovery
  if (!s.debt && (s.creditScore ?? 700) < 800) {
    s.creditScore = Math.min(800, (s.creditScore ?? 700) + 2)
  }

  // Parent aging and possible inheritance
  s = tickParents(s)

  // Sibling aging
  s = tickSiblings(s)

  // Pet aging
  s = tickPets(s)

  // Asset appreciation/depreciation/maintenance
  s = tickAssets(s)

  // Partner aging and natural death
  s = tickPartner(s)

  // Undocumented / overstay annual pressure
  if (s.residencyStatus === 'undocumented' || s.residencyStatus === 'tourist_overstay') {
    s.stats = { ...s.stats, health: clamp((s.stats.health ?? 80) - 2, 0, 100), happiness: clamp((s.stats.happiness ?? 50) - 3, 0, 100) }
    s.money = (s.money ?? 0) - 200
  }

  // Fame decay if not in entertainment/sports
  s = tickFame(s)

  // World events
  s = applyWorldEvents(s)

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

  // Illness risk check
  s = checkIllnessRisk(s)

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
    const annual = s.career.partTime ? Math.round(s.career.salary * 0.5) : s.career.salary
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
// Generates 3–4 sentences of present-tense prose from accumulated flags.
// Displayed in the Stats tab and regenerated each year.
// Logic parallels generateEpitaph but is present-tense and non-evaluative:
// it describes, it doesn't judge.
export function generateIdentityCard(state) {
  const F = new FlagSet(state.flags ?? [])
  const { age, partner, children, career, education } = state
  const G = buildG(state)
  const country = G.currentCountry ?? state.character?.country
  const birthCountry = state.character?.country
  const phase = getPhase(age)
  const sentences = []

  // Sentence 1: Age + location + occupation
  let s1 = `You are ${age} years old`
  if (country) s1 += `, living in ${country.name}`
  if (career) s1 += `. You work as a ${career.title}`
  else if (state.retired) s1 += `. You are retired`
  else if (education?.enrolled) s1 += `. You are studying`
  else if (phase === 'early_childhood' || phase === 'childhood') s1 += `. You are a child`
  else if (phase === 'adolescence') s1 += `. You are a teenager`
  sentences.push(s1 + '.')

  // Sentence 2: Family / relationship status
  if (state.inPrison) {
    sentences.push('You are currently in prison.')
  } else if (partner?.married) {
    let s2 = `You are married to ${partner.name}`
    if ((children ?? []).length > 0) s2 += ` and have ${children.length === 1 ? 'a child' : `${children.length} children`}`
    sentences.push(s2 + '.')
  } else if (partner && !partner.married) {
    let s2 = `You are with ${partner.name}`
    if ((children ?? []).length > 0) s2 += ` and have ${children.length === 1 ? 'a child' : `${children.length} children`}`
    sentences.push(s2 + '.')
  } else if (F.has('widowed') || F.has('partner_died')) {
    const c = (children ?? []).length
    sentences.push(c > 0 ? `You are widowed, with ${c === 1 ? 'one child' : `${c} children`}.` : 'You are widowed.')
  } else if (F.has('divorced')) {
    const c = (children ?? []).length
    sentences.push(c > 0 ? `You are divorced, with ${c === 1 ? 'one child' : `${c} children`}.` : 'You are divorced.')
  } else if ((children ?? []).length > 0) {
    const c = children.length
    sentences.push(`You are single and have ${c === 1 ? 'a child' : `${c} children`}.`)
  }

  // Sentence 3: Most significant identity marker (priority order)
  if (F.has('emigrated') && birthCountry && country && birthCountry.name !== country.name) {
    const yrs = G.yearsAbroad ?? 0
    sentences.push(yrs >= 10
      ? `You left ${birthCountry.name} ${yrs} years ago. It is in your dreams more than you expected.`
      : `You left ${birthCountry.name} ${yrs} year${yrs !== 1 ? 's' : ''} ago. You are still finding your footing.`)
  } else if (F.has('holocaust_survived') || F.has('genocide_survived') || F.has('gulag_survived')) {
    sentences.push('You have survived things that most people only read about.')
  } else if (F.has('lost_child')) {
    sentences.push('You lost a child. That does not become a past thing.')
  } else if (F.has('lgbtq_identity') || F.has('orientation_gay') || F.has('orientation_bisexual')) {
    sentences.push(G.lgbtqCriminalized
      ? 'You are queer in a country where that is not safe to name.'
      : 'Being queer is simply part of who you are.')
  } else if (F.has('cancer_survivor')) {
    sentences.push('You are a cancer survivor. The word still fits differently than you expected.')
  } else if (F.has('fled_child_marriage')) {
    sentences.push('You refused the life that was arranged for you.')
  } else if (F.has('defied_caste') && G.casteSystem) {
    sentences.push('You have built a life outside the position you were born into.')
  } else if (F.has('first_gen_university') && career) {
    sentences.push('You were the first in your family to go to university. The gap that made did not close entirely.')
  } else if (F.has('communist_childhood') && G.currentYear >= 1991) {
    sentences.push('You grew up certain of things the world is no longer certain of.')
  } else if (F.has('authoritarian_childhood') && G.career) {
    sentences.push('You grew up in a place that taught you to read a room before you spoke in it.')
  } else if (F.has('experienced_racism') && G.career) {
    sentences.push('You have spent years navigating rooms that weren\'t built with you in mind.')
  }

  // Sentence 4: Belief / worldview / something quietly earned
  if (F.has('lost_faith') || F.has('apostasy')) {
    sentences.push('You left your faith behind. The shape it occupied is still there.')
  } else if (F.has('faith_deepened') || F.has('religion_returned')) {
    sentences.push('Your faith has become more important, not less, as you\'ve gotten older.')
  } else if (F.has('abusive_relationship') && partner) {
    sentences.push('You know the difference between fear and caution now. That took time.')
  } else if (F.has('went_to_therapy') && !F.has('lgbtq_identity')) {
    sentences.push('You have done the work of looking at yourself honestly. That is not nothing.')
  } else if (F.has('mentor')) {
    sentences.push('You have been someone\'s first real break. You remember what that felt like.')
  } else if (F.has('philanthropist')) {
    sentences.push('You give money away deliberately. This is not accidental.')
  } else if (F.has('long_marriage') || (partner?.married && (partner?.years ?? 0) > 20)) {
    sentences.push('You have been married for a long time. That is its own kind of work.')
  } else if (F.has('career_fulfilled') && career) {
    sentences.push('The work is genuinely good. You don\'t say that often, but you know it.')
  }

  return sentences.length > 1 ? sentences.join(' ') : null
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
  const { fame, assets, siblings } = state
  const lines = []

  // — Opening line —
  if (age < 20) {
    lines.push(`${name} was born in ${country} and was gone at ${age} — a life that barely had time to begin.`)
  } else if (age < 40) {
    lines.push(`${name} was born in ${country} and died at ${age}, far too young.`)
  } else {
    lines.push(`${name} was born in ${country} and lived to the age of ${age}.`)
  }

  // — Childhood and origins —
  if (flags.includes('war_childhood') || flags.includes('conflict_zone_birth')) {
    lines.push(`${He} came into the world amid conflict, and it left a mark that never fully healed.`)
  }
  if (flags.includes('lost_parent_young') || flags.includes('orphaned')) {
    lines.push(`${He} lost a parent before forming a clear memory of them — an absence that shaped everything quietly.`)
  }
  if (flags.includes('poverty_childhood') || flags.includes('food_insecurity')) {
    lines.push(`The early years were lean. ${He} knew hunger.`)
  }
  if (flags.includes('secure_childhood')) {
    lines.push(`${He} was given a childhood with warmth in it, something ${he} tried to pass on.`)
  }

  // — Displacement and migration —
  if (flags.includes('refugee') || flags.includes('displaced')) {
    lines.push(`${He} was displaced — carried across borders by forces larger than any single life.`)
  } else if (flags.includes('emigrated') || flags.includes('diaspora')) {
    lines.push(`${He} left ${country} in search of something different. ${He} found it, at a cost.`)
  }

  // — Dark path: crime, violence, incarceration —
  if (flags.includes('convicted_murder') || flags.includes('murderer')) {
    lines.push(`${He} killed someone. It defined ${him} in ways ${he} spent the rest of ${his} life either fleeing or accepting.`)
  } else if (flags.includes('convicted_manslaughter')) {
    lines.push(`${He} caused a death — whether by accident or recklessness, the courts had a word for it.`)
  } else if (flags.includes('violent_criminal') || flags.includes('assault_record')) {
    lines.push(`${He} had a capacity for violence that got ${him} into serious trouble.`)
  }
  if (flags.includes('incarcerated') || flags.includes('served_time') || flags.includes('prison_phone')) {
    lines.push(`${He} served time. Prison changed ${him}, as it always does.`)
  } else if (flags.includes('escaped_prisoner')) {
    lines.push(`${He} escaped from prison and lived as a fugitive — a chapter most people would find hard to believe.`)
  }
  if (flags.includes('drug_addiction') || flags.includes('alcohol_addiction') || flags.includes('addiction')) {
    if (flags.includes('addiction_recovered') || flags.includes('sobriety')) {
      lines.push(`${He} fought an addiction and won — though the fight never fully ended.`)
    } else {
      lines.push(`${He} struggled with addiction. It cost ${him} things ${he} never got back.`)
    }
  }
  if (flags.includes('gang_member') || flags.includes('organized_crime')) {
    lines.push(`${He} ran with people the law had a file on. Some of that life ${he} chose; some chose ${him}.`)
  }

  // — Relationships —
  if (flags.includes('strong_marriage') && partner) {
    lines.push(`${He} loved ${partner.name} with a steadiness that was its own kind of achievement.`)
  } else if (partner && !flags.includes('divorced')) {
    lines.push(`${He} shared ${his} life with ${partner.name}.`)
  } else if (flags.includes('divorced') || flags.includes('divorce')) {
    lines.push(`${He} married, and the marriage ended — a chapter ${he} rarely spoke of directly.`)
  } else if (flags.includes('heartbroken') || flags.includes('lost_love')) {
    lines.push(`${He} loved someone ${he} couldn't hold onto. It stayed with ${him}.`)
  }
  if (children?.length > 0) {
    const n = children.length
    lines.push(`${He} ${flags.includes('absent_parent') ? 'fathered' : 'raised'} ${n === 1 ? 'a child' : `${n} children`}.`)
  }

  // — Integrity and moral arc —
  if (flags.includes('corruption_exposed') || flags.includes('bribery') || flags.includes('fraud')) {
    lines.push(`${He} was caught in a corruption scandal. The reputation never fully recovered.`)
  } else if (flags.includes('compromised') || flags.includes('sold_out')) {
    lines.push(`${He} made choices ${he} couldn't fully justify later.`)
  } else if (flags.includes('integrity') && flags.includes('trusted_person')) {
    lines.push(`People trusted ${name}. That is rarer than it sounds.`)
  } else if (flags.includes('whistleblower')) {
    lines.push(`${He} exposed something that needed exposing, at considerable personal cost.`)
  }

  // — Identity and hardship —
  if (flags.includes('lgbtq_persecuted') || flags.includes('arrested_for_orientation')) {
    lines.push(`${He} was persecuted for who ${he} was. ${He} endured it.`)
  } else if (flags.includes('came_out') || flags.includes('lgbtq_accepted')) {
    lines.push(`${He} lived openly as ${he} was, which was not always easy.`)
  }
  if (flags.includes('genocide_survivor') || flags.includes('tutsi_hidden') || flags.includes('apartheid_pass_book')) {
    lines.push(`${He} survived something that destroyed many of the people around ${him}.`)
  }
  if (flags.includes('caste_discrimination') || flags.includes('dalit_discrimination')) {
    lines.push(`${He} spent ${his} life fighting a hierarchy ${he} was born into.`)
  }

  // — Education and career —
  if (flags.includes('first_gen_graduate')) {
    lines.push(`${He} was the first in ${his} family to earn a university degree.`)
  } else if (flags.includes('university_graduate')) {
    lines.push(`Education was the thread ${he} pulled hardest on.`)
  } else if (flags.includes('school_dropout') || flags.includes('expelled')) {
    lines.push(`${He} left school early. Whether that was a choice or a consequence depends who you ask.`)
  }
  if (career) {
    const careerDef = CAREERS.find(c => c.id === career.id)
    if (careerDef) lines.push(`${He} spent ${his} working years as a ${career.title}.`)
  }

  // — Fame and wealth —
  if (fame > 70) {
    lines.push(`${He} was famous. The kind of famous that changes what it means to walk into a room.`)
  } else if (fame > 40) {
    lines.push(`In certain circles, ${name} was well-known.`)
  }
  if (money > 5000000) {
    lines.push(`${He} built serious wealth — $${(money / 1000000).toFixed(1)}M — though what it cost ${him} is harder to measure.`)
  } else if (money > 1000000) {
    lines.push(`${He} left behind $${(money / 1000000).toFixed(2)}M.`)
  } else if (flags.includes('destitute') || flags.includes('homeless')) {
    lines.push(`${He} died with almost nothing. The circumstances were not entirely of ${his} making.`)
  }
  const propertyCount = assets?.properties?.length ?? 0
  if (propertyCount >= 3) {
    lines.push(`${He} owned ${propertyCount} properties. That meant something to ${him}.`)
  }

  // — Immigration and citizenship —
  if (flags.includes('achieved_citizen') || (state.residencyStatus === 'citizen' && flags.includes('emigrated'))) {
    lines.push(`${He} earned citizenship in an adopted country — paperwork that meant more than its bureaucratic weight.`)
  } else if (flags.includes('sought_asylum') && flags.includes('refugee_status')) {
    lines.push(`${He} fled and was granted refuge. The years of waiting between were their own kind of sentence.`)
  } else if (flags.includes('illegal_immigrant') && !flags.includes('achieved_citizen')) {
    lines.push(`${He} lived without papers in a country that barely acknowledged ${his} existence, and built a life there anyway.`)
  }

  // — Mental health —
  if (flags.includes('depression_managed') || flags.includes('anxiety_managed')) {
    lines.push(`${He} lived with a condition that made ordinary things harder. ${He} managed it more often than not.`)
  }

  // — Grief carried —
  if (flags.includes('lost_child')) {
    lines.push(`${He} outlived a child. There is no adequate sentence for this.`)
  } else if (flags.includes('lost_partner')) {
    lines.push(`${He} lost the person ${he} had built a life with, and had to learn what came after.`)
  }

  // — Climate witness —
  if (flags.includes('witnessed_climate_change') && flags.includes('disaster_survivor')) {
    lines.push(`${He} lived through the consequences of a warming world. The century ${he} was born into was not the century ${he} died in.`)
  }

  // — LGBTQ life —
  if (flags.includes('lgbtq_identity') && flags.includes('lgbtq_out_family')) {
    lines.push(`${He} came out, at a cost that varied depending on who was in the room.`)
  } else if (flags.includes('lgbtq_identity') && flags.includes('lgbtq_criminalized_country')) {
    lines.push(`${He} lived in a country that criminalised what ${he} was. ${He} navigated it.`)
  }

  // — Career under regime —
  if (flags.includes('journalism_threat') || flags.includes('censored')) {
    lines.push(`${He} worked in journalism and learned what it costs to tell the truth in a place that prefers silence.`)
  }
  if (flags.includes('story_killed')) {
    lines.push(`There was a story ${he} knew and could not publish. ${He} carried it.`)
  }

  // — Faith —
  if (flags.includes('completed_hajj')) {
    lines.push(`${He} made the pilgrimage to Mecca. Whatever ${he} went looking for, ${he} found something.`)
  } else if (flags.includes('left_religion') && flags.includes('faith_crisis')) {
    lines.push(`${He} walked away from the faith ${he} was raised in. It was not a small thing.`)
  } else if (flags.includes('faith_deepened')) {
    lines.push(`${His} faith grew rather than dimmed with age — the kind that asks hard questions and survives them.`)
  }

  // — End of life —
  if (flags.includes('found_meaning') || flags.includes('acceptance') || flags.includes('peace')) {
    lines.push(`Near the end, ${name} seemed at peace with the shape ${his} life had taken.`)
  } else if (flags.includes('life_reviewed')) {
    lines.push(`${He} reviewed the life honestly before the end.`)
  } else if (regret > 75) {
    lines.push(`${He} died carrying a weight that had no name — a persistent sense that something essential had been missed.`)
  } else if (regret > 50) {
    lines.push(`${He} carried some regrets. Most people do.`)
  }

  // — Business and entrepreneurship —
  if (flags.includes('sold_business')) {
    lines.push(`${He} built a business and sold it — the particular satisfaction of making something from nothing.`)
  } else if (flags.includes('business_failed') && flags.includes('business_restart')) {
    lines.push(`${He} built a business, watched it fail, and built another. The second time went better.`)
  } else if (flags.includes('owns_business') || flags.includes('entrepreneur')) {
    lines.push(`${He} ran ${his} own business — the specific freedom and weight of that.`)
  }

  // — Family bonds —
  if (flags.includes('sibling_bond_strong')) {
    lines.push(`${He} maintained a close bond with ${his} siblings — a relationship that outlasted many of the other constants.`)
  }
  if (flags.includes('long_marriage') || (partner && flags.includes('strong_marriage'))) {
    lines.push(`${He} was married for a long time. The length of it was its own statement.`)
  }

  // — Language and heritage —
  if (flags.includes('heritage_language_preserved')) {
    lines.push(`${He} kept the first language alive, even in a country that did not need it.`)
  }

  // — Recovery and sobriety —
  if (flags.includes('recovery_established') || (flags.includes('in_recovery') && flags.includes('rehab_graduate'))) {
    lines.push(`${He} achieved sobriety and held it. That is harder than it sounds.`)
  }

  // — Technology and modernity —
  if (flags.includes('mobile_money_user')) {
    lines.push(`${He} was part of the generation that skipped the bank and went straight to the phone.`)
  }

  // — Retirement —
  if (flags.includes('retired_comfortable')) {
    lines.push(`${He} retired with enough. The enough was earned through decades of small decisions.`)
  } else if (flags.includes('financial_hardship_late')) {
    lines.push(`The final years were financially constrained in ways ${he} had not fully anticipated.`)
  }

  // — Rural-to-urban —
  if (flags.includes('rural_to_urban')) {
    lines.push(`${He} made the move from village to city — the defining migration of ${his} generation in that part of the world.`)
  }

  // — Discrimination and resilience —
  if (flags.includes('experienced_discrimination') || flags.includes('gender_barrier_faced')) {
    lines.push(`${He} encountered barriers that others did not. ${He} found ways through them.`)
  }

  // — Adolescent foundations —
  if (flags.includes('talent_discovered')) {
    lines.push(`${He} found a talent young and spent the rest of ${his} life seeing where it led.`)
  }
  if (flags.includes('political_awareness_early')) {
    lines.push(`${He} understood early what kind of country ${he} was living in. The understanding shaped everything after.`)
  }

  // — Historical witnesses —
  if (flags.includes('partition_survivor') || flags.includes('partition_refugee')) {
    lines.push(`${He} lived through the Partition — one of the largest forced migrations in human history.`)
  }
  if (flags.includes('cultural_revolution_survived')) {
    lines.push(`${He} survived the Cultural Revolution, which required a particular calibration of public and private self.`)
  }
  if (flags.includes('post_apartheid_generation')) {
    lines.push(`${He} cast a vote in the first free election. ${He} knew what it had cost to get there.`)
  }

  // — Fertility and loss —
  if (flags.includes('multiple_miscarriage') || flags.includes('experienced_miscarriage')) {
    lines.push(`${He} lost pregnancies. The losses were private and not small.`)
  }
  if (flags.includes('chose_childless')) {
    lines.push(`${He} chose not to have children. It was a complete answer.`)
  }
  if (flags.includes('ivf_success')) {
    lines.push(`The family ${he} built required significant persistence to build.`)
  }

  // — Survivors —
  const livingSiblings = (siblings ?? []).filter(s => s.alive).length
  if (livingSiblings > 0) {
    lines.push(`${He} left behind ${livingSiblings} sibling${livingSiblings > 1 ? 's' : ''}.`)
  }

  // — Fallback: only if we have very few lines —
  if (lines.length < 3) {
    if (stats.happiness > 70) {
      lines.push(`By most measures, ${name} lived a good life.`)
    } else {
      lines.push(`${name}'s life was shaped by circumstances ${he} did not choose and decisions ${he} made from within them.`)
    }
  }

  return lines.join(' ')
}
