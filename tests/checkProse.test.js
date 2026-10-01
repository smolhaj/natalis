// checkProse.test.js — the house style, held as a ratchet.
//
// The editorial pass of September 2026 measured the corpus's verbal tics
// ("the specific", "is real.", "in a way that", "which is", the "is not X. It
// is Y" turn, the one-line aphorism closer) and bodies over six sentences, and
// cut them. This test keeps them cut: the lint's own units, then the whole
// rendered corpus against the default budget, which fails on a regression and
// not on the backlog.

import { describe, it, expect } from 'vitest'
import {
  sentences, ticHits, isAphorismCloser, overBudget, scoreModules, totals,
  renderCorpus, BUDGET, STRICT, MAX_SENTENCES,
} from '../scripts/check-prose.js'
import { gendered } from '../src/data/events/_pronouns.js'
import { abortionLegal, bornStateless } from '../src/data/events/_law.js'

describe('check-prose units', () => {
  it('counts sentences without splitting on abbreviations or decimals', () => {
    expect(sentences('You wait. Mr. Okafor comes at 3.30. Nobody speaks.')).toHaveLength(3)
    expect(sentences('')).toHaveLength(0)
  })

  it('finds the tics it was written for', () => {
    const names = (t) => ticHits(t).map(h => h.name)
    expect(names('The grief is real.')).toContain('is real.')
    expect(names('You remember the specific smell.')).toContain('the specific')
    expect(names('She laughs in a way that hurts.')).toContain('in a way that')
    expect(names('You walk to the market and buy rice.')).toHaveLength(0)
  })

  it('flags a body over the sentence budget and an exclamation mark', () => {
    const long = Array.from({ length: MAX_SENTENCES + 1 }, (_, i) => `Line ${i} ends here.`).join(' ')
    const [m] = scoreModules([{ module: 'x', id: 'a', body: long, outcomes: ['Good!'] }])
    expect(m.long).toBe(1)
    expect(m.bang).toBe(1)
    expect(overBudget(m, BUDGET).some(w => w.includes('exclamation'))).toBe(true)
  })

  it('treats a short closing maxim as an aphorism and a plain action as not', () => {
    expect(isAphorismCloser('You bury him on Tuesday. The rain does not stop. That is how it goes.')).toBe(true)
    expect(isAphorismCloser('You bury him on Tuesday. You walk home by the river.')).toBe(false)
  })

  it('is stricter in --strict than by default', () => {
    expect(STRICT.density).toBeLessThan(BUDGET.density)
    expect(STRICT.longShare).toBeLessThan(BUDGET.longShare)
  })
})

describe('helpers the pass introduced', () => {
  it('gendered() renders one person in their own pronouns, with agreement', () => {
    expect(gendered('They are tired and their shoes are wet.', { gender: 'female' }))
      .toBe('She is tired and her shoes are wet.')
    expect(gendered("They don't call. You call them.", { gender: 'male' }))
      .toBe("He doesn't call. You call him.")
    expect(gendered('They are tired.', {})).toBe('They are tired.')
  })

  it('abortionLegal() reads the law, not the country category', () => {
    expect(abortionLegal('India', 1990)).toBe(true)
    expect(abortionLegal('India', 1965)).toBe(false)
    expect(abortionLegal('Ireland', 2010)).toBe(false)
    expect(abortionLegal('Romania', 1975)).toBe(false)
    expect(abortionLegal('Russia', 1980)).toBe(true)
  })

  it('bornStateless() is a people and a period, not rural poverty', () => {
    const G = (country, ethnicity, birthYear, currentYear) =>
      ({ character: { country: { name: country }, birthYear }, ethnicity, currentYear, age: currentYear - birthYear })
    expect(bornStateless(G('Myanmar', 'rohingya', 1990, 2000))).toBe(true)
    expect(bornStateless(G('Nigeria', 'yoruba', 1962, 1970))).toBe(false)
    expect(bornStateless(G('Bangladesh', 'bihari', 2010, 2015))).toBe(false)
  })
})

describe('the corpus against the default budget', () => {
  it('no module is over budget, and no exclamation mark is printed', async () => {
    const { events } = await renderCorpus()
    const mods = scoreModules(events)
    const t = totals(mods)
    const over = mods.map(m => [m.module, overBudget(m, BUDGET)]).filter(([, w]) => w.length)
    expect(over).toEqual([])
    expect(t.bang).toBe(0)
    // The pass took bodies over six sentences from 19.8% to ~10.6%.
    expect(t.long / t.bodies).toBeLessThan(0.14)
  }, 600_000)
})
