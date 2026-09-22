/**
 * scripts/lib/sim.js
 *
 * Headless simulation harness — the only audit here that can see what the game
 * actually does.
 *
 * Every static check in this directory reasons about whether content COULD
 * fire. None of them can tell you that the contemplative layer is taking 70%
 * of every life, that 14,808 lines of year texture reach 2% of years, or that
 * a 1962 Nigerian dies at 8. Those are properties of the running engine and
 * only appear when you run it. So this runs the real engine — the real store,
 * the real tick, the real selector — over whole lives and reports what came
 * out the other end.
 *
 * It is deliberately tolerant of an engine mid-change: a life that throws is
 * recorded and the run continues, because a crash report is more useful than
 * no numbers at all.
 */

import fs from 'node:fs'
import path from 'node:path'
import { registerResolveHooks } from './register.js'
import { idIndex } from './corpus.js'

registerResolveHooks()

// The store writes saves on every age-up; in node there is no localStorage and
// the whole run would die on the first year.
function stubStorage() {
  if (globalThis.localStorage) return
  const mem = new Map()
  globalThis.localStorage = {
    getItem: k => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: k => mem.delete(k),
    clear: () => mem.clear(),
  }
}

/**
 * The distinct prose lines authored in a file.
 *
 * Needed because the prose layers are the one body of writing no audit could
 * see: yearTexture.js held 7,588 lines behind a first-match-wins if-chain and
 * 9.3% of them ever reached a player. Static analysis says a guard COULD pass.
 * Only running the engine says which line a year actually printed.
 */
