import { create } from 'zustand'
import { createCharacter, deriveInitialStats, deriveInitialMoney, deriveInitialParents, deriveInitialSiblings, deriveBirthText, deriveInitialGold, initializeBanked, initializeJointFamily, deriveGenerationalFlags, tick, resolveChoice, applyActivity, attemptCrime, enterCareer, generateEpitaph, askForRaise, quitJob, workHarder, schmoozeBoss, retire, emigrate, meetPotentialPartner, generatePartnerProfile, hookUp, goOnDate, complimentPartner, proposeMarriage, getMarried, fileForDivorce, tryForChild, spendTimeWithChild, callParent, callSibling, adoptChild, getPlasticSurgery, buyProperty, sellProperty, buyVehicle, sellVehicle, adoptPet, visitVet, studyHarder, goToMovies, goClubbing, goShopping, visitSalonSpa, postSocialMedia, promoteSocialMedia, betOnHorses, goToRehab, toggleBirthControl, practiceMartalArts, obtainLicense, interactWithFriend, dropOutOfSchool, abandonChild, useSubstance, bookTrip, startBusiness, manageBusiness, hireEmployee, closeBusiness, prisonWork, prisonCry, prisonConjugalVisit, prisonBribeGuard, prisonStartRiot, upgradeResidency, seekAsylum, relocate, buildG, livingPartner, resolveAutoEvent as applyAutoEventEffect, getCountryRegime } from '../engine/gameEngine'
import { COUNTRIES } from '../data/countries'
import { PLACES } from '../data/places'
import { crimeBarred } from '../data/crimes'
import { estimateCost, estimatePrice, paydayOffer, benefitsOffer, bankruptcyOpen, datingAppAvailable } from '../engine/playerActions'
import { residencyAtBirth } from '../data/migration.js'
import { EVENTS } from '../data/events'
import { LIFE_SKELETON_EVENTS } from '../data/events/lifecycle/events_life_skeleton'
import { CAREERS } from '../data/careers'
import { rebuildTickEvent } from '../engine/tick'

const SLOT_KEYS = ['natalis_v1', 'natalis_v2', 'natalis_v3']
const META_KEYS = ['natalis_meta_0', 'natalis_meta_1', 'natalis_meta_2']

// Save format version. Bump when a change would make an older save load wrong
// (not merely incomplete — Zustand's shallow merge over INITIAL_STATE already
// backfills newly added top-level fields). Each migration below takes a save
// from version N to N+1, so an old save is walked forward one step at a time
// rather than silently loading with the wrong shape.
const SAVE_VERSION = 3

const SAVE_MIGRATIONS = {
  // v1 → v2: the contemplative rate limiter moved from an id-prefix test
  // (mem.lastSonderYear) to module membership (mem.lastContemplativeYear), and
  // lives gained an explicit mode. Saves written before this carry neither.
  1: (save) => ({
    ...save,
    mode: save.mode ?? 'active',
    mem: {
      ...(save.mem ?? {}),
      lastContemplativeYear: save.mem?.lastContemplativeYear ?? save.mem?.lastSonderYear ?? 0,
    },
  }),
  // v2 → v3: countries and places are stored by name and id and looked up on
  // load. A save used to embed the whole country object twice (the birth
  // country and the one lived in) plus the place objects, so a fix to a
  // country's data — a corrected religion mix, a regime date, a new place —
  // never reached anybody who had already started a life. The engine always
  // read these as objects and still does; only the stored form changes.
  2: (save) => ({
    ...save,
    character: save.character ? {
      ...save.character,
      country: refOf(save.character.country),
      birthPlace: placeRefOf(save.character.birthPlace),
    } : save.character,
    currentCountry: refOf(save.currentCountry),
    currentPlace: placeRefOf(save.currentPlace),
  }),
}

// A stored reference: `{ $country: name }`. A bare object from an older save is
// reduced to its name; one the roster no longer knows is kept whole.
function refOf(country) {
  if (!country) return country ?? null
  if (country.$country) return country
  const name = typeof country === 'string' ? country : country.name
  return COUNTRIES.some(c => c.name === name) ? { $country: name } : country
}
function placeRefOf(place) {
  if (!place) return place ?? null
  if (place.$place) return place
  return place.id && PLACES.some(p => p.id === place.id) ? { $place: place.id } : place
}
function countryFrom(ref) {
  if (!ref) return ref ?? null
  const name = ref.$country ?? (typeof ref === 'string' ? ref : null)
  if (name) return COUNTRIES.find(c => c.name === name) ?? null
  return ref
}
function placeFrom(ref) {
  if (!ref) return ref ?? null
  if (ref.$place) return PLACES.find(p => p.id === ref.$place) ?? null
  return ref
}

// Events carry functions (guards, effects), so they cannot go into a save as
// they are. They used to be dropped: `pendingEvent: null, queue: []`. Every
// Age Up is saved with the year's event waiting, so reloading the page — or
// Menu, then Continue — made the question disappear and let the year be aged
// past unanswered, and it emptied the queue, which is where the engine puts
// the beats it guarantees (the first grief, the phase entries, echoes). A save
// now stores ids and the resolved prose, and a load looks the ids back up.
let EVENT_INDEX = null
function eventById(id) {
  if (!id) return null
  if (!EVENT_INDEX) {
    EVENT_INDEX = new Map()
    // A choice can `inject` a follow-up event that lives nowhere else.
    const add = (e) => {
      if (!e?.id || EVENT_INDEX.has(e.id)) return
      EVENT_INDEX.set(e.id, e)
      for (const c of e.choices ?? []) add(c.inject)
    }
    for (const e of [...EVENTS, ...LIFE_SKELETON_EVENTS, ...CAREERS.flatMap(c => c.events ?? [])]) add(e)
  }
  return EVENT_INDEX.get(id) ?? null
}

function eventRef(e) {
  if (!e?.id) return null
  return {
    id: e.id,
    text: typeof e.text === 'string' ? e.text : null,
    choiceTexts: (e.choices ?? []).map(c => (typeof c.text === 'string' ? c.text : null)),
    isAutomatic: e.isAutomatic === true,
  }
}

