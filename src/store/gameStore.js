import { create } from 'zustand'
import {
  createCharacter,
  deriveInitialStats,
  deriveInitialMoney,
  deriveInitialParents,
  deriveInitialSiblings,
  deriveBirthText,
  tick,
  resolveChoice,
  applyActivity,
  attemptCrime,
  enterCareer,
  generateEpitaph,
  askForRaise,
  quitJob,
  workHarder,
  schmoozeBoss,
  retire,
  emigrate,
  meetPotentialPartner,
  generatePartnerProfile,
  hookUp,
  goOnDate,
  complimentPartner,
  proposeMarriage,
  getMarried,
  fileForDivorce,
  tryForChild,
  spendTimeWithChild,
  callParent,
  callSibling,
  adoptChild,
  getPlasticSurgery,
  buyProperty,
  sellProperty,
  buyVehicle,
  sellVehicle,
  adoptPet,
  visitVet,
  studyHarder,
  goToMovies,
  goClubbing,
  goShopping,
  visitSalonSpa,
  postSocialMedia,
  promoteSocialMedia,
  betOnHorses,
  goToRehab,
  toggleBirthControl,
  practiceMartalArts,
  obtainLicense,
  interactWithFriend,
  dropOutOfSchool,
  abandonChild,
  useSubstance,
  bookTrip,
  startBusiness,
  manageBusiness,
  hireEmployee,
  closeBusiness,
  BUSINESS_TYPES,
  prisonWork,
  prisonCry,
  prisonConjugalVisit,
  prisonBribeGuard,
  prisonStartRiot,
} from '../engine/gameEngine'
import { COUNTRIES } from '../data/countries'
import { CRIMES } from '../data/crimes'

const INITIAL_STATE = {
  screen: 'title',
  birthYearMode: 'random',
  character: null,
  stats: { happiness: 80, health: 80, smarts: 50, looks: 50, charisma: 50, wealth: 50 },
  flags: [],
  regret: 0,
  age: 0,
  currentYear: 0,
  usedEventIds: new Set(),
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
}