function prosePool(rel) {
  const abs = path.join(process.cwd(), rel)
  if (!fs.existsSync(abs)) return new Set()
  const src = fs.readFileSync(abs, 'utf8')
  const out = new Set()
  for (const m of src.matchAll(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/gs)) {
    const t = m[2]
    if (t.length > 40 && /[a-z] [a-z]/.test(t) && !t.includes('\\n')) {
      out.add(t.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`'))
    }
  }
  return out
}

export const PROSE_LAYERS = [
  ['yearTexture', 'src/engine/yearTexture.js'],
  ['mundaneLayer', 'src/engine/mundaneLayer.js'],
]

export const DEFAULT_CONFIGS = [
  ['Nigeria', 1962],        // the life the whole project is named for
  ['United States', 1950],
  ['India', 1975],
  ['Germany', 1970],
  ['Japan', 1980],
  ['Brazil', 1995],
  ['Ethiopia', 1974],       // an entire country's content was unreachable
  ['Kenya', 1985],
  ['Russia', 1960],
  ['Egypt', 1990],
]

/** Which authored body of work an event id came from. */
export function moduleBucket(file) {
  if (!file) return 'unlocated'
  if (/\/geographic\//.test(file)) return 'geographic'
  if (/\/specific_lives\//.test(file)) return 'specific_lives'
  if (/\/sonder\//.test(file)) return 'sonder'
  if (/followthrough/.test(file)) return 'followthrough'
  if (/\/lifecycle\//.test(file)) return 'lifecycle'
  if (/\/thematic\//.test(file)) return 'thematic'
  if (/\/prison\//.test(file)) return 'prison'
  if (/careers\.js$/.test(file)) return 'career'
  if (/events\.js$/.test(file)) return 'base'
  if (/^src\/engine\//.test(file)) return 'engine'
  return 'other'
}

/** events_nigeria_depth.js → nigeria, so "distinct countries covered" is countable. */
export function countrySlug(file) {
  const m = file?.match(/events_([a-z_0-9]+)\.js$/)
  if (!m) return null
  return m[1].replace(/_depth(_\d+)?$/, '').replace(/_arcs?(_\d+)?$/, '').replace(/_\d+$/, '')
}

const quantile = (sorted, q) => {
  if (!sorted.length) return null
  const pos = (sorted.length - 1) * q
  const lo = Math.floor(pos), hi = Math.ceil(pos)
  return lo === hi ? sorted[lo] : Math.round(sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo))
}

export async function runSimulation({
  configs = DEFAULT_CONFIGS,
  lives = 12,
  mode = 'active',
  maxYears = 110,
  seedLabel = '',
  // Opt-in: record every distinct prose line with the year and the country the
  // character was living in when it printed, so a caller can check the line
  // against the world it claimed. Off by default because it holds every
  // sentence of the run in memory.
  collectLines = false,
  // Opt-in: keep each life's final state, for the death-screen checks. Same
  // reason it is off by default.
  keepFinalStates = false,
} = {}) {
  stubStorage()
  // The engine is under active change; a module that will not even load should
  // be reported as one clear line, not as a stack trace from inside a harness.
  let tick, resolveAutoEvent, resolveChoice, useGameStore, classifyEvent
  try {
    ;({ tick, resolveAutoEvent, resolveChoice } = await import('../../src/engine/tick.js'))
    ;({ useGameStore } = await import('../../src/store/gameStore.js'))
    ;({ classifyEvent } = await import('../../src/data/events.js'))
  } catch (err) {
    return {
      fatal: `the engine could not be loaded: ${err.message}`,
      mode, configs: [], totals: { lives: 0, years: 0, errors: [err.message] },
      byBucket: new Map(), countriesSeen: new Set(), unlocated: new Map(), otherFiles: new Map(),
      share: {}, per100Lives: {}, glimpsesPerLife: 0,
    }
  }
  const index = idIndex()

  const totals = {
    lives: 0, years: 0, errors: [],
    events: 0, contemplative: 0, anchored: 0, earned: 0, universal: 0,
    choice: 0, glimpse: 0, texture: 0, mundane: 0, world: 0, headline: 0,
    longestContemplativeRun: 0,
  }
  const byBucket = new Map()
  const countriesSeen = new Set()
  const textureFired = new Map()   // prose line → times it printed
  const mundaneFired = new Map()
  // Repetition is a per-LIFE property: the same sentence twice across two
  // characters is fine, twice to one character is the defect. Measured at 15.6%
  // of all prose output before the prose layers began preferring unheard lines,
  // with one life hearing the same sentence fourteen times.
  const repeat = { printed: 0, repeated: 0, worst: 0, worstLine: '' }
  const unlocated = new Map()   // event id → times fired, for ids the index cannot place
  // text → { year, country } for the EARLIEST year the line printed, which is
  // the firing most likely to be the anachronism.
  const linesWithContext = collectLines ? new Map() : null
  const finalStates = keepFinalStates ? [] : null
  const otherFiles = new Map()
  const perConfig = []

  for (const [countryName, birthYear] of configs) {
    const rec = {
      country: countryName, birthYear, lives: 0, years: 0,
      deaths: [], survivedChildhood: [], under5: 0,
      contemplative: 0, events: 0, texture: 0, errors: 0,
      buckets: new Map(),
    }
    for (let i = 0; i < lives; i++) {
      let s
      try {
        useGameStore.getState().startCuratedGame({ country: countryName, birthYear })
        s = { ...useGameStore.getState(), mode }
      } catch (err) {
        totals.errors.push(`${countryName}/${birthYear}: startCuratedGame threw: ${err.message}`)
        rec.errors++
        continue
      }
      totals.lives++; rec.lives++
      let run = 0
      const saidThisLife = new Map()

      for (let y = 0; y < maxYears && !s.dead; y++) {
        const before = s.log.length
        try {
          s = tick(s)
          const ev = s.pendingEvent
          if (ev) {
            totals.events++; rec.events++
            // Classify before reading the register. Events reached through the
            // QUEUE return from getNextEvent before the pool is classified, and
            // so do the ones built at runtime (illness_diabetes_53, the parole
            // event, anything injected by a choice). Defaulting those to
            // 'universal' reported the generic register at 15% of every year
            // when a direct count of fired events puts it at 3.8% — the report
            // was measuring its own blind spot.
            classifyEvent(ev)
            const register = ev.register ?? (ev.contemplative ? 'contemplative' : 'universal')
            // 'contemplative' is counted once, below — incrementing it here too
            // would report the layer at twice its real share.
            if (register !== 'contemplative' && register in totals) totals[register]++
            if (ev.contemplative || register === 'contemplative') {
              totals.contemplative++; rec.contemplative++
              run++
              if (run > totals.longestContemplativeRun) totals.longestContemplativeRun = run
            } else run = 0
            if (ev.isGlimpse) totals.glimpse++
            if (ev.choices?.length) totals.choice++

            const loc = index.get(ev.id)
            const bucket = moduleBucket(loc?.file)
            // 'unlocated' is not a defect: illness events build their id at
            // runtime (illness_diabetes_53), so no source line declares it.
            if (bucket === 'unlocated') unlocated.set(ev.id, (unlocated.get(ev.id) ?? 0) + 1)
            else if (bucket === 'other') otherFiles.set(loc.file, (otherFiles.get(loc.file) ?? 0) + 1)
            byBucket.set(bucket, (byBucket.get(bucket) ?? 0) + 1)
            rec.buckets.set(bucket, (rec.buckets.get(bucket) ?? 0) + 1)
            if (bucket === 'geographic') {
              const slug = countrySlug(loc?.file)
              if (slug) countriesSeen.add(slug)
            }

            s = ev.isAutomatic || !ev.choices?.length
              ? resolveAutoEvent(s)
              : resolveChoice(s, Math.floor(Math.random() * ev.choices.length))
            if (s.pendingEvent) s = { ...s, pendingEvent: null } // never stall the run
          }
          if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
          if (s.pendingTrial) {
            useGameStore.setState(s)
            useGameStore.getState().resolveTrial('none')
            s = { ...useGameStore.getState(), mode }
          }
        } catch (err) {
          totals.errors.push(`${countryName}/${birthYear} @age ${s.age}: ${err.message}`)
          rec.errors++
          break
        }
        totals.years++; rec.years++
        for (const entry of s.log.slice(before)) {
          if (entry.isTexture) {
            totals.texture++; rec.texture++
            textureFired.set(entry.text, (textureFired.get(entry.text) ?? 0) + 1)
          }
          if (entry.isMundane) {
            totals.mundane++
            mundaneFired.set(entry.text, (mundaneFired.get(entry.text) ?? 0) + 1)
          }
          if (entry.isTexture || entry.isMundane) {
            const n = (saidThisLife.get(entry.text) ?? 0) + 1
            saidThisLife.set(entry.text, n)
            repeat.printed++
            if (n > 1) repeat.repeated++
            if (n > repeat.worst) { repeat.worst = n; repeat.worstLine = entry.text }
          }
          if (entry.isWorld) totals.world++
          if (entry.isHeadline) totals.headline++
          if (linesWithContext && entry.text && !entry.isHeadline && !entry.isSoundtrack) {
            const year = entry.year ?? s.currentYear
            const prev = linesWithContext.get(entry.text)
            if (!prev || year < prev.year) {
              linesWithContext.set(entry.text, { year, country: s.currentCountry ?? s.character?.country ?? null })
            }
          }
        }
      }
      if (finalStates) finalStates.push(s)
      rec.deaths.push(s.age)
      if (s.age < 5) rec.under5++
      else rec.survivedChildhood.push(s.age)
    }
    const sorted = [...rec.deaths].sort((a, b) => a - b)
    const adult = [...rec.survivedChildhood].sort((a, b) => a - b)
    rec.medianDeathAge = quantile(sorted, 0.5)
    rec.q1DeathAge = quantile(sorted, 0.25)
    rec.q3DeathAge = quantile(sorted, 0.75)
    rec.medianAdultDeathAge = quantile(adult, 0.5)
    // Exposed so a caller can tell a real signal from a small-sample median:
    // in a harsh configuration this can be a dozen values, and the median of a
    // dozen swings hard enough to fail an assertion on its own.
    rec.adultDeaths = adult
    perConfig.push(rec)
  }

  const pct = k => (totals.years ? (100 * totals[k]) / totals.years : 0)
  return {
    fatal: null,
    mode, seedLabel, configs: perConfig, totals, byBucket, countriesSeen, unlocated, otherFiles,
    linesWithContext, finalStates,
    share: {
      contemplative: pct('contemplative'),
      anchored: pct('anchored'),
      earned: pct('earned'),
      universal: pct('universal'),
      choice: pct('choice'),
      texture: pct('texture'),
      mundane: pct('mundane'),
      anyEvent: pct('events'),
      world: pct('world'),
    },
    per100Lives: Object.fromEntries(
      [...byBucket].map(([k, v]) => [k, totals.lives ? Math.round((100 * v) / totals.lives) : 0])
    ),
    glimpsesPerLife: totals.lives ? totals.glimpse / totals.lives : 0,
    prose: proseCoverage([['yearTexture', textureFired], ['mundaneLayer', mundaneFired]]),
    repetition: {
      ...repeat,
      share: repeat.printed ? (100 * repeat.repeated) / repeat.printed : 0,
    },
  }
}

/**
 * How much of each prose layer a run actually printed.
 *
 * `concentration` is the number of distinct lines supplying half of all output
 * from that layer — the number that made the old yearTexture's problem legible
 * when the coverage percentage alone still looked survivable. 122 lines out of
 * 7,588 were carrying half of every life.
 */
function proseCoverage(layers) {
  const out = {}
  for (const [name, fired] of layers) {
    const rel = PROSE_LAYERS.find(([n]) => n === name)?.[1]
    const pool = rel ? prosePool(rel) : new Set()
    const matched = [...fired.keys()].filter(k => pool.has(k)).length
    const counts = [...fired.values()].sort((a, b) => b - a)
    const total = counts.reduce((a, b) => a + b, 0)
    let acc = 0, concentration = 0
    while (concentration < counts.length && acc < total / 2) acc += counts[concentration++]
    out[name] = {
      authored: pool.size,
      fired: fired.size,
      matched,
      coverage: pool.size ? (100 * matched) / pool.size : 0,
      concentration,
      printed: total,
    }
  }
  return out
}
