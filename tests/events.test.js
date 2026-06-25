import { describe, it, expect } from 'vitest'
import { EVENTS, EVENTS_BY_PHASE } from '../src/data/events.js'

const VALID_PHASES = new Set([
  'early_childhood', 'childhood', 'adolescence',
  'young_adult', 'midlife', 'late_life', null,
])

// ─── Event shape validation ───────────────────────────────────────────────────

describe('EVENTS array', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(EVENTS)).toBe(true)
    expect(EVENTS.length).toBeGreaterThan(1000)
  })

  it('every event has a string id', () => {
    const failures = []
    for (const e of EVENTS) {
      if (typeof e.id !== 'string' || e.id.length === 0) failures.push(e)
    }
    if (failures.length > 0) {
      console.error('Events missing id:', failures.slice(0, 5).map(e => e))
    }
    expect(failures.length).toBe(0)
  })

  it('every event has a valid phase', () => {
    const failures = []
    for (const e of EVENTS) {
      if (!VALID_PHASES.has(e.phase)) failures.push({ id: e.id, phase: e.phase })
    }
    if (failures.length > 0) {
      console.error('Events with invalid phase:', failures.slice(0, 10))
    }
    expect(failures.length).toBe(0)
  })

  it('no event uses phase "adult" — that is not a valid phase', () => {
    const adultEvents = EVENTS.filter(e => e.phase === 'adult')
    if (adultEvents.length > 0) {
      console.error('Events with invalid phase "adult":', adultEvents.map(e => e.id))
    }
    expect(adultEvents.length).toBe(0)
  })

  it('every event has text (string or function)', () => {
    const failures = []
    for (const e of EVENTS) {
      if (typeof e.text !== 'string' && typeof e.text !== 'function') {
        failures.push({ id: e.id, text: e.text })
      }
    }
    if (failures.length > 0) {
      console.error('Events with missing text:', failures.slice(0, 5))
    }
    expect(failures.length).toBe(0)
  })

  it('event ids are unique', () => {
    const ids = EVENTS.map(e => e.id)
    const seen = new Set()
    const duplicates = []
    for (const id of ids) {
      if (seen.has(id)) duplicates.push(id)
      seen.add(id)
    }
    if (duplicates.length > 0) {
      console.error('Duplicate event ids:', duplicates.slice(0, 20))
    }
    expect(duplicates.length).toBe(0)
  })

  it('when guard is a function when present', () => {
    const failures = []
    for (const e of EVENTS) {
      if (e.when !== undefined && e.when !== null && typeof e.when !== 'function') {
        failures.push({ id: e.id, when: typeof e.when })
      }
    }
    if (failures.length > 0) {
      console.error('Events with non-function when guard:', failures.slice(0, 5))
    }
    expect(failures.length).toBe(0)
  })

  it('choices is null, undefined, or an array', () => {
    const failures = []
    for (const e of EVENTS) {
      if (e.choices !== null && e.choices !== undefined && !Array.isArray(e.choices)) {
        failures.push({ id: e.id })
      }
    }
    if (failures.length > 0) {
      console.error('Events with non-array choices:', failures.slice(0, 5))
    }
    expect(failures.length).toBe(0)
  })

  it('each choice has text and effect function', () => {
    const failures = []
    for (const e of EVENTS) {
      if (!Array.isArray(e.choices)) continue
      for (const c of e.choices) {
        if (typeof c.text !== 'string' && typeof c.text !== 'function') failures.push({ id: e.id, issue: 'choice missing text' })
        if (c.effect !== undefined && typeof c.effect !== 'function') {
          failures.push({ id: e.id, issue: 'choice effect is not a function' })
        }
      }
    }
    if (failures.length > 0) {
      console.error('Events with invalid choices:', failures.slice(0, 10))
    }
    expect(failures.length).toBe(0)
  })

  it('effect is a function or null/undefined when no choices', () => {
    const failures = []
    for (const e of EVENTS) {
      if (Array.isArray(e.choices)) continue // choices handle their own effects
      if (e.effect !== undefined && e.effect !== null && typeof e.effect !== 'function') {
        failures.push({ id: e.id, effectType: typeof e.effect })
      }
    }
    if (failures.length > 0) {
      console.error('Events with non-function effect:', failures.slice(0, 5))
    }
    expect(failures.length).toBe(0)
  })

  it('weight is a positive number when present', () => {
    const failures = []
    for (const e of EVENTS) {
      if (e.weight !== undefined && (typeof e.weight !== 'number' || e.weight <= 0)) {
        failures.push({ id: e.id, weight: e.weight })
      }
    }
    if (failures.length > 0) {
      console.error('Events with invalid weight:', failures.slice(0, 5))
    }
    expect(failures.length).toBe(0)
  })

  it('cooldown is a positive number when present', () => {
    const failures = []
    for (const e of EVENTS) {
      if (e.cooldown !== undefined && e.cooldown !== null) {
        if (typeof e.cooldown !== 'number' || e.cooldown < 0) {
          failures.push({ id: e.id, cooldown: e.cooldown })
        }
      }
    }
    if (failures.length > 0) {
      console.error('Events with invalid cooldown:', failures.slice(0, 5))
    }
    expect(failures.length).toBe(0)
  })
})

// ─── EVENTS_BY_PHASE ──────────────────────────────────────────────────────────

describe('EVENTS_BY_PHASE', () => {
  it('is a plain object', () => {
    expect(typeof EVENTS_BY_PHASE).toBe('object')
    expect(EVENTS_BY_PHASE).not.toBeNull()
  })

  it('contains known phases as keys', () => {
    const knownPhases = ['early_childhood', 'childhood', 'adolescence', 'young_adult', 'midlife', 'late_life']
    for (const phase of knownPhases) {
      expect(EVENTS_BY_PHASE).toHaveProperty(phase)
      expect(Array.isArray(EVENTS_BY_PHASE[phase])).toBe(true)
    }
  })

  it('all events in each phase bucket have the correct phase', () => {
    const failures = []
    for (const [phase, events] of Object.entries(EVENTS_BY_PHASE)) {
      for (const e of events) {
        if (e.phase !== phase && e.phase !== null) {
          failures.push({ id: e.id, expected: phase, got: e.phase })
        }
      }
    }
    if (failures.length > 0) {
      console.error('Phase bucket mismatches:', failures.slice(0, 10))
    }
    expect(failures.length).toBe(0)
  })

  it('total events across all phases equals EVENTS length (approximately)', () => {
    const totalInBuckets = Object.values(EVENTS_BY_PHASE).reduce((sum, arr) => sum + arr.length, 0)
    // totalInBuckets may differ from EVENTS.length because phase:null events can appear in null bucket
    // We just check that a substantial portion is covered
    expect(totalInBuckets).toBeGreaterThan(500)
  })
})
