// gameStore.js is 1,185 lines and ~88 actions, holds the entire trial system
// and every byte of save/load, and until now no test imported it. These cover
// the three flows where a bug is unrecoverable for the player: a save that
// loads back wrong, a trial that leaves the game unplayable, and an emigration
// that moves the character without moving the world around them.
import { describe, it, expect, beforeEach } from 'vitest'

// The store writes to localStorage on nearly every action.
const store = {}
globalThis.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v) },
  removeItem: k => { delete store[k] },
}

const { useGameStore } = await import('../src/store/gameStore.js')
const { tick } = await import('../src/engine/tick.js')

const S = () => useGameStore.getState()
const clearStorage = () => { for (const k of Object.keys(store)) delete store[k] }

// There is no explicit "save" action: the game persists on age-up and when the
// player leaves for the title screen. Going to the title is the real save path,
// and it is also what a reload looks like — state gone, storage kept.
function persistAndReload() {
  // Read the slot BEFORE going to the title, which resets the store. Taking the
  // first natalis_v* key in storage instead made this intermittently assert
  // against the wrong save: livedTo() retries when a life ends early, every
  // attempt claims a slot via findAvailableSlot, and the character the test
  // actually cares about ends up in natalis_v2 while natalis_v1 still holds a
  // dead newborn from a discarded attempt.
  const slot = S().activeSaveSlot ?? 0
  S().goToTitle()
  const slotKey = `natalis_v${slot + 1}`
  expect(store[slotKey], 'a save slot was written').toBeTruthy()
  return { slotKey, slot }
}

/**
 * Fast-forward without simulating: mortality is a roll, and a test about
 * emigration or a trial should not fail because the character happened to die
 * at four. Used wherever the test is about an action, not about a life.
 */
function setupAt(age, { country = 'Germany', birthYear = 1970, ...rest } = {}) {
  S().startCuratedGame({ country, birthYear })
  useGameStore.setState({ age, currentYear: birthYear + age, dead: false, screen: 'life', ...rest })
  return S()
}

function playTo(age, { country = 'Germany', birthYear = 1970 } = {}) {
  S().startCuratedGame({ country, birthYear })
  let s = S()
  while (s.age < age && !s.dead) {
    s = tick(s)
    if (s.pendingEvent) s = { ...s, pendingEvent: null }
    if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
    if (s.pendingTrial) s = { ...s, pendingTrial: null }
  }
  useGameStore.setState(s)
  return s
}

/** A lived-in state at `age` — retried, since a life can end before it. */
function livedTo(age, opts) {
  for (let attempt = 0; attempt < 25; attempt++) {
    const s = playTo(age, opts)
    if (!s.dead && s.age >= age) return s
  }
  return setupAt(age, opts)
}

// ─── Save and load ────────────────────────────────────────────────────────────

