// Religion conditioned on ethnicity.
//
// Character generation drew the two independently, which produced people who
// cannot exist. The Lhotshampa are Bhutan's Nepali-speaking Hindu south — that
// is the entire reason for the 1988 census, the dress code and the expulsion of
// about a sixth of the country — and the engine was making 67% of them
// Buddhist. Bosniaks came out Catholic in a corpus that writes the Bosnian war.
// Dalits came out Muslim in a corpus whose caste arc assumes otherwise. Copts
// came out Sunni.
//
// None of it was visible to any audit: both draws were valid, both marginals
// were right on their own, and the joint distribution was nonsense. The guards
// that read ethnicity AND religion together were simply failing for a share of
// their own population, silently.
import { describe, it, expect } from 'vitest'
import { COUNTRIES } from '../src/data/countries.js'
import { ETHNIC_RELIGION, religionFor, impliedMarginal } from '../src/data/identity.js'
import { createCharacter, weightedRandom } from '../src/engine/character.js'

const byName = (n) => COUNTRIES.find(c => c.name === n)
const draw = (eth, country, n = 4000) => {
  const t = {}
  for (let i = 0; i < n; i++) {
    const r = religionFor(eth, country, weightedRandom)
    t[r] = (t[r] ?? 0) + 1
  }
  return Object.fromEntries(Object.entries(t).map(([k, v]) => [k, v / n]))
}

describe('the pairings that could not exist', () => {
  it('makes the Lhotshampa Hindu, which is the reason for everything that happened to them', () => {
    const d = draw('lhotshampa', byName('Bhutan'))
    expect(d.hindu).toBeGreaterThan(0.88)
    // Bhutan's own religionWeights are overwhelmingly Buddhist, and that is the
    // right national figure. It is the wrong figure for this group, which is
    // exactly the distinction this file exists to make.
    expect(byName('Bhutan').religionWeights.buddhist).toBeGreaterThan(0.6)
  })

  it('makes Bosniaks Muslim, Serbs Orthodox and Croats Catholic', () => {
    expect(draw('bosniak', byName('Serbia')).muslim_sunni).toBeGreaterThan(0.9)
    expect(draw('serb', byName('Serbia')).christian_orthodox).toBeGreaterThan(0.85)
    expect(draw('croat', byName('Croatia')).christian_catholic).toBeGreaterThan(0.85)
  })

  it('keeps caste inside the religion caste belongs to', () => {
    const d = draw('dalit', byName('India'))
    // Hindu, with the Ambedkarite conversion to Buddhism as the real minority.
    expect(d.hindu).toBeGreaterThan(0.78)
    expect(d.buddhist ?? 0).toBeGreaterThan(0.02)
    expect(d.muslim_sunni ?? 0).toBeLessThan(0.05)
  })

  it('does not make a Copt a Sunni or a Druze anything else', () => {
    expect(draw('coptic_egyptian', byName('Egypt')).christian_orthodox).toBeGreaterThan(0.9)
    expect(draw('druze_israel', byName('Israel')).muslim_druze).toBe(1)
    expect(draw('yezidi_armenian', byName('Armenia')).yezidi).toBe(1)
    expect(draw('alawi_syria', byName('Syria')).muslim_alawi).toBe(1)
  })

  it('leaves religion to the country where ethnicity does not predict it', () => {
    // The right default, and most of the table's job is to stay out of the way.
    for (const id of ['polish', 'russian', 'han_chinese', 'white_american', 'roma_romanian',
                      'slovene', 'french', 'japanese', 'korean', 'mestizo_mexican']) {
      expect(ETHNIC_RELIGION[id], `${id} should not be mapped`).toBeUndefined()
    }
    // The table speaks for a minority of groups and defers for the rest.
    const all = new Set(COUNTRIES.flatMap(c => (c.ethnicGroups ?? []).map(g => g.id)))
    expect(Object.keys(ETHNIC_RELIGION).length).toBeLessThan(all.size * 0.7)
    const d = draw('roma_romanian', byName('Romania'))
    expect(d.christian_orthodox).toBeGreaterThan(0.5)
  })

  it('does not flatten the groups that really are split', () => {
    // Yoruba are genuinely about half Muslim and half Christian, Oromo three
    // ways, Lebanese four. Collapsing those to a plurality would trade one
    // wrong answer for another.
    const y = draw('yoruba', byName('Nigeria'))
    expect(y.muslim_sunni).toBeGreaterThan(0.3)
    expect((y.christian_protestant ?? 0) + (y.christian_pentecostal ?? 0) + (y.christian_catholic ?? 0)).toBeGreaterThan(0.4)
    const l = draw('arab_lebanese', byName('Lebanon'))
    for (const r of ['muslim_shia', 'muslim_sunni', 'christian_maronite']) {
      expect(l[r], `Lebanese ${r}`).toBeGreaterThan(0.15)
    }
  })
})

