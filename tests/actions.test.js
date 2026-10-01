// The player's verbs: what the activities panel offers, what the store lets
// through, and what a save carries. Each block pins a defect a review found by
// pressing the buttons: a catalogue that ignored where and when the character
// was, verbs that never spent the year's budget, money buttons that printed
// money, an emigration list that was the roster in alphabetical order, and
// saves that froze the country data they were written with.
import { describe, it, expect, beforeEach } from 'vitest'
import fs from 'fs'
import path from 'path'

const store = {}
let failWrites = false
globalThis.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { if (failWrites) throw new Error('QuotaExceededError'); store[k] = String(v) },
  removeItem: k => { delete store[k] },
}

const { useGameStore } = await import('../src/store/gameStore.js')
const PA = await import('../src/engine/playerActions.js')
const { COUNTRIES } = await import('../src/data/countries.js')
const { CRIMES, crimeArrestRisk, crimeBarred } = await import('../src/data/crimes.js')
const { marketReturn } = await import('../src/data/activities.js')
const { destinationsFor, exitClosed } = await import('../src/data/exitRules.js')

const S = () => useGameStore.getState()
const clearStorage = () => { for (const k of Object.keys(store)) delete store[k] }
const C = (n) => COUNTRIES.find(c => c.name === n)

function setupAt(age, { country = 'Germany', birthYear = 1970, ...rest } = {}) {
  S().setMode('active')
  S().startCuratedGame({ country, birthYear })
  useGameStore.setState({ age, currentYear: birthYear + age, dead: false, screen: 'life', actionsThisYear: 0, pendingEvent: null, pendingTrial: null, ...rest })
  return S()
}

// The touchstone the review used: a Yoruba farm hand in a village in 1981.
function farmHand() {
  const s = setupAt(19, { country: 'Nigeria', birthYear: 1962 })
  const village = s.currentPlace?.type === 'rural' ? s.currentPlace : { id: 'test_village', name: 'A village', type: 'rural', country: 'Nigeria' }
  useGameStore.setState({
    currentPlace: village, money: 0, classTier: 2,
    career: { id: 'farm_hand', title: 'Farm Hand', field: 'agriculture', level: 0, salary: 1000, baseSalary: 2500 },
  })
  return S()
}

beforeEach(() => { clearStorage(); failWrites = false })

describe('what the panel offers is what existed, here, then', () => {
  it('does not offer a Nigerian farm hand in 1981 the suburban catalogue', () => {
    const s = farmHand()
    expect(PA.surgeryOptions(s), 'no facelift').toEqual([])
    const homes = PA.propertyOptions(s).map(p => p.id)
    for (const lux of ['ski_chalet', 'penthouse', 'beach_house', 'mansion', 'studio_flat']) expect(homes).not.toContain(lux)
    const bikes = PA.vehicleOptions(s).map(v => v.id)
    expect(bikes, 'a 1981 mountain bike is not his').not.toContain('bike_mountain')
    expect(PA.licenceOptions(s).map(l => l.id)).not.toContain('pilot')
    expect(PA.tripOptions(s).map(t => t.id), 'no $239 trip to Japan').not.toContain('japan_trip')
    expect(PA.petOptions(s).map(p => p.id)).not.toContain('hamster')
    expect(PA.petOptions(s).every(p => p.fee === 0), 'nobody charges for a neighbour\'s litter').toBe(true)
    expect(PA.casinoOpen(s)).toBe(false)
    expect(PA.racecourseOpen(s), 'no race card in a village').toBe(false)
    expect(PA.salonOptions(s).map(o => o.id)).toEqual(['haircut'])
    expect(PA.martialOptions(s).map(m => m.name), 'nigerian wrestling, not jiu-jitsu').toEqual(['Wrestling'])
  })

  it('offers the rich-world catalogue where and when it existed', () => {
    const s = setupAt(40, { country: 'United States', birthYear: 1960 })
    useGameStore.setState({ money: 400000, career: { id: 'x', title: 'Lawyer', field: 'law', level: 3, salary: 150000 }, licenceObtained: true })
    const t = S()
    expect(PA.surgeryOptions(t).length).toBeGreaterThan(0)
    expect(PA.casinoOpen({ ...t, currentPlace: { ...t.currentPlace, type: 'urban' } })).toBe(true)
    expect(PA.propertyOptions(t).map(p => p.id)).toContain('ski_chalet')
    expect(PA.martialOptions({ ...t, currentPlace: { type: 'urban' } }).map(m => m.name)).toContain('Judo')
    expect(s).toBeTruthy()
  })

  it('shows every price as the price charged', () => {
    setupAt(30, { country: 'Germany', birthYear: 1950 })
    useGameStore.setState({ money: 1e7, currentPlace: { id: 'x', name: 'Berlin', type: 'urban', country: 'Germany' } })
    const s = S()
    const flat = PA.propertyOptions(s).find(p => p.id === 'apartment')
    const after = PA.buyProperty(s, 'apartment')
    expect(s.money - after.money).toBe(flat.deposit)
    const clothes = PA.shoppingOptions(s).find(o => o.id === 'clothes')
    expect(s.money - PA.goShopping(s, 'clothes').money).toBe(clothes.cost)
  })

  it('refuses in the engine what the panel does not offer', () => {
    const s = farmHand()
    useGameStore.setState({ money: 1e6 })
    const rich = S()
    expect(PA.getPlasticSurgery(rich, 'facelift').money).toBe(rich.money)
    const healthy = { ...rich, stats: { ...rich.stats, health: 95 } }
    expect(PA.activityOffered(healthy, 'doctor'), 'a button that would do nothing is not offered').toBe(false)
    expect(PA.applyActivity(healthy, 'doctor')).toBe(healthy)
    expect(s).toBeTruthy()
  })
})

