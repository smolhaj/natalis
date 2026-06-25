import { describe, it, expect } from 'vitest'
import {
  FlagSet,
  getPhase,
  getCountryRegime,
  isLgbtqCriminalized,
  weightedRandom,
  weightedRandomFromArray,
  createCharacter,
  deriveInitialStats,
  deriveInitialMoney,
  getHyperinflation,
  GDP_MULT,
  HYPERINFLATION_DRAIN,
  ADULT_TRAITS,
  CHILD_TRAITS,
  pickTraits,
  BUSINESS_TYPES,
  PARTNER_OCCUPATIONS,
} from '../src/engine/character.js'
import { makeCountry } from './helpers.js'

// ─── FlagSet ──────────────────────────────────────────────────────────────────

describe('FlagSet', () => {
  it('extends Set with .includes() as alias for .has()', () => {
    const fs = new FlagSet(['alpha', 'beta'])
    expect(fs.has('alpha')).toBe(true)
    expect(fs.includes('alpha')).toBe(true)
    expect(fs.has('gamma')).toBe(false)
    expect(fs.includes('gamma')).toBe(false)
  })

  it('.some() iterates values and short-circuits', () => {
    const fs = new FlagSet(['x', 'y', 'z'])
    expect(fs.some(v => v === 'y')).toBe(true)
    expect(fs.some(v => v === 'q')).toBe(false)
  })

  it('.filter() returns array of matching values', () => {
    const fs = new FlagSet(['a1', 'b2', 'a3'])
    expect(fs.filter(v => v.startsWith('a'))).toEqual(['a1', 'a3'])
  })

  it('.find() returns first matching value', () => {
    const fs = new FlagSet(['p', 'q', 'r'])
    expect(fs.find(v => v === 'q')).toBe('q')
    expect(fs.find(v => v === 'z')).toBeUndefined()
  })

  it('can be iterated like a Set', () => {
    const fs = new FlagSet(['one', 'two'])
    expect([...fs]).toEqual(['one', 'two'])
  })
})

// ─── getPhase ─────────────────────────────────────────────────────────────────

describe('getPhase', () => {
  it('returns early_childhood for age 0–5', () => {
    expect(getPhase(0)).toBe('early_childhood')
    expect(getPhase(3)).toBe('early_childhood')
    expect(getPhase(5)).toBe('early_childhood')
  })

  it('returns childhood for ages 6–11', () => {
    expect(getPhase(6)).toBe('childhood')
    expect(getPhase(11)).toBe('childhood')
  })

  it('returns adolescence for ages 12–17', () => {
    expect(getPhase(12)).toBe('adolescence')
    expect(getPhase(17)).toBe('adolescence')
  })

  it('returns young_adult for ages 18–29', () => {
    expect(getPhase(18)).toBe('young_adult')
    expect(getPhase(29)).toBe('young_adult')
  })

  it('returns midlife for ages 30–49', () => {
    expect(getPhase(30)).toBe('midlife')
    expect(getPhase(49)).toBe('midlife')
  })

  it('returns late_life for age 50+', () => {
    expect(getPhase(50)).toBe('late_life')
    expect(getPhase(90)).toBe('late_life')
  })

  it('never returns "adult" — that is not a valid phase', () => {
    for (let age = 0; age <= 100; age++) {
      expect(getPhase(age)).not.toBe('adult')
    }
  })
})

// ─── getCountryRegime ─────────────────────────────────────────────────────────

