import { COUNTRIES } from '../data/countries'
import { DESTINATIONS } from '../data/destinations'
import { CAREERS } from '../data/careers'
import { ACTIVITIES } from '../data/activities'
import { CRIMES } from '../data/crimes'
import { PROPERTY_TYPES, VEHICLE_TYPES } from '../data/assets'
import { ILLNESSES } from '../data/illnesses'
import { PLACES, getPlacesForCountry, pickNeighborhoodTier, pickNamedNeighborhood, getRelocationCost } from '../data/places'
import { randomBetween, pickFrom, clamp, chance } from '../utils/random'
import {
  getPhase, GDP_MULT,
  ADULT_TRAITS, CHILD_TRAITS, pickTraits, PARTNER_OCCUPATIONS, BUSINESS_TYPES,
} from './character'
import {
  buildG, buildEffectProxy, applyProxy, resolveProxyExtras,
} from './tick'

// Re-export enterCareer and getAvailableCareers so callers that import from gameEngine still work
export { enterCareer, getAvailableCareers } from './tick'

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

// BUSINESS_TYPES is imported from './character' and re-exported via gameEngine.js
export { BUSINESS_TYPES } from './character'

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
