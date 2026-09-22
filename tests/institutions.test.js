// Years in which the ordinary institutional life of a country stopped.
//
// The corpus carries a Khmer Rouge arc. Alongside it, a Cambodian character in
// 1977 was drawing a salary, going to school, being referred to a psychiatrist
// and worrying about which families held the municipal contracts — four years
// into a regime that had abolished money, markets, wages, schools, hospitals,
// religion, the post and the cities themselves in the first weeks of 1975.
//
// Every guard involved asked what country and what year, and every one got a
// true answer to the wrong question. Nothing in the engine knew that a country
// can stop having the things a sentence assumes.
//
// Also pinned here: the malaria, river, colonial-school and union guards, all
// of which had the same shape — an archetype standing in for a fact about a
// particular place.
import { describe, it, expect } from 'vitest'
import {
  institutionExists, suspendedInstitutions, proseFitsInstitutions, institutionsAssumed,
  malariaEndemic, hasRivers, colonialSchoolLanguage, INSTITUTIONS_SUSPENDED,
} from '../src/data/history.js'
import { COUNTRIES } from '../src/data/countries.js'
import { EVENTS } from '../src/data/events.js'
import { runSimulation } from '../scripts/lib/sim.js'

const byId = (id) => EVENTS.find(e => e.id === id)
const src = (fn) => (typeof fn === 'function' ? fn.toString() : '')

describe('Democratic Kampuchea', () => {
  it('has no school, no wages, no money, no clinic, no post and no city', () => {
    for (const what of ['school', 'wages', 'money', 'clinic', 'post', 'city']) {
      expect(institutionExists('Cambodia', 1977, what), what).toBe(false)
    }
  })

  it('has all of them again in 1982', () => {
    for (const what of ['school', 'wages', 'money', 'clinic']) {
      expect(institutionExists('Cambodia', 1982, what), what).toBe(true)
    }
  })

  it('leaves every other country alone', () => {
    expect(suspendedInstitutions('Nigeria', 1977).size).toBe(0)
    expect(suspendedInstitutions('Cambodia', 1960).size).toBe(0)
    expect(proseFitsInstitutions('Your salary arrives on the last Friday.', 'France', 1977)).toBe(true)
  })

  it('rejects a line that assumes what is not there', () => {
    expect(proseFitsInstitutions('The prices have risen and the wages have not caught up.', 'Cambodia', 1977)).toBe(false)
    expect(proseFitsInstitutions('You are at the school gate before the others.', 'Cambodia', 1977)).toBe(false)
    // "when rent is owed" slipped through a narrower version of the probe.
    expect(proseFitsInstitutions('It arrives in cash, the same evening, which matters when rent is owed.', 'Cambodia', 1977)).toBe(false)
    // And says nothing about a line that assumes nothing.
    expect(institutionsAssumed('The rain comes at the same hour every afternoon.')).toEqual([])
  })

  it('names only real countries and coherent windows', () => {
    const names = new Set(COUNTRIES.map(c => c.name))
    for (const w of INSTITUTIONS_SUSPENDED) {
      expect(names.has(w.country), `"${w.country}" is not a country`).toBe(true)
      expect(w.to).toBeGreaterThanOrEqual(w.from)
      expect(w.what.length).toBeGreaterThan(0)
    }
  })

  it('prints nothing assuming a suspended institution, across whole lives', async () => {
    const r = await runSimulation({
      lives: 4,
      configs: [['Cambodia', 1955], ['Cambodia', 1960], ['Cambodia', 1965], ['Cambodia', 1971]],
      mode: 'passive',
      collectLines: true,
    })
    expect(r.fatal).toBeNull()
    expect(r.totals.errors).toEqual([])
    const bad = []
    for (const [text, meta] of (r.linesWithContext ?? new Map())) {
      if (meta.year < 1975 || meta.year > 1979) continue
      if (!proseFitsInstitutions(text, meta.country?.name, meta.year)) {
        bad.push(`${meta.year}: ${text.slice(0, 110)}`)
      }
    }
    expect(bad).toEqual([])
  }, 300_000)
})

describe('the other guards that read an archetype instead of a place', () => {
  it('does not give a malarial childhood to Cuban or North Korean children', () => {
    // Cuba was certified malaria-free in 1973 and had ended transmission years
    // before; the DPRK's vivax was absent from the 1970s to a 1998 return.
    expect(malariaEndemic('Cuba', 1985)).toBe(false)
    expect(malariaEndemic('North Korea', 1984)).toBe(false)
    expect(malariaEndemic('Nigeria', 1984)).toBe(true)
    expect(malariaEndemic('Sri Lanka', 1990)).toBe(true)   // eliminated 2016
    expect(malariaEndemic('Sri Lanka', 2020)).toBe(false)
    expect(src(byId('ss_malaria_childhood')?.when)).toMatch(/malariaEndemic/)
  })

  it('does not put a polluted river in a coral atoll', () => {
    for (const n of ['Kiribati', 'Tuvalu', 'Marshall Islands', 'Maldives', 'Bahrain', 'Qatar']) {
      expect(hasRivers(n), n).toBe(false)
    }
    expect(hasRivers('Nigeria')).toBe(true)
  })

  it('teaches the colonial-language classroom only where it happened', () => {
    // Bhutan and Nepal were never colonised; Guatemala and Nicaragua were, in
    // the 1520s, and Spanish is the national language, which is a different
    // event; Tajikistan's second language arrived with the Soviet Union.
    for (const n of ['Bhutan', 'Nepal', 'Guatemala', 'Nicaragua', 'Tajikistan', 'Ethiopia', 'Thailand', 'Japan']) {
      expect(colonialSchoolLanguage(n, 1965), n).toBeNull()
    }
    expect(colonialSchoolLanguage('Senegal', 1955)).toBe('French')
    expect(colonialSchoolLanguage('Nigeria', 1955)).toBe('English')
    expect(colonialSchoolLanguage('Angola', 1970)).toBe('Portuguese')
    expect(colonialSchoolLanguage('Indonesia', 1935)).toBe('Dutch')
    // The medium outlived the flag, but not forever.
    expect(colonialSchoolLanguage('Nigeria', 2010)).toBeNull()
  })

  it('does not send a union representative onto a smallholding', () => {
    // "He finds you during the break… he tells you what the union got in the
    // last negotiation" reached Rwandan subsistence farmers.
    const g = src(byId('lab_union_card')?.when)
    expect(g).toMatch(/ruralUrban !== 'rural'/)
    expect(g).toMatch(/informal|subsistence/)
  })

  it('does not tell a child their exact age is nine when it is not', () => {
    // 65 of 76 firings were at some other age.
    const e = byId('cult_rural_no_electricity')
    expect(typeof e.text).toBe('function')
    expect(src(e.when)).toMatch(/G\.age >= \d/)
  })
})

describe('a hole in the corpus is not a total failure', () => {
  it('skips undefined entries rather than throwing at module load', () => {
    // One trailing comma too many in any of 460+ modules puts an `undefined`
    // in EVENTS. Reading `.id` off it used to throw during module evaluation,
    // taking the entire game down with a stack trace pointing at events.js
    // rather than at the typo.
    expect(EVENTS.every(e => e !== undefined && e !== null)).toBe(true)
    const withHole = [...EVENTS.slice(0, 5), undefined, ...EVENTS.slice(5, 10)]
    expect(() => {
      const index = {}
      for (const e of withHole) {
        if (!e) continue
        ;(index[e.phase] ??= []).push(e)
      }
    }).not.toThrow()
  })
})
