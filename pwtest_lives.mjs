import { launch, shotFull, hscroll, overflowers, report, URL } from './pwtest_harness.mjs'

const MODE = process.argv[2] || 'active'
const N = Number(process.argv[3] || 3)
const W = Number(process.argv[4] || 430), H = Number(process.argv[5] || 932)
const PREFIX = process.argv[6] || MODE

const { browser, page, errors, consoles } = await launch({ width: W, height: H, scale: W < 500 ? 2 : 1 })

for (let n = 1; n <= N; n++) {
  const LABEL = `${PREFIX}${n}`
  await page.goto(URL, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(400)
  // clear saves so title is clean
  await page.evaluate(() => { try { localStorage.clear() } catch {} })
  await page.reload({ waitUntil: 'domcontentloaded' }); await page.waitForTimeout(400)
  await page.getByRole('button', { name: MODE === 'passive' ? /Witness/ : /Inhabit/ }).click()
  await page.getByRole('button', { name: /^Begin a/ }).first().click(); await page.waitForTimeout(300)
  const birth = await page.locator('#root').innerText()
  await page.getByRole('button', { name: /Begin This Life/ }).click()
  await page.waitForSelector('header', { timeout: 15000 }); await page.waitForTimeout(300)
  console.log(`\n\n######## LIFE ${LABEL} (${MODE}) ########`)
  console.log('birth:', birth.split('\n').filter(Boolean).slice(1, 8).join(' | '))

  let iter = 0, stuck = 0, lastSig = '', maxAge = 0, ageBudget = 0
  const seen = { trial: 0, minigame: 0, prison: 0 }
  while (iter++ < 1400) {
    if (await page.getByRole('button', { name: /Start Another Life/ }).count()) break
    const btns = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => (b.textContent || '').trim()))
    const txt = await page.evaluate(() => document.getElementById('root')?.innerText || '')
    const sig = btns.join('|')
    const age = Number((await page.evaluate(() => document.querySelector('header')?.innerText || '')).match(/age (\d+)/)?.[1] ?? -1)
    if (age > maxAge) maxAge = age
    if (txt.includes('On Trial')) {
      seen.trial++
      if (seen.trial === 1) { console.log('  TRIAL:', txt.match(/On Trial[\s\S]{0,500}/)?.[0]?.replace(/\n+/g, ' | ')); console.log('  shot:', await shotFull(page, `${LABEL}-trial`)) }
      const o = page.getByRole('button', { name: /Represent yourself/ })
      if (await o.count()) { await o.first().click(); await page.waitForTimeout(250); continue }
    }
    if (txt.includes('In Prison') && !seen.prison) { seen.prison = 1; console.log('  PRISON at age', age); console.log('  shot:', await shotFull(page, `${LABEL}-prison`)) }
    // minigame screen has no header
    if (!(await page.locator('header').count()) && !(await page.getByRole('button', { name: /Start Another Life/ }).count())) {
      seen.minigame++
      console.log('  NON-LIFESCREEN state, buttons:', JSON.stringify(btns.slice(0, 12)))
      console.log('  shot:', await shotFull(page, `${LABEL}-other-${iter}`))
    }
    // advance
    const cb = page.locator('article button')
    let acted = false
    if (await cb.count()) {
      const tx = await cb.allInnerTexts()
      const v = tx.map((t, k) => ({ t, k })).filter(o => !/What was happening/i.test(o.t))
      if (v.length) { await cb.nth(v[Math.floor(Math.random() * v.length)].k).click().catch(() => {}); acted = true }
    }
    if (!acted) {
      const b = page.getByRole('button', { name: /^Another year$|^Something is waiting/ })
      if (await b.count()) { await b.first().click().catch(() => {}); acted = true }
    }
    if (!acted) {
      const any = btns.find(b => /Go on|Continue|Next|Resolve|Play|Start/.test(b))
      if (any) { await page.getByRole('button', { name: any, exact: true }).first().click().catch(() => {}); acted = true }
    }
    await page.waitForTimeout(65)
    if (sig === lastSig && !acted) stuck++
    else if (sig === lastSig) stuck++
    else { stuck = 0; lastSig = sig }
    if (stuck > 18) {
      console.log(`  !!! STUCK — no change in 18 iterations (age ${age})`)
      console.log('  buttons:', JSON.stringify(btns))
      console.log('  text:', txt.slice(0, 1200))
      console.log('  shot:', await shotFull(page, `${LABEL}-STUCK`))
      break
    }
  }
  if (await page.getByRole('button', { name: /Start Another Life/ }).count()) {
    const d = await page.locator('#root').innerText()
    console.log('  --- DEATH SCREEN ---')
    console.log(d)
    console.log('  shot:', await shotFull(page, `${LABEL}-death`))
    const hs = await hscroll(page); if (hs.docScrollW > hs.inner + 1) console.log('  DEATH HSCROLL', JSON.stringify(hs))
    const ov = await overflowers(page); if (ov.length) console.log('  DEATH OVERFLOW', JSON.stringify(ov.slice(0, 5)))
  } else {
    console.log('  did NOT reach death; max age', maxAge, 'iters', iter)
  }
  console.log('  seen:', JSON.stringify(seen), 'maxAge', maxAge)
}
console.log('\n' + report(PREFIX, errors, consoles))
await browser.close()
