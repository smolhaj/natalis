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
      // 40 rather than 22. Several assertions here are on EXTREMES — the oldest
      // life in a cohort, a per-country median over however many survived
      // childhood — and an extreme of a small sample is mostly a statement
      // about the sample. This failed once at "Nigeria oldest life: expected 61
      // to be greater than 64", where the bound is correct and 22 draws from a
      // cohort with 30% under-five mortality simply did not reach it.
      const { agg, byCountry } = simulate(mode, 40)
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

      // Lives must reach late life. Measured on survivors of childhood, so that
      // historically-correct infant mortality does not mask an adult-mortality bug.
      //
      // The POOLED median carries the real assertion: per-country samples are
      // small and some cohorts genuinely die young (Nigeria 1962, Soviet men),
      // so a tight per-country floor flakes without catching anything a pooled
      // one misses. Per country we only check the range is not absurd — which
      // the original failure (median 8, nobody past 33) violated by a mile.
      const pooled = Object.values(byCountry).flatMap(r => r.adult)
      expect(med(pooled), 'pooled median death age (survived childhood)').toBeGreaterThan(55)
      expect(med(pooled), 'pooled median death age (survived childhood)').toBeLessThan(90)
      for (const [c, r] of Object.entries(byCountry)) {
        const m = med(r.adult)
        // Floor set well below the true medians. Measured at n=120, Nigeria
        // 1962 — the harshest cohort — gives a survivor median of 53-55 with a
        // p25 of ~26, i.e. a genuinely wide distribution with a heavy young-adult
        // tail (malaria, typhoid, TB, untreated illness). That spread is correct
        // for the cohort, so a per-country sample median needs real headroom.
        expect(m, `${c} median death age (survived childhood)`).toBeGreaterThan(32)
        expect(m, `${c} median death age (survived childhood)`).toBeLessThan(97)
        expect(Math.max(...r.deaths), `${c} oldest life`).toBeGreaterThan(64)
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

describe('persona coverage', () => {
  // The vision sentence in CLAUDE.md: a player born in 1962 in Nigeria should
  // come away understanding what that life was actually like. Before the
  // register system, geographic events fired ~7 times per HUNDRED lives, and a
  // US character born in 2005 could reach exactly one US-specific event in an
  // entire life. This asserts that a life receives its own history.
  const PERSONAS = [
    ['Nigeria', 1962, 'female'],
    ['South Korea', 1988, 'female'],
    ['India', 1975, 'male'],
    ['United States', 2005, 'female'],
    ['Russia', 1950, 'male'],
    ['Ireland', 1940, 'male'],
  ]

  for (const [country, birthYear, gender] of PERSONAS) {
    it(`${country} ${birthYear} receives its own history`, () => {
      const anchoredIds = new Set()
      const ages = []
      let anchored = 0, world = 0, lives = 0, reachedLateLife = 0
      for (let i = 0; i < 20; i++) {
        // A persona that cannot be created at all is a failure: Ireland 1940 was
        // impossible before, because the country's birth floor started at 1950.
        useGameStore.getState().startCuratedGame({ country, birthYear, gender })
        let s = { ...useGameStore.getState(), mode: 'passive' }
        lives++
        const start = s.log.length
        for (let y = 0; y < 105 && !s.dead; y++) {
          s = tick(s)
          const ev = s.pendingEvent
          if (ev) {
            if (ev.register === 'anchored') { anchored++; anchoredIds.add(ev.id) }
            s = ev.isAutomatic ? resolveAutoEvent(s) : resolveChoice(s, 0)
          }
        }
        world += s.log.slice(start).filter(l => l.isWorld).length
        ages.push(s.age)
        if (s.age >= 50) reachedLateLife++
      }
      console.log(`  ${country} ${birthYear}: anchored/life ${(anchored / lives).toFixed(1)}, world/life ${(world / lives).toFixed(1)}, distinct ${anchoredIds.size}, reached 50+ ${reachedLateLife}/${lives}, oldest ${Math.max(...ages)}`)
      expect(anchored / lives, 'place/era-anchored events per life').toBeGreaterThan(3)
      expect(world / lives, 'world events per life').toBeGreaterThan(3)
      expect(anchoredIds.size, 'distinct anchored events across the cohort').toBeGreaterThan(15)
      // A meaningful share of lives must reach late life, or the 1,370 late-life
      // events and the second half of the educational arc are unreachable. The
      // bound is deliberately loose: high-mortality cohorts SHOULD lose many
      // lives young (Nigeria 1962 had ~30% under-5 mortality in reality, and
      // Soviet male life expectancy was genuinely poor), so this is a guard
      // against the original failure — where a 1962 Nigerian life had a median
      // death age of 8 and no survivor past 33 — not a demand for longevity.
      // The median of childhood SURVIVORS is the robust statistic here: a tail
      // share over 16 lives swings by a whole life at a time, and cohorts with
      // historically-correct child mortality (Nigeria 1962 runs ~30% under-5,
      // which is right) legitimately lose many lives young. The bound still
      // fails loudly on the original defect, where this cohort's median death
      // age was 8 and no life passed 33.
      const survivors = ages.filter(a => a >= 5).sort((a, b) => a - b)
      expect(survivors.length, 'lives surviving childhood').toBeGreaterThan(lives * 0.4)
      // Same floor and same reasoning as the balance test above: measured at
      // n=120, the harshest cohort's survivor median is 53-55 with a p25 of ~26,
      // so a 20-life sample median needs headroom. The original defect — median
      // death age 8, nothing past 33 — fails this by a wide margin.
      expect(survivors[survivors.length >> 1], 'median age of childhood survivors').toBeGreaterThan(32)
      expect(Math.max(...ages), 'oldest life in the cohort').toBeGreaterThan(64)
    }, 300000)
  }
})
