import { launch, shotFull, shot, hscroll, overflowers, report, URL } from './pwtest_harness.mjs'

const COUNTRY = process.argv[2] || 'Germany'
const TARGET = Number(process.argv[3] || 40)
const LABEL = process.argv[4] || 'ui'
const W = Number(process.argv[5] || 430), H = Number(process.argv[6] || 932)

const { browser, page, errors, consoles } = await launch({ width: W, height: H, scale: W < 500 ? 2 : 1 })
await page.goto(URL, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(400)
await page.getByRole('button', { name: /Choose where it starts/ }).click(); await page.waitForTimeout(300)
await page.locator('input[type=text]').first().fill(COUNTRY); await page.waitForTimeout(250)
await page.locator('.max-h-\\[52vh\\] button').first().click(); await page.waitForTimeout(200)
await page.getByRole('button', { name: /Next/ }).last().click(); await page.waitForTimeout(200)
await page.getByRole('button', { name: /Female/ }).first().click(); await page.waitForTimeout(120)
await page.getByRole('button', { name: /Next/ }).last().click(); await page.waitForTimeout(200)
await page.getByRole('button', { name: /Urban/ }).first().click(); await page.waitForTimeout(100)
await page.getByRole('button', { name: /Secure/ }).first().click(); await page.waitForTimeout(100)
await page.getByRole('button', { name: /Preview/ }).last().click(); await page.waitForTimeout(250)
await page.getByRole('button', { name: /Begin This Life/ }).click()
await page.waitForSelector('header', { timeout: 15000 }); await page.waitForTimeout(400)

async function curAge() {
  const t = await page.evaluate(() => document.querySelector('header')?.innerText || '')
  return Number(t.match(/age (\d+)/)?.[1] ?? 999)
}
async function isDead() { return (await page.getByRole('button', { name: /Start Another Life/ }).count()) > 0 }
async function resolvePending() {
  for (let i = 0; i < 30; i++) {
    const cb = page.locator('article button')
    if (!(await cb.count())) return true
    const texts = await cb.allInnerTexts()
    const valid = texts.map((t, k) => ({ t, k })).filter(o => !/What was happening/i.test(o.t))
    if (!valid.length) return true
    await cb.nth(valid[0].k).click().catch(() => {})
    await page.waitForTimeout(80)
  }
  return false
}
async function advance() {
  if (await resolvePending()) {
    const b = page.getByRole('button', { name: /^Another year|^Something is waiting/ })
    if (await b.count()) { await b.first().click().catch(()=>{}); await page.waitForTimeout(80); return }
  }
  const t = page.getByRole('button', { name: /Represent yourself/ })
  if (await t.count()) { await t.first().click(); await page.waitForTimeout(200) }
}
let g = 0
while (!(await isDead()) && (await curAge()) < TARGET && g++ < 700) await advance()
if (await isDead()) { console.log('DIED before target'); await browser.close(); process.exit(0) }
await resolvePending()
console.log(`${LABEL}: age ${await curAge()}`)

// ---- ACTIVITIES PANEL ----
const act = page.getByRole('button', { name: /Activities/ })
console.log('\n===== ACTIVITIES =====  button count:', await act.count())
if (await act.count()) {
  await act.first().click(); await page.waitForTimeout(600)
  const hs = await hscroll(page); console.log('hscroll:', JSON.stringify(hs), hs.docScrollW > hs.inner + 1 ? ' << HSCROLL' : '')
  const ov = await overflowers(page); if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 10), null, 1))
  console.log('viewport shot:', await shot(page, `${LABEL}-activities-vp`))
  console.log('full shot:', await shotFull(page, `${LABEL}-activities`))
  const txt = await page.locator('#root').innerText()
  console.log(txt.slice(0, 5000))
  const names = await page.locator('button').allInnerTexts()
  console.log('\nALL BUTTONS:', JSON.stringify(names.map(s => s.replace(/\n/g, ' | ')).slice(0, 120), null, 0))
  // try clicking some activity
  const tryBtns = ['Gym', 'Work Out', 'Doctor', 'Study', 'Read', 'Meditate', 'Job', 'Crime', 'Gamble', 'Casino']
  for (const nm of tryBtns) {
    const b = page.locator('button').filter({ hasText: new RegExp(nm, 'i') })
    if (await b.count()) {
      console.log(`\n-- clicking ${nm}`)
      await b.first().click().catch(e => console.log('click failed', e.message))
      await page.waitForTimeout(500)
      console.log('after:', (await page.locator('#root').innerText()).slice(0, 700))
      console.log('shot:', await shotFull(page, `${LABEL}-act-${nm}`))
      break
    }
  }
  // close
  const close = page.getByRole('button', { name: /Close|✕|×|Back to Life/ })
  console.log('\nclose buttons:', await close.count(), (await close.allInnerTexts()).slice(0,5))
  if (await close.count()) { await close.first().click(); await page.waitForTimeout(400) }
  console.log('after close, tabs present:', await page.getByRole('tab').count())
}

