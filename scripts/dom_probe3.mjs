import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();
page.on('console', msg => {
  if (msg.type() === 'error') console.error('[console error]', msg.text());
});
page.on('pageerror', err => console.error('[pageerror]', err.message));

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });
await page.getByText('Random Life').first().click();
await page.waitForTimeout(500);
await page.getByText('Begin This Life').first().click();
await page.waitForTimeout(500);

// Do a few age-ups and look at event structure
for (let i = 0; i < 5; i++) {
  const ageUpBtn = page.locator('button').filter({ hasText: 'Age Up' });
  await ageUpBtn.click();
  await page.waitForTimeout(500);

  // Check for event modal / choices
  const html = await page.evaluate(() => document.body.innerHTML);

  // Look for event choices
  const choices = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim()).filter(t => t && !['📖Life', '📊Stats', '👥People', '🏠Assets', 'Recent', 'Timeline', '🔍 Search', '⚡ Activities', 'Age Up +'].includes(t));
  });

  if (choices.length > 0) {
    console.log(`\n=== CHOICES after age up ${i+1} ===`);
    console.log(choices);

    // Get the event text
    const eventText = await page.evaluate(() => {
      const modal = document.querySelector('[class*="fixed inset"]') || document.querySelector('[class*="modal"]');
      if (modal) return modal.textContent.substring(0, 500);
      return null;
    });
    console.log('Event text:', eventText);

    // Click first choice
    if (choices[0]) {
      const btn = page.locator('button').filter({ hasText: choices[0] }).first();
      await btn.click();
      await page.waitForTimeout(300);
    }
  }
}

// Get life log entries
const logEntries = await page.evaluate(() => {
  const entries = document.querySelectorAll('.space-y-3 > div');
  return Array.from(entries).map(e => e.textContent.substring(0, 300));
});
console.log('\n=== LIFE LOG ENTRIES ===');
logEntries.forEach((e, i) => console.log(`Entry ${i}: ${e}\n`));

// Check the full HTML for the event modal if present
const fullHtml = await page.evaluate(() => document.body.innerHTML);
// Look for fixed modal
const modalMatch = fullHtml.match(/fixed inset[^>]*>(.{0,2000})/);
if (modalMatch) {
  console.log('\n=== MODAL HTML ===');
  console.log(modalMatch[0].substring(0, 2000));
}

await browser.close();
