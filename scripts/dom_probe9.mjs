import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();
page.on('console', msg => {
  if (msg.type() === 'error') console.error('[CE]', msg.text().substring(0, 200));
});

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });
await page.getByText('Craft a Life').first().click();
await page.waitForTimeout(400);

// List all buttons
let btns = await page.evaluate(() =>
  Array.from(document.querySelectorAll('button')).map(b => ({
    text: b.textContent.trim(),
    disabled: b.disabled,
    encoded: Array.from(b.textContent.trim()).map(c => c.charCodeAt(0).toString(16)).join(' ')
  }))
);
console.log('Initial buttons:');
btns.forEach(b => console.log(`  "${b.text}" disabled:${b.disabled} hex:[${b.encoded}]`));

// Fill search
await page.locator('input[placeholder="Search countries..."]').fill('Nigeria');
await page.waitForTimeout(300);

btns = await page.evaluate(() =>
  Array.from(document.querySelectorAll('button')).map(b => ({
    text: b.textContent.trim(),
    disabled: b.disabled,
    encoded: Array.from(b.textContent.trim()).map(c => c.charCodeAt(0).toString(16)).join(' ')
  }))
);
console.log('\nAfter search "Nigeria":');
btns.forEach(b => console.log(`  "${b.text.substring(0, 50)}" disabled:${b.disabled} hex:[${b.encoded.substring(0, 50)}]`));

// Click Nigeria
await page.locator('button').filter({ hasText: 'Nigeria' }).first().click();
await page.waitForTimeout(200);

btns = await page.evaluate(() =>
  Array.from(document.querySelectorAll('button')).map(b => ({
    text: b.textContent.trim(),
    disabled: b.disabled,
  }))
);
console.log('\nAfter clicking Nigeria:');
btns.forEach(b => console.log(`  "${b.text.substring(0, 50)}" disabled:${b.disabled}`));

// Try clicking Next -> directly via JS
const clicked = await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  const nextBtn = btns.find(b => b.textContent.trim().startsWith('Next'));
  console.log('Next btn found:', !!nextBtn, 'text:', nextBtn?.textContent.trim(), 'disabled:', nextBtn?.disabled);
  if (nextBtn && !nextBtn.disabled) {
    nextBtn.click();
    return 'clicked';
  }
  return 'not clicked: ' + (nextBtn ? 'disabled' : 'not found');
});
console.log('\nNext click result:', clicked);
await page.waitForTimeout(400);

const step = await page.evaluate(() => document.body.textContent.includes('Step 2') ? 2 : 1);
console.log('Current step:', step);

await browser.close();
