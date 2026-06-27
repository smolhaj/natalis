import { describe, it, expect } from 'vitest'
import { WORLD_EVENTS } from '../src/data/worldEvents.js'

// ─── World event shape validation ────────────────────────────────────────────

describe('WORLD_EVENTS array', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(WORLD_EVENTS)).toBe(true)
    expect(WORLD_EVENTS.length).toBeGreaterThan(100)
  })

  it('every world event has a string id', () => {
    const failures = []
    for (const we of WORLD_EVENTS) {
      if (typeof we.id !== 'string' || we.id.length === 0) failures.push(we)
    }
    if (failures.length > 0) console.error('World events missing id:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('every world event has a name', () => {
    const failures = []
    for (const we of WORLD_EVENTS) {
      if (typeof we.name !== 'string' || we.name.length === 0) failures.push({ id: we.id })
    }
    if (failures.length > 0) console.error('World events missing name:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('every world event has a valid years array', () => {
    const failures = []
    for (const we of WORLD_EVENTS) {
      if (!Array.isArray(we.years) || we.years.length !== 2) {
        failures.push({ id: we.id, years: we.years })
      } else if (we.years[0] > we.years[1]) {
        failures.push({ id: we.id, years: we.years, issue: 'start > end' })
      }
    }
    if (failures.length > 0) console.error('World events with invalid years:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('every world event has narrative (string or function)', () => {
    const failures = []
    for (const we of WORLD_EVENTS) {
      if (typeof we.narrative !== 'string' && typeof we.narrative !== 'function') {
        failures.push({ id: we.id })
      }
    }
    if (failures.length > 0) console.error('World events missing narrative:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('every world event has an effect function', () => {
    const failures = []
    for (const we of WORLD_EVENTS) {
      if (typeof we.effect !== 'function') failures.push({ id: we.id, effectType: typeof we.effect })
    }
    if (failures.length > 0) console.error('World events missing effect function:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('world event ids are unique', () => {
    const ids = WORLD_EVENTS.map(we => we.id)
    const seen = new Set()
    const duplicates = []
    for (const id of ids) {
      if (seen.has(id)) duplicates.push(id)
      seen.add(id)
    }
    if (duplicates.length > 0) console.error('Duplicate world event ids:', duplicates)
    expect(duplicates.length).toBe(0)
  })

  it('when guard is a function when present', () => {
    const failures = []
    for (const we of WORLD_EVENTS) {
      if (we.when !== undefined && we.when !== null && typeof we.when !== 'function') {
        failures.push({ id: we.id, when: typeof we.when })
      }
    }
    if (failures.length > 0) console.error('World events with non-function when guard:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('archetypes is "all", an array, or absent', () => {
    const validArchetypes = new Set([
      'wealthy_west', 'wealthy_east', 'wealthy_gulf', 'post_soviet',
      'developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone',
    ])
    const failures = []
    for (const we of WORLD_EVENTS) {
      if (we.archetypes === undefined || we.archetypes === null || we.archetypes === 'all') continue
      if (!Array.isArray(we.archetypes)) {
        failures.push({ id: we.id, archetypes: we.archetypes })
      } else {
        for (const a of we.archetypes) {
          if (!validArchetypes.has(a)) failures.push({ id: we.id, badArchetype: a })
        }
      }
    }
    if (failures.length > 0) console.error('World events with invalid archetypes:', failures.slice(0, 10))
    expect(failures.length).toBe(0)
  })

  it('addFlags is an array when present', () => {
    const failures = []
    for (const we of WORLD_EVENTS) {
      if (we.addFlags !== undefined && !Array.isArray(we.addFlags)) {
        failures.push({ id: we.id, addFlags: we.addFlags })
      }
    }
    if (failures.length > 0) console.error('World events with invalid addFlags:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('minAge is a non-negative number when present', () => {
    const failures = []
    for (const we of WORLD_EVENTS) {
      if (we.minAge !== undefined && (typeof we.minAge !== 'number' || we.minAge < 0)) {
        failures.push({ id: we.id, minAge: we.minAge })
      }
    }
    if (failures.length > 0) console.error('World events with invalid minAge:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })
})
