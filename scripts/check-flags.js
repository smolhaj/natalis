#!/usr/bin/env node
/**
 * scripts/check-flags.js
 *
 * Audits the natalis flag system for orphaned flags and registry gaps.
 * Derives actual coverage dynamically from source — never trusts the registry status.
 *
 * Usage:
 *   npm run check-flags                    full report
 *   npm run check-flags -- --orphans       orphaned + partial flags only
 *   npm run check-flags -- --weight=major  filter by weight (major | moderate | minor)
 *   npm run check-flags -- --unregistered  all unregistered flags sorted by frequency
 *   npm run check-flags -- --world         world-event flags specifically
 */

import { readFileSync, readdirSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dir  = fileURLToPath(new URL('.', import.meta.url))
const ROOT   = join(__dir, '..')
const { FLAG_REGISTRY } = await import('../src/data/flags.js')

// ── ANSI colours ─────────────────────────────────────────────────────────────
const B   = s => `\x1b[1m${s}\x1b[0m`
const DIM = s => `\x1b[2m${s}\x1b[0m`
const RED = s => `\x1b[31m${s}\x1b[0m`
const YEL = s => `\x1b[33m${s}\x1b[0m`
const GRN = s => `\x1b[32m${s}\x1b[0m`
const CYN = s => `\x1b[36m${s}\x1b[0m`

// ── Collect source files ──────────────────────────────────────────────────────
const SRC_DIRS = ['src/data', 'src/engine', 'src/store']

function jsFilesIn(dir) {
  try {
    return readdirSync(join(ROOT, dir))
      .filter(f => extname(f) === '.js')
      .map(f => ({ rel: `${dir}/${f}`, content: readFileSync(join(ROOT, dir, f), 'utf8') }))
  } catch { return [] }
}

const allFiles = SRC_DIRS.flatMap(jsFilesIn)

// ── Extract flags SET via p.addFlag('...') ────────────────────────────────────
// Maps flag → Set<relPath>
const flagSetBy = new Map()

for (const { rel, content } of allFiles) {
  for (const [, flag] of content.matchAll(/p\.addFlag\(['"]([a-zA-Z_0-9]+)['"]\)/g)) {
    if (!flagSetBy.has(flag)) flagSetBy.set(flag, new Set())
    flagSetBy.get(flag).add(rel)
  }
}

// ── Extract flags SET via addFlags: [...] (world events) ─────────────────────
const worldFlagSetBy = new Map()

for (const { rel, content } of allFiles) {
  for (const [, block] of content.matchAll(/addFlags:\s*\[([^\]]*)\]/g)) {
    for (const [, flag] of block.matchAll(/['"]([a-zA-Z_0-9]+)['"]/g)) {
      if (!worldFlagSetBy.has(flag)) worldFlagSetBy.set(flag, new Set())
      worldFlagSetBy.get(flag).add(rel)
    }
  }
}

// ── All SET flags combined ────────────────────────────────────────────────────
const allSetFlags = new Map()
for (const [flag, files] of flagSetBy) allSetFlags.set(flag, new Set(files))
for (const [flag, files] of worldFlagSetBy) {
  if (!allSetFlags.has(flag)) allSetFlags.set(flag, new Set())
  for (const f of files) allSetFlags.get(flag).add(f)
}

// ── Extract flags CHECKED via .has('...') / .includes('...') ─────────────────
// Matches: G.flags.has / state.flags.has / flags.has / F.has (gameEngine local var)
const CHECK_RE = /\b(?:G\.flags|state\.flags|flags|F)\.(?:has|includes)\(\s*['"]([a-zA-Z_0-9]+)['"]\s*\)/g
const flagCheckedIn = new Map() // flag → Set<relPath>

// Split gameEngine.js into named sections so we can distinguish buildYearTexture
// from generateEpitaph and generateIdentityCard (all in the same file).
const gameEngineFile = allFiles.find(f => f.rel.includes('gameEngine'))
const gameEngineSections = new Map() // sectionName → content
if (gameEngineFile) {
  const ge = gameEngineFile.content
  const markers = [
    ['buildYearTexture',    /\nfunction buildYearTexture\b/],
    ['generateIdentityCard',/\nexport function generateIdentityCard\b/],
    ['generateEpitaph',     /\nexport function generateEpitaph\b/],
  ]
  let sections = [{ name: 'gameEngine_other', start: 0 }]
  for (const [name, re] of markers) {
    const m = re.exec(ge)
    if (m) sections.push({ name, start: m.index })
  }
  sections.sort((a, b) => a.start - b.start)
  for (let i = 0; i < sections.length; i++) {
    const end = sections[i + 1]?.start ?? ge.length
    gameEngineSections.set(sections[i].name, ge.slice(sections[i].start, end))
  }
}

for (const { rel, content } of allFiles) {
  if (rel.includes('gameEngine')) continue // handled per-section below
  for (const [, flag] of content.matchAll(CHECK_RE)) {
    if (!flagCheckedIn.has(flag)) flagCheckedIn.set(flag, new Set())
    flagCheckedIn.get(flag).add(rel)
  }
}
// Add section-specific virtual paths for gameEngine
for (const [section, content] of gameEngineSections) {
  const virtRel = `src/engine/${section}.js`
  for (const [, flag] of content.matchAll(CHECK_RE)) {
    if (!flagCheckedIn.has(flag)) flagCheckedIn.set(flag, new Set())
    flagCheckedIn.get(flag).add(virtRel)
  }
}

// ── Classify coverage for a single registered flag ────────────────────────────
function coverage(flag) {
  const setFiles    = allSetFlags.get(flag) ?? new Set()
  const checkedFiles = flagCheckedIn.get(flag) ?? new Set()
  // inYearTexture: checked specifically inside buildYearTexture (not just anywhere in gameEngine)
  const inYearTexture = [...checkedFiles].some(f => f.includes('buildYearTexture'))
  const inEpitaph     = [...checkedFiles].some(f => f.includes('generateEpitaph') || f.includes('generateIdentityCard'))
  const inRibbon      = [...checkedFiles].some(f => f.includes('ribbons'))
  const inEventGuard  = [...checkedFiles].some(f =>
    !f.includes('gameEngine') && !f.includes('ribbons') && !f.includes('gameStore'))
  return {
    setCount: setFiles.size,
    checkedCount: checkedFiles.size,
    inYearTexture,
    inEpitaph,
    inRibbon,
    inEventGuard,
    setByWorld: worldFlagSetBy.has(flag),
    setByEvent: flagSetBy.has(flag),
  }
}

function statusFor(flag, entry) {
  const c = coverage(flag)
  const { intent } = entry
  // Texture labels need no follow-through — always covered regardless of check count
  if (intent === 'none') return 'covered'
  // epitaph/identity-card only does NOT count as covered — it's the eulogy, not the life
  const meaningfulCheck = c.inYearTexture || c.inEventGuard || c.inRibbon
  if (!meaningfulCheck) return c.inEpitaph ? 'partial' : 'orphaned'
  if (intent === 'both')         return (c.inYearTexture && (c.inEventGuard || c.inRibbon)) ? 'covered' : 'partial'
  if (intent === 'year_texture') return c.inYearTexture ? 'covered' : 'partial'
  if (intent === 'event')        return (c.inEventGuard || c.inRibbon) ? 'covered' : 'partial'
  return meaningfulCheck ? 'partial' : 'orphaned'
}

// ── Parse CLI args ────────────────────────────────────────────────────────────
const argv        = process.argv.slice(2)
const orphansOnly = argv.includes('--orphans')
const showWorld   = argv.includes('--world')
const showUnreg   = argv.includes('--unregistered')
const weightArg   = argv.find(a => a.startsWith('--weight='))?.split('=')[1]

const WEIGHT_ORDER = { major: 0, moderate: 1, minor: 2 }

const entries = Object.entries(FLAG_REGISTRY)
  .filter(([, e]) => !weightArg || e.weight === weightArg)
  .sort(([, a], [, b]) => {
    const diff = (WEIGHT_ORDER[a.weight] ?? 3) - (WEIGHT_ORDER[b.weight] ?? 3)
    return diff !== 0 ? diff : a.category.localeCompare(b.category)
  })

const statuses = entries.map(([flag, entry]) => [flag, entry, statusFor(flag, entry)])
const orphaned = statuses.filter(([,,s]) => s === 'orphaned')
const partial  = statuses.filter(([,,s]) => s === 'partial')
const covered  = statuses.filter(([,,s]) => s === 'covered')

// ── Header ────────────────────────────────────────────────────────────────────
console.log(`\n${B('natalis flag audit')} — ${new Date().toISOString().slice(0, 10)}`)
console.log('━'.repeat(62))
console.log(
  `Registry: ${B(entries.length)} flags  |  ` +
  `Set in source: ${B(allSetFlags.size)}  |  ` +
  `Checked in source: ${B(flagCheckedIn.size)}`
)
console.log(
  `Coverage: ${GRN(covered.length + ' covered')}  ` +
  `${YEL(partial.length + ' partial')}  ` +
  `${RED(orphaned.length + ' orphaned')}`
)
console.log('─'.repeat(62))

// ── Orphaned flags ────────────────────────────────────────────────────────────
if (orphaned.length && !showWorld && !showUnreg) {
  console.log(`\n${B(RED('ORPHANED'))} — no downstream consequence found\n`)
  for (const [flag, entry] of orphaned) {
    const c = coverage(flag)
    const ts = entry.timestamped ? CYN(' ⏱') : ''
    const epitaphNote = c.inEpitaph ? DIM(' [epitaph only]') : ''
    console.log(`  ${RED('[' + entry.weight + '/' + entry.category + ']')} ${B(flag)}${ts}${epitaphNote}`)
    console.log(`    ${DIM(entry.description)}`)
    console.log(`    set ${c.setCount}x (${[c.setByEvent && 'event', c.setByWorld && 'worldEvent'].filter(Boolean).join('+')||'?'})  intent: ${entry.intent}`)
    if (entry.notes) console.log(`    ${CYN('→ ' + entry.notes)}`)
    console.log()
  }
}

// ── Partial flags ─────────────────────────────────────────────────────────────
if (partial.length && !orphansOnly && !showWorld && !showUnreg) {
  console.log(`\n${B(YEL('PARTIAL'))} — some coverage, intent not fully met\n`)
  for (const [flag, entry] of partial) {
    const c = coverage(flag)
    const ts = entry.timestamped ? CYN(' ⏱') : ''
    const has = [
      c.inEventGuard  && 'event guards',
      c.inYearTexture && 'year texture',
      c.inRibbon      && 'ribbon',
      c.inEpitaph     && 'epitaph/identity-card',
    ].filter(Boolean).join(', ')
    console.log(`  ${YEL('[' + entry.weight + ']')} ${flag}${ts}  ${DIM('has: ' + has + ' | needs: ' + entry.intent)}`)
    if (entry.notes) console.log(`    ${DIM('→ ' + entry.notes)}`)
  }
}

// ── Covered flags ─────────────────────────────────────────────────────────────
if (!orphansOnly && !showWorld && !showUnreg) {
  console.log(`\n${B(GRN('COVERED'))} — intent met\n`)
  const cols = covered.map(([f, , ]) => f)
  // print in 2 columns
  for (let i = 0; i < cols.length; i += 2) {
    const a = GRN('✓') + ' ' + cols[i].padEnd(36)
    const b = cols[i+1] ? GRN('✓') + ' ' + cols[i+1] : ''
    console.log('  ' + a + b)
  }
}

// ── World-event flags with no character-level follow-through ──────────────────
if (showWorld) {
  const regSet = new Set(Object.keys(FLAG_REGISTRY))
  console.log(`\n${B('WORLD-EVENT FLAGS — character-level follow-through audit')}\n`)

  for (const [flag, files] of worldFlagSetBy) {
    const eventChecked = flagCheckedIn.has(flag)
      ? [...(flagCheckedIn.get(flag))].filter(f =>
          !f.includes('ribbons') && !f.includes('worldEvents')).length
      : 0
    const inRegistry = regSet.has(flag)
    const statusMarker = eventChecked > 0 ? GRN('✓') : RED('✗')
    const regMarker    = inRegistry ? '' : DIM(' [unregistered]')
    console.log(`  ${statusMarker} ${flag.padEnd(40)}${regMarker}`)
  }
}

// ── Unregistered flags ────────────────────────────────────────────────────────
if (showUnreg) {
  const regSet = new Set(Object.keys(FLAG_REGISTRY))
  const unregistered = [...allSetFlags.entries()]
    .filter(([f]) => !regSet.has(f))
    .sort(([, a], [, b]) => b.size - a.size)

  console.log(`\n${B('UNREGISTERED FLAGS')} (${unregistered.length} total, sorted by frequency)\n`)
  console.log(DIM('  These are set in source but not in FLAG_REGISTRY.'))
  console.log(DIM('  High-frequency ones may warrant adding to the registry.\n'))

  for (const [flag, files] of unregistered) {
    const checked  = flagCheckedIn.has(flag) ? flagCheckedIn.get(flag).size : 0
    const checkedMark = checked > 0 ? GRN('checked ' + checked + 'x') : RED('never checked')
    console.log(`  ${String(files.size).padStart(3)}x  ${flag.padEnd(42)}${checkedMark}`)
  }
}

// ── Quick summary of top orphans by emotional weight ─────────────────────────
if (!showWorld && !showUnreg) {
  console.log('\n' + '─'.repeat(62))
  const majorOrphans = orphaned.filter(([, e]) => e.weight === 'major')
  if (majorOrphans.length) {
    console.log(`\n${B(RED('Major orphans requiring attention:'))}\n`)
    for (const [flag, entry] of majorOrphans) {
      console.log(`  ${RED('●')} ${flag.padEnd(36)} ${DIM(entry.category)}`)
    }
  }
  console.log(`\nRun ${CYN('npm run check-flags -- --unregistered')} to see all ${allSetFlags.size} flags set in source.`)
  console.log(`Run ${CYN('npm run check-flags -- --world')} to audit world-event flag coverage.\n`)
}
