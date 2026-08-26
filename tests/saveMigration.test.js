// Save format regression tests. gameStore.js is the most state-mutating file in
// the codebase and had zero test coverage; the save format also had no version
// field and no migration path, so schema evolution was luck.
import { describe, it, expect, beforeEach } from 'vitest'

const store = {}
globalThis.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v) },
  removeItem: (k) => { delete store[k] },
}

const { useGameStore } = await import('../src/store/gameStore.js')
const { tick } = await import('../src/engine/tick.js')

describe('save format', () => {
  beforeEach(() => { for (const k of Object.keys(store)) delete store[k] })

  it('round-trips a mid-life state without losing anything', () => {
    useGameStore.getState().startCuratedGame({ country: 'Germany', birthYear: 1970 })
    let s = useGameStore.getState()
    for (let i = 0; i < 25 && !s.dead; i++) {
      s = tick(s)
      if (s.pendingEvent) s = { ...s, pendingEvent: null }
    }
    useGameStore.setState(s)
    useGameStore.getState().saveGame?.()

    const raw = Object.keys(store).find(k => k.startsWith('natalis_v'))
    expect(raw, 'a save slot was written').toBeTruthy()
    const parsed = JSON.parse(store[raw])

    expect(parsed.saveVersion, 'saves carry a version').toBeGreaterThanOrEqual(2)
    // Map and Set fields must survive JSON.
    expect(Array.isArray(parsed.usedEventMap)).toBe(true)
    expect(Array.isArray(parsed.worldEventsFired)).toBe(true)
    expect(parsed.mode).toBeTruthy()
    // Nothing meaningful should be dropped.
    for (const key of ['age', 'currentYear', 'stats', 'flags', 'log', 'money', 'character']) {
      expect(parsed[key], `save retains ${key}`).toBeDefined()
    }
  }, 60000)

  it('migrates a pre-versioning save instead of loading it wrong', () => {
    useGameStore.getState().startCuratedGame({ country: 'India', birthYear: 1975 })
    let s = useGameStore.getState()
    for (let i = 0; i < 15 && !s.dead; i++) {
      s = tick(s)
      if (s.pendingEvent) s = { ...s, pendingEvent: null }
    }
    useGameStore.setState(s)
    useGameStore.getState().saveGame?.()
    const key = Object.keys(store).find(k => k.startsWith('natalis_v'))

    // Rewrite it as a v1 save: no version, no mode, and the old id-prefix-based
    // contemplative tracker that v2 replaced with module-based classification.
    const old = JSON.parse(store[key])
    delete old.saveVersion
    delete old.mode
    old.mem = { ...(old.mem ?? {}), lastSonderYear: 1990 }
    delete old.mem.lastContemplativeYear
    store[key] = JSON.stringify(old)

    const slot = Number(key.replace('natalis_v', '')) - 1
    useGameStore.getState().continueSaveSlot(slot)
    const loaded = useGameStore.getState()

    expect(loaded.saveVersion, 'migrated to current version').toBeGreaterThanOrEqual(2)
    expect(loaded.mode, 'mode backfilled').toBe('active')
    expect(loaded.mem.lastContemplativeYear, 'old tracker carried forward').toBe(1990)
    expect(loaded.usedEventMap instanceof Map, 'Map rehydrated').toBe(true)
    expect(loaded.worldEventsFired instanceof Set, 'Set rehydrated').toBe(true)
    expect(loaded.age).toBe(old.age)

    // And it must still be playable.
    expect(() => tick(loaded)).not.toThrow()
  }, 60000)
})
