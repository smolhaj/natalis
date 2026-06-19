import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});

const page = await browser.newPage();
page.on('pageerror', err => console.error('[PE]', err.message));
page.on('console', msg => {
  if (msg.type() === 'error' && !msg.text().includes('404') && !msg.text().includes('favicon') && !msg.text().includes('Warning:')) {
    console.error('[CE]', msg.text().substring(0, 200));
  }
});

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

// Simple game loop
let ageUps = 0;
let stuckCount = 0;

for (let i = 0; i < 200; i++) {
  const state = await page.evaluate(() => {
    const text = document.body.textContent;
    const buttons = Array.from(document.querySelectorAll('button'));
    const isDead = text.includes('Ribbons Earned') || text.includes('Life Summary') || text.includes('Epitaph');
    if (isDead) return { state: 'dead' };

    const hasTrial = buttons.some(b => b.textContent.includes('No Lawyer') || b.textContent.includes('Mid-tier'));
    if (hasTrial) return { state: 'trial' };

    const eventHeaders = Array.from(document.querySelectorAll('.bg-bit-blue'));
    for (const h of eventHeaders) {
      if (h.textContent.includes('Life Event') || h.textContent.includes('World Event')) {
        const card = h.closest('.bg-white.rounded-2xl') || h.parentElement?.parentElement;
        const choiceBtns = card ? Array.from(card.querySelectorAll('button')).filter(b =>
          b.textContent.trim().length > 3 && !b.textContent.includes('Historical') && !b.disabled
        ) : [];
        return { state: 'event', choices: choiceBtns.map(b => b.textContent.trim()) };
      }
    }

    const ageUpBtn = buttons.find(b => b.textContent.includes('Age Up'));
    if (!ageUpBtn) return { state: 'no_age_up' };
    if (ageUpBtn.disabled) return { state: 'disabled' };
    return { state: 'ready' };
  });

  if (state.state === 'dead') {
    console.log(`Died after ${ageUps} age-ups`);
    break;
  }

  if (state.state === 'trial') {
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('No Lawyer') || b.textContent.includes('Mid-tier'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(300);
    stuckCount = 0;
    continue;
  }

  if (state.state === 'event') {
    if (state.choices.length > 0) {
      const choice = state.choices[0];
      await page.evaluate((c) => {
        const eventHeaders = Array.from(document.querySelectorAll('.bg-bit-blue'));
        for (const h of eventHeaders) {
          const card = h.closest('.bg-white.rounded-2xl') || h.parentElement?.parentElement;
          if (card) {
            const btn = Array.from(card.querySelectorAll('button')).find(b => b.textContent.trim() === c);
            if (btn) { btn.click(); return; }
          }
        }
      }, choice);
      console.log(`Chose: "${choice.substring(0, 50)}"`);
      await page.waitForTimeout(300);
      stuckCount = 0;
    } else {
      // Event with no choices — this shouldn't happen (auto-resolve is handled by engine)
      // But wait a bit and retry
      stuckCount++;
      await page.waitForTimeout(200);
      if (stuckCount > 10) {
        console.log('Stuck: event with no choices');
        break;
      }
    }
    continue;
  }

  if (state.state === 'no_age_up' || state.state === 'disabled') {
    stuckCount++;
    await page.waitForTimeout(200);
    if (stuckCount > 10) {
      console.log(`Stuck: ${state.state}`);
      break;
    }
    continue;
  }

  // Ready - click age up
  if (ageUps >= 40) {
    console.log('Max age-ups reached');
    break;
  }
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Age Up'));
    if (btn && !btn.disabled) btn.click();
  });
  await page.waitForTimeout(350);
  ageUps++;
  stuckCount = 0;
  console.log(`Age up ${ageUps}`);
}

// Get log entries
const entries = await page.evaluate(() => {
  const divs = document.querySelectorAll('.rounded-xl.px-4.py-3.border.text-sm');
  return Array.from(divs).map(d => {
    const age = d.querySelector('.font-bold.mr-2')?.textContent.trim();
    const text = d.querySelector('span:last-child')?.textContent.trim();
    return { age, text: text?.substring(0, 150) };
  }).filter(e => e.text && e.text.length > 5);
});
console.log('\nLog entries:', entries.length);
entries.slice(0, 10).forEach(e => console.log(` ${e.age}: ${e.text}`));

await browser.close();