export const useGameStore = create((set, get) => ({
  ...INITIAL_STATE,

  // ── Navigation ──────────────────────────────────────────────────────────────

  goToTitle: () => set(INITIAL_STATE),

  goToBirth: () => {
    const character = createCharacter()
    set({ ...INITIAL_STATE, screen: 'birth', character })
  },

  // ── Birth screen ────────────────────────────────────────────────────────────

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

  // ── Game start ──────────────────────────────────────────────────────────────

  startGame: () => {
    const { character } = get()
    if (!character) return
    const stats = deriveInitialStats(character)
    const money = deriveInitialMoney(character)
    const parents = deriveInitialParents(character)
    const siblings = deriveInitialSiblings(character)
    const initialGpa = parseFloat(Math.min(4.0, 1.5 + stats.smarts * 0.02).toFixed(2))
    set({
      screen: 'life',
      stats,
      flags: [],
      regret: 0,
      age: 0,
      currentYear: character.birthYear,
      usedEventIds: new Set(),
      queue: [],
      pendingEvent: null,
      mem: {},
      log: [
        {
          age: 0,
          text: deriveBirthText(character),
          isKey: true,
        },
      ],
      career: null,
      education: { level: 'none', field: null, enrolled: null },
      partner: null,
      children: [],
      criminalRecord: [],
      inPrison: false,
      prisonSentence: 0,
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
    })
  },

  // ── Life screen ─────────────────────────────────────────────────────────────

  ageUp: () => {
    const state = get()
    if (state.pendingEvent || state.dead || state.pendingMinigame) return
    const next = tick({ ...state, lastOutcome: null })
    if (next.screen === 'death') {
      const epitaph = generateEpitaph(next)
      set({ ...next, epitaph })
    } else {
      set(next)
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
    set({ ...next, lastOutcome: choice?.outcome ?? null })
  },

  takeActivity: (activityId) => {
    const state = get()
    if (state.actionsThisYear >= state.maxActionsPerYear || state.pendingEvent || state.dead) return
    const next = applyActivity(state, activityId)
    set(next)
  },

  commitCrime: (crimeId) => {
    const state = get()
    if (state.pendingEvent || state.dead || state.pendingMinigame) return
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
    let next = result?.effect ? result.effect(base) : base
    next = { ...next, pendingMinigame: null, lastOutcome: outcome }
    if (outcome) next.log = [...(next.log ?? []), { age: next.age, text: outcome.slice(0, 120), isKey: true }]
    set(next)
  },

  enterCareer: (careerId) => {
    const state = get()
    if (state.dead) return
    const next = enterCareer(state, careerId)
    set(next)
  },

  // ── Career actions ──────────────────────────────────────────────────────────

  askForRaise: () => {
    const state = get()
    if (state.dead) return
    set(askForRaise(state))
  },

  quitJob: () => {
    const state = get()
    if (state.dead) return
    set(quitJob(state))
  },

  workHarder: () => {
    const state = get()
    if (state.dead) return
    set(workHarder(state))
  },

  schmoozeBoss: () => {
    const state = get()
    if (state.dead) return
    set(schmoozeBoss(state))
  },

  retire: () => {
    const state = get()
    if (state.dead) return
    set(retire(state))
  },

  emigrate: (countryName) => {
    const state = get()
    if (state.dead) return
    set(emigrate(state, countryName))
  },

  // ── Relationship actions ────────────────────────────────────────────────────

  meetSomeone: () => {
    const state = get()
    if (state.dead) return
    set(meetPotentialPartner(state))
  },

  acceptPartner: () => {
    const state = get()
    if (!state.pendingPartner || state.dead) return
    set({
      ...state,
      partner: state.pendingPartner,
      pendingPartner: null,
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
    if (state.dead || state.partner) return
    if ((state.money ?? 0) < 100) {
      set({ log: [...state.log, { age: state.age, text: "You need $100 for the dating app.", isKey: false }] })
      return
    }
    const overrides = {}
    if (filters.minAge) overrides.minAge = filters.minAge
    if (filters.maxAge) overrides.maxAge = filters.maxAge
    if (filters.minWealthStat) overrides.minWealthStat = filters.minWealthStat
    const profile = generatePartnerProfile(state, overrides)
    set({
      ...state,
      money: (state.money ?? 0) - 100,
      pendingPartner: profile,
      log: [...state.log, { age: state.age, text: `Dating app match: ${profile.name}, ${profile.age}.`, isKey: false }],
    })
  },

  hookUp: () => {
    const state = get()
    if (state.dead) return
    set(hookUp(state))
  },

  goOnDate: () => {
    const state = get()
    if (state.dead) return
    set(goOnDate(state))
  },

  complimentPartner: () => {
    const state = get()
    if (state.dead) return
    set(complimentPartner(state))
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
    if (state.dead) return
    set(tryForChild(state))
  },

  spendTimeWithChild: (childIndex) => {
    const state = get()
    if (state.dead) return
    set(spendTimeWithChild(state, childIndex))
  },

  callParent: (key) => {
    const state = get()
    if (state.dead) return
    set(callParent(state, key))
  },

  callSibling: (idx) => {
    const state = get()
    if (state.dead) return
    set(callSibling(state, idx))
  },

  adoptChild: () => {
    const state = get()
    if (state.dead) return
    set(adoptChild(state))
  },

  // ── Health actions ──────────────────────────────────────────────────────────

  getPlasticSurgery: (type) => {
    const state = get()
    if (state.dead) return
    set(getPlasticSurgery(state, type))
  },

  // ── Asset actions ───────────────────────────────────────────────────────────

  buyProperty: (typeId) => {
    const state = get()
    if (state.dead) return
    set(buyProperty(state, typeId))
  },

  sellProperty: (idx) => {
    const state = get()
    if (state.dead) return
    set(sellProperty(state, idx))
  },

  buyVehicle: (typeId) => {
    const state = get()
    if (state.dead) return
    set(buyVehicle(state, typeId))
  },

  sellVehicle: (idx) => {
    const state = get()
    if (state.dead) return
    set(sellVehicle(state, idx))
  },

  // ── Pet actions ─────────────────────────────────────────────────────────────

  adoptPet: (species) => {
    const state = get()
    if (state.dead) return
    set(adoptPet(state, species))
  },

  visitVet: (idx) => {
    const state = get()
    if (state.dead) return
    set(visitVet(state, idx))
  },

  // ── New activities ──────────────────────────────────────────────────────────

  studyHarder: () => {
    const state = get()
    if (state.dead) return
    set(studyHarder(state))
  },

  goToMovies: () => {
    const state = get()
    if (state.dead) return
    set(goToMovies(state))
  },

  goClubbing: () => {
    const state = get()
    if (state.dead) return
    set(goClubbing(state))
  },

  goShopping: (category) => {
    const state = get()
    if (state.dead) return
    set(goShopping(state, category))
  },

  visitSalonSpa: (service) => {
    const state = get()
    if (state.dead) return
    set(visitSalonSpa(state, service))
  },

  postSocialMedia: () => {
    const state = get()
    if (state.dead) return
    set(postSocialMedia(state))
  },

  promoteSocialMedia: () => {
    const state = get()
    if (state.dead) return
    set(promoteSocialMedia(state))
  },

  betOnHorses: (horseIdx, betAmount) => {
    const state = get()
    if (state.dead) return
    set(betOnHorses(state, horseIdx, betAmount))
  },

  goToRehab: () => {
    const state = get()
    if (state.dead) return
    set(goToRehab(state))
  },

  toggleBirthControl: () => {
    const state = get()
    if (state.dead) return
    set(toggleBirthControl(state))
  },

  practiceMartalArts: (discipline) => {
    const state = get()
    if (state.dead) return
    set(practiceMartalArts(state, discipline))
  },

  obtainLicense: (licType) => {
    const state = get()
    if (state.dead) return
    set(obtainLicense(state, licType))
  },

  interactWithFriend: (friendIdx, action) => {
    const state = get()
    if (state.dead) return
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
    if (state.dead) return
    set(bookTrip(state, destinationId))
  },

  // ── Business actions ────────────────────────────────────────────────────────

  startBusiness: (typeId) => {
    const state = get()
    if (state.dead) return
    set(startBusiness(state, typeId))
  },
  manageBusiness: () => {
    const state = get()
    if (state.dead) return
    set(manageBusiness(state))
  },
  hireEmployee: () => {
    const state = get()
    if (state.dead) return
    set(hireEmployee(state))
  },
  closeBusiness: () => {
    const state = get()
    if (state.dead) return
    set(closeBusiness(state))
  },

  // ── Prison activities ────────────────────────────────────────────────────────

  doPrisonWork: () => { const s = get(); if (!s.dead) set(prisonWork(s)) },
  doPrisonCry: () => { const s = get(); if (!s.dead) set(prisonCry(s)) },
  doPrisonConjugalVisit: () => { const s = get(); if (!s.dead) set(prisonConjugalVisit(s)) },
  doPrisonBribeGuard: () => { const s = get(); if (!s.dead) set(prisonBribeGuard(s)) },
  doPrisonStartRiot: () => { const s = get(); if (!s.dead) set(prisonStartRiot(s)) },

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
    const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
    const mult = gdpMult[state.character?.country?.gdp] ?? 1.0
    const cost = Math.round(8000 * mult)
    if ((state.money ?? 0) < cost) {
      set({ log: [...state.log, { age: state.age, text: `You need $${cost.toLocaleString()} for forged documents.`, isKey: false }] })
      return
    }
    const c = state.character?.country
    const g = state.character?.gender
    const pool = g === 'male' ? (c?.namePool?.male ?? []) : (c?.namePool?.female ?? [])
    const surnames = c?.surnames ?? ['Smith', 'Jones', 'Brown']
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
    const fakeName = `${pick(pool.length ? pool : ['Alex'])} ${pick(surnames)}`
    set({
      ...state,
      money: (state.money ?? 0) - cost,
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
    const gdpMult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }
    const mult = gdpMult[state.character?.country?.gdp] ?? 1.0
    const fee = Math.round((8000 + Math.floor(Math.random() * 12000)) * mult)
    if ((state.money ?? 0) < fee) {
      set({ log: [...state.log, { age: state.age, text: `The smuggler wants $${fee.toLocaleString()}. You can't afford it.`, isKey: false }] })
      return
    }
    if (Math.random() < 0.30) {
      set({
        ...state,
        money: (state.money ?? 0) - fee,
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
      character: { ...state.character, country: dest },
      flags: [...new Set([...state.flags, 'emigrated', 'illegal_immigrant'])],
      stats: { ...state.stats, happiness: Math.min(100, state.stats.happiness + 5) },
      log: [...state.log, { age: state.age, text: `You pay a smuggler $${fee.toLocaleString()} and cross the border into ${countryName}. A dangerous new chapter begins.`, isKey: true }],
    })
  },

  trackExPartner: (partner) => {
    const state = get()
    if (!partner) return
    set({ exPartners: [...(state.exPartners ?? []), { ...partner, separatedAt: state.age }] })
  },

  // ── Death / restart ─────────────────────────────────────────────────────────

  startNewLife: () => {
    const character = createCharacter()
    set({ ...INITIAL_STATE, screen: 'birth', character })
  },
}))
