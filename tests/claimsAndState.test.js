// The sixth beta pass read eighteen complete life logs in order and found the
// same class the second and fourth passes found — a sentence printed to the
// player that the state does not back — at a larger scale than either:
//
//   - eighty events set `emigrated` and moved nobody. 41 of 44 characters
//     holding the flag in a 160-life sample died in the country they were born
//     in, reading "the old country is for funerals" about their own street;
//   - a career held across a border kept the wage level of the country it was
//     drawn in, so a foreman who emigrated from Mexico to New York in 1990 drew
//     $2,614 a year there;
//   - G.regime and G.archetype read the BIRTH country, so the morality court of
//     the country you left could still arrest you;
//   - sterilisation was a flag nothing read, and children kept arriving;
//   - "The baby is six weeks old" fired for a mother whose youngest was ten.
//
// Each of these is asserted here directly, against the engine functions,
// rather than as a rate over simulated lives: a rate over twenty lives is an
// instrument that fails on nothing (CLAUDE.md, "Thresholds are instruments").
import { describe, it, expect } from 'vitest'

const store = {}
globalThis.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v) },
  removeItem: k => { delete store[k] },
}

const { useGameStore } = await import('../src/store/gameStore.js')
const { buildG, buildEffectProxy, applyProxy, resolveProxyExtras, tick } = await import('../src/engine/tick.js')
const { tryForChild, applyActivity } = await import('../src/engine/playerActions.js')
const { EVENTS, classifyEvent } = await import('../src/data/events.js')
const { WORLD_EVENTS } = await import('../src/data/worldEvents.js')
const { COUNTRIES } = await import('../src/data/countries.js')
const { migrationDestinations } = await import('../src/data/migration.js')
const { buildMundaneLayer } = await import('../src/engine/mundaneLayer.js')
const { checkLine } = await import('../scripts/lib/anachronism.js')
const { createCharacter } = await import('../src/engine/character.js')
const { generateEpitaph, generateLifeNotes } = await import('../src/engine/epitaph.js')

function born(country, birthYear, extra = {}) {
  useGameStore.getState().setMode('passive')
  useGameStore.getState().startCuratedGame({ country, birthYear, ...extra })
  return { ...useGameStore.getState(), mode: 'passive' }
}

function runEffect(state, fn) {
  const proxy = buildEffectProxy(state)
  fn(proxy)
  return resolveProxyExtras(applyProxy(state, proxy), proxy)
}

