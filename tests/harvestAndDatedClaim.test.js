import { describe, it, expect } from 'vitest'
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} }
const { getNextEvent, buildG, tick } = await import('../src/engine/tick.js')
const { EVENTS } = await import('../src/data/events.js')
const { useGameStore } = await import('../src/store/gameStore.js')

const BY_ID = new Map(EVENTS.filter(Boolean).map(e => [e.id, e]))

function stateIn(overrides, year, age, extra = {}) {
  useGameStore.getState().startCuratedGame({ ...overrides, birthYear: year - age })
  const s = useGameStore.getState()
  return { ...s, mode: 'passive', age, currentYear: year, queue: [], ...extra }
}

// The dated slot exists so a light one-year event is not lost to the register
// draw. It must not become a way past a heavy event eligible the same year:
// a weight-2 moon landing took 1969 from an Igbo child whose weight-999 war was
// open that year, undated only because the war ran three years.
describe('dated claim yields to a much heavier eligible event', () => {
  it('ngm_biafra_child beats tech_moon_landing in 1969', () => {
    const moon = BY_ID.get('tech_moon_landing')
    const biafra = BY_ID.get('ngm_biafra_child')
    expect(moon && biafra).toBeTruthy()
    let s = null
    for (let i = 0; i < 30 && !s; i++) {
      const c = stateIn({ country: 'Nigeria', ethnicity: 'igbo' }, 1969, 7)
      const G = buildG(c)
      if (c.character.ethnicity === 'igbo' && moon.when(G) && biafra.when(G)) s = c
    }
    expect(s, 'an Igbo seven-year-old in 1969 eligible for both').not.toBeNull()
    let moonN = 0, biafraN = 0
    for (let i = 0; i < 300; i++) {
      const id = getNextEvent(s)?.id
      if (id === 'tech_moon_landing') moonN++
      if (id === 'ngm_biafra_child') biafraN++
    }
    expect(biafraN).toBeGreaterThan(moonN * 5)
    expect(moonN / 300).toBeLessThan(0.05)
  })
})

// One harvest per year, shared: mem carries it, and the farm's own texture
// agrees with it.
describe('harvest mem convention', () => {
  const GOOD = 'A good harvest. The yield is better than most years.'
  const BAD = 'A bad year for the harvest. You earn significantly less than expected.'
  it('sets mem.harvestYear and mem.harvestFactor every year, for everybody', () => {
    let s = stateIn({ country: 'Nigeria' }, 1980, 20)
    for (let i = 0; i < 5; i++) {
      s = tick(s)
      expect(s.mem.harvestYear).toBe(s.currentYear)
      expect(typeof s.mem.harvestFactor).toBe('number')
      expect(s.mem.harvestFactor).toBeGreaterThanOrEqual(0.3)
      expect(s.mem.harvestFactor).toBeLessThanOrEqual(1.6)
    }
  })

  it("a farmer's harvest line agrees with the year's harvestFactor", () => {
    let checked = 0
    for (let life = 0; life < 6; life++) {
      let s = stateIn({ country: 'Nigeria' }, 1985, 30, {
        career: { id: 'farmer', title: 'Farmer', field: 'agriculture', level: 0, salary: 400, baseSalary: 4000, performance: 60, wageCountry: 'Nigeria' },
      })
      for (let y = 0; y < 15 && !s.isDead && !s.dead; y++) {
        const before = s.log.length
        s = tick(s)
        if (s.career?.field !== 'agriculture') break
        const lines = s.log.slice(before).filter(l => l.isTexture).map(l => l.text)
        const f = s.mem.harvestFactor
        if (lines.includes(GOOD)) { checked++; expect(f).toBeGreaterThan(1.1) }
        if (lines.includes(BAD)) { checked++; expect(f).toBeLessThan(0.85) }
      }
    }
    expect(checked).toBeGreaterThan(0)
  })
})