describe('getCountryRegime', () => {
  it('returns democracy by default when no country', () => {
    expect(getCountryRegime(null, 2000)).toBe('democracy')
    expect(getCountryRegime(undefined, 2000)).toBe('democracy')
  })

  it('returns the base regime when no regimeHistory', () => {
    const country = makeCountry({ regime: 'parliamentary_republic', regimeHistory: [] })
    expect(getCountryRegime(country, 1980)).toBe('parliamentary_republic')
  })

  it('applies a transition when year >= transition year', () => {
    const country = makeCountry({
      regime: 'constitutional_monarchy',
      regimeHistory: [{ year: 1979, to: 'theocracy' }],
    })
    expect(getCountryRegime(country, 1978)).toBe('constitutional_monarchy')
    expect(getCountryRegime(country, 1979)).toBe('theocracy')
    expect(getCountryRegime(country, 2000)).toBe('theocracy')
  })

  it('applies multiple transitions in chronological order', () => {
    const country = makeCountry({
      regime: 'democracy',
      regimeHistory: [
        { year: 1950, to: 'military_dictatorship' },
        { year: 1975, to: 'democracy' },
      ],
    })
    expect(getCountryRegime(country, 1945)).toBe('democracy')
    expect(getCountryRegime(country, 1960)).toBe('military_dictatorship')
    expect(getCountryRegime(country, 1975)).toBe('democracy')
    expect(getCountryRegime(country, 2000)).toBe('democracy')
  })
})

// ─── isLgbtqCriminalized ──────────────────────────────────────────────────────

describe('isLgbtqCriminalized', () => {
  it('returns false for null country', () => {
    expect(isLgbtqCriminalized(null, 2000)).toBe(false)
  })

  it('returns false when not criminalized', () => {
    const country = makeCountry({ lgbtqCriminalized: false })
    expect(isLgbtqCriminalized(country, 2000)).toBe(false)
  })

  it('returns true when criminalized with no legal year', () => {
    const country = makeCountry({ lgbtqCriminalized: true, lgbtqLegalYear: null })
    expect(isLgbtqCriminalized(country, 2020)).toBe(true)
  })

  it('returns true before legal year, false at and after', () => {
    const country = makeCountry({ lgbtqCriminalized: true, lgbtqLegalYear: 2015 })
    expect(isLgbtqCriminalized(country, 2014)).toBe(true)
    expect(isLgbtqCriminalized(country, 2015)).toBe(false)
    expect(isLgbtqCriminalized(country, 2020)).toBe(false)
  })
})

// ─── weightedRandom ───────────────────────────────────────────────────────────

describe('weightedRandom', () => {
  it('returns one of the keys from the weights object', () => {
    const weights = { apple: 1, banana: 2, cherry: 3 }
    for (let i = 0; i < 50; i++) {
      const result = weightedRandom(weights)
      expect(Object.keys(weights)).toContain(result)
    }
  })

  it('returns the only key when weight is 1', () => {
    expect(weightedRandom({ solo: 1 })).toBe('solo')
  })

  it('returns the first key when total is 0', () => {
    expect(weightedRandom({ a: 0, b: 0 })).toBe('a')
  })
})

// ─── weightedRandomFromArray ──────────────────────────────────────────────────

describe('weightedRandomFromArray', () => {
  it('returns an element from the array', () => {
    const arr = [{ id: 'x', share: 0.3 }, { id: 'y', share: 0.7 }]
    for (let i = 0; i < 30; i++) {
      const result = weightedRandomFromArray(arr, 'share')
      expect(arr).toContain(result)
    }
  })

  it('falls back to last element when all weights are 0', () => {
    const arr = [{ id: 'a', share: 0 }, { id: 'b', share: 0 }]
    const result = weightedRandomFromArray(arr, 'share')
    expect(arr).toContain(result)
  })
})

// ─── createCharacter ─────────────────────────────────────────────────────────