function eventFromRef(ref, state) {
  // Events tick builds in place (the graduation fork) are rebuilt from the state.
  const base = eventById(ref?.id) ?? rebuildTickEvent(ref?.id, state)
  if (!base) return null
  // Ids are unique by convention, not by construction; a different shape
  // means the index found some other event, and a wrong question is worse than none.
  if ((base.choices?.length ?? 0) !== (ref.choiceTexts?.length ?? 0)) return null
  const choices = base.choices?.map((c, i) => (ref.choiceTexts?.[i] ? { ...c, text: ref.choiceTexts[i] } : c))
  // A function the save could not resolve would render as an empty button.
  if (choices?.some(c => typeof c.text !== 'string')) return null
  const text = ref.text ?? (typeof base.text === 'string' ? base.text : null)
  if (text === null) return null
  return { ...base, text, choices, ...(ref.isAutomatic ? { isAutomatic: true } : {}) }
}

function serializeState(state) {
  try {
    return JSON.stringify({
      ...state,
      character: state.character ? {
        ...state.character,
        country: refOf(state.character.country),
        birthPlace: placeRefOf(state.character.birthPlace),
      } : state.character,
      currentCountry: refOf(state.currentCountry),
      currentPlace: placeRefOf(state.currentPlace),
      saveVersion: SAVE_VERSION,
      usedEventMap: [...(state.usedEventMap ?? new Map()).entries()],
      worldEventsFired: [...(state.worldEventsFired ?? new Set()).values()],
      queue: [],
      pendingEvent: null,
      queueRefs: (state.queue ?? []).map(e => e?.id).filter(Boolean),
      pendingEventRef: eventRef(state.pendingEvent),
      // A minigame's outcome callbacks are closures over the moment it began;
      // there is nothing to rebuild it from.
      pendingMinigame: null,
    })
  } catch { return null }
}

function deserializeState(raw) {
  try {
    let parsed = JSON.parse(raw)
    // Saves written before versioning existed are v1 by definition.
    let v = parsed.saveVersion ?? 1
    while (v < SAVE_VERSION && SAVE_MIGRATIONS[v]) {
      parsed = SAVE_MIGRATIONS[v](parsed)
      v += 1
    }
    parsed.saveVersion = SAVE_VERSION
    if (parsed.character) {
      parsed.character = {
        ...parsed.character,
        country: countryFrom(parsed.character.country),
        birthPlace: placeFrom(parsed.character.birthPlace),
      }
    }
    parsed.currentCountry = countryFrom(parsed.currentCountry) ?? parsed.character?.country ?? null
    parsed.currentPlace = placeFrom(parsed.currentPlace)
    parsed.usedEventMap = new Map(parsed.usedEventMap ?? [])
    parsed.worldEventsFired = new Set(parsed.worldEventsFired ?? [])
    parsed.queue = (parsed.queueRefs ?? []).map(id => eventById(id) ?? rebuildTickEvent(id, parsed)).filter(Boolean)
    parsed.pendingEvent = parsed.pendingEventRef ? eventFromRef(parsed.pendingEventRef, parsed) : null
    delete parsed.queueRefs
    delete parsed.pendingEventRef
    parsed.pendingMinigame = parsed.pendingMinigame ?? null
    parsed.mode = parsed.mode === 'passive' ? 'passive' : 'active'
    return parsed
  } catch { return null }
}

function saveSlotMeta(state, slot) {
  try {
    const meta = {
      displayName: `${state.character?.firstName ?? ''} ${state.character?.surname ?? ''}`.trim(),
      country: state.character?.country?.name ?? '',
      age: state.age,
      year: state.currentYear,
      gender: state.character?.gender,
      alive: !state.dead,
    }
    localStorage.setItem(META_KEYS[slot], JSON.stringify(meta))
  } catch { /* ignore */ }
}

// Returns whether the life is safely on disk. `setItem` throws on a full
// quota and in Safari's private mode, and it used to throw from inside Age Up
// — after `set(next)` had already run, so the year advanced on screen and the
// exception escaped into React. A failed save is now a fact on the state
// (`saveFailed`) for the interface to mention quietly, never an interruption.
function saveToStorage(state) {
  if (!state || state.screen === 'title' || state.screen === 'birth' || state.screen === 'curated_birth') return true
  const slot = state.activeSaveSlot ?? 0
  const s = serializeState(state)
  if (!s) return false
  try {
    localStorage.setItem(SLOT_KEYS[slot], s)
  } catch {
    return false
  }
  saveSlotMeta(state, slot)
  return true
}

// Record whether the last save reached storage, without touching anything else.
function persist(set, state) {
  const ok = saveToStorage(state)
  if ((state.saveFailed ?? false) !== !ok) set({ saveFailed: !ok })
}

function loadFromStorage(slot = 0) {
  try {
    const raw = localStorage.getItem(SLOT_KEYS[slot])
    if (!raw) return null
    return deserializeState(raw)
  } catch { return null }
}

function findAvailableSlot() {
  try {
    for (let i = 0; i < SLOT_KEYS.length; i++) {
      if (!localStorage.getItem(SLOT_KEYS[i])) return i
    }
  } catch { /* storage blocked: the life runs unsaved */ }
  return 0 // All full — overwrite slot 0
}

/** What false papers cost where the character is hiding. Shared with the panel. */
export function forgedPapersCost(state) { return estimateCost(state, 8000) }
/** A smuggler's crossing: a world price, not a local one. Shared with the panel. */
export function smugglerFee(state) { return estimatePrice(state, 9000, 'imported') }

// ── The year's actions ──────────────────────────────────────────────────────
//
// A year holds two things the player chooses to do. Thirteen verbs never spent
// one: complimenting a partner, a night with a stranger, a date, a call home,
// a sibling, time with a child, trying for a child, adopting, surgery, meeting
// somebody, emigrating, applying for benefits and a payday loan. Pressing
// "Show appreciation" and "Hook up" thirty times a year held adult happiness
// at 95 against a control of 38, and thirty calls a year to a parent was the
// best way to maximise an inheritance. Every one of them now spends from the
// same budget, in the store, so no surface can reach round it.
function canAct(state) {
  return !state.dead && !state.pendingEvent && !state.pendingMinigame && (state.actionsThisYear ?? 0) < (state.maxActionsPerYear ?? 2)
}
// A refusal that only says why ("You can't afford that") costs nothing.
function onlyNarrated(state, next) {
  if (next === state) return true
  return Object.keys(next).every(k => k === 'log' || k === 'mem' || next[k] === state[k])
}
function charge(state, next, n = 1) {
  if (onlyNarrated(state, next)) return next
  if ((next.actionsThisYear ?? 0) > (state.actionsThisYear ?? 0)) return next
  return { ...next, actionsThisYear: Math.min(state.maxActionsPerYear ?? 2, (state.actionsThisYear ?? 0) + n) }
}

