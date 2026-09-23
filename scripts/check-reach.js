#!/usr/bin/env node
/**
 * npm run check-reach
 *
 * Conditional reach: for a character who IS the person a body of work was
 * written for, how much of it ever reaches them?
 *
 * `npm run sim` answers "what fires per 100 lives", and that number cannot
 * distinguish the two things it is most important to tell apart:
 *
 *   - the content is unreachable — a broken guard, a chain whose trigger sets
 *     a flag its own consumer needs in the same year, a weight of 8 against a
 *     field of 999s
 *   - the population is rare — a doctor is rare, so doctor events are rare,
 *     and that is the engine being right
 *
 * Both print as a small number. The first is a bug and the second is
 * demography, and a report that shows them identically is the same failure
 * mode as `unwritten-group` reporting a country's own plurality: it buries
 * the finding that matters.
 *
 * This found nothing broken on its first run, which is the result. Every
 * career arc reaches its holder — 16% of drivers to 79% of software
 * developers see one over a forty-year career — and the eight professional
 * arcs that fired ZERO times across 280 ordinary lives turned out to be dark
 * only because nobody in that sample ever became a doctor. Without this, that
 * reads as ~80 unreachable events.
 *
 * Usage:
 *   npm run check-reach                  careers and countries
 *   npm run check-reach -- --lives=40    more lives per condition
 *   npm run check-reach -- --only=career
 *   npm run check-reach -- --only=group  a population inside a country
 */
import fs from 'node:fs'
import path from 'node:path'
import { registerResolveHooks } from './lib/register.js'

registerResolveHooks()

const arg = (name, dflt) => {
  const hit = process.argv.find(a => a.startsWith(`--${name}=`))
  return hit ? hit.split('=')[1] : dflt
}
const LIVES = Number(arg('lives', 24))
const ONLY = arg('only', null)

