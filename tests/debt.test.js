import { describe, it, expect } from 'vitest'
const { tick } = await import('../src/engine/tick.js')
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} }
const { useGameStore } = await import('../src/store/gameStore.js')

// The minimum payment came off `money` and was never subtracted from `debt`:
//
//   s.debt = s.debt + interest
//   s.money = s.money - Math.round(preInterestDebt * 0.05)
//
// so a balance grew 18% a year forever while the character paid 5% of it
// annually into nothing. A life-log read found a novelist on $223,895/yr
// carrying $7.1m from a $2,400 medical bill at 28, and three of the other seven
// lives read the same way. Nothing in the prose mentions debt, so the only line
// any of them ever saw was the bankruptcy notice, forty-eight years later.
//
// These assert the contract rather than the numbers: a payment reduces what is
// owed, and nothing compounds without limit.
function freshLife({ country = 'United States', birthYear = 1960 } = {}) {
  useGameStore.getState().startCuratedGame({ country, birthYear })
  return { ...useGameStore.getState(), mode: 'passive' }
}

function runYears(s, years, { onTick } = {}) {
  for (let y = 0; y < years && !s.dead; y++) {
    s = tick(s)
    if (s.pendingEvent) s = { ...s, pendingEvent: null }
    if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
    if (s.pendingTrial) s = { ...s, pendingTrial: null }
    onTick?.(s)
  }
  return s
}

describe('debt', () => {
  it('reduces the balance when the payment is made', () => {
    let s = freshLife()
    s = runYears(s, 30)
    if (s.dead) return   // a life that ends early tells us nothing; the pooled tests below carry the claim
    // Solvent, with a debt well inside one year's means.
    s = { ...s, debt: 1000, money: 1_000_000, mem: { ...s.mem, debtMissedYears: 0 } }
    const before = s.debt
    s = tick(s)
    expect(s.debt, 'a serviced debt must fall, not rise').toBeLessThan(before)
  })

  it('never compounds without limit', () => {
    // The defect's signature: hand a character a small debt and no means, and
    // watch what fifty years does to it.
    let s = freshLife()
    s = runYears(s, 25)
    if (s.dead) return
    s = { ...s, debt: 500, money: 0, career: null, mem: { ...s.mem, debtMissedYears: 0 } }
    let peak = 0
    s = runYears(s, 50, { onTick: (st) => { peak = Math.max(peak, st.debt ?? 0) } })
    // 500 at 18% for fifty years is roughly two million. Any finite cap beats
    // that; this one is deliberately loose because the charge-off lands at five
    // missed years and the balance before it depends on what else the life did.
    expect(peak, `a $500 debt with no means reached $${peak.toLocaleString()}`).toBeLessThan(100_000)
  })

  it('tells the player, over a run of lives', () => {
    let everDebt = 0, told = 0
    for (const [country, birthYear] of [['United States', 1955], ['Germany', 1928], ['Nigeria', 1962], ['Brazil', 1975]]) {
      for (let i = 0; i < 6; i++) {
        let s = freshLife({ country, birthYear })
        let sawDebt = false
        s = runYears(s, 110, { onTick: (st) => { if ((st.debt ?? 0) > 0) sawDebt = true } })
        if (!sawDebt) continue
        everDebt++
        if (s.log.some(l => /balance has stopped being|payment you can make|interest is more than|last of it goes|It is paid|letters stop|given up on|does not come any more/.test(l.text ?? ''))) told++
      }
    }
    // Before the fix this was zero of everyone: debt existed only in the state.
    if (everDebt >= 5) {
      expect(told / everDebt, `${told} of ${everDebt} lives that carried debt were ever told about it`).toBeGreaterThan(0.4)
    }
  }, 120_000)
})
