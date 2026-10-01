// Historical series read across the engine and the content: literacy and
// urbanisation by birth year. Moved from engine/character.js so a content
// module can import them without importing the engine.

// countries.js carries per-era series for literacy and urbanisation
// (`literacyHistory`, `urbanHistory`). Before these existed, a single modern
// snapshot was applied to every birth year with a token era nudge, so a woman
// born in 1950 India drew ~39-54% literacy odds against a real ~9%. Same shape
// and same lerp as HISTORICAL_IMR in tick.js.
export function lerpSeries(table, year, read = (v) => v) {
  if (!table) return null
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b)
  if (keys.length === 0) return null
  if (year <= keys[0]) return read(table[keys[0]])
  if (year >= keys[keys.length - 1]) return read(table[keys[keys.length - 1]])
  for (let i = 0; i < keys.length - 1; i++) {
    if (year >= keys[i] && year <= keys[i + 1]) {
      const t = (year - keys[i]) / (keys[i + 1] - keys[i])
      const a = read(table[keys[i]]), b = read(table[keys[i + 1]])
      if (a == null || b == null) return a ?? b
      return a * (1 - t) + b * t
    }
  }
  return null
}

export function literacyChanceFor(country, gender, birthYear) {
  const hist = lerpSeries(country?.literacyHistory, birthYear, (v) => gender === 'female' ? v?.f : v?.m)
  if (hist != null) return Math.max(0.01, Math.min(0.999, hist))
  // Fallback for countries without a series yet: the old snapshot + era nudge.
  const base = gender === 'female' ? (country?.literacyFemale ?? 0.95) : (country?.literacyMale ?? 0.97)
  const poor = ['low', 'very_low', 'low_medium'].includes(country?.gdp)
  const adj = birthYear < 1960 && poor ? -0.15 : birthYear < 1980 && ['low', 'very_low'].includes(country?.gdp) ? -0.10 : 0
  return Math.max(0.05, base + adj)
}

export function urbanChanceFor(country, birthYear) {
  const hist = lerpSeries(country?.urbanHistory, birthYear)
  if (hist != null) return Math.max(0.02, Math.min(0.99, hist))
  const base = country?.urbanRate ?? 0.65
  const adj = birthYear < 1960 ? -0.15 : birthYear < 1980 ? -0.07 : 0
  return Math.max(0.05, Math.min(0.98, base + adj))
}

