// Guardrails for the class of defect a beta pass over ~3,800 simulated lives
// found: events that fire for the wrong population, or assert a historical
// moment without checking whether it happened to that country in that year.
//
// None of these were visible to a static audit, because every guard was
// syntactically valid and every event was reachable. They were only visible by
// running lives and reading what came out.
import { describe, it, expect } from 'vitest'
import { EVENTS } from '../src/data/events.js'
import { WORLD_EVENTS } from '../src/data/worldEvents.js'
import { COUNTRIES } from '../src/data/countries.js'
import { INDEPENDENCE_YEAR, COUP_YEARS, SOVIET_REPUBLICS, wasSovietRepublic } from '../src/data/history.js'
import { runSimulation } from '../scripts/lib/sim.js'

const src = (fn) => (typeof fn === 'function' ? fn.toString() : '')
const byId = (id) => EVENTS.find(e => e.id === id) ?? WORLD_EVENTS.find(e => e.id === id)

describe('the dates the engine was guessing', () => {
  it('knows the fifteen Soviet republics, Moldova included', () => {
    expect(SOVIET_REPUBLICS).toHaveLength(15)
    expect(wasSovietRepublic('Moldova')).toBe(true)
    // The list in worldEvents.js held fourteen — Moldova was missing — so the
    // country whose entire 1990s IS the Soviet collapse got neither the
    // collapse event nor the hyperinflation one.
    expect(wasSovietRepublic('Croatia')).toBe(false)
    expect(wasSovietRepublic('Poland')).toBe(false)
    expect(wasSovietRepublic('Mongolia')).toBe(false)
  })

  it('does not claim an independence year for countries that were never colonised', () => {
    for (const n of ['Ethiopia', 'Thailand', 'Iran', 'Nepal', 'Bhutan', 'China', 'Japan', 'Oman']) {
      expect(INDEPENDENCE_YEAR[n], `${n} should have no independence year`).toBeUndefined()
    }
  })

  it('records no coup for the sub-Saharan states that never had one', () => {
    // The event asserted one in all of these. Kenya's 1982 attempt failed
    // inside a day; Cameroon's 1984 attempt failed; Nyerere and Kaunda both
    // left office by their own choice or an election.
    for (const n of ['Kenya', 'Tanzania', 'Zambia', 'Senegal', 'Cameroon', 'Namibia']) {
      expect(COUP_YEARS[n], `${n} should be recorded with no coups`).toEqual([])
    }
  })

  it('gates the independence and coup events on the real year', () => {
    for (const id of ['hist_independence_day', 'dc_independence_morning']) {
      expect(src(byId(id)?.when), `${id} must consult INDEPENDENCE_YEAR`).toMatch(/isIndependenceYear/)
    }
    expect(src(byId('dc_first_coup')?.when)).toMatch(/isCoupYear/)
  })

  it('gives the decolonisation events an age a child could remember', () => {
    // Five of thirteen firings were at age 1, rendering "You are 1 years old
    // and you will remember exactly where you were standing".
    for (const id of ['dc_independence_morning', 'dc_first_coup']) {
      expect(src(byId(id)?.when), `${id} needs an age floor`).toMatch(/G\.age >= \d/)
    }
  })
})

describe('events that narrate a position the character is not in', () => {
  it('does not narrate the Rwandan genocide to Hutu characters as its victims', () => {
    // `rwandan_genocide_acute` is the victim's position — "the radio names the
    // group you belong to as the enemy… you hide, you run" — and set
    // `tutsi_hidden`. Rwanda is 85% Hutu and every observed firing went to a
    // Hutu character.
    const acute = byId('rwandan_genocide_acute')
    expect(src(acute?.when)).toMatch(/tutsi/)
    const hutu = byId('rwandan_genocide_hutu')
    expect(hutu, 'the 85% need their own account of 1994').toBeTruthy()
    expect(src(hutu?.when)).toMatch(/hutu/)
  })

  it('does not run the gacaca courts before they existed', () => {
    // The event's own context dates them 2001–2012; its window began in 1996.
    expect(byId('rwandan_genocide_aftermath')?.years[0]).toBeGreaterThanOrEqual(2001)
  })

  it('keeps pregnancy and its aftermath to characters who can be pregnant', () => {
    // 540 male pregnancies and 8 male deaths from "Complications in childbirth"
    // per 500 lives; `ya_postpartum_depression` was 21 of 41 firings male.
    for (const id of ['ya_unplanned_pregnancy', 'ya_postpartum_depression', 'mid_pregnancy_late']) {
      expect(src(byId(id)?.when), `${id} narrates the character's own body`).toMatch(/gender === 'female'/)
    }
    // "The farm was your husband's name in the official records" — 27 of 64
    // firings went to men.
    expect(src(byId('sl_widow_farming_community')?.when)).toMatch(/gender === 'female'/)
  })

  it('does not tell a Croat or a Czech they were born in the Soviet Union', () => {
    // Every `ps_*` event guarded on `archetype === 'post_soviet'`, which holds
    // eleven countries that were never in the USSR. Yugoslavia broke with
    // Stalin in 1948; Albania aligned with China in 1961; to a Czech, Brezhnev
    // is the man who sent the tanks.
    for (const id of ['ps_birth_context', 'ps_soviet_nostalgia', 'ps_regime_retrospective',
                      'ps_kommunalka', 'ps_dacha_childhood', 'ps_dacha_inheritance',
                      'ps_soviet_school_uniform', 'doc_propiska_moscow']) {
      const e = byId(id)
      if (!e) continue
      expect(src(e.when), `${id} names a Soviet institution`).toMatch(/wasSovietRepublic/)
    }
  })
})

describe('no male character is pregnant or dies in childbirth', () => {
  it('across a run of whole lives', async () => {
    const r = await runSimulation({
      lives: 14,
      configs: [['Nigeria', 1962], ['India', 1975], ['Germany', 1970], ['Brazil', 1995],
                ['Cambodia', 1962], ['Yemen', 1940], ['Kenya', 1985], ['Egypt', 1990]],
      mode: 'passive',
    })
    expect(r.fatal).toBeNull()
    expect(r.totals.errors).toEqual([])
  }, 240_000)
})

describe('the country data the prose reads', () => {
  it('has an independence year for every country whose content asserts one', () => {
    // A guard reading isIndependenceYear on a country with no entry simply
    // never fires, which is correct — but a country in the decolonisation
    // window with no entry is a content gap rather than a design choice.
    const missing = COUNTRIES
      .filter(c => ['subsaharan', 'developing_unstable', 'conflict_zone'].includes(c.archetype))
      .filter(c => INDEPENDENCE_YEAR[c.name] === undefined)
      .map(c => c.name)
    // These four are correctly absent and the absence is the point: Ethiopia,
    // Iran and Nepal were never colonised, and Palestine is not an independent
    // state. A fifth name appearing here is a content gap.
    expect(missing.sort()).toEqual(['Ethiopia', 'Iran', 'Nepal', 'Palestine'])
  })
})
