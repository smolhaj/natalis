import { describe, it, expect } from 'vitest'
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} }
const { HEADLINES, headlineFits } = await import('../src/data/headlines.js')
const { SOUNDTRACK, soundtrackFits } = await import('../src/data/soundtrack.js')
const { WORLD_EVENTS } = await import('../src/data/worldEvents.js')
const { COUNTRY_MAP } = await import('../src/data/countries.js')
const { buildMundaneLayer, proseFitsWorld, worldFacts, midSentence, privateMarketAt } = await import('../src/engine/mundaneLayer.js')
const { useGameStore } = await import('../src/store/gameStore.js')

// The global layers — headlines, the soundtrack, world events, and the generic
// prose of the year-texture and mundane layers — are the content every life
// passes through, so they are where a claim written for one place reaches all
// of them. A 22-life read found the same Anglo-American front pages and pop
// songs in most lives ("KABUL FALLS — AMERICA'S LONGEST WAR ENDS" in 13,
// "Gangnam Style" in 16), editorial codas on world events, and the market
// economy printed into Stalin's USSR and Kim Il Sung's Pyongyang.

const C = (name) => COUNTRY_MAP[name]
// A minimal state the fits functions read: where the character lives, where
// they were born, how old they are, and the year.
const at = (country, year, age, { born = country, rural = false } = {}) => ({
  currentYear: year,
  age,
  currentCountry: C(country),
  currentPlace: { type: rural ? 'rural' : 'urban' },
  character: { country: C(born), ruralUrban: rural ? 'rural' : 'urban' },
})
const headlinesFor = (...a) => HEADLINES.filter(h => headlineFits(h, at(...a))).map(h => h.text)
const soundtrackFor = (...a) => SOUNDTRACK.filter(s => soundtrackFits(s, at(...a))).map(s => s.text)

describe('headlines are the front page where you live', () => {
  it('scopes almost every headline to the countries whose papers led with it', () => {
    const unscoped = HEADLINES.filter(h => !h.countries && h.archetypes === 'all')
    // Hiroshima is the only one left with no country list at all.
    expect(unscoped.length).toBeLessThanOrEqual(2)
  })

  it('gives Kabul 2021 to the countries it was about, in their own words', () => {
    expect(headlinesFor('Nigeria', 2021, 40).some(t => t.includes('KABUL'))).toBe(false)
    expect(headlinesFor('United States', 2021, 40).some(t => t.includes('AMERICA\'S LONGEST WAR'))).toBe(true)
    const afghan = headlinesFor('Afghanistan', 2021, 40)
    expect(afghan.some(t => t.includes('TALIBAN ENTER KABUL'))).toBe(true)
    expect(afghan.some(t => t.includes('AMERICA\'S LONGEST WAR'))).toBe(false)
  })

  it('reads the live country, and keeps the news from home for an emigrant', () => {
    const inLondon = headlinesFor('United Kingdom', 1993, 30, { born: 'Nigeria' })
    expect(inLondon.some(t => t.includes('JUNE 12'))).toBe(true)
    expect(headlinesFor('Nigeria', 1984, 30).some(t => t.includes('MINERS'))).toBe(false)
  })

  it('does not print the moon or the towers into North Korea', () => {
    expect(headlinesFor('North Korea', 1969, 30)).toEqual([])
    expect(headlinesFor('North Korea', 2001, 30)).toEqual([])
  })

  it('names only countries that exist on the roster', () => {
    for (const h of HEADLINES) for (const n of h.countries ?? []) expect(C(n), n).toBeDefined()
  })
})

describe('the soundtrack is what was playing where you lived', () => {
  it('has no entry that reaches every country', () => {
    const everywhere = SOUNDTRACK.filter(s => !s.countries && s.archetypes === 'all')
    expect(everywhere).toEqual([])
  })

  it('gives every region music of its own', () => {
    const places = ['Nigeria', 'Ghana', 'Senegal', 'Kenya', 'Ethiopia', 'Zimbabwe', 'South Africa', 'DR Congo',
      'Russia', 'Kazakhstan', 'Poland', 'India', 'Pakistan', 'Egypt', 'Iran', 'Turkey', 'China', 'Japan',
      'South Korea', 'North Korea', 'Vietnam', 'Indonesia', 'Philippines', 'Brazil', 'Argentina', 'Mexico',
      'Cuba', 'Germany', 'France', 'United Kingdom']
    for (const p of places) {
      const own = SOUNDTRACK.filter(s => s.countries?.includes(p) && s.countries.length <= 20)
      expect(own.length, p).toBeGreaterThanOrEqual(2)
    }
  })

  it('does not give a ninety-year-old in rural Bavaria the streaming catalogue', () => {
    for (let y = 2003; y <= 2024; y++) {
      const heard = soundtrackFor('Germany', y, 90, { rural: true })
      expect(heard.filter(t => /Spotify|Netflix|iTunes|iPad|iPhone|TikTok/.test(t)), String(y)).toEqual([])
    }
  })

  it('keeps Gangnam Style and the internet out of Pyongyang', () => {
    expect(soundtrackFor('North Korea', 2012, 20).some(t => t.includes('Gangnam'))).toBe(false)
    expect(soundtrackFor('North Korea', 2012, 20).some(t => t.includes('Moranbong'))).toBe(true)
  })

  it('plays King Sunny Adé in Lagos in 1982', () => {
    expect(soundtrackFor('Nigeria', 1982, 20).some(t => t.includes('King Sunny Adé'))).toBe(true)
    expect(soundtrackFor('Nigeria', 1982, 20).some(t => t.includes('Thriller'))).toBe(false)
  })
})