describe('the year has two actions in it', () => {
  it('spends the budget on every relationship verb', () => {
    setupAt(25, { country: 'United States', birthYear: 1970 })
    useGameStore.setState({ partner: PA.generatePartnerProfile(S()), parents: { mother: { name: 'M', alive: true, relationshipQuality: 50, currentAge: 50 }, father: null } })
    const before = S().stats.happiness
    for (let i = 0; i < 30; i++) { S().complimentPartner(); S().hookUp(); S().callParent('mother') }
    expect(S().actionsThisYear).toBe(2)
    expect(S().stats.happiness - before, 'thirty presses are two').toBeLessThanOrEqual(10)
  })

  it('emigrating takes the rest of the year, and makes nobody cleverer', () => {
    setupAt(30, { country: 'Nigeria', birthYear: 1962 })
    useGameStore.setState({ money: 1e6, education: { level: 'university' } })
    const smarts = S().stats.smarts
    S().emigrate('United Kingdom')
    expect(S().currentCountry.name).toBe('United Kingdom')
    expect(S().actionsThisYear).toBe(S().maxActionsPerYear)
    S().emigrate('Canada')
    expect(S().currentCountry.name, 'no second move this year').toBe('United Kingdom')
    expect(S().stats.smarts).toBe(smarts)
  })
})

describe('emigration', () => {
  it('lists where people from here went, by names that existed that year', () => {
    const s = farmHand()
    const names = destinationsFor(s)
    expect(names.length).toBeLessThanOrEqual(10)
    expect(names).toContain('United Kingdom')
    const { options } = PA.emigrationOptions(s)
    for (const o of options) {
      expect(o.note).not.toMatch(/_|post soviet|conflict zone|wealthy west/)
      expect(o.cost).toBeGreaterThan(0)
    }
    // Croatia did not exist to be moved to in 1981.
    const yugo = setupAt(25, { country: 'Germany', birthYear: 1956 })
    expect(PA.emigrationQuote(yugo, 'Croatia')?.name).toBe('Serbia')
    expect(PA.emigrationQuote(yugo, 'Croatia')?.display).toBe('Yugoslavia')
  })

  it('does not let a Soviet citizen buy a ticket out in 1950', () => {
    setupAt(30, { country: 'Russia', birthYear: 1920 })
    useGameStore.setState({ money: 1e6 })
    expect(exitClosed('Russia', 1950)).toBeTruthy()
    expect(PA.emigrationOptions(S()).closed).toBeTruthy()
    const money = S().money
    S().emigrate('United States')
    expect(S().currentCountry.name).toBe('Russia')
    expect(S().money).toBe(money)
  })

  it('leaves the job at the border', () => {
    setupAt(35, { country: 'Russia', birthYear: 1960 })
    useGameStore.setState({ money: 1e6, career: { id: 'merchant', title: 'Wholesale Merchant', field: 'trade', level: 2, salary: 629, baseSalary: 9000 } })
    S().emigrate('United States')
    expect(S().career, 'a Russian merchant does not land as a Trading Company Owner').toBeNull()
    expect(S().mem.careerLeftBehind?.title).toBe('Wholesale Merchant')
  })

  it('charges the quoted cost, deterministically', () => {
    setupAt(30, { country: 'Nigeria', birthYear: 1965 })
    useGameStore.setState({ money: 1e6 })
    const quote = PA.emigrationQuote(S(), 'United States')
    const before = S().money
    S().emigrate('United States')
    expect(before - S().money).toBe(quote.cost)
  })
})

