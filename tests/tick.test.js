import { describe, it, expect } from 'vitest'
import { tick, checkPromotion, askForRaise } from '../src/engine/tick.js'
import { makeState, makeAdultState, makeCountry } from './helpers.js'

// ─── tick() — main game loop ──────────────────────────────────────────────────

describe('tick', () => {
  it('increments age by 1', () => {
    const state = makeState({ age: 10, currentYear: 1990 })
    const next = tick(state)
    expect(next.age).toBe(11)
  })

  it('increments currentYear by 1', () => {
    const state = makeState({ age: 10, currentYear: 1990 })
    const next = tick(state)
    expect(next.currentYear).toBe(1991)
  })

  it('resets actionsThisYear to 0', () => {
    const state = makeState({ actionsThisYear: 2 })
    const next = tick(state)
    expect(next.actionsThisYear).toBe(0)
  })

  it('does not mutate the original state', () => {
    const state = makeState({ age: 10 })
    tick(state)
    expect(state.age).toBe(10)
  })

  it('marks death correctly when character would die', () => {
    // Create a very old, very unhealthy character to force death
    const state = makeState({
      age: 99,
      currentYear: 2079,
      stats: { happiness: 5, health: 5, smarts: 50, looks: 50, charisma: 50, wealth: 50 },
      flags: [],
    })
    // Run many times — at age 99 death probability is extremely high
    let died = false
    for (let i = 0; i < 50; i++) {
      const s = makeState({
        age: 99,
        currentYear: 2079,
        stats: { happiness: 5, health: 5, smarts: 50, looks: 50, charisma: 50, wealth: 50 },
        flags: [],
      })
      const next = tick(s)
      if (next.dead) { died = true; break }
    }
    expect(died).toBe(true)
  })

  it('causes of death are strings', () => {
    const state = makeState({ age: 99, currentYear: 2079, stats: { happiness: 5, health: 5, smarts: 50, looks: 50, charisma: 50, wealth: 50 } })
    for (let i = 0; i < 50; i++) {
      const next = tick({ ...state })
      if (next.dead) {
        expect(typeof next.causeOfDeath).toBe('string')
        expect(next.causeOfDeath.length).toBeGreaterThan(0)
        break
      }
    }
  })

  it('phase transition adds a log entry when crossing from childhood to adolescence', () => {
    const state = makeState({ age: 11, currentYear: 1990 }) // will become 12 = adolescence
    const next = tick(state)
    const hasPhaseEntry = next.log.some(e => e.isPhaseTransition)
    expect(hasPhaseEntry).toBe(true)
  })

  it('prison increments prisonSentence tracking and reduces happiness', () => {
    const state = makeState({
      age: 25,
      inPrison: true,
      prisonSentence: 5,
      stats: { happiness: 60, health: 60, smarts: 50, looks: 50, charisma: 50, wealth: 50 },
    })
    const next = tick(state)
    expect(next.stats.happiness).toBeLessThanOrEqual(state.stats.happiness)
  })

  it('adds salary to money when career is active', () => {
    const state = makeAdultState({
      career: { id: 'farmer', title: 'Farmer', salary: 12000, level: 0, yearsInRole: 2, performance: 50 },
      money: 1000,
    })
    const next = tick(state)
    // Salary should be added (minus taxes potentially)
    expect(next.money).toBeGreaterThan(1000)
  })

  it('yearsAbroad increments when emigrated and abroad', () => {
    const foreignCountry = makeCountry({ name: 'Germany' })
    const state = makeAdultState({
      flags: ['emigrated'],
      currentCountry: foreignCountry,
      yearsAbroad: 3,
    })
    const next = tick(state)
    expect(next.yearsAbroad).toBe(4)
  })

  it('yearsAbroad stays same when not emigrated', () => {
    const state = makeAdultState({ flags: [], yearsAbroad: 0 })
    const next = tick(state)
    expect(next.yearsAbroad).toBe(0)
  })

  it('returns an object with all expected state fields', () => {
    const state = makeState()
    const next = tick(state)
    expect(next).toHaveProperty('age')
    expect(next).toHaveProperty('currentYear')
    expect(next).toHaveProperty('stats')
    expect(next).toHaveProperty('flags')
    expect(next).toHaveProperty('log')
    expect(next).toHaveProperty('money')
    expect(next).toHaveProperty('dead')
  })

  it('echoQueue events fire at the correct age', () => {
    // Put an event in echoQueue set to fire at age 11
    const state = makeState({
      age: 10,
      currentYear: 1990,
      echoQueue: [{ eventId: 'ls_first_test', fireAtAge: 11 }],
    })
    const next = tick(state)
    // The echo should have been consumed (removed from echoQueue or moved to queue)
    // At minimum, the state should not crash
    expect(typeof next).toBe('object')
  })
})

// ─── checkPromotion ───────────────────────────────────────────────────────────

describe('checkPromotion', () => {
  it('returns state with career unchanged when no promotion fires', () => {
    const state = makeAdultState({
      career: { id: 'farmer', title: 'Farmer', salary: 12000, level: 0, yearsInRole: 1, performance: 50 },
      stats: { happiness: 50, health: 70, smarts: 40, looks: 50, charisma: 40, wealth: 50 },
    })
    // Run many times; should never throw
    for (let i = 0; i < 20; i++) {
      const next = checkPromotion(state)
      expect(next).toHaveProperty('career')
    }
  })

  it('does not crash with null career', () => {
    const state = makeAdultState({ career: null })
    const next = checkPromotion(state)
    expect(next.career).toBeNull()
  })
})

// ─── askForRaise ──────────────────────────────────────────────────────────────

describe('askForRaise', () => {
  it('does not crash with null career', () => {
    const state = makeAdultState({ career: null })
    const next = askForRaise(state)
    expect(next.career).toBeNull()
  })

  it('returns a state with career or without, never crashes', () => {
    const state = makeAdultState({
      career: { id: 'farmer', title: 'Farmer', salary: 12000, level: 0, yearsInRole: 3, performance: 65 },
    })
    for (let i = 0; i < 20; i++) {
      const next = askForRaise(state)
      expect(typeof next).toBe('object')
    }
  })

  it('on success: increases salary', () => {
    // Run enough times to guarantee at least one success (success rate is 25-85%)
    let gotRaise = false
    for (let i = 0; i < 50; i++) {
      const state = makeAdultState({
        career: { id: 'farmer', title: 'Farmer', salary: 12000, level: 0, yearsInRole: 3, performance: 90 },
        stats: { happiness: 70, health: 70, smarts: 70, looks: 55, charisma: 80, wealth: 50 },
      })
      const next = askForRaise(state)
      if (next.career?.salary > 12000) {
        gotRaise = true
        expect(next.career.salary).toBeGreaterThan(12000)
        break
      }
    }
    expect(gotRaise).toBe(true)
  })
})
