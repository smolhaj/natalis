import { COUNTRIES } from '../data/countries'
import { EVENTS } from '../data/events'
import { WORLD_EVENTS } from '../data/worldEvents'
import { RIBBONS } from '../data/ribbons'
import { ACTIVITIES } from '../data/activities'
import { CRIMES } from '../data/crimes'
import { CAREERS } from '../data/careers'
import { PROPERTY_TYPES, VEHICLE_TYPES } from '../data/assets'
import { ILLNESSES } from '../data/illnesses'
import { randomBetween, pickFrom, rollWeighted, clamp, chance } from '../utils/random'

// ─── Phase mapping ────────────────────────────────────────────────────────────

export function getPhase(age) {
  if (age <= 5) return 'early_childhood'
  if (age <= 11) return 'childhood'
  if (age <= 17) return 'adolescence'
  if (age <= 29) return 'young_adult'
  if (age <= 49) return 'midlife'
  return 'late_life'
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

  return {
    firstName, surname, name: `${firstName} ${surname}`,
    country, gender, birthYear, wealthTier, familyStability, familySize,
    initialStats,
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

export function deriveInitialMoney(char) {
  const base = { 0: 0, 1: 300, 2: 2000, 3: 12000, 4: 60000 }
  return (base[char.wealthTier] ?? 0) + randomBetween(-200, 200) * char.wealthTier
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
    },
    father: {
      name: `${fatherFirst} ${altSurname}`,
      currentAge: randomBetween(24, 40),
      alive: fatherPresent,
      relationshipQuality: fatherPresent ? clamp(baseQ + randomBetween(-15, 10), 8, 100) : 0,
    },
  }
}

// ─── Stat proxy ───────────────────────────────────────────────────────────────

function createProxy(state) {
  return {
    h: 0, m: 0, w: 0, e: 0, s: 0, lo: 0, r: 0, mo: 0, karma: 0, fame: 0,
    flags: [...state.flags],
    mem: { ...state.mem },
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
  proxy.addFlag = (flag) => { if (!proxy.flags.includes(flag)) proxy.flags.push(flag) }
  proxy.setEducation = (level, field = null) => {
    proxy._newEducation = { level, field: field ?? state.education.field }
  }
  proxy.setCareer = (careerId) => { proxy._newCareerId = careerId }
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
  proxy.releaseFromPrison = () => { proxy._releaseFromPrison = true }
  proxy.setMentalHealth = (updates) => { proxy._mentalHealthUpdates = { ...(proxy._mentalHealthUpdates ?? {}), ...updates } }
  proxy.practiceHobby = (hobbyId, delta = 1) => {
    if (!proxy._hobbyDeltas) proxy._hobbyDeltas = {}
    proxy._hobbyDeltas[hobbyId] = (proxy._hobbyDeltas[hobbyId] ?? 0) + delta
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
  if (proxy._mentalHealthUpdates) next = { ...next, mentalHealth: { ...(next.mentalHealth ?? {}), ...proxy._mentalHealthUpdates } }
  if (proxy._hobbyDeltas) {
    const hobbies = { ...(next.hobbies ?? {}) }
    for (const [k, v] of Object.entries(proxy._hobbyDeltas)) hobbies[k] = Math.min(100, (hobbies[k] ?? 0) + v)
    next = { ...next, hobbies }
  }
  return next
}

// ─── Event system ─────────────────────────────────────────────────────────────

export function getNextEvent(state) {
  const phase = getPhase(state.age)
  const G = buildG(state)

  const queueMatch = state.queue.find(e =>
    e.phase === phase && !state.usedEventIds.has(e.id) && (!e.when || e.when(G))
  )
  if (queueMatch) return queueMatch

  let pool = EVENTS.filter(e =>
    e.phase === phase && !state.usedEventIds.has(e.id) && (!e.when || e.when(G))
  )

  if (state.career) {
    const careerDef = CAREERS.find(c => c.id === state.career.id)
    if (careerDef?.events?.length) {
      const careerEvents = careerDef.events.filter(e =>
        e.phase === phase && !state.usedEventIds.has(e.id) && (!e.when || e.when(G))
      )
      pool = [...pool, ...careerEvents]
    }
  }

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
  return {
    character: state.character,
    stats: state.stats,
    flags: state.flags,
    regret: state.regret,
    age: state.age,
    currentYear: state.currentYear,
    career: state.career,
    education: state.education,
    partner: state.partner,
    children: state.children,
    mem: state.mem,
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
  }
}

// ─── World events ─────────────────────────────────────────────────────────────

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
    updated.log = [...updated.log, { age: updated.age, text: `[World Event] ${we.narrative}`, isKey: true, isWorld: true }]
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
    if (state.career?.id === career.id) return false
    return true
  })
}