describe('money buttons trade something for money', () => {
  it('saving needs an income and can be done once a year', () => {
    const s = setupAt(30, { country: 'United States', birthYear: 1970 })
    expect(PA.activityOffered({ ...s, career: null }, 'save'), 'nothing to save from').toBe(false)
    const working = { ...s, career: { id: 'x', title: 'Clerk', field: 'government', level: 0, salary: 30000 } }
    const once = PA.applyActivity(working, 'save')
    expect(once.money).toBeGreaterThan(working.money)
    expect(PA.activityOffered(once, 'save')).toBe(false)
    expect(PA.applyActivity({ ...once, actionsThisYear: 0 }, 'save').money).toBe(once.money)
  })

  it('overtime costs health and is once a year', () => {
    const s = setupAt(30, { country: 'United States', birthYear: 1970 })
    const working = { ...s, career: { id: 'x', title: 'Clerk', field: 'government', level: 0, salary: 30000 } }
    const done = PA.applyActivity(working, 'overtime')
    expect(done.stats.health).toBeLessThan(working.stats.health)
    expect(PA.activityOffered(done, 'overtime')).toBe(false)
  })

  it('shares return something positive over a long run, and collapse when the currency did', () => {
    let sum = 0
    for (let y = 1950; y < 2000; y++) for (let i = 0; i < 40; i++) sum += Math.log(1 + marketReturn(C('United States'), y))
    expect(sum / (50 * 40), 'positive mean log return').toBeGreaterThan(0)
    expect(marketReturn(C('Zimbabwe'), 2008)).toBeLessThan(-0.5)
  })

  it('a bet is a stake, not a tenth of everything', () => {
    const s = setupAt(30, { country: 'United States', birthYear: 1970 })
    const rich = { ...s, money: 1e6 }
    const after = PA.applyActivity(rich, 'gambling')
    expect(Math.abs(after.money - rich.money)).toBeLessThan(500)
  })
})

describe('crime', () => {
  it('insider trading needs access to inside information', () => {
    const s = farmHand()
    expect(crimeBarred(s, 'insider_trading')).toBeTruthy()
    expect(crimeBarred(s, 'corporate_fraud')).toBeTruthy()
    useGameStore.setState({ actionsThisYear: 0 })
    const before = S().log.length
    S().commitCrime('insider_trading')
    expect(S().log.length).toBe(before)
  })

  it('a leaflet in a democracy is not a 64% arrest', () => {
    const dissent = CRIMES.find(c => c.id === 'political_dissent')
    const us = { currentYear: 2010, currentCountry: C('United States'), character: { country: C('United States') } }
    const ussr = { currentYear: 1975, currentCountry: C('Russia'), character: { country: C('Russia') } }
    expect(crimeArrestRisk(dissent, us)).toBeLessThan(0.15)
    expect(crimeArrestRisk(dissent, ussr)).toBeGreaterThan(0.6)
  })
})

describe('marriage and its ending follow the place and the year', () => {
  it('does not say "They say yes" of a partner whose gender is known', () => {
    for (let i = 0; i < 20; i++) {
      const s = setupAt(24, { country: 'United States', birthYear: 1940 })
      const partner = { ...PA.generatePartnerProfile(s), relationshipQuality: 90, gender: 'female' }
      const next = PA.proposeMarriage({ ...s, partner })
      expect(next.log.at(-1).text).not.toMatch(/\bThey say\b/)
    }
  })

  it('separates rather than divorces in Ireland in 1980', () => {
    const s = setupAt(40, { country: 'Ireland', birthYear: 1940 })
    const partner = { ...PA.generatePartnerProfile(s), married: true }
    const next = PA.fileForDivorce({ ...s, partner })
    expect(next.flags).not.toContain('divorced')
    expect(next.log.at(-1).text).toMatch(/no divorce/)
  })
})

describe('saves', () => {
  it('a full storage does not throw out of Age Up', () => {
    setupAt(20, { country: 'Germany', birthYear: 1970 })
    failWrites = true
    expect(() => S().ageUp()).not.toThrow()
    expect(S().saveFailed).toBe(true)
  })

  it('loading replaces the life in memory rather than merging into it', () => {
    setupAt(25, { country: 'Germany', birthYear: 1970 })
    const slot = S().activeSaveSlot
    S().goToTitle()
    useGameStore.setState({ pendingPartner: { name: 'Somebody from another life' }, wanted: true })
    S().continueSaveSlot(slot)
    expect(S().pendingPartner).toBeNull()
    expect(S().wanted).toBe(false)
  })

  it('stores countries by name and rehydrates them from the roster', () => {
    setupAt(25, { country: 'Germany', birthYear: 1970 })
    const slot = S().activeSaveSlot
    S().goToTitle()
    const raw = JSON.parse(store[`natalis_v${slot + 1}`])
    expect(raw.currentCountry).toEqual({ $country: 'Germany' })
    expect(raw.character.country).toEqual({ $country: 'Germany' })
    S().continueSaveSlot(slot)
    expect(S().currentCountry).toBe(C('Germany'))
  })

  for (const file of ['v1_germany_1950_age40.json', 'v2_nigeria_1962_age28.json']) {
    it(`loads the old save ${file}`, () => {
      const raw = fs.readFileSync(path.join(import.meta.dirname, 'fixtures/saves', file), 'utf8')
      store.natalis_v3 = raw
      S().continueSaveSlot(2)
      const s = S()
      const name = JSON.parse(raw).character.country.name
      expect(s.saveVersion).toBe(3)
      expect(s.character.country, 'the roster object, not the frozen copy').toBe(C(name))
      expect(s.currentCountry).toBe(C(name))
      expect(s.mode).toBe(JSON.parse(raw).mode ?? 'active')
      expect(s.mem.lastContemplativeYear).toBeTypeOf('number')
      expect(() => S().ageUp()).not.toThrow()
      expect(S().age).toBeGreaterThanOrEqual(s.age)
    })
  }
})
