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

// First age up to get an event
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Age Up'));
  if (btn && !btn.disabled) btn.click();
});
await page.waitForTimeout(600);

// Check if pending event
const eventState = await page.evaluate(() => {
  const eventHeaders = Array.from(document.querySelectorAll('.bg-bit-blue'));
  for (const h of eventHeaders) {
    if (h.textContent.includes('Life Event') || h.textContent.includes('World Event')) {
      // Try different ways to get the card
      const card1 = h.closest('.bg-white.rounded-2xl');
      const card2 = h.closest('.bg-white');
      const parent1 = h.parentElement;
      const parent2 = h.parentElement?.parentElement;

      const findChoices = (container) => {
        if (!container) return [];
        return Array.from(container.querySelectorAll('button'))
          .filter(b => b.textContent.trim().length > 3 && !b.textContent.includes('Historical') && !b.disabled)
          .map(b => b.textContent.trim());
      };

      return {
        headerText: h.textContent.trim(),
        card1Found: !!card1,
        card1Choices: findChoices(card1),
        card2Found: !!card2,
        card2Choices: findChoices(card2),
        parent1Class: parent1?.className,
        parent1Choices: findChoices(parent1),
        parent2Class: parent2?.className,
        parent2Choices: findChoices(parent2),
      };
    }
  }
  return null;
});
console.log('Event state:', JSON.stringify(eventState, null, 2));

// Try clicking via the "What will you do?" approach
const clickResult = await page.evaluate(() => {
  // Find any button that's NOT in the standard UI
  const STD = new Set(['📖Life', '📊Stats', '👥People', '🏠Assets', 'Recent', 'Timeline', '🔍 Search', '⚡ Activities', 'Age Up +']);
  const allBtns = Array.from(document.querySelectorAll('button'));
  for (const btn of allBtns) {
    const text = btn.textContent.trim();
    if (text.length > 3 && !STD.has(text) && !btn.disabled && !text.startsWith('↑') && !text.startsWith('←')) {
      btn.click();
      return text;
    }
  }
  return null;
});
console.log('\nClicked:', clickResult);

await page.waitForTimeout(500);

// Check if event was resolved
const ageUpBack = await page.evaluate(() =>
  Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Age Up'))
);
console.log('Age up button back:', ageUpBack);

await browser.close();
