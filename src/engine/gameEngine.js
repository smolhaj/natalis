import { COUNTRIES } from '../data/countries'
import { EVENTS } from '../data/events'
import { WORLD_EVENTS } from '../data/worldEvents'
import { RIBBONS } from '../data/ribbons'
import { ACTIVITIES } from '../data/activities'
import { CRIMES } from '../data/crimes'
import { CAREERS } from '../data/careers'
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

  const traits = {
    intel: overrides.traits?.intel ?? randomBetween(3, 10),
    con:   overrides.traits?.con   ?? randomBetween(3, 10),
    res:   overrides.traits?.res   ?? randomBetween(3, 10),
    cha:   overrides.traits?.cha   ?? randomBetween(3, 10),
  }

  return {
    firstName,
    surname,
    name: `${firstName} ${surname}`,
    country,
    gender,
    birthYear,
    wealthTier,
    familyStability,
    familySize,
    traits,
  }
}

export function deriveInitialStats(char) {
  const { wealthTier, familyStability, traits, country } = char

  const hcBonus = { excellent: 15, good: 8, fair: 0, poor: -10, very_poor: -20 }[country.healthcare] ?? 0
  const health = clamp(55 + (traits.con - 5) * 4 + hcBonus, 15, 100)

  const stabBonus = { secure: 12, stable: 4, struggling: -5, unstable: -15 }[familyStability] ?? 0
  const mental = clamp(55 + (traits.res - 5) * 4 + stabBonus, 10, 100)

  const wealth = clamp(wealthTier * 18 + randomBetween(-4, 4), 0, 100)

  const education = 0

  const social = clamp(50 + (traits.cha - 5) * 4, 20, 80)

  return { health, mental, wealth, education, social }
}

// ─── Stat proxy ───────────────────────────────────────────────────────────────

function createProxy(state) {
  // Use copies so effect functions can mutate proxy.flags safely without touching state
  return {
    h: 0, m: 0, w: 0, e: 0, s: 0, r: 0,
    flags: [...state.flags],
    mem: { ...state.mem },
  }
}

function applyProxy(state, proxy) {
  const stats = {
    health:    clamp(state.stats.health    + proxy.h, 0, 100),
    mental:    clamp(state.stats.mental    + proxy.m, 0, 100),
    wealth:    clamp(state.stats.wealth    + proxy.w, 0, 100),
    education: clamp(state.stats.education + proxy.e, 0, 100),
    social:    clamp(state.stats.social    + proxy.s, 0, 100),
  }
  const regret = clamp(state.regret + proxy.r, 0, 100)
  const flags = [...new Set(proxy.flags)]
  return { ...state, stats, regret, flags, mem: proxy.mem }
}

function buildEffectProxy(state) {
  const proxy = createProxy(state)
  // addFlag is a convenience method; direct p.flags.push() also works
  proxy.addFlag = (flag) => {
    if (!proxy.flags.includes(flag)) proxy.flags.push(flag)
  }
  // setEducation allows events to advance education level
  proxy.setEducation = (level, field = null) => {
    proxy._newEducation = { level, field: field ?? state.education.field }
  }
  // setCareer allows events to grant or change a career
  proxy.setCareer = (careerId) => {
    proxy._newCareerId = careerId
  }
  return proxy
}

function resolveProxyExtras(state, proxy) {
  let next = state
  if (proxy._newEducation) {
    next = { ...next, education: proxy._newEducation }
  }
  if (proxy._newCareerId) {
    next = enterCareer(next, proxy._newCareerId)
  }
  return next
}

// ─── Event system ─────────────────────────────────────────────────────────────

export function getNextEvent(state) {
  const phase = getPhase(state.age)
  const G = buildG(state)

  // Check injected queue first
  const queueMatch = state.queue.find(e =>
    e.phase === phase &&
    !state.usedEventIds.has(e.id) &&
    (!e.when || e.when(G))
  )
  if (queueMatch) return queueMatch

  // Build pool: base events + active career's profession-specific events
  let pool = EVENTS.filter(e =>
    e.phase === phase &&
    !state.usedEventIds.has(e.id) &&
    (!e.when || e.when(G))
  )

  if (state.career) {
    const careerDef = CAREERS.find(c => c.id === state.career.id)
    if (careerDef?.events?.length) {
      const careerEvents = careerDef.events.filter(e =>
        e.phase === phase &&
        !state.usedEventIds.has(e.id) &&
        (!e.when || e.when(G))
      )
      pool = [...pool, ...careerEvents]
    }
  }

  if (pool.length === 0) return null

  // Weighted random selection
  const totalWeight = pool.reduce((sum, e) => sum + (e.weight ?? 1), 0)
  let r = Math.random() * totalWeight
  for (const event of pool) {
    r -= event.weight ?? 1
    if (r <= 0) return event
  }
  return pool[pool.length - 1]
}