const effectsOf = (e) => [e.effect, ...(e.choices ?? []).map(c => c?.effect)].filter(f => typeof f === 'function')
const setsEmigrated = (f) => /addFlag\(['"]emigrated['"]\)/.test(f.toString())

describe('an event that says you left has moved you', () => {
  // Mongolia is on no corridor list and in no event's named destinations, so
  // "moved" can never be confused with "was sent to where it already was".
  const home = born('Mongolia', 1960)
  const adult = { ...home, age: 30, currentYear: 1990 }

  it('every effect in the corpus that sets `emigrated` changes the country', () => {
    const stayed = []
    let n = 0
    for (const e of EVENTS) {
      for (const f of effectsOf(e)) {
        if (!setsEmigrated(f)) continue
        n++
        const after = runEffect(adult, f)
        if (after.currentCountry?.name === 'Mongolia') stayed.push(e.id)
      }
    }
    expect(n).toBeGreaterThan(60)
    expect(stayed, `still at home after "leaving": ${stayed.join(', ')}`).toEqual([])
  })

  it('and so does every world event that sets it', () => {
    const stayed = []
    for (const we of WORLD_EVENTS) {
      const src = `${we.effect?.toString() ?? ''} ${JSON.stringify(we.addFlags ?? [])}`
      if (!/emigrated/.test(src)) continue
      const after = runEffect(adult, (p) => { we.effect?.(p); for (const f of we.addFlags ?? []) p.addFlag(f) })
      if (after.currentCountry?.name === 'Mongolia') stayed.push(we.id)
    }
    expect(stayed).toEqual([])
  })

  it('an explicit setResidency survives the move', () => {
    const after = runEffect(adult, (p) => { p.addFlag('emigrated'); p.setResidency('refugee_status'); p.emigrateTo('Germany') })
    expect(after.currentCountry.name).toBe('Germany')
    expect(after.residencyStatus).toBe('refugee_status')
  })

  it('p.returnHome() brings a returnee back, and is a no-op for someone at home', () => {
    const abroad = runEffect(adult, (p) => { p.addFlag('emigrated'); p.emigrateTo('Germany') })
    const back = runEffect(abroad, (p) => p.returnHome())
    expect(back.currentCountry.name).toBe('Mongolia')
    expect(back.residencyStatus).toBe('citizen')
    const stay = runEffect(adult, (p) => p.returnHome())
    expect(stay.currentCountry?.name ?? stay.character.country.name).toBe('Mongolia')
  })

  it('never routes anyone to the country they are leaving', () => {
    for (const c of COUNTRIES) {
      const dests = migrationDestinations(c)
      expect(dests.length, c.name).toBeGreaterThan(0)
      expect(dests.includes(c.name), c.name).toBe(false)
      for (const d of dests) expect(COUNTRIES.some(x => x.name === d), `${c.name} → ${d}`).toBe(true)
    }
  })

  it('a departure written from home is not offered to someone already abroad', () => {
    const departures = EVENTS.filter(e => classifyEvent(e).departs)
    expect(departures.length).toBeGreaterThan(60)
    // departureFits is enforced in getNextEvent; the classification is what it reads.
    expect(departures.some(e => e.id === 'gr_debt_crisis_2010')).toBe(true)
  })
})

describe('a wage is paid where the work is done', () => {
  it('re-bases a career held across a border', () => {
    let s = born('Mexico', 1960)
    s = { ...s, age: 29, currentYear: 1989 }
    const career = { id: 'factory_worker', title: 'Foreman', level: 2, salary: 2000, baseSalary: 9000, wageGdp: 'medium', field: 'manufacturing', yearsInRole: 1, performance: 90 }
    s = { ...s, career, currentCountry: COUNTRIES.find(c => c.name === 'United States') }
    const next = tick(s)
    expect(next.career, 'the career should survive one ordinary year').toBeTruthy()
    // medium → very_high is 0.22 → 1.0: the base wage roughly quadruples.
    expect(next.career.baseSalary).toBeGreaterThan(9000 * 3.5)
    expect(next.career.wageGdp).toBe(COUNTRIES.find(c => c.name === 'United States').gdp)
  })
})

describe('a farm does not cross a border', () => {
  it('a smallholder who emigrates is no longer a smallholder', () => {
    let s = born('Vietnam', 1958)
    s = { ...s, age: 23, currentYear: 1981,
      career: { id: 'farmer', title: 'Smallholder', level: 1, salary: 300, baseSalary: 2000, wageGdp: 'low_medium', wageCountry: 'Vietnam', field: 'agriculture', yearsInRole: 2, performance: 90 },
      currentCountry: COUNTRIES.find(c => c.name === 'United States') }
    const next = tick(s)
    expect(next.career?.field === 'agriculture' && next.career?.id === 'farmer' && next.career?.wageCountry === 'Vietnam').toBe(false)
  })
})

describe('the regime and the archetype are where you live', () => {
  it('an Iranian living in Germany is not under the Islamic Republic', () => {
    let s = born('Iran', 1958)
    s = { ...s, age: 30, currentYear: 1988 }
    expect(buildG(s).regime).toBe('theocracy')
    const germany = COUNTRIES.find(c => c.name === 'Germany')
    const G = buildG({ ...s, currentCountry: germany })
    expect(G.regime).not.toBe('theocracy')
    expect(G.archetype).toBe(germany.archetype)
    expect(G.character.country.name).toBe('Iran')   // where you are FROM is still there
  })
})

describe('the daily texture is about the place you are standing in', () => {
  it('a Mexican who has lived in New York for twenty years is not told about the combi', () => {
    let s = born('Mexico', 1960)
    s = { ...s, age: 50, currentYear: 2010, flags: [...s.flags, 'emigrated'], yearsAbroad: 20,
      currentCountry: COUNTRIES.find(c => c.name === 'United States') }
    const MEXICO_ONLY = /\bcombi\b|\bmercado\b|\btaquero\b/i
    for (let i = 0; i < 400; i++) {
      const line = buildMundaneLayer({ ...s, mem: {} })
      if (line) expect(MEXICO_ONLY.test(line), line).toBe(false)
    }
  })
})

describe('a verb that says it is settled is settled', () => {
  it('no child is conceived after sterilisation', () => {
    let s = born('Russia', 1955, { gender: 'male' })
    s = { ...s, age: 33, currentYear: 1988, partner: { name: 'Larisa Mikhailova', age: 30, married: true, alive: true, years: 10 },
      flags: [...s.flags, 'married', 'vasectomy', 'sterilised'] }
    for (let i = 0; i < 50; i++) {
      const after = tryForChild(s)
      expect(after.flags.includes('expecting')).toBe(false)
    }
  })

  it('the forced-sterilisation event records what it narrates', () => {
    const e = EVENTS.find(x => x.id === 'ra_forced_sterilization')
    for (const c of e.choices) expect(/addFlag\('sterilised'\)/.test(c.effect.toString())).toBe(true)
  })
})

describe('a birth is narrated in the year of the birth', () => {
  const NEWBORN = ['mh_postnatal_crisis', 'imm_undoc_child_born', 'childbirth_era_early', 'letter_childbirth_announcement']
  it('none of them fires for a parent whose youngest is ten', () => {
    let s = born('Sweden', 1935, { gender: 'female' })
    s = { ...s, age: 31, currentYear: 1966, residencyStatus: 'undocumented',
      stats: { ...s.stats, happiness: 20 }, children: [{ name: 'Hans Sandberg', ageAtBirth: 21, age: 10, alive: true }] }
    const G = buildG(s)
    expect(G.youngestChildAge).toBe(10)
    for (const id of NEWBORN) {
      const e = EVENTS.find(x => x.id === id)
      expect(e, id).toBeTruthy()
      expect(!!e.when(G), id).toBe(false)
    }
  })
})

describe('the anachronism audit can see a handset', () => {
  it('reports a possessive phone decades before the phone', () => {
    const korea = COUNTRIES.find(c => c.name === 'South Korea')
    expect(checkLine('Soojin goes through your phone. They find nothing.', 1976, korea)).not.toBeNull()
    expect(checkLine("Somebody's phone is at forty percent and is declared communal property.", 1983, COUNTRIES.find(c => c.name === 'Nigeria'))).not.toBeNull()
    // and leaves the hallway telephone alone
    expect(checkLine('The phone rings in the hallway. Your phone number is on the list.', 1960, korea)).toBeNull()
  })
})

describe('a character who cannot read is not offered reading', () => {
  it('the reading activities refuse an illiterate character', () => {
    let s = born('Nigeria', 1962, { gender: 'female' })
    s = { ...s, age: 17, currentYear: 1979, character: { ...s.character, literate: false }, flags: [...s.flags, 'never_schooled'] }
    expect(buildG(s).literate).toBe(false)
    for (const id of ['read', 'journal', 'library', 'practice_writing']) {
      const after = applyActivity(s, id)
      expect(after.log.length, id).toBe(s.log.length)
    }
  })
})

describe('the death screen does not invent a border', () => {
  it('a refugee flag with no crossing reads as internal displacement', () => {
    let s = born('Iran', 1958, { gender: 'male' })
    s = { ...s, age: 68, currentYear: 2026, dead: true, flags: [...s.flags, 'refugee', 'displaced'] }
    const notes = generateLifeNotes(s).map(n => (typeof n === 'string' ? n : n.text))
    expect(notes).not.toContain('A refugee.')
    expect(generateEpitaph(s)).not.toMatch(/carried across borders/)
  })
})

describe('a family is named from its own tradition', () => {
  it('South Asian families in the Gulf are not given Emirati tribal names', () => {
    const uae = COUNTRIES.find(c => c.name === 'UAE')
    const emirati = new Set(uae.surnames)
    let checked = 0
    for (let i = 0; i < 300 && checked < 40; i++) {
      const c = createCharacter({ country: 'UAE', birthYear: 1985 })
      if (c.ethnicity !== 'south_asian_uae') continue
      checked++
      expect(emirati.has(c.surname), `${c.name} (${c.religion})`).toBe(false)
    }
    expect(checked).toBeGreaterThan(10)
  })

  it('a married woman\'s children take their father\'s surname', async () => {
    const { childSurname } = await import('../src/engine/names.js')
    expect(childSurname({ character: { gender: 'female', surname: 'Das' }, partner: { name: 'Rajesh Singh' } })).toBe('Singh')
    expect(childSurname({ character: { gender: 'female', surname: 'Das' }, partner: null })).toBe('Das')
    expect(childSurname({ character: { gender: 'male', surname: 'Lebedev' }, partner: { name: 'Larisa Mikhailova' } })).toBe('Lebedev')
  })
})
