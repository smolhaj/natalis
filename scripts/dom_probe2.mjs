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

// Click Random Life
await page.getByText('Random Life').first().click();
await page.waitForTimeout(500);

// Click Begin This Life
await page.getByText('Begin This Life').first().click();
await page.waitForTimeout(1000);

const html3 = await page.evaluate(() => document.body.innerHTML);
console.log('=== LIFE SCREEN (first 8000 chars) ===');
console.log(html3.substring(0, 8000));

const buttons3 = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('button')).map(b => ({
    text: b.textContent.trim().substring(0, 80),
    className: b.className.substring(0, 60),
  }));
});
console.log('\n=== BUTTONS ON LIFE SCREEN ===');
console.log(JSON.stringify(buttons3, null, 2));

// Look for Age Up button and life log
const ageUpInfo = await page.evaluate(() => {
  const ageUpBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Age Up'));
  const lifeLog = document.querySelector('[class*="life-log"]') || document.querySelector('[class*="log"]') || document.querySelector('.space-y-3');
  return {
    ageUpFound: !!ageUpBtn,
    ageUpText: ageUpBtn?.textContent.trim(),
    lifeLogSelector: lifeLog?.className,
    lifeLogText: lifeLog?.textContent.substring(0, 200),
  };
});
console.log('\n=== AGE UP AND LIFE LOG ===');
console.log(JSON.stringify(ageUpInfo, null, 2));

await browser.close();
