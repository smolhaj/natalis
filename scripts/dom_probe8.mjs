import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });
await page.getByText('Craft a Life').first().click();
await page.waitForTimeout(400);

// Step 1: Select Nigeria
const searchInput = page.locator('input[placeholder="Search countries..."]');
await searchInput.fill('Nigeria');
await page.waitForTimeout(300);

const buttons = await page.evaluate(() =>
  Array.from(document.querySelectorAll('button')).map(b => ({
    text: b.textContent.trim().substring(0, 80),
    disabled: b.disabled,
  }))
);
console.log('Buttons after search:', JSON.stringify(buttons, null, 2));

// Check the Next button state
const nextBtn = page.locator('button').filter({ hasText: 'Next →' });
const nextDisabled = await nextBtn.evaluate(el => el.disabled).catch(() => 'not found');
console.log('\nNext button disabled state:', nextDisabled);

// Click Nigeria
await page.locator('button').filter({ hasText: 'Nigeria' }).first().click();
await page.waitForTimeout(300);

const buttons2 = await page.evaluate(() =>
  Array.from(document.querySelectorAll('button')).map(b => ({
    text: b.textContent.trim().substring(0, 80),
    disabled: b.disabled,
  }))
);
console.log('\nButtons after selecting Nigeria:', JSON.stringify(buttons2, null, 2));

const nextDisabled2 = await nextBtn.evaluate(el => el.disabled).catch(() => 'not found');
console.log('\nNext button disabled state after selection:', nextDisabled2);

await browser.close();
