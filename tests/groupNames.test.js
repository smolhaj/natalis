import { describe, it, expect } from 'vitest'
import { GROUP_NAMES, RELIGION_NAMES, nameGroupFor } from '../src/data/groupNames.js'
import { COUNTRIES } from '../src/data/countries.js'
import { createCharacter, deriveInitialParents } from '../src/engine/character.js'

// A name pool keyed on an id nothing draws is a pool nobody is ever named from,
// and it fails silently: the character falls through to the country pool,
// which is exactly the misnaming the entry was written to stop.
describe('group name pools', () => {
  const groupIds = new Map()
  for (const c of COUNTRIES) for (const g of c.ethnicGroups ?? []) groupIds.set(g.id, c.name)

  it('every GROUP_NAMES key is an ethnic id on the roster', () => {
    expect(Object.keys(GROUP_NAMES).filter(k => !groupIds.has(k))).toEqual([])
  })

  it('every RELIGION_NAMES key names a country that has that faith', () => {
    const bad = []
    for (const key of Object.keys(RELIGION_NAMES)) {
      const [country, faith] = key.split(':')
      const c = COUNTRIES.find(x => x.name === country)
      if (!c || !Object.keys(c.religionWeights ?? {}).some(r => r.split('_')[0] === faith)) bad.push(key)
    }
    expect(bad).toEqual([])
  })

  it('pools are non-empty and have no duplicates', () => {
    const bad = []
    for (const [key, pool] of [...Object.entries(GROUP_NAMES), ...Object.entries(RELIGION_NAMES)]) {
      for (const f of ['male', 'female', 'surnames']) {
        if (pool[f] === undefined) continue
        if (!Array.isArray(pool[f]) || pool[f].length < 8) bad.push(`${key}.${f} too short`)
        else if (new Set(pool[f]).size !== pool[f].length) bad.push(`${key}.${f} has duplicates`)
      }
    }
    expect(bad).toEqual([])
  })

  it('a character from a pooled group is named, and parented, from that pool', () => {
    const entries = Object.entries(GROUP_NAMES).filter(([, p]) => p.male && p.surnames)
    if (!entries.length) return
    const [id, pool] = entries[0]
    const country = COUNTRIES.find(c => c.name === groupIds.get(id))
    for (let i = 0; i < 20; i++) {
      const ch = createCharacter({ country: country.name, ethnicity: id, gender: 'male', birthYear: 1960 })
      if (ch.ethnicity !== id) continue
      expect(nameGroupFor(country.name, id, ch.religion)).toBe(id)
      expect(pool.male).toContain(ch.firstName)
      const parents = deriveInitialParents(ch)
      expect(pool.male).toContain(String(parents.father.name).split(' ')[0])
    }
  })
})
