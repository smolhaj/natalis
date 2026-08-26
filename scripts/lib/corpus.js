/**
 * scripts/lib/corpus.js
 *
 * Shared foundation for the reachability audits.
 *
 * The existing flag auditor reads the source as TEXT. That is why it could
 * report "2672 covered / 0 orphaned" while an entire country, the retirement
 * arc and the grief after a parent's death were unreachable: textual presence
 * is not reachability. Everything here works the other way round — the corpus
 * is IMPORTED, so a guard is read as the function the engine will actually
 * call, and the vocabularies (country names, ethnic ids, religion keys, the G
 * object's own property list) are derived from the real data rather than from
 * a hand-maintained list that can drift.
 *
 * Source text is still scanned, but only for two things it is genuinely good
 * at: mapping an event id back to the file and line a human has to open, and
 * finding every mechanism that SETS a flag.
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { registerResolveHooks } from './register.js'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

registerResolveHooks()

export const ROOT = fileURLToPath(new URL('../..', import.meta.url))

// ── Source files ──────────────────────────────────────────────────────────────

export function jsFilesIn(relDir) {
  const out = []
  let entries
  try { entries = readdirSync(join(ROOT, relDir)) } catch { return out }
  for (const entry of entries) {
    const abs = join(ROOT, relDir, entry)
    const rel = `${relDir}/${entry}`
    if (statSync(abs).isDirectory()) out.push(...jsFilesIn(rel))
    else if (extname(entry) === '.js') out.push({ rel, abs, content: readFileSync(abs, 'utf8') })
  }
  return out
}

let _files = null
export function sourceFiles() {
  if (!_files) _files = ['src/data', 'src/engine', 'src/store'].flatMap(jsFilesIn)
  return _files
}

// ── id → file:line ────────────────────────────────────────────────────────────
// So a finding says "open events_ethiopia.js line 412", not "some event".

let _idIndex = null
export function idIndex() {
  if (_idIndex) return _idIndex
  _idIndex = new Map()
  for (const { rel, content } of sourceFiles()) {
    const lines = content.split('\n')
    for (let i = 0; i < lines.length; i++) {
      for (const m of lines[i].matchAll(/(?:^|[\s{,([])id:\s*['"]([^'"]+)['"]/g)) {
        if (!_idIndex.has(m[1])) _idIndex.set(m[1], { file: rel, line: i + 1 })
      }
    }
  }
  return _idIndex
}

export function locate(id) {
  const hit = idIndex().get(id)
  return hit ? `${hit.file}:${hit.line}` : '(unlocated)'
}

// ── The corpus itself ─────────────────────────────────────────────────────────

let _corpus = null
export async function loadCorpus() {
  if (_corpus) return _corpus
  const [{ EVENTS }, { CAREERS }, { WORLD_EVENTS }, { COUNTRIES }, { HEADLINES }, { RIBBONS }] = await Promise.all([
    import('../../src/data/events.js'),
    import('../../src/data/careers.js'),
    import('../../src/data/worldEvents.js'),
    import('../../src/data/countries.js'),
    import('../../src/data/headlines.js'),
    import('../../src/data/ribbons.js'),
  ])
  const careerEvents = CAREERS.flatMap(c => (c.events ?? []).map(e => ({ ...e, __career: c.id })))
  _corpus = {
    EVENTS, CAREERS, WORLD_EVENTS, COUNTRIES, HEADLINES, RIBBONS,
    careerEvents,
    // Everything the selector can ever draw a character event from.
    allCharacterEvents: [...EVENTS, ...careerEvents],
  }
  return _corpus
}

// ── Guard source ──────────────────────────────────────────────────────────────

export function fnSource(fn) {
  if (typeof fn !== 'function') return ''
  try { return Function.prototype.toString.call(fn) } catch { return '' }
}

/** Strip comments so `// G.age >= 55` in a note is never read as a guard. */
export function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
}

/**
 * The name the guard gave its argument. Guards are overwhelmingly `(G) => ...`
 * but a handful use `g`, `s`, or destructure, and a hardcoded "G." would miss
 * exactly those.
 * Returns { name, destructured: string[] | null }.
 */
