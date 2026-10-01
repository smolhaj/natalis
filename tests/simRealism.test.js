// Simulation realism: the rates the engine draws from, held against the record.
//
// A review measured ~1,500 lives and found the engine's death, health and
// family tables were statements about NOW applied to every year: a Syrian
// cohort lost a fifth of itself to a war that killed about three per cent of
// Syria; nobody's child ever died; parents could not die before sixty; a
// Korean born in 1955 was born into Japan's infant mortality; an American of
// 1950 had a 5% chance of ever divorcing. These assert the CONTRACT at the
// sample size actually taken: the war, mortality and capacity tables are
// checked analytically (exact, no noise), and the engine is checked only for
// what a small sample can see reliably — that the things now happen at all,
// and that the state agrees with what was printed.
import { describe, it, expect } from 'vitest'
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} }
import { COUNTRIES } from '../src/data/countries.js'
import {
  warDeathHazard, healthcareAt, under5At, adultHazard, lifeExpectancyAt, divorceAvailable,
} from '../src/data/history.js'
import { tertiaryChance, divorceHazard } from '../src/engine/lifeCourse.js'
import { tick, resolveAutoEvent, resolveChoice, rebuildTickEvent } from '../src/engine/tick.js'
import { useGameStore } from '../src/store/gameStore.js'

const C = (name) => COUNTRIES.find(c => c.name === name)

// The share of a population killed by a war over its span, from the engine's
// own hazard, for a population with a young age structure (a developing
// country's pyramid: about 45% under 18), split by sex and by the country's own
// ethnic shares — the same draw the engine makes for its characters.
function pooledWarToll(country, from, to, { urbanShare = 0.3 } = {}) {
  const groups = country.ethnicGroups?.length ? country.ethnicGroups : [{ id: null, share: 1 }]
  const totalShare = groups.reduce((n, g) => n + g.share, 0)
  let dead = 0, pop = 0
  for (let age0 = 0; age0 < 80; age0++) {
    const w = Math.exp(-age0 / 28) // pyramid
    for (const gender of ['male', 'female']) {
      for (const g of groups) {
        for (const urban of [true, false]) {
          const weight = w * (g.share / totalShare) * (urban ? urbanShare : 1 - urbanShare)
          let alive = 1
          for (let y = from; y <= to; y++) {
            const { p } = warDeathHazard({ country, year: y, age: age0 + (y - from), gender, ethnicity: g.id, urban })
            alive *= 1 - p
          }
          dead += weight * (1 - alive)
          pop += weight
        }
      }
    }
  }
  return dead / pop
}

describe('war mortality is within 2x of the recorded toll', () => {
  // [country, from, to, recorded deaths / population, urban share at the time]
  const RECORD = [
    ['Syria', 2011, 2019, 0.027, 0.55],                    // ~500-600k of ~21m
    ['Bosnia and Herzegovina', 1992, 1995, 0.023, 0.39],  // ~100k of 4.4m
    ['Cambodia', 1975, 1979, 0.25, 0.15],                 // 1.7-2.2m of ~7.8m
    ['Afghanistan', 1979, 1989, 0.08, 0.15],              // ~1-1.5m of ~13-15m
  ]
  for (const [name, from, to, real, urbanShare] of RECORD) {
    it(`${name} ${from}-${to}: about ${Math.round(real * 1000) / 10}% of the population`, () => {
      const toll = pooledWarToll(C(name), from, to, { urbanShare })
      expect(toll, `${name} modelled toll ${(toll * 100).toFixed(1)}%`).toBeGreaterThan(real / 2)
      expect(toll, `${name} modelled toll ${(toll * 100).toFixed(1)}%`).toBeLessThan(real * 2)
    })
  }

  it('the old rate is gone: a Syrian cohort does not lose a fifth of itself', () => {
    // cr 0.4 × 0.04 × 1.5 a year for nine years was ~20% of under-35s.
    expect(pooledWarToll(C('Syria'), 2011, 2019, { urbanShare: 0.55 })).toBeLessThan(0.06)
  })

  it('where a war was aimed at a people, the people carry it', () => {
    const rw = C('Rwanda')
    const tutsi = warDeathHazard({ country: rw, year: 1994, age: 30, gender: 'female', ethnicity: 'tutsi' }).p
    const hutu = warDeathHazard({ country: rw, year: 1994, age: 30, gender: 'female', ethnicity: 'hutu' }).p
    expect(tutsi).toBeGreaterThan(0.5)
    expect(hutu).toBeLessThan(0.1)
    const ba = C('Bosnia and Herzegovina')
    const bosniak = warDeathHazard({ country: ba, year: 1993, age: 30, gender: 'female', ethnicity: 'bosniak' }).p
    const croat = warDeathHazard({ country: ba, year: 1993, age: 30, gender: 'female', ethnicity: 'bosnian_croat' }).p
    expect(bosniak).toBeGreaterThan(croat * 2)
  })

  it('peace is peace', () => {
    expect(warDeathHazard({ country: C('Syria'), year: 1995, age: 20, gender: 'male' }).p).toBe(0)
    expect(warDeathHazard({ country: C('Sweden'), year: 1970, age: 20, gender: 'male' }).p).toBe(0)
  })
})

