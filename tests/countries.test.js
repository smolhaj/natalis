import { describe, it, expect } from 'vitest'
import { COUNTRIES } from '../src/data/countries.js'

const VALID_ARCHETYPES = new Set([
  'wealthy_west', 'wealthy_east', 'wealthy_gulf', 'post_soviet',
  'developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone',
])

const VALID_GDP_TIERS = new Set([
  'very_high', 'high', 'medium_high', 'medium', 'low_medium', 'low', 'very_low',
])

const VALID_HEALTHCARE = new Set(['excellent', 'good', 'fair', 'poor', 'very_poor'])

const VALID_REGIMES = new Set([
  'federal_republic', 'parliamentary_republic', 'constitutional_monarchy',
  'absolute_monarchy', 'military_dictatorship', 'single_party_communist',
  'single_party_authoritarian', 'theocracy', 'democracy',
])

describe('COUNTRIES array', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(COUNTRIES)).toBe(true)
    expect(COUNTRIES.length).toBeGreaterThan(50)
  })

  it('every country has a string name', () => {
    const failures = COUNTRIES.filter(c => typeof c.name !== 'string' || c.name.length === 0)
    if (failures.length > 0) console.error('Countries missing name:', failures.map(c => c.name))
    expect(failures.length).toBe(0)
  })

  it('country names are unique', () => {
    const names = COUNTRIES.map(c => c.name)
    const seen = new Set()
    const duplicates = []
    for (const n of names) {
      if (seen.has(n)) duplicates.push(n)
      seen.add(n)
    }
    if (duplicates.length > 0) console.error('Duplicate country names:', duplicates)
    expect(duplicates.length).toBe(0)
  })

  it('every country has a valid archetype', () => {
    const failures = COUNTRIES.filter(c => !VALID_ARCHETYPES.has(c.archetype))
    if (failures.length > 0) {
      console.error('Countries with invalid archetype:', failures.map(c => `${c.name}: ${c.archetype}`))
    }
    expect(failures.length).toBe(0)
  })

  it('every country has a valid GDP tier', () => {
    const failures = COUNTRIES.filter(c => !VALID_GDP_TIERS.has(c.gdp))
    if (failures.length > 0) {
      console.error('Countries with invalid gdp:', failures.map(c => `${c.name}: ${c.gdp}`))
    }
    expect(failures.length).toBe(0)
  })

  it('every country has valid healthcare', () => {
    const failures = COUNTRIES.filter(c => !VALID_HEALTHCARE.has(c.healthcare))
    if (failures.length > 0) {
      console.error('Countries with invalid healthcare:', failures.map(c => `${c.name}: ${c.healthcare}`))
    }
    expect(failures.length).toBe(0)
  })

  it('every country has a valid base regime', () => {
    const failures = COUNTRIES.filter(c => !VALID_REGIMES.has(c.regime))
    if (failures.length > 0) {
      console.error('Countries with invalid regime:', failures.map(c => `${c.name}: ${c.regime}`))
    }
    expect(failures.length).toBe(0)
  })

  it('every country has a valid yearRange', () => {
    const failures = []
    for (const c of COUNTRIES) {
      if (!Array.isArray(c.yearRange) || c.yearRange.length !== 2) {
        failures.push({ name: c.name, yearRange: c.yearRange })
      } else if (c.yearRange[0] > c.yearRange[1]) {
        failures.push({ name: c.name, yearRange: c.yearRange, issue: 'start > end' })
      }
    }
    if (failures.length > 0) console.error('Countries with invalid yearRange:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('every country has namePool with male and female arrays', () => {
    const failures = []
    for (const c of COUNTRIES) {
      if (!c.namePool || !Array.isArray(c.namePool.male) || !Array.isArray(c.namePool.female)) {
        failures.push(c.name)
      } else if (c.namePool.male.length === 0 || c.namePool.female.length === 0) {
        failures.push(`${c.name} (empty namePool)`)
      }
    }
    if (failures.length > 0) console.error('Countries with missing/empty namePool:', failures.slice(0, 10))
    expect(failures.length).toBe(0)
  })

  it('every country has a non-empty surnames array', () => {
    const failures = COUNTRIES.filter(c => !Array.isArray(c.surnames) || c.surnames.length === 0)
    if (failures.length > 0) console.error('Countries with missing surnames:', failures.map(c => c.name))
    expect(failures.length).toBe(0)
  })

  it('every country has wealthTierWeights with 5 values', () => {
    const failures = []
    for (const c of COUNTRIES) {
      if (!Array.isArray(c.wealthTierWeights) || c.wealthTierWeights.length !== 5) {
        failures.push({ name: c.name, len: c.wealthTierWeights?.length })
      }
    }
    if (failures.length > 0) console.error('Countries with bad wealthTierWeights:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('wealthTierWeights sum to approximately 1', () => {
    const failures = []
    for (const c of COUNTRIES) {
      if (!Array.isArray(c.wealthTierWeights)) continue
      const sum = c.wealthTierWeights.reduce((a, b) => a + b, 0)
      if (Math.abs(sum - 1.0) > 0.05) failures.push({ name: c.name, sum })
    }
    if (failures.length > 0) console.error('Countries with wealthTierWeights not summing to 1:', failures.slice(0, 5))
    expect(failures.length).toBe(0)
  })

  it('urbanRate is between 0 and 1', () => {
    const failures = COUNTRIES.filter(c => c.urbanRate < 0 || c.urbanRate > 1)
    if (failures.length > 0) console.error('Countries with invalid urbanRate:', failures.map(c => `${c.name}: ${c.urbanRate}`))
    expect(failures.length).toBe(0)
  })

  it('conflictRisk is between 0 and 1', () => {
    const failures = COUNTRIES.filter(c => c.conflictRisk < 0 || c.conflictRisk > 1)
    if (failures.length > 0) console.error('Countries with invalid conflictRisk:', failures.map(c => `${c.name}: ${c.conflictRisk}`))
    expect(failures.length).toBe(0)
  })

  it('childMarriageRisk is between 0 and 0.5', () => {
    const failures = COUNTRIES.filter(c => c.childMarriageRisk < 0 || c.childMarriageRisk > 0.5)
    if (failures.length > 0) {
      console.error('Countries with invalid childMarriageRisk:', failures.map(c => `${c.name}: ${c.childMarriageRisk}`))
    }
    expect(failures.length).toBe(0)
  })

  it('regimeHistory transitions reference valid regime types', () => {
    const failures = []
    for (const c of COUNTRIES) {
      if (!Array.isArray(c.regimeHistory)) continue
      for (const h of c.regimeHistory) {
        if (!VALID_REGIMES.has(h.to)) {
          failures.push({ country: c.name, year: h.year, to: h.to })
        }
      }
    }
    if (failures.length > 0) console.error('Countries with invalid regime history:', failures.slice(0, 10))
    expect(failures.length).toBe(0)
  })

  it('religionWeights values sum to approximately 1', () => {
    const failures = []
    for (const c of COUNTRIES) {
      if (!c.religionWeights) continue
      const sum = Object.values(c.religionWeights).reduce((a, b) => a + b, 0)
      if (Math.abs(sum - 1.0) > 0.05) failures.push({ name: c.name, sum })
    }
    if (failures.length > 0) {
      console.error('Countries with religionWeights not summing to 1:', failures.slice(0, 5))
    }
    expect(failures.length).toBe(0)
  })

  it('ethnicGroups share values sum to approximately 1', () => {
    const failures = []
    for (const c of COUNTRIES) {
      if (!Array.isArray(c.ethnicGroups) || c.ethnicGroups.length === 0) continue
      const sum = c.ethnicGroups.reduce((a, g) => a + (g.share ?? 0), 0)
      if (Math.abs(sum - 1.0) > 0.05) failures.push({ name: c.name, sum })
    }
    if (failures.length > 0) {
      console.error('Countries with ethnicGroups not summing to 1:', failures.slice(0, 5))
    }
    expect(failures.length).toBe(0)
  })
})
