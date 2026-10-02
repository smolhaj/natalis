import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { PLACES, pickBirthPlace, pickNeighborhoodTier, pickNamedNeighborhood } from '../src/data/places.js'
import { COUNTRIES } from '../src/data/countries.js'

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.js') ? [path.join(d, e.name)] : [])

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

  // `homeOf` is matched against the character's ethnicity id, so a typo or an
  // id from the neighbouring country is a homeland nobody is ever sent to.
  it('every homeOf names an ethnic group of the place\'s own country', () => {
    const bad = []
    for (const p of PLACES) {
      const groups = new Set((COUNTRIES.find(c => c.name === p.country)?.ethnicGroups ?? []).map(g => g.id))
      for (const id of p.homeOf ?? []) if (!groups.has(id)) bad.push(`${p.id}: ${id}`)
    }
    expect(bad).toEqual([])
  })

  // Two Okinawa events guarded on `jp_okinawa` and the Bhopal world event read
  // `place.name === 'Bhopal'` for years while neither place existed: a guard
  // naming a place the roster does not carry is false for every life, and no
  // rate shows it. Reads every place id or name a guard, list or move names.
  it('every place a guard or a move names exists', () => {
    const ids = new Set(PLACES.map(p => p.id))
    const names = new Set(PLACES.map(p => p.name))
    const ID_RE = /(?:place\??\.id|PLACE\(G\)|placeId|relocate\(|birthPlace\??\.id)\s*(?:[!=]==|:|\()?\s*['"]([a-z]{2}_[a-z0-9_]+)['"]/g
    const LIST_RE = /\[([^\]]*)\]\.includes\((?:PLACE\(G\)|G\.place\?\.id|G\.birthPlace\?\.id)\)/g
    const NAME_RE = /place\??\.name\s*[!=]==\s*['"]([^'"]+)['"]/g
    // Known and reported to the module's owner: the 9/11 event tests for
    // 'New York' and its boroughs, and the place is called 'New York City'.
    const KNOWN = new Set(['events_usa.js: name New York', 'events_usa.js: name Manhattan',
      'events_usa.js: name Brooklyn', 'events_usa.js: name Queens'])
    const bad = new Set()
    for (const f of walk(path.join(process.cwd(), 'src'))) {
      if (f.endsWith(`${path.sep}places.js`)) continue
      const src = fs.readFileSync(f, 'utf8')
      const tag = path.basename(f)
      for (const m of src.matchAll(ID_RE)) if (!ids.has(m[1])) bad.add(`${tag}: id ${m[1]}`)
      for (const m of src.matchAll(LIST_RE)) {
        for (const q of m[1].matchAll(/['"]([a-z]{2}_[a-z0-9_]+)['"]/g)) if (!ids.has(q[1])) bad.add(`${tag}: id ${q[1]}`)
      }
      for (const m of src.matchAll(NAME_RE)) if (!names.has(m[1])) bad.add(`${tag}: name ${m[1]}`)
    }
    expect([...bad].filter(b => !KNOWN.has(b))).toEqual([])
  })

  // A people's homeland is only a homeland if the draw sends them there.
  it('homeOf sends most of a group home', () => {
    const cases = [
      ['Iran', 'azerbaijani_iranian', ['ir_tabriz', 'ir_rural_azerbaijan']],
      ['Iran', 'kurd_iranian', ['ir_sanandaj', 'ir_rural_kurdistan']],
      ['Iran', 'arab_iranian', ['ir_ahvaz', 'ir_rural_khuzestan']],
      ['Iran', 'baloch_iranian', ['ir_zahedan', 'ir_rural_baluchestan']],
      ['China', 'zhuang', ['cn_nanning', 'cn_rural_guangxi']],
      ['China', 'hui_chinese', ['cn_yinchuan', 'cn_rural_ningxia']],
      ['China', 'uyghur', ['cn_kashgar', 'cn_rural_xinjiang']],
    ]
    const short = []
    for (const [name, eth, home] of cases) {
      const country = COUNTRIES.find(c => c.name === name)
      let n = 0
      for (let i = 0; i < 200; i++) {
        const ru = i % 2 ? 'rural' : 'urban'
        if (home.includes(pickBirthPlace(country, ru, 2, { ethnicity: eth })?.id)) n++
      }
      // 85% by construction; 70% leaves room for the draw at n=200.
      if (n < 140) short.push(`${eth}: ${n}/200`)
    }
    expect(short).toEqual([])
  })

  // Shenzhen is a place people arrived in. Nobody is born into the 1950
  // market town as if it were the megacity.
  it('arrival-only places are never drawn as birthplaces', () => {
    const china = COUNTRIES.find(c => c.name === 'China')
    let n = 0
    for (let i = 0; i < 500; i++) if (pickBirthPlace(china, 'urban', 2, { ethnicity: 'han_chinese' })?.id === 'cn_shenzhen') n++
    expect(n).toBe(0)
  })

  it('a named estate is not drawn for a year before it was built', () => {
    const glasgow = PLACES.find(p => p.id === 'uk_glasgow')
    for (let i = 0; i < 100; i++) {
      expect(pickNamedNeighborhood(glasgow, 'informal', { year: 1940 })).toBe('The Gorbals')
    }
  })
})
