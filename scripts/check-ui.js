#!/usr/bin/env node
/**
 * scripts/check-ui.js — play the built game the way a player does, and check
 * that what the interface SAYS agrees with what the engine DOES.
 *
 * Every other audit here reads source or runs the engine in Node; check-bundle
 * opens the page but only ages ten years. The seventh gameplay pass played
 * lives through the real UI at phone width and found a class none of them can
 * see — the screen and the state disagreeing:
 *
 *   - Menu → Continue, or a page reload, dropped the question the year was
 *     waiting on (`pendingEvent: null` in the save) and emptied the queue of
 *     guaranteed beats, so a choice could be skipped by reloading.
 *   - The activities panel printed present-day catalogue prices beside an
 *     engine that charges era money: "Clothes Shopping ~$200" in 1968, $20
 *     charged; "Day Laborer $8,000–$15,000/yr", $1,502 paid.
 *   - A dead partner stayed on state as { alive: false } and every surface
 *     read it as a living one: the People tab showed them married and a
 *     widow could take them on a date, and could never meet anyone else.
 *   - Ransomware and crypto fraud were offered in 1996; a follower-count
 *     social-media career in 1955.
 *
 * Each check below fails on the code before that pass.
 *
 * Usage:
 *   npm run check-ui
 *   npm run check-ui -- --no-build    reuse an existing dist/
 *   npm run check-ui -- --shots=DIR   save screenshots there
 */
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { mkdirSync } from 'node:fs'

const RED = s => `\x1b[31m${s}\x1b[0m`
const GRN = s => `\x1b[32m${s}\x1b[0m`
const DIM = s => `\x1b[2m${s}\x1b[0m`

const PORT = 5389
const URL = `http://localhost:${PORT}/natalis/`
const IGNORE = /ERR_CERT_AUTHORITY_INVALID|fonts\.(googleapis|gstatic)|favicon/i
const shotsArg = process.argv.find(a => a.startsWith('--shots='))
const SHOTS = shotsArg ? shotsArg.slice(8) : null
if (SHOTS) mkdirSync(SHOTS, { recursive: true })

const failures = []
const pass = (msg) => console.log(GRN('✓') + ' ' + msg)
const fail = (msg) => { failures.push(msg); console.log(RED('✗ ' + msg)) }

if (!process.argv.includes('--no-build')) {
  console.log(DIM('building…'))
  const r = spawnSync('npx', ['vite', 'build'], { encoding: 'utf8' })
  if (r.status !== 0) { console.log(RED('build failed')); console.log((r.stdout ?? '') + (r.stderr ?? '')); process.exit(1) }
}

let chromium
try { ({ chromium } = await import('playwright')) } catch {
  console.log(RED('playwright is not installed')); process.exit(1)
}
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
process.on('exit', () => { try { server.kill('SIGTERM') } catch { /* gone */ } })
await sleep(5000)

for (const ev of ['unhandledRejection', 'uncaughtException']) process.on(ev, (e) => {
  console.log(RED(`✗ the script could not go on: ${String(e?.message ?? e).split('\n')[0]}`))
  process.exit(1)
})
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch())
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
const errors = []
page.on('pageerror', e => errors.push(`page error: ${e.message}`))
page.on('console', m => { if (m.type() === 'error' && !IGNORE.test(m.text())) errors.push(`console: ${m.text().slice(0, 200)}`) })

