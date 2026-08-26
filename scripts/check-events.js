#!/usr/bin/env node
/**
 * scripts/check-events.js
 *
 * Reachability audit — the direction check-flags.js cannot see.
 *
 * check-flags asks "is every registered flag set somewhere and consumed
 * somewhere". That question was answerable with 2672/0/0 while an entire
 * country's content, the retirement arc and the grief after a parent's death
 * were unreachable, because textual presence is not reachability. This asks the
 * other question: can the engine, given a real character in a real country in a
 * real year, ever actually reach this authored prose.
 *
 * Usage:
 *   npm run check-events                 full report, exits 1 on errors
 *   npm run check-events -- --warn       include warnings in the exit code
 *   npm run check-events -- --only=phase-reach,world-scope
 *   npm run check-events -- --list       list audit names
 *   npm run check-events -- --json       machine-readable output
 */

import { AUDITS, runAllAudits } from './lib/audits.js'

const B = s => `\x1b[1m${s}\x1b[0m`
const DIM = s => `\x1b[2m${s}\x1b[0m`
const RED = s => `\x1b[31m${s}\x1b[0m`
const YEL = s => `\x1b[33m${s}\x1b[0m`
const GRN = s => `\x1b[32m${s}\x1b[0m`
const CYN = s => `\x1b[36m${s}\x1b[0m`

const argv = process.argv.slice(2)
const asJson = argv.includes('--json')
const strict = argv.includes('--warn')
const onlyArg = argv.find(a => a.startsWith('--only='))?.split('=')[1]
const only = onlyArg ? onlyArg.split(',').map(s => s.trim()) : null

if (argv.includes('--list')) {
  for (const [name, description] of AUDITS) console.log(`  ${name.padEnd(16)} ${description}`)
  process.exit(0)
}

const results = await runAllAudits(only)
const all = results.flatMap(r => r.findings)
const errors = all.filter(f => f.level === 'error')
const warns = all.filter(f => f.level === 'warn')

if (asJson) {
  console.log(JSON.stringify({ results, errors: errors.length, warnings: warns.length }, null, 2))
  process.exit(errors.length || (strict && warns.length) ? 1 : 0)
}

console.log(`\n${B('natalis reachability audit')} — ${new Date().toISOString().slice(0, 10)}`)
console.log('━'.repeat(72))

for (const { name, description, findings } of results) {
  const e = findings.filter(f => f.level === 'error')
  const w = findings.filter(f => f.level === 'warn')
  const mark = e.length ? RED('✗') : w.length ? YEL('!') : GRN('✓')
  console.log(`\n${mark} ${B(name.padEnd(16))} ${DIM(description)}`)
  console.log(`  ${e.length ? RED(e.length + ' error' + (e.length === 1 ? '' : 's')) : GRN('0 errors')}` +
    `  ${w.length ? YEL(w.length + ' warning' + (w.length === 1 ? '' : 's')) : DIM('0 warnings')}`)

  // Group by code so 300 instances of one mistake read as one mistake.
  const byCode = new Map()
  for (const f of findings) {
    if (!byCode.has(f.code)) byCode.set(f.code, [])
    byCode.get(f.code).push(f)
  }
  for (const [code, list] of byCode) {
    const isErr = list[0].level === 'error'
    console.log(`  ${isErr ? RED('▸') : YEL('▸')} ${code} ${DIM('(' + list.length + ')')}`)
    for (const f of list.slice(0, 25)) {
      console.log(`      ${CYN(f.where)}  ${B(f.id ?? '?')}`)
      console.log(`        ${f.message}`)
    }
    if (list.length > 25) console.log(DIM(`      … and ${list.length - 25} more`))
  }
}

console.log('\n' + '━'.repeat(72))
console.log(`${errors.length ? RED(B(errors.length + ' errors')) : GRN(B('0 errors'))}  ` +
  `${warns.length ? YEL(warns.length + ' warnings') : DIM('0 warnings')}`)
if (errors.length) console.log(DIM('\nErrors are content the engine can never reach. Each one is authored prose no player will read.'))
console.log()

process.exit(errors.length || (strict && warns.length) ? 1 : 0)
