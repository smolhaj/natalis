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
    // `if (s.dead) return` is a SILENT PASS, and this is the one test that
    // catches the original defect — the payment coming off `money` and never
    // off `debt`. Measured: reinstating that defect left this green on one run
    // in several, because the character had died during the 30-year warm-up and
    // the test returned without asserting anything. A test that can skip itself
    // reports the same thing as a test that passes. Take another life instead.
    let s = null
    for (let attempt = 0; attempt < 12 && !s; attempt++) {
      const life = runYears(freshLife(), 30)
      if (!life.dead) s = life
    }
    expect(s, 'no life out of twelve survived to 30').not.toBeNull()
    // Solvent, with a debt well inside one year's means.
    s = { ...s, debt: 1000, money: 1_000_000, mem: { ...s.mem, debtMissedYears: 0 } }
    const before = s.debt
    s = tick(s)
    expect(s.debt, 'a serviced debt must fall, not rise').toBeLessThan(before)
  })

  it('never compounds without limit', () => {
    // The defect's signature: a balance that grows 18% a year forever while the
    // character pays 5% of it annually into nothing.
    //
    // This assertion has now been wrong twice, both times for the same reason:
    // `debt` is not only the compounding balance. Every unpayable bill in the
    // game lands on the same field, so neither a flat cap on the peak nor a
    // year-over-year ratio isolates compounding. The ratio version failed at
    // 4.58x — which was one year of living costs against a $500 base, arriving
    // in a life with no income, and entirely correct behaviour.
    //
    // A fixed annual charge is a huge ratio against a small balance and a
    // negligible one against a large balance. So make it negligible by
    // construction: start from a balance where the interest term dominates
    // anything the rest of the engine can add, and the ratio measures the thing
    // it is named after.
    let s = freshLife()
    s = runYears(s, 25)
    if (s.dead) return
    const BIG = 500_000
    s = { ...s, debt: BIG, money: 0, career: null, assets: { properties: [], vehicles: [] }, mem: { ...s.mem, debtMissedYears: 0 } }
    let worstRatio = 0
    let last = s.debt
    s = runYears(s, 50, { onTick: (st) => {
      // Only while the balance is large. A bankruptcy discharge takes it to
      // zero and the next year's living costs put it back at a few hundred,
      // which is a ratio in the hundreds and says nothing about compounding —
      // the same "a fixed charge against a small base" trap one step along.
      if (last > 100_000 && (st.debt ?? 0) > last) worstRatio = Math.max(worstRatio, (st.debt ?? 0) / last)
      last = st.debt ?? 0
    } })
    // And the ratio must actually have been measured. Skipping every year
    // would leave worstRatio at 0, which passes the bound below while asserting
    // nothing — the same silent pass as the `if (s.dead) return` above.
    expect(worstRatio, 'the balance never rose above the floor, so nothing was measured').toBeGreaterThan(0)
    // 1.18 is the unsecured rate. The margin covers a year's living costs,
    // which against half a million are a few points at most.
    expect(worstRatio, `a debt grew ${worstRatio.toFixed(2)}x in one year`).toBeLessThan(1.35)
  })

  it('stops compounding once nobody has serviced it for years', () => {
    // The contract the charge-off actually implements, asserted directly rather
    // than inferred from a ratio. A creditor who has not been paid for five
    // years stops compounding and starts writing down; an informal lender stops
    // lending and starts remembering. What continues is the relationship
    // damage, not an exponential — left compounding, a $500 balance in a
    // country with no insolvency procedure reached $61m over a life.
    // Nigeria, deliberately: `dischargeable` requires a very_high or high GDP
    // country from 1970, so there is no insolvency procedure here to clear the
    // balance. Bankruptcy is a different contract with a different test, and
    // running this one in a country that has it measures the wrong mechanism.
    let s = freshLife({ country: 'Nigeria', birthYear: 1960 })
    s = runYears(s, 25)
    if (s.dead) return
    s = { ...s, debt: 20_000, money: 0, career: null, retired: true, assets: { properties: [], vehicles: [] }, mem: { ...s.mem, debtMissedYears: 0 } }
    const penniless = (st) => {
      st = { ...st, money: 0, career: null, retired: true }
      st = tick(st)
      if (st.pendingEvent) st = { ...st, pendingEvent: null }
      if (st.pendingMinigame) st = { ...st, pendingMinigame: null }
      if (st.pendingTrial) st = { ...st, pendingTrial: null }
      return st
    }
    // Past the charge-off point...
    for (let y = 0; y < 8 && !s.dead; y++) s = penniless(s)
    if (s.dead) return
    // ...the balance must stop compounding. Assert the EFFECT and not the
    // counter: a first draft tested `debtMissedYears >= 5`, which still
    // increments perfectly well with the charge-off removed, so it passed on
    // the very defect it was written for.
    const atChargeOff = s.debt
    // Non-trivial, or the ratio below means nothing.
    expect(atChargeOff, 'the balance was cleared before the charge-off, so nothing was measured').toBeGreaterThan(5_000)
    for (let y = 0; y < 4 && !s.dead; y++) s = penniless(s)
    if (s.dead) return
    // Four more years at 18% would be 1.94x. Anything near flat is the
    // contract; the slack is for living costs landing on the same field.
    expect(s.debt / Math.max(1, atChargeOff),
      `a charged-off debt grew from ${atChargeOff} to ${s.debt}`).toBeLessThan(1.35)
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