describe('createCharacter', () => {
  it('creates a character with all required fields', () => {
    const char = createCharacter()
    expect(char).toHaveProperty('name')
    expect(char).toHaveProperty('firstName')
    expect(char).toHaveProperty('surname')
    expect(char).toHaveProperty('gender')
    expect(char).toHaveProperty('birthYear')
    expect(char).toHaveProperty('country')
    expect(char).toHaveProperty('wealthTier')
    expect(char).toHaveProperty('familyStability')
    expect(char).toHaveProperty('religion')
    expect(char).toHaveProperty('ethnicity')
    expect(char).toHaveProperty('ruralUrban')
    expect(char).toHaveProperty('initialStats')
  })

  it('uses the provided country name override', () => {
    const char = createCharacter({ country: 'France' })
    expect(char.country.name).toBe('France')
  })

  it('uses provided gender override', () => {
    const male = createCharacter({ gender: 'male' })
    expect(male.gender).toBe('male')
    const female = createCharacter({ gender: 'female' })
    expect(female.gender).toBe('female')
  })

  it('gender is either male or female', () => {
    for (let i = 0; i < 20; i++) {
      const char = createCharacter()
      expect(['male', 'female']).toContain(char.gender)
    }
  })

  it('initialStats has all six stat fields within 0–100', () => {
    for (let i = 0; i < 10; i++) {
      const char = createCharacter()
      const stats = char.initialStats
      for (const key of ['happiness', 'health', 'smarts', 'looks', 'charisma', 'wealth']) {
        expect(stats).toHaveProperty(key)
        expect(stats[key]).toBeGreaterThanOrEqual(0)
        expect(stats[key]).toBeLessThanOrEqual(100)
      }
    }
  })

  it('wealthTier is between 0 and 4', () => {
    for (let i = 0; i < 20; i++) {
      const char = createCharacter()
      expect(char.wealthTier).toBeGreaterThanOrEqual(0)
      expect(char.wealthTier).toBeLessThanOrEqual(4)
    }
  })

  it('familyStability is one of the four valid values', () => {
    const valid = ['unstable', 'struggling', 'stable', 'secure']
    for (let i = 0; i < 20; i++) {
      const char = createCharacter()
      expect(valid).toContain(char.familyStability)
    }
  })

  it('ruralUrban is one of the three valid values', () => {
    const valid = ['urban', 'suburban', 'rural']
    for (let i = 0; i < 20; i++) {
      const char = createCharacter()
      expect(valid).toContain(char.ruralUrban)
    }
  })
})

// ─── deriveInitialStats ───────────────────────────────────────────────────────

describe('deriveInitialStats', () => {
  it('returns the initialStats from the character', () => {
    const char = {
      initialStats: { happiness: 60, health: 70, smarts: 55, looks: 50, charisma: 48, wealth: 45 },
    }
    expect(deriveInitialStats(char)).toEqual(char.initialStats)
  })
})

// ─── deriveInitialMoney ───────────────────────────────────────────────────────

describe('deriveInitialMoney', () => {
  it('returns a non-negative number', () => {
    const char = {
      wealthTier: 2,
      country: makeCountry({ gdp: 'medium' }),
      familyStability: 'stable',
    }
    const money = deriveInitialMoney(char)
    expect(typeof money).toBe('number')
    expect(money).toBeGreaterThanOrEqual(0)
  })

  it('higher gdp tiers yield more money on average', () => {
    const runs = 30
    const avgFor = (gdp) => {
      let total = 0
      for (let i = 0; i < runs; i++) {
        total += deriveInitialMoney({ wealthTier: 3, country: makeCountry({ gdp }), familyStability: 'stable' })
      }
      return total / runs
    }
    const highGdpAvg = avgFor('very_high')
    const lowGdpAvg = avgFor('very_low')
    expect(highGdpAvg).toBeGreaterThan(lowGdpAvg)
  })
})

// ─── getHyperinflation ────────────────────────────────────────────────────────

describe('getHyperinflation', () => {
  it('returns null for a country with no hyperinflation history', () => {
    expect(getHyperinflation('Sweden', 1990, [])).toBeNull()
  })

  it('returns a severity object for Zimbabwe during hyperinflation years', () => {
    const result = getHyperinflation('Zimbabwe', 2008, [])
    expect(result).not.toBeNull()
    expect(result).toHaveProperty('severity')
    expect(['moderate', 'severe', 'extreme']).toContain(result.severity)
  })

  it('returns null for Zimbabwe outside hyperinflation years', () => {
    expect(getHyperinflation('Zimbabwe', 1985, [])).toBeNull()
  })
})