// ── helpers ──────────────────────────────────────────────────────────────────
const shot = async (name) => { if (SHOTS) await page.screenshot({ path: `${SHOTS}/${name}.png` }) }
async function click(re) {
  let b = page.getByRole('button', { name: re }).first()
  if (!(await b.count())) b = page.getByRole('tab', { name: re }).first()
  if (!(await b.count())) return false
  await b.click({ timeout: 5000 }); await sleep(300)
  return true
}
/** Horizontal overflow at phone width: the page scrolls sideways, or an element pokes out of it unclipped. */
async function overflowAt(label) {
  const o = await page.evaluate(() => {
    const w = document.documentElement.clientWidth
    const bad = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height || (r.right <= w + 1 && r.left >= -1)) continue
      let p = el.parentElement, clipped = false
      while (p && p !== document.body) {
        if (/(hidden|auto|scroll|clip)/.test(getComputedStyle(p).overflowX)) {
          const pr = p.getBoundingClientRect()
          if (pr.right <= w + 1 && pr.left >= -1) { clipped = true; break }
        }
        p = p.parentElement
      }
      if (!clipped) bad.push(`${el.tagName} "${(el.innerText ?? '').slice(0, 30)}"`)
    }
    return { scroll: document.documentElement.scrollWidth > w, bad: bad.slice(0, 3) }
  })
  if (o.scroll || o.bad.length) fail(`horizontal overflow at 390px on ${label}: ${o.bad.join(', ')}`)
}
/** The interface rules that can be read off computed style: no gradient on any control, and no choice styled differently from its siblings. */
async function interfaceRules(label) {
  const r = await page.evaluate(() => {
    const grad = [...document.querySelectorAll('button')].filter(b => /gradient/.test(getComputedStyle(b).backgroundImage)).map(b => b.innerText.slice(0, 30))
    const choices = [...document.querySelectorAll('main article button')].filter(b => !/What was happening/.test(b.innerText))
    const styles = new Set(choices.map(b => b.className + '|' + getComputedStyle(b).backgroundColor + '|' + getComputedStyle(b).borderColor))
    return { grad, uneven: choices.length > 1 && styles.size > 1 }
  })
  if (r.grad.length) fail(`gradient on a control (${label}): ${r.grad.join(', ')}`)
  if (r.uneven) fail(`choices styled differently from one another (${label})`)
}
async function resolveBlocking() {
  const skip = page.getByRole('button', { name: /Skip \(counts as failure\)/ })
  if (await skip.count()) { await skip.first().click(); await sleep(300); return true }
  const trial = page.locator('main button').filter({ hasText: /Represent yourself/ })
  if (await trial.count()) { await trial.first().click(); await sleep(300); return true }
  const bs = page.locator('main article').first().locator('button').filter({ hasNotText: /What was happening/ })
  if (await bs.count()) { await interfaceRules('an event'); await bs.first().click(); await sleep(250); return true }
  return false
}
async function clearBlocking() { for (let i = 0; i < 12 && await resolveBlocking(); i++) { /* answer */ } }
async function ageYears(n) {
  let aged = 0
  for (let guard = 0; aged < n && guard < n * 12; guard++) {
    if (await page.getByRole('button', { name: /Begin another life/ }).count()) return { aged, dead: true }
    if (await resolveBlocking()) continue
    await closePanel()
    const b = page.getByRole('button', { name: /^Another year$/ })
    if (await b.count() && await b.first().isEnabled()) { await b.first().click(); await sleep(200); aged++ } else await sleep(200)
  }
  return { aged, dead: false }
}
async function openCategory(label) {
  await clearBlocking()
  if (await page.locator('div.fixed button', { hasText: /^← Back$/ }).count()) await click(/← Back/)
  // The bottom bar is also position:fixed; the sheet is the one with a close button.
  if (!(await page.locator('div.fixed button').filter({ hasText: /^✕$/ }).count())) {
    const a = page.getByRole('button', { name: /^Activities$/ })
    if (!(await a.count()) || !(await a.first().isEnabled())) return false
    await a.first().click(); await sleep(300)
  }
  const c = page.locator('div.fixed button').filter({ hasText: new RegExp(`^\\W*\\s*${label}`) })
  if (!(await c.count())) return false
  await c.first().click(); await sleep(300)
  return true
}
async function closePanel() {
  const x = page.locator('div.fixed button').filter({ hasText: /^✕$/ })
  if (await x.count()) { await x.first().click(); await sleep(200) }
}
const panelButtons = () => page.evaluate(() => [...document.querySelectorAll('div.fixed button')].map(b => ({ t: b.innerText.replace(/\n+/g, ' ¦ '), d: b.disabled })))
const newestLog = () => page.evaluate(() => {
  const t = document.querySelector('main')?.innerText ?? ''
  const i = t.indexOf('Search\n'); return i >= 0 ? t.slice(i + 7, i + 1500) : t.slice(0, 1500)
})
const dollars = (s) => Number(String(s).replace(/[$,~]/g, ''))

// ── 1. Title and the curated wizard at phone width ───────────────────────────
await page.goto(URL, { waitUntil: 'networkidle', timeout: 40000 })
await sleep(800)
await page.evaluate(() => localStorage.clear())
await page.reload({ waitUntil: 'networkidle' }); await sleep(600)
await overflowAt('the title screen'); await interfaceRules('the title screen'); await shot('01-title')
await click(/Inhabit/)
await click(/Choose where it starts/)
await page.getByPlaceholder('Search countries...').fill('United States')
await page.locator('button', { hasText: /^United States/ }).first().click()
await click(/Next →/)
await page.locator('input[type=range]').evaluate((el) => {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, '1950')
  el.dispatchEvent(new Event('input', { bubbles: true }))
})
await click(/♀ Female/)
await click(/Next →/)
await click(/Preview →/)
await overflowAt('the birth preview')
await click(/Begin This Life/)
await sleep(1000)
await overflowAt('the life screen'); await shot('02-life')

