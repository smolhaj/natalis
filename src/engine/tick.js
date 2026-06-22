import { COUNTRIES } from '../data/countries'
import { EVENTS, EVENTS_BY_PHASE } from '../data/events'
import { WORLD_EVENTS } from '../data/worldEvents'
import { RIBBONS } from '../data/ribbons'
import { CAREERS } from '../data/careers'
import { PROPERTY_TYPES } from '../data/assets'
import { PLACES, pickNeighborhoodTier, pickNamedNeighborhood } from '../data/places'
import { HEADLINES } from '../data/headlines'
import { SOUNDTRACK } from '../data/soundtrack'
import { randomBetween, pickFrom, clamp, chance } from '../utils/random'
import {
  FlagSet, getPhase, getCountryRegime, isLgbtqCriminalized,
  GDP_MULT, HYPERINFLATION_DRAIN, getHyperinflation,
  calculateHouseholdContribution,
  ADULT_TRAITS, CHILD_TRAITS, pickTraits, TRAIT_PROSE, BUSINESS_TYPES, PARTNER_OCCUPATIONS,
} from './character'
import { buildYearTexture } from './yearTexture'

function createProxy(state) {
  return {
    h: 0, m: 0, w: 0, e: 0, s: 0, lo: 0, r: 0, mo: 0, karma: 0, fame: 0, legacy: 0,
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
  const regret  = clamp(state.regret + proxy.r, 0, 100)
  const money   = Math.max(0, (state.money ?? 0) + (proxy.mo ?? 0))
  const karma   = clamp((state.karma ?? 50) + (proxy.karma ?? 0), 0, 100)
  const fame    = clamp((state.fame ?? 0) + (proxy.fame ?? 0), 0, 100)
  const legacy  = clamp((state.legacy ?? 0) + (proxy.legacy ?? 0), 0, 100)
  const flags   = [...new Set(proxy.flags)]
  return { ...state, stats, regret, money, karma, fame, legacy, flags, mem: proxy.mem }
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
    'lost_parent_father', 'lost_parent_mother', 'lost_friend', 'widowed', 'lost_child',
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
  proxy.killPartner = () => { proxy._killPartner = true; proxy.mem['lastMajorEvent_bereavement'] = state.currentYear }
  proxy.releaseFromPrison = () => { proxy._releaseFromPrison = true }
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
  if (proxy._echoQueue?.length) {
    next = { ...next, echoQueue: [...(next.echoQueue ?? []), ...proxy._echoQueue] }
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
  const leaning = G.political_leaning
  const totalWeight = pool.reduce((sum, e) => sum + (e.weight ?? 1) * desireWeight(e.id, desire) * statWeight(e.id, G) * leaningWeight(e.id, leaning), 0)
  let r = Math.random() * totalWeight
  for (const event of pool) {
    r -= (event.weight ?? 1) * desireWeight(event.id, desire) * statWeight(event.id, G) * leaningWeight(event.id, leaning)
    if (r <= 0) return event
  }
  return pool[pool.length - 1]
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
    // Season (0=winter 1=spring 2=summer 3=autumn) derived deterministically per year.
    // Southern-hemisphere countries swap summer/winter. Tropical countries stay 0/1 (dry/wet).
    season: (() => {
      const southernHemisphere = new Set([
        'Australia','New Zealand','Argentina','Brazil','Chile','South Africa','Peru',
        'Bolivia','Uruguay','Paraguay','Zimbabwe','Zambia','Mozambique','Angola',
        'Namibia','Tanzania','Kenya','Rwanda','Burundi','Madagascar','Malawi',
      ])
      const tropical = new Set([
        'Nigeria','Ghana','Ivory Coast','Cameroon','DR Congo','Uganda','Ethiopia',
        'Somalia','Sudan','Guinea','Mali','Burkina Faso','Senegal','Bangladesh',
        'Thailand','Vietnam','Indonesia','Philippines','Cambodia','Myanmar','Laos',
        'Colombia','Venezuela','Ecuador','Guatemala','Honduras','Nicaragua',
        'El Salvador','Dominican Republic','Haiti','Cuba','Puerto Rico','Panama',
      ])
      const countryName = state.character?.country?.name ?? ''
      // Pseudo-random but deterministic per character+year
      const raw = ((state.character?.birthYear ?? 1960) * 7 + currentYear * 3) % 4
      if (tropical.has(countryName)) return raw % 2 === 0 ? 'dry' : 'wet'
      const seasons = ['winter','spring','summer','autumn']
      const idx = southernHemisphere.has(countryName) ? (raw + 2) % 4 : raw
      return seasons[idx]
    })(),
  }
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
  const cr = character.country.conflictRisk ?? 0
  const currentYear = (character.birthYear ?? 1960) + age
  const arch = character.country.archetype ?? 'developing_urban'
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
    prob *= hcMod[character.country.healthcare] ?? 1.0
  }
  if (stats.health < 10) prob += 0.15
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
    // Mark dead silently — grief events (grief_partner_death / late_partner_death) fire
    // in the same tick and provide narrative. Timestamps needed for year-texture arc.
    const updatedMem = {
      ...(state.mem ?? {}),
      widowedYear: state.currentYear,
      partnerDeathYear: state.currentYear,
    }
    return {
      ...state,
      partner: { ...partner, alive: false },
      flags: [...new Set([...state.flags, 'widowed', 'lost_partner'])],
      mem: updatedMem,
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
    if (phaseLine) s.log = [...s.log, { age: s.age, text: phaseLine, isKey: true, isPhaseTransition: true }]

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
  const mundaneText = buildMundaneLayer(s)
  if (mundaneText) {
    s.log = [...s.log, { age: s.age, text: mundaneText, isKey: false, isMundane: true }]
  }

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
    s.log = [...s.log, { age: s.age, text: resolvedText, isKey: resolvedEvent.isKey ?? false, isLetter: resolvedEvent.isLetter ?? false }]
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
  s.log = [...s.log, { age: state.age, text: `${evtText.slice(0, 80)}… — ${outcomeText}`, isKey: true, isLetter: pendingEvent.isLetter ?? false }]
  s.pendingEvent = null
  return s
}


// Internal functions needed by playerActions.js
export { buildEffectProxy, applyProxy, resolveProxyExtras }
