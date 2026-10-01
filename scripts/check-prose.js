#!/usr/bin/env node
/**
 * npm run check-prose
 *
 * A style lint for the event corpus. Every other audit here asks whether a
 * sentence can reach a player, or whether it is true of the world it is printed
 * into. This one asks whether it reads like the house style or like the same
 * writer's reflex for the four-thousandth time.
 *
 * The corpus was 1.78M words when this was written, and a reading pass found
 * the same handful of moves carrying an enormous share of it: "specific" 3,349
 * times, ", which is" 1,322, "is not X. It is Y" 459, "is real." 331, "Both ...
 * are true" as the default way a political follow-through ended. Any one of
 * them is fine. Two hundred of them in one module is a voice, and it is not the
 * character's.
 *
 * It renders every event the way the engine would — static strings as they are,
 * text functions against a handful of real G objects taken from real lives (and
 * skipped if they throw) — and counts per module:
 *
 *   tics        the reflexes listed in TICS below
 *   long        bodies over MAX_SENTENCES sentences (house style: 4-5)
 *   bang        exclamation marks (house style: none, ever)
 *
 * Usage:
 *   npm run check-prose                 ranked table; exits 1 only if a module
 *                                       is over its budget (see BUDGET)
 *   npm run check-prose -- --strict     the tighter budget, for new modules
 *   npm run check-prose -- --top=40     rows to print (default 30)
 *   npm run check-prose -- --module=sonder_12   one module, with every hit
 *   npm run check-prose -- --json
 *
 * The default budget is set so the existing backlog passes and new work that
 * writes like the backlog's worst does not: it gates density (hits per
 * thousand words), not counts, so a long module is not punished for being long.
 */

import { pathToFileURL } from 'node:url'
import { registerResolveHooks } from './lib/register.js'

registerResolveHooks()

// ── The reflexes ──────────────────────────────────────────────────────────────

export const TICS = [
  ['specific', /\bspecific\b/gi],
  ['the specific', /\bthe specific\b/gi],
  ['a/the particular', /\b(?:a|the) particular\b/gi],
  [', which is', /, which is\b/g],
  // "is not X. It is Y" — the correction reflex. The second sentence must open
  // on a pronoun and a copula, within a short reach of the negation.
  ['is not X. It is Y', /\b(?:is|was|are|were) not\b[^.!?]{1,90}[.;]\s+(?:It|This|That|They|He|She|What)\s+(?:is|was|are|were)\b|\b(?:isn't|wasn't|aren't|weren't)\b[^.!?]{1,90}[.;]\s+(?:It|This|That|They|He|She)\s+(?:is|was|are|were)\b/g],
  ['is real.', /\b(?:is|was|are|were) real\./g],
  ['in a way that', /\bin a way that\b/gi],
  ['its own kind of / has its own', /\bits own kind of\b|\bhas its own\b/gi],
  ['Both ... true', /\bBoth\b[^.!?]{0,140}?\btrue\b/g],
  ['You sit with', /\bYou sit with\b/g],
]

// An aphorism closer: the body's last sentence, short, in no one's voice,
// stating a general truth. "That is what X is." "Some things do not leave."
const APHORISM = /^(?:(?:That|This|It) is (?:what|how|why|all|the (?:thing|whole|part|price|cost|shape|way))|(?:Some|Most) things\b|Nothing (?:is|ever)\b|Everything (?:is|ends|changes)\b|(?:Everyone|Nobody|No one) (?:is|does|knows|ever)\b|(?:That|Which) is (?:enough|life|the point)\b)/

export const MAX_SENTENCES = 6

// hits per 1,000 words, long-body share, exclamation marks
// The default budget is a ratchet set just above the corpus as it stands after
// the September 2026 editorial pass (worst module: 12 tics per 1k words, half its
// bodies over six sentences), so it fails on a regression rather than on the
// backlog. Tighten it as the backlog comes down; new modules answer to STRICT.
export const BUDGET = { density: 12.5, longShare: 0.50, bang: 0 }
export const STRICT = { density: 2.0, longShare: 0.10, bang: 0 }

// ── Text helpers ──────────────────────────────────────────────────────────────

const ABBREV = /\b(?:Mr|Mrs|Ms|Dr|St|Mt|Jr|Sr|Lt|Col|Gen|Capt|Sgt|Prof|No|vs|etc|U\.S|U\.K|a\.m|p\.m|i\.e|e\.g)\.$/

