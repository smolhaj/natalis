import { launch, shotFull, hscroll, overflowers, report, URL } from './pwtest_harness.mjs'

const COUNTRY = process.argv[2] || 'Germany'
const TARGET = Number(process.argv[3] || 40)
const LABEL = process.argv[4] || 'pan'
const W = Number(process.argv[5] || 430), H = Number(process.argv[6] || 932)
const MODE = process.argv[7] || 'active'

const { browser, page, errors, consoles } = await launch({ width: W, height: H, scale: W < 500 ? 2 : 1 })
await page.goto(URL, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(400)
await page.getByRole('button', { name: MODE === 'passive' ? /Witness/ : /Inhabit/ }).click()
await page.getByRole('button', { name: /Choose where it starts/ }).click()
await page.waitForTimeout(300)
await page.locator('input[type=text]').first().fill(COUNTRY)
await page.waitForTimeout(250)
await page.locator('.max-h-\\[52vh\\] button').first().click()
await page.waitForTimeout(250)
await page.getByRole('button', { name: /Next/ }).last().click(); await page.waitForTimeout(250)
await page.getByRole('button', { name: /Female/ }).first().click(); await page.waitForTimeout(150)
await page.getByRole('button', { name: /Next/ }).last().click(); await page.waitForTimeout(250)
await page.getByRole('button', { name: /Urban/ }).first().click(); await page.waitForTimeout(120)
await page.getByRole('button', { name: /Secure/ }).first().click(); await page.waitForTimeout(120)
await page.getByRole('button', { name: /Preview/ }).last().click(); await page.waitForTimeout(300)
await page.getByRole('button', { name: /Begin This Life/ }).click()
await page.waitForSelector('header', { timeout: 15000 })
await page.waitForTimeout(500)

async function curAge() {
  const t = await page.evaluate(() => document.querySelector('header')?.innerText || '')
  const m = t.match(/age (\d+)/); return m ? Number(m[1]) : 999
}
async function isDead() { return (await page.getByRole('button', { name: /Start Another Life/ }).count()) > 0 }
async function advance() {
  const cb = page.locator('article button')
  if (await cb.count()) {
    const texts = await cb.allInnerTexts()
    const i = texts.findIndex(t => !/What was happening/i.test(t))
    const valid = texts.map((t,k)=>({t,k})).filter(o=>!/What was happening/i.test(o.t))
    if (valid.length) { const pick = valid[Math.floor(Math.random()*valid.length)].k; await cb.nth(pick).click().catch(()=>{}); await page.waitForTimeout(60); return }
  }
  const b = page.getByRole('button', { name: /^Another year|^Something is waiting/ })
  if (await b.count()) { await b.first().click().catch(()=>{}); await page.waitForTimeout(80); return }
  const t = page.getByRole('button', { name: /Represent yourself/ })
  if (await t.count()) { await t.first().click(); await page.waitForTimeout(200) }
}
let g = 0
while (!(await isDead()) && (await curAge()) < TARGET && g++ < 700) await advance()
console.log(`${LABEL}: reached age ${await curAge()} dead=${await isDead()}`)
if (await isDead()) { console.log('DIED before target:'); console.log((await page.locator('#root').innerText()).slice(0,2000)); console.log('shot:', await shotFull(page, LABEL+'-death')); console.log(report(LABEL, errors, consoles)); await browser.close(); process.exit(0) }

for (const t of ['Life', 'Stats', 'People', 'Assets']) {
  await page.getByRole('tab', { name: t }).first().click(); await page.waitForTimeout(250)
  const hs = await hscroll(page); const ov = await overflowers(page)
  console.log(`\n===== TAB ${t} =====`)
  console.log('hscroll:', JSON.stringify(hs), hs.docScrollW > hs.inner + 1 ? ' << HSCROLL' : '')
  if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 8), null, 1))
  console.log('shot:', await shotFull(page, `${LABEL}-tab-${t}`))
  console.log((await page.locator('#root').innerText()).slice(0, 2600))
}

await page.getByRole('tab', { name: 'Life' }).first().click()
await page.getByRole('button', { name: 'Timeline', exact: true }).first().click(); await page.waitForTimeout(300)
console.log('\n===== TIMELINE =====')
console.log('shot:', await shotFull(page, `${LABEL}-timeline`))
console.log((await page.locator('#root').innerText()).slice(0, 2200))
let ov = await overflowers(page); if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0,6)))
// collapse/expand
const decHeads = page.locator('div.divide-y').first()
const heads = page.locator('button').filter({ hasText: /Your Thirties|Your Twenties|Childhood/ })
if (await heads.count()) { await heads.first().click(); await page.waitForTimeout(250); console.log('toggled decade:', await shotFull(page, `${LABEL}-timeline-toggled`)) }

await page.getByRole('button', { name: 'Search', exact: true }).first().click(); await page.waitForTimeout(300)
console.log('\n===== SEARCH =====')
console.log('empty state:', (await page.locator('#root').innerText()).match(/Type to search[^\n]*/)?.[0])
await page.locator('input[type=text]').first().fill('mother'); await page.waitForTimeout(350)
console.log('results header:', (await page.locator('#root').innerText()).match(/\d+ results?/)?.[0])
console.log('shot:', await shotFull(page, `${LABEL}-search`))
await page.locator('input[type=text]').first().fill('qqqzzz'); await page.waitForTimeout(300)
console.log('no match:', (await page.locator('#root').innerText()).match(/No entries match[^\n]*/)?.[0])
await page.locator('input[type=text]').first().fill('a'); await page.waitForTimeout(250)
console.log('single-char (should show prompt):', (await page.locator('#root').innerText()).match(/Type to search[^\n]*/)?.[0])
await page.getByRole('button', { name: 'Recent', exact: true }).first().click(); await page.waitForTimeout(200)

// Activities
const act = page.getByRole('button', { name: /Activities/ })
if (await act.count()) {
  await act.first().click(); await page.waitForTimeout(500)
  console.log('\n===== ACTIVITIES =====')
  const hs = await hscroll(page); console.log('hscroll:', JSON.stringify(hs), hs.docScrollW > hs.inner + 1 ? ' << HSCROLL' : '')
  ov = await overflowers(page); if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 10), null, 1))
  console.log('shot:', await shotFull(page, `${LABEL}-activities`))
  console.log((await page.locator('#root').innerText()).slice(0, 4500))
} else console.log('\n===== NO ACTIVITIES (mode ' + MODE + ') =====')

// Move modal
const mv = page.getByRole('button', { name: /^Move$/ })
if (await mv.count()) {
  await mv.first().click(); await page.waitForTimeout(500)
  console.log('\n===== MOVE =====')
  const hs = await hscroll(page); console.log('hscroll:', JSON.stringify(hs), hs.docScrollW > hs.inner + 1 ? ' << HSCROLL' : '')
  ov = await overflowers(page); if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 10), null, 1))
  console.log('shot:', await shotFull(page, `${LABEL}-move`))
  console.log((await page.locator('#root').innerText()).slice(0, 3000))
} else console.log('\n===== NO MOVE BUTTON =====')

console.log(report(LABEL, errors, consoles))
await browser.close()