describe('health systems and child mortality follow the year, not the present', () => {
  it('Korea in 1955 was not Korea now', () => {
    const kr = C('South Korea')
    expect(['poor', 'very_poor']).toContain(healthcareAt(kr, 1955))
    expect(healthcareAt(kr, 2010)).toBe('excellent')
    const u5 = under5At(kr, 1955)
    expect(u5).toBeGreaterThan(0.09)
    expect(u5).toBeLessThan(0.22)
  })

  it('Syria before the war was not Syria in it', () => {
    const sy = C('Syria')
    expect(['fair', 'good']).toContain(healthcareAt(sy, 1995))
    expect(['poor', 'very_poor']).toContain(healthcareAt(sy, 2015))
  })

  it('the post-Soviet collapse takes a tier off', () => {
    const ru = C('Russia')
    const rank = t => ['very_poor', 'poor', 'fair', 'good', 'excellent'].indexOf(t)
    expect(rank(healthcareAt(ru, 1995))).toBeLessThan(rank(healthcareAt(ru, 1987)))
    expect(lifeExpectancyAt(ru, 1994)).toBeLessThan(lifeExpectancyAt(ru, 1988))
  })

  it('under-five mortality is ordered and in the recorded range', () => {
    const ng = under5At(C('Nigeria'), 1962)
    expect(ng).toBeGreaterThan(0.2)
    expect(ng).toBeLessThan(0.36)
    expect(under5At(C('United States'), 1950)).toBeLessThan(0.06)
    expect(under5At(C('Sweden'), 2000)).toBeLessThan(0.01)
  })
})

describe('the people around the character die where and when they live', () => {
  // A child born to Nigerian parents in 1962: mother 24, father 31. The share
  // who lose at least one parent before fifteen, from the hazard alone.
  function parentLossBy15(country, birthYear, motherAge, fatherAge) {
    let m = 1, f = 1
    for (let t = 1; t <= 15; t++) {
      const y = birthYear + t
      m *= 1 - (1 - (1 - adultHazard(motherAge + t, country, y)) * (1 - warDeathHazard({ country, year: y, age: motherAge + t, gender: 'female' }).p))
      f *= 1 - (1 - (1 - adultHazard(fatherAge + t, country, y)) * (1 - warDeathHazard({ country, year: y, age: fatherAge + t, gender: 'male' }).p))
    }
    return 1 - m * f
  }

  it('a Nigerian child of 1962 can lose a parent, and a Swedish child of 1990 rarely does', () => {
    const ng = parentLossBy15(C('Nigeria'), 1962, 24, 31)
    // The old table gave zero: no parent hazard below sixty, anywhere.
    expect(ng).toBeGreaterThan(0.08)
    expect(ng).toBeLessThan(0.4)
    // Rich-world orphanhood by fifteen is a few per cent (US ~5%).
    const se = parentLossBy15(C('Sweden'), 1990, 29, 31)
    expect(se).toBeLessThan(0.08)
    expect(ng).toBeGreaterThan(se * 2)
  })

  it('adult hazard rises with age and falls with life expectancy', () => {
    const ng = C('Nigeria'), se = C('Sweden')
    expect(adultHazard(40, ng, 1970)).toBeGreaterThan(adultHazard(40, se, 1990) * 2)
    expect(adultHazard(80, se, 2000)).toBeGreaterThan(adultHazard(50, se, 2000) * 5)
  })
})

