#!/usr/bin/env node
/**
 * npm run check-anachronisms
 *
 * Plays lives across the whole roster and reports every prose line that names
 * a technology before it reached the place the character lives, or that
 * describes an adult activity to someone too young for it.
 *
 * Static audits cannot see this. Every line it found on its first run was
 * reachable, correctly guarded and syntactically fine; it was simply wrong
 * about when the world contained the thing it named.
 */
import { registerResolveHooks } from './lib/register.js'
import { checkLine, checkAge } from './lib/anachronism.js'

registerResolveHooks()

function stubStorage() {
  if (globalThis.localStorage) return
  const mem = new Map()
  globalThis.localStorage = {
    getItem: k => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: k => mem.delete(k), clear: () => mem.clear(),
  }
}

const C = (s) => process.stdout.isTTY ? s : s.replace(/\u001b\[[0-9;]*m/g, '')
const red = s => C(`\u001b[31m${s}\u001b[0m`)
const yellow = s => C(`\u001b[33m${s}\u001b[0m`)
const green = s => C(`\u001b[32m${s}\u001b[0m`)
const dim = s => C(`\u001b[2m${s}\u001b[0m`)

// Spread across archetypes and, crucially, across the eras where a country's
// present-day category is least like its past: the Gulf before oil, Ireland and
// Portugal before convergence, Korea before the miracle, Iceland before
// broadcasting.
const CONFIGS = [
  ['Oman', 1931], ['Oman', 1955], ['Kuwait', 1940], ['Saudi Arabia', 1950],
  ['Iceland', 1930], ['Iceland', 1958], ['Ireland', 1945], ['Portugal', 1950],
  ['South Korea', 1945], ['Japan', 1930], ['Singapore', 1950],
  ['Nigeria', 1940], ['Ethiopia', 1950], ['Kenya', 1955], ['Tanzania', 1960],
  ['India', 1935], ['China', 1940], ['Bhutan', 1960], ['Nepal', 1950],
  ['North Korea', 1955], ['Cuba', 1945], ['Myanmar', 1950],
  ['Russia', 1930], ['Poland', 1935], ['Mongolia', 1950],
  ['Brazil', 1935], ['Mexico', 1930], ['Peru', 1940],
  ['Guyana', 1932], ['Guyana', 1955],
  ['South Africa', 1945], ['Afghanistan', 1950], ['Yemen', 1945],
  ['Vanuatu', 1950], ['United Kingdom', 1925], ['United States', 1910],
]

const LIVES = Number(process.env.LIVES ?? 3)

async function main() {
  stubStorage()
  const { tick, resolveAutoEvent, resolveChoice } = await import('../src/engine/tick.js')
  const { useGameStore } = await import('../src/store/gameStore.js')

  const tech = new Map()   // key → { count, sample }
  const ages = new Map()
  let lines = 0, livesRun = 0, errors = 0, firstError = null

  for (const [country, birthYear] of CONFIGS) {
    for (let i = 0; i < LIVES; i++) {
      let s
      try {
        useGameStore.getState().startCuratedGame({ country, birthYear })
        s = { ...useGameStore.getState(), mode: 'passive' }
      } catch (e) { errors++; firstError ??= e; continue }
      livesRun++
      for (let y = 0; y < 110 && !s.dead; y++) {
        const before = s.log.length
        try {
          s = tick(s)
          if (s.pendingEvent) {
            const ev = s.pendingEvent
            s = ev.isAutomatic || !ev.choices?.length
              ? resolveAutoEvent(s)
              : resolveChoice(s, Math.floor(Math.random() * ev.choices.length))
            if (s.pendingEvent) s = { ...s, pendingEvent: null }
          }
          if (s.pendingMinigame) s = { ...s, pendingMinigame: null }
          if (s.pendingTrial) {
            useGameStore.setState(s); useGameStore.getState().resolveTrial('none')
            s = { ...useGameStore.getState(), mode: 'passive' }
          }
        } catch (e) { errors++; firstError ??= e; break }

        const where = s.currentCountry ?? s.character?.country ?? null
        for (const e of s.log.slice(before)) {
          if (!e.text || e.isHeadline || e.isSoundtrack) continue
          lines++
          const hit = checkLine(e.text, e.year ?? s.currentYear, where)
          if (hit) {
            const k = `${hit.tech}|${hit.text}`
            const rec = tech.get(k) ?? { ...hit, count: 0, worst: hit.year, country: where?.name }
            rec.count++
            if (hit.year < rec.worst) { rec.worst = hit.year; rec.country = where?.name; rec.arrived = hit.arrived }
            tech.set(k, rec)
          }
          const ah = checkAge(e.text, e.age ?? s.age)
          if (ah) {
            const rec = ages.get(ah.text) ?? { ...ah, count: 0, worst: ah.age }
            rec.count++
            if (ah.age < rec.worst) rec.worst = ah.age
            ages.set(ah.text, rec)
          }
        }
      }
    }
  }

  const techHits = [...tech.values()].sort((a, b) => b.count - a.count)
  const ageHits = [...ages.values()].sort((a, b) => b.count - a.count)

  console.log(`\n${livesRun} lives, ${lines.toLocaleString()} lines of prose read${errors ? `, ${errors} errored` : ''}\n`)

  if (techHits.length === 0) console.log(green('✓') + ' no line names a technology before it arrived')
  else {
    console.log(red(`✗ ${techHits.length} line(s) name a technology before it arrived where the character lives\n`))
    for (const h of techHits.slice(0, 40)) {
      console.log(`  ${yellow(h.tech.padEnd(18))} ${dim(`${h.country} ${h.worst} · arrives ${h.arrived} · ×${h.count}`)}`)
      console.log(`    ${h.text.slice(0, 150)}`)
    }
    if (techHits.length > 40) console.log(dim(`  …and ${techHits.length - 40} more`))
  }

  console.log()
  if (ageHits.length === 0) console.log(green('✓') + ' no line describes an adult activity to a child')
  else {
    console.log(red(`✗ ${ageHits.length} line(s) reach a character too young for them\n`))
    for (const h of ageHits.slice(0, 25)) {
      console.log(`  ${yellow(`age ${String(h.worst).padStart(2)} < ${h.floor}`)} ${dim(`×${h.count}`)}`)
      console.log(`    ${h.text.slice(0, 150)}`)
    }
    if (ageHits.length > 25) console.log(dim(`  …and ${ageHits.length - 25} more`))
  }
  if (errors) {
    console.log()
    console.log(red(`✗ ${errors} life/lives threw — the numbers above are reading a fraction of the corpus`))
    console.log(dim('  ' + (firstError?.stack ?? String(firstError)).split('\n').slice(0, 4).join('\n  ')))
  }
  console.log()
  process.exit(techHits.length + ageHits.length + errors > 0 ? 1 : 0)
}

main().catch(e => { console.error(e); process.exit(2) })