/** Sentences in a body, ignoring abbreviations and decimals. */
export function sentences(text) {
  const t = String(text).replace(/\s+/g, ' ').trim()
  if (!t) return []
  const out = []
  let cur = ''
  const parts = t.split(/(?<=[.!?…])(?=["'”’)]*\s+["'“‘(]?[A-Z0-9])/)
  for (const raw of parts) {
    cur += raw
    if (ABBREV.test(cur.trim().replace(/["'”’)]+$/, ''))) continue
    out.push(cur.trim())
    cur = ''
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

const words = t => (String(t).match(/[A-Za-z’']+/g) ?? []).length

export function ticHits(text) {
  const hits = []
  for (const [name, re] of TICS) {
    for (const m of String(text).matchAll(re)) hits.push({ name, match: m[0] })
  }
  return hits
}

export function isAphorismCloser(text) {
  const s = sentences(text)
  if (s.length < 3) return false
  const last = s[s.length - 1]
  if (words(last) > 12 || /\byou(?:r|rs|rself)?\b/i.test(last)) return false
  return APHORISM.test(last)
}

// ── Rendering ────────────────────────────────────────────────────────────────

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

/** A few real G objects at different ages and places, for text functions. */
async function sampleGs() {
  stubStorage()
  const out = []
  try {
    const { tick, buildG, resolveAutoEvent } = await import('../src/engine/tick.js')
    const { useGameStore } = await import('../src/store/gameStore.js')
    for (const [country, birthYear] of [['Nigeria', 1962], ['Germany', 1950], ['India', 1975], ['Brazil', 1985]]) {
      useGameStore.getState().startCuratedGame({ country, birthYear })
      let s = { ...useGameStore.getState(), mode: 'passive' }
      for (let y = 0; y < 60 && !s.dead; y++) {
        try {
          s = tick(s)
          if (s.pendingEvent) s = { ...resolveAutoEvent(s), pendingEvent: null }
        } catch { break }
        if ([8, 16, 30, 45, 60].includes(s.age)) {
          try { out.push(buildG(s)) } catch { /* skip */ }
        }
      }
    }
  } catch { /* text functions are then skipped */ }
  return out
}

function render(fn, Gs) {
  for (const G of Gs) {
    try {
      const t = fn(G)
      if (typeof t === 'string' && t.trim()) return t
    } catch { /* try the next */ }
  }
  return null
}

/** Every event as { id, module, body, outcomes[] }. */
export async function renderCorpus() {
  const { loadCorpus, idIndex } = await import('./lib/corpus.js')
  const { EVENTS } = await loadCorpus()
  const index = idIndex()
  const needsG = EVENTS.some(e => typeof e.text === 'function')
  const Gs = needsG ? await sampleGs() : []
  const out = []
  let skipped = 0
  for (const e of EVENTS) {
    if (!e?.id) continue
    const file = index.get(e.id)?.file ?? '(unlocated)'
    const module = file.replace(/^src\/data\/events\//, '').replace(/\.js$/, '')
    let body = typeof e.text === 'string' ? e.text : typeof e.text === 'function' ? render(e.text, Gs) : null
    if (body == null && typeof e.text === 'function') skipped++
    const outcomes = []
    for (const c of e.choices ?? []) {
      const o = typeof c.outcome === 'string' ? c.outcome : typeof c.outcome === 'function' ? render(c.outcome, Gs) : null
      if (o) outcomes.push(o)
    }
    out.push({ id: e.id, module, body, outcomes })
  }
  return { events: out, skipped }
}

// ── Scoring ──────────────────────────────────────────────────────────────────

export function scoreModules(events) {
  const mods = new Map()
  for (const ev of events) {
    let m = mods.get(ev.module)
    if (!m) {
      m = { module: ev.module, events: 0, bodies: 0, words: 0, tics: 0, byTic: {}, long: 0, bang: 0, aphorism: 0, hits: [] }
      mods.set(ev.module, m)
    }
    m.events++
    const texts = [ev.body, ...ev.outcomes].filter(Boolean)
    for (const t of texts) {
      m.words += words(t)
      for (const h of ticHits(t)) {
        m.tics++
        m.byTic[h.name] = (m.byTic[h.name] ?? 0) + 1
        m.hits.push({ id: ev.id, ...h })
      }
      const b = (t.match(/!/g) ?? []).length
      if (b) { m.bang += b; m.hits.push({ id: ev.id, name: '!', match: t.slice(0, 60) }) }
    }
    if (ev.body) {
      m.bodies++
      if (sentences(ev.body).length > MAX_SENTENCES) { m.long++; m.hits.push({ id: ev.id, name: 'long', match: `${sentences(ev.body).length} sentences` }) }
      if (isAphorismCloser(ev.body)) { m.aphorism++; m.tics++; m.byTic.aphorism = (m.byTic.aphorism ?? 0) + 1; m.hits.push({ id: ev.id, name: 'aphorism', match: sentences(ev.body).at(-1) }) }
    }
  }
  for (const m of mods.values()) {
    m.density = m.words ? (m.tics * 1000) / m.words : 0
    m.longShare = m.bodies ? m.long / m.bodies : 0
  }
  return [...mods.values()]
}

export function overBudget(m, budget = BUDGET) {
  const why = []
  // Tiny modules swing on one sentence; density is only meaningful past ~300 words.
  if (m.words >= 300 && m.density > budget.density) why.push(`density ${m.density.toFixed(1)} > ${budget.density}`)
  if (m.bodies >= 5 && m.longShare > budget.longShare) why.push(`long ${(m.longShare * 100).toFixed(0)}% > ${(budget.longShare * 100).toFixed(0)}%`)
  if (m.bang > budget.bang) why.push(`${m.bang} exclamation mark${m.bang === 1 ? '' : 's'}`)
  return why
}

export function totals(mods) {
  const t = { words: 0, tics: 0, bodies: 0, long: 0, bang: 0, byTic: {} }
  for (const m of mods) {
    t.words += m.words; t.tics += m.tics; t.bodies += m.bodies; t.long += m.long; t.bang += m.bang
    for (const [k, v] of Object.entries(m.byTic)) t.byTic[k] = (t.byTic[k] ?? 0) + v
  }
  return t
}

// ── CLI ──────────────────────────────────────────────────────────────────────

async function main() {
  const argv = process.argv.slice(2)
  const arg = (n, d) => argv.find(a => a.startsWith(`--${n}=`))?.split('=')[1] ?? d
  const strict = argv.includes('--strict')
  const budget = strict ? STRICT : BUDGET
  const top = Number(arg('top', 30))
  const only = arg('module', null)

  const { events, skipped } = await renderCorpus()
  const mods = scoreModules(events)
  const t = totals(mods)

  if (argv.includes('--json')) {
    console.log(JSON.stringify({ totals: t, skipped, modules: mods.map(({ hits, ...m }) => m) }, null, 2))
  } else if (only) {
    for (const m of mods.filter(x => x.module.includes(only))) {
      console.log(`\n${m.module}  ${m.words} words  ${m.tics} tics  density ${m.density.toFixed(1)}  long ${m.long}/${m.bodies}  ! ${m.bang}`)
      for (const h of m.hits) console.log(`  ${h.id.padEnd(40)} ${h.name.padEnd(30)} ${h.match.slice(0, 90)}`)
    }
  } else {
    console.log(`\nProse lint — ${events.length} events, ${t.words.toLocaleString()} words` +
      (skipped ? `, ${skipped} text functions skipped (threw on every sample G)` : ''))
    console.log('\nTics across the corpus:')
    for (const [k, v] of Object.entries(t.byTic).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(6)}  ${k}`)
    console.log(`  ${String(t.long).padStart(6)}  bodies over ${MAX_SENTENCES} sentences (${((t.long / Math.max(1, t.bodies)) * 100).toFixed(1)}% of ${t.bodies})`)
    console.log(`  ${String(t.bang).padStart(6)}  exclamation marks`)
    const ranked = [...mods].sort((a, b) => b.tics + b.long * 2 - (a.tics + a.long * 2))
    console.log(`\nWorst ${top} modules (tics + 2 × long bodies):`)
    console.log(`  ${'module'.padEnd(52)} ${'words'.padStart(7)} ${'tics'.padStart(5)} ${'dens'.padStart(5)} ${'long'.padStart(9)} ${'!'.padStart(3)}`)
    for (const m of ranked.slice(0, top)) {
      console.log(`  ${m.module.slice(0, 52).padEnd(52)} ${String(m.words).padStart(7)} ${String(m.tics).padStart(5)} ${m.density.toFixed(1).padStart(5)} ${`${m.long}/${m.bodies}`.padStart(9)} ${String(m.bang).padStart(3)}`)
    }
  }

  const failing = mods.map(m => [m, overBudget(m, budget)]).filter(([, w]) => w.length)
  if (!argv.includes('--json')) {
    console.log(`\nBudget (${strict ? 'strict' : 'default'}): density ≤ ${budget.density}/1k words, long ≤ ${budget.longShare * 100}%, no exclamation marks.`)
    if (failing.length) {
      console.log(`${failing.length} module(s) over budget:`)
      for (const [m, why] of failing.slice(0, 60)) console.log(`  ${m.module.padEnd(52)} ${why.join('; ')}`)
    } else console.log('Every module is within budget.')
  }
  return failing.length ? 1 : 0
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().then(code => { process.exitCode = code }, err => { console.error(err); process.exitCode = 2 })
}