export function getAllSlotMeta() {
  return SLOT_KEYS.map((key, i) => {
    const hasSave = !!localStorage.getItem(key)
    if (!hasSave) return { slot: i, empty: true }
    try {
      const raw = localStorage.getItem(META_KEYS[i])
      return { slot: i, empty: false, ...(raw ? JSON.parse(raw) : {}) }
    } catch { return { slot: i, empty: false } }
  })
}

function deriveInitialMem(flags) {
  const mem = {}
  if (flags.includes('born_with_disability')) {
    const r = Math.random()
    mem.disabilityType = r < 0.4 ? 'cerebral_palsy' : r < 0.8 ? 'limb_difference' : 'down_syndrome'
  }
  return mem
}

const INITIAL_STATE = {
  screen: 'title',
  // 'active'  — you steer the life: choices, activities, career moves, risk.
  // 'passive' — you read it: the character makes their own choices and the
  //             years arrive on their own. Same simulation, same content; only
  //             the surface differs. See getNextEvent's REGISTER_SHARES and
  //             pickChoiceAutomatically in src/engine/tick.js.
  mode: 'active',
  saveVersion: SAVE_VERSION,
  birthYearMode: 'random',
  character: null,
  religion: null,
  classTier: null,
  ethnicity: null,
  ruralUrban: null,
  literate: true,
  stats: { happiness: 80, health: 80, smarts: 50, looks: 50, charisma: 50, wealth: 50 },
  flags: [],
  regret: 0,
  age: 0,
  currentYear: 0,
  usedEventMap: new Map(),
  queue: [],
  pendingEvent: null,
  lastOutcome: null,
  mem: {},
  log: [],
  career: null,
  education: { level: 'none', field: null, enrolled: null },
  partner: null,
  children: [],
  criminalRecord: [],
  inPrison: false,
  prisonSentence: 0,
  worldEventsFired: new Set(),
  actionsThisYear: 0,
  maxActionsPerYear: 2,
  dead: false,
  causeOfDeath: null,
  ribbon: null,
  epitaph: '',
  money: 0,
  debt: 0,
  creditScore: 700,
  fitness: 50,
  hooksUpCount: 0,
  parents: null,
  karma: 50,
  fame: 0,
  siblings: [],
  pets: [],
  travels: [],
  assets: { properties: [], vehicles: [] },
  licenceObtained: false,
  retired: false,
  friends: [],
  socialMedia: { followers: 0, verified: false, genre: null },
  martialArts: { discipline: null, belt: 0 },
  birthControl: false,
  gpa: null,
  mentalHealth: { condition: null, medicating: false, therapy: false },
  hobbies: {},
  pendingMinigame: null,
  business: null,
  wanted: false,
  wantedFor: null,
  assumedIdentity: null,
  exPartners: [],
  pendingPartner: null,
  currentCountry: null,
  currentPlace: null,
  currentNeighborhoodTier: null,
  currentNeighborhoodName: null,
  residencyStatus: 'citizen',
  yearsAbroad: 0,
  pendingTrial: null,
  desire: null,
  political_leaning: null,
  conditions: [],
  gold: 0,
  householdContribution: { annualAmount: 0, obligationType: null, reduced: false },
  rosca: null,
  jointFamily: false,
  jointFamilyPool: 0,
  banked: false,
  hardCurrencyReserve: 0,
  workStatus: null, // 'formal' | 'informal' | 'unemployed' | 'subsistence' | null (child)
  currentProject: null, // { type, startYear, phase, name } — slow-burn personal project
  echoQueue: [], // [{ eventId, fireAtAge }] — guaranteed follow-up events scheduled by effects
  legacy: 0, // 0-100: accumulates from children raised, mentoring, community, creative works
  activeSaveSlot: 0,
  saveFailed: false,
}

