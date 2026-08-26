// Simulation-level regression tests.
//
// These exist because every failure in the August 2026 audit was invisible to
// static checks: the flag auditor reported "2672 covered / 0 orphaned" while the
// contemplative layer took 70% of every life, a 14,808-line prose system fired in
// 2% of years, and a 1962 Nigerian life had a median death age of 8. Nothing
// asked what actually fires. This does.
//
// Thresholds are deliberately generous — they are guardrails against regression,
// not a snapshot of current numbers.
import { describe, it, expect } from 'vitest'
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} }
import { tick, resolveAutoEvent, resolveChoice } from '../src/engine/tick.js'
import { useGameStore } from '../src/store/gameStore.js'
import { COUNTRIES } from '../src/data/countries.js'
import { literacyChanceFor, urbanChanceFor, pickBirthCountry } from '../src/engine/character.js'

const CONFIGS = [
  ['United States', 1950], ['Nigeria', 1962], ['Japan', 1980],
  ['South Korea', 1988], ['India', 1975], ['Germany', 1970], ['Brazil', 1995],
]

function simulate(mode, n) {
  const agg = { years: 0, texture: 0, mundane: 0, contemplative: 0, choice: 0, anchored: 0, earned: 0, universal: 0, glimpse: 0, lives: 0, errors: [] }
  const byCountry = {}
  for (const [cname, by] of CONFIGS) {
    const country = COUNTRIES.find(c => c.name === cname)
    if (!country) continue
    byCountry[cname] = { deaths: [], adult: [], under5: 0 }
    for (let i = 0; i < n; i++) {
      useGameStore.getState().startCuratedGame({ country: country.name, birthYear: by })
      let s = { ...useGameStore.getState(), mode }
      agg.lives++
      for (let y = 0; y < 110 && !s.dead; y++) {
        const before = s.log.length
        try {
          s = tick(s)
          const ev = s.pendingEvent
          if (ev) {
            if (ev.contemplative) agg.contemplative++
            else if (ev.register) agg[ev.register] = (agg[ev.register] ?? 0) + 1
            if (ev.isGlimpse) agg.glimpse++
            if (ev.choices?.length) agg.choice++
            s = ev.isAutomatic ? resolveAutoEvent(s) : resolveChoice(s, Math.floor(Math.random() * ev.choices.length))
          }
        } catch (e) {
          agg.errors.push(`${cname}/${mode}@${s.age}: ${e.message}`)
          break
        }
        agg.years++
        for (const e of s.log.slice(before)) {
          if (e.isTexture) agg.texture++
          else if (e.isMundane) agg.mundane++
          if (e.isChoice) agg.choice++
        }
      }
      const rec = byCountry[cname]
      rec.deaths.push(s.age)
      if (s.age < 5) rec.under5++; else rec.adult.push(s.age)
    }
  }
  return { agg, byCountry }
}

const med = (a) => a.length ? [...a].sort((x, y) => x - y)[a.length >> 1] : null

