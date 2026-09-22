import { launch, shot, shotFull, hscroll, overflowers, report, URL } from './pwtest_harness.mjs'

// ── 1. Passive-mode life screen + keyboard ─────────────────────────────────
{
  const { browser, page, errors, consoles } = await launch({ width: 430, height: 932, scale: 2 })
  await page.goto(URL, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(400)
  await page.evaluate(() => { try { localStorage.clear() } catch {} })
  await page.reload({ waitUntil: 'domcontentloaded' }); await page.waitForTimeout(400)
  await page.getByRole('button', { name: /Witness/ }).click()
  await page.getByRole('button', { name: /^Begin a/ }).first().click(); await page.waitForTimeout(250)
  await page.getByRole('button', { name: /Begin This Life/ }).click()
  await page.waitForSelector('header'); await page.waitForTimeout(400)
  // advance with the keyboard only
  console.log('===== PASSIVE MODE (keyboard only) =====')
  for (let i = 0; i < 90; i++) {
    if (await page.getByRole('button', { name: /Start Another Life/ }).count()) break
    await page.keyboard.press('Space'); await page.waitForTimeout(70)
  }
  const age = Number((await page.evaluate(() => document.querySelector('header')?.innerText || '')).match(/age (\d+)/)?.[1] ?? -1)
  console.log('age after 90 spacebars:', age)
  const txt = await page.locator('#root').innerText()
  console.log('has Activities button:', /Activities/.test(txt))
  console.log('has action budget:', /\d+ left|none left/.test(txt))
  console.log('bottom bar:', txt.slice(-160).replace(/\n/g, ' | '))
  console.log('shot:', await shot(page, 'passive-life-vp'))
  console.log('fullshot:', await shotFull(page, 'passive-life'))
  // Tab order on the life screen
  const order = []
  for (let i = 0; i < 16; i++) {
    await page.keyboard.press('Tab')
    order.push(await page.evaluate(() => {
      const e = document.activeElement; if (!e) return 'none'
      return `${e.tagName}:${(e.textContent || '').trim().slice(0, 22)}`
    }))
  }
  console.log('life screen tab order:', JSON.stringify(order))
  // aria roles inventory
  const a11y = await page.evaluate(() => ({
    tablist: document.querySelectorAll('[role=tablist]').length,
    tabs: document.querySelectorAll('[role=tab]').length,
    tabpanels: document.querySelectorAll('[role=tabpanel]').length,
    meters: document.querySelectorAll('[role=meter]').length,
    unnamed: [...document.querySelectorAll('button')].filter(b => !(b.textContent || '').trim() && !b.getAttribute('aria-label')).length,
    h1: [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ':' + h.textContent.trim().slice(0, 30)),
    landmarks: [...document.querySelectorAll('header,main,nav,footer,article,section')].map(e => e.tagName),
  }))
  console.log('a11y:', JSON.stringify(a11y))
  console.log(report('passive', errors, consoles))
  await browser.close()
}

// ── 2. Desktop width ──────────────────────────────────────────────────────
{
  const { browser, page, errors, consoles } = await launch({ width: 1440, height: 900, scale: 1 })
  await page.goto(URL, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(400)
  await page.evaluate(() => { try { localStorage.clear() } catch {} })
  await page.reload({ waitUntil: 'domcontentloaded' }); await page.waitForTimeout(400)
  await page.getByRole('button', { name: /^Begin a/ }).first().click(); await page.waitForTimeout(250)
  await page.getByRole('button', { name: /Begin This Life/ }).click()
  await page.waitForSelector('header'); await page.waitForTimeout(300)
  for (let i = 0; i < 160; i++) {
    if (await page.getByRole('button', { name: /Start Another Life/ }).count()) break
    const cb = page.locator('article button')
    if (await cb.count()) {
      const tx = await cb.allInnerTexts()
      const v = tx.map((t, k) => ({ t, k })).filter(o => !/What was happening/i.test(o.t))
      if (v.length) { await cb.nth(v[0].k).click().catch(() => {}); await page.waitForTimeout(60); continue }
    }
    const b = page.getByRole('button', { name: /^Another year$/ })
    if (await b.count()) { await b.first().click().catch(() => {}); await page.waitForTimeout(60) }
  }
  console.log('\n===== DESKTOP 1440 =====')
  if (await page.getByRole('button', { name: /Start Another Life/ }).count()) {
    console.log('died; death shot:', await shot(page, 'desktop-death'))
  } else {
    console.log('hscroll:', JSON.stringify(await hscroll(page)))
    const ov = await overflowers(page); if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 6)))
    console.log('shot:', await shot(page, 'desktop-life'))
    for (const t of ['Stats', 'People', 'Assets']) {
      await page.getByRole('tab', { name: t }).first().click(); await page.waitForTimeout(220)
      console.log(`${t} shot:`, await shot(page, `desktop-${t}`))
    }
    const act = page.getByRole('button', { name: /Activities/ })
    if (await act.count()) { await act.first().click(); await page.waitForTimeout(400); console.log('activities shot:', await shot(page, 'desktop-activities')) }
  }
  console.log(report('desktop', errors, consoles))
  await browser.close()
}