describe('save / load round trip', () => {
  beforeEach(clearStorage)

  it('restores a mid-life state field for field, Maps and Sets included', () => {
    const before = livedTo(30, { country: 'Brazil', birthYear: 1980 })
    // Put something in every structure that JSON cannot represent natively.
    useGameStore.setState({
      usedEventMap: new Map([['some_event', 1995], ['other_event', 2001]]),
      worldEventsFired: new Set(['fall_of_the_wall', 'plan_real_1994']),
      mem: { ...before.mem, lastContemplativeYear: 2004, partnerMoments: ['the kitchen radio'] },
    })
    const original = S()
    const { slot } = persistAndReload()
    S().continueSaveSlot(slot)
    const loaded = S()

    expect(loaded.usedEventMap instanceof Map, 'usedEventMap rehydrates as a Map').toBe(true)
    expect(loaded.usedEventMap.get('some_event')).toBe(1995)
    expect(loaded.usedEventMap.size).toBe(2)
    expect(loaded.worldEventsFired instanceof Set, 'worldEventsFired rehydrates as a Set').toBe(true)
    expect(loaded.worldEventsFired.has('fall_of_the_wall')).toBe(true)

    for (const field of ['age', 'currentYear', 'money', 'karma', 'fame', 'regret', 'debt']) {
      expect(loaded[field], `${field} survives the round trip`).toBe(original[field])
    }
    expect(loaded.stats).toEqual(original.stats)
    expect([...loaded.flags].sort()).toEqual([...original.flags].sort())
    expect(loaded.log.length).toBe(original.log.length)
    expect(loaded.character.name).toBe(original.character.name)
    expect(loaded.character.country.name).toBe(original.character.country.name)
    expect(loaded.mem.partnerMoments).toEqual(['the kitchen radio'])
    // And the loaded state must be playable, not merely readable.
    expect(() => tick(loaded)).not.toThrow()
  }, 120000)

  it('loads a pre-versioning save without losing anything', () => {
    livedTo(22, { country: 'India', birthYear: 1975 })
    useGameStore.setState({
      worldEventsFired: new Set(['emergency_1975']),
      usedEventMap: new Map([['ind_emergency', 1977]]),
    })
    const original = S()
    const { slotKey, slot } = persistAndReload()

    // Rewrite it as a save from before the version field existed.
    const old = JSON.parse(store[slotKey])
    delete old.saveVersion
    store[slotKey] = JSON.stringify(old)

    S().continueSaveSlot(slot)
    const loaded = S()

    expect(loaded.age, 'an unversioned save still loads').toBe(original.age)
    expect(loaded.currentYear).toBe(original.currentYear)
    expect(loaded.money).toBe(original.money)
    expect(loaded.stats).toEqual(original.stats)
    expect([...loaded.flags].sort()).toEqual([...original.flags].sort())
    expect(loaded.usedEventMap instanceof Map).toBe(true)
    expect(loaded.usedEventMap.get('ind_emergency')).toBe(1977)
    expect(loaded.worldEventsFired instanceof Set).toBe(true)
    expect(loaded.worldEventsFired.has('emergency_1975')).toBe(true)
    expect(loaded.character.country.name).toBe('India')
    expect(() => tick(loaded)).not.toThrow()
  }, 120000)

  it('drops only what cannot be serialised', () => {
    livedTo(12)
    // Functions do not survive JSON; the save must clear them deliberately
    // rather than write a broken half-object.
    useGameStore.setState({ queue: [{ id: 'q', when: () => true }], pendingMinigame: { type: 'maze' } })
    const { slotKey } = persistAndReload()
    const parsed = JSON.parse(store[slotKey])
    expect(parsed.queue).toEqual([])
    expect(parsed.pendingEvent).toBe(null)
    expect(parsed.pendingMinigame).toBe(null)
    expect(Array.isArray(parsed.usedEventMap), 'Map is stored as entries').toBe(true)
    expect(Array.isArray(parsed.worldEventsFired), 'Set is stored as an array').toBe(true)
  }, 120000)
})

// ─── The trial system ─────────────────────────────────────────────────────────

describe('trial', () => {
  beforeEach(clearStorage)

  const withTrial = (extra = {}) => {
    setupAt(28, { country: 'Germany', birthYear: 1970 })
    useGameStore.setState({
      money: 50000, inPrison: false, prisonSentence: 0, career: { id: 'teacher', title: 'Teacher', level: 1 },
      pendingTrial: {
        crimeName: 'Burglary', crimeCategory: 'property', sentence: 4,
        lawyerCosts: { none: 0, mid: 2500, top: 15000 },
      },
      ...extra,
    })
  }

  it('blocks ageing up until it is resolved', () => {
    withTrial()
    const before = S().age
    S().ageUp()
    expect(S().age, 'a pending trial freezes the year').toBe(before)
    expect(S().pendingTrial).toBeTruthy()
  }, 120000)

  it('always resolves to prison or freedom, and never leaves the trial pending', () => {
    // The outcome is a roll, so assert the invariants rather than one branch.
    for (const tier of ['none', 'mid', 'top']) {
      for (let i = 0; i < 12; i++) {
        withTrial()
        const moneyBefore = S().money
        S().resolveTrial(tier)
        const s = S()
        expect(s.pendingTrial, `${tier}: trial is cleared`).toBe(null)
        expect(s.money, `${tier}: the lawyer is paid for`).toBe(moneyBefore - ({ none: 0, mid: 2500, top: 15000 })[tier])
        if (s.inPrison) {
          expect(s.prisonSentence, 'a convicted sentence is at least a year').toBeGreaterThan(0)
          expect(s.prisonSentence, 'and never longer than charged').toBeLessThanOrEqual(4)
          expect(s.career, 'a property conviction costs the job').toBe(null)
        } else {
          expect(s.prisonSentence).toBe(0)
        }
        expect(s.log[s.log.length - 1].text, 'the verdict is narrated').toBeTruthy()
        // And the game continues.
        expect(() => tick(S())).not.toThrow()
      }
    }
  }, 300000)

  it('refuses a lawyer the character cannot pay for, leaving the trial open', () => {
    withTrial({ money: 100 })
    S().resolveTrial('top')
    const s = S()
    expect(s.pendingTrial, 'the trial stays open').toBeTruthy()
    expect(s.money, 'no money changes hands').toBe(100)
    expect(s.inPrison).toBe(false)
  }, 120000)

  it('gives an authoritarian court worse odds than a democratic one', () => {
    // Legal quality scales by regime AT THE TIME. Run both and compare
    // conviction rates over enough trials that the difference is not noise.
    const convictionRate = (country, birthYear, year) => {
      let convicted = 0
      const N = 120
      for (let i = 0; i < N; i++) {
        setupAt(25, { country, birthYear })
        useGameStore.setState({
          currentYear: year, money: 50000, inPrison: false, prisonSentence: 0, career: null,
          pendingTrial: {
            crimeName: 'Theft', crimeCategory: 'property', sentence: 4,
            lawyerCosts: { none: 0, mid: 0, top: 0 },
          },
        })
        S().resolveTrial('top')
        if (S().inPrison) convicted++
      }
      return convicted / N
    }
    const democratic = convictionRate('Germany', 1970, 2000)
    const authoritarian = convictionRate('North Korea', 1970, 2000)
    console.log(`  conviction rate with the best lawyer — Germany ${(democratic * 100).toFixed(0)}%, North Korea ${(authoritarian * 100).toFixed(0)}%`)
    expect(authoritarian, 'a stacked court convicts more often').toBeGreaterThan(democratic)
  }, 600000)
})

