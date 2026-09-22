#!/usr/bin/env node
/**
 * scripts/sim.js — the firing-rate report.
 *
 * Runs the real engine over whole lives and prints what actually fires. This is
 * the report that would have caught what no static audit could: a contemplative
 * layer eating most of a life, a prose system nobody sees, a country whose
 * content never appears, a median death age of 8.
 *
 * Usage:
 *   npm run sim                        default: 12 lives x 10 configurations
 *   npm run sim -- --lives=40          more lives, tighter numbers
 *   npm run sim -- --mode=passive
 *   npm run sim -- --country=Ethiopia --year=1974
 *   npm run sim -- --json
 */

import { runSimulation, DEFAULT_CONFIGS } from './lib/sim.js'

const B = s => `\x1b[1m${s}\x1b[0m`
const DIM = s => `\x1b[2m${s}\x1b[0m`
const RED = s => `\x1b[31m${s}\x1b[0m`
const YEL = s => `\x1b[33m${s}\x1b[0m`
const GRN = s => `\x1b[32m${s}\x1b[0m`

const argv = process.argv.slice(2)
const arg = (name, dflt) => {
  const hit = argv.find(a => a.startsWith(`--${name}=`))
  return hit ? hit.split('=').slice(1).join('=') : dflt
}
const lives = Number(arg('lives', 12))
const mode = arg('mode', 'active')
const asJson = argv.includes('--json')
const country = arg('country', null)
const year = arg('year', null)
// The ten default configurations cannot reach the other 144 countries' content
// at all, so a coverage number taken over them understates the place-anchored
// layers by construction. --broad walks the whole roster instead, which is the
// number a population of players would actually see.
const broad = argv.includes('--broad')
const configs = country ? [[country, Number(year ?? 1970)]]
  : broad ? await rosterConfigs()
  : DEFAULT_CONFIGS

async function rosterConfigs() {
  const { COUNTRIES } = await import('../src/data/countries.js')
  const YEARS = [1935, 1950, 1962, 1975, 1988, 2000]
  return COUNTRIES.map((c, i) => {
    const [lo, hi] = c.yearRange ?? [1930, 2025]
    const y = YEARS[i % YEARS.length]
    return [c.name, Math.min(Math.max(y, lo), hi - 20)]
  })
}

const bar = (share, width = 28) => {
  const n = Math.max(0, Math.min(width, Math.round((share / 100) * width)))
  return '█'.repeat(n) + DIM('·'.repeat(width - n))
}

const result = await runSimulation({ configs, lives, mode })

if (asJson) {
  console.log(JSON.stringify({
    ...result,
    byBucket: Object.fromEntries(result.byBucket),
    countriesSeen: [...result.countriesSeen],
    configs: result.configs.map(c => ({ ...c, buckets: Object.fromEntries(c.buckets) })),
  }, null, 2))
} else {
  const { totals, share } = result
  console.log(`\n${B('natalis firing-rate report')}  ${DIM(`${mode} mode · ${totals.lives} lives · ${totals.years} years lived`)}`)
  console.log('━'.repeat(74))

  console.log(`\n${B('What a year contains')}  ${DIM('(share of all years lived)')}\n`)
  const rows = [
    ['contemplative', share.contemplative, 'the choiceless observational register'],
    ['anchored', share.anchored, 'place, era or identity specific'],
    ['earned', share.earned, 'keys off what already happened to this life'],
    ['universal', share.universal, 'could fire for anyone'],
    ['— any event', share.anyEvent, ''],
    ['choice event', share.choice, 'the player actually decides something'],
    ['year texture', share.texture, 'the quiet-year prose layer'],
    ['mundane layer', share.mundane, ''],
    ['world event', share.world, ''],
  ]
  for (const [label, value, note] of rows) {
    console.log(`  ${label.padEnd(15)} ${String(value.toFixed(1)).padStart(5)}%  ${bar(value)}  ${DIM(note)}`)
  }
  console.log(`\n  glimpses per life ${result.glimpsesPerLife.toFixed(2)}  ${DIM('(CLAUDE.md: roughly one per decade)')}`)
  console.log(`  longest unbroken run of contemplative events: ${totals.longestContemplativeRun}`)

  console.log(`\n${B('Which body of work fires')}  ${DIM('(events per 100 lives)')}\n`)
  for (const [bucket, n] of Object.entries(result.per100Lives).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${bucket.padEnd(16)} ${String(n).padStart(5)}`)
  }
  console.log(`\n${B('How much of the prose layers a player sees')}  ${DIM('(distinct authored lines printed)')}\n`)
  for (const [name, p] of Object.entries(result.prose ?? {})) {
    const flag = p.coverage < 10 ? RED('!') : p.coverage < 25 ? YEL('~') : ' '
    console.log(
      `  ${flag}${name.padEnd(14)} ${String(p.coverage.toFixed(1)).padStart(5)}%  ${bar(p.coverage)}  ` +
      DIM(`${p.matched}/${p.authored} lines · half the output from ${p.concentration}`)
    )
  }

  const rep = result.repetition
  if (rep) {
    const flag = rep.share > 6 ? RED('!') : rep.share > 3 ? YEL('~') : GRN('\u2713')
    console.log(`\n  ${flag} ${String(rep.share.toFixed(1)).padStart(4)}% of prose a character read was a line they had already read` +
      DIM(`  (worst: the same sentence ${rep.worst}x in one life)`))
  }

  console.log(`\n  distinct countries whose dedicated content appeared: ${B(result.countriesSeen.size)}`)
  console.log(`  ${DIM([...result.countriesSeen].sort().join(', ') || '(none)')}`)

  console.log(`\n${B('Lifespan by configuration')}\n`)
  console.log(DIM('  configuration        median  q1  q3   survived-childhood  died<5   contemplative/yr'))
  if (lives < 40) console.log(DIM(`  ${YEL('?')} = median under 20 at only ${lives} lives — too few to distinguish from noise. Re-run with --lives=60.`))
  for (const c of result.configs) {
    const contShare = c.years ? (100 * c.contemplative) / c.years : 0
    // The default run is 12 lives per configuration, and the median of twelve
    // swings hard: Nigeria 1962 reported a median of 5 at 12 lives and 37 at
    // 200, so the flag fired on every single default run and stopped meaning
    // anything. Below the sample threshold it reports the number and asks for
    // more lives instead of crying wolf.
    const lowMedian = c.medianDeathAge != null && c.medianDeathAge < 20
    const flag = !lowMedian ? ' ' : c.lives >= 40 ? RED('!') : YEL('?')
    console.log(
      `  ${flag}${(c.country + ' ' + c.birthYear).padEnd(20)}` +
      `${String(c.medianDeathAge).padStart(5)} ${String(c.q1DeathAge).padStart(4)} ${String(c.q3DeathAge).padStart(4)}` +
      `${String(c.medianAdultDeathAge).padStart(19)}` +
      `${String(c.under5 + '/' + c.lives).padStart(9)}` +
      `${String(contShare.toFixed(0) + '%').padStart(18)}`
    )
  }

  if (totals.errors.length) {
    console.log(`\n${RED(B(totals.errors.length + ' lives threw'))}`)
    for (const e of totals.errors.slice(0, 15)) console.log(`  ${RED('✗')} ${e}`)
    if (totals.errors.length > 15) console.log(DIM(`  … and ${totals.errors.length - 15} more`))
  } else {
    console.log(`\n${GRN('No life threw.')}`)
  }
  console.log()
}
