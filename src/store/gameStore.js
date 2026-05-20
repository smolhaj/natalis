import { create } from 'zustand'
import {
  createCharacter,
  deriveInitialStats,
  tick,
  resolveChoice,
  applyActivity,
  attemptCrime,
  enterCareer,
  generateEpitaph,
} from '../engine/gameEngine'
import { COUNTRIES } from '../data/countries'

const INITIAL_STATE = {
  screen: 'title',
  birthYearMode: 'random',
  character: null,
  stats: { health: 100, mental: 100, wealth: 50, education: 0, social: 50 },
  flags: [],
  regret: 0,
  age: 0,
  currentYear: 0,
  usedEventIds: new Set(),
  queue: [],
  pendingEvent: null,
  mem: {},
  log: [],
  career: null,
  education: { level: 'none', field: null },
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
      education: { level: 'none', field: null },
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
    })
  },

  // ── Life screen ─────────────────────────────────────────────────────────────

  ageUp: () => {
    const state = get()
    if (state.pendingEvent || state.dead) return
    const next = tick(state)
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
    const next = resolveChoice(state, choiceIndex)
    set(next)
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

  // ── Death / restart ─────────────────────────────────────────────────────────

  startNewLife: () => {
    const character = createCharacter()
    set({ ...INITIAL_STATE, screen: 'birth', character })
  },
}))
