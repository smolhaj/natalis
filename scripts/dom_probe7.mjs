import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();
page.on('pageerror', err => console.error('[pageerror]', err.message));
page.on('console', msg => {
  if (msg.type() === 'error') console.error('[console error]', msg.text());
});

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });
await page.getByText('Craft a Life').first().click();
await page.waitForTimeout(400);

// Step 1: Select Nigeria
const searchInput = page.locator('input[placeholder="Search countries..."]');
await searchInput.fill('Nigeria');
await page.waitForTimeout(300);

// List what appears
const buttons = await page.evaluate(() =>
  Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().substring(0, 60))
);
console.log('Buttons after search:', buttons.slice(0, 10));

// Click Nigeria
await page.locator('button').filter({ hasText: 'Nigeria' }).first().click();
await page.waitForTimeout(300);

// Click Next
await page.locator('button').filter({ hasText: 'Next →' }).first().click();
await page.waitForTimeout(400);

// Step 2 - check what's there
const html2 = await page.evaluate(() => document.body.innerHTML);
console.log('\n=== STEP 2 HTML ===');
console.log(html2.substring(0, 4000));

// Check for range input vs number input
const inputs = await page.evaluate(() =>
  Array.from(document.querySelectorAll('input')).map(i => ({
    type: i.type,
    min: i.min,
    max: i.max,
    value: i.value,
    placeholder: i.placeholder,
  }))
);
console.log('\nInputs found:', JSON.stringify(inputs, null, 2));

// Try setting the year input
try {
  const rangeInput = page.locator('input[type="range"]');
  const rangeCount = await rangeInput.count();
  console.log('\nRange inputs found:', rangeCount);

  const numInput = page.locator('input[type="number"]');
  const numCount = await numInput.count();
  console.log('Number inputs found:', numCount);

  if (numCount > 0) {
    await numInput.fill('1960');
    await numInput.blur();
    console.log('Set year to 1960 via number input');
  } else if (rangeCount > 0) {
    await rangeInput.fill('1960');
    console.log('Set year to 1960 via range input');
  }
} catch(e) {
  console.error('Error setting year:', e.message);
}

await browser.close();