// ─── Emigration ───────────────────────────────────────────────────────────────

describe('emigration', () => {
  beforeEach(clearStorage)

  it('moves the character and the world around them', () => {
    setupAt(25, { country: 'Nigeria', birthYear: 1970 })
    useGameStore.setState({ money: 40000 })
    const before = S()
    S().emigrate('United Kingdom')
    const after = S()

    expect(after.currentCountry, 'currentCountry is the country OBJECT, never a name').toBeTypeOf('object')
    expect(after.currentCountry.name).toBe('United Kingdom')
    expect(after.character.country.name, 'birth country is frozen at birth').toBe('Nigeria')
    expect(after.flags).toContain('emigrated')
    expect(after.residencyStatus).toBe('work_visa')
    expect(after.money, 'moving costs money').toBeLessThan(before.money)
    expect(after.currentPlace, 'a destination place is chosen').toBeTruthy()
    expect(after.log.length).toBeGreaterThan(before.log.length)
  }, 120000)

  it('lets the guards see the new country', async () => {
    const { buildG } = await import('../src/engine/tick.js')
    setupAt(25, { country: 'Nigeria', birthYear: 1970 })
    useGameStore.setState({ money: 40000 })
    S().emigrate('Germany')
    const G = buildG(S())
    expect(G.currentCountry?.name, 'G.currentCountry?.name is what guards must read').toBe('Germany')
    expect(G.archetype, 'archetype follows the country lived in at birth').toBeTruthy()
    expect(() => tick(S())).not.toThrow()
  }, 120000)

  it('refuses a move that makes no sense', () => {
    setupAt(25, { country: 'Nigeria', birthYear: 1970 })
    const before = S()
    S().emigrate('Atlantis')                       // not a country
    expect(S().currentCountry?.name ?? before.character.country.name).toBe('Nigeria')

    useGameStore.setState({ money: 40000, wanted: true })
    const moneyBefore = S().money
    S().emigrate('Germany')                        // wanted: border control stops you
    expect(S().currentCountry?.name).not.toBe('Germany')
    expect(S().money).toBe(moneyBefore)
  }, 120000)

  it('survives a save/load taken after emigrating', () => {
    setupAt(25, { country: 'Nigeria', birthYear: 1970 })
    useGameStore.setState({ money: 40000 })
    S().emigrate('Germany')
    const { slot } = persistAndReload()
    S().continueSaveSlot(slot)
    const loaded = S()
    expect(loaded.currentCountry?.name, 'where you live is part of the save').toBe('Germany')
    expect(loaded.character.country.name).toBe('Nigeria')
    expect(loaded.residencyStatus).toBe('work_visa')
  }, 120000)
})
