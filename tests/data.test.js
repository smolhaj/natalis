import { describe, it, expect } from 'vitest'
import { CAREERS } from '../src/data/careers.js'
import { CRIMES } from '../src/data/crimes.js'
import { RIBBONS } from '../src/data/ribbons.js'

// ─── CAREERS ──────────────────────────────────────────────────────────────────

describe('CAREERS array', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(CAREERS)).toBe(true)
    expect(CAREERS.length).toBeGreaterThan(10)
  })

  it('every career has a string id', () => {
    const failures = CAREERS.filter(c => typeof c.id !== 'string' || c.id.length === 0)
    if (failures.length > 0) console.error('Careers missing id:', failures.map(c => c))
    expect(failures.length).toBe(0)
  })

  it('career ids are unique', () => {
    const ids = CAREERS.map(c => c.id)
    const seen = new Set()
    const duplicates = []
    for (const id of ids) {
      if (seen.has(id)) duplicates.push(id)
      seen.add(id)
    }
    if (duplicates.length > 0) console.error('Duplicate career ids:', duplicates)
    expect(duplicates.length).toBe(0)
  })

  it('every career has a title', () => {
    const failures = CAREERS.filter(c => typeof c.title !== 'string' || c.title.length === 0)
    if (failures.length > 0) console.error('Careers missing title:', failures.map(c => c.id))
    expect(failures.length).toBe(0)
  })

  it('every career has a field', () => {
    const failures = CAREERS.filter(c => typeof c.field !== 'string')
    if (failures.length > 0) console.error('Careers missing field:', failures.map(c => c.id))
    expect(failures.length).toBe(0)
  })

  it('every career has levels array', () => {
    const failures = CAREERS.filter(c => !Array.isArray(c.levels) || c.levels.length === 0)
    if (failures.length > 0) console.error('Careers missing levels:', failures.map(c => c.id))
    expect(failures.length).toBe(0)
  })

  it('era-gated careers have valid minYear', () => {
    const failures = []
    for (const c of CAREERS) {
      if (c.minYear !== undefined) {
        if (typeof c.minYear !== 'number' || c.minYear < 1800 || c.minYear > 2030) {
          failures.push({ id: c.id, minYear: c.minYear })
        }
      }
    }
    if (failures.length > 0) console.error('Careers with invalid minYear:', failures)
    expect(failures.length).toBe(0)
  })

  it('career events have valid shape when present', () => {
    const failures = []
    for (const career of CAREERS) {
      if (!Array.isArray(career.events)) continue
      for (const e of career.events) {
        if (typeof e.id !== 'string') failures.push({ career: career.id, issue: 'missing event id' })
        if (typeof e.text !== 'string' && typeof e.text !== 'function') {
          failures.push({ career: career.id, eventId: e.id, issue: 'missing event text' })
        }
      }
    }
    if (failures.length > 0) console.error('Career events with invalid shape:', failures.slice(0, 10))
    expect(failures.length).toBe(0)
  })
})

// ─── CRIMES ───────────────────────────────────────────────────────────────────

describe('CRIMES array', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(CRIMES)).toBe(true)
    expect(CRIMES.length).toBeGreaterThan(5)
  })

  it('every crime has a string id', () => {
    const failures = CRIMES.filter(c => typeof c.id !== 'string' || c.id.length === 0)
    if (failures.length > 0) console.error('Crimes missing id:', failures)
    expect(failures.length).toBe(0)
  })

  it('crime ids are unique', () => {
    const ids = CRIMES.map(c => c.id)
    const seen = new Set()
    const duplicates = []
    for (const id of ids) {
      if (seen.has(id)) duplicates.push(id)
      seen.add(id)
    }
    if (duplicates.length > 0) console.error('Duplicate crime ids:', duplicates)
    expect(duplicates.length).toBe(0)
  })

  it('every crime has a name', () => {
    const failures = CRIMES.filter(c => typeof c.name !== 'string' || c.name.length === 0)
    if (failures.length > 0) console.error('Crimes missing name:', failures.map(c => c.id))
    expect(failures.length).toBe(0)
  })

  it('every crime has arrestRisk between 0 and 1', () => {
    const failures = CRIMES.filter(c =>
      typeof c.arrestRisk !== 'number' || c.arrestRisk < 0 || c.arrestRisk > 1
    )
    if (failures.length > 0) console.error('Crimes with invalid arrestRisk:', failures.map(c => `${c.id}: ${c.arrestRisk}`))
    expect(failures.length).toBe(0)
  })

  it('every crime has a sentence (array or object with min/max)', () => {
    const failures = []
    for (const c of CRIMES) {
      if (Array.isArray(c.sentence)) {
        if (c.sentence.length !== 2 || c.sentence[0] > c.sentence[1]) {
          failures.push({ id: c.id, sentence: c.sentence })
        }
      } else if (c.sentence && typeof c.sentence === 'object') {
        if (typeof c.sentence.min !== 'number' || typeof c.sentence.max !== 'number') {
          failures.push({ id: c.id, sentence: c.sentence })
        }
      } else {
        failures.push({ id: c.id, sentence: c.sentence, issue: 'no sentence' })
      }
    }
    if (failures.length > 0) console.error('Crimes with invalid sentence:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('every crime has either old format (successEffect/caughtEffect) or new format (effect/failEffect)', () => {
    const failures = []
    for (const c of CRIMES) {
      const hasNew = typeof c.effect === 'function' || typeof c.failEffect === 'function'
      const hasOld = typeof c.successEffect === 'function' || typeof c.caughtEffect === 'function'
      if (!hasNew && !hasOld) {
        failures.push({ id: c.id, issue: 'neither old nor new format effect found' })
      }
    }
    if (failures.length > 0) console.error('Crimes with no effect functions:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })
})

// ─── RIBBONS ──────────────────────────────────────────────────────────────────

describe('RIBBONS array', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(RIBBONS)).toBe(true)
    expect(RIBBONS.length).toBeGreaterThan(50)
  })

  it('every ribbon has a string name', () => {
    const failures = RIBBONS.filter(r => typeof r.name !== 'string' || r.name.length === 0)
    if (failures.length > 0) console.error('Ribbons missing name:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('ribbon names are unique', () => {
    const names = RIBBONS.map(r => r.name)
    const seen = new Set()
    const duplicates = []
    for (const n of names) {
      if (seen.has(n)) duplicates.push(n)
      seen.add(n)
    }
    if (duplicates.length > 0) console.error('Duplicate ribbon names:', duplicates)
    expect(duplicates.length).toBe(0)
  })

  it('every ribbon has a description', () => {
    const failures = RIBBONS.filter(r => typeof r.description !== 'string' || r.description.length === 0)
    if (failures.length > 0) console.error('Ribbons missing description:', failures.map(r => r.name).slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('every ribbon has a color string', () => {
    const failures = RIBBONS.filter(r => typeof r.color !== 'string' || r.color.length === 0)
    if (failures.length > 0) console.error('Ribbons missing color:', failures.map(r => r.name).slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('every ribbon has a priority number', () => {
    const failures = RIBBONS.filter(r => typeof r.priority !== 'number')
    if (failures.length > 0) console.error('Ribbons missing priority:', failures.map(r => r.name).slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('every ribbon has a condition function', () => {
    const failures = RIBBONS.filter(r => typeof r.condition !== 'function')
    if (failures.length > 0) console.error('Ribbons missing condition function:', failures.map(r => r.name).slice(0, 5))
    expect(failures.length).toBe(0)
  })
})
