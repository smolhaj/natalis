import { create } from 'zustand'
import {
  createCharacter,
  deriveInitialStats,
  deriveInitialMoney,
  deriveInitialParents,
  deriveInitialSiblings,
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
} from '../engine/gameEngine'
import { COUNTRIES } from '../data/countries'

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
  hooksUpCount: 0,
  parents: null,
  karma: 50,
  fame: 0,
  siblings: [],
  pets: [],
  assets: { properties: [], vehicles: [] },
  licenceObtained: false,
  retired: false,
  friends: [],
  socialMedia: { followers: 0, verified: false, genre: null },
  martialArts: { discipline: null, belt: 0 },
  birthControl: false,
  gpa: null,
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
          text: `${character.firstName} ${character.surname} enters the world in ${character.country.name}, ${character.birthYear}.`,
          isKey: false,
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
      assets: { properties: [], vehicles: [] },
      licenceObtained: false,
      retired: false,
      friends: [],
      socialMedia: { followers: 0, verified: false, genre: null },
      martialArts: { discipline: null, belt: 0 },
      birthControl: false,
      gpa: initialGpa,
    })
  },

  // ── Life screen ─────────────────────────────────────────────────────────────

  ageUp: () => {
    const state = get()
    if (state.pendingEvent || state.dead) return
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
    if (state.pendingEvent || state.dead) return
    const next = attemptCrime(state, crimeId)
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
    set(fileForDivorce(state))
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

  // ── Death / restart ─────────────────────────────────────────────────────────

  startNewLife: () => {
    const character = createCharacter()
    set({ ...INITIAL_STATE, screen: 'birth', character })
  },
}))
