import { launch, shot, shotFull, hscroll, overflowers, report, URL } from './pwtest_harness.mjs'

const { browser, page, errors, consoles } = await launch({ width: 430, height: 932, scale: 2 })
await page.goto(URL, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(400)
await page.getByRole('button', { name: /Choose where it starts/ }).click()
await page.waitForTimeout(400)

async function dump(tag) {
  const hs = await hscroll(page)
  const ov = await overflowers(page)
  console.log(`\n===== ${tag} =====`)
  console.log('hscroll:', JSON.stringify(hs), hs.docScrollW > hs.inner + 1 ? ' << HSCROLL' : '')
  if (ov.length) console.log('OVERFLOW:', JSON.stringify(ov.slice(0, 8), null, 1))
  console.log('shot:', await shotFull(page, `curated-${tag}`))
  console.log((await page.locator('#root').innerText()).slice(0, 2200))
}

await dump('step1-initial')

// Search for a country
const search = page.locator('input[type=text]').first()
await search.fill('nigeria')
await page.waitForTimeout(300)
await dump('step1-search')
// Nonsense search
await search.fill('zzzzz')
await page.waitForTimeout(300)
console.log('\nEMPTY SEARCH RESULT TEXT:', (await page.locator('#root').innerText()).slice(0, 700))
console.log('shot:', await shotFull(page, 'curated-step1-nomatch'))
await search.fill('nigeria')
await page.waitForTimeout(250)
await page.getByRole('button', { name: /Nigeria/ }).first().click()
await page.waitForTimeout(300)
await dump('step1-selected')

// Next
const next = () => page.getByRole('button', { name: /Next|Preview|Begin This Life/ }).last()
await next().click(); await page.waitForTimeout(350)
await dump('step2')
// pick gender
const fem = page.getByRole('button', { name: /Female/ })
if (await fem.count()) { await fem.first().click(); await page.waitForTimeout(200) }
// move the year slider
const slider = page.locator('input[type=range]')
if (await slider.count()) {
  await slider.first().focus()
  for (let i = 0; i < 20; i++) await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(250)
  console.log('year after 20x ArrowLeft:', (await page.locator('#root').innerText()).match(/Birth Year\s*\n?\s*(\d{4})/)?.[1], 'slider value:', await slider.first().inputValue())
  for (let i = 0; i < 60; i++) await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(250)
  console.log('year after 60x ArrowRight:', (await page.locator('#root').innerText()).match(/Birth Year\s*\n?\s*(\d{4})/)?.[1], 'slider value:', await slider.first().inputValue())
}
await dump('step2-filled')

await next().click(); await page.waitForTimeout(350)
await dump('step3')
for (const nm of [/Rural/, /Struggling/]) {
  const b = page.getByRole('button', { name: nm })
  if (await b.count()) { await b.first().click(); await page.waitForTimeout(150) }
}
// religion
const rel = page.locator('button').filter({ hasText: /Muslim|Christian|Catholic|None/ })
if (await rel.count()) { await rel.first().click(); await page.waitForTimeout(150) }
await dump('step3-filled')

await next().click(); await page.waitForTimeout(400)
await dump('step4-preview')

// Back navigation
const back = page.getByRole('button', { name: /^Back|←/ })
console.log('back buttons:', await back.count())
await back.first().click(); await page.waitForTimeout(300)
console.log('after back, step text:', (await page.locator('#root').innerText()).match(/Step \d of 4/)?.[0])
await shotFull(page, 'curated-after-back')

console.log(report('curated', errors, consoles))
await browser.close()
