import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();
page.on('console', msg => {
  if (msg.type() === 'error') console.error('[console error]', msg.text());
});

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });
await page.getByText('Random Life').first().click();
await page.waitForTimeout(500);
await page.getByText('Begin This Life').first().click();
await page.waitForTimeout(500);

// Click age up and immediately capture the full state
const ageUpBtn = page.locator('button').filter({ hasText: 'Age Up' });
await ageUpBtn.click();
await page.waitForTimeout(800);

const fullHtml = await page.evaluate(() => document.body.innerHTML);
console.log('FULL HTML after age up (first 12000 chars):');
console.log(fullHtml.substring(0, 12000));

await browser.close();