describe('divorce follows the law and the decade', () => {
  const married = (country, year, extra = {}) => ({
    age: 40, currentYear: year, currentCountry: C(country), character: { country: C(country), gender: 'female' },
    religion: extra.religion ?? 'secular', partner: { married: true, alive: true, years: 8, relationshipQuality: 55 },
  })
  it('there was no divorce where the law did not allow it', () => {
    expect(divorceAvailable('Ireland', 1990)).toBe(false)
    expect(divorceAvailable('Ireland', 1997)).toBe(true)
    expect(divorceAvailable('Philippines', 2020)).toBe(false)
    expect(divorceHazard(married('Ireland', 1990))).toBe(0)
    expect(divorceHazard(married('Italy', 1965))).toBe(0)
  })
  it('an American marriage of the 1970s carries a real hazard', () => {
    const us = divorceHazard(married('United States', 1978))
    // Over thirty-odd years at this rate, roughly the recorded 40% ever divorce.
    expect(us).toBeGreaterThan(0.012)
    expect(us).toBeLessThan(0.05)
    expect(divorceHazard(married('India', 1990, { religion: 'hindu' }))).toBeLessThan(us / 10)
  })
})

describe('university capacity', () => {
  const at = (country, year, gender) => tertiaryChance({ currentYear: year, currentCountry: C(country), character: { country: C(country), gender } })
  it('follows the country and the decade', () => {
    const us = (at('United States', 1968, 'male') + at('United States', 1968, 'female')) / 2
    expect(us).toBeGreaterThan(0.18)
    expect(us).toBeLessThan(0.35)
    const se = (at('Sweden', 1958, 'male') + at('Sweden', 1958, 'female')) / 2
    expect(se).toBeGreaterThan(0.05)
    expect(se).toBeLessThan(0.15)
    expect(at('Afghanistan', 1958, 'male')).toBeLessThan(0.01)
    expect(at('United States', 1950, 'female')).toBeLessThan(at('United States', 1950, 'male'))
  })
})

// ─── Through the engine ──────────────────────────────────────────────────────

function runLife(country, birthYear, years = 110) {
  useGameStore.getState().startCuratedGame({ country, birthYear })
  let s = { ...useGameStore.getState(), mode: 'passive' }
  for (let y = 0; y < years && !s.dead; y++) {
    s = tick(s)
    for (let k = 0; k < 4 && s.pendingEvent; k++) {
      const ev = s.pendingEvent
      s = ev.isAutomatic || !ev.choices?.length ? resolveAutoEvent(s) : resolveChoice(s, 0)
    }
    if (s.pendingEvent) s = { ...s, pendingEvent: null }
    if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
    if (s.pendingTrial) s = { ...s, pendingTrial: null }
  }
  return s
}

describe('the engine', () => {
  it('a Nigerian family of the 1980s loses children, and the state says so', () => {
    let born = 0, dead = 0
    for (let i = 0; i < 14; i++) {
      const s = runLife('Nigeria', 1962, 70)
      born += s.children.length
      const gone = s.children.filter(c => c.alive === false)
      dead += gone.length
      // A dead child is a fact on the record, and the record agrees.
      if (gone.length) expect(s.flags).toContain('lost_child')
      for (const c of gone) expect(c.deathYear).toBeGreaterThan(1962)
    }
    // Real: roughly one child in four did not reach five. Zero was the bug.
    expect(born).toBeGreaterThan(20)
    expect(dead / born).toBeGreaterThan(0.05)
    expect(dead / born).toBeLessThan(0.5)
  }, 120000)

  it('nobody marries twice without the first marriage ending', () => {
    for (let i = 0; i < 10; i++) {
      const s = runLife('Russia', 1940)
      const weddings = s.log.filter(e => /^You marry /.test(e.text)).length
      const ended = (s.exPartners ?? []).filter(x => x.married).length + (s.flags.includes('widowed') ? 1 : 0) +
        s.log.filter(e => e.isDeath && s.partner?.name && e.text.startsWith(s.partner.name)).length
      expect(weddings, s.log.filter(e => /^You marry /.test(e.text)).map(e => e.text).join(' | ')).toBeLessThanOrEqual(1 + ended)
    }
  }, 120000)

  it('a queued phase entry and a runtime diagnosis survive a reload', () => {
    useGameStore.getState().startCuratedGame({ country: 'United States', birthYear: 1950 })
    const s = { ...useGameStore.getState(), age: 30, currentYear: 1980 }
    expect(rebuildTickEvent('phase_entry_midlife', s)?.id).toBe('phase_entry_midlife')
    const ill = rebuildTickEvent('illness_cancer_30', s)
    expect(ill?.id).toBe('illness_cancer_30')
    expect(ill?.choices?.length).toBeGreaterThan(0)
    expect(rebuildTickEvent('prison_parole_release_31', { ...s, flags: [] })?.choices?.length).toBe(2)
  })
})
