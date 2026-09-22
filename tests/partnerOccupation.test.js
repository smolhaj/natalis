import { describe, it, expect } from 'vitest'
import { partnerOccupation } from '../src/engine/character.js'
import { COUNTRIES } from '../src/data/countries.js'

const draw = (name, year, rural, gender, n = 400) => {
  const c = COUNTRIES.find(x => x.name === name)
  const st = { currentCountry: c, currentYear: year, ruralUrban: rural ? 'rural' : 'urban', character: { country: c } }
  const out = new Map()
  for (let i = 0; i < n; i++) {
    const o = partnerOccupation(st, gender)
    out.set(o, (out.get(o) ?? 0) + 1)
  }
  return out
}

// The list was forty-three modern Western job titles drawn with a bare
// pickFrom, so a woman married in rural Upper Egypt in 1969 was a Barista and a
// woman married in Tokyo in 1959 was a Personal Trainer.
describe('the person you are with has a job that existed', () => {
  it('never hands out a job before it existed', () => {
    const modern = ['Software Engineer', 'Barista', 'Personal Trainer', 'Graphic Designer', 'Event Planner', 'Freelancer', 'Consultant', 'Marketing Director']
    for (const [name, year] of [['Egypt', 1969], ['Japan', 1959], ['Germany', 1935], ['Nigeria', 1962], ['India', 1950]]) {
      const got = draw(name, year, false, 'female')
      for (const m of modern) {
        expect(got.get(m) ?? 0, `${m} in ${name} ${year}`).toBe(0)
      }
    }
  })

  it('does not put a barista in a village', () => {
    const got = draw('Egypt', 2015, true, 'female')
    expect(got.get('Barista') ?? 0).toBe(0)
    expect(got.get('Software Engineer') ?? 0).toBe(0)
  })

  it('gives most of the world the work most of the world did', () => {
    // Household and farm work is what the original list did not contain at
    // all, which was itself a statement.
    const got = draw('Nigeria', 1962, true, 'female')
    const staples = ['Farmer', 'Runs the household', 'Market Trader', 'Labourer']
    const share = staples.reduce((a, k) => a + (got.get(k) ?? 0), 0) / 400
    expect(share, 'share of rural 1962 Nigerian partners in farm/household/trade work').toBeGreaterThan(0.4)
  })

  it('still reaches the modern professions in the years they exist', () => {
    const got = draw('United States', 2015, false, 'female')
    const modern = ['Software Engineer', 'Barista', 'Graphic Designer', 'Consultant']
    expect(modern.some(m => (got.get(m) ?? 0) > 0), 'a modern job somewhere in 400 draws').toBe(true)
  })

  it('always returns something', () => {
    for (const c of COUNTRIES) {
      for (const year of [1905, 1955, 2005, 2075]) {
        for (const rural of [true, false]) {
          const st = { currentCountry: c, currentYear: year, ruralUrban: rural ? 'rural' : 'urban', character: { country: c } }
          expect(typeof partnerOccupation(st, 'male'), `${c.name} ${year}`).toBe('string')
          expect(typeof partnerOccupation(st, 'female'), `${c.name} ${year}`).toBe('string')
        }
      }
    }
  })
})