// ── 2. Eighteen years in 1950s-60s America ───────────────────────────────────
const toAdult = await ageYears(18)
if (toAdult.dead) { fail('the test life died before 18; rerun'); await browser.close(); process.exit(1) }
await clearBlocking()
pass(`a crafted life (United States, 1950, Inhabit) reaches 18 ${DIM(`(${toAdult.aged} years)`)}`)

// ── 3. A price shown is the price charged ────────────────────────────────────
if (await openCategory('Shopping')) {
  const clothes = (await panelButtons()).find(b => /^Clothes Shopping/.test(b.t))
  const shown = dollars(clothes?.t.match(/~\$([\d,]+)/)?.[1] ?? NaN)
  await page.locator('div.fixed button').filter({ hasText: /^Clothes Shopping/ }).first().click(); await sleep(300)
  await closePanel()
  const charged = dollars((await newestLog()).match(/new clothes\. \$([\d,]+) spent/)?.[1] ?? NaN)
  if (!Number.isFinite(charged)) fail('clothes shopping did not report what it charged')
  else if (shown !== charged) fail(`Clothes Shopping shows ~$${shown} and charges $${charged} (1968)`)
  else pass(`Clothes Shopping shows and charges the same ${DIM(`($${charged} in 1968)`)}`)
} else fail('no Shopping category at 18')

await ageYears(1); await clearBlocking()
if (await openCategory('Career')) {
  await shot('03-careers')
  const job = (await panelButtons()).find(b => !b.d && /\/yr$/.test(b.t))
  if (!job) fail('no career on offer at 19')
  else {
    const [, lo, hi] = job.t.match(/\$([\d,]+)–\$([\d,]+)\/yr$/) ?? []
    await page.locator('div.fixed button').filter({ hasText: job.t.split(' ¦ ')[0] }).first().click(); await sleep(300)
    const paid = dollars((await newestLog()).match(/Starting salary: \$([\d,]+)\/yr/)?.[1] ?? NaN)
    if (!Number.isFinite(paid)) fail('entering a career did not report a salary')
    else if (paid < dollars(lo) || paid > dollars(hi)) fail(`"${job.t.split(' ¦ ')[0]}" is offered at $${lo}–$${hi}/yr and pays $${paid}`)
    else pass(`the career band shown contains the salary paid ${DIM(`($${paid} in $${lo}–$${hi})`)}`)
  }
  await closePanel()
}

// ── 4. No verb before its world exists ───────────────────────────────────────
await clearBlocking(); await closePanel()
if (await page.getByRole('button', { name: /^Activities$/ }).first().isEnabled()) {
  await click(/^Activities$/)
  const cats = (await panelButtons()).map(b => b.t).join(' / ')
  if (/Social Media/.test(cats)) fail('Social Media is offered in 1969')
  else pass('no social media in 1969')
  await closePanel()
}
if (await openCategory('Crime')) {
  const listed = (await panelButtons()).map(b => b.t.split(' ¦ ')[0])
  const early = listed.filter(n => /Ransomware|Crypto Fraud|Phishing|Identity Theft|Hacking/.test(n))
  if (early.length) fail(`crimes offered before they exist (1969): ${early.join(', ')}`)
  else pass('no cybercrime offered in 1969')
  await overflowAt('the crime panel')
  await closePanel()
}
for (const cat of ['Mind & Body', 'Love', 'Money', 'Travel', 'Assets', 'Licenses', 'Pets', 'Salon & Spa']) {
  if (await openCategory(cat)) { await overflowAt(`the ${cat} panel`); await interfaceRules(`the ${cat} panel`) }
}
await closePanel()

// ── 5. A save carries the question the year is waiting on ────────────────────
let question = null
for (let i = 0; i < 40 && !question; i++) {
  await closePanel()
  const b = page.getByRole('button', { name: /^Another year$/ })
  if (await b.count() && await b.first().isEnabled()) { await b.first().click(); await sleep(250) }
  if (await page.getByRole('button', { name: /Begin another life/ }).count()) break
  const art = page.locator('main article').first()
  if (await art.count() && await art.locator('button').filter({ hasNotText: /What was happening/ }).count() > 1) {
    question = (await art.innerText()).trim()
  } else await clearBlocking()
}
if (!question) fail('no choice event arrived in forty years to test the save with')
else {
  await click(/^Menu$/)
  await click(/^Continue$/); await sleep(600)
  const afterContinue = await page.locator('main article').first().innerText().catch(() => '')
  if (afterContinue.trim() !== question) fail(`Menu → Continue dropped the question the year was waiting on ("${question.slice(0, 60)}" → "${afterContinue.slice(0, 60)}")`)
  else pass('Menu → Continue keeps the pending question')
  await page.reload({ waitUntil: 'networkidle' }); await sleep(600)
  await click(/^Continue$/); await sleep(600)
  const afterReload = await page.locator('main article').first().innerText().catch(() => '')
  if (afterReload.trim() !== question) fail('a page reload dropped the question the year was waiting on')
  else pass('a reload keeps the pending question')
  await clearBlocking()
}

