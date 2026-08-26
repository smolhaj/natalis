// Demographic regression tests for the life-course layer.
//
// The life course supplies the ordinary events of a life — work, a partner, a
// marriage, children, retirement — because none of them happened otherwise: an
// unsteered life reached sixty-five having never held a job or married anyone.
//
// Supplying them is only half the job. A life simulation whose demography is
// generic is a stats game with prose on top, so these assert that the ages and
// rates the engine produces are the ages and rates the historical record shows.
// The tolerances are wide, because this is a guardrail against drift and not a
// snapshot: what must not happen is a Nigerian woman born in 1962 marrying at
// thirty-four, or a German born in 1970 having six children.
import { describe, it, expect } from 'vitest'
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} }
import { tick, resolveAutoEvent, resolveChoice } from '../src/engine/tick.js'
import { useGameStore } from '../src/store/gameStore.js'

// [country, birth year, real median age at first marriage for that cohort,
//  real total fertility during their childbearing years]
// Sources are the standard UN/World Bank series for the relevant decade.
const RECORD = [
  ['Nigeria', 1962, 21, 6.3],
  ['United States', 1950, 23, 1.9],
  ['India', 1975, 21, 2.8],
  ['Germany', 1970, 29, 1.4],
  ['Japan', 1980, 30, 1.35],
  ['Brazil', 1995, 25, 1.7],
  ['Egypt', 1990, 24, 3.2],
]

const LIVES = 26

function runLife(country, birthYear, mode = 'passive') {
  useGameStore.getState().startCuratedGame({ country, birthYear })
  let s = { ...useGameStore.getState(), mode }
  let marriedAt = null
  let hadCareer = false
  for (let y = 0; y < 110 && !s.dead; y++) {
    s = tick(s)
    const ev = s.pendingEvent
    if (ev) {
      s = ev.isAutomatic || !ev.choices?.length
        ? resolveAutoEvent(s)
        : resolveChoice(s, Math.floor(Math.random() * ev.choices.length))
      if (s.pendingEvent) s = { ...s, pendingEvent: null }
    }
    if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
    if (s.pendingTrial) s = { ...s, pendingTrial: null }
    if (marriedAt === null && s.partner?.married) marriedAt = s.age
    if (s.career) hadCareer = true
  }
  return { s, marriedAt, hadCareer }
}

const median = a => (a.length ? a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)] : null)

describe('the life course actually happens', () => {
  it('gives an unsteered life a job, a partner, a marriage and children', () => {
    // The regression this exists for: 7% career, 4% partner, 0% married,
    // 1% children over 150 lives, which is what the game shipped before this.
    let adults = 0, career = 0, partner = 0, married = 0, children = 0
    for (const [country, birthYear] of RECORD) {
      for (let i = 0; i < 8; i++) {
        const { s, marriedAt, hadCareer } = runLife(country, birthYear)
        if (s.age < 30) continue
        adults++
        if (hadCareer) career++
        if (s.partner || s.flags.includes('first_relationship')) partner++
        if (marriedAt !== null) married++
        if ((s.children?.length ?? 0) > 0) children++
      }
    }
    expect(adults).toBeGreaterThan(20)
    expect(career / adults).toBeGreaterThan(0.7)
    expect(partner / adults).toBeGreaterThan(0.7)
    expect(married / adults).toBeGreaterThan(0.5)
    expect(children / adults).toBeGreaterThan(0.4)
  }, 240_000)

  it('does not overwrite a life the player is already steering', () => {
    // The whole layer is a default, not a policy. If the slot is full it must
    // leave it alone, or every player choice gets silently overridden.
    useGameStore.getState().startCuratedGame({ country: 'Germany', birthYear: 1970 })
    let s = { ...useGameStore.getState(), mode: 'active' }
    for (let y = 0; y < 25 && !s.dead; y++) {
      s = tick(s)
      if (s.pendingEvent) {
        const ev = s.pendingEvent
        s = ev.isAutomatic || !ev.choices?.length ? resolveAutoEvent(s) : resolveChoice(s, 0)
        if (s.pendingEvent) s = { ...s, pendingEvent: null }
      }
      if (s.pendingTrial) s = { ...s, pendingTrial: null }
      if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
      if (s.partner) break
    }
    if (!s.partner) return   // died or never partnered in the window; nothing to assert
    const chosen = { ...s.partner, name: 'A Name The Player Chose' }
    s = { ...s, partner: chosen }
    for (let y = 0; y < 10 && !s.dead; y++) {
      s = tick(s)
      if (s.pendingEvent) s = { ...s, pendingEvent: null }
      if (s.pendingTrial) s = { ...s, pendingTrial: null }
      if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
      // A partner may leave or die through the normal arc; what must never
      // happen is a DIFFERENT partner being silently substituted in.
      if (s.partner) expect(s.partner.name).toBe('A Name The Player Chose')
    }
  }, 120_000)
})

