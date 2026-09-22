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
    //
    // The first version of this asserted a flat cap on the peak balance and was
    // a noisy instrument, because `debt` is not only the compounding balance —
    // every unpayable bill in the game lands on it. It failed one run in ten on
    // a life that had bought a house, which was a real defect but a DIFFERENT
    // one (see the repossession test below), and it would have failed the same
    // way on a life that simply lived fifty years it could not afford, which is
    // not a defect at all.
    //
    // So assert what this block is actually responsible for: the year-over-year
    // GROWTH of a balance nobody adds to. Nothing here can grow faster than the
    // interest rate, and after the charge-off it cannot grow at all.
    let s = freshLife()
    s = runYears(s, 25)
    if (s.dead) return
    s = { ...s, debt: 500, money: 0, career: null, assets: { properties: [], vehicles: [] }, mem: { ...s.mem, debtMissedYears: 0 } }
    let worstRatio = 0
    let last = s.debt
    s = runYears(s, 50, { onTick: (st) => {
      if (last > 0 && (st.debt ?? 0) > last) worstRatio = Math.max(worstRatio, (st.debt ?? 0) / last)
      last = st.debt ?? 0
    } })
    // 1.18 is the unsecured rate; the margin is for the living-cost shortfall
    // that lands on the same field in a year the character had nothing at all.
    expect(worstRatio, `a debt grew ${worstRatio.toFixed(2)}x in one year`).toBeLessThan(2.0)
  })

  it('takes the house rather than billing forever for it', () => {
    // A mortgage in arrears debited the payment that was NOT made, so the
    // shortfall became debt AND the unpaid interest went onto the principal —
    // the same bill twice — and then again the next year, for the rest of the
    // life, because nothing in the game ever repossessed anything. Measured:
    // a $500 balance at 39 reached $257,327 by 60, with the interest rate
    // nowhere near able to explain it.
    let s = freshLife()
    s = runYears(s, 30)
    if (s.dead) return
    s = {
      ...s, money: 0, career: null, debt: 0,
      assets: {
        properties: [{ typeId: 'terraced_house', currentValue: 120000, mortgage: 90000, purchaseYear: s.currentYear - 1 }],
        vehicles: [],
      },
    }
    // Held penniless each year on purpose: `tickLifeCourse` hands out a job to
    // anybody who does not have one, so a plain eight-year run re-employs the
    // character and they service the mortgage — which is correct behaviour and
    // not what this test is about.
    for (let y = 0; y < 8 && !s.dead && s.assets.properties.length; y++) {
      s = { ...s, money: 0, career: null, retired: true }
      s = tick(s)
      if (s.pendingEvent) s = { ...s, pendingEvent: null }
      if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
      if (s.pendingTrial) s = { ...s, pendingTrial: null }
    }
    if (s.dead) return
    expect(s.assets.properties.length, 'a house nobody can pay for is not kept forever').toBe(0)
    expect(s.flags).toContain('lost_home')
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
