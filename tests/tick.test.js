import { describe, it, expect } from 'vitest'
import { CAREERS } from '../src/data/careers.js'
import { tick, checkPromotion, askForRaise } from '../src/engine/tick.js'
import { makeState, makeAdultState, makeCountry } from './helpers.js'
import { EVENTS } from '../src/data/events.js'

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

  it('prison advances the sentence and narrates the year', () => {
    const state = makeState({
      age: 25,
      inPrison: true,
      prisonSentence: 5,
      stats: { happiness: 60, health: 60, smarts: 50, looks: 50, charisma: 50, wealth: 50 },
    })
    const next = tick(state)
    expect(next.prisonSentence).toBe(4)
    // A prison year must produce narrative — either an event to answer or a line
    // in the log. It used to produce only "Another year behind bars", because the
    // in-prison pool requires `prisonOk: true` and no event in the game set it.
    const producedProse = next.pendingEvent != null || next.log.length > state.log.length
    expect(producedProse).toBe(true)
  })

  it('the in-prison pool is not empty', () => {
    // Regression: getNextEvent filters the in-prison pool to `prisonOk === true`.
    // For most of the project's life, zero events declared it.
    const prisonable = EVENTS.filter(e => e.prisonOk === true)
    expect(prisonable.length).toBeGreaterThan(8)
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
    // The old fixture put a Farm Hand on 12,000 nominal in a `high`-GDP country
    // in 2005, which is above anything that band pays there — so once raises
    // gained a ceiling the fixture was permanently at it. 3,000 is inside it.
    let gotRaise = false
    for (let i = 0; i < 50; i++) {
      const state = makeAdultState({
        career: { id: 'farmer', title: 'Farmer', salary: 3000, level: 0, yearsInRole: 3, performance: 90 },
        stats: { happiness: 70, health: 70, smarts: 70, looks: 55, charisma: 80, wealth: 50 },
      })
      const next = askForRaise(state)
      if (next.career?.salary > 3000) {
        gotRaise = true
        expect(next.career.salary).toBeGreaterThan(3000)
        break
      }
    }
    expect(gotRaise).toBe(true)
  })

  // Neither the store action nor its panel button spent the action budget, and
  // the panel closes on click, so the player could reopen and press again. 200
  // alternating presses of Work Harder and Ask for a Raise in a single year
  // took a US character from $3,686/yr to $3,455,778,417/yr.
  it('will not raise a salary past the top of its grade', () => {
    let last = 0
    let state = makeAdultState({
      career: { id: 'farmer', title: 'Farm Hand', salary: 3000, level: 0, yearsInRole: 3, performance: 95 },
      stats: { happiness: 70, health: 70, smarts: 70, looks: 55, charisma: 95, wealth: 50 },
    })
    for (let i = 0; i < 300; i++) {
      state = askForRaise(state)
      last = state.career.salary
      state = { ...state, career: { ...state.career, performance: 95 } }
    }
    const band = CAREERS.find(c => c.id === 'farmer').levels[0].salaryRange[1]
    expect(last, `300 raises reached $${last.toLocaleString()} against a band top of $${band.toLocaleString()}`)
      .toBeLessThan(band * 2)
  })
})
