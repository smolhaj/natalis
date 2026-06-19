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

const html = await page.evaluate(() => document.body.innerHTML);
console.log('=== TITLE SCREEN HTML (first 3000 chars) ===');
console.log(html.substring(0, 3000));

// Look for buttons
const buttons = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('button')).map(b => ({
    text: b.textContent.trim(),
    className: b.className,
    id: b.id,
  }));
});
console.log('\n=== BUTTONS ===');
console.log(JSON.stringify(buttons, null, 2));

// Click Random Life
const randomBtn = await page.getByText('Random Life').first();
await randomBtn.click();
await page.waitForTimeout(500);

const html2 = await page.evaluate(() => document.body.innerHTML);
console.log('\n=== AFTER RANDOM LIFE CLICK (first 5000 chars) ===');
console.log(html2.substring(0, 5000));

const buttons2 = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('button')).map(b => ({
    text: b.textContent.trim().substring(0, 60),
    className: b.className,
    id: b.id,
  }));
});
console.log('\n=== BUTTONS AFTER CLICK ===');
console.log(JSON.stringify(buttons2, null, 2));

await browser.close();
