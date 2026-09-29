// Claims a play-log read found the state not backing: literacy that schooling
// never wrote back, a fertility refusal keyed to the wrong person's age, an ID
// card that had a ninety-two-year-old still at work, refugee status read as no
// status at all, and world events matched by archetype instead of by where the
// thing happened.
import { describe, it, expect } from 'vitest'

const store = {}
globalThis.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v) },
  removeItem: k => { delete store[k] },
}

const { useGameStore } = await import('../src/store/gameStore.js')
const { buildG, tick } = await import('../src/engine/tick.js')
const { tryForChild } = await import('../src/engine/playerActions.js')
const { generateIdentityCard } = await import('../src/engine/epitaph.js')
const { WORLD_EVENTS } = await import('../src/data/worldEvents.js')
const { hasTech } = await import('../src/data/technology.js')
const { COUNTRIES } = await import('../src/data/countries.js')

function born(country, birthYear, extra = {}) {
  useGameStore.getState().setMode('passive')
  useGameStore.getState().startCuratedGame({ country, birthYear, ...extra })
  return { ...useGameStore.getState(), mode: 'passive' }
}

describe('schooling writes literacy back', () => {
  it('a character who finished secondary reads, whatever the birth roll said', () => {
    const s = born('Colombia', 1960)
    const illiterateAtBirth = { ...s, character: { ...s.character, literate: false } }
    expect(buildG(illiterateAtBirth).literate).toBe(false)
    const graduated = { ...illiterateAtBirth, education: { level: 'secondary', field: null, enrolled: null },
      flags: [...illiterateAtBirth.flags, 'graduated_hs'] }
    expect(buildG(graduated).literate).toBe(true)
    const degree = { ...illiterateAtBirth, education: { level: 'university', field: 'biology', enrolled: null } }
    expect(buildG(degree).literate).toBe(true)
  })

  it('no simulated life that finished secondary is illiterate', () => {
    const bad = []
    for (let i = 0; i < 24; i++) {
      let s = born(i % 2 ? 'Angola' : 'Colombia', 1960)
      for (let y = 0; y < 23 && !s.dead; y++) s = tick(s)
      if (s.flags.includes('graduated_hs') || ['secondary', 'university'].includes(s.education?.level)) {
        if (buildG(s).literate !== true || s.character.literate === false) bad.push(s.character.name)
      }
    }
    expect(bad).toEqual([])
  })
})

describe('fertility follows whoever would carry the child', () => {
  it('a woman of 40 with a husband of 52 is not told it is over', () => {
    let s = born('United States', 1950, { gender: 'female' })
    s = { ...s, age: 40, currentYear: 1990, birthControl: false,
      partner: { name: 'Tom Walsh', age: 52, married: true, alive: true, years: 10 } }
    for (let i = 0; i < 20; i++) {
      const after = tryForChild(s)
      expect(after.log.slice(s.log.length).some(l => /no longer possible/.test(l.text))).toBe(false)
    }
  })

  it('the refusal is silent when the life course asks', () => {
    let s = born('United States', 1950, { gender: 'female' })
    s = { ...s, age: 50, currentYear: 2000, partner: { name: 'Tom Walsh', age: 52, married: true, alive: true, years: 10 } }
    expect(tryForChild(s, { silent: true }).log.length).toBe(s.log.length)
    expect(tryForChild(s).log.length).toBe(s.log.length + 1)
  })
})

describe('the identity card', () => {
  it('a retiree is retired, not working', () => {
    let s = born('United States', 1916)
    s = { ...s, age: 92, currentYear: 2008, career: null, retired: true, inPrison: false,
      partner: { name: 'Ruth Adler', age: 90, married: true, alive: true, years: 60 },
      mem: { ...s.mem, retiredFrom: { title: 'Project Manager', field: 'business', id: 'pm' } } }
    const card = generateIdentityCard(s)
    const text = Array.isArray(card) ? card.join(' ') : JSON.stringify(card)
    expect(text).not.toMatch(/working as/)
    expect(text).toMatch(/retired/)
  })

  it('refugee status is not described as being present without permission', () => {
    let s = born('Syria', 1985)
    s = { ...s, age: 32, currentYear: 2017, residencyStatus: 'refugee_status', inPrison: false }
    const card = generateIdentityCard(s)
    const text = Array.isArray(card) ? card.join(' ') : JSON.stringify(card)
    expect(text).not.toMatch(/without permission/)
    expect(text).toMatch(/refugee/)
  })
})

describe('world events reach where they happened', () => {
  const we = (id) => WORLD_EVENTS.find(e => e.id === id)
  it('occupation is Iraqi', () => {
    expect(we('iraq_war').countries).toEqual(['Iraq'])
    expect(we('iraq_war_news').addFlags ?? []).toEqual([])
  })
  it('the Mediterranean crossing is not open to Papua New Guinea', () => {
    expect(we('european_refugee_crisis').countries).not.toContain('Papua New Guinea')
  })
})

describe('village electricity', () => {
  const c = (n) => COUNTRIES.find(x => x.name === n)
  it('rural Niger is not lit in 1990, rural Laos not before 2000', () => {
    expect(hasTech(c('Niger'), 'electricity', 1990, { rural: true })).toBe(false)
    expect(hasTech(c('Laos'), 'electricity', 1995, { rural: true })).toBe(false)
    expect(hasTech(c('Laos'), 'electricity', 2010, { rural: true })).toBe(true)
  })
})
