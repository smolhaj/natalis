import { launch, shot, shotFull, hscroll, overflowers, report, URL } from './pwtest_harness.mjs'

const TARGET = Number(process.argv[2] || 35)
const LABEL = process.argv[3] || 'panels'
const W = Number(process.argv[4] || 430), H = Number(process.argv[5] || 932)
const MODE = process.argv[6] || 'active'

const { browser, page, errors, consoles } = await launch({ width: W, height: H, scale: W < 500 ? 2 : 1 })
await page.goto(URL, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(400)
await page.getByRole('button', { name: MODE === 'passive' ? /Witness/ : /Inhabit/ }).click()
await page.getByRole('button', { name: /^Begin a/ }).first().click()
await page.waitForTimeout(300)
await page.getByRole('button', { name: /Begin This Life/ }).click()
await page.waitForTimeout(400)

async function curAge() {
  const t = await page.evaluate(() => {
    const h = document.querySelector('header')
    return h ? h.innerText : (document.getElementById('root')?.innerText || '')
  })
  const m = t.match(/age (\d+)/)
  return m ? Number(m[1]) : 999
}
async function advance() {
  const choiceBtns = page.locator('article button')
  const n = await choiceBtns.count()
  if (n > 0) {
    const texts = await choiceBtns.allInnerTexts()
    const idx = texts.findIndex(t => !/What was happening/i.test(t))
    if (idx >= 0) { await choiceBtns.nth(idx).click().catch(()=>{}); await page.waitForTimeout(70); return }
  }
  const b = page.getByRole('button', { name: /^Another year|^Something is waiting/ })
  if (await b.count()) { await b.first().click().catch(()=>{}); await page.waitForTimeout(90) }
  else {
    const t = page.getByRole('button', { name: /Represent yourself/ })
    if (await t.count()) { await t.first().click(); await page.waitForTimeout(200) }
  }
}
let guard = 0
while (await curAge() < TARGET && guard++ < 600) {
  if (await page.getByRole('button', { name: /Start Another Life/ }).count()) { console.log('died before target at', await curAge()); break }
  await advance()
}
console.log('reached age', await curAge())

const dead = await page.getByRole('button', { name: /Start Another Life/ }).count()
if (!dead) {
  for (const t of ['Life', 'Stats', 'People', 'Assets']) {
    await page.getByRole('tab', { name: t }).first().click()
    await page.waitForTimeout(250)
    const hs = await hscroll(page)
    const ov = await overflowers(page)
    console.log(`\n===== TAB ${t} =====`)
    console.log('hscroll:', JSON.stringify(hs), hs.docScrollW > hs.inner + 1 ? '  << HORIZONTAL SCROLL' : '')
    if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 8), null, 1))
    console.log('shot:', await shotFull(page, `${LABEL}-tab-${t}`))
    const txt = await page.locator('#root').innerText()
    console.log(txt.slice(0, 3000))
  }

  // log views
  await page.getByRole('tab', { name: 'Life' }).first().click()
  for (const v of ['Timeline', 'Search']) {
    await page.getByRole('button', { name: v, exact: true }).first().click()
    await page.waitForTimeout(250)
    console.log(`\n===== LOG VIEW ${v} =====`)
    if (v === 'Search') {
      await page.locator('input[type=text]').fill('mother')
      await page.waitForTimeout(300)
      console.log('search results text:', (await page.locator('#root').innerText()).slice(0, 1200))
      console.log('shot:', await shotFull(page, `${LABEL}-search`))
      await page.locator('input[type=text]').fill('zzzzqqq')
      await page.waitForTimeout(250)
      console.log('no-match:', (await page.locator('#root').innerText()).match(/No entries match[^\n]*/)?.[0])
      await page.locator('input[type=text]').fill('')
    } else {
      console.log('shot:', await shotFull(page, `${LABEL}-timeline`))
      const t = await page.locator('#root').innerText()
      console.log(t.slice(0, 2500))
      // expand a collapsed decade
      const heads = page.locator('button:has-text("Your Twenties")')
      if (await heads.count()) { await heads.first().click(); await page.waitForTimeout(200); console.log('expanded twenties:', await shotFull(page, `${LABEL}-timeline-open`)) }
    }
    const ov = await overflowers(page)
    if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 6)))
  }
  await page.getByRole('button', { name: 'Recent', exact: true }).first().click()

  // Activities panel
  const act = page.getByRole('button', { name: /Activities/ })
  if (await act.count()) {
    await act.first().click(); await page.waitForTimeout(400)
    console.log('\n===== ACTIVITIES =====')
    console.log('hscroll:', JSON.stringify(await hscroll(page)))
    const ov = await overflowers(page)
    if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 8), null, 1))
    console.log('shot:', await shotFull(page, `${LABEL}-activities`))
    const t = await page.locator('#root').innerText()
    console.log(t.slice(0, 4000))
    // click a category if present
    const cats = await page.locator('button').allInnerTexts()
    console.log('activity buttons:', JSON.stringify(cats.slice(0, 80)))
  } else {
    console.log('\n===== NO ACTIVITIES BUTTON (mode=' + MODE + ') =====')
  }

  // Move modal
  await page.keyboard.press('Escape')
  const mv = page.getByRole('button', { name: /^Move$/ })
  if (await mv.count()) {
    await mv.first().click(); await page.waitForTimeout(400)
    console.log('\n===== MOVE MODAL =====')
    console.log('hscroll:', JSON.stringify(await hscroll(page)))
    const ov = await overflowers(page)
    if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 8), null, 1))
    console.log('shot:', await shotFull(page, `${LABEL}-move`))
    console.log((await page.locator('#root').innerText()).slice(0, 2500))
  } else console.log('\n===== NO MOVE BUTTON =====')
}

console.log(report(LABEL, errors, consoles))
await browser.close()
