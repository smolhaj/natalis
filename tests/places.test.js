import { describe, it, expect } from 'vitest'
import { PLACES, pickBirthPlace, pickNeighborhoodTier, pickNamedNeighborhood } from '../src/data/places.js'
import { COUNTRIES } from '../src/data/countries.js'

const TIERS = ['informal', 'working_class', 'middle_class', 'elite']
const VALID_TYPES = new Set(['urban', 'rural'])
const VALID_SCALES = new Set(['megacity', 'major_city', 'city', 'mid_city', 'town', 'village'])

describe('places', () => {
  // The one that matters. 71 of 154 countries had no place at all, which is
  // invisible to every rate: the event and texture counts come out identical
  // either side of it, because REGISTER_SHARES fills the anchored bucket from
  // country and era guards when the place guards cannot answer. What it cost was
  // that a character in almost half the roster was never told where they lived —
  // LifeScreen renders the location bar behind `{livePlace && ...}` — and that
  // the 64 guards reading G.place?.type / ?.scale / ?.region could not fire.
  it('every country on the roster has at least one place', () => {
    const covered = new Set(PLACES.map(p => p.country))
    const missing = COUNTRIES.filter(c => !covered.has(c.name)).map(c => c.name)
    expect(missing).toEqual([])
  })

  it('every place belongs to a country on the roster', () => {
    const roster = new Set(COUNTRIES.map(c => c.name))
    const orphans = PLACES.filter(p => !roster.has(p.country)).map(p => `${p.id} (${p.country})`)
    expect(orphans).toEqual([])
  })

  it('place ids are unique', () => {
    const seen = new Map()
    const dups = []
    for (const p of PLACES) {
      if (seen.has(p.id)) dups.push(p.id)
      seen.set(p.id, true)
    }
    expect(dups).toEqual([])
  })

  it('every place carries all four neighbourhood tiers, non-empty', () => {
    const bad = []
    for (const p of PLACES) {
      for (const t of TIERS) {
        if (!Array.isArray(p.neighborhoods?.[t]) || p.neighborhoods[t].length === 0) bad.push(`${p.id}.${t}`)
      }
    }
    expect(bad).toEqual([])
  })

  it('type and scale are values the engine understands', () => {
    const bad = PLACES.filter(p => !VALID_TYPES.has(p.type) || !VALID_SCALES.has(p.scale))
    expect(bad.map(p => `${p.id}: ${p.type}/${p.scale}`)).toEqual([])
  })

  // pickBirthPlace is the only consumer that can silently return null, and a
  // null there is what leaves a character born nowhere.
  it('pickBirthPlace returns a place for every country, rural and urban', () => {
    const failures = []
    for (const country of COUNTRIES) {
      for (const ru of ['rural', 'suburban', 'urban']) {
        const place = pickBirthPlace(country, ru, 2)
        if (!place) { failures.push(`${country.name}/${ru}`); continue }
        if (place.country !== country.name) failures.push(`${country.name}/${ru} -> ${place.country}`)
        const tier = pickNeighborhoodTier(2)
        const name = pickNamedNeighborhood(place, tier, {})
        if (!name) failures.push(`${country.name}/${ru}: no neighbourhood name for ${tier}`)
      }
    }
    expect(failures).toEqual([])
  })
})