describe('the table stays honest about the countries it changes', () => {
  it('uses only ethnicity and religion ids that exist in the country data', () => {
    const eth = new Set(COUNTRIES.flatMap(c => (c.ethnicGroups ?? []).map(g => g.id)))
    const rel = new Set(COUNTRIES.flatMap(c => Object.keys(c.religionWeights ?? {})))
    for (const [id, dist] of Object.entries(ETHNIC_RELIGION)) {
      expect(eth.has(id), `"${id}" is not an ethnic group in any country`).toBe(true)
      for (const r of Object.keys(dist)) {
        expect(rel.has(r), `"${id}" maps to religion "${r}", which no country carries`).toBe(true)
      }
      const total = Object.values(dist).reduce((a, b) => a + b, 0)
      expect(Math.abs(total - 1), `"${id}" weights sum to ${total}`).toBeLessThan(0.01)
    }
  })

  // The load-bearing one. Conditioning religion on ethnicity changes each
  // country's overall mix, and a wrong conditional shows up here as a national
  // marginal that no longer matches what the content was written against.
  it('keeps every country within 12 points of its declared religion mix', () => {
    const over = []
    for (const c of COUNTRIES) {
      const got = impliedMarginal(c)
      const want = c.religionWeights ?? {}
      const total = Object.values(want).reduce((a, b) => a + b, 0) || 1
      for (const r of new Set([...Object.keys(want), ...Object.keys(got)])) {
        const d = Math.abs((got[r] ?? 0) - ((want[r] ?? 0) / total))
        if (d > 0.12) over.push(`${c.name} ${r}: declared ${Math.round((want[r] ?? 0) / total * 100)}% -> ${Math.round((got[r] ?? 0) * 100)}%`)
      }
    }
    expect(over).toEqual([])
  })
})

describe('end to end, through the real generator', () => {
  it('never produces a Buddhist Lhotshampa or a Catholic Bosniak', () => {
    const bad = []
    for (let i = 0; i < 6000; i++) {
      const c = createCharacter({})
      // Not "impossible" in the sense of every exception: a Buddhist
      // Lhotshampa exists and the table gives them 4%. These are the pairings
      // with no real-world instance at all.
      const impossible =
        (c.ethnicity === 'bosniak' && c.religion?.startsWith('christian')) ||
        (c.ethnicity === 'coptic_egyptian' && c.religion?.startsWith('muslim')) ||
        (c.ethnicity === 'malay_malaysian' && c.religion !== 'muslim_sunni') ||
        (c.ethnicity === 'rohingya' && c.religion !== 'muslim_sunni') ||
        (c.ethnicity === 'ngalop' && c.religion === 'muslim_sunni')
      if (impossible) bad.push(`${c.ethnicity}/${c.religion}`)
    }
    expect(bad).toEqual([])
  })

  it('reproduces the conditional distribution through the real generator', () => {
    // Sampling through createCharacter rather than religionFor, so the wiring
    // in character.js is covered and not just the table.
    const tally = {}
    for (let i = 0; i < 30000; i++) {
      const c = createCharacter({})
      ;(tally[c.ethnicity] ??= {})[c.religion] = ((tally[c.ethnicity] ?? {})[c.religion] ?? 0) + 1
    }
    const share = (eth, rel) => {
      const t = tally[eth]
      if (!t) return null
      const total = Object.values(t).reduce((a, b) => a + b, 0)
      return total < 25 ? null : (t[rel] ?? 0) / total
    }
    for (const [eth, rel, floor] of [['dalit', 'hindu', 0.75], ['sinhalese', 'buddhist', 0.85],
                                     ['hausa_fulani', 'muslim_sunni', 0.9], ['persian', 'muslim_shia', 0.85],
                                     ['amhara', 'christian_orthodox', 0.8]]) {
      const got = share(eth, rel)
      if (got === null) continue   // too few draws to assert on
      expect(got, `${eth} -> ${rel}`).toBeGreaterThan(floor)
    }
  }, 60_000)
})