export function enterCareer(state, careerId) {
  const career = CAREERS.find(c => c.id === careerId)
  if (!career) return state
  const level = career.levels[0]
  const salary = randomBetween(level.salaryRange[0], level.salaryRange[1])
  const newCareer = {
    id: career.id, title: level.title, level: 0, salary,
    field: career.field, yearsInRole: 0, performance: 70,
    partTime: career.partTime ?? false,
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
  if (!chance(baseChance + smartsBonus + perfBonus + yearsBonus)) return state

  const newLevel = careerDef.levels[nextIdx]
  const salary = randomBetween(newLevel.salaryRange[0], newLevel.salaryRange[1])
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

function genPartnerName(state, gender) {
  const c = state.character.country
  return `${pickFrom(gender === 'male' ? c.namePool.male : c.namePool.female)} ${pickFrom(c.surnames)}`
}

export function meetPotentialPartner(state) {
  if (state.partner) return { ...state, log: [...state.log, { age: state.age, text: "You already have a partner.", isKey: false }] }
  if (state.age < 16) return state
  const gender = state.character.gender === 'male' ? 'female' : 'male'
  const name = genPartnerName(state, gender)
  const attractScore = (state.stats.looks + state.stats.charisma) / 2
  if (!chance(clamp(attractScore / 100 + 0.1, 0.15, 0.9))) {
    return { ...state, log: [...state.log, { age: state.age, text: `You meet ${name} but nothing sparks.`, isKey: false }] }
  }
  const partner = {
    name, gender,
    age: clamp(state.age + randomBetween(-5, 8), 16, state.age + 10),
    relationshipQuality: randomBetween(45, 72),
    married: false, engaged: false, years: 0,
  }
  return {
    ...state, partner,
    log: [...state.log, { age: state.age, text: `You meet ${name} and begin dating.`, isKey: true }],
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
  return {
    ...state,
    partner: null,
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
    return { ...state, log: [...state.log, { age: state.age, text: "You try for a child — it doesn't happen this year.", isKey: false }] }
  }
  const cGender = chance(0.5) ? 'male' : 'female'
  const c = state.character.country
  const childName = `${pickFrom(cGender === 'male' ? c.namePool.male : c.namePool.female)} ${state.character.surname}`
  const child = { name: childName, gender: cGender, ageAtBirth: state.age, relationshipQuality: 80 }
  return {
    ...state,
    children: [...state.children, child],
    flags: [...new Set([...state.flags, 'parent'])],
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
  const allActivities = [
    ...(ACTIVITIES.mind ?? []),
    ...(ACTIVITIES.body ?? []),
    ...(ACTIVITIES.social ?? []),
    ...(ACTIVITIES.money ?? []),
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
    if (updated.career && ['petty', 'property', 'violent', 'drug', 'organized', 'financial', 'organised'].includes(crime.category)) {
      updated.log = [...updated.log, { age: state.age, text: `You are arrested for ${crime.name.toLowerCase()}. You lose your job.`, isKey: true }]
      updated.career = null
    } else {
      updated.log = [...updated.log, { age: state.age, text: `You are arrested for ${crime.name.toLowerCase()}.`, isKey: true }]
    }
    if (sentence > 0) {
      updated.inPrison = true
      updated.prisonSentence = sentence
      updated.mem = { ...updated.mem, originalSentence: sentence, prisonYearStart: state.age }
      updated.log = [...updated.log, { age: state.age, text: `You are sentenced to ${sentence} year${sentence > 1 ? 's' : ''} in prison.`, isKey: true }]
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
    const sibAge = state.age - sib.ageDiff
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

    if (!chance(prob)) continue

    const event = {
      id: `illness_${illness.id}_${state.age}`,
      phase: getPhase(state.age),
      weight: 10,
      text: `You are diagnosed with ${illness.name}.`,
      choices: illness.treatments.map(t => {
        const willSucceed = Math.random() < t.successChance
        return {
          text: `${t.name}${t.cost > 0 ? ` ($${t.cost.toLocaleString()})` : ' (free)'}`,
          tag: null,
          outcome: willSucceed ? t.outcomeSuccess : t.outcomeFailure,
          effect: (p) => {
            p.mo -= t.cost
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
  let s = {
    ...state,
    age: state.age + 1,
    currentYear: state.currentYear + 1,
    actionsThisYear: 0,
  }

  // Prison year
  if (s.inPrison) {
    s.stats = { ...s.stats, health: clamp(s.stats.health - 1, 0, 100), happiness: clamp(s.stats.happiness - 2, 0, 100) }
    const d = checkDeath(s)
    if (d.dead) {
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
        s.usedEventIds = new Set([...s.usedEventIds, prisonEvent.id])
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

  // Fame decay if not in entertainment/sports
  s = tickFame(s)

  // World events
  s = applyWorldEvents(s)

  // Education progression
  s = tickEnrollment(s)

  // High school graduation at 18
  if (s.age === 18 && !s.flags.includes('graduated_hs') && !s.flags.includes('dropped_out') && !s.flags.includes('child_labor') && !s.flags.includes('left_school_early') && !s.education?.enrolled && !s.usedEventIds.has('hs_graduation')) {
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

  // Illness risk check
  s = checkIllnessRisk(s)

  // Death check
  const death = checkDeath(s)
  if (death.dead) {
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
    s.log = [...s.log, { age: s.age, text: 'A quiet year passes.', isKey: false }]
    return s
  }

  if (s.queue.some(e => e.id === event.id)) s.queue = s.queue.filter(e => e.id !== event.id)
  s.usedEventIds = new Set([...s.usedEventIds, event.id])

  if (!event.choices || event.choices.length === 0) {
    const proxy = buildEffectProxy(s)
    if (event.effect) event.effect(proxy)
    s = applyProxy(s, proxy)
    s = resolveProxyExtras(s, proxy)
    s.log = [...s.log, { age: s.age, text: event.text, isKey: false }]
    return s
  }

  s.pendingEvent = event
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
  s.log = [...s.log, { age: state.age, text: `${pendingEvent.text.slice(0, 80)}… — ${choice.outcome}`, isKey: true }]
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
  if (!state.licenceObtained && typeId !== 'bicycle') {
    return { ...state, log: [...state.log, { age: state.age, text: "You need a driving licence first.", isKey: false }] }
  }
  const type = VEHICLE_TYPES.find(t => t.id === typeId)
  if (!type) return state
  const price = Math.round(randomBetween(type.priceRange[0], type.priceRange[1]))
  if ((state.money ?? 0) < price) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford a ${type.name}.`, isKey: false }] }
  }
  const vehicle = { typeId: type.id, name: type.name, purchasePrice: price, currentValue: price }
  return {
    ...state,
    money: (state.money ?? 0) - price,
    assets: { ...state.assets, vehicles: [...(state.assets?.vehicles ?? []), vehicle] },
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 4, 0, 100) },
    log: [...state.log, { age: state.age, text: `You buy a ${type.name} for $${price.toLocaleString()}.`, isKey: false }],
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

export function emigrate(state, destCountryName) {
  if (state.flags.includes('emigrated')) return state
  const dest = COUNTRIES.find(c => c.name === destCountryName)
  if (!dest) return state
  const moveCost = randomBetween(3000, 15000)
  return {
    ...state,
    money: Math.max(0, (state.money ?? 0) - moveCost),
    flags: [...new Set([...state.flags, 'emigrated'])],
    stats: {
      ...state.stats,
      happiness: clamp(state.stats.happiness - 10, 0, 100),
      charisma: clamp(state.stats.charisma - 5, 0, 100),
      smarts: clamp(state.stats.smarts + 5, 0, 100),
    },
    log: [...state.log, { age: state.age, text: `You emigrate to ${dest.name}. Moving costs: $${moveCost.toLocaleString()}.`, isKey: true }],
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
  const followerDelta = famous ? randomBetween(200, 5000) : randomBetween(-100, 300)
  const newFollowers = Math.max(0, sm.followers + followerDelta)
  const nowVerified = sm.verified || (newFollowers >= 100000 && (state.fame ?? 0) >= 25)
  return {
    ...state,
    socialMedia: { ...sm, followers: newFollowers, verified: nowVerified },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, {
      age: state.age,
      text: followerDelta > 0
        ? `Your post gets traction. Followers: ${newFollowers.toLocaleString()}.${nowVerified && !sm.verified ? ' You\'re now verified!' : ''}`
        : `Your post flops. Followers slip to ${newFollowers.toLocaleString()}.`,
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
    flags: [...new Set([...newFlags, 'rehab_graduate'])],
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
  // Overdose risk for hard drugs
  const overdoseRisk = { heroin: 0.06, cocaine: 0.03, pills: 0.02 }[substance] ?? 0
  if (chance(overdoseRisk)) {
    return {
      ...state,
      money: Math.max(0, (state.money ?? 0) - opt.cost),
      flags: [...new Set([...newFlags, 'overdosed'])],
      stats: { ...state.stats, health: clamp(state.stats.health - 25, 0, 100), happiness: clamp(state.stats.happiness - 10, 0, 100) },
      actionsThisYear: state.actionsThisYear + 1,
      log: [...state.log, { age: state.age, text: `You overdose on ${substance}. Someone finds you in time. Barely.`, isKey: true }],
    }
  }
  return {
    ...state,
    money: Math.max(0, (state.money ?? 0) - opt.cost),
    flags: [...new Set(newFlags)],
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

// ─── Epitaph generator ───────────────────────────────────────────────────────

export function generateEpitaph(state) {
  const { character, flags, stats, regret, age, children, partner, career, money } = state
  const name = character.firstName
  const pronoun = character.gender === 'male' ? 'He' : 'She'
  const possessive = character.gender === 'male' ? 'his' : 'her'
  const lines = []

  lines.push(`${name} was born in ${character.country.name} and lived to the age of ${age}.`)

  if (flags.includes('refugee') || flags.includes('displaced')) {
    lines.push(`${pronoun} knew displacement — the particular grief of watching a home become a memory.`)
  } else if (flags.includes('emigrated')) {
    lines.push(`${pronoun} left ${character.country.name} in search of something different, and found it, at a cost.`)
  }

  if (flags.includes('first_gen_graduate')) {
    lines.push(`${pronoun} was the first in ${possessive} family to finish a university education.`)
  } else if (flags.includes('university_graduate')) {
    lines.push(`Education was the thread ${pronoun} pulled hardest on.`)
  }

  if (flags.includes('strong_marriage') && partner) {
    lines.push(`${pronoun} loved ${partner.name} with a steadiness that was its own kind of achievement.`)
  } else if (flags.includes('divorced')) {
    lines.push(`${pronoun} married, and the marriage ended — a chapter ${pronoun} rarely spoke of directly.`)
  }

  if (children?.length > 0) {
    lines.push(`${pronoun} raised ${children.length === 1 ? 'a child' : `${children.length} children`}.`)
  }

  if (flags.includes('integrity') && flags.includes('trusted_person')) {
    lines.push(`People trusted ${name}. That is rarer than it sounds.`)
  } else if (flags.includes('compromised') || flags.includes('corruption_exposed')) {
    lines.push(`${pronoun} made choices ${pronoun} couldn't fully justify later.`)
  }

  if (career) {
    const careerDef = CAREERS.find(c => c.id === career.id)
    if (careerDef) lines.push(`${pronoun} spent ${possessive} working years as a ${career.title}.`)
  }

  if (money > 1000000) {
    lines.push(`${pronoun} left behind $${(money / 1000000).toFixed(2)}M — a testament to ${possessive} ambitions.`)
  }

  const { fame, assets, siblings } = state
  if (fame > 70) {
    lines.push(`${pronoun} was famous. The kind of famous that changes what it means to walk into a room.`)
  } else if (fame > 40) {
    lines.push(`In certain circles, ${name} was well-known.`)
  }

  const propertyCount = assets?.properties?.length ?? 0
  if (propertyCount >= 3) {
    lines.push(`${pronoun} owned ${propertyCount} properties — a material fact that told its own story.`)
  }

  const livingSiblings = (siblings ?? []).filter(s => s.alive).length
  if (livingSiblings > 0) {
    lines.push(`${pronoun} left behind ${livingSiblings} sibling${livingSiblings > 1 ? 's' : ''}.`)
  }

  if (flags.includes('found_meaning') || flags.includes('acceptance')) {
    lines.push(`Near the end, ${name} seemed at peace.`)
  } else if (regret > 60) {
    lines.push(`${pronoun} carried a weight that had no name, a persistent sense that something had been missed.`)
  }

  if (lines.length < 3) {
    lines.push(`${name} lived a life shaped by circumstances ${pronoun} did not choose and decisions ${pronoun} made from within them.`)
  }

  return lines.join(' ')
}