// ---- MOVE MODAL ----
await resolvePending()
const mv = page.getByRole('button', { name: /^Move$/ })
console.log('\n===== MOVE MODAL ===== count:', await mv.count())
if (await mv.count()) {
  await mv.first().click(); await page.waitForTimeout(500)
  console.log('viewport shot:', await shot(page, `${LABEL}-move-vp`))
  const sheet = await page.evaluate(() => {
    const els = [...document.querySelectorAll('div')].filter(d => /Move Within/.test(d.textContent || '') && d.children.length < 12)
    const e = els[els.length - 1]
    if (!e) return null
    const r = e.getBoundingClientRect()
    return { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), vh: window.innerHeight, scrollH: e.scrollHeight, clientH: e.clientHeight }
  })
  console.log('sheet geometry:', JSON.stringify(sheet))
  console.log('sheet text:', (await page.locator('#root').innerText()).match(/Move Within[\s\S]{0,1200}/)?.[0])
  // click a destination
  const dest = page.locator('button').filter({ hasText: /Can afford|Too expensive|\$\d/ })
  console.log('destination buttons:', await dest.count())
  if (await dest.count()) {
    await dest.first().click(); await page.waitForTimeout(500)
    console.log('confirm step shot:', await shot(page, `${LABEL}-move-confirm`))
    console.log('confirm text:', (await page.locator('#root').innerText()).match(/Move Within[\s\S]{0,1400}|Confirm[\s\S]{0,900}/)?.[0])
    const conf = page.getByRole('button', { name: /Confirm|Move here|Yes/ })
    console.log('confirm buttons:', await conf.count(), (await conf.allInnerTexts()).slice(0,4))
    if (await conf.count()) { await conf.first().click(); await page.waitForTimeout(700); console.log('after move:', (await page.locator('#root').innerText()).slice(0, 700)) }
  }
  // escape key
  await page.keyboard.press('Escape'); await page.waitForTimeout(300)
  console.log('modal after Escape still open?', /Move Within/.test(await page.locator('#root').innerText()))
  const cl = page.getByRole('button', { name: /Close/ })
  if (await cl.count()) { await cl.first().click(); await page.waitForTimeout(300) }
}

// ---- MENU / SAVE / CONTINUE ----
console.log('\n===== MENU =====')
await page.getByRole('button', { name: /^Menu$/ }).click(); await page.waitForTimeout(600)
console.log('after Menu shot:', await shotFull(page, `${LABEL}-menu`))
console.log((await page.locator('#root').innerText()).slice(0, 1800))
const cont = page.getByRole('button', { name: /Continue/ })
console.log('continue count:', await cont.count())
if (await cont.count()) {
  await cont.first().click(); await page.waitForSelector('header', { timeout: 15000 }); await page.waitForTimeout(500)
  console.log('resumed header:', await page.locator('header').innerText())
  console.log('resumed log entries visible:', (await page.locator('#root').innerText()).slice(0, 500))
  console.log('shot:', await shotFull(page, `${LABEL}-resumed`))
}
// reload persistence
await page.reload({ waitUntil: 'domcontentloaded' }); await page.waitForTimeout(900)
console.log('\n===== AFTER RELOAD =====')
console.log((await page.locator('#root').innerText()).slice(0, 900))
console.log('shot:', await shotFull(page, `${LABEL}-reload`))

console.log(report(LABEL, errors, consoles))
await browser.close()
