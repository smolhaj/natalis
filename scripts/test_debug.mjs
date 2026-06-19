import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });

// Random life
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Random Life'));
  if (btn) btn.click();
});
await page.waitForTimeout(400);

await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Begin This Life'));
  if (btn) btn.click();
});
await page.waitForTimeout(600);

// First age up
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Age Up'));
  if (btn && !btn.disabled) btn.click();
});
await page.waitForTimeout(600);

// Check what's on screen
const debugInfo = await page.evaluate(() => {
  const text = document.body.textContent;
  const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
    text: b.textContent.trim().substring(0, 80),
    disabled: b.disabled,
  }));

  const eventHeaders = Array.from(document.querySelectorAll('.bg-bit-blue'));
  const eventInfo = eventHeaders.map(h => ({
    text: h.textContent.trim().substring(0, 50),
    cardText: (h.closest('.bg-white.rounded-2xl') || h.parentElement?.parentElement)?.textContent?.trim()?.substring(0, 200),
  }));

  return { buttons, eventInfo, bodyTextSnippet: text.substring(0, 500) };
});

console.log('=== PAGE STATE AFTER FIRST AGE UP ===');
console.log('\nButtons:', JSON.stringify(debugInfo.buttons, null, 2));
console.log('\nEvent headers:', JSON.stringify(debugInfo.eventInfo, null, 2));
console.log('\nBody text:', debugInfo.bodyTextSnippet);

await browser.close();