describe('engine balance', () => {
  for (const mode of ['active', 'passive']) {
    it(`${mode}: registers stay balanced and lives reach a plausible age`, () => {
      const { agg, byCountry } = simulate(mode, 14)
      const pct = (k) => 100 * agg[k] / agg.years

      console.log(`\n[${mode}] ${agg.years} years / ${agg.lives} lives`)
      console.log(`  contemplative ${pct('contemplative').toFixed(1)}% | anchored ${pct('anchored').toFixed(1)}% | earned ${pct('earned').toFixed(1)}%`)
      console.log(`  yearTexture ${pct('texture').toFixed(1)}% | mundane ${pct('mundane').toFixed(1)}% | glimpses/life ${(agg.glimpse / agg.lives).toFixed(1)}`)
      for (const [c, r] of Object.entries(byCountry)) {
        console.log(`  ${c.padEnd(14)} median ${String(med(r.deaths)).padStart(3)} | survived-childhood ${String(med(r.adult)).padStart(3)} | under5 ${r.under5}/${r.deaths.length}`)
      }

      // No life may crash the engine.
      expect(agg.errors).toEqual([])

      // The contemplative layer must not swallow the game again. It reached 70%
      // before the register system existed.
      expect(pct('contemplative')).toBeLessThan(40)
      expect(pct('contemplative')).toBeGreaterThan(5)

      // Place-, era- and identity-specific events must keep a real share of the
      // feed — this is the education mandate, expressed as a number.
      expect(pct('anchored')).toBeGreaterThan(10)

      // buildYearTexture is a layer, not a fallback. It fired in ~2% of years
      // when it was only reachable on an empty pool.
      expect(pct('texture')).toBeGreaterThan(25)

      // Stranger glimpses: "roughly once per decade" (CLAUDE.md). They landed
      // 0.3 times per life when they competed in the open pool.
      expect(agg.glimpse / agg.lives).toBeGreaterThan(2)

      // Lives must reach late life. Measured on survivors of childhood so that
      // historically-correct infant mortality does not mask an adult-mortality bug.
      for (const [c, r] of Object.entries(byCountry)) {
        const m = med(r.adult)
        expect(m, `${c} median death age (survived childhood)`).toBeGreaterThan(45)
        expect(m, `${c} median death age (survived childhood)`).toBeLessThan(95)
      }
    }, 300000)
  }

  it('child mortality tracks the historical record', () => {
    const check = (cname, birthYear, lo, hi) => {
      const country = COUNTRIES.find(c => c.name === cname)
      let died = 0
      const n = 250
      for (let i = 0; i < n; i++) {
        useGameStore.getState().startCuratedGame({ country: country.name, birthYear })
        let s = { ...useGameStore.getState(), mode: 'passive' }
        for (let y = 0; y < 6 && !s.dead; y++) {
          s = tick(s)
          const ev = s.pendingEvent
          if (ev) s = ev.isAutomatic ? resolveAutoEvent(s) : resolveChoice(s, 0)
        }
        if (s.dead && s.age <= 5) died++
      }
      const rate = 100 * died / n
      console.log(`  ${cname} ${birthYear}: under-5 ${rate.toFixed(1)}% (expected ${lo}-${hi}%)`)
      expect(rate, `${cname} under-5 mortality`).toBeGreaterThan(lo)
      expect(rate, `${cname} under-5 mortality`).toBeLessThan(hi)
    }
    // Real under-5 mortality: West Germany 1970 ~2.6%, Nigeria 1962 ~30%.
    check('Germany', 1970, 0.2, 8)
    check('Nigeria', 1962, 15, 45)
  }, 300000)
})

describe('historical demography', () => {
  it('literacy follows the era, not a modern snapshot', () => {
    const C = (n) => COUNTRIES.find(c => c.name === n)
    // A woman born in 1950s India had roughly a 1-in-10 chance of literacy.
    // The modern-snapshot model gave her 39-54%.
    expect(literacyChanceFor(C('India'), 'female', 1950)).toBeLessThan(0.2)
    expect(literacyChanceFor(C('India'), 'female', 2000)).toBeGreaterThan(0.35)
    expect(literacyChanceFor(C('United States'), 'female', 1950)).toBeGreaterThan(0.9)
    expect(urbanChanceFor(C('India'), 1950)).toBeLessThan(0.25)
    // Every country carries a series.
    expect(COUNTRIES.filter(c => c.literacyHistory).length).toBe(COUNTRIES.length)
  })

  it('birth country is population-weighted but keeps small countries reachable', () => {
    const counts = {}
    for (let i = 0; i < 30000; i++) { const c = pickBirthCountry(); counts[c.name] = (counts[c.name] ?? 0) + 1 }
    // A random human life should look like a random human life.
    expect(counts['India']).toBeGreaterThan(counts['Tuvalu'] * 10)
    // ...without making the small-country writing unreachable.
    expect(Object.keys(counts).length).toBeGreaterThan(120)
  }, 60000)
})