export const useGameStore = create((set, get) => ({
  ...INITIAL_STATE,

  // ── Persistence ─────────────────────────────────────────────────────────────

  hasSave: () => { try { return SLOT_KEYS.some(k => !!localStorage.getItem(k)) } catch { return false } },

  // A load replaces the life in memory; it does not merge into it. `set` is a
  // shallow merge, so a field the save did not carry — a pending partner, a
  // minigame, a trial, anything added since it was written — survived from
  // whatever life had been open before, into the one being loaded.
  continueSave: () => {
    const saved = loadFromStorage(0)
    if (saved) set({ ...INITIAL_STATE, usedEventMap: new Map(), worldEventsFired: new Set(), ...saved, activeSaveSlot: 0, saveFailed: false })
  },

  continueSaveSlot: (slot) => {
    const saved = loadFromStorage(slot)
    if (saved) set({ ...INITIAL_STATE, usedEventMap: new Map(), worldEventsFired: new Set(), ...saved, activeSaveSlot: slot, saveFailed: false })
  },

  deleteSave: () => {
    SLOT_KEYS.forEach((k, i) => { localStorage.removeItem(k); localStorage.removeItem(META_KEYS[i]) })
    set(INITIAL_STATE)
  },

  deleteSaveSlot: (slot) => {
    localStorage.removeItem(SLOT_KEYS[slot])
    localStorage.removeItem(META_KEYS[slot])
    const { activeSaveSlot } = get()
    if (activeSaveSlot === slot) set({ ...INITIAL_STATE })
    else set(s => s) // force re-render without state change
  },

  // ── Navigation ──────────────────────────────────────────────────────────────

  goToTitle: () => {
    const s = get()
    if (s.screen === 'life') saveToStorage(s)
    set(INITIAL_STATE)
  },

  goToBirth: () => {
    const character = createCharacter()
    set({ ...INITIAL_STATE, mode: get().mode, screen: 'birth', character })
  },

  goToCuratedBirth: () => {
    const character = createCharacter()
    set({ ...INITIAL_STATE, mode: get().mode, screen: 'curated_birth', character })
  },

  startCuratedGame: (overrides) => {
    const character = createCharacter(overrides)
    const stats = deriveInitialStats(character)
    const money = deriveInitialMoney(character)
    const parents = deriveInitialParents(character)
    const siblings = deriveInitialSiblings(character, parents)
    const initialGpa = parseFloat(Math.min(4.0, 1.5 + stats.smarts * 0.02).toFixed(2))
    const flags = deriveGenerationalFlags(character)
    const slot = findAvailableSlot()
    set({
      screen: 'life',
      character,
      stats,
      flags,
      regret: 0,
      age: 0,
      currentYear: character.birthYear,
      usedEventMap: new Map(),
      queue: [],
      pendingEvent: null,
      mem: deriveInitialMem(flags),
      log: [{ age: 0, year: character.birthYear, text: deriveBirthText(character), isKey: true }],
      activeSaveSlot: slot,
      career: null,
      education: { level: 'none', field: null, enrolled: null },
      partner: null,
      children: [],
      criminalRecord: [],
      inPrison: false,
      prisonSentence: 0,
      pendingTrial: null,
      worldEventsFired: new Set(),
      actionsThisYear: 0,
      dead: false,
      causeOfDeath: null,
      ribbon: null,
      epitaph: '',
      money,
      debt: 0,
      hooksUpCount: 0,
      parents,
      siblings,
      karma: 50,
      fame: 0,
      pets: [],
      travels: [],
      assets: { properties: [], vehicles: [] },
      licenceObtained: false,
      retired: false,
      friends: [],
      socialMedia: { followers: 0, verified: false, genre: null },
      martialArts: { discipline: null, belt: 0 },
      birthControl: false,
      gpa: initialGpa,
      mentalHealth: { condition: null, medicating: false, therapy: false },
      conditions: [],
      hobbies: {},
      fitness: 50,
      creditScore: 700,
      pendingMinigame: null,
      business: null,
      wanted: false,
      wantedFor: null,
      assumedIdentity: null,
      exPartners: [],
      pendingPartner: null,
      currentCountry: character.country,
      currentPlace: character.birthPlace ?? null,
      currentNeighborhoodTier: character.birthNeighborhoodTier ?? null,
      currentNeighborhoodName: character.birthNeighborhoodName ?? null,
      residencyStatus: residencyAtBirth(character),
      yearsAbroad: 0,
      religion: null,
      classTier: null,
      desire: null,
      political_leaning: null,
      gold: deriveInitialGold(character),
      householdContribution: { annualAmount: 0, obligationType: null, reduced: false },
      rosca: null,
      jointFamily: initializeJointFamily(character),
      jointFamilyPool: 0,
      banked: initializeBanked(character),
      hardCurrencyReserve: 0,
      workStatus: null,
      echoQueue: [],
      legacy: 0,
      currentProject: null,
    })
    persist(set, get())
  },

  // ── Birth screen ─────────────────────────────────────────────────────────────

  rerollCharacter: () => {
    set({ character: createCharacter() })
  },

  setBirthYearMode: (mode) => set({ birthYearMode: mode }),

  setCharacterBirthYear: (year) =>
    set(s => ({ character: { ...s.character, birthYear: year } })),

  setCharacterCountry: (countryName) =>
    set(s => {
      const country = COUNTRIES.find(c => c.name === countryName) ?? s.character.country
      const updatedChar = createCharacter({ country: countryName })
      return { character: { ...updatedChar, country } }
    }),

  // Passive vs active is a property of the run, chosen before birth and fixed
  // for that life — switching mid-life would change what the character is.
  setMode: (mode) => set({ mode: mode === 'passive' ? 'passive' : 'active' }),

  // ── Game start ──────────────────────────────────────────────────────────────

  startGame: () => {
    const { character } = get()
    if (!character) return
    const stats = deriveInitialStats(character)
    const money = deriveInitialMoney(character)
    const parents = deriveInitialParents(character)
    const siblings = deriveInitialSiblings(character, parents)
    const initialGpa = parseFloat(Math.min(4.0, 1.5 + stats.smarts * 0.02).toFixed(2))
    const flags = deriveGenerationalFlags(character)
    const slot = findAvailableSlot()
    set({
      screen: 'life',
      stats,
      flags,
      regret: 0,
      age: 0,
      currentYear: character.birthYear,
      usedEventMap: new Map(),
      queue: [],
      pendingEvent: null,
      mem: deriveInitialMem(flags),
      log: [
        {
          age: 0,
          year: character.birthYear,
          text: deriveBirthText(character),
          isKey: true,
        },
      ],
      activeSaveSlot: slot,
      career: null,
      education: { level: 'none', field: null, enrolled: null },
      partner: null,
      children: [],
      criminalRecord: [],
      inPrison: false,
      prisonSentence: 0,
      pendingTrial: null,
      worldEventsFired: new Set(),
      actionsThisYear: 0,
      dead: false,
      causeOfDeath: null,
      ribbon: null,
      epitaph: '',
      money,
      debt: 0,
      hooksUpCount: 0,
      parents,
      siblings,
      karma: 50,
      fame: 0,
      pets: [],
      travels: [],
      assets: { properties: [], vehicles: [] },
      licenceObtained: false,
      retired: false,
      friends: [],
      socialMedia: { followers: 0, verified: false, genre: null },
      martialArts: { discipline: null, belt: 0 },
      birthControl: false,
      gpa: initialGpa,
      mentalHealth: { condition: null, medicating: false, therapy: false },
      hobbies: {},
      fitness: 50,
      creditScore: 700,
      pendingMinigame: null,
      business: null,
      wanted: false,
      wantedFor: null,
      assumedIdentity: null,
      exPartners: [],
      pendingPartner: null,
      currentCountry: character.country,
      currentPlace: character.birthPlace ?? null,
      currentNeighborhoodTier: character.birthNeighborhoodTier ?? null,
      currentNeighborhoodName: character.birthNeighborhoodName ?? null,
      residencyStatus: residencyAtBirth(character),
      yearsAbroad: 0,
      religion: null,
      classTier: null,
      gold: deriveInitialGold(character),
      householdContribution: { annualAmount: 0, obligationType: null, reduced: false },
      rosca: null,
      jointFamily: initializeJointFamily(character),
      jointFamilyPool: 0,
      banked: initializeBanked(character),
      hardCurrencyReserve: 0,
      workStatus: null,
      desire: null,
      political_leaning: null,
      conditions: [],
      echoQueue: [],
      legacy: 0,
      currentProject: null,
    })
    persist(set, get())
  },

  // ── Life screen ─────────────────────────────────────────────────────────────

  ageUp: () => {
    const state = get()
    if (state.pendingEvent || state.dead || state.pendingMinigame || state.pendingTrial) return
    const next = tick({ ...state, lastOutcome: null })
    if (next.screen === 'death') {
      const epitaph = generateEpitaph(next)
      const final = { ...next, epitaph }
      set(final)
      const slot = state.activeSaveSlot ?? 0
      try {
        localStorage.removeItem(SLOT_KEYS[slot])
        localStorage.removeItem(META_KEYS[slot])
      } catch { /* storage unavailable: nothing to remove */ }
    } else {
      set(next)
      persist(set, next)
    }
  },

  resolveChoice: (choiceIndex) => {
    const state = get()
    if (!state.pendingEvent) return
    const choice = state.pendingEvent.choices?.[choiceIndex]

    // If this choice has a minigame, apply any immediate effect then launch the game
    if (choice?.minigame) {
      // Apply the choice's pre-minigame effect (e.g. setting mem flags)
      const preState = choice.effect ? (() => {
        const next = resolveChoice(state, choiceIndex)
        return { ...next, pendingEvent: state.pendingEvent } // keep event alive for logging
      })() : state

      const mg = choice.minigame
      set({
        ...preState,
        pendingEvent: null,
        pendingMinigame: {
          ...mg,
          onSuccess: {
            outcome: mg.successOutcome ?? 'Success.',
            effect: (s) => {
              const next = { ...s }
              if (mg.karmaHit) next.karma = Math.max(0, Math.min(100, (next.karma ?? 50) + mg.karmaHit))
              next.log = [...(next.log ?? []), { age: s.age, text: mg.successOutcome ?? 'Success.', isKey: true }]
              return next
            },
          },
          onFailure: {
            outcome: mg.failOutcome ?? 'Failed.',
            effect: (s) => {
              const next = { ...s }
              next.stats = { ...next.stats, health: Math.max(0, (next.stats?.health ?? 80) - 10), happiness: Math.max(0, (next.stats?.happiness ?? 80) - 8) }
              next.log = [...(next.log ?? []), { age: s.age, text: mg.failOutcome ?? 'Failed.', isKey: true }]
              return next
            },
          },
        },
      })
      return
    }

    const next = resolveChoice(state, choiceIndex)
    const rawOutcome = choice?.outcome ?? null
    const lastOutcome = typeof rawOutcome === 'function' ? rawOutcome(buildG(next)) : rawOutcome
    const resolved = { ...next, lastOutcome }
    set(resolved)
    persist(set, resolved)
  },

  resolveAutoEvent: () => {
    const state = get()
    if (!state.pendingEvent?.isAutomatic) return
    const next = applyAutoEventEffect(state)
    set(next)
    persist(set, next)
  },

  takeActivity: (activityId) => {
    const state = get()
    if (state.actionsThisYear >= state.maxActionsPerYear || state.pendingEvent || state.dead) return
    const next = applyActivity(state, activityId)
    set(next)
  },

  commitCrime: (crimeId) => {
    const state = get()
    // attemptCrime spends the action itself; it was never checked against the
    // budget, so a crime could be committed with none left.
    if (!canAct(state)) return
    // A crime that needs access needs the access — see CRIME_ACCESS.
    if (crimeBarred(state, crimeId)) return
    const next = attemptCrime(state, crimeId)
    set(next)
  },

  triggerMinigame: (config) => {
    // config: { type, difficulty, title, description, onSuccess, onFailure, skipable? }
    // onSuccess/onFailure: { effect: (state) => nextState, outcome: string }
    set({ pendingMinigame: config })
  },

  resolveMinigame: (success) => {
    const state = get()
    const mg = state.pendingMinigame
    if (!mg) return
    const result = success ? mg.onSuccess : mg.onFailure
    const outcome = typeof result?.outcome === 'string' ? result.outcome : (success ? 'You succeeded.' : 'You failed.')
    const base = { ...state, pendingMinigame: null }
    const before = base.log?.length ?? 0
    let next = result?.effect ? result.effect(base) : base
    next = { ...next, pendingMinigame: null, lastOutcome: outcome }
    // Only log the outcome if the effect did not already narrate it. A crime
    // caught through a minigame was writing three lines for one event: the
    // minigame's own outcome, then "You are arrested for burglary", then the
    // verdict from the trial.
    const effectLogged = (next.log?.length ?? 0) > before
    if (outcome && !effectLogged) {
      next.log = [...(next.log ?? []), { age: next.age, text: outcome.slice(0, 120), isKey: true }]
    }
    set(next)
  },

  enterCareer: (careerId) => {
    const state = get()
    if (state.dead) return
    const next = enterCareer(state, careerId)
    set(next)
  },

  // ── Career actions ──────────────────────────────────────────────────────────
  //
  // These five neither spent the action budget nor checked it, and the panel
  // closes on click, so the player could reopen it and press again without
  // limit. 200 alternating presses of "Work Harder" and "Ask for a Raise" in a
  // single year took a US character from $3,686/yr to $3,455,778,417/yr, and
  // even one legitimate press a year ran an army Officer to $778,568 against a
  // top band of $80,000. Sixty presses of "Work Harder" took health from 89 to
  // 0 inside one year with no cap and no confirmation.
  //
  // A year has two actions in it. These are two of the things you can do with
  // them.
  spendAction: () => {
    const state = get()
    if (state.dead || state.pendingEvent) return false
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return false
    return true
  },

  askForRaise: () => {
    const state = get()
    if (!get().spendAction()) return
    set({ ...askForRaise(state), actionsThisYear: (state.actionsThisYear ?? 0) + 1 })
  },

  quitJob: () => {
    const state = get()
    if (!get().spendAction()) return
    set({ ...quitJob(state), actionsThisYear: (state.actionsThisYear ?? 0) + 1 })
  },

  workHarder: () => {
    const state = get()
    if (!get().spendAction()) return
    set({ ...workHarder(state), actionsThisYear: (state.actionsThisYear ?? 0) + 1 })
  },

  schmoozeBoss: () => {
    const state = get()
    if (!get().spendAction()) return
    set({ ...schmoozeBoss(state), actionsThisYear: (state.actionsThisYear ?? 0) + 1 })
  },

  retire: () => {
    const state = get()
    if (state.dead) return
    set(retire(state))
  },

  // Emigrating is the year. It takes every action left in it, and there has
  // to be one left to take: ten moves in an afternoon had been free.
  emigrate: (countryName, destPlaceId) => {
    const state = get()
    if (!canAct(state)) return
    const next = emigrate(state, countryName, destPlaceId)
    const left = (state.maxActionsPerYear ?? 2) - (state.actionsThisYear ?? 0)
    set(charge(state, next, left))
  },

  relocateTo: (placeId, neighborhoodTier) => {
    const state = get()
    if (state.dead) return
    set(relocate(state, placeId, neighborhoodTier))
  },

  // ── Relationship actions ────────────────────────────────────────────────────

  meetSomeone: () => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, meetPotentialPartner(state)))
  },

  acceptPartner: () => {
    const state = get()
    if (!state.pendingPartner || state.dead) return
    set({
      ...state,
      partner: state.pendingPartner,
      pendingPartner: null,
      flags: [...new Set([...state.flags, 'first_relationship'])],
      log: [...state.log, { age: state.age, text: `You start dating ${state.pendingPartner.name}.`, isKey: true }],
    })
  },

  declinePartner: () => {
    const state = get()
    if (!state.pendingPartner || state.dead) return
    set({
      ...state,
      pendingPartner: null,
      log: [...state.log, { age: state.age, text: `You decide not to pursue ${state.pendingPartner.name}.`, isKey: false }],
    })
  },

  useDatingApp: (filters = {}) => {
    const state = get()
    if (!canAct(state) || livingPartner(state) || !datingAppAvailable(state)) return
    // The fee is era money, like every other price, and local.
    const fee = estimateCost(state, 100)
    if ((state.money ?? 0) < fee) {
      set({ log: [...state.log, { age: state.age, text: `You need $${fee.toLocaleString()} for the dating app.`, isKey: false }] })
      return
    }
    const overrides = {}
    if (filters.minAge) overrides.minAge = filters.minAge
    if (filters.maxAge) overrides.maxAge = filters.maxAge
    if (filters.minWealthStat) overrides.minWealthStat = filters.minWealthStat
    const profile = generatePartnerProfile(state, overrides)
    set({
      ...state,
      money: (state.money ?? 0) - fee,
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      pendingPartner: profile,
      log: [...state.log, { age: state.age, text: `A name and a photograph: ${profile.name}, ${profile.age}.`, isKey: false }],
    })
  },

  hookUp: () => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, hookUp(state)))
  },

  goOnDate: () => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, goOnDate(state)))
  },

  complimentPartner: () => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, complimentPartner(state)))
  },

  proposeMarriage: () => {
    const state = get()
    if (state.dead) return
    set(proposeMarriage(state))
  },

  getMarried: () => {
    const state = get()
    if (state.dead) return
    set(getMarried(state))
  },

  fileForDivorce: () => {
    const state = get()
    if (state.dead) return
    const exP = state.partner
    const next = fileForDivorce(state)
    // Track ex-partner for murder victim list
    if (exP) next.exPartners = [...(state.exPartners ?? []), { ...exP, separatedAt: state.age }]
    set(next)
  },

  // ── Family actions ──────────────────────────────────────────────────────────

  tryForChild: () => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, tryForChild(state)))
  },

  spendTimeWithChild: (childIndex) => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, spendTimeWithChild(state, childIndex)))
  },

  callParent: (key) => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, callParent(state, key)))
  },

  callSibling: (idx) => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, callSibling(state, idx)))
  },

  adoptChild: () => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, adoptChild(state)))
  },

  // ── Health actions ──────────────────────────────────────────────────────────

  getPlasticSurgery: (type) => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, getPlasticSurgery(state, type)))
  },

  // ── Financial hardship actions ────────────────────────────────────────────

  takePaydayLoan: () => {
    const state = get()
    if (!canAct(state)) return
    const offer = paydayOffer(state)
    if ((state.money ?? 0) >= offer.receive) return
    set({
      ...state,
      money: (state.money ?? 0) + offer.receive,
      debt: (state.debt ?? 0) + offer.owe,
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      flags: [...new Set([...state.flags, 'took_payday_loan', 'debt_spiral_active'])],
      log: [...state.log, { age: state.age, text: offer.text, isKey: false }],
    })
  },

  applyForBenefits: () => {
    const state = get()
    if (!canAct(state)) return
    const offer = benefitsOffer(state)
    if (!offer || state.career || (state.money ?? 0) >= offer.threshold) return
    set({
      ...state,
      money: (state.money ?? 0) + offer.payment,
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      flags: [...new Set([...state.flags, 'benefits_applied', 'benefits_recipient'])],
      log: [...state.log, { age: state.age, text: `You fill in the forms and sit in the waiting room and answer the questions about why. In the end there is $${offer.payment.toLocaleString()}, and an appointment to come back.`, isKey: false }],
    })
  },

  declareBankruptcy: () => {
    const state = get()
    if (state.dead) return
    // The thresholds were nominal 8,000 and 500 — in 1950 Lagos a fortune and
    // a year's wage, in 2020 Stockholm a car loan and an evening.
    if (!bankruptcyOpen(state)) return
    // Remove non-exempt assets: vehicles first, then unsecured properties
    const newVehicles = []
    const newProperties = (state.assets?.properties ?? []).filter(p => p.mortgaged)
    set({
      ...state,
      debt: 0,
      money: Math.max(-estimateCost(state, 2000), state.money ?? 0),
      creditScore: 320,
      assets: { ...(state.assets ?? {}), vehicles: newVehicles, properties: newProperties },
      flags: [...new Set([...state.flags, 'bankrupt', 'declared_bankrupt', 'debt_spiral_survived'])],
      log: [...state.log, { age: state.age, text: 'You file for bankruptcy. The debts are discharged. The relief is real. So is the cost.', isKey: true }],
    })
  },

  // ── Asset actions ───────────────────────────────────────────────────────────

  buyProperty: (typeId) => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, buyProperty(state, typeId)))
  },

  sellProperty: (idx) => {
    const state = get()
    if (state.dead) return
    set(sellProperty(state, idx))
  },

  buyVehicle: (typeId) => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, buyVehicle(state, typeId)))
  },

  sellVehicle: (idx) => {
    const state = get()
    if (state.dead) return
    set(sellVehicle(state, idx))
  },

  // ── Pet actions ─────────────────────────────────────────────────────────────

  adoptPet: (species) => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, adoptPet(state, species)))
  },

  visitVet: (idx) => {
    const state = get()
    if (state.dead) return
    set(visitVet(state, idx))
  },

  // ── New activities ──────────────────────────────────────────────────────────

  studyHarder: () => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(studyHarder(state))
  },

  goToMovies: () => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(goToMovies(state))
  },

  goClubbing: () => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(goClubbing(state))
  },

  goShopping: (category) => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(goShopping(state, category))
  },

  visitSalonSpa: (service) => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(visitSalonSpa(state, service))
  },

  postSocialMedia: () => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(postSocialMedia(state))
  },

  promoteSocialMedia: () => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(promoteSocialMedia(state))
  },

  betOnHorses: (horseIdx, stakeIdx) => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(betOnHorses(state, horseIdx, stakeIdx))
  },

  goToRehab: () => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(goToRehab(state))
  },

  toggleBirthControl: () => {
    const state = get()
    if (state.dead) return
    set(toggleBirthControl(state))
  },

  practiceMartalArts: (discipline) => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(practiceMartalArts(state, discipline))
  },

  obtainLicense: (licType) => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(obtainLicense(state, licType))
  },

  interactWithFriend: (friendIdx, action) => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(interactWithFriend(state, friendIdx, action))
  },

  dropOutOfSchool: () => {
    const state = get()
    if (state.dead) return
    const next = dropOutOfSchool(state)
    set(next)
  },

  abandonChild: (childIndex) => {
    const state = get()
    if (state.dead) return
    const next = abandonChild(state, childIndex)
    set(next)
  },

  useSubstance: (substance) => {
    const state = get()
    if (state.actionsThisYear >= state.maxActionsPerYear || state.pendingEvent || state.dead) return
    const next = useSubstance(state, substance)
    set(next)
  },

  bookTrip: (destinationId) => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(bookTrip(state, destinationId))
  },

  // ── Business actions ────────────────────────────────────────────────────────

  startBusiness: (typeId) => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(startBusiness(state, typeId))
  },
  manageBusiness: () => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(manageBusiness(state))
  },
  hireEmployee: () => {
    const state = get()
    if (state.dead || state.pendingEvent) return
    // Every action-consuming move respects the yearly budget. Only two of
    // these used to, so relationships, performance and happiness could be
    // maxed by repeat-clicking and the budget meant nothing.
    if ((state.actionsThisYear ?? 0) >= state.maxActionsPerYear) return
    set(hireEmployee(state))
  },
  closeBusiness: () => {
    const state = get()
    if (state.dead) return
    set(closeBusiness(state))
  },

  // ── Prison activities ────────────────────────────────────────────────────────

  doPrisonWork: () => { const s = get(); if (s.dead || s.pendingEvent || (s.actionsThisYear ?? 0) >= s.maxActionsPerYear) return; set(prisonWork(s)) },
  doPrisonCry: () => { const s = get(); if (!s.dead) set(prisonCry(s)) },
  doPrisonConjugalVisit: () => { const s = get(); if (s.dead || s.pendingEvent || (s.actionsThisYear ?? 0) >= s.maxActionsPerYear) return; set(prisonConjugalVisit(s)) },
  doPrisonBribeGuard: () => { const s = get(); if (s.dead || s.pendingEvent || (s.actionsThisYear ?? 0) >= s.maxActionsPerYear) return; set(prisonBribeGuard(s)) },
  doPrisonStartRiot: () => { const s = get(); if (s.dead || s.pendingEvent || (s.actionsThisYear ?? 0) >= s.maxActionsPerYear) return; set(prisonStartRiot(s)) },

  // ── Trial resolution ────────────────────────────────────────────────────────

  resolveTrial: (lawyerTier) => {
    const state = get()
    if (!state.pendingTrial) return
    const { sentence, crimeName, lawyerCosts, crimeCategory } = state.pendingTrial
    // Legal quality by regime: democracy/constitutional = 1.0, authoritarian = 0.5, theocracy = 0.4, dictatorship = 0.35
    // Regime AT THE TIME, not the country's starting regime — otherwise an
    // Iranian tried in 2005 gets constitutional-monarchy courts, because Iran's
    // base regime predates 1979. Every country with a regimeHistory was wrong
    // for part of its timeline.
    const regime = getCountryRegime(state.currentCountry ?? state.character?.country, state.currentYear) ?? 'democracy'
    const legalQuality = { democracy: 1.0, federal_republic: 0.95, parliamentary_republic: 0.95, constitutional_monarchy: 0.9, single_party_communist: 0.45, single_party_authoritarian: 0.4, military_dictatorship: 0.35, theocracy: 0.38, absolute_monarchy: 0.5 }[regime] ?? 0.7
    const cost = lawyerCosts?.[lawyerTier] ?? 0
    // Representing yourself is free, and `-2000 < 0` is true, so a character who
    // reached a negative balance through the ordinary debt path was refused
    // EVERY tier including the free one — and `pendingTrial` blocks Age Up, so
    // the game was unrecoverably stuck at the trial screen with no way out but
    // deleting the save. Nobody is ever too poor to defend themselves.
    if (cost > 0 && (state.money ?? 0) < cost) {
      set({ log: [...state.log, { age: state.age, text: `You cannot afford this lawyer.`, isKey: false }] })
      return
    }
    // Dismissal and reduction chances by tier × legal quality
    const tierChances = {
      none:   { dismiss: 0.03 * legalQuality, reduceTo: 0.6, reduceChance: 0.18 * legalQuality },
      mid:    { dismiss: 0.12 * legalQuality, reduceTo: 0.4, reduceChance: 0.52 * legalQuality },
      top:    { dismiss: 0.30 * legalQuality, reduceTo: 0.15, reduceChance: 0.80 * legalQuality },
    }
    const { dismiss, reduceTo, reduceChance } = tierChances[lawyerTier] ?? tierChances.none
    const roll = Math.random()
    let finalSentence = sentence
    let outcomeText
    if (roll < dismiss) {
      finalSentence = 0
      outcomeText = lawyerTier === 'none'
        ? 'The judge finds a procedural error and dismisses the charges. You walk out.'
        : 'Your lawyer demolishes the prosecution\'s case. The charges are dismissed.'
    } else if (roll < dismiss + reduceChance) {
      finalSentence = Math.max(1, Math.round(sentence * reduceTo))
      outcomeText = lawyerTier === 'none'
        ? `The judge is lenient. Your sentence is reduced to ${finalSentence} year${finalSentence !== 1 ? 's' : ''}.`
        : `Your lawyer negotiates a plea. Sentence reduced to ${finalSentence} year${finalSentence !== 1 ? 's' : ''}.`
    } else {
      outcomeText = lawyerTier === 'none'
        ? `You are sentenced to ${sentence} year${sentence !== 1 ? 's' : ''} in prison.`
        : `Despite your lawyer\'s efforts, you are sentenced to the full ${sentence} year${sentence !== 1 ? 's' : ''}.`
    }
    let next = {
      ...state,
      money: (state.money ?? 0) - cost,
      pendingTrial: null,
      log: [...state.log, { age: state.age, text: outcomeText, isKey: true }],
    }
    if (finalSentence > 0) {
      next.inPrison = true
      next.prisonSentence = finalSentence
      next.mem = { ...next.mem, originalSentence: finalSentence, prisonYearStart: state.age }
      if (state.career && ['petty','property','violent','drug','organized','financial','organised'].includes(crimeCategory)) {
        // This happened silently. A criminal life read "You are promoted to
        // Teacher. New salary: $21,600" → "You are arrested for burglary" →
        // next year "You begin working as a Teaching Assistant", five times
        // over, with nothing in between. It is the most consequential
        // downstream effect in the crime system and it had no prose.
        const lost = state.career.title
        next.log = [...next.log, { age: state.age, isKey: true, text:
          `The letter about your position as ${lost} arrives before the sentence does. They are careful with the wording and it does not take long to read.` }]
        next.career = null
      }
    }
    set(next)
  },

  // ── Fugitive actions ────────────────────────────────────────────────────────

  // Called after successful prison escape minigame
  confirmBreakOut: () => {
    const state = get()
    if (state.dead || !state.inPrison) return
    set({
      ...state,
      inPrison: false,
      wanted: true,
      wantedFor: state.wantedFor ?? 'escaped_conviction',
      flags: [...new Set([...state.flags, 'escaped_prisoner'])],
      log: [...state.log, { age: state.age, text: 'You slip through the gaps and escape from prison. You are now a fugitive.', isKey: true }],
    })
  },

  assumeIdentity: () => {
    const state = get()
    if (state.dead) return
    if (state.flags.includes('assumed_identity')) return
    if (!canAct(state)) return
    // Priced where the papers are bought, which is where the character is
    // hiding — not where they were born — in the money of the year.
    const cost = forgedPapersCost(state)
    if ((state.money ?? 0) < cost) {
      set({ log: [...state.log, { age: state.age, text: `Papers that would pass cost $${cost.toLocaleString()}, and you do not have it.`, isKey: false }] })
      return
    }
    const c = state.currentCountry ?? state.character?.country
    const g = state.character?.gender
    const pool = g === 'male' ? (c?.namePool?.male ?? []) : (c?.namePool?.female ?? [])
    const surnames = c?.surnames ?? ['Smith', 'Jones', 'Brown']
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
    const fakeName = `${pick(pool.length ? pool : ['Alex'])} ${pick(surnames)}`
    set({
      ...state,
      money: (state.money ?? 0) - cost,
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      assumedIdentity: { name: fakeName, adoptedAt: state.age },
      flags: [...new Set([...state.flags, 'assumed_identity'])],
      log: [...state.log, { age: state.age, text: `For $${cost.toLocaleString()} you obtain forged documents and become ${fakeName}. Your old identity is buried.`, isKey: true }],
    })
  },

  goIllegal: (countryName) => {
    const state = get()
    if (state.dead) return
    const dest = COUNTRIES.find(c => c.name === countryName)
    if (!dest) return
    if (!canAct(state)) return
    // A smuggler charges in the world's money for a crossing, not in the
    // birth country's wage scale.
    const fee = smugglerFee(state)
    if ((state.money ?? 0) < fee) {
      set({ log: [...state.log, { age: state.age, text: `The smuggler wants $${fee.toLocaleString()}. You can't afford it.`, isKey: false }] })
      return
    }
    if (Math.random() < 0.30) {
      set({
        ...state,
        money: (state.money ?? 0) - fee,
        actionsThisYear: state.maxActionsPerYear ?? 2,
        inPrison: true,
        prisonSentence: (state.prisonSentence ?? 0) + 2,
        wanted: false,
        log: [...state.log, { age: state.age, text: `You pay $${fee.toLocaleString()} but border guards intercept you. Deported and sentenced to 2 additional years.`, isKey: true }],
      })
      return
    }
    set({
      ...state,
      money: (state.money ?? 0) - fee,
      actionsThisYear: state.maxActionsPerYear ?? 2,
      currentCountry: dest,
      career: null,
      residencyStatus: 'undocumented',
      flags: [...new Set([...state.flags, 'emigrated', 'illegal_immigrant'])],
      stats: { ...state.stats, happiness: Math.min(100, state.stats.happiness + 5) },
      log: [...state.log, { age: state.age, text: `You pay a smuggler $${fee.toLocaleString()} and cross into ${countryName} illegally. A dangerous new chapter.`, isKey: true }],
    })
  },

  upgradeResidency: () => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, upgradeResidency(state)))
  },

  seekAsylum: () => {
    const state = get()
    if (!canAct(state)) return
    set(charge(state, seekAsylum(state)))
  },

  trackExPartner: (partner) => {
    const state = get()
    if (!partner) return
    set({ exPartners: [...(state.exPartners ?? []), { ...partner, separatedAt: state.age }] })
  },

  // ── Death / restart ─────────────────────────────────────────────────────────

  startNewLife: () => {
    const character = createCharacter()
    set({ ...INITIAL_STATE, mode: get().mode, screen: 'birth', character })
  },
}))
