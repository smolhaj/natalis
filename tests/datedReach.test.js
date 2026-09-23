import { describe, it, expect } from 'vitest'
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} }
const { getNextEvent, buildG, resolveAutoEvent } = await import('../src/engine/tick.js')
const { EVENTS, classifyEvent, DATED_MAX_SPAN } = await import('../src/data/events.js')
const { useGameStore } = await import('../src/store/gameStore.js')

// An event whose guard is open for one calendar year — the day of Peru's 1980
// election, the Bouazizi winter, the 2010 floods — gets exactly one draw in a
// life. One event fires per year and the anchored register holds ~38% of it, so
// even at weight 999 such an event reached at most about that share of the
// characters it was written for, and the 345 dated events at the corpus-typical
// weight under 20 reached 4%. Measured over 394 dated events and 4,770 lives
// forced into their windows: pooled reach 8.8% before the dated slot, 77% after.
//
// These assert the contract per YEAR rather than per life, because a per-life
// rate for one event is a small-n proportion and swings by more than any bound
// worth writing: the question is whether, in the one year it can fire, an
// eligible dated event gets that year.

const BY_ID = new Map(EVENTS.filter(Boolean).map(e => [e.id, e]))

function stateIn(country, year, age, mem = {}) {
  useGameStore.getState().startCuratedGame({ country, birthYear: year - age })
  const s = useGameStore.getState()
  return { ...s, mode: 'passive', age, currentYear: year, queue: [], mem: { ...(s.mem ?? {}), ...mem } }
}

// Share of draws that return `id` for this state. Draw-level, so n is cheap.
function shareOf(state, id, n = 300) {
  let hit = 0
  for (let i = 0; i < n; i++) if (getNextEvent(state)?.id === id) hit++
  return hit / n
}

describe('dated events: classification', () => {
  it('reads a single-year guard as dated, and a wide one as not', () => {
    const one = classifyEvent({ id: 't1', when: (G) => G.currentYear === 1980 && G.age >= 10 })
    expect(one.dated).toEqual({ from: 1980, to: 1980 })
    const two = classifyEvent({ id: 't2', when: (G) => G.currentYear >= 1991 && G.currentYear <= 1992 })
    expect(two.dated).toEqual({ from: 1991, to: 1992 })
    const wide = classifyEvent({ id: 't3', when: (G) => G.currentYear >= 1980 && G.currentYear <= 1995 })
    expect(wide.dated).toBeNull()
    const open = classifyEvent({ id: 't4', when: (G) => G.currentYear >= 1980 })
    expect(open.dated).toBeNull()
  })

  it('leaves a guard it cannot be sure of undated', () => {
    // An `||` makes the comparisons a disjunction; reading it as a conjunction
    // would hand one of these a slot in years it was never written for.
    const or = classifyEvent({ id: 't5', when: (G) => G.currentYear === 1980 || G.currentYear === 1990 })
    expect(or.dated).toBeNull()
    const early = classifyEvent({ id: 't6', when: (G) => { if (G.currentYear === 1980) return false; return G.currentYear <= 1981 && G.currentYear >= 1979 } })
    expect(early.dated).toBeNull()
  })

  it('finds the corpus\'s dated events, and never marks a contemplative one', () => {
    // An audit that cannot fail is not an audit: if the parse silently stops
    // matching, the slot quietly turns off for every dated event at once.
    let n = 0
    for (const e of EVENTS) {
      if (!e) continue
      classifyEvent(e)
      if (e.contemplative) expect(e.dated, e.id).toBeNull()
      if (e.dated) {
        n++
        expect(e.dated.to - e.dated.from + 1).toBeLessThanOrEqual(DATED_MAX_SPAN)
      }
    }
    expect(n).toBeGreaterThan(250)
    expect(BY_ID.get('pem_first_vote_1980')?.dated).toEqual({ from: 1980, to: 1980 })
  })
})

describe('dated events: selection', () => {
  const CASES = [
    // [id, country, year, age]  — one weight-999 and two corpus-typical weight-5
    ['pem_first_vote_1980', 'Peru', 1980, 30],
    ['tun_bouazizi_revolution_2011', 'Tunisia', 2011, 30],
    ['pak_dep_floods_2010', 'Pakistan', 2010, 30],
  ]

  for (const [id, country, year, age] of CASES) {
    it(`${id} claims its one year for the character it was written for`, () => {
      const ev = BY_ID.get(id)
      expect(ev, `${id} exists`).toBeDefined()
      const s = stateIn(country, year, age)
      expect(ev.when(buildG(s)), `${id} should be eligible for this state`).toBe(true)
      // Before the dated slot: ~0.38 at weight 999, ~0.01 at weight 5.
      // With it: ~0.9 whenever the year is not already inside a run.
      expect(shareOf(s, id)).toBeGreaterThan(0.7)
    })
  }

  it('backs off inside an unbroken run of dated years', () => {
    // A crowded stretch alternates history with the rest of the life: three
    // dated events in the three years before this one leave the slot at an
    // eighth of its strength.
    const s = stateIn('Peru', 1980, 30, { datedYears: [1977, 1978, 1979] })
    const share = shareOf(s, 'pem_first_vote_1980')
    expect(share).toBeLessThan(0.55)
    // A gap resets it.
    const gap = stateIn('Peru', 1980, 30, { datedYears: [1976, 1977, 1978] })
    expect(shareOf(gap, 'pem_first_vote_1980')).toBeGreaterThan(0.7)
  })

  it('repays a borrowed anchored year so the register mix is unchanged over a life', () => {
    // When the slot takes a year the draw gave to another register it marks the
    // event; resolving it records the debt, and a later anchored draw pays it back.
    const s = stateIn('Peru', 1980, 30)
    let borrowed = null
    for (let i = 0; i < 200 && !borrowed; i++) {
      const e = getNextEvent(s)
      if (e?.borrowsAnchored) borrowed = e
    }
    expect(borrowed, 'a dated pick displacing another register').not.toBeNull()
    const after = resolveAutoEvent({ ...s, pendingEvent: { ...borrowed, isAutomatic: true } })
    expect(after.mem.anchoredDebt).toBe(1)
    expect(after.mem.datedYears).toContain(1980)

    // In debt, an ordinary year's anchored draws go elsewhere.
    // One character for both arms: two separate draws can differ in place and
    // identity, and with it how much anchored content exists at all.
    const clear = stateIn('Peru', 1990, 40)
    const later = { ...clear, mem: { ...clear.mem, anchoredDebt: 50 } }
    const anchoredShare = (st) => {
      let a = 0, n = 0
      for (let i = 0; i < 300; i++) {
        const e = getNextEvent(st)
        // A dated pick takes its year whatever the debt, by design.
        if (!e || classifyEvent(e).dated) continue
        n++
        if (classifyEvent(e).register === 'anchored') a++
      }
      return a / n
    }
    expect(anchoredShare(later)).toBeLessThan(anchoredShare(clear))
  })
})
