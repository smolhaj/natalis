import { EVENTS, EVENTS_BY_PHASE, classifyEvent } from '../data/events'
import { WORLD_EVENTS } from '../data/worldEvents'
import { RIBBONS } from '../data/ribbons'
import { CAREERS } from '../data/careers'
import { CRIMES } from '../data/crimes'
import { PROPERTY_TYPES, VEHICLE_TYPES, localisePrice } from '../data/assets'
import { ILLNESSES } from '../data/illnesses'
import { localCost } from '../data/activities'
import { LIFE_SKELETON_EVENTS } from '../data/events/lifecycle/events_life_skeleton'
import { PLACES, pickNeighborhoodTier, pickNamedNeighborhood } from '../data/places'
import { HEADLINES } from '../data/headlines'
import { SOUNDTRACK } from '../data/soundtrack'
import { randomBetween, pickFrom, clamp, chance } from '../utils/random'
import {
  FlagSet, getPhase, getCountryRegime, isLgbtqCriminalized,
  GDP_MULT, HYPERINFLATION_DRAIN, getHyperinflation,
  calculateHouseholdContribution, tickFamilyIncome,
  ADULT_TRAITS, CHILD_TRAITS, pickTraits, TRAIT_PROSE, BUSINESS_TYPES, partnerOccupation,
  getLifeSkeletonMap, getPhaseEntryMap, deriveSeason,
} from './character'
import { buildYearTexture } from './yearTexture'
import { buildMundaneLayer } from './mundaneLayer'
import { rememberSaid, preferUnsaid } from './prose'
import { tickLifeCourse, secondaryChance, primaryChance } from './lifeCourse'
import { withArticle } from '../utils/countryUtils'
import { suspendedInstitutions, proseFitsInstitutions, institutionExists } from '../data/history.js'
import { wageIndex, inEraMoney, inTodayMoney, eraDrift } from '../data/economy.js'

// What a listed salary is worth where it is paid. The companion question —
// what it is worth WHEN it is paid — is `wageIndex` in economy.js, and the two
// are always applied together.
const gdpSalaryMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.22, low_medium: 0.1, low: 0.055, very_low: 0.03 }

function createProxy(state) {
  return {
    h: 0, m: 0, w: 0, e: 0, s: 0, lo: 0, r: 0, mo: 0, karma: 0, fame: 0, legacy: 0,
    // `mo` is present-day money and is denominated by applyProxy. `moNominal`
    // is money that has ALREADY been denominated — the escape hatch for the
    // handful of engine sites that must show the player a price before they
    // charge it, where scaling twice would charge a different number than the
    // one on the button.
    moNominal: 0,
    flags: [...state.flags],
    mem: { ...(state.mem ?? {}) },
  }
}

/**
 * Diminishing returns for the stats that only ever go up.
 *
 * Health has a ceiling it drifts towards, and money, karma and fame all have
 * events that take them away. Smarts and charisma have neither: a hundred
 * events add +3 here and +6 there across seventy years and nothing subtracts,
 * so both walked to 100 in any life long enough to contain them. Measured over
 * 150 whole lives, smarts had a median of 96 at death and 58% of characters
 * ended at 90 or above — which makes "Brilliant" a description of nearly
 * everyone, and quietly opens every `stats.smarts >= 70` guard in the corpus to
 * the entire population.
 *
 * A gain is scaled by the headroom left above it, so the first ten points cost
 * what they always did and the last ten are most of a life's work. Losses are
 * never scaled: a stroke or a decade of drinking takes what it takes.
 */
export function earnedGain(current, delta) {
  if (delta <= 0) return delta
  const headroom = Math.max(0, 100 - current) / 100
  return delta * (0.25 + 0.75 * headroom)
}

function applyProxy(state, proxy) {
  const stats = {
    health:    clamp(state.stats.health    + proxy.h,  0, 100),
    happiness: clamp(state.stats.happiness + proxy.m,  0, 100),
    wealth:    clamp(state.stats.wealth    + proxy.w,  0, 100),
    // Rounded, because a scaled gain is fractional and the interface prints
    // the number. Rounding each application rather than at display keeps the
    // stored value and the shown value the same thing.
    smarts:    clamp(Math.round(state.stats.smarts   + earnedGain(state.stats.smarts, proxy.e)),  0, 100),
    charisma:  clamp(Math.round(state.stats.charisma + earnedGain(state.stats.charisma, proxy.s)), 0, 100),
    looks:     clamp(state.stats.looks     + proxy.lo, 0, 100),
  }
  const regret  = clamp(state.regret + proxy.r, 0, 100)
  // Every `p.mo` in the corpus is written in present-day dollars — 629 of them,
  // from a 5,000 inheritance to a 40 bus fare. Denominating them here is what
  // lets all 629 stay as written and still land as money of the right year: a
  // windfall in 1950 Lagos arrives as 1950 Lagos money.
  const money   = Math.max(0, (state.money ?? 0) + inEraMoney(proxy.mo ?? 0, liveCountry(state), state.currentYear) + (proxy.moNominal ?? 0))
  const karma   = clamp((state.karma ?? 50) + (proxy.karma ?? 0), 0, 100)
  const fame    = clamp((state.fame ?? 0) + (proxy.fame ?? 0), 0, 100)
  const legacy  = clamp((state.legacy ?? 0) + (proxy.legacy ?? 0), 0, 100)
  const flags   = [...new Set(proxy.flags)]
  return { ...state, stats, regret, money, karma, fame, legacy, flags, mem: proxy.mem }
}

// Being caught means going to trial, not straight to a cell. Exported because
// the activities panel's minigame crimes used to jail the player directly, which
// skipped the entire lawyer/regime/verdict system — the thing that makes the
// legal quality of a country legible from inside a life.
export function buildPendingTrial(state, crime, sentence) {
  // Lawyer fees scale to the economy the character is actually living in.
  const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.18, low_medium: 0.08, low: 0.04, very_low: 0.02 }
  const mult = gdpMult[liveCountry(state)?.gdp] ?? 1.0
  // Denominated, because the figure goes onto a button the player presses and
  // is then taken out of a balance that is already in the money of the year.
  const midFee = inEraMoney(Math.round(clamp(2500 * mult, 100, 25000) / 100) * 100, liveCountry(state), state.currentYear)
  const topFee = inEraMoney(Math.round(clamp(15000 * mult, 500, 150000) / 500) * 500, liveCountry(state), state.currentYear)
  return {
    crimeName: crime.name,
    crimeCategory: crime.category,
    sentence,
    lawyerCosts: { none: 0, mid: midFee, top: topFee },
  }
}

// ─── Where the character actually lives ───────────────────────────────────────
// `character.country` is the frozen BIRTH country. Every economic and mortality
// model used to read it, so emigration changed the prose and nothing else: a
// Nigerian who moved to Germany in 1975 earned Nigerian wages at a German job,
// kept very-poor-healthcare mortality for life, and went on experiencing
// Nigeria's history while Germany's never reached them. Anything about the
// conditions of a life now reads the country the character is living in.
export function liveCountry(state) {
  return state.currentCountry ?? state.character?.country
}

// ─── Health homeostasis ───────────────────────────────────────────────────────
// Health used to be a one-way ratchet: aging, illness, conditions and world
// events all subtracted, and nothing but paid activities ever restored it. A
// life read passively therefore arrived at middle age in single digits and died
// decades early — a 1962 Nigerian life had a median death age of 8. Bodies
// recover. Health now drifts each year toward a ceiling set by age, the
// healthcare available where the character actually lives, fitness, and the
// chronic conditions they carry; a shock still hurts, but it is survivable, and
// a chronic condition settles the body at a permanently lower plateau rather
// than walking it to zero.
const HC_CEILING = { excellent: 1.0, good: 0.95, fair: 0.88, poor: 0.80, very_poor: 0.72 }
const HC_RECOVERY = { excellent: 0.22, good: 0.20, fair: 0.17, poor: 0.13, very_poor: 0.10 }

export function healthCeiling(state) {
  const age = state.age ?? 0
  const country = state.currentCountry ?? state.character?.country
  const hc = country?.healthcare ?? 'fair'
  let ceiling = 95
  if (age > 25) ceiling -= (age - 25) * 0.45
  if (age > 60) ceiling -= (age - 60) * 0.55
  ceiling *= HC_CEILING[hc] ?? 0.88

  for (const c of state.conditions ?? []) {
    const base = c.severity === 'severe' ? 16 : c.severity === 'mild' ? 4 : 9
    ceiling -= c.managed ? base * 0.45 : base
  }
  const flags = state.flags ?? []
  if (flags.includes('addiction') || flags.includes('alcoholic')) ceiling -= 10
  if (flags.includes('smoker')) ceiling -= 6

  const fitness = state.fitness ?? 50
  ceiling += (fitness - 50) * 0.12

  return clamp(ceiling, 8, 100)
}

