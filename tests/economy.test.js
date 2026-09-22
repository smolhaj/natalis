import { describe, it, expect } from 'vitest'
import { wageIndex, inEraMoney, inTodayMoney, eraDrift } from '../src/data/economy.js'
import { COUNTRIES } from '../src/data/countries.js'

const by = (name) => COUNTRIES.find(c => c.name === name)

// What a listed salary is worth where it is paid. Kept in step with the copy
// in tick.js; if they diverge these numbers stop describing the game.
const GDP_SALARY_MULT = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.22, low_medium: 0.1, low: 0.055, very_low: 0.03 }
const wageFor = (name, year, listed) => {
  const c = by(name)
  return Math.round(listed * (GDP_SALARY_MULT[c.gdp] ?? 1) * wageIndex(c, year))
}

describe('the money is the money of the year', () => {
  it('covers every country in the roster', () => {
    for (const c of COUNTRIES) {
      const v = wageIndex(c, 1955)
      expect(Number.isFinite(v), `${c.name} has no wage index`).toBe(true)
      expect(v, `${c.name} 1955`).toBeGreaterThan(0)
    }
  })

  // Two reversals in the whole table are deliberate, and they are two of the
  // most important economic facts the corpus covers. Everything else rises.
  it('rises monotonically except where a country actually got poorer', () => {
    const collapses = new Set(['Nigeria', ...COUNTRIES.filter(c => c.archetype === 'post_soviet').map(c => c.name)])
    for (const c of COUNTRIES) {
      if (collapses.has(c.name)) continue
      for (const [a, b] of [[1930, 1950], [1950, 1970], [1970, 2000], [2000, 2025]]) {
        expect(wageIndex(c, b), `${c.name} ${a}→${b}`).toBeGreaterThanOrEqual(wageIndex(c, a))
      }
    }
  })

  it('takes a post-Soviet wage apart in the 1990s and rebuilds it', () => {
    const ru = by('Russia')
    expect(wageIndex(ru, 1995), '1995 against 1990').toBeLessThan(wageIndex(ru, 1990) * 0.5)
    expect(wageIndex(ru, 2010), '2010 against 1995').toBeGreaterThan(wageIndex(ru, 1995) * 4)
  })

  // The number that started this: a 1948 German taxi driver on $19,540/yr, in
  // a country four months into having a currency at all.
  it('pays a 1948 German wage in 1948 German money', () => {
    const then = wageFor('Germany', 1948, 19_540)
    expect(then, 'a 1948 taxi driver').toBeGreaterThan(80)
    expect(then, 'a 1948 taxi driver').toBeLessThan(1_200)
    expect(wageFor('Germany', 2020, 19_540), 'the same job in 2020').toBeGreaterThan(12_000)
  })

  // The single most useful thing two lives forty years apart can teach, and a
  // fact no table of present-day GDP tiers can express: in 1960 Ghana was
  // richer than South Korea, and by 2010 it was not remotely close.
  it('puts 1960 Ghana ahead of 1960 South Korea, and reverses it by 2010', () => {
    expect(wageFor('Ghana', 1960, 19_540)).toBeGreaterThan(wageFor('South Korea', 1960, 19_540))
    expect(wageFor('South Korea', 2010, 19_540)).toBeGreaterThan(wageFor('Ghana', 2010, 19_540) * 5)
  })

  // Nigeria is the one row that goes down. Oil at its peak and the naira at
  // 0.55 to the dollar paid a Lagos clerk more, in dollars, than 380 to the
  // dollar pays one now.
  it('pays a 1980 Nigerian more than a 2020 Nigerian', () => {
    expect(wageFor('Nigeria', 1980, 42_000)).toBeGreaterThan(wageFor('Nigeria', 2020, 42_000))
  })

  it('round-trips a nominal amount back into a stable unit', () => {
    // This is what keeps the ~76 corpus guards written as `G.money > 5000`
    // saying "comfortable" instead of "alive after 1990".
    for (const [name, year] of [['Germany', 1948], ['Nigeria', 1962], ['Japan', 1935], ['Brazil', 1995]]) {
      const c = by(name)
      const nominal = inEraMoney(5_000, c, year)
      expect(inTodayMoney(nominal, c, year), `${name} ${year}`).toBeGreaterThan(4_000)
      expect(inTodayMoney(nominal, c, year), `${name} ${year}`).toBeLessThan(6_500)
    }
  })

  it('never rounds a cost away into a gift', () => {
    // A fee of the smallest unit of whatever the currency was is still a fee.
    expect(inEraMoney(40, by('South Korea'), 1955)).toBeGreaterThan(0)
    expect(inEraMoney(-40, by('South Korea'), 1955)).toBeLessThan(0)
    expect(inEraMoney(0, by('Germany'), 1950)).toBe(0)
  })

  it('drifts a stock of value by roughly what the money did', () => {
    const de = by('Germany')
    // Fifty years of drift on a house bought in 1965, before any real return.
    let v = 1
    for (let y = 1966; y <= 2015; y++) v *= eraDrift(de, y)
    expect(v, 'Germany 1965→2015').toBeGreaterThan(10)
    expect(v, 'Germany 1965→2015').toBeLessThan(120)
  })
})
