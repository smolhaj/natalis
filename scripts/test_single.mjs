import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();
page.on('pageerror', err => console.error('[PE]', err.message));
page.on('console', msg => {
  if (msg.type() === 'error' && !msg.text().includes('404') && !msg.text().includes('favicon')) {
    console.error('[CE]', msg.text().substring(0, 200));
  }
});

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });

// Click Craft a Life via JS
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Craft a Life'));
  if (btn) btn.click();
});
await page.waitForTimeout(400);

// Fill search
await page.locator('input[placeholder="Search countries..."]').fill('Nigeria');
await page.waitForTimeout(300);

// Click Nigeria
const clicked = await page.evaluate((c) => {
  const btns = Array.from(document.querySelectorAll('button'));
  const btn = btns.find(b => b.textContent.trim().startsWith(c));
  if (btn) { btn.click(); return btn.textContent.trim(); }
  return null;
}, 'Nigeria');
console.log('Nigeria clicked:', clicked);
await page.waitForTimeout(300);

// Click Next
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('Next'));
  if (btn) btn.click();
  else console.log('No Next button found');
});
await page.waitForTimeout(400);

const step = await page.evaluate(() => document.body.textContent.includes('Step 2') ? 2 : 1);
console.log('Now on step:', step);

// Set range to 1965
await page.evaluate((val) => {
  const input = document.querySelector('input[type="range"]');
  if (input) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, val);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    console.log('Set range to:', val, 'current:', input.value);
  } else {
    console.log('No range input found');
  }
}, '1965');
await page.waitForTimeout(200);

// Click male
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === '♂ Male');
  if (btn) btn.click();
  else console.log('No male button');
});
await page.waitForTimeout(200);

// Click Next (step 2)
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('Next'));
  if (btn) btn.click();
});
await page.waitForTimeout(400);

const step3 = await page.evaluate(() => document.body.textContent.includes('Step 3') ? 3 : '?');
console.log('Now on step:', step3);

// Click Preview -> (step 3)
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b =>
    b.textContent.trim().startsWith('Preview') || b.textContent.trim().startsWith('Next')
  );
  if (btn) btn.click();
  else console.log('No Preview button');
});
await page.waitForTimeout(400);

const step4 = await page.evaluate(() => document.body.textContent.includes('Step 4') ? 4 : '?');
console.log('Now on step:', step4);

// Click Begin This Life
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Begin This Life'));
  if (btn) btn.click();
  else console.log('No Begin This Life button');
});
await page.waitForTimeout(600);

// Check if on game screen
const onGameScreen = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Age Up'));
});
console.log('On game screen:', onGameScreen);

if (onGameScreen) {
  // Do a few age ups
  for (let i = 0; i < 5; i++) {
    const state = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Age Up'));
      if (!btn) return 'missing';
      if (btn.disabled) return 'disabled';
      btn.click();
      return 'clicked';
    });
    console.log(`Age up ${i+1}: ${state}`);
    await page.waitForTimeout(400);
  }

  const header = await page.evaluate(() => {
    const h = document.querySelector('header p.text-natalis-muted.text-xs');
    return h?.textContent;
  });
  console.log('Header:', header);
}

await browser.close();
