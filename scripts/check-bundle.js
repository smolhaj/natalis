#!/usr/bin/env node
/**
 * scripts/check-bundle.js — does the thing we ship actually run?
 *
 * `npm run build` exits 0 on a bundle that throws on load. It did, for an
 * unknown number of deploys: `manualChunks` matched the substring "react"
 * against a module path, so `scheduler` — which react-dom needs at module-init
 * time and whose path contains no "react" — went to a different chunk from
 * React. Rollup said so in a warning nobody read:
 *
 *   Circular chunk: vendor -> vendor-react -> vendor
 *
 * and the deployed page threw "Cannot read properties of undefined (reading
 * 'useState')" and rendered an empty div. Every other check in this repo was
 * green the whole time: 350 tests, 0 flag orphans, 0 reachability errors, 0
 * anachronisms. None of them loads a page.
 *
 * This builds, serves `dist`, opens it in a real browser, starts a life and
 * ages through it, and fails on ANY console error or page error. It is the
 * only check here that exercises the artefact rather than the source.
 *
 * Usage:
 *   npm run check-bundle
 *   npm run check-bundle -- --keep    leave the preview server up to poke at
 */
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const B = s => `\x1b[1m${s}\x1b[0m`
const DIM = s => `\x1b[2m${s}\x1b[0m`
const RED = s => `\x1b[31m${s}\x1b[0m`
const GRN = s => `\x1b[32m${s}\x1b[0m`

const PORT = 5388
const URL = `http://localhost:${PORT}/natalis/`
const keep = process.argv.includes('--keep')

// Noise from the sandbox's TLS proxy and from Google Fonts is not the app
// failing; anything else is.
const IGNORE = /ERR_CERT_AUTHORITY_INVALID|fonts\.(googleapis|gstatic)|favicon/i

function buildOrDie() {
  console.log(DIM('building…'))
  const r = spawnSync('npx', ['vite', 'build'], { encoding: 'utf8' })
  const out = (r.stdout ?? '') + (r.stderr ?? '')
  if (r.status !== 0) {
    console.log(RED('build failed')); console.log(out.slice(-2000)); process.exit(1)
  }
  // Rollup warns rather than fails on a cycle, and a cycle between the vendor
  // chunks is the exact shape of the defect this script exists for.
  const cycles = [...out.matchAll(/Circular chunk: ([^.]+)\./g)].map(m => m[1].trim())
  const vendorCycle = cycles.filter(c => /vendor/.test(c))
  return { cycles, vendorCycle }
}

async function main() {
  const { cycles, vendorCycle } = buildOrDie()
  if (vendorCycle.length) {
    console.log(RED(`\n✗ ${vendorCycle.length} circular chunk(s) among the vendor chunks:`))
    for (const c of vendorCycle) console.log('   ', c)
    console.log(DIM('  React and everything it initialises must share one chunk.'))
  }

  let chromium
  try { ({ chromium } = await import('playwright')) } catch {
    console.log(RED('playwright is not installed; cannot load the bundle')); process.exit(1)
  }

  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
  const stop = () => { if (!keep) try { server.kill('SIGTERM') } catch { /* already gone */ } }
  process.on('exit', stop)
  await sleep(5000)

  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
    .catch(() => chromium.launch())
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', e => errors.push(`page error: ${e.message}`))
  page.on('console', m => {
    if (m.type() !== 'error') return
    const t = m.text()
    if (!IGNORE.test(t)) errors.push(`console: ${t.slice(0, 220)}`)
  })

  const fail = async (msg, extra) => {
    console.log(RED(`\n✗ ${msg}`))
    if (extra) console.log('   ', extra)
    for (const e of errors.slice(0, 8)) console.log('   ', RED(e))
    await browser.close(); stop(); process.exit(1)
  }

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 40000 }).catch(e => fail('the page would not load', e.message))
  await sleep(1200)

  const mounted = await page.evaluate(() => document.getElementById('root')?.innerHTML?.length ?? -1)
  if (mounted < 500) await fail(`React did not mount — #root holds ${mounted} characters`)
  console.log(GRN('✓') + ` the page mounts ${DIM(`(#root: ${mounted} chars)`)}`)

  // Starting a life pulls in the engine and every content chunk, which is
  // where the remaining (harmless, so far) cycles are. A blank title screen is
  // a different failure from a title screen that cannot start a game.
  await page.getByRole('button', { name: /Begin a(nother)? life/i }).first()
    .click({ timeout: 10000 }).catch(() => fail('no "Begin a life" button on the title screen'))
  await sleep(1000)
  await page.getByRole('button', { name: /Begin This Life/i }).first()
    .click({ timeout: 10000 }).catch(() => fail('no "Begin This Life" button on the birth screen'))
  await sleep(1500)

  let aged = 0
  for (let i = 0; i < 20 && aged < 10; i++) {
    const next = page.getByRole('button', { name: /^Another year$/i }).first()
    if (await next.count() > 0) {
      await next.click({ timeout: 6000 }).catch(() => {})
      aged++
    } else {
      // A choice event is blocking. Any answer will do; we are testing that the
      // bundle runs, not what the character decides.
      const opts = page.locator('[data-choice], button').filter({
        hasNotText: /Another year|Menu|Life|Stats|People|Assets|Recent|Timeline|Search|Back/,
      })
      if (await opts.count() === 0) break
      await opts.first().click({ timeout: 4000 }).catch(() => {})
    }
    await sleep(400)
  }
  if (aged < 10) await fail(`the life stalled after ${aged} year(s)`)
  console.log(GRN('✓') + ` a life starts and ages ${DIM(`(${aged} years)`)}`)

  const body = await page.evaluate(() => document.body.innerText ?? '')
  if (!/AGE \d+/.test(body)) await fail('the life log printed nothing')
  console.log(GRN('✓') + ' the life log prints')

  if (errors.length) await fail(`${errors.length} error(s) in the console`)

  await browser.close(); stop()
  console.log(`\n${GRN(B('the built bundle runs'))}  ${DIM(`${cycles.length} circular chunk(s) total, none among vendor`)}`)
  if (cycles.length && !vendorCycle.length) {
    console.log(DIM('  (content/engine cycles are tolerated: they are data modules, not module-init dependencies —'))
    console.log(DIM('   but they are the same shape as the defect above, so a new one is worth a look.)'))
  }
  process.exit(vendorCycle.length ? 1 : 0)
}

main()
