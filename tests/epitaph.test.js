// What the death screen says a life was about.
//
// The historical spine took the first two entries of `worldEventsFired`, which
// is the order things reached the character. A German born in 1925 who saw
// Kristallnacht, was bombed out, and was asked about it by his own children in
// 1968 was summed up as having lived through "the German Federal Election,
// March 1933 and the Fall of the Berlin Wall. Nobody ever asked him about
// either." Both halves were false of him.
import { describe, it, expect } from 'vitest'
import { createCharacter } from '../src/engine/character.js'
import { generateEpitaph, generateLifeNotes, worldEventPhrase, ribbonForDisplay } from '../src/engine/epitaph.js'
import { WORLD_EVENTS } from '../src/data/worldEvents.js'
import { COUNTRIES } from '../src/data/countries.js'

function lifeOf({ country = 'Germany', birthYear = 1925, gender = 'male', age = 78, flags = [], fired = [], ...rest }) {
  const character = createCharacter({ country, birthYear, gender })
  return {
    character, age, currentYear: birthYear + age, flags, worldEventsFired: new Set(fired),
    stats: { happiness: 50, health: 30, smarts: 50, looks: 50, charisma: 50, wealth: 40 },
    regret: 20, children: [], partner: null, money: 20000, mem: {}, siblings: [], assets: { properties: [], vehicles: [] },
    currentCountry: character.country, residencyStatus: 'citizen', career: null, fame: 0, legacy: 0,
    ...rest,
  }
}

describe('the historical spine', () => {
  const german = () => lifeOf({
    flags: ['de_kristallnacht_witness', 'de_bombed_out', 'de_told_the_children', 'de_reckoning_begun'],
    fired: ['we_germany_1933_reichstag', 'berlin_wall_fall'],
  })

  it('is what happened to this person before it is what happened in the decade', () => {
    for (let i = 0; i < 40; i++) {
      const ep = generateEpitaph(german())
      expect(ep).not.toMatch(/German Federal Election/)
      expect(ep).toMatch(/Kristallnacht|the bombing/)
    }
  })

  it('never says nobody asked when the record says somebody did', () => {
    for (let i = 0; i < 60; i++) expect(generateEpitaph(german())).not.toMatch(/Nobody ever asked/)
  })

  it('ranks world events by what they were, not by which came first', () => {
    const s = lifeOf({ fired: ['we_germany_1933_reichstag', 'jesse_owens_berlin_1936', 'berlin_wall_fall'] })
    for (let i = 0; i < 20; i++) expect(generateEpitaph(s)).not.toMatch(/Berlin Olympics/)
  })
})

describe('world-event names are data, not prose', () => {
  it('never pastes a dash suffix, a colon title or a bare "After" into a sentence', () => {
    for (const w of WORLD_EVENTS) {
      const p = worldEventPhrase(w)
      if (p == null) continue
      expect(p, w.id).not.toMatch(/ [—–] |: |^the After|^The /)
    }
  })

  it('reads "the years after Biafra", not "the After Biafra"', () => {
    const s = lifeOf({ country: 'Nigeria', birthYear: 1962, age: 60, fired: ['nigeria_biafra_aftermath', 'oil_shock_1973_periphery'] })
    const notes = generateLifeNotes(s).join(' ')
    expect(notes).not.toMatch(/the After Biafra|Import Burden/)
    expect(notes).toMatch(/the years after Biafra|the oil shock of 1973/)
  })
})

describe('citizenship', () => {
  it('is only "earned in an adopted country" by somebody living in one', () => {
    const home = lifeOf({ country: 'Egypt', birthYear: 1950, flags: ['emigrated'] })
    for (let i = 0; i < 20; i++) expect(generateEpitaph(home)).not.toMatch(/citizen/)
    const abroad = lifeOf({ country: 'Egypt', birthYear: 1950, flags: ['emigrated'] })
    abroad.currentCountry = COUNTRIES.find(c => c.name === 'Canada')
    expect(generateEpitaph(abroad)).toMatch(/citizen of Canada/)
  })
})

describe('the ribbon on the death screen', () => {
  const compromised = { id: 'the_compromised', name: 'The Compromised', description: 'You chose the easier path more than once. The regret accumulated.', color: 'red' }
  it('does not accuse a Witness-mode player of choices', () => {
    expect(ribbonForDisplay({ ribbon: compromised, age: 60, mode: 'passive' }).description).not.toMatch(/You chose/)
    expect(ribbonForDisplay({ ribbon: compromised, age: 60, mode: 'active' }).description).toMatch(/You chose/)
  })
  it('is not given to an infant', () => {
    expect(ribbonForDisplay({ ribbon: compromised, age: 0, mode: 'active' })).toBeNull()
  })
})