// Build a read-only G object for when() functions
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
  }
}

// ─── World events ─────────────────────────────────────────────────────────────

function applyWorldEvents(state) {
  let updated = { ...state }
  const G = buildG(state)

  for (const we of WORLD_EVENTS) {
    if (updated.worldEventsFired.has(we.id)) continue
    if (state.currentYear < we.years[0] || state.currentYear > we.years[1]) continue

    const archetypesMatch =
      we.archetypes === 'all' ||
      we.archetypes.includes(state.character.country.archetype)

    const countryMatch =
      !we.countries ||
      we.countries.includes(state.character.country.name)

    if (!archetypesMatch || !countryMatch) continue
    if (we.minAge && state.age < we.minAge) continue
    if (we.maxAge && state.age > we.maxAge) continue
    if (we.when && !we.when(G)) continue

    const proxy = buildEffectProxy(updated)
    we.effect(proxy)
    updated = applyProxy(updated, proxy)
    updated.worldEventsFired = new Set([...updated.worldEventsFired, we.id])
    updated.log = [
      ...updated.log,
      { age: updated.age, text: `[World Event] ${we.narrative}`, isKey: true, isWorld: true },
    ]
    if (we.addFlags) {
      updated.flags = [...new Set([...updated.flags, ...we.addFlags])]
    }
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
    if (stats.mental < 15) prob += 0.02
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

  if (!chance(prob)) return { dead: false }

  const cause = determineCause(state)
  return { dead: true, cause }
}

function determineCause({ age, stats, flags, character }) {
  if (age < 5) return 'complications in early childhood'
  if (flags.includes('child_soldier') && age < 18) return 'caught in armed conflict'
  if (character.country.conflictRisk > 0.15 && age < 30 && chance(0.3)) return 'killed in conflict'
  if (flags.includes('criminal_life') && age < 40 && chance(0.3)) return 'violence related to criminal activity'
  if (stats.mental < 15 && age < 45 && chance(0.4)) return 'suicide'
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
  const G = buildG(state)
  return CAREERS.filter(career => {
    if (career.requirements.minAge && state.age < career.requirements.minAge) return false
    if (career.requirements.education !== 'none') {
      const eduOrder = ['none', 'primary', 'secondary', 'university', 'graduate']
      const playerEdu = eduOrder.indexOf(state.education.level)
      const reqEdu = eduOrder.indexOf(career.requirements.education)
      if (playerEdu < reqEdu) return false
      if (career.requirements.field && state.education.field !== career.requirements.field) return false
    }
    if (career.requirements.minIntelligence && state.character.traits.intel < career.requirements.minIntelligence) return false
    if (career.gdpRequired && career.gdpRequired !== 'any') {
      const gdpOrder = ['very_low', 'low', 'low_medium', 'medium', 'medium_high', 'high', 'very_high']
      const countryGdp = gdpOrder.indexOf(state.character.country.gdp)
      const reqGdp = gdpOrder.indexOf(career.gdpRequired)
      if (countryGdp < reqGdp) return false
    }
    if (Array.isArray(career.archetypeAvailable) && !career.archetypeAvailable.includes(state.character.country.archetype)) return false
    if (state.career && state.career.id === career.id) return false
    return true
  })
}

export function enterCareer(state, careerId) {
  const career = CAREERS.find(c => c.id === careerId)
  if (!career) return state
  const level = career.levels[0]
  const salary = randomBetween(level.salaryRange[0], level.salaryRange[1])
  const wealthGain = Math.round(salary / 50000 * 8)
  const newCareer = { id: career.id, title: level.title, level: 0, salary, field: career.field, yearsInRole: 0 }
  const log = [...state.log, { age: state.age, text: `You begin working as a ${level.title}.`, isKey: true }]
  const stats = { ...state.stats, wealth: clamp(state.stats.wealth + wealthGain, 0, 100) }
  return { ...state, career: newCareer, stats, log }
}

export function checkPromotion(state) {
  if (!state.career) return state
  const careerDef = CAREERS.find(c => c.id === state.career.id)
  if (!careerDef) return state
  const nextLevelIndex = state.career.level + 1
  if (nextLevelIndex >= careerDef.levels.length) return state // already at top

  const baseChance = careerDef.promotionChance ?? 0.15
  const intelBonus = (state.character.traits.intel - 5) * 0.02
  const yearsBonus = Math.min(state.career.yearsInRole * 0.03, 0.15)
  if (!chance(baseChance + intelBonus + yearsBonus)) return state

  const newLevel = careerDef.levels[nextLevelIndex]
  const salary = randomBetween(newLevel.salaryRange[0], newLevel.salaryRange[1])
  const career = { ...state.career, level: nextLevelIndex, title: newLevel.title, salary, yearsInRole: 0 }
  const wealthGain = 5
  const log = [...state.log, { age: state.age, text: `You are promoted to ${newLevel.title}.`, isKey: true }]
  const stats = { ...state.stats, wealth: clamp(state.stats.wealth + wealthGain, 0, 100) }
  return { ...state, career, stats, log }
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
  if (activity.cost) proxy.w -= activity.cost / 10
  activity.effect(proxy)
  let updated = applyProxy(state, proxy)
  updated = resolveProxyExtras(updated, proxy)
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

  const archetypeMod = crime.archetypeModifier?.[state.character.country.archetype] ?? 0
  const arrestProb = clamp(crime.arrestRisk + archetypeMod, 0.01, 0.99)

  let updated = { ...state, actionsThisYear: state.actionsThisYear + 1 }

  if (chance(arrestProb)) {
    // Caught
    const proxy = buildEffectProxy(updated)
    crime.caughtEffect(proxy)
    updated = applyProxy(updated, proxy)
    const sentence = randomBetween(crime.sentence.min, crime.sentence.max)
    updated.criminalRecord = [...updated.criminalRecord, crime.criminalRecordEntry]
    if (crime.addFlag) updated.flags = [...new Set([...updated.flags, crime.addFlag])]
    if (updated.career && ['petty', 'property', 'violent', 'drug', 'organized'].includes(crime.category)) {
      updated.log = [...updated.log, { age: state.age, text: `You are arrested for ${crime.name.toLowerCase()}. You lose your job.`, isKey: true }]
      updated.career = null
    } else {
      updated.log = [...updated.log, { age: state.age, text: `You are arrested for ${crime.name.toLowerCase()}.`, isKey: true }]
    }
    if (sentence > 0) {
      updated.inPrison = true
      updated.prisonSentence = sentence
      updated.log = [...updated.log, { age: state.age, text: `You are sentenced to ${sentence} year${sentence > 1 ? 's' : ''} in prison.`, isKey: true }]
    }
  } else {
    // Got away
    const proxy = buildEffectProxy(updated)
    crime.successEffect(proxy)
    updated = applyProxy(updated, proxy)
    if (crime.addFlag) updated.flags = [...new Set([...updated.flags, crime.addFlag])]
    updated.log = [...updated.log, { age: state.age, text: `You ${crime.name.toLowerCase()} and get away with it.`, isKey: false }]
  }

  return updated
}

// ─── Main tick ────────────────────────────────────────────────────────────────

export function tick(state) {
  let s = {
    ...state,
    age: state.age + 1,
    currentYear: state.currentYear + 1,
    actionsThisYear: 0,
  }

  // Prison year — health can still deteriorate behind bars
  if (s.inPrison) {
    s.stats = { ...s.stats, health: clamp(s.stats.health - 1, 0, 100), mental: clamp(s.stats.mental - 2, 0, 100) }
    const deathInPrison = checkDeath(s)
    if (deathInPrison.dead) {
      const ribbon = assignRibbon(s)
      return { ...s, dead: true, causeOfDeath: `${deathInPrison.cause} (in prison)`, ribbon, screen: 'death' }
    }
    const remaining = s.prisonSentence - 1
    if (remaining <= 0) {
      s.inPrison = false
      s.prisonSentence = 0
      s.log = [...s.log, { age: s.age, text: 'You are released from prison.', isKey: true }]
    } else {
      s.prisonSentence = remaining
      s.log = [...s.log, {
        age: s.age,
        text: `Another year behind bars. ${remaining} year${remaining === 1 ? '' : 's'} remain on your sentence.`,
        isKey: false,
      }]
    }
    return s
  }

  // World events
  s = applyWorldEvents(s)

  // Death check
  const death = checkDeath(s)
  if (death.dead) {
    const ribbon = assignRibbon(s)
    return { ...s, dead: true, causeOfDeath: death.cause, ribbon, screen: 'death' }
  }

  // Career progression
  if (s.career) {
    s.career = { ...s.career, yearsInRole: s.career.yearsInRole + 1 }
    s = checkPromotion(s)
  }

  // Career income (annual)
  if (s.career) {
    const annualGain = Math.round(s.career.salary / 50000 * 3)
    s.stats = { ...s.stats, wealth: clamp(s.stats.wealth + annualGain, 0, 100) }
  }

  // Get next event
  const event = getNextEvent(s)
  if (!event) {
    s.pendingEvent = null
    s.log = [...s.log, { age: s.age, text: `A quiet year passes.`, isKey: false }]
    return s
  }

  // Remove from queue if it came from there
  if (s.queue.some(e => e.id === event.id)) {
    s.queue = s.queue.filter(e => e.id !== event.id)
  }

  s.usedEventIds = new Set([...s.usedEventIds, event.id])

  // Automatic event (no choices)
  if (!event.choices || event.choices.length === 0) {
    const proxy = buildEffectProxy(s)
    if (event.effect) event.effect(proxy)
    s = applyProxy(s, proxy)
    s = resolveProxyExtras(s, proxy)
    s.log = [...s.log, { age: s.age, text: event.text, isKey: false }]
    return s
  }

  // Choice event — pause for player
  s.pendingEvent = event
  return s
}

export function resolveChoice(state, choiceIndex) {
  const { pendingEvent } = state
  if (!pendingEvent || !pendingEvent.choices) return state

  const choice = pendingEvent.choices[choiceIndex]
  if (!choice) return state

  const proxy = buildEffectProxy(state)
  if (choice.effect) choice.effect(proxy)
  let s = applyProxy(state, proxy)
  s = resolveProxyExtras(s, proxy)

  if (choice.tag) s.flags = [...new Set([...s.flags, choice.tag])]

  if (choice.inject) {
    s.queue = [...s.queue, choice.inject]
  }

  s.log = [
    ...s.log,
    { age: state.age, text: `${pendingEvent.text.slice(0, 80)}… — ${choice.outcome}`, isKey: true },
  ]
  s.pendingEvent = null

  return s
}

// ─── Epitaph generator ───────────────────────────────────────────────────────

export function generateEpitaph(state) {
  const { character, flags, stats, regret, age, children, partner, career, education } = state
  const name = character.firstName
  const country = character.country.name
  const gender = character.gender
  const pronoun = gender === 'male' ? 'He' : 'She'
  const possessive = gender === 'male' ? 'his' : 'her'

  const lines = []

  lines.push(`${name} was born in ${country} and lived to the age of ${age}.`)

  if (flags.includes('refugee') || flags.includes('displaced')) {
    lines.push(`${pronoun} knew displacement — the particular grief of watching a home become a memory.`)
  } else if (flags.includes('emigrated')) {
    lines.push(`${pronoun} left ${country} in search of something different, and found it, at a cost.`)
  }

  if (flags.includes('university_graduate') || flags.includes('first_gen_graduate')) {
    if (flags.includes('first_gen_graduate')) {
      lines.push(`${pronoun} was the first in ${possessive} family to finish a university education — a fact that meant more than any degree.`)
    } else {
      lines.push(`Education was the thread ${pronoun} pulled hardest on.`)
    }
  }

  if (flags.includes('strong_marriage') && partner) {
    lines.push(`${pronoun} loved ${partner.name} with a steadiness that was its own kind of achievement.`)
  } else if (flags.includes('divorced')) {
    lines.push(`${pronoun} married, and the marriage ended — a chapter ${pronoun} rarely spoke of directly.`)
  }

  if (children && children.length > 0) {
    const childWord = children.length === 1 ? 'a child' : `${children.length} children`
    lines.push(`${pronoun} raised ${childWord}.`)
    if (flags.includes('reconciled_with_child')) {
      lines.push(`The distance that had grown between ${name} and ${possessive} children was, in the end, closed.`)
    } else if (flags.includes('reluctant_parent')) {
      lines.push(`Parenthood came unexpectedly, and the ambivalence never fully left.`)
    }
  }

  if (flags.includes('integrity') && flags.includes('trusted_person')) {
    lines.push(`People trusted ${name}. That is rarer than it sounds.`)
  } else if (flags.includes('corruption_exposed') || flags.includes('compromised')) {
    lines.push(`${pronoun} made choices ${pronoun} couldn't fully justify later.`)
  }

  if (career) {
    const careerDef = CAREERS.find(c => c.id === career.id)
    if (careerDef) {
      lines.push(`${pronoun} spent ${possessive} working years as a ${career.title}.`)
    }
  }

  if (flags.includes('committed_activist')) {
    lines.push(`${pronoun} believed that private decency was not enough, and acted accordingly.`)
  }

  if (flags.includes('found_meaning') || flags.includes('acceptance')) {
    lines.push(`Near the end, ${name} seemed at peace — not content exactly, but no longer at war with ${possessive} own life.`)
  } else if (regret > 60) {
    lines.push(`${pronoun} carried a weight that had no name, a persistent sense that something had been missed.`)
  }

  if (lines.length < 3) {
    lines.push(`${name} lived a life shaped by circumstances ${pronoun} did not choose and decisions ${pronoun} made from within them.`)
  }

  return lines.join(' ')
}
