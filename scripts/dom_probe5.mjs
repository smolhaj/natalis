import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });
await page.getByText('Random Life').first().click();
await page.waitForTimeout(500);
await page.getByText('Begin This Life').first().click();
await page.waitForTimeout(500);

// Do many age ups looking for event choices
for (let i = 0; i < 30; i++) {
  const ageUpBtn = page.locator('button').filter({ hasText: 'Age Up' });
  const ageUpDisabled = await ageUpBtn.evaluate(el => el.disabled);

  if (ageUpDisabled) {
    console.log(`Age up disabled at step ${i}, checking for pending choices...`);
    const html = await page.evaluate(() => document.body.innerHTML);
    console.log('HTML when disabled:', html.substring(0, 3000));
    break;
  }

  await ageUpBtn.click();
  await page.waitForTimeout(300);

  // Check if age up is now disabled (choice required)
  const disabled = await ageUpBtn.evaluate(el => el.disabled).catch(() => false);
  if (disabled) {
    console.log(`\n=== CHOICES REQUIRED at step ${i} ===`);
    const html = await page.evaluate(() => document.body.innerHTML);

    // Find all buttons that aren't the standard UI buttons
    const allButtons = await page.evaluate(() => {
      const stdButtons = new Set(['📖Life', '📊Stats', '👥People', '🏠Assets', 'Recent', 'Timeline', '🔍 Search', '⚡ Activities', 'Age Up +', '← Back']);
      return Array.from(document.querySelectorAll('button')).map(b => ({
        text: b.textContent.trim().substring(0, 100),
        disabled: b.disabled,
        className: b.className.substring(0, 80),
      })).filter(b => !stdButtons.has(b.text));
    });
    console.log('Choice buttons:', JSON.stringify(allButtons, null, 2));

    // Try clicking first non-standard button
    const choiceButtons = allButtons.filter(b => !b.disabled);
    if (choiceButtons.length > 0) {
      try {
        await page.locator('button').filter({ hasText: choiceButtons[0].text.substring(0, 20) }).first().click();
        await page.waitForTimeout(300);
        console.log('Clicked choice:', choiceButtons[0].text);
      } catch(e) {
        console.log('Error clicking choice:', e.message);
      }
    }
  }
}

// Get the life log text
const lifeLogs = await page.evaluate(() => {
  const allText = document.querySelectorAll('.rounded-xl.px-4.py-3.border.text-sm');
  return Array.from(allText).map(el => el.textContent.trim().substring(0, 200));
});
console.log('\n=== LIFE LOG ===');
lifeLogs.forEach((l, i) => console.log(`${i}: ${l}\n`));

await browser.close();