function applyNaturalAging(state) {
  const { age, stats } = state
  let { happiness, health, smarts, looks, charisma } = stats
  happiness += (50 - happiness) * 0.04

  const country = state.currentCountry ?? state.character?.country
  const ceiling = healthCeiling(state)
  if (health < ceiling) {
    health += (ceiling - health) * (HC_RECOVERY[country?.healthcare ?? 'fair'] ?? 0.17)
  } else {
    health -= (health - ceiling) * 0.35
  }

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
    'lost_parent_father', 'lost_parent_mother', 'lost_friend', 'widowed', 'lost_child',
    'famine_memory', 'experienced_racism', 'lgbtq_family_rejection',
    'boarding_school', 'first_love_over', 'cancer_survivor', 'cancer_treatment',
    'affair_brief_secret', 'affair_not_taken', 'emigrated',
    'divorced', 'business_failed', 'graduated',
    'chernobyl_liquidator', 'grew_up_polluted', 'industrial_upbringing', 'oil_delta_witness',
    'uyghur_suppressed', 'kafala_documented', 'forced_harvest', 'ebola_survivor',
    'experienced_miscarriage', 'multiple_miscarriage', 'sibling_estranged', 'grief_drinking',
    'child_seriously_ill', 'sick_child_diagnosed',
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
  // Events may hand over a partial child. Four already do: no name, and
  // `ageAtBirth: 0`, which meant a newborn came out the same age as its parent
  // once child ages were actually derived. Fill in whatever is missing here so
  // every child is well-formed no matter which event created it.
  proxy.addChild = (child) => {
    const c = { ...(child ?? {}) }
    if (!c.name) {
      const country = state.currentCountry ?? state.character?.country
      const pool = c.gender === 'male' ? country?.namePool?.male : country?.namePool?.female
      const first = pool?.length ? pickFrom(pool) : null
      c.name = first ? `${first} ${state.character?.surname ?? ''}`.trim() : 'Your child'
    }
    // ageAtBirth is the PARENT's age when the child arrived, so 0 is never a
    // real value — treat it as "not supplied" and default to a newborn.
    if (!c.ageAtBirth) c.ageAtBirth = state.age
    if (c.relationshipQuality == null) c.relationshipQuality = 75
    if (!c.traits) c.traits = pickTraits(CHILD_TRAITS)
    proxy._newChild = c
  }
  proxy.addFriend = (friend) => {
    if (!proxy._newFriends) proxy._newFriends = []
    proxy._newFriends.push(friend)
  }
  proxy.makeFriend = (quality = 65) => {
    const c = state.character.country
    const gender = chance(0.5) ? 'male' : 'female'
    const name = personName(c, gender, state)
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
  proxy.killPartner = () => { proxy._killPartner = true; proxy.mem['lastMajorEvent_bereavement'] = state.currentYear }
  proxy.releaseFromPrison = () => { proxy._releaseFromPrison = true }
  // Its missing counterpart. Prison could only ever be entered through
  // attemptCrime — a player action behind the crime panel, which passive mode
  // does not show at all — so in a game carrying the Stasi, SAVAK, Camp Boiro,
  // the ghost houses and the gulag, nobody could be arrested for anything they
  // said, and 32 authored prison events were unreachable.
  // A home that arrives without a purchase: privatised, inherited, allocated,
  // built. buyProperty models a financed transaction and cannot express any of
  // those, which is most of the world for most of this period.
  proxy.grantHome = (typeId = 'studio_flat', valueFactor = 0.6) => {
    proxy._grantHome = { typeId, valueFactor }
  }
  proxy.imprison = (years, opts = {}) => {
    proxy._imprison = {
      years: Math.max(1, Math.round(years) || 1),
      political: opts.political === true,
      charge: opts.charge ?? null,
    }
  }
  proxy.killParent = (which) => { proxy._killParent = which; proxy.mem['lastMajorEvent_bereavement'] = state.currentYear }
  proxy.setLastMajorEvent = (cat) => { proxy.mem[`lastMajorEvent_${cat}`] = state.currentYear }
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
  // Schedule an echo — a guaranteed follow-up event by ID, N years from now.
  // The event must exist in the EVENTS array or LIFE_SKELETON_EVENTS.
  proxy.scheduleEcho = (eventId, yearsFromNow) => {
    const fireAtAge = state.age + Math.max(1, yearsFromNow)
    if (!proxy._echoQueue) proxy._echoQueue = []
    proxy._echoQueue.push({ eventId, fireAtAge })
  }
  proxy.makePartner = (overrides = {}) => {
    const myGender = state.character.gender
    const isLGBTQ = proxy.flags.includes('lgbtq_identity')
    const preferredGender = isLGBTQ ? myGender : (myGender === 'male' ? 'female' : 'male')
    const gender = overrides.gender ?? preferredGender
    const nameGender = gender === 'non-binary' ? pickFrom(['male', 'female']) : gender
    const c = state.character.country
    const name = personName(c, nameGender, state)
    const age = clamp(randomBetween(Math.max(18, state.age - 5), state.age + 5), 16, 60)
    proxy._newPartner = {
      name, gender, birthGender: gender, age,
      occupation: partnerOccupation(state, nameGender),
      looks: randomBetween(30, 90),
      smarts: randomBetween(30, 90),
      wealthStat: randomBetween(20, 80),
      craziness: randomBetween(10, 70),
      relationshipQuality: overrides.quality ?? randomBetween(55, 75),
      married: false, engaged: false, years: 0, alive: true,
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
  return personName(c, gender, state)
}

function resolveProxyExtras(state, proxy) {
  let next = state
  if (proxy._newEducation)   next = { ...next, education: proxy._newEducation }
  if (proxy._newCareerId)    next = enterCareer(next, proxy._newCareerId)
  if (proxy._clearCareer)    next = { ...next, career: null }
  // An event that retires the character does it with `p.clearCareer()` and a
  // `retired` FLAG, but every hook that decides whether to hand out a job reads
  // the `retired` STATE FIELD. So a life narrated "the working life ends, the
  // last day comes and goes with less ceremony than expected" was handed a new
  // job two years later, retired again at 68, and paid nothing for the first
  // retirement because the pension was never recorded either.
  if (!next.retired && proxy.flags.includes('retired')) {
    const pension = state.career ? Math.round(state.career.salary * 0.35) : (next.pensionAnnual ?? 0)
    next = { ...next, retired: true, career: null, pensionAnnual: pension }
  }
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
  if (proxy._grantHome && (next.assets?.properties?.length ?? 0) === 0) {
    const { typeId, valueFactor } = proxy._grantHome
    const type = PROPERTY_TYPES.find(t => t.id === typeId) ?? PROPERTY_TYPES[0]
    const value = Math.max(400, inEraMoney(Math.round(localisePrice(type.basePrice, liveCountry(next)?.gdp, 'local') * valueFactor), liveCountry(next), next.currentYear))
    next = {
      ...next,
      assets: { ...next.assets, properties: [...(next.assets?.properties ?? []), {
        typeId: type.id, name: type.name, purchasePrice: 0, currentValue: value, mortgage: 0,
      }] },
      flags: [...new Set([...(next.flags ?? []), 'homeowner'])],
      mem: { ...(next.mem ?? {}), lcHousingSettled: true, lcHomeYear: next.currentYear },
    }
  }
  if (proxy._imprison && !next.inPrison) {
    const { years, political, charge } = proxy._imprison
    next = {
      ...next,
      inPrison: true,
      prisonSentence: years,
      career: null,          // the job does not wait
      // A political conviction is still a conviction, and under the regime that
      // handed it down it closes the same doors — which is the point of it.
      criminalRecord: [...(next.criminalRecord ?? []),
        { crime: charge ?? (political ? 'Political offence' : 'Convicted'), age: next.age, category: political ? 'political' : 'other' }],
      flags: [...new Set([...(next.flags ?? []), 'imprisoned',
        ...(political ? ['political_prisoner'] : [])])],
      mem: { ...(next.mem ?? {}), originalSentence: years, imprisonedYear: next.currentYear },
    }
  }
  if (proxy._killParent && next.parents?.[proxy._killParent]) {
    const which = proxy._killParent
    next = { ...next, parents: { ...next.parents, [which]: { ...next.parents[which], alive: false, relationshipQuality: 0 } } }
    // Same flags as a natural death, so scripted bereavement reaches the grief
    // and memory layers identically.
    next = {
      ...next,
      flags: [...new Set([...(next.flags ?? []), `lost_parent_${which}`, `${which}_died`])],
      mem: { ...(next.mem ?? {}), [`lost_parent_${which}Year`]: next.currentYear ?? state.currentYear },
    }
  }
  if (proxy._residencyStatus) next = { ...next, residencyStatus: proxy._residencyStatus }
  if (proxy._partnerRelDelta && next.partner) {
    next = { ...next, partner: { ...next.partner, relationshipQuality: clamp((next.partner.relationshipQuality ?? 60) + proxy._partnerRelDelta, 0, 100) } }
  }
  if (proxy._killPartner && next.partner) {
    // Same as tickPartner's own death path: the marriage ends with the partner,
    // so `married` must not survive them.
    next = {
      ...next,
      partner: { ...next.partner, alive: false },
      flags: [...new Set([...(next.flags ?? []).filter(f => f !== 'married' && f !== 'engaged'),
                          'widowed', 'lost_partner'])],
    }
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
  if (proxy._echoQueue?.length) {
    next = { ...next, echoQueue: [...(next.echoQueue ?? []), ...proxy._echoQueue] }
  }
  return next
}

// ─── Event system ─────────────────────────────────────────────────────────────

// Cooldown-aware availability check. Events with no cooldown fire at most once.
// Events with cooldown: N can fire again N or more years after they last fired.
/**
 * A character who will never see a classroom should not be told about theirs.
 * `G.literate` reads the roll createCharacter makes at birth, so this is known
 * from age 0 — the alternative was printing ten years of school events and then
 * announcing at sixteen that there was never a school to leave.
 */
function schoolProseFits(e, G) {
  return !e.assumesSchool || G.literate || G.education?.level === 'secondary' || G.education?.enrolled
}

// Does this event's prose assume something that did not exist here this year?
// See INSTITUTIONS_SUSPENDED in src/data/history.js: Democratic Kampuchea
// abolished money, wages, schools, hospitals, religion, the post and the cities
// in 1975, and until this existed a 1977 Cambodian was drawing a salary and
// being referred to a psychiatrist.
function institutionsFit(e, G) {
  const needs = e.assumesInstitutions
  if (!needs) return true
  const gone = suspendedInstitutions(G.currentCountry?.name ?? G.character?.country?.name, G.currentYear)
  if (gone.size === 0) return true
  return !needs.some(n => gone.has(n))
}

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

// Political leaning weight multiplier — characters who've formed political views
// encounter related events more often, creating coherent ideological arcs.
const LEANING_PATTERNS = {
  left:        ['lab_', 'pov_', 'strike', 'union_', 'socialist', 'informal_', 'welfare', 'workers'],
  right:       ['career_promot', 'business_ex', 'faith_deep', 'relig_conver', 'invest_', 'property_buy'],
  nationalist: ['ethnic_', 'cultural_', 'lang_ban', 'language_ban', 'national_', 'diaspora_return', 'indigenous_'],
  dissident:   ['dissident', 'samizdat', 'censor', 'political_prisoner', 'protest_', 'resist_', 'charter_'],
  centre:      [],
  apolitical:  [],
}
function leaningWeight(eventId, politicalLeaning) {
  if (!politicalLeaning || !eventId) return 1
  const patterns = LEANING_PATTERNS[politicalLeaning] ?? []
  return patterns.some(p => eventId.includes(p)) ? 1.35 : 1
}

// Stat-based event weight multiplier — high/low stats shift event probability
// without hard-gating events, preserving randomness while making lives feel coherent.
function statWeight(eventId, G) {
  if (!G || !eventId) return 1
  const stats = G.stats ?? {}
  let m = 1
  const id = eventId
  const { smarts, charisma, happiness, health, wealth, looks } = stats
  // Smarts
  if ((smarts ?? 50) > 70 && (id.includes('scholar') || id.includes('uni_') || id.includes('gifted') || id.includes('academic'))) m *= 1.5
  if ((smarts ?? 50) < 32 && (id.includes('scholar') || id.includes('uni_') || id.includes('gifted'))) m *= 0.25
  // Charisma
  if ((charisma ?? 50) > 70 && (id.includes('romance') || id.includes('rq_partner') || id.includes('friend') || id.includes('social_cap') || id.includes('small_crush') || id.includes('first_love'))) m *= 1.4
  if ((charisma ?? 50) < 30 && (id.includes('romance') || id.includes('small_crush') || id.includes('first_love'))) m *= 0.5
  // Happiness
  if ((happiness ?? 50) < 32 && (id.includes('mh_') || id.includes('mental') || id.includes('grief') || id.includes('depr') || id.includes('therapy'))) m *= 1.6
  if ((happiness ?? 50) > 75 && (id.includes('mh_depr') || id.includes('mh_crisis'))) m *= 0.4
  // Health
  if ((health ?? 80) < 38 && (id.includes('ill') || id.includes('cancer') || id.includes('heart') || id.includes('chronic') || id.includes('condition'))) m *= 1.5
  if ((health ?? 80) > 80 && (id.includes('ill_terminal') || id.includes('heart_failure'))) m *= 0.5
  // Wealth
  if ((wealth ?? 50) > 72 && (id.includes('business') || id.includes('invest') || id.includes('luxury') || id.includes('property'))) m *= 1.35
  if ((wealth ?? 50) < 25 && (id.includes('poverty') || id.includes('evict') || id.includes('debt_spiral') || id.includes('pov_'))) m *= 1.5
  if ((wealth ?? 50) > 65 && (id.includes('pov_') || id.includes('evict') || id.includes('bankrupt'))) m *= 0.35
  // Looks
  if ((looks ?? 50) > 72 && (id.includes('romance') || id.includes('social_cap') || id.includes('looks'))) m *= 1.3
  // Mental health — unmanaged condition suppresses social success; managed boosts recovery events
  const mh = G.mentalHealth ?? {}
  if (mh.condition && !mh.therapy && !mh.medicating) {
    if (id.includes('mh_') || id.includes('grief_drink') || id.includes('depr')) m *= 1.5
    if (id.includes('career_promot') || id.includes('rq_partner_warmth') || id.includes('rq_partner_long')) m *= 0.6
  }
  if (mh.therapy || mh.medicating) {
    if (id.includes('therapy') || id.includes('recovery') || id.includes('ft_abusive_rel_therapy')) m *= 1.4
    if (id.includes('mh_crisis') || id.includes('mh_severe')) m *= 0.5
  }
  return m
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

// ─── Selection ────────────────────────────────────────────────────────────────
// The corpus is ~8,000 events, of which ~2,275 are universal contemplative
// observations with very broad guards. Drawing from one flat weighted pool let
// that layer take ~70% of every life while the country-, era- and identity-
// specific events written around it fired a handful of times per hundred lives —
// the exact inversion of "specificity over coverage".
//
// So the year is drawn in two steps: first a REGISTER, then an event within it.
// Reserving a share of every year for anchored and earned events keeps the
// specific content reachable no matter how large the universal pool grows.
const REGISTER_SHARES = {
  // anchored: keyed to place, era or identity — the education mandate
  // earned:   keyed to what has already happened to this character — the follow-through mandate
  // universal: generic authored events
  // contemplative: the sonder layer
  active:  { anchored: 0.40, earned: 0.32, universal: 0.06, contemplative: 0.22 },
  passive: { anchored: 0.38, earned: 0.29, universal: 0.05, contemplative: 0.28 },
}

// At most one contemplative event every N years. Enforced by module membership
// (event.contemplative), never by id prefix — the id convention drifted across
// 66 modules and a prefix test missed 46% of the pool.
const CONTEMPLATIVE_COOLDOWN = 3

// A stranger glimpse is due roughly once a decade, per the Sonder Principle.
const GLIMPSE_INTERVAL = 9

function eventWeight(e, G, desire, leaning) {
  let w = (e.weight ?? 1) * desireWeight(e.id, desire) * statWeight(e.id, G) * leaningWeight(e.id, leaning)
  // Inside the contemplative layer, prefer observations that are anchored to
  // this place and era — the "place and era texture" layer of the quiet year.
  if (e.contemplative && e.anchored) w *= 3
  // Reaching a character who satisfies a four- or five-dimension guard is the
  // whole point of having written it. Without this, an event needing a Dalit
  // girl in rural India in a named decade competes on equal terms with every
  // event needing only "India", and loses, because there are hundreds of those.
  else if (!e.contemplative) {
    const spec = e.specificity ?? 0
    if (spec > 2) w *= 1 + 0.9 * (spec - 2)
  }
  return w
}

function weightedPick(pool, G, desire, leaning) {
  if (pool.length === 0) return null
  const total = pool.reduce((sum, e) => sum + eventWeight(e, G, desire, leaning), 0)
  if (total <= 0) return pool[pool.length - 1]
  let r = Math.random() * total
  for (const event of pool) {
    r -= eventWeight(event, G, desire, leaning)
    if (r <= 0) return event
  }
  return pool[pool.length - 1]
}

export function getNextEvent(state) {
  const phase = getPhase(state.age)
  const G = buildG(state)
  const usedEventMap = state.usedEventMap ?? new Map()
  const currentYear = state.currentYear ?? 0

  const queueMatch = state.queue.find(e =>
    (e.phase === phase || e.phase == null) && isEventAvailable(e, usedEventMap, currentYear) && (!e.when || e.when(G)) &&
    (!state.inPrison || e.prisonOk === true)
  )
  if (queueMatch) return queueMatch

  // Use phase index; also include phase-agnostic events (phase: null) which rely on their when() guards
  const phaseEvents = [...(EVENTS_BY_PHASE[phase] ?? []), ...(EVENTS_BY_PHASE[null] ?? [])]
  let pool = phaseEvents.filter(e =>
    isEventAvailable(e, usedEventMap, currentYear) && (!e.when || e.when(G)) &&
    (!state.inPrison || e.prisonOk === true) &&
    schoolProseFits(classifyEvent(e), G) && institutionsFit(e, G)
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

  for (const e of pool) classifyEvent(e)

  const desire = G.desire
  const leaning = G.political_leaning

  // A glimpse of a stranger's life, on its own cadence rather than competing
  // for weight against 8,000 other events.
  const lastGlimpse = state.mem?.lastGlimpseYear ?? (state.character?.birthYear ?? currentYear)
  // Age floor at 3, not 8: the glimpse pool now carries early-childhood entries
  // (a stranger noticed at 3-5, before you have the words for it), and an
  // age-8 gate meant those could never be scheduled.
  if (state.age >= 3 && currentYear - lastGlimpse >= GLIMPSE_INTERVAL) {
    const glimpses = pool.filter(e => e.isGlimpse)
    if (glimpses.length && chance(0.55)) return weightedPick(glimpses, G, desire, leaning)
  }

  const lastContemplative = state.mem?.lastContemplativeYear ?? -999
  const contemplativeAllowed = currentYear - lastContemplative >= CONTEMPLATIVE_COOLDOWN

  const buckets = { anchored: [], earned: [], universal: [], contemplative: [] }
  for (const e of pool) (buckets[e.register] ?? buckets.universal).push(e)
  if (!contemplativeAllowed) buckets.contemplative = []

  // Draw a register, renormalising over whichever registers actually have
  // something eligible this year.
  const shares = REGISTER_SHARES[state.mode === 'passive' ? 'passive' : 'active']
  const live = Object.keys(buckets).filter(k => buckets[k].length > 0)
  if (live.length === 0) return null

  // Renormalise over the registers that actually have something eligible — but
  // never into `universal`. Contemplative is on a three-year cooldown and the
  // anchored and earned buckets genuinely empty out in early childhood or in a
  // life that has not accumulated much yet, and a flat renormalisation handed
  // all of that reserved share to the one register whose entire definition is
  // "could fire for anyone". There are 90 such events against ~7,950, and they
  // were taking 15% of every year against a 6% target. Universal keeps its
  // nominal share and no more; the remainder goes to the specific registers.
  const others = live.filter(k => k !== 'universal')
  const weights = {}
  if (others.length === 0) {
    weights.universal = 1
  } else {
    const uni = live.includes('universal') ? shares.universal : 0
    const rest = others.reduce((sum, k) => sum + shares[k], 0)
    const scale = rest > 0 ? (1 - uni) / rest : 0
    for (const k of others) weights[k] = shares[k] * scale
    if (uni > 0) weights.universal = uni
  }
  const totalShare = Object.values(weights).reduce((a, b) => a + b, 0)
  let r = Math.random() * totalShare
  let chosen = live[live.length - 1]
  for (const k of Object.keys(weights)) {
    r -= weights[k]
    if (r <= 0) { chosen = k; break }
  }

  return weightedPick(buckets[chosen], G, desire, leaning)
}

export function buildG(state) {
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
    // State stores the nominal amount; G exposes it in a stable unit. The ~76
    // guards in the corpus that read `G.money > 5000` or `G.money < 400` were
    // written as statements about comfort and hardship, and dividing here is
    // what keeps them saying that instead of quietly becoming statements about
    // which decade the character is standing in.
    money: inTodayMoney(state.money ?? 0, liveCountry(state), state.currentYear),
    moneyNominal: state.money ?? 0,
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
    literate: flagSet.has('became_literate') ? true
      : flagSet.has('never_schooled') ? false
      : (state.character?.literate ?? true),
    regime: getCountryRegime(state.character?.country, currentYear),
    lgbtqCriminalized: isLgbtqCriminalized(liveCountry(state), currentYear),
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
    legacy: state.legacy ?? 0,
    archetype: state.character?.country?.archetype ?? null,
    // Enriched prose helpers: available in text: (G) => functions
    era: Math.floor(currentYear / 10) * 10,
    capital: state.character?.country?.capital ?? '',
    currency: state.character?.country?.currency ?? '',
    cityName: (state.currentPlace ?? state.character?.birthPlace)?.name ?? state.character?.country?.capital ?? '',
    // lastMajorEvent guard helper — prevents emotional clustering
    // G.yearsSince('bereavement') >= 2 guards miscarriage after parent death, etc.
    yearsSince: (cat) => currentYear - (state.mem?.[`lastMajorEvent_${cat}`] ?? 0),
    // Season derived deterministically per character+year; shared with the
    // year-texture layer so seasonal prose and seasonal guards agree.
    season: deriveSeason(state),
  }
}

function applyWorldEvents(state) {
  let updated = { ...state }
  // Rebuilt per event: G used to be computed once before the loop, so when two
  // world events matched the same year, the second one's guard evaluated against
  // state from before the first had applied.
  let G = buildG(updated)
  for (const we of WORLD_EVENTS) {
    if (updated.worldEventsFired.has(we.id)) continue
    if (state.currentYear < we.years[0] || state.currentYear > we.years[1]) continue
    // History reaches you where you are. An emigrant experiences the country
    // they live in; homeland events only follow them abroad when the event is
    // explicitly written to (`followsEmigrant`), which is what keeps diaspora
    // arcs — news from home, a war you are watching from outside — working.
    const lived = liveCountry(state)
    const birth = state.character.country
    const abroad = lived?.name !== birth?.name
    const candidates = abroad && we.followsEmigrant ? [lived, birth] : [lived]
    const archetypesMatch = !we.archetypes || we.archetypes === 'all' ||
      candidates.some(c => we.archetypes.includes(c?.archetype))
    const countryMatch = !we.countries || candidates.some(c => we.countries.includes(c?.name))
    if (!archetypesMatch || !countryMatch) continue
    if (we.minAge && state.age < we.minAge) continue
    if (we.maxAge && state.age > we.maxAge) continue
    if (we.when && !we.when(G)) continue
    // A world narrative can assume an institution the country does not have
    // that year: the post-independence disillusionment event, which is about
    // which families hold the contracts, was reaching Cambodians in 1977.
    const wnText = typeof we.narrative === 'function' ? we.narrative(G) : we.narrative
    if (!proseFitsInstitutions(wnText, lived?.name, state.currentYear)) continue
    const proxy = buildEffectProxy(updated)
    we.effect(proxy)
    updated = applyProxy(updated, proxy)
    updated.worldEventsFired = new Set([...updated.worldEventsFired, we.id])
    const narrativeText = wnText
    updated.log = [...updated.log, { age: updated.age, year: updated.currentYear, text: narrativeText, worldEventName: we.name, isKey: true, isWorld: true }]
    if (we.addFlags) updated.flags = [...new Set([...updated.flags, ...we.addFlags])]
    // Rebuilt only when an event actually fires (rare), so a later event in the
    // same year sees the flags and stats the earlier one just set.
    G = buildG(updated)
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

function applySoundtrack(state) {
  const year = state.currentYear
  const archetype = state.character?.country?.archetype
  const countryName = state.character?.country?.name
  const seenKey = `soundtrack_${year}`
  if (state.mem?.[seenKey]) return state
  const matching = SOUNDTRACK.filter(s => {
    if (s.year !== year) return false
    if (s.minAge && state.age < s.minAge) return false
    if (s.maxAge && state.age > s.maxAge) return false
    if (s.archetypes !== 'all' && !s.archetypes.includes(archetype)) return false
    if (s.countries && !s.countries.includes(countryName)) return false
    return true
  })
  if (matching.length === 0) return state
  // Pick one soundtrack entry per year, not all of them
  const picked = matching[Math.floor(Math.random() * matching.length)]
  const newEntry = { age: state.age, text: picked.text, isKey: false, isSoundtrack: true }
  return {
    ...state,
    mem: { ...(state.mem ?? {}), [seenKey]: true },
    log: [...state.log, newEntry],
  }
}

// ─── Death ────────────────────────────────────────────────────────────────────

// Historical infant mortality rates (deaths per 1000 live births) by archetype and decade.
// Sources: UN IGME, Gapminder, World Bank historical series.
const HISTORICAL_IMR = {
  wealthy_west:        { 1900: 150, 1920: 100, 1940: 58,  1960: 28,  1980: 12,  2000: 6,   2020: 4   },
  wealthy_east:        { 1900: 180, 1920: 140, 1940: 90,  1960: 40,  1980: 10,  2000: 4,   2020: 2   },
  wealthy_gulf:        { 1900: 260, 1920: 240, 1940: 200, 1960: 140, 1980: 60,  2000: 15,  2020: 7   },
  post_soviet:         { 1900: 230, 1920: 190, 1940: 140, 1960: 75,  1980: 28,  2000: 18,  2020: 8   },
  developing_urban:    { 1900: 200, 1920: 170, 1940: 150, 1960: 110, 1980: 70,  2000: 35,  2020: 20  },
  developing_unstable: { 1900: 240, 1920: 210, 1940: 180, 1960: 130, 1980: 90,  2000: 55,  2020: 40  },
  subsaharan:          { 1900: 300, 1920: 275, 1940: 250, 1960: 190, 1980: 130, 2000: 95,  2020: 55  },
  conflict_zone:       { 1900: 340, 1920: 310, 1940: 280, 1960: 210, 1980: 160, 2000: 120, 2020: 80  },
}

function lerpIMR(archetype, year) {
  const table = HISTORICAL_IMR[archetype] ?? HISTORICAL_IMR.developing_urban
  const decades = Object.keys(table).map(Number).sort((a, b) => a - b)
  if (year <= decades[0]) return table[decades[0]] / 1000
  if (year >= decades[decades.length - 1]) return table[decades[decades.length - 1]] / 1000
  for (let i = 0; i < decades.length - 1; i++) {
    if (year >= decades[i] && year <= decades[i + 1]) {
      const t = (year - decades[i]) / (decades[i + 1] - decades[i])
      return (table[decades[i]] * (1 - t) + table[decades[i + 1]] * t) / 1000
    }
  }
  return 0.05
}

function checkDeath(state) {
  const { age, stats, character, flags } = state
  const lc = liveCountry(state)
  const cr = lc.conflictRisk ?? 0
  const currentYear = (character.birthYear ?? 1960) + age
  const arch = lc.archetype ?? 'developing_urban'
  let prob = 0
  let skipHcMod = false

  if (age < 18) {
    // Historical archetype-keyed rates — hcMod excluded because archetype already encodes era healthcare
    skipHcMod = true
    const imr = lerpIMR(arch, currentYear)
    if (age < 2) {
      prob = imr + cr * 0.04
    } else if (age < 6) {
      // Under-5 mortality beyond infancy, roughly 12% of IMR per year
      prob = imr * 0.12 + cr * 0.04
    } else if (age < 12) {
      prob = imr * 0.02 + cr * 0.025
      if (flags.includes('child_soldier')) prob += 0.04
    } else {
      prob = imr * 0.015 + cr * 0.05
      if (flags.includes('child_soldier')) prob += 0.05
    }
  } else if (age < 35) {
    prob = 0.002 + cr * 0.04
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

  if (!skipHcMod) {
    const hcMod = { excellent: 0.65, good: 0.8, fair: 1.0, poor: 1.25, very_poor: 1.5 }
    prob *= hcMod[lc.healthcare] ?? 1.0
  }
  // A very low health stat is a real mortality signal, but this used to be a
  // flat +15%/yr cliff in a model where nothing restored health — the single
  // largest cause of premature death in the simulation. Graded now, and gentler
  // for children, whose age bands already carry historical mortality rates.
  if (stats.health < 25) {
    const severity = (25 - stats.health) / 25
    prob += severity * severity * (age < 18 ? 0.03 : 0.09)
  }
  // Karma very slightly modifies survival odds
  const karma = state.karma ?? 50
  prob *= clamp(1 - (karma - 50) * 0.002, 0.8, 1.2)
  if (!chance(prob)) return { dead: false }
  return { dead: true, cause: determineCause(state) }
}

function determineCause({ age, stats, flags, character }) {
  const arch = character.country.archetype
  const cn = character.country.name
  const hc = character.country.healthcare
  const deathYear = (character.birthYear ?? 1960) + age
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

  if (age < 2) {
    // Neonatal and infant — causes vary by era and context
    if (arch === 'conflict_zone' || (flags.includes('refugee') && hc === 'very_poor')) {
      return pick(['neonatal complications during displacement', 'illness in infancy during conflict', 'complications at birth'])
    }
    if (hc === 'very_poor' || hc === 'poor') {
      if (arch === 'subsaharan') return pick(['neonatal sepsis', 'malaria in infancy', 'complications at birth', 'diarrheal illness in infancy', 'pneumonia in infancy'])
      if (arch === 'developing_unstable') return pick(['complications at birth', 'diarrheal illness in infancy', 'pneumonia in infancy', 'neonatal infection'])
      return pick(['complications at birth', 'illness in infancy', 'neonatal infection'])
    }
    if (deathYear < 1950) return pick(['complications at birth', 'neonatal tetanus', 'diarrheal disease in infancy', 'pneumonia in infancy'])
    if (deathYear < 1990) return pick(['complications at birth', 'illness in infancy', 'pneumonia in infancy'])
    return pick(['complications at birth', 'illness in early infancy', 'sudden illness in infancy'])
  }

  if (age < 5) {
    if (hc === 'very_poor' || hc === 'poor') {
      if (arch === 'subsaharan') return pick(['malaria', 'malnutrition in early childhood', 'cholera', 'diarrheal disease', 'pneumonia', 'measles'])
      if (arch === 'developing_unstable') return pick(['malnutrition', 'diarrheal disease', 'pneumonia', 'preventable illness in early childhood'])
      if (arch === 'conflict_zone') return pick(['illness during displacement', 'malnutrition during conflict', 'complications during conflict'])
      return pick(['malnutrition', 'preventable illness in early childhood', 'diarrheal disease'])
    }
    if (deathYear < 1960) return pick(['measles', 'scarlet fever', 'whooping cough', 'diphtheria', 'illness in early childhood'])
    if (deathYear < 1980) return pick(['illness in early childhood', 'pneumonia', 'measles'])
    return 'illness in early childhood'
  }

  if (age < 12) {
    // Childhood — accidents and era-specific diseases
    if (hc === 'very_poor' || hc === 'poor') {
      if (arch === 'subsaharan' || arch === 'developing_unstable') {
        return pick(['malaria', 'malnutrition in childhood', 'pneumonia', 'cholera', 'preventable illness in childhood'])
      }
    }
    if (deathYear < 1950) return pick(['tuberculosis in childhood', 'measles', 'scarlet fever', 'typhoid', 'illness in childhood'])
    if (deathYear < 1975) return pick(['illness in childhood', 'pneumonia', 'road accident', 'drowning'])
    return pick(['illness in childhood', 'road accident in childhood', 'drowning', 'accident in childhood'])
  }

  if (flags.includes('child_soldier') && age < 18) {
    return pick(['killed in combat as a child soldier', 'died in armed conflict', 'shot during military service as a minor'])
  }

  if (character.country.conflictRisk > 0.15 && age < 30 && chance(0.3)) {
    if (arch === 'conflict_zone') return pick(['killed in the conflict', 'caught in crossfire', 'died in the war'])
    if (cn === 'Afghanistan') return pick(['died in the conflict', 'killed in fighting'])
    if (cn === 'Syria') return pick(['killed in the civil war', 'died in the conflict'])
    if (flags.includes('war_childhood') || flags.includes('refugee')) return 'caught in armed conflict'
    return 'died in conflict'
  }

  if (flags.includes('criminal_life') && age < 40 && chance(0.3)) {
    return pick(['killed in a dispute', 'violence', 'shot'])
  }

  if (stats.happiness < 15 && age < 45 && chance(0.4)) {
    return 'suicide'
  }

  if (flags.includes('cancer') && chance(0.6)) {
    if (age < 50) return 'cancer, young'
    return pick(['cancer', 'cancer'])
  }
  if (flags.includes('smoker') && age > 50 && chance(0.3)) {
    return pick(['lung cancer', 'lung disease'])
  }

  if (stats.health < 25 && age > 40) {
    if (hc === 'very_poor' || hc === 'poor') {
      return pick(['organ failure', 'untreated illness', 'complications from a treatable condition'])
    }
    return 'organ failure'
  }

  if (age > 80) {
    if (arch === 'wealthy_west' || arch === 'wealthy_east') {
      return pick(['old age', 'heart failure in old age', 'peacefully, in old age'])
    }
    return pick(['old age', 'old age'])
  }

  if (age > 65) {
    if (arch === 'subsaharan' || arch === 'developing_unstable') {
      return pick(['heart disease', 'stroke', 'complications from a chronic condition', 'malaria'])
    }
    return chance(0.5) ? 'heart disease' : 'stroke'
  }

  if (age > 50) {
    return chance(0.4) ? 'heart attack' : 'cancer'
  }

  // Young adult / midlife non-conflict deaths
  if (arch === 'subsaharan' || arch === 'developing_unstable') {
    if (deathYear < 2000) return pick(['malaria', 'tuberculosis', 'typhoid', 'illness'])
    return pick(['malaria', 'HIV/AIDS complications', 'illness', 'accident'])
  }
  if (arch === 'conflict_zone') return pick(['illness', 'complications from injury', 'died in the conflict'])
  if (flags.includes('drug_addiction') || flags.includes('alcohol_addiction')) return pick(['overdose', 'complications from addiction'])

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
      if (gdpOrder.indexOf(liveCountry(state).gdp) < gdpOrder.indexOf(career.gdpRequired)) return false
    }
    if (Array.isArray(career.archetypeAvailable) && !career.archetypeAvailable.includes(liveCountry(state).archetype)) return false
    if (career.requirements.flags && !career.requirements.flags.some(f => state.flags.includes(f))) return false
    if (career.minYear && state.currentYear < career.minYear) return false
    if (career.maxYear && state.currentYear > career.maxYear) return false
    if (state.career?.id === career.id) return false
    return true
  })
}

/**
 * The job title as this character would be described. A level may declare
 * `titleFemale` where English has a distinct feminine form that was in ordinary
 * use for the period; without it the title is the title. The obituary read
 * "She spent the working years as a Foreman", which no obituary has ever said.
 */
function careerTitle(level, state) {
  return state?.character?.gender === 'female' && level.titleFemale ? level.titleFemale : level.title
}

export function enterCareer(state, careerId) {
  const career = CAREERS.find(c => c.id === careerId)
  if (!career) return state
  // There are years in which a country has no wage economy to enter. Democratic
  // Kampuchea abolished money and wages in 1975; a Cambodian in 1976 was
  // beginning work as a Day Laborer on $656 a year and being promoted to
  // Foreman the following spring. See INSTITUTIONS_SUSPENDED in history.js.
  if (!institutionExists(liveCountry(state)?.name, state.currentYear, 'wages')) return state
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
  const listed = randomBetween(level.salaryRange[0], level.salaryRange[1])
  // Two scalings, and the game only ever had the first. `gdpSalaryMult` asks
  // where the wage is paid; `wageIndex` asks when. Without the second, a 1948
  // German taxi driver started on $19,540/yr — a figure from a country that at
  // that moment had had its currency for four months.
  //
  // `baseSalary` is kept in present-day money so the wage can be re-denominated
  // every year. A career held from 1950 to 1990 otherwise pays 1950 wages into
  // 1990 prices, and the character starves in a job they were never fired from.
  const salaryMult = gdpSalaryMult[liveCountry(state).gdp] ?? 1.0
  const baseSalary = Math.round(listed * salaryMult)
  const salary = inEraMoney(baseSalary, liveCountry(state), state.currentYear)
  const newCareer = {
    id: career.id, title: careerTitle(level, state), level: 0, salary, baseSalary,
    field: career.field, yearsInRole: 0, startedAge: state.age, performance: 70,
    partTime: career.partTime ?? false,
    promotionChance: career.promotionChance ?? 0.10,
    maxLevel: career.levels.length - 1,
  }
  const log = [...state.log, { age: state.age, text: `You begin working as ${withArticle(level.title)}. Starting salary: $${salary.toLocaleString()}/yr.`, isKey: true }]
  return { ...state, career: newCareer, log }
}

export function checkPromotion(state) {
  if (!state.career) return state
  if (!institutionExists(liveCountry(state)?.name, state.currentYear, 'wages')) return state
  // Nobody is promoted in the year they were hired. `yearsBonus` made it less
  // likely, not impossible, and the life log read "You begin working as a
  // Market Trader. Starting salary: $722/yr." immediately followed by "You are
  // promoted to Small Business Owner. New salary: $2,103/yr." in the same year.
  //
  // `yearsInRole` alone is not enough to say this: the career block increments
  // it and then calls this function in the same tick, so it already reads 1 on
  // the starting year. The age the job began is unambiguous.
  if (state.age <= (state.career.startedAge ?? -Infinity)) return state
  if ((state.career.yearsInRole ?? 0) < 1) return state
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
  const salaryMult = gdpSalaryMult[liveCountry(state).gdp] ?? 1.0
  const baseSalary = Math.round(randomBetween(newLevel.salaryRange[0], newLevel.salaryRange[1]) * salaryMult)
  const salary = inEraMoney(baseSalary, liveCountry(state), state.currentYear)
  const career = { ...state.career, level: nextIdx, title: careerTitle(newLevel, state), salary, baseSalary, yearsInRole: 0, startedAge: state.age }
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
    // A career from before `baseSalary` existed carries only a nominal wage.
    // Reading that as a present-day base makes the raise re-denominate an
    // already-denominated figure and hands the character a pay CUT, so convert
    // it back first.
    const base = state.career.baseSalary
      ?? inTodayMoney(state.career.salary, liveCountry(state), state.currentYear)
    const newBase = Math.round(base * (1 + pct))
    const newSalary = inEraMoney(newBase, liveCountry(state), state.currentYear)
    const gained = newSalary - state.career.salary
    return {
      ...state,
      career: { ...state.career, salary: newSalary, baseSalary: newBase },
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

  const archetypeMod = crime.archetypeModifier?.[liveCountry(state).archetype] ?? 0
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
    if (sentence > 0) updated.pendingTrial = buildPendingTrial(updated, crime, sentence)
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
  const deaths = []

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
      // Losing a parent is the most common grief in a human life. It used to set
      // no flag at all, so none of the memory, grief or texture layers built to
      // metabolize it ever knew it had happened — and it read like a receipt.
      deaths.push({ which: label, name: parent.name, age: newAge, close: parent.relationshipQuality >= 55 })
      const close = parent.relationshipQuality >= 55
      const distant = parent.relationshipQuality < 30
      const text = distant
        ? `Your ${label}, ${parent.name}, dies at ${newAge}. You find you are not sure what you feel, and that this is its own kind of information.`
        : close
          ? `Your ${label}, ${parent.name}, dies at ${newAge}. There is a stretch of days afterwards that you will not be able to account for later.`
          : `Your ${label}, ${parent.name}, dies at ${newAge}. You make the calls. You handle the arrangements. You are surprised by how much of it is paperwork.`
      log.push({ age: state.age, text, isKey: true, isDeath: true })
      return { ...parent, currentAge: newAge, alive: false }
    }
    const drift = (60 - parent.relationshipQuality) * 0.02
    return { ...parent, currentAge: newAge, relationshipQuality: clamp(parent.relationshipQuality + drift, 0, 100) }
  }

  mother = ageParent(mother, 'mother')
  father = ageParent(father, 'father')

  let flags = state.flags
  let mem = state.mem
  if (deaths.length) {
    const add = []
    const nextMem = { ...(mem ?? {}) }
    for (const d of deaths) {
      // Canonical flag (timestamped, drives the memory layer) plus the older
      // alias that a number of authored guards still read.
      add.push(`lost_parent_${d.which}`, `${d.which}_died`)
      nextMem[`lost_parent_${d.which}Year`] = state.currentYear
      nextMem.lastMajorEvent_bereavement = state.currentYear
      if (d.close) add.push('lost_parent_close')
    }
    flags = [...new Set([...(state.flags ?? []), ...add])]
    mem = nextMem
  }
  return { ...state, parents: { mother, father }, log, money, flags, mem }
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
  // The bands are present-day dollars and the balance is not, so without the
  // era term every character before about 1990 read as destitute and paid the
  // maximum premium on money that was simply denominated differently.
  const era = wageIndex(liveCountry(state), state.currentYear)
  let rate = 0
  if      (money < 500   * mult * era) rate = 0.18
  else if (money < 2000  * mult * era) rate = 0.12
  else if (money < 8000  * mult * era) rate = 0.07
  else if (money < 20000 * mult * era) rate = 0.03
  else return state
  const premium = Math.round(money * rate * welfareReduction)
  if (premium <= 0) return state
  return { ...state, money: Math.max(0, money - premium) }
}

/**
 * What it costs to be alive for a year.
 *
 * Nothing in the engine ever spent money on living. Rent, food, fuel, clothes,
 * school, the bus — none of it existed, so a character banked one hundred per
 * cent of gross income for sixty years and died with millions: a retired sous
 * chef on $7,092,762, a smallholder who never earned more than $1,400 a year
 * holding $19,260 at thirty-three. The poverty premium took a slice off the
 * very poor and nobody else paid for anything.
 *
 * Two terms, because households do two different things:
 *
 *   CONSUMPTION — a share of this year's income, straight back out. The share
 *   is near total where there is no margin and falls as there is one, which is
 *   why a savings RATE is a luxury good and not a virtue.
 *
 *   DRAWDOWN — a share of whatever has piled up beyond a few years' buffer.
 *   People with a surplus spend it: a bigger place, school fees, a parent's
 *   operation, the wedding. This is the term that stops the balance running
 *   away, and it settles a life at roughly five years of income rather than
 *   sixty.
 *
 * Both are proportional, so neither needs the era treatment — they are already
 * denominated by whatever they are a share of.
 */
function tickLivingCosts(state) {
  if (state.inPrison) return state
  const arch = liveCountry(state)?.archetype ?? 'developing_urban'
  const income = state.career
    ? (state.career.partTime ? Math.round(state.career.salary * 0.5) : state.career.salary)
    : 0

  // Savings rate. The rich-world figures are household saving out of
  // disposable income; the poor-world ones are lower because there is less
  // left after eating, not because anybody wanted it that way.
  //
  // These are deliberately well above national-accounts household saving,
  // because the game's `money` is not a household's cash: it is the only
  // account there is, and the house, the deposit, the dowry, the passage and
  // the business all come out of it. Calibrated against home ownership, which
  // is the one outflow measured against the historical record — at true
  // saving rates ownership fell from 72% to 43% in the 1950 American cohort
  // and from 88% to 12% in the 1995 Brazilian one, because nobody could ever
  // assemble a deposit.
  const saveRate = {
    wealthy_west: 0.34, wealthy_east: 0.40, wealthy_gulf: 0.36,
    post_soviet: 0.30, developing_urban: 0.30, developing_unstable: 0.26,
    subsaharan: 0.24, conflict_zone: 0.20,
  }[arch] ?? 0.30
  // Children and a partner are the largest single claim on a household and the
  // one every life in this game has.
  const dependants = (state.children ?? []).filter(c => c.alive !== false && (c.age ?? 99) < 20).length
  const consumption = Math.round(income * (1 - saveRate) * (1 + 0.04 * dependants))

  const buffer = Math.max(income * 5, 0)
  const excess = Math.max(0, (state.money ?? 0) - buffer)
  const drawdown = Math.round(excess * 0.05)

  const spent = consumption + drawdown
  if (spent <= 0) return state
  return { ...state, money: Math.max(0, (state.money ?? 0) - spent) }
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
  // `appreciationRate` is a real return. What a house actually did over fifty
  // years is a real return ON TOP OF the money changing underneath it, and
  // without the second term a house bought in 1965 for 8,000 was worth 35,000
  // in 2015 rather than the 480,000 its owners would have recognised.
  const drift = eraDrift(liveCountry(state), state.currentYear)

  const updatedProperties = properties.map(p => {
    const type = PROPERTY_TYPES.find(t => t.id === p.typeId)
    if (!type) return p
    const newValue = Math.round(p.currentValue * drift * (1 + type.appreciationRate + randomBetween(-2, 2) / 100))
    money -= inEraMoney(type.annualMaintenance, liveCountry(state), state.currentYear)
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
    money -= inEraMoney(type.annualMaintenance, liveCountry(state), state.currentYear)
    // A car loses value faster than money does, which is the whole of what a
    // car is, so the drift never rescues it above its depreciation.
    return { ...v, currentValue: Math.max(100, Math.round(v.currentValue * drift * (1 - type.depreciationRate))) }
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
  // `alive === false` rather than `!alive`: partners built before this field
  // existed carry no `alive` at all, and treating those as dead is what made
  // this whole function a no-op for every partner in the game.
  if (!state.partner || state.partner.alive === false) return state
  // Partner ages each year; approximate age from stored value
  const partnerAge = (state.partner.age ?? 0) + 1
  // Years together drives marriage timing, the partner-moments memory layer and
  // the relationship-quality arc. Nothing had ever incremented it.
  // Living partners were built with no `alive` field at all, so the guards
  // written as `G.partner?.alive` — which read naturally and appear in two
  // events — were unsatisfiable for every partner the engine has ever made.
  let partner = { ...state.partner, age: partnerAge, years: (state.partner.years ?? 0) + 1, alive: state.partner.alive ?? true }
  // Natural death probability increases with age
  let deathProb = 0
  if (partnerAge >= 75) deathProb = 0.04 + (partnerAge - 75) * 0.012
  else if (partnerAge >= 65) deathProb = 0.015 + (partnerAge - 65) * 0.0025
  if (deathProb > 0 && chance(deathProb)) {
    // This used to mark the partner dead SILENTLY, on the reasoning that the
    // grief events fire in the same tick and carry the narrative. Measured over
    // 120 lives: of 37 widowings, 26 had no line anywhere at or after the death
    // naming it, and 9 went on to print texture that spoke about the partner in
    // the present tense — "You and Beatriz own the house free and clear",
    // fourteen years after Beatriz died. The grief events are follow-through.
    // The death itself has to be said.
    const updatedMem = {
      ...(state.mem ?? {}),
      widowedYear: state.currentYear,
      partnerDeathYear: state.currentYear,
    }
    const together = partner.years ?? 0
    const name = partner.name ?? 'your partner'
    const line = together >= 40
      ? `${name} dies at ${partnerAge}. ${together} years. You keep finding yourself about to say something to them, and then not.`
      : together >= 15
        ? `${name} dies at ${partnerAge}. The house does the thing houses do afterwards, which is stay exactly as it was.`
        : `${name} dies at ${partnerAge}. You had not got as far as imagining this part.`
    return {
      ...state,
      partner: { ...partner, alive: false },
      // `married` has to go with them. It was left set alongside `widowed`, so
      // every guard reading `flags.includes('married')` still passed for a
      // widow — measured in 4 of 300 lives that ended carrying both while
      // `partner` was null and the log showed one marriage.
      flags: [...new Set([...state.flags.filter(f => f !== 'married' && f !== 'engaged'), 'widowed', 'lost_partner'])],
      mem: updatedMem,
      log: [...state.log, { age: state.age, text: line, isKey: true, isDeath: true }],
    }
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
    const { minAge, maxAge: maxA, minYear, maxYear: maxY, flagRequired, riskFactors } = illness.triggerConditions
    if (state.flags.includes(illness.flag)) continue
    if (state.flags.includes(`${illness.id}_diagnosed`)) continue
    if (minAge && state.age < minAge) continue
    if (maxA && state.age > maxA) continue
    // Era gate. Without it HIV/AIDS could be diagnosed in 1950, decades before
    // the illness had a name — the data carried minYear, nothing enforced it.
    if (minYear && state.currentYear < minYear) continue
    if (maxY && state.currentYear > maxY) continue
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
    prob *= hcIllnessMod[liveCountry(state).healthcare] ?? 1.0

    // Pollution exposure increases illness risk significantly
    if (state.flags.includes('pollution_exposure')) prob *= 1.4

    if (!chance(prob)) continue

    // Scale treatment costs to country GDP (developing-world costs are lower but so are wages)
    const gdpCostMult = { very_high: 1.4, high: 1.1, medium_high: 0.9, medium: 0.7, low_medium: 0.5, low: 0.35, very_low: 0.2 }
    const costMult = gdpCostMult[liveCountry(state).gdp] ?? 1.0
    // Also scale treatment success by healthcare quality (poor healthcare = worse outcomes)
    const hcSuccessMod = { excellent: 1.15, good: 1.05, fair: 1.0, poor: 0.85, very_poor: 0.7 }
    const successMod = hcSuccessMod[liveCountry(state).healthcare] ?? 1.0

    const archetype = liveCountry(state).archetype ?? 'wealthy_west'
    const healthcare = liveCountry(state).healthcare ?? 'fair'
    // One sentence per healthcare tier meant every diagnosis in a life opened
    // identically. One Egyptian life was told five times, at 39, 48, 51, 71 and
    // 72, that "the nearest hospital is hours away or the local clinic is
    // understaffed" — and the "or" is the same defect in miniature, the game
    // declining to say which. Pools, deduped against what this character has
    // already been told, so a second diagnosis reads like a second diagnosis.
    const illnessContext = {
      excellent: [
        'The tests come back quickly. The specialist explains everything clearly. You have options.',
        'You are seen, scanned and told inside a fortnight. The efficiency is its own kind of shock.',
        'The consultant turns the screen towards you, which you understand is deliberate, and talks you through it twice.',
        'There is a leaflet. There is a named nurse. There is a number to ring at any hour. None of it makes the sentence easier to hear.',
      ],
      good: [
        'The GP refers you to a specialist. There is a wait. When you get there, the diagnosis is clear.',
        'Six weeks between the letter and the appointment. You spend them not looking anything up, and then looking everything up.',
        'The specialist is running ninety minutes behind. When your turn comes he is unhurried, which you had not expected and are grateful for.',
      ],
      fair: [
        'The clinic is busy. You wait two hours. The doctor is straightforward. Treatment is available if you can afford it.',
        'You go twice before anyone runs a test. The second doctor listens to the whole thing without interrupting.',
        'The corridor has a row of plastic chairs and everyone in it has been there longer than you.',
        'The diagnosis costs less than the treatment will, and you are told both numbers in the same breath.',
      ],
      poor: [
        'The nearest hospital is four hours by road. The diagnosis takes longer than it should.',
        'The clinic has one doctor for the whole district. He is good. There is only one of him.',
        'You describe it three times to three people before anyone writes it down.',
        'The machine that would answer it is in the city. Going to the city is a decision about money.',
      ],
      very_poor: [
        'There is no specialist here. The diagnosis is made by a doctor managing too many patients with too little.',
        'You are told what it probably is. Nobody can tell you what it definitely is, and that distinction turns out to matter.',
        'The drugs exist. They are not here. Everyone in the room knows both halves of that.',
      ],
    }
    const illnessText = `${preferUnsaid(state, illnessContext[healthcare] ?? illnessContext.fair)} You are diagnosed with ${illness.name}.`

    const event = {
      id: `illness_${illness.id}_${state.age}`,
      phase: getPhase(state.age),
      weight: 10,
      text: illnessText,
      choices: illness.treatments.map(t => {
        const adjustedCost = inEraMoney(Math.round(t.cost * costMult), liveCountry(state), state.currentYear)
        const willSucceed = Math.random() < clamp(t.successChance * successMod, 0.05, 0.98)
        return {
          text: `${t.name}${adjustedCost > 0 ? ` ($${adjustedCost.toLocaleString()})` : ' (free)'}`,
          tag: null,
          outcome: willSucceed ? t.outcomeSuccess : t.outcomeFailure,
          effect: (p) => {
            p.moNominal -= adjustedCost
            p.m += t.happinessEffect ?? 0
            if (willSucceed) {
              p.h += Math.abs(t.healthEffect ?? 0)
              // Set survivor flag for illnesses that have one
              if (illness.survivorFlag) p.addFlag(illness.survivorFlag)
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
      // Tuition was flat worldwide while salaries scale down to 0.03, so a
      // degree cost a Lagos family what it costs a Boston one.
      const baseTuition = { healthcare: 12000, business: 9000, science: 10000, arts: 7000, general: 8000 }[field] ?? 8000
      const tuition = inEraMoney(localCost(baseTuition, liveCountry(s)?.gdp), liveCountry(s), s.currentYear)
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
      const graduationText = isFirstGen
        ? `You are the first in your family to hold a university degree.`
        : `You finish university. The years of it are behind you now.`
      s.log = [...s.log, { age: s.age, text: graduationText, isKey: true }]
    } else {
      s.education = { ...s.education, level: 'secondary', field, enrolled: null }
      s.flags = [...new Set([...s.flags, 'vocational_trained', `trade_${field}`])]
      s.mem = { ...s.mem, graduated: 'vocational', vocField: field }
      s.stats = { ...s.stats, smarts: clamp(s.stats.smarts + 3, 0, 100), happiness: clamp(s.stats.happiness + 8, 0, 100) }
      s.log = [...s.log, { age: s.age, text: `The training finishes. You are qualified now. The work can begin.`, isKey: true }]
    }
  } else {
    s.education = { ...s.education, enrolled: { type, field, year: newYear } }
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

  // Phase transition — desire-aware prose + guaranteed phase entry events
  const prevPhase = getPhase(state.age)
  const newPhase = getPhase(s.age)
  if (prevPhase !== newPhase) {
    const desire = s.desire ?? null
    const _desireAdolescence = {
      prove_worth: 'The body is changing. The world is starting to require something from you — and you, more than most, feel the pressure to answer.',
      belong: 'The body is changing. The circles that matter are forming. You can feel yourself on the edge of them.',
      be_seen: 'The body is changing. Everything about adolescence is about being seen, which is terrifying and exactly what you wanted.',
      safety: 'The body is changing. The world is starting to feel more dangerous. The old habits of vigilance intensify.',
      connection: 'The body is changing. You are becoming aware of how much you want people, and how complicated that is.',
      leave_mark: 'The body is changing. Something in you is restless, looking for a way to matter.',
      freedom: 'The body is changing. The constraints that felt manageable in childhood feel unbearable now.',
      redemption: 'The body is changing. The weight you carry is starting to have a shape.',
    }
    const _desireYoungAdult = {
      prove_worth: 'You are eighteen. The proof-of-worth project has a new arena now. The life begins in earnest.',
      belong: 'You are eighteen. The search for where you belong has new geography now. The life begins in earnest.',
      be_seen: 'You are eighteen. The world is large and you are ready to be seen in it. The life begins in earnest.',
      safety: 'You are eighteen. The structures of childhood fall away. You will need to build your own. The life begins in earnest.',
      connection: 'You are eighteen. The connections you build now will shape everything that follows. The life begins in earnest.',
      leave_mark: 'You are eighteen. The mark you want to make has its first real opportunity now. The life begins in earnest.',
      freedom: 'You are eighteen. The life you were handed is behind you. The one you choose begins now.',
      redemption: 'You are eighteen. Whatever needs to be set right, you can begin to set it right now. The life begins in earnest.',
    }
    const _desireMidlife = {
      prove_worth: 'You are thirty. The proving has been ongoing. You are beginning to notice whether it is working.',
      belong: 'You are thirty. The life you have built around belonging is recognizable now. The question of whether it fits is a different question.',
      be_seen: 'You are thirty. The visibility you have built is real. What it hides is also becoming real.',
      safety: 'You are thirty. The structures hold. The cost of building them is becoming visible.',
      connection: 'You are thirty. The people in your life are the people in your life. You are beginning to understand what that means.',
      leave_mark: 'You are thirty. What you are building is starting to have a shape. Whether it is the right shape is a new question.',
      freedom: 'You are thirty. The life you built for yourself — away from what was given — is your life now. You can see it.',
      redemption: 'You are thirty. The work of making things right has been ongoing. The ledger is complex.',
    }
    const _desireLateLife = {
      prove_worth: 'You are fifty. The proof-of-worth is what it is. The question of what it was for is not going away.',
      belong: 'You are fifty. The belonging — what you found, what you made, what you couldn\'t quite reach — is visible now from a height.',
      be_seen: 'You are fifty. You have been seen, and not seen, in the ways available to you. This is the half where you live with that.',
      safety: 'You are fifty. The structures you built are what they are. Some held. Some were unnecessary. You carry both.',
      connection: 'You are fifty. The people. Always the people. What you built with them. What remains.',
      leave_mark: 'You are fifty. The mark question simplifies now. Not history. What you leave in the people who knew you.',
      freedom: 'You are fifty. The escapes and resistances of a lifetime. What they opened. What they cost.',
      redemption: 'You are fifty. The reckoning is closer than it was. The debt question has a new urgency.',
    }
    const phaseLine = {
      childhood: 'The early years end. You begin to know where you are.',
      adolescence: (desire && _desireAdolescence[desire]) ?? 'The body is changing. The world is starting to require something from you.',
      young_adult: (desire && _desireYoungAdult[desire]) ?? 'You are eighteen. The life begins in earnest.',
      midlife:     (desire && _desireMidlife[desire]) ?? 'You are thirty. The life you have been building has become recognizable as a life.',
      late_life:   (desire && _desireLateLife[desire]) ?? 'You are fifty. What you carry into this half is mostly set.',
    }[newPhase]
    if (phaseLine) s.log = [...s.log, { age: s.age, year: s.currentYear, text: phaseLine, isKey: true, isPhaseTransition: true, toPhase: newPhase }]

    // Inject guaranteed phase entry decision events at key phase boundaries
    const phaseEntryMap = getPhaseEntryMap()
    const usedMap = s.usedEventMap ?? new Map()
    if (newPhase === 'young_adult' && !usedMap.has('phase_entry_young_adult') && !s.queue.some(e => e.id === 'phase_entry_young_adult')) {
      const evt = phaseEntryMap.get('phase_entry_young_adult')
      if (evt) s.queue = [evt, ...s.queue]
    }
    if (newPhase === 'midlife' && !usedMap.has('phase_entry_midlife') && !s.queue.some(e => e.id === 'phase_entry_midlife')) {
      const evt = phaseEntryMap.get('phase_entry_midlife')
      if (evt) s.queue = [evt, ...s.queue]
    }
    if (newPhase === 'late_life' && !usedMap.has('phase_entry_late_life') && !s.queue.some(e => e.id === 'phase_entry_late_life')) {
      const evt = phaseEntryMap.get('phase_entry_late_life')
      if (evt) s.queue = [evt, ...s.queue]
    }
  }

  // Life skeleton beat scheduling — guaranteed narrative beats at key ages
  // Only scheduled if desire is set (wound events must have fired first)
  {
    const lifeSkelMap = getLifeSkeletonMap()
    const usedMap = s.usedEventMap ?? new Map()
    const scheduleLifeBeat = (id, age) => {
      if (s.age === age && s.desire && !usedMap.has(id) && !s.queue.some(e => e.id === id)) {
        const evt = lifeSkelMap.get(id)
        if (evt) s.queue = [evt, ...s.queue]
      }
    }
    scheduleLifeBeat('ls_first_test', 15)
    scheduleLifeBeat('ls_the_fork', 30)
    scheduleLifeBeat('ls_the_cost', 40)
    scheduleLifeBeat('ls_the_reckoning', 55)
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
      // The post-release arc stages itself on years-since; without this stamp it
      // reads releasedYear as "this year" forever and never advances.
      s.mem = { ...(s.mem ?? {}), releasedYear: s.currentYear }
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
        if (!prisonEvent.choices || prisonEvent.choices.length === 0) {
          const proxy = buildEffectProxy(s)
          if (prisonEvent.effect) prisonEvent.effect(proxy)
          s = applyProxy(s, proxy)
          s = resolveProxyExtras(s, proxy)
          s = trackCadence(s, prisonEvent, s.currentYear)
          s = markEventUsed(s, prisonEvent)
          s.log = [...s.log, { age: s.age, text: typeof prisonEvent.text === 'function' ? prisonEvent.text(buildG(s)) : prisonEvent.text, isKey: false }]
        } else if (s.mode === 'passive') {
          const idx = pickChoiceAutomatically(prisonEvent, buildG(s))
          return resolveChoice({ ...s, pendingEvent: prisonEvent }, idx)
        } else {
          // Marked used on resolution, like every other event, so closing the tab
          // mid-event cannot silently consume it.
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

  // Pending birth — delivered the year after conception.
  //
  // It used to be two age-up cycles, to make room for the pregnancy-texture
  // events to fire in between. The cost was visible in every life log that
  // contained a birth: "You are pregnant" at 15 and "Adesuwa Amao is born" at
  // 17, four times over in one Nigerian life. A year is already generous for a
  // nine-month pregnancy; two is a different species. The texture now fires in
  // the conception year, which is where learning you are pregnant belongs.
  if (s.flags.includes('pregnant') || s.flags.includes('expecting')) {
    // Normalise: if pregnancyYear not in mem (e.g. set by IVF event), initialise it
    if (s.mem?.pregnancyYear === undefined) {
      const cGender = chance(0.5) ? 'male' : 'female'
      const c = s.character?.country
      const childName = c ? personName(c, cGender, s, { surname: s.character.surname }) : 'Baby'
      s.mem = { ...(s.mem ?? {}), pregnancyYear: s.age - 1, pendingChild: { name: childName, gender: cGender, traits: pickTraits(CHILD_TRAITS) } }
    }
    if (s.age >= (s.mem.pregnancyYear ?? 0) + 1) {
      const pc = s.mem.pendingChild
      const archetype = s.character?.country?.archetype
      const healthcare = s.character?.country?.healthcare
      const isHighRisk = (s.currentYear < 1950) || archetype === 'subsaharan' || archetype === 'conflict_zone' ||
        archetype === 'developing_unstable' || s.flags.includes('high_risk_pregnancy') ||
        healthcare === 'very_poor' || healthcare === 'poor'
      // Maternal mortality applies to the person carrying the child. A male
      // character whose partner is expecting was dying of "Complications in
      // childbirth" at eight per five hundred lives.
      const playerIsBearing = s.flags.includes('pregnant')
      const deathProb   = !playerIsBearing ? 0     : isHighRisk ? 0.018 : 0.001
      const compProb    = !playerIsBearing ? 0     : isHighRisk ? 0.10  : 0.03

      // Generate child if somehow still missing
      const childData = pc ?? (() => {
        const cg = chance(0.5) ? 'male' : 'female'
        const cc = s.character?.country
        const cn = cc ? personName(cc, cg, s, { surname: s.character.surname }) : 'Baby'
        return { name: cn, gender: cg, traits: pickTraits(CHILD_TRAITS) }
      })()

      const child = { name: childData.name, gender: childData.gender, ageAtBirth: s.age, relationshipQuality: 80, traits: childData.traits }
      s.children = [...s.children, child]
      s.mem = { ...s.mem, pregnancyYear: undefined, pendingChild: undefined }

      if (chance(deathProb)) {
        // Maternal death — rare; child survives
        s.flags = [...new Set([...s.flags.filter(f => f !== 'pregnant' && f !== 'expecting'), 'parent'])]
        s.log = [...s.log, { age: s.age, text: `${child.name} is born. You do not survive the labour.`, isKey: true }]
        return { ...s, dead: true, causeOfDeath: 'Complications in childbirth', ribbon: assignRibbon(s), screen: 'death' }
      } else if (chance(compProb)) {
        // Near-miss complication — events will pick this up via birth_complication_survived flag
        s.flags = [...new Set([...s.flags.filter(f => f !== 'pregnant' && f !== 'expecting'), 'parent', 'birth_complication_survived'])]
        s.stats = { ...s.stats, health: clamp(s.stats.health - 20, 0, 100) }
        s.log = [...s.log, { age: s.age, text: `${child.name} is born. There were complications. You came close to not surviving.`, isKey: true }]
      } else {
        s.flags = [...new Set([...s.flags.filter(f => f !== 'pregnant' && f !== 'expecting'), 'parent'])]
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
    const preInterestDebt = s.debt
    const interest = Math.round(s.debt * interestRate)
    s.debt = s.debt + interest
    s.money = (s.money ?? 0) - Math.round(preInterestDebt * 0.05) // minimum payment (5% of pre-interest balance)
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

  // Children's ages are derived, not stored at birth: `ageAtBirth` is the
  // parent's age when the child arrived, so the child's age is the difference.
  // Ten reads of `child.age` across yearTexture, epitaph and mundaneLayer were
  // comparing against undefined, silently killing the teen-children,
  // estranged-child, children-abroad and grandparent texture.
  if (s.children?.length) {
    s.children = s.children.map(c => ({ ...c, age: Math.max(0, s.age - (c.ageAtBirth ?? s.age)) }))

    // `cared_for_children` gates the late-life grandchild and children-support
    // beats, and was set NOWHERE — so one of those events could never fire and
    // its inverse-guarded partner always did. Earned here instead: raising a
    // child to adulthood while the relationship holds.
    if (!s.flags.includes('cared_for_children') &&
        s.children.some(c => (c.age ?? 0) >= 18 && (c.relationshipQuality ?? 0) >= 50)) {
      s.flags = [...new Set([...s.flags, 'cared_for_children'])]
    }
  }

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
    // Denominated, and floored: this is a undocumented life paying for its own
    // precarity, not an overdraft facility. Unclamped it drove balances
    // negative, which the interface has no way to mean.
    s.money = Math.max(0, (s.money ?? 0) - inEraMoney(200, liveCountry(s), s.currentYear))
  }

  // Climate-displaced pressure (limbo residency — no legal status, limited services)
  if (s.residencyStatus === 'climate_displaced') {
    s.stats = { ...s.stats, health: clamp((s.stats.health ?? 80) - 2, 0, 100), happiness: clamp((s.stats.happiness ?? 50) - 4, 0, 100) }
    // Denominated, and floored: this is a climate-displaced life paying for its own
    // precarity, not an overdraft facility. Unclamped it drove balances
    // negative, which the interface has no way to mean.
    s.money = Math.max(0, (s.money ?? 0) - inEraMoney(150, liveCountry(s), s.currentYear))
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
      [(m.act_count_gym ?? 0) + (m.act_count_join_sports_team ?? 0) + (m.act_count_yoga ?? 0), 10, 'fitness_devotee'],
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
  s = applySoundtrack(s)

  // Mundane layer — daily-life texture alongside main events
  // ─── Annual texture ─────────────────────────────────────────────────────────
  // buildYearTexture holds the memory layer (grief staged by years-since), the
  // conditions and project layers, place-and-era fragments and seasonal prose —
  // ~14,800 lines of the most life-aware writing in the game. It used to be
  // reachable ONLY when the event pool came back empty, which with ~2,000
  // broadly-guarded contemplative events essentially never happened, so it fired
  // in about 2% of years. It is a layer now, not a fallback: it speaks first
  // whenever it has something specific to say about THIS life, and the mundane
  // layer fills the years when it does not.
  //
  // Both layers are filtered through `fitsThisYear`, because a Cambodian in
  // 1977 was being told that the prices had risen and the wages had not caught
  // up, four years after Democratic Kampuchea abolished prices and wages. The
  // event pool is filtered in getNextEvent; these two are filtered here.
  const fitsThisYear = (t) => t && proseFitsInstitutions(
    t, s.currentCountry?.name ?? s.character?.country?.name, s.currentYear)

  const drawn = chance(0.6) ? buildYearTexture(s, { specificOnly: true }) : null
  const specificTexture = fitsThisYear(drawn) ? drawn : null
  if (specificTexture) {
    s.log = [...s.log, { age: s.age, year: s.currentYear, text: specificTexture, isKey: false, isTexture: true }]
    s.mem = rememberSaid(s.mem, specificTexture)
  } else {
    const mundaneText = buildMundaneLayer(s)
    if (fitsThisYear(mundaneText)) {
      s.log = [...s.log, { age: s.age, year: s.currentYear, text: mundaneText, isKey: false, isMundane: true }]
      s.mem = rememberSaid(s.mem, mundaneText)
    }
  }

  // Education progression
  s = tickEnrollment(s)

  // Leaving school, at the age and the rate this place and decade actually did.
  // Without this, every character who had not explicitly dropped out graduated
  // secondary school, including in countries where one child in ten did.
  if (s.age === 16 && !s.mem?.schoolingResolved && !s.flags.includes('graduated_hs')) {
    s.mem = { ...(s.mem ?? {}), schoolingResolved: true }
    // Someone already out of school did not finish secondary, so their level is
    // resolved here too rather than skipped — skipping it let them fall through
    // to the age-18 graduation block and collect the certificate anyway, which
    // is why the subsistence cohorts did not move when this gate was added.
    const alreadyOut = s.flags.includes('dropped_out') || s.flags.includes('child_labor') ||
      s.flags.includes('left_school_early')
    // Working young is not the same as being out of school: across most of the
    // world children do both, and treating the two as identical swung the
    // subsistence cohorts from 95% secondary completion straight to 0%.
    const p = secondaryChance(s) * (s.flags.includes('working_young') ? 0.45 : 1)
    if (alreadyOut || !chance(p)) {
      // One source of truth. createCharacter already rolls literacy from the
      // country's own figures at birth; rolling it again here would let a
      // character be illiterate by one mechanism and schooled by the other,
      // and the whole illiteracy arc guards on G.literate.
      const literate = s.character?.literate ?? chance(primaryChance(s))
      s.education = { ...s.education, level: literate ? 'primary' : 'none', enrolled: null }
      // A character who attended is one who left early; one who never attended
      // is `never_schooled`. Setting both made every guard reading either one
      // true for the same life.
      const everAttended = literate || s.flags.includes('dropped_out') ||
        s.flags.includes('left_school_early') || s.mem?.attendedSchool === true
      s.flags = [...new Set([...s.flags, ...(everAttended ? ['left_school_early'] : ['never_schooled'])])]
      s.log = [...s.log, {
        age: s.age, year: s.currentYear, isKey: true,
        text: literate
          ? pickFrom([
              'You stop going. There is no last day that anybody marks — there is a week you are needed at home, and then another, and by the time the question comes up again it has answered itself.',
              'School ends because the fees do. Nobody in the house says it is permanent and nobody says it is not.',
              'You can read, and write your name, and do the arithmetic that the work requires. That is what the years of it were for, and it turns out to be enough for the life you get.',
            ])
          : everAttended
            ? pickFrom([
                'The reading never took. You were in the room for some of it and the letters stayed letters, and then you were needed elsewhere.',
                'You leave without the reading. Nobody says this is what has happened; it is simply what you take with you.',
              ])
            : pickFrom([
                'There was never a school to leave. The nearest one is a long way off and the family needs what you can do here.',
                'You do not learn to read. It is not a decision anyone makes; it is simply not among the things that were going to happen to you.',
              ]),
      }]
    }
  }

  // High school graduation at 18.
  //
  // `institutionExists` because there are years in which nobody in a country
  // graduated from anything: Democratic Kampuchea closed every school in 1975
  // and did not reopen one, and a Cambodian eighteen-year-old in 1979 was being
  // asked what they would like to study at university.
  const schoolsOpen = institutionExists(
    s.currentCountry?.name ?? s.character?.country?.name, s.currentYear, 'school')
  if (schoolsOpen && s.age === 18 && !s.flags.includes('graduated_hs') && !s.flags.includes('dropped_out') && !s.flags.includes('child_labor') && !s.flags.includes('left_school_early') && !s.flags.includes('never_schooled') && !s.education?.enrolled && !s.usedEventMap?.has('hs_graduation')) {
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

  // ─── The ordinary course of a life ──────────────────────────────────────────
  // Work, a partner, a marriage, children, retirement. Every one of these was a
  // button and nothing else, so an unsteered life reached sixty-five having
  // never held a job or married anyone — which also starved the `earned`
  // register and the whole follow-through layer, both of which are written
  // about a partner, a child, a job. Runs after enrollment so that schooling
  // has already decided when work can start. Each hook is a no-op if the player
  // has already filled that slot themselves.
  s = tickLifeCourse(s)

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

  // Retirement income. retire() logs a specific annual pension; before this,
  // nothing ever paid it, so retirees earned nothing while the poverty premium
  // and maintenance costs kept draining them. Subsistence economies have no
  // formal pension, which is itself the historically accurate outcome.
  if (s.retired && s.pensionAnnual > 0) {
    const arch = liveCountry(s)?.archetype
    const formal = !['subsaharan', 'developing_unstable', 'conflict_zone'].includes(arch)
    if (formal) s.money = (s.money ?? 0) + s.pensionAnnual
    else if (chance(0.25)) s.money = (s.money ?? 0) + Math.round(s.pensionAnnual * 0.3)
  }

  // Charisma passive drain under authoritarian regimes (self-suppression of social energy)
  if (s.flags.includes('learned_silence') || s.flags.includes('authoritarian_childhood')) {
    const regime = getCountryRegime(liveCountry(s), s.currentYear)
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
  // A sentence interrupts a career; it does not advance one. The event pool and
  // the household contribution were already prison-guarded and this was not, so
  // `yearsInRole` accrued, promotions fired and the salary kept arriving —
  // observed as "You are promoted to Senior Interpreter. New salary: $29,133/yr"
  // to a character in prison.
  if (s.career && !s.inPrison) {
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
  if (s.career && !s.inPrison) {
    // Cost-of-living re-denomination. The stored wage is nominal, so a wage set
    // in 1950 and never promoted was still paying 1950 money in 1990 — the
    // character was not fired, they were simply left behind by the arithmetic.
    if (!s.career.baseSalary) {
      s.career = { ...s.career, baseSalary: inTodayMoney(s.career.salary, liveCountry(s), s.currentYear) }
    }
    const redenominated = inEraMoney(s.career.baseSalary, liveCountry(s), s.currentYear)
    if (redenominated !== s.career.salary) s.career = { ...s.career, salary: redenominated }
    let annual = s.career.partTime ? Math.round(s.career.salary * 0.5) : s.career.salary
    // Agriculture: harvest variance ±50% — a good year and a bad year feel completely different
    if (s.career.field === 'agriculture') {
      const harvestFactor = 1 + randomBetween(-50, 60) / 100
      annual = Math.max(0, Math.round(annual * harvestFactor))
      if (harvestFactor < 0.7) s.log = [...s.log, { age: s.age, isKey: false, text: pickFrom([
        'A bad year for the harvest. You earn significantly less than expected.',
        'The rains were wrong — too late, or too much at once — and the yield shows it.',
        'A poor year. You will be eating into what was put by, and you know exactly how far it goes.',
        'Less than half of what you planned for. The arithmetic of the next twelve months changes in an afternoon.',
        'The crop failed in the way crops fail: not all at once, but visibly, for weeks, while you watched.',
      ]) }]
      else if (harvestFactor > 1.4) s.log = [...s.log, { age: s.age, isKey: false, text: pickFrom([
        'A good harvest. The yield is better than most years.',
        'The rains came when they were supposed to and stopped when they were supposed to. It is not always like this.',
        'More than the store will hold. There is a decision to make about the surplus and it is a good decision to have.',
        'A year the ground gave back what was asked of it. You will remember this one when a bad one comes.',
        'The neighbours had it too, which means the price will be poor. You would still rather have the crop.',
      ]) }]
    }
    s.money = (s.money ?? 0) + annual
    // The wealth stat is a quality-of-life reading, so it has to be taken in a
    // unit that means the same thing in 1950 as in 2020. Off the nominal
    // balance it collapsed the moment money was denominated: a comfortable 1950
    // household holding $800 read as Destitute, which is not a cosmetic problem
    // — the stat gates event weighting and the whole poverty branch of the
    // corpus.
    const wealthLevel = clamp(Math.round((Math.log10(Math.max(1, inTodayMoney(s.money, liveCountry(s), s.currentYear))) - 2.5) * 22), 5, 98)
    s.stats = { ...s.stats, wealth: wealthLevel }
    // Fame accumulation for entertainment/sports careers
    if (s.career.field === 'entertainment' || s.career.field === 'sports') {
      const fameGain = clamp((s.career.level + 1) * 5 + randomBetween(-3, 6), 1, 25)
      s.fame = clamp((s.fame ?? 0) + fameGain, 0, 100)
    }
  }

  s = tickLivingCosts(s)

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

  // Partner relationship drift. tickPartner already ages the partner and drifts
  // the relationship earlier in the year; this pass pulls toward equilibrium and
  // handles breakups. It must skip the dead — a deceased partner used to go on
  // drifting, accruing years, and could still "leave" the character.
  if (s.partner && s.partner.alive !== false) {
    const drift = (55 - s.partner.relationshipQuality) * 0.03 + randomBetween(-2, 2)
    const newQ = clamp(s.partner.relationshipQuality + drift, 0, 100)
    s.partner = { ...s.partner, relationshipQuality: newQ }
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
      if (lines) moments.push(pickFrom(lines))
    }
    s.mem = { ...(s.mem ?? {}), partnerMoments: moments, partnerMomentsGenerated: true }
  }
  // Refresh partner moments occasionally as the relationship continues
  if (s.partner && s.partner.traits?.length && s.mem?.partnerMomentsGenerated && (s.partner.years ?? 0) > 0 && s.partner.years % 7 === 0) {
    const existing = s.mem.partnerMoments ?? []
    const trait = pickFrom(s.partner.traits.filter(t => TRAIT_PROSE[t]))
    if (trait) {
      const newMoment = pickFrom(TRAIT_PROSE[trait])
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

  // Echo queue processing — check for scheduled follow-up events that should fire this year
  if (s.echoQueue?.length) {
    const dueEchoes = s.echoQueue.filter(e => s.age >= e.fireAtAge)
    if (dueEchoes.length > 0) {
      s.echoQueue = s.echoQueue.filter(e => s.age < e.fireAtAge)
      const allEvents = [...EVENTS, ...LIFE_SKELETON_EVENTS]
      for (const echo of dueEchoes) {
        const evt = allEvents.find(e => e.id === echo.eventId)
        if (evt && !s.queue.some(e => e.id === evt.id)) {
          s.queue = [...s.queue, evt]
        }
      }
    }
  }

  // Get next event
  const event = getNextEvent(s)
  if (!event) {
    s.pendingEvent = null
    const texture = buildYearTexture(s)
    if (texture && proseFitsInstitutions(
      texture, s.currentCountry?.name ?? s.character?.country?.name, s.currentYear)) {
      s.log = [...s.log, { age: s.age, year: s.currentYear, text: texture, isKey: false, isTexture: true }]
      s.mem = rememberSaid(s.mem, texture)
    }
    return s
  }

  if (s.queue.some(e => e.id === event.id)) s.queue = s.queue.filter(e => e.id !== event.id)

  // NOTE: the event is deliberately NOT marked used here. It is marked used when
  // it RESOLVES (resolveAutoEvent / resolveChoice). Stamping at selection time
  // meant that closing the tab between Age Up and answering consumed the event
  // permanently — its effect never applied — which silently ate guaranteed beats
  // like the graduation chain and illness diagnoses.

  // Resolve function text so EventBox and logs always receive strings
  // `event.text` and `choice.outcome` were both resolved when they were
  // functions; `choice.text` never was, so EventBox rendered `{choice.text}`
  // with a function in it — React warns "Functions are not valid as a React
  // child" and draws an empty button. Five choices in the corpus are written
  // this way, and all three of `inf_enter_informal`'s are, so entering the
  // informal economy — a core path for the archetypes the game is proudest of
  // — presented a paragraph above three completely blank buttons.
  const G = buildG(s)
  const resolvedText = typeof event.text === 'function' ? event.text(G) : (event.text ?? '')
  const needsChoiceText = (event.choices ?? []).some(c => typeof c.text === 'function')
  const resolvedChoices = needsChoiceText
    ? event.choices.map(c => (typeof c.text === 'function' ? { ...c, text: c.text(G) } : c))
    : event.choices
  const resolvedEvent = (resolvedText !== event.text || needsChoiceText)
    ? { ...event, text: resolvedText, choices: resolvedChoices }
    : event

  if (!resolvedEvent.choices || resolvedEvent.choices.length === 0) {
    s.pendingEvent = { ...resolvedEvent, isAutomatic: true }
    return s
  }

  // Passive mode: the life goes the way it goes. Choice events still fire, but
  // the character makes the choice, and the year resolves in one beat.
  if (s.mode === 'passive') {
    const idx = pickChoiceAutomatically(resolvedEvent, buildG(s))
    return resolveChoice({ ...s, pendingEvent: resolvedEvent }, idx)
  }

  s.pendingEvent = resolvedEvent
  return s
}

// An event is consumed when it resolves, not when it is shown.
function markEventUsed(s, event) {
  if (!event?.id) return s
  return { ...s, usedEventMap: new Map([...(s.usedEventMap ?? new Map()), [event.id, s.currentYear]]) }
}

// Record the cadences selection depends on. Classified by module membership
// (event.contemplative), never by id prefix — see getNextEvent.
function trackCadence(s, event, year) {
  if (!event) return s
  const mem = { ...(s.mem ?? {}) }
  let touched = false
  if (event.contemplative) { mem.lastContemplativeYear = year; touched = true }
  if (event.isGlimpse) { mem.lastGlimpseYear = year; touched = true }
  return touched ? { ...s, mem } : s
}

export function resolveAutoEvent(state) {
  const { pendingEvent } = state
  if (!pendingEvent?.isAutomatic) return state

  const proxy = buildEffectProxy(state)
  if (pendingEvent.effect) pendingEvent.effect(proxy)
  let s = applyProxy(state, proxy)
  s = resolveProxyExtras(s, proxy)
  s = trackCadence(s, pendingEvent, state.currentYear)
  s = markEventUsed(s, pendingEvent)

  s.log = [...s.log, { age: state.age, year: state.currentYear, eventId: pendingEvent.id ?? null, text: pendingEvent.text, isKey: pendingEvent.isKey ?? false, isLetter: pendingEvent.isLetter ?? false, isPhaseTransition: pendingEvent.isPhaseTransition ?? false }]
  s.pendingEvent = null
  return s
}

export function resolveChoice(state, choiceIndex) {
  const { pendingEvent } = state
  if (!pendingEvent?.choices) return state
  const choice = pendingEvent.choices[choiceIndex]
  if (!choice) return state

  const proxy = buildEffectProxy(state)
  // An event may carry BOTH a top-level effect (once-only latches, setMem
  // guards) and per-choice effects. The top-level one used to be silently
  // dropped here, so its latch never set and the event could re-fire forever.
  if (pendingEvent.effect) pendingEvent.effect(proxy)
  if (choice.effect) choice.effect(proxy)
  let s = applyProxy(state, proxy)
  s = resolveProxyExtras(s, proxy)
  if (choice.tag) s.flags = [...new Set([...s.flags, choice.tag])]
  if (choice.inject) s.queue = [...s.queue, choice.inject]
  s = trackCadence(s, pendingEvent, state.currentYear)
  s = markEventUsed(s, pendingEvent)
  const evtText = typeof pendingEvent.text === 'function' ? pendingEvent.text(buildG(state)) : (pendingEvent.text ?? '')
  const outcomeText = typeof choice.outcome === 'function' ? choice.outcome(buildG(s)) : (choice.outcome ?? '')
  // The moments the player actually shaped used to be the ONLY truncated
  // entries in the log. Keep the full prose and carry the outcome alongside it.
  s.log = [...s.log, {
    age: state.age, year: state.currentYear, eventId: pendingEvent.id ?? null,
    text: evtText, outcome: outcomeText, choiceText: choice.text ?? null,
    isKey: true, isChoice: true, isLetter: pendingEvent.isLetter ?? false,
  }]
  s.pendingEvent = null
  return s
}

// ─── Passive mode ─────────────────────────────────────────────────────────────
// In passive mode the player reads a life rather than steering it, so choice
// events still fire but resolve themselves. The pick is not uniform: it leans
// toward what this particular character, with these stats and this formative
// desire, would plausibly do — so a passively-read life still coheres.
// Flags that say which way this person has already jumped. Passive mode is the
// game's purest expression of its own principle, and a character who answers
// each year's question independently is not a person — they are a coin. What
// makes a life read as one life is that the choice at fifty rhymes with the
// choice at twenty.
const DEFIANT_FLAGS = [
  'refused_to_name', 'would_not_recant', 'took_it_alone', 'refused_to_serve',
  'protected_source_at_cost', 'defended_the_land', 'activist', 'dissident_reader',
  'dissident_writer', 'detained_at_protest', 'union_solidarity', 'strike_victory',
]
const YIELDING_FLAGS = [
  'named_someone', 'signed_the_confession', 'gave_up_source', 'reported_late',
  'lost_the_land', 'compromised', 'sold_out', 'made_peace_with_renting',
]

/** −1 (bends) to +1 (refuses), from what this character has already done. */
function disposition(G) {
  let d = 0
  for (const f of DEFIANT_FLAGS) if (G.flags.has ? G.flags.has(f) : G.flags.includes(f)) d += 1
  for (const f of YIELDING_FLAGS) if (G.flags.has ? G.flags.has(f) : G.flags.includes(f)) d -= 1
  if (G.political_leaning === 'dissident') d += 1.5
  else if (G.political_leaning === 'nationalist') d += 0.5
  else if (G.political_leaning === 'apolitical') d -= 0.75
  return Math.max(-1, Math.min(1, d / 3.5))
}

function scoreChoiceForCharacter(choice, G, index) {
  let score = 1
  const text = `${choice.text ?? ''} ${choice.tag ?? ''}`.toLowerCase()
  const s = G.stats ?? {}
  const disp = disposition(G)
  const dependants = (G.children?.length ?? 0) > 0 || !!G.partner

  // A choice may DECLARE which way it goes, via tag: 'defiant' | 'yielding'.
  // Inferring it from the choice text alone gets the hardest cases backwards:
  // "Say nothing at all", under interrogation, is the defiant answer and the
  // one that costs four years, and a keyword scan reads it as acquiescence.
  // The keyword rules below stay as the fallback for the ~8,000 events written
  // before this existed.
  if (choice.tag === 'defiant' || choice.tag === 'yielding') {
    const sign = choice.tag === 'defiant' ? 1 : -1
    score *= 1 + sign * disp * 1.05
    if (sign > 0) {
      score *= 0.6 + (s.charisma ?? 50) / 100
      if (G.desire === 'leave_mark' || G.desire === 'freedom') score *= 1.4
      if (['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime)) score *= 0.6
      if (dependants) score *= 0.75
    } else if (dependants) score *= 1.2
    return Math.max(0.05, score)
  }

  if (/refuse|resist|argue|fight|confront|report|speak/.test(text)) {
    score *= 0.6 + (s.charisma ?? 50) / 100
    if (G.desire === 'leave_mark' || G.desire === 'freedom') score *= 1.5
    if (['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime)) score *= 0.55
    // A person who has refused before refuses again, and a person who has
    // already bent finds it easier to bend.
    score *= 1 + disp * 1.15
    // People with someone at home take fewer of these, which is most of how
    // authoritarian states actually work.
    if (dependants) score *= 0.75
  }
  if (/stay|remain|keep|accept|endure|say nothing|silent|nothing/.test(text)) {
    if (G.desire === 'safety' || G.desire === 'belong') score *= 1.5
    score *= 1 - disp * 0.75
    if (dependants) score *= 1.2
  }
  if (/leave|go|move|emigrate|abroad/.test(text)) {
    if (G.desire === 'freedom' || G.desire === 'prove_worth') score *= 1.4
    if (G.desire === 'belong') score *= 0.7
    // Leaving is a young person's answer far more often than an old one's, and
    // it costs money that a poor character does not have.
    if ((G.age ?? 30) > 55) score *= 0.5
    if ((G.money ?? 0) < 400) score *= 0.7
  }
  if (/study|learn|school|read|train/.test(text)) score *= 0.7 + (s.smarts ?? 50) / 100
  if (/pay|buy|spend|afford/.test(text) && (G.money ?? 0) < 500) score *= 0.35
  if (/steal|cheat|lie|bribe/.test(text)) {
    score *= (G.karma ?? 50) < 40 ? 1.4 : 0.6
    // Desperation is a better predictor than character.
    if ((G.money ?? 0) < 200) score *= 1.6
  }
  // Anything the body has to do gets harder with age and illness.
  if (/run|climb|carry|lift|walk|march|physical|labour|labor/.test(text)) {
    score *= 0.5 + (s.health ?? 50) / 100
    if ((G.age ?? 30) > 60) score *= 0.6
  }
  // Someone already carrying a lot of regret reaches for the repair.
  if (/apolog|make amends|reconcile|forgive|reach out|call|visit|tell them/.test(text)) {
    score *= 1 + Math.max(0, ((G.regret ?? 0) - 40)) / 100
  }
  return Math.max(0.05, score)
}

export function pickChoiceAutomatically(event, G) {
  const choices = event.choices ?? []
  if (choices.length === 0) return 0
  const scores = choices.map((c, i) => scoreChoiceForCharacter(c, G, i))
  const total = scores.reduce((a, b) => a + b, 0)
  let r = Math.random() * total
  for (let i = 0; i < scores.length; i++) {
    r -= scores[i]
    if (r <= 0) return i
  }
  return choices.length - 1
}


// Internal functions needed by playerActions.js
export { buildEffectProxy, applyProxy, resolveProxyExtras }
import { personName } from './names'
