// The technology arrival table, and a running check that no prose line names a
// thing before it reached the place the character lives.
//
// The bug this exists to stop returning: every technology line in the mundane
// layer was gated on `isWealthyArch`, which is a statement about where a
// country sits NOW. Read as history it is wrong nearly everywhere, and
// spectacularly wrong in the Gulf and at the poor edges of Western Europe — a
// 1931 Omani childhood was getting a hallway telephone, a folded newspaper and
// a weekly trip to the cinema, and an Icelandic living room had a television
// twenty-two years before Iceland had broadcasting.
//
// None of it was visible to a static audit. Every guard was valid, every event
// reachable, every line correctly spelled. It only appears by running lives and
// reading what came out, which is what the last case here does.
import { describe, it, expect } from 'vitest'
import { COUNTRIES } from '../src/data/countries.js'
import { hasTech, techYear, wasWealthy, materialWealthYear, MATERIAL_WEALTH_FROM, TECH_KEYS, TECH_OVERRIDES } from '../src/data/technology.js'
import { checkLine, checkAge } from '../scripts/lib/anachronism.js'
import { runSimulation } from '../scripts/lib/sim.js'

const byName = (n) => COUNTRIES.find(c => c.name === n)

describe('when a thing arrived where the character lives', () => {
  it('does not give Oman the interwar bourgeois interior', () => {
    const oman = byName('Oman')
    expect(oman.archetype).toBe('wealthy_gulf')       // now
    expect(wasWealthy(oman, 1931)).toBe(false)        // then
    expect(wasWealthy(oman, 1955)).toBe(false)
    expect(wasWealthy(oman, 1990)).toBe(true)
    for (const t of ['cinema', 'newspaper', 'landline', 'television', 'automobile']) {
      expect(hasTech(oman, t, 1931), `Oman had no ${t} in 1931`).toBe(false)
    }
  })

  it('knows Iceland had no television until 1966', () => {
    const is = byName('Iceland')
    expect(hasTech(is, 'television', 1944)).toBe(false)
    expect(hasTech(is, 'television', 1965)).toBe(false)
    expect(hasTech(is, 'television', 1970)).toBe(true)
  })

  it('knows South Africa banned it until 1976 and Bhutan until 1999', () => {
    expect(techYear(byName('South Africa'), 'television')).toBe(1976)
    expect(techYear(byName('Bhutan'), 'television')).toBe(1999)
    expect(hasTech(byName('Bhutan'), 'television', 1990)).toBe(false)
  })

  it('knows the places that never got a household landline and went straight to the mobile', () => {
    for (const n of ['Nigeria', 'Kenya', 'Tanzania', 'Ethiopia', 'DR Congo']) {
      expect(hasTech(byName(n), 'landline', 2020), `${n} landline`).toBe(false)
      expect(hasTech(byName(n), 'mobile_phone', 2010), `${n} mobile`).toBe(true)
    }
  })

  it('does not call the poor edges of Western Europe rich before they were', () => {
    // Ireland's GDP per capita was below Ghana's on some measures in 1960.
    expect(wasWealthy(byName('Ireland'), 1975)).toBe(false)
    expect(wasWealthy(byName('Portugal'), 1975)).toBe(false)
    expect(wasWealthy(byName('Greece'), 1970)).toBe(false)
    expect(wasWealthy(byName('South Korea'), 1970)).toBe(false)
    expect(wasWealthy(byName('Ireland'), 2005)).toBe(true)
  })

  it('names only countries that exist in its overrides', () => {
    const names = new Set(COUNTRIES.map(c => c.name))
    for (const [tech, table] of Object.entries(TECH_OVERRIDES)) {
      expect(TECH_KEYS, `${tech} is not a known technology`).toContain(tech)
      for (const n of Object.keys(table)) {
        expect(names.has(n), `TECH_OVERRIDES.${tech} names "${n}", which is not a country`).toBe(true)
      }
    }
    for (const n of Object.keys(MATERIAL_WEALTH_FROM)) {
      expect(names.has(n), `MATERIAL_WEALTH_FROM names "${n}", which is not a country`).toBe(true)
    }
  })

  it('gives every country an answer for every technology', () => {
    for (const c of COUNTRIES) {
      for (const t of TECH_KEYS) {
        expect(Number.isFinite(techYear(c, t)), `${c.name}/${t}`).toBe(true)
      }
      expect(Number.isFinite(materialWealthYear(c)), c.name).toBe(true)
    }
  })
})

describe('the line checker itself', () => {
  it('catches a television in Iceland in 1944', () => {
    expect(checkLine('The television has arrived in the living room.', 1944, byName('Iceland'))).toBeTruthy()
    expect(checkLine('The television has arrived in the living room.', 1975, byName('Iceland'))).toBeNull()
  })

  it('does not fire on a line that says the thing is absent', () => {
    expect(checkLine('There is no telephone in the village and will not be for thirty years.', 1950, byName('Nigeria'))).toBeNull()
  })

  it('catches an office email reaching a six-year-old', () => {
    expect(checkAge('The email inbox has tripled in a year.', 6)).toBeTruthy()
    expect(checkAge('The email inbox has tripled in a year.', 40)).toBeNull()
  })
})

describe('across whole lives', () => {
  it('prints no line naming a technology before it arrived', async () => {
    // The eras chosen are the ones where present-day category is least like the
    // past: the Gulf before oil, Iceland before broadcasting, Korea before the
    // miracle, Ireland before convergence.
    const r = await runSimulation({
      lives: 3,
      configs: [['Oman', 1931], ['Iceland', 1935], ['South Korea', 1945], ['Ireland', 1945],
                ['Nigeria', 1940], ['Bhutan', 1960], ['North Korea', 1955], ['Portugal', 1950]],
      mode: 'passive',
      collectLines: true,
    })
    expect(r.fatal).toBeNull()
    expect(r.totals.errors).toEqual([])

    const hits = []
    for (const [text, meta] of (r.linesWithContext ?? new Map())) {
      const hit = checkLine(text, meta.year, meta.country)
      if (hit) hits.push(`${meta.country?.name} ${meta.year}: ${text.slice(0, 110)}`)
    }
    expect(hits).toEqual([])
  }, 300_000)
})