// ── 6. The dead are not shown as living ──────────────────────────────────────
// Widowhood cannot be forced from the interface, so it is written into the
// save — which is exactly the state tickPartner leaves: the partner kept,
// { alive: false }, so the grief layer can still name them.
await ageYears(1); await clearBlocking()
await click(/^Menu$/)
const injected = await page.evaluate(() => {
  const key = ['natalis_v1', 'natalis_v2', 'natalis_v3'].find(k => localStorage.getItem(k))
  if (!key) return false
  const s = JSON.parse(localStorage.getItem(key))
  s.partner = { name: 'Walter Keene', gender: 'male', age: 58, married: true, engaged: false, years: 30, alive: false, relationshipQuality: 70 }
  s.flags = [...new Set([...(s.flags ?? []).filter(f => f !== 'married'), 'widowed', 'lost_partner'])]
  localStorage.setItem(key, JSON.stringify(s))
  return true
})
if (!injected) fail('no save to write a widowhood into')
else {
  await click(/^Continue$/); await sleep(600)
  await clearBlocking()
  await click(/^People$/); await sleep(300)
  await shot('04-people-widowed')
  const people = await page.locator('main').innerText()
  const card = people.slice(people.indexOf('Walter Keene'), people.indexOf('Walter Keene') + 80)
  if (!people.includes('Walter Keene')) fail('a late partner is not shown at all')
  else if (/Married|Dating|Engaged/.test(card) || !/Deceased/.test(card)) fail(`a dead partner is shown as living: "${card.replace(/\n+/g, ' ')}"`)
  else pass('a dead partner is shown as dead')
  await click(/^Life$/)
  if (await openCategory('Love')) {
    const love = (await panelButtons()).map(b => b.t).join(' / ')
    if (/Go on a Date|Propose Marriage|File for Divorce|Walter Keene/.test(love)) fail('the Love panel offers verbs with a dead partner')
    else if (!/Meet Someone New/.test(love)) fail('a widow cannot meet anybody new')
    else pass('the Love panel treats a widow as unpartnered')
    await closePanel()
  }
}

// ── 7. The rest of the life, the death screen, and another life ──────────────
const rest = await ageYears(150)
if (!rest.dead) fail('the life did not end within 150 years')
else {
  await overflowAt('the death screen'); await shot('05-death')
  const obit = await page.evaluate(() => document.body.innerText)
  if (!/Died aged \d+/.test(obit)) fail('the death screen does not say when')
  else pass(`the life ends and the obituary renders ${DIM(`(${obit.match(/Died aged \d+/)[0]})`)}`)
  await click(/Begin another life/)
  await click(/Begin This Life/); await sleep(800)
  if (!(await page.getByRole('button', { name: /^Another year$|Something is waiting/ }).count())) fail('a second life does not start after a death')
  else pass('a second life starts after the first ends')

  // Text clipped: the stat strip truncated "HAPPINESS" to "HAPPINE…" at every
  // desktop width. (Checked on the label, not on long place names, which vary
  // by life.)
  const clipped = []
  for (const width of [390, 640, 768, 1280]) {
    await page.setViewportSize({ width, height: 844 }); await sleep(250)
    const hits = await page.evaluate(() => [
      ...[...document.querySelectorAll('[role=meter]')].map(m => m.previousElementSibling?.firstElementChild),
    ].filter(el => el && el.scrollWidth > el.clientWidth + 1).map(el => el.innerText.slice(0, 24)))
    clipped.push(...hits.map(h => `"${h}" at ${width}px`))
  }
  if (clipped.length) fail(`text clipped: ${clipped.slice(0, 4).join(', ')}`)
  else pass('stat labels are not clipped at 390-1280px')
}

if (errors.length) { fail(`${errors.length} console/page error(s)`); for (const e of errors.slice(0, 6)) console.log('   ', RED(e)) }
await browser.close()
if (failures.length) { console.log(RED(`\n${failures.length} UI check(s) failed`)); process.exit(1) }
console.log(GRN('\nthe interface agrees with the state'))
process.exit(0)