// ─── GDP_MULT ─────────────────────────────────────────────────────────────────

describe('GDP_MULT', () => {
  it('has all seven GDP tier keys', () => {
    const tiers = ['very_high', 'high', 'medium_high', 'medium', 'low_medium', 'low', 'very_low']
    for (const tier of tiers) {
      expect(GDP_MULT).toHaveProperty(tier)
      expect(GDP_MULT[tier]).toBeGreaterThan(0)
    }
  })

  it('tiers are ordered highest to lowest', () => {
    expect(GDP_MULT.very_high).toBeGreaterThan(GDP_MULT.very_low)
    expect(GDP_MULT.high).toBeGreaterThan(GDP_MULT.medium)
    expect(GDP_MULT.medium).toBeGreaterThan(GDP_MULT.very_low)
  })
})

// ─── HYPERINFLATION_DRAIN ─────────────────────────────────────────────────────

describe('HYPERINFLATION_DRAIN', () => {
  it('has moderate, severe, and extreme keys', () => {
    expect(HYPERINFLATION_DRAIN).toHaveProperty('moderate')
    expect(HYPERINFLATION_DRAIN).toHaveProperty('severe')
    expect(HYPERINFLATION_DRAIN).toHaveProperty('extreme')
  })

  it('drain values are ordered', () => {
    expect(HYPERINFLATION_DRAIN.moderate).toBeLessThan(HYPERINFLATION_DRAIN.severe)
    expect(HYPERINFLATION_DRAIN.severe).toBeLessThan(HYPERINFLATION_DRAIN.extreme)
  })

  it('all drain values are between 0 and 1', () => {
    for (const v of Object.values(HYPERINFLATION_DRAIN)) {
      expect(v).toBeGreaterThan(0)
      expect(v).toBeLessThanOrEqual(1)
    }
  })
})

// ─── Traits & content arrays ──────────────────────────────────────────────────

describe('ADULT_TRAITS', () => {
  it('is a non-empty array of strings', () => {
    expect(Array.isArray(ADULT_TRAITS)).toBe(true)
    expect(ADULT_TRAITS.length).toBeGreaterThan(0)
    for (const t of ADULT_TRAITS) expect(typeof t).toBe('string')
  })
})

describe('CHILD_TRAITS', () => {
  it('is a non-empty array of strings', () => {
    expect(Array.isArray(CHILD_TRAITS)).toBe(true)
    expect(CHILD_TRAITS.length).toBeGreaterThan(0)
  })
})

describe('pickTraits', () => {
  it('returns an array of the requested count', () => {
    const result = pickTraits(ADULT_TRAITS, 2)
    expect(result).toHaveLength(2)
    for (const t of result) expect(ADULT_TRAITS).toContain(t)
  })

  it('returns no duplicates', () => {
    const result = pickTraits(ADULT_TRAITS, 3)
    expect(new Set(result).size).toBe(result.length)
  })
})

describe('BUSINESS_TYPES', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(BUSINESS_TYPES)).toBe(true)
    expect(BUSINESS_TYPES.length).toBeGreaterThan(0)
  })

  it('each entry has id, startupCost, and baseRevenue', () => {
    for (const b of BUSINESS_TYPES) {
      expect(b).toHaveProperty('id')
      expect(b).toHaveProperty('startupCost')
      expect(b).toHaveProperty('baseRevenue')
    }
  })
})

describe('PARTNER_OCCUPATIONS', () => {
  it('is a non-empty array of strings', () => {
    expect(Array.isArray(PARTNER_OCCUPATIONS)).toBe(true)
    expect(PARTNER_OCCUPATIONS.length).toBeGreaterThan(0)
    for (const o of PARTNER_OCCUPATIONS) expect(typeof o).toBe('string')
  })
})
