import { describe, it, expect } from 'vitest'
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} }
const { buildYearTexture, textureCandidates } = await import('../src/engine/yearTexture.js')
const { useGameStore } = await import('../src/store/gameStore.js')
const { buildEffectProxy, applyProxy, resolveProxyExtras } = await import('../src/engine/tick.js')

// Two blocks in `textureCandidates` used to spend their budget at the moment a
// candidate was OFFERED rather than the moment it PRINTED: the stranger glimpse
// stamped `mem.sonderGlimpseAge`, and the desire layer incremented
// `mem.desireTextureFires`, both inside the generator. A glimpse loses to an
// urgent line 72% of the time and a desire line loses the tier draw more often
// than it wins, so both budgets were being burned on years where nothing was
// said — the glimpse then went quiet for eight years having printed nothing,
// and the desire layer walked full → brief → oblique unread.
//
// A candidate may now carry a third element, a commit callback, and the driver
// runs it only for the line it returns.

function life({ country = 'Sweden', birthYear = 1960 } = {}) {
  useGameStore.getState().startCuratedGame({ country, birthYear })
  return { ...useGameStore.getState() }
}

describe('year texture commits', () => {
  it('never spends more budget than it printed lines', () => {
    // The invariant the old code broke: a year can print at most one line, so
    // the number of desire-texture fires recorded can never exceed the number
    // of years that printed anything at all. Before, the counter advanced on
    // every year the block was merely OFFERED — which is most years, since it
    // sits behind a 0.4 roll and then loses the tier draw more often than it
    // wins.
    let s = { ...life(), age: 20, desire: 'prove_worth', mem: { saidLines: [] } }
    let printed = 0
    for (let age = 20; age <= 78; age++) {
      s = { ...s, age, mem: { ...s.mem } }
      if (buildYearTexture(s, {})) printed++
    }
    expect(s.mem.desireTextureFires ?? 0).toBeLessThanOrEqual(printed)
  })

  it('the candidate generator does not mutate the life it is reading', () => {
    // `textureCandidates` is what the coverage census calls to ask what the
    // layer WOULD say. Two blocks wrote to `mem` from inside it: the glimpse
    // cadence and the desire-texture fire count. Both budgets were therefore
    // spent on years where nothing printed — and a census run silently aged
    // the character's glimpse clock by however many years it sampled.
    //
    // A desire is set and `specificOnly` is off, so both blocks are live.
    for (const age of [14, 24, 34, 44, 54, 64]) {
      const s = { ...life(), age, desire: 'prove_worth', mem: { saidLines: [] } }
      const before = JSON.stringify(s.mem)
      for (let i = 0; i < 80; i++) [...textureCandidates(s, {})]
      expect(JSON.stringify(s.mem), `age ${age}`).toBe(before)
    }
  })

  it('stamps the glimpse cadence when a glimpse does print', () => {
    // Over enough years a glimpse eventually prints, and when it does the
    // cadence must move — otherwise glimpses come every year.
    let s = { ...life(), age: 12, mem: { saidLines: [] } }
    let stamped = false
    for (let age = 12; age <= 80 && !stamped; age++) {
      s = { ...s, age, mem: { ...s.mem } }
      buildYearTexture(s, {})
      if (s.mem.sonderGlimpseAge != null) stamped = true
    }
    expect(stamped).toBe(true)
  })
})

describe('education is a fact about the state', () => {
  it('a flag that asserts a degree promotes education.level', () => {
    const s = { ...life(), age: 22 }
    expect(s.education.level).not.toBe('university')
    const p = buildEffectProxy(s)
    p.addFlag('university_graduate')
    const next = resolveProxyExtras(applyProxy(s, p), p)
    expect(next.education.level).toBe('university')
    expect(next.flags).toContain('university_graduate')
  })

  it('never takes a degree away', () => {
    const s = { ...life(), age: 40, education: { level: 'graduate', field: 'medicine', enrolled: null } }
    const p = buildEffectProxy(s)
    p.addFlag('hbcu_graduate')
    p.setEducation('secondary')
    const next = resolveProxyExtras(applyProxy(s, p), p)
    expect(next.education.level).toBe('graduate')
  })
})