describe('world events state facts, not morals', () => {
  const we = (id) => WORLD_EVENTS.find(w => w.id === id)
  const G = (country, extra = {}) => ({
    currentCountry: C(country), character: { country: C(country), gender: 'female' },
    currentYear: 2015, flags: [], ruralUrban: 'urban', tech: () => true, ...extra,
  })

  it('narrows 2008 to the economies it hit as a household event, with no closing sermon', () => {
    const e = we('financial_crisis_2008')
    expect(e.countries).not.toContain('Nigeria')
    expect(e.countries).not.toContain('Germany')
    for (const c of e.countries) {
      expect(e.narrative(G(c))).not.toMatch(/keep their bonuses/)
    }
  })

  it('reads the emissions claim from the country, not the archetype', () => {
    const paris = we('paris_agreement_2015')
    for (const c of ['China', 'India', 'Brazil', 'Iran', 'Mexico', 'United States']) {
      expect(paris.narrative(G(c)), c).not.toMatch(/one percent/)
    }
    expect(paris.narrative(G('Ghana'))).toMatch(/one percent/)
    expect(paris.narrative(G('Ghana'))).not.toMatch(/reparations/)
  })

  it('keeps the projected climate events few and placed', () => {
    const future = WORLD_EVENTS.filter(w => w.years[0] >= 2026 && w.years[0] <= 2059)
    expect(future.filter(w => !w.countries)).toEqual([])
    expect(future.length).toBeLessThanOrEqual(4)
  })

  it('does not tell Malaysia it is negotiating with the IMF', () => {
    const e = we('asian_financial_crisis_1997')
    expect(e.narrative(G('Malaysia', { currentYear: 1998 }))).not.toMatch(/negotiating with the IMF/)
  })

  it('does not send the oil shock bill to the countries that sold the oil', () => {
    const e = we('oil_shock_1973_periphery')
    expect(e.when(G('Nigeria', { currentYear: 1974 }))).toBe(false)
    expect(e.when(G('Ghana', { currentYear: 1974 }))).toBe(true)
  })
})

describe('the generic prose layers check the world they print into', () => {
  const facts = (country, year, rural = false) => worldFacts(at(country, year, 40, { rural }))

  it('has no landlord, mortgage or loan officer in a planned economy', () => {
    expect(privateMarketAt('Russia', 1948)).toBe(false)
    expect(privateMarketAt('North Korea', 2015)).toBe(false)
    expect(privateMarketAt('Russia', 1995)).toBe(true)
    const line = 'The landlord is a presence in the background, not physically but financially.'
    expect(proseFitsWorld(line, facts('Russia', 1948))).toBe(false)
    expect(proseFitsWorld(line, facts('United Kingdom', 1948))).toBe(true)
    expect(proseFitsWorld('The loan officer says congratulations.', facts('Russia', 1969))).toBe(false)
    // The class label is a different thing, and true of China.
    expect(proseFitsWorld('The landlord label, the rightist label — it follows the children.', facts('China', 1970))).toBe(true)
  })

  it('has the IMF only where the country had borrowed from it', () => {
    const line = 'Structural adjustment is the phrase on the radio.'
    expect(proseFitsWorld(line, facts('India', 1986))).toBe(false)
    expect(proseFitsWorld(line, facts('India', 1993))).toBe(true)
    expect(proseFitsWorld(line, facts('China', 1988))).toBe(false)
    expect(proseFitsWorld('The debt to the international lenders is a number.', facts('North Korea', 1990))).toBe(false)
  })

  it('has no social media in Pyongyang and no solicitor in New York', () => {
    expect(proseFitsWorld('Social media has made everyone a broadcaster.', facts('North Korea', 2020))).toBe(false)
    expect(proseFitsWorld('Your solicitor says the case is strong.', facts('United States', 2000))).toBe(false)
    expect(proseFitsWorld('Your solicitor says the case is strong.', facts('United Kingdom', 2000))).toBe(true)
  })

  it('lowercases a neighbourhood article set mid-sentence', () => {
    expect(`The water in ${midSentence('The huts past the ring road')} runs`).toBe('The water in the huts past the ring road runs')
    expect(midSentence('Kibera')).toBe('Kibera')
  })

  it('serves a Nigerian their own staple, not a list of the continent\'s', () => {
    useGameStore.getState().startCuratedGame({ country: 'Nigeria', birthYear: 1962 })
    const base = { ...useGameStore.getState() }
    const seen = new Set()
    for (let i = 0; i < 400; i++) {
      const line = buildMundaneLayer({ ...base, age: 30, currentYear: 1992, mem: {} })
      if (line) seen.add(line)
    }
    for (const line of seen) {
      expect(line).not.toMatch(/ugali|sadza/i)
    }
  })
})