const C = s => (process.stdout.isTTY ? s : s.replace(/\u001b\[[0-9;]*m/g, ''))
const B = s => C(`\u001b[1m${s}\u001b[0m`)
const DIM = s => C(`\u001b[2m${s}\u001b[0m`)
const RED = s => C(`\u001b[31m${s}\u001b[0m`)
const YEL = s => C(`\u001b[33m${s}\u001b[0m`)
const GRN = s => C(`\u001b[32m${s}\u001b[0m`)

function stubStorage() {
  if (globalThis.localStorage) return
  const mem = new Map()
  globalThis.localStorage = {
    getItem: k => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: k => mem.delete(k), clear: () => mem.clear(),
  }
}

/** Event ids declared in one source file. */
function idsIn(rel) {
  const abs = path.join(process.cwd(), rel)
  if (!fs.existsSync(abs)) return null
  return new Set([...fs.readFileSync(abs, 'utf8').matchAll(/(?:^|[\s{,([])id:\s*'([^']+)'/g)].map(m => m[1]))
}

/**
 * Run one life and return the set of event ids from `watch` that fired.
 * `setup` runs once at `setupAge` and may return a patched state — that is how
 * a condition gets forced: hand the character the job, the degree, the flag.
 */
function playLife(engine, { country, birthYear, years = 110, setupAge = 0, setup = null, watch }) {
  const { tick, resolveAutoEvent, resolveChoice, useGameStore, BY_ID } = engine
  useGameStore.getState().startCuratedGame({ country, birthYear })
  let s = { ...useGameStore.getState(), mode: 'passive' }
  const seen = new Set()
  let applied = setup == null
  for (let y = 0; y < years && !s.dead; y++) {
    if (!applied && s.age >= setupAge) { s = setup(s) ?? s; applied = true }
    const before = s.log.length
    try {
      s = tick(s)
      const autoId = s.log.slice(before).find(e => e.eventId)?.eventId ?? null
      const ev = s.pendingEvent ?? (autoId ? BY_ID.get(autoId) : null)
      if (ev && watch.has(ev.id)) seen.add(ev.id)
      if (s.pendingEvent) {
        const e = s.pendingEvent
        s = e.isAutomatic || !e.choices?.length
          ? resolveAutoEvent(s)
          : resolveChoice(s, Math.floor(Math.random() * e.choices.length))
        if (s.pendingEvent) s = { ...s, pendingEvent: null }
      }
      if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
      if (s.pendingTrial) {
        useGameStore.setState(s); useGameStore.getState().resolveTrial('none')
        s = { ...useGameStore.getState(), mode: 'passive' }
      }
    } catch (err) { return { seen, died: true, error: err.message } }
  }
  return { seen, reachedSetup: applied }
}

function bar(share, width = 18) {
  const n = Math.round(share * width)
  return C('█'.repeat(n) + `\u001b[2m${'·'.repeat(width - n)}\u001b[0m`)
}

/** A share low enough to be worth a human look, given how many lives we ran. */
function verdict(livesSeeing, lives, distinct, total) {
  if (lives === 0) return [RED('?'), 'no life reached the condition — the setup itself is unreachable']
  if (livesSeeing === 0) return [RED('!'), 'nobody holding this ever saw one of its events']
  if (distinct / total < 0.25) return [YEL('~'), `only ${distinct} of ${total} distinct events ever fired`]
  return [GRN('✓'), '']
}

async function main() {
  stubStorage()
  const { tick, resolveAutoEvent, resolveChoice } = await import('../src/engine/tick.js')
  const { useGameStore } = await import('../src/store/gameStore.js')
  const { EVENTS } = await import('../src/data/events.js')
  const { CAREERS } = await import('../src/data/careers.js')
  const engine = { tick, resolveAutoEvent, resolveChoice, useGameStore, BY_ID: new Map(EVENTS.map(e => [e.id, e])) }

  let problems = 0

  // ── Careers ────────────────────────────────────────────────────────────────
  // The arc files are named for the arc, not the career, and four of them
  // differ (dev/software_developer, police/police_officer, factory/
  // factory_worker, social_worker/social_worker). Reading the mapping off the
  // filename alone silently measures the wrong career.
  const CAREER_ARCS = {
    doctor: 'doctor', nurse: 'nurse', lawyer: 'lawyer', journalist: 'journalist',
    engineer: 'engineer', dev: 'software_developer', accountant: 'accountant',
    social_worker: 'social_worker', civil_servant: 'civil_servant', teacher: 'teacher',
    farmer: 'farmer', chef: 'chef', driver: 'driver', police: 'police_officer',
    factory: 'factory_worker', laborer: 'laborer', merchant: 'merchant', artist: 'artist',
  }

  if (!ONLY || ONLY === 'career') {
    console.log(`\n${B('career arcs')}  ${DIM(`does the arc reach the person who holds the job · ${LIVES} lives each`)}`)
    console.log(DIM('  the character is given the job and a degree at 24 and held to it for forty years\n'))
    for (const [arc, careerId] of Object.entries(CAREER_ARCS)) {
      const watch = idsIn(`src/data/events/thematic/events_${arc}_arc.js`)
      if (!watch) continue
      const career = CAREERS.find(c => c.id === careerId)
      if (!career) { console.log(`  ${RED('?')} ${arc.padEnd(15)} no career with id '${careerId}'`); problems++; continue }

      let lives = 0, livesSeeing = 0
      const distinct = new Set()
      for (let i = 0; i < LIVES; i++) {
        const r = playLife(engine, {
          country: 'United States', birthYear: 1960, years: 66, setupAge: 24,
          watch,
          setup: (s) => ({
            ...s,
            education: { level: 'graduate', field: 'general', enrolled: null },
            stats: { ...s.stats, smarts: Math.max(s.stats.smarts, 80) },
            career: { ...career, level: 1, title: career.levels?.[0]?.title ?? career.title, years: 0, baseSalary: career.baseSalary ?? 40000 },
          }),
        })
        if (!r.reachedSetup) continue
        lives++
        if (r.seen.size) livesSeeing++
        for (const id of r.seen) distinct.add(id)
      }
      const share = lives ? livesSeeing / lives : 0
      const [mark, note] = verdict(livesSeeing, lives, distinct.size, watch.size)
      if (mark !== GRN('✓')) problems++
      console.log(`  ${mark} ${arc.padEnd(15)} ${bar(share)} ${String(Math.round(share * 100)).padStart(3)}%  ` +
        DIM(`${distinct.size}/${watch.size} events · ${lives} lives`) + (note ? `  ${YEL(note)}` : ''))
    }
  }

  // ── Countries ──────────────────────────────────────────────────────────────
  // The honest per-country number. `npm run sim` runs ten configurations and
  // cannot reach the other 144 countries' modules at all, so a country whose
  // module is perfect and a country whose module is broken both report zero.
  if (!ONLY || ONLY === 'country') {
    const MODULES = [
      ['Guyana', 1948, 'geographic/events_guyana.js'],
      ['Bosnia and Herzegovina', 1962, 'geographic/events_bosnia.js'],
      ['Qatar', 1975, 'geographic/events_gulf.js'],
      ['Japan', 1935, 'geographic/events_japan_war.js'],
      ['Germany', 1928, 'geographic/events_germany_reich.js'],
      ['Austria', 1930, 'geographic/events_austria.js'],
      ['Iceland', 1935, 'geographic/events_iceland_moldova.js'],
      ['Nigeria', 1962, 'geographic/events_nigeria_depth.js'],
      ['Nigeria', 1995, 'geographic/events_nigeria_depth.js'],
      ['Nigeria', 1962, 'geographic/events_nigeria_midcentury.js'],
      ['India', 1955, 'geographic/events_india_depth.js'],
      ['Peru', 1960, 'geographic/events_peru_depth.js'],
      ['Peru', 1975, 'geographic/events_peru_depth.js'],
      ['Peru', 1960, 'geographic/events_peru_midcentury.js'],
      ['Peru', 1948, 'geographic/events_peru_midcentury.js'],
    ]
    console.log(`\n${B('country modules')}  ${DIM(`for a character born there, what share of the module ever fires · ${LIVES} lives each`)}\n`)
    for (const [country, birthYear, rel] of MODULES) {
      const watch = idsIn(`src/data/events/${rel}`)
      if (!watch || !watch.size) { console.log(`  ${RED('?')} ${country.padEnd(26)} no ids in ${rel}`); problems++; continue }
      let lives = 0, livesSeeing = 0
      const distinct = new Set()
      for (let i = 0; i < LIVES; i++) {
        const r = playLife(engine, { country, birthYear, watch })
        lives++
        if (r.seen.size) livesSeeing++
        for (const id of r.seen) distinct.add(id)
      }
      const share = lives ? livesSeeing / lives : 0
      const [mark, note] = verdict(livesSeeing, lives, distinct.size, watch.size)
      if (mark !== GRN('✓')) problems++
      console.log(`  ${mark} ${country.padEnd(26)} ${bar(share)} ${String(Math.round(share * 100)).padStart(3)}%  ` +
        DIM(`${distinct.size}/${watch.size} events · born ${birthYear}`) + (note ? `  ${YEL(note)}` : ''))
    }
  }

  // ── Groups ─────────────────────────────────────────────────────────────────
  // The same question for a population inside a country, which is what
  // `unwritten-group` reports. The engine cannot be asked for an ethnicity, so
  // the character is drawn normally — birth year anywhere in the country's
  // range, place and wealth as the engine chooses — and handed the identity at
  // birth. Nothing else about the draw is forced: the point is to measure the
  // module against the lives the engine actually produces for this group.
  if (!ONLY || ONLY === 'group') {
    const GROUPS = [
      ['Brazil', 'pardo_brazilian', 'geographic/events_brazil_pardo.js'],
      ['Cuba', 'mulatto_cuban', 'geographic/events_cuba_mulatto.js'],
    ]
    const { COUNTRIES } = await import('../src/data/countries.js')
    console.log(`\n${B('groups')}  ${DIM(`for a character of this group, what share of its module ever fires · ${LIVES} lives each, any birth year`)}\n`)
    for (const [country, ethnicity, rel] of GROUPS) {
      const watch = idsIn(`src/data/events/${rel}`)
      if (!watch || !watch.size) { console.log(`  ${RED('?')} ${country.padEnd(26)} no ids in ${rel}`); problems++; continue }
      const [lo, hi] = COUNTRIES.find(c => c.name === country)?.yearRange ?? [1930, 2005]
      let lives = 0, livesSeeing = 0, fired = 0
      const distinct = new Set()
      for (let i = 0; i < LIVES; i++) {
        const birthYear = lo + Math.floor(Math.random() * (hi - lo + 1))
        const r = playLife(engine, {
          country, birthYear, watch, setupAge: 0,
          setup: (s) => ({ ...s, character: { ...s.character, ethnicity } }),
        })
        lives++
        if (r.seen.size) livesSeeing++
        fired += r.seen.size
        for (const id of r.seen) distinct.add(id)
      }
      const share = lives ? livesSeeing / lives : 0
      const [mark, note] = verdict(livesSeeing, lives, distinct.size, watch.size)
      if (mark !== GRN('✓')) problems++
      console.log(`  ${mark} ${`${country}:${ethnicity}`.padEnd(26)} ${bar(share)} ${String(Math.round(share * 100)).padStart(3)}%  ` +
        DIM(`${distinct.size}/${watch.size} events · ${(fired / Math.max(1, lives)).toFixed(1)} per life`) + (note ? `  ${YEL(note)}` : ''))
    }
  }

  console.log()
  console.log('━'.repeat(74))
  console.log(problems
    ? `${YEL(`${problems} condition(s) worth a look`)}  ${DIM('! = nobody saw it · ~ = thin · ? = the setup itself never happened')}`
    : `${GRN(B('every condition reaches the content written for it'))}`)
  console.log(DIM('  A low share here is not automatically a defect: a life is only so long, and\n' +
    '  an arc of ten events cannot all fire in one of them. The number to act on is\n' +
    '  0%, or a distinct count that stays flat as --lives goes up.'))
}

main().catch(err => { console.error(err); process.exit(1) })
