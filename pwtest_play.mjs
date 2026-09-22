import { launch, shot, shotFull, hscroll, overflowers, report, URL, SHOT } from './pwtest_harness.mjs'

const MODE = process.argv[2] || 'active'   // 'active' | 'passive'
const LABEL = process.argv[3] || 'life'
const W = Number(process.argv[4] || 430)
const H = Number(process.argv[5] || 932)
const TABS_EVERY = Number(process.argv[6] || 12)   // visit all tabs every N ages

const { browser, page, errors, consoles } = await launch({ width: W, height: H, scale: W < 500 ? 2 : 1 })
await page.goto(URL, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(500)

const log = (...a) => console.log(...a)

// pick mode
await page.getByRole('button', { name: MODE === 'passive' ? /Witness/ : /Inhabit/ }).click()
await page.getByRole('button', { name: /^Begin a( another)? life|^Begin another life|^Begin a life/ }).click().catch(async () => {
  await page.getByRole('button', { name: /Begin/ }).first().click()
})
await page.waitForTimeout(400)
log('--- birth screen ---')
await shotFull(page, `${LABEL}-birth`)
const birthText = await page.locator('#root').innerText()
log(birthText.slice(0, 700))
await page.getByRole('button', { name: /Begin This Life/ }).click()
await page.waitForTimeout(500)

const st = () => page.evaluate(() => {
  const s = window.__store?.getState?.()
  return s ? {
    screen: s.screen, age: s.age, year: s.currentYear, dead: s.dead,
    pendingEvent: s.pendingEvent ? { id: s.pendingEvent.id, choices: s.pendingEvent.choices?.length ?? 0, auto: !!s.pendingEvent.isAutomatic } : null,
    trial: !!s.pendingTrial, minigame: s.pendingMinigame ?? null,
    inPrison: s.inPrison, mode: s.mode,
  } : null
})

// no store on window; use DOM instead
async function readState() {
  return await page.evaluate(() => {
    const root = document.getElementById('root')
    const txt = root ? root.innerText : ''
    const btns = [...document.querySelectorAll('button')].map(b => (b.textContent || '').trim())
    return { txt: txt.slice(0, 4000), btns, len: txt.length }
  })
}

let stuckCount = 0
let lastSig = ''
let iter = 0
let ages = new Set()
let lastAge = -1
const seenIssues = []

while (iter++ < 900) {
  const s = await readState()
  const sig = s.btns.join('|') + '::' + s.txt.slice(0, 200)

  // death screen?
  if (s.btns.some(b => /Start Another Life/.test(b))) {
    log(`\n=== DEATH SCREEN reached (iter ${iter}) ===`)
    await page.waitForTimeout(400)
    log('deathshot:', await shotFull(page, `${LABEL}-death`))
    log('hscroll:', JSON.stringify(await hscroll(page)))
    const ov = await overflowers(page)
    if (ov.length) log('DEATH OVERFLOW:', JSON.stringify(ov))
    const full = await page.locator('#root').innerText()
    log('--- DEATH SCREEN TEXT ---')
    log(full)
    break
  }

  // Trial?
  if (s.txt.includes('On Trial')) {
    log(`!! TRIAL at iter ${iter}`)
    log('trialshot:', await shotFull(page, `${LABEL}-trial`))
    const tt = await page.locator('#root').innerText()
    log(tt.slice(0, 1200))
    const opt = await page.getByRole('button', { name: /Represent yourself/ })
    if (await opt.count()) await opt.first().click()
    await page.waitForTimeout(400)
    continue
  }

  // Minigame?
  if (/Tap|Start Game|Begin Game|Fight|Hack|Maze|Lock/.test(s.btns.join(' ')) && s.txt.length < 900) {
    log(`!! possible MINIGAME at iter ${iter}: ${JSON.stringify(s.btns)}`)
    await shotFull(page, `${LABEL}-minigame-${iter}`)
  }

  // Age tracking
  const m = s.txt.match(/age (\d+)/)
  const age = m ? Number(m[1]) : -1
  if (age !== lastAge && age >= 0) {
    lastAge = age
    ages.add(age)
    if (age % TABS_EVERY === 0) {
      // visit all tabs
      for (const t of ['Stats', 'People', 'Assets', 'Life']) {
        const b = page.getByRole('tab', { name: t })
        if (await b.count()) {
          await b.first().click()
          await page.waitForTimeout(150)
          const ov = await overflowers(page)
          if (ov.length) log(`OVERFLOW on ${t} @age ${age}:`, JSON.stringify(ov.slice(0, 4)))
          const hs = await hscroll(page)
          if (hs.docScrollW > hs.inner + 1) log(`HSCROLL on ${t} @age ${age}:`, JSON.stringify(hs))
        }
      }
      await shotFull(page, `${LABEL}-tabs-age${age}`)
    }
  }

  // Advance: choice > auto > age up
  const choiceBtns = page.locator('article button')
  const nChoice = await choiceBtns.count()
  if (nChoice > 0) {
    const texts = await choiceBtns.allInnerTexts()
    // skip context expandable
    const idx = texts.findIndex(t => !/What was happening/i.test(t))
    if (idx >= 0) {
      await choiceBtns.nth(idx).click({ timeout: 4000 }).catch(() => {})
      await page.waitForTimeout(90)
      continue
    }
  }

  const ageUp = page.getByRole('button', { name: /^Another year|^Age Up|^Next Year|^Live another year|^Go on$|^Continue$|^Read the year|^Let it happen/ })
  if (await ageUp.count()) {
    await ageUp.first().click({ timeout: 4000 }).catch(() => {})
    await page.waitForTimeout(110)
  } else {
    // any other advancing button
    const cands = s.btns.filter(b => /Go on|Continue|Next|Age/.test(b))
    if (cands.length) {
      await page.getByRole('button', { name: cands[0], exact: true }).first().click().catch(() => {})
      await page.waitForTimeout(110)
    }
  }

  if (sig === lastSig) {
    stuckCount++
    if (stuckCount > 12) {
      log(`\n!!! STUCK at iter ${iter} — no state change in 12 attempts`)
      log('buttons:', JSON.stringify(s.btns))
      log('text:', s.txt.slice(0, 1500))
      log('stuckshot:', await shotFull(page, `${LABEL}-STUCK`))
      break
    }
  } else { stuckCount = 0; lastSig = sig }
}

log(`\nages visited: ${Math.min(...ages)}..${Math.max(...ages)} (${ages.size})`)
log(report(LABEL, errors, consoles))
await browser.close()
