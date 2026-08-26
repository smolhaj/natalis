// Passive mode's auto-chooser, tested on the mechanism rather than its shadow.
//
// The obvious way to check this is to run whole lives and see whether they come
// out consistent. That measurement is dominated by noise: only a fraction of
// lives ever accumulate two disposition-bearing flags, so a run of 200 lives
// yields about 25 testable ones, and 25 is few enough that consecutive runs of
// identical code gave 35%, 31% and 20%. Tuning against that is tuning against
// the sampler. These call the scorer directly instead.
import { describe, it, expect } from 'vitest'
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} }
import { pickChoiceAutomatically } from '../src/engine/tick.js'

const G = (flags = [], extra = {}) => ({
  stats: { charisma: 50, smarts: 50, health: 70 },
  flags: new Set(flags),
  age: 35, money: 2000, karma: 50, regret: 20,
  children: [], partner: null, desire: null, political_leaning: null,
  regime: 'single_party_communist',
  ...extra,
})

const INTERROGATION = {
  choices: [
    { text: 'Say nothing at all.', tag: 'defiant' },
    { text: 'Give them a name they already have.', tag: 'yielding' },
  ],
}

const N = 3000
const defianceRate = (flags, extra) => {
  let d = 0
  for (let i = 0; i < N; i++) if (pickChoiceAutomatically(INTERROGATION, G(flags, extra)) === 0) d++
  return d / N
}

describe('the character answers like the same person twice', () => {
  it('leans on what this character has already done', () => {
    const none = defianceRate([])
    const oneDefiant = defianceRate(['refused_to_name'])
    const threeDefiant = defianceRate(['refused_to_name', 'would_not_recant', 'activist'])
    const oneYielding = defianceRate(['named_someone'])
    const threeYielding = defianceRate(['named_someone', 'signed_the_confession', 'gave_up_source'])

    // Monotonic in both directions — the whole claim.
    expect(oneDefiant).toBeGreaterThan(none)
    expect(threeDefiant).toBeGreaterThan(oneDefiant)
    expect(oneYielding).toBeLessThan(none)
    expect(threeYielding).toBeLessThan(oneYielding)

    // Consistent, but not a machine. A life in which every answer is forced is
    // no more a person than one in which every answer is a coin.
    expect(none).toBeGreaterThan(0.15)
    expect(none).toBeLessThan(0.7)
    expect(threeDefiant).toBeLessThan(0.99)
    expect(threeYielding).toBeGreaterThan(0.005)
  })

  it('reads a declared tag rather than guessing from the prose', () => {
    // "Say nothing at all" is the defiant answer under interrogation and the one
    // that costs four years. The keyword fallback scans for /say nothing/ and
    // scores it as acquiescence, which is exactly backwards, and it is the
    // reason choices can declare a tag at all.
    const tagged = defianceRate(['refused_to_name', 'would_not_recant', 'activist'])
    const untagged = (() => {
      const ev = { choices: INTERROGATION.choices.map(c => ({ ...c, tag: null })) }
      let d = 0
      for (let i = 0; i < N; i++) {
        if (pickChoiceAutomatically(ev, G(['refused_to_name', 'would_not_recant', 'activist'])) === 0) d++
      }
      return d / N
    })()
    expect(tagged).toBeGreaterThan(untagged)
  })

  it('lets circumstance override disposition where circumstance would', () => {
    // Someone with a partner and children takes fewer of these, which is most of
    // how an authoritarian state actually works on a population.
    const alone = defianceRate(['refused_to_name'])
    const withFamily = defianceRate(['refused_to_name'], {
      partner: { name: 'A', alive: true }, children: [{ name: 'B' }],
    })
    expect(withFamily).toBeLessThan(alone)
  })

  it('never returns an out-of-range index, including for a single choice', () => {
    for (const ev of [{ choices: [{ text: 'only' }] }, INTERROGATION, { choices: [] }]) {
      for (let i = 0; i < 200; i++) {
        const idx = pickChoiceAutomatically(ev, G())
        expect(idx).toBeGreaterThanOrEqual(0)
        expect(idx).toBeLessThanOrEqual(Math.max(0, (ev.choices?.length ?? 1) - 1))
      }
    }
  })
})