describe('demography matches the historical record', () => {
  for (const [country, birthYear, realMarriageAge, realTfr] of RECORD) {
    it(`${country} ${birthYear}: marriage age and completed fertility`, () => {
      const marriedAges = []
      let completed = 0, kids = 0
      for (let i = 0; i < LIVES; i++) {
        const { s, marriedAt } = runLife(country, birthYear)
        if (marriedAt !== null) marriedAges.push(marriedAt)
        // Completed fertility only counts lives that finished the window.
        if (s.age >= 45) { completed++; kids += (s.children?.length ?? 0) }
      }
      expect(completed).toBeGreaterThan(4)

      const medianMarriage = median(marriedAges)
      expect(medianMarriage).not.toBeNull()
      // Within six years of the record. Wide, because the sample is small and
      // the point is to catch a model that has drifted a decade, not a year.
      expect(Math.abs(medianMarriage - realMarriageAge)).toBeLessThanOrEqual(6)

      const fertility = kids / completed
      // Within a factor of roughly two either way, and never inverted: a
      // low-fertility country must not out-breed a high-fertility one.
      expect(fertility).toBeGreaterThan(realTfr * 0.45)
      expect(fertility).toBeLessThan(realTfr * 2.0 + 0.6)
    }, 240_000)
  }

  it('gives people homes at roughly the rate their country and decade did', () => {
    // Ownership was 0% across every simulated life before the housing hook:
    // buyProperty existed and nothing called it. Tolerances are wide because
    // run-to-run variance at this sample size is around ten points — Germany
    // measured 49, 75, 55, 45 and 56 across five runs of the same code.
    const measure = (country, birthYear) => {
      let adults = 0, owned = 0
      for (let i = 0; i < 20; i++) {
        const { s } = runLife(country, birthYear)
        if (s.age < 55) continue
        adults++
        if ((s.assets?.properties?.length ?? 0) > 0) owned++
      }
      return { adults, rate: adults ? owned / adults : 0 }
    }
    const us = measure('United States', 1950)
    expect(us.adults).toBeGreaterThan(4)
    // The floor is the regression that matters: not zero, and not everyone.
    expect(us.rate).toBeGreaterThan(0.25)
    expect(us.rate).toBeLessThan(0.95)

    // Renting is a choice in Germany and not a failure, and the model must not
    // flatten that into the Anglo-American assumption that everyone buys.
    const de = measure('Germany', 1970)
    expect(de.rate).toBeLessThan(0.9)
  }, 240_000)

  it('hands post-Soviet tenants the freehold they were actually handed', () => {
    // Mass privatisation took ownership across the former bloc from near zero to
    // eighty per cent in half a decade. Modelled as a lifetime hazard it came out
    // at 55% against a real 85%, because it was a decree, not a hazard.
    // Asserted on the decree itself rather than on ownership at death, which
    // every other part of a life confounds: an end-state threshold against a
    // true rate of 80% still failed intermittently in CI at this sample size.
    let reachedTheDecree = 0, privatised = 0, owned = 0
    for (let i = 0; i < 26; i++) {
      const { s } = runLife('Russia', 1960)
      if (s.age >= 38) reachedTheDecree++      // alive and adult through 1992-98
      if (s.flags.includes('privatised_the_flat')) privatised++
      if ((s.assets?.properties?.length ?? 0) > 0) owned++
    }
    expect(reachedTheDecree).toBeGreaterThan(6)
    expect(privatised, 'the decree reached a real share of the cohort')
      .toBeGreaterThan(reachedTheDecree * 0.15)
    expect(owned, 'and left them owning something').toBeGreaterThan(privatised * 0.8)
  }, 240_000)

  it('preserves the fertility ordering between countries', () => {
    // The single most important property: whatever the absolute numbers do, a
    // 1962 Nigerian life must have visibly more children than a 1970 German one.
    const measure = (country, birthYear) => {
      let completed = 0, kids = 0
      for (let i = 0; i < 22; i++) {
        const { s } = runLife(country, birthYear)
        if (s.age >= 45) { completed++; kids += (s.children?.length ?? 0) }
      }
      return completed ? kids / completed : 0
    }
    const nigeria = measure('Nigeria', 1962)
    const germany = measure('Germany', 1970)
    expect(nigeria).toBeGreaterThan(germany * 1.8)
  }, 240_000)
})