export function guardParam(src) {
  const s = src.trimStart()
  let m = s.match(/^(?:async\s+)?\(?\s*\{([^}]*)\}/)
  if (m) {
    const names = [...m[1].matchAll(/([A-Za-z_$][\w$]*)\s*(?::\s*[A-Za-z_$][\w$]*)?\s*(?:=[^,]*)?(?:,|$)/g)]
      .map(x => x[1])
    return { name: null, destructured: names }
  }
  m = s.match(/^(?:async\s+)?\(?\s*([A-Za-z_$][\w$]*)\s*[),=]/)
  if (m) return { name: m[1], destructured: null }
  m = s.match(/^function\s*[\w$]*\s*\(\s*([A-Za-z_$][\w$]*)/)
  if (m) return { name: m[1], destructured: null }
  return { name: null, destructured: null }
}

// ── Vocabularies, derived from countries.js ───────────────────────────────────

let _vocab = null
export async function vocab() {
  if (_vocab) return _vocab
  const { COUNTRIES } = await loadCorpus()
  const countryNames = new Set()
  const ethnicIds = new Set(['local'])          // buildG's documented fallback
  const religionKeys = new Set(['secular'])     // buildG's documented fallback
  const archetypes = new Set()
  const regimes = new Set()
  const yearRange = new Map()
  const archetypeOf = new Map()
  const ethnicByCountry = new Map()

  for (const c of COUNTRIES) {
    countryNames.add(c.name)
    if (c.archetype) { archetypes.add(c.archetype); archetypeOf.set(c.name, c.archetype) }
    if (c.regime) regimes.add(c.regime)
    for (const t of c.regimeHistory ?? []) if (t?.to) regimes.add(t.to)
    for (const g of c.ethnicGroups ?? []) if (g?.id) ethnicIds.add(g.id)
    ethnicByCountry.set(c.name, new Set((c.ethnicGroups ?? []).map(g => g.id)))
    for (const k of Object.keys(c.religionWeights ?? {})) religionKeys.add(k)
    if (Array.isArray(c.yearRange)) yearRange.set(c.name, c.yearRange)
  }

  _vocab = {
    countryNames, ethnicIds, religionKeys, archetypes, regimes,
    yearRange, archetypeOf, ethnicByCountry,
    // Documented in CLAUDE.md; these are engine contracts, not data-derived.
    ruralUrban: new Set(['urban', 'suburban', 'rural']),
    residency: new Set(['citizen', 'permanent_resident', 'work_visa', 'undocumented',
      'refugee_status', 'asylum_seeker', 'tourist_overstay']),
    phases: {
      early_childhood: [0, 5],
      childhood: [6, 11],
      adolescence: [12, 17],
      young_adult: [18, 29],
      midlife: [30, 49],
      late_life: [50, 120],
    },
  }
  return _vocab
}

/**
 * The real property list of G — obtained by CALLING buildG, never hardcoded.
 * A hardcoded list is the same class of bug as the one this audit hunts: it
 * goes stale the moment the engine adds a field, and then reports the new
 * field as unknown.
 */
let _gKeys = null
export async function gPropertyNames() {
  if (_gKeys) return _gKeys
  const { buildG } = await import('../../src/engine/tick.js')
  const { COUNTRIES } = await loadCorpus()
  const country = COUNTRIES.find(c => c.name === 'Germany') ?? COUNTRIES[0]
  const mock = {
    character: {
      name: 'Probe', firstName: 'Probe', surname: 'Probe', gender: 'female',
      birthYear: 1970, country, wealthTier: 3, religion: 'secular', ethnicity: 'local',
      ruralUrban: 'urban', literate: true, birthPlace: null,
      birthNeighborhoodTier: 'middle_class', birthNeighborhoodName: null,
    },
    stats: { happiness: 50, health: 50, smarts: 50, looks: 50, charisma: 50, wealth: 50 },
    flags: [], age: 30, currentYear: 2000, mem: {}, log: [],
    parents: { mother: { alive: true }, father: { alive: true } },
    children: [], siblings: [], friends: [], pets: [], conditions: [],
    education: { level: 'none', field: null, enrolled: null },
    assets: { properties: [], vehicles: [] },
  }
  _gKeys = new Set(Object.keys(buildG(mock)))
  return _gKeys
}
