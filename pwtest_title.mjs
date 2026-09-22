import { launch, shot, shotFull, hscroll, overflowers, report, URL } from './pwtest_harness.mjs'

const widths = [[430, 932, 'p430'], [390, 844, 'p390'], [1280, 900, 'desktop']]

for (const [w, h, tag] of widths) {
  const { browser, page, errors, consoles } = await launch({ width: w, height: h, scale: w < 500 ? 2 : 1 })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  console.log(`\n===== TITLE @ ${tag} (${w}x${h}) =====`)
  console.log('hscroll:', JSON.stringify(await hscroll(page)))
  const ov = await overflowers(page)
  if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov, null, 1))
  console.log('shot:', await shotFull(page, `title-${tag}`))
  // button inventory + accessible names
  const btns = await page.evaluate(() =>
    [...document.querySelectorAll('button,a,input,select,[role=tab]')].map(b => ({
      tag: b.tagName, text: (b.textContent || '').trim().slice(0, 50),
      aria: b.getAttribute('aria-label'), pressed: b.getAttribute('aria-pressed'),
      name: (b.textContent || '').trim() || b.getAttribute('aria-label') || '(NO NAME)',
    })))
  console.log('controls:', JSON.stringify(btns, null, 1))
  // Keyboard reachability
  const tabOrder = []
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    const a = await page.evaluate(() => {
      const e = document.activeElement
      if (!e) return null
      const st = getComputedStyle(e)
      return { tag: e.tagName, text: (e.textContent || '').trim().slice(0, 40), outline: st.outlineStyle + ' ' + st.outlineWidth, boxShadow: st.boxShadow.slice(0,40) }
    })
    tabOrder.push(a)
  }
  console.log('tab order:', JSON.stringify(tabOrder))
  // toggle Witness
  await page.getByRole('button', { name: /Witness/ }).click()
  await page.waitForTimeout(300)
  console.log('footer after Witness:', await page.locator('p.italic').last().textContent())
  console.log(await shot(page, `title-witness-${tag}`))
  console.log(report(tag, errors, consoles))
  await browser.close()
}
