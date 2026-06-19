import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });
await page.getByText('Craft a Life').first().click();
await page.waitForTimeout(500);

// Step 1: country selection
let html = await page.evaluate(() => document.body.innerHTML);
console.log('=== CRAFT STEP 1 (first 5000 chars) ===');
console.log(html.substring(0, 5000));

const buttons1 = await page.evaluate(() =>
  Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().substring(0, 80))
);
console.log('\n=== BUTTONS STEP 1 ===');
console.log(buttons1.slice(0, 20));

await browser.close();
