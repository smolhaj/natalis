import { chromium } from 'playwright';

const CHROME_PATH = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
const page = await browser.newPage();

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.querySelectorAll('button').forEach(b => { if (b.textContent.includes('Random Life')) b.click(); }));
await page.waitForTimeout(400);
await page.evaluate(() => document.querySelectorAll('button').forEach(b => { if (b.textContent.includes('Begin This Life')) b.click(); }));
await page.waitForTimeout(600);

const stdSet = new Set(['📖Life', '📊Stats', '👥People', '🏠Assets', 'Recent', 'Timeline',
  '🔍 Search', '⚡ Activities', 'Age Up +', '← Back', '✕ Close', '🔒 Prison Life', 'Historical context']);

let ageUps = 0;
let lastNonReadyState = null;

for (let i = 0; i < 300; i++) {
  const state = await page.evaluate((std) => {
    const text = document.body.textContent;
    const buttons = Array.from(document.querySelectorAll('button'));
    const isDead = text.includes('Ribbons Earned') || text.includes('Life Summary') || text.includes('Epitaph');
    if (isDead) return { state: 'dead' };

    const hasTrial = buttons.some(b => b.textContent.includes('No Lawyer') || b.textContent.includes('Mid-tier'));
    if (hasTrial) return { state: 'trial' };

    const hasPending = buttons.some(b => b.textContent.includes('life event needs'));
    const nonStd = buttons.filter(b => {
      const t = b.textContent.trim();
      return t.length > 3 && !std.includes(t) && !b.disabled && !t.startsWith('↑') && !t.startsWith('←')
        && !t.includes('Historical') && !t.includes('life event needs');
    }).map(b => b.textContent.trim());

    if (hasPending || nonStd.length > 0) return { state: 'pending_event', choices: nonStd };

    const ageUpBtn = buttons.find(b => b.textContent.includes('Age Up'));
    if (!ageUpBtn) return { state: 'no_age_up', allBtns: buttons.map(b => b.textContent.trim()), bodySnippet: text.substring(0, 300) };
    if (ageUpBtn.disabled) return { state: 'disabled' };
    return { state: 'ready' };
  }, [...stdSet]);

  if (state.state === 'dead') { console.log(`DIED after ${ageUps} age-ups`); break; }
  if (state.state === 'trial') {
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('No Lawyer') || b.textContent.includes('Mid-tier'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(300);
    continue;
  }
  if (state.state === 'pending_event') {
    const r = await page.evaluate((std) => {
      for (const btn of document.querySelectorAll('button')) {
        const t = btn.textContent.trim();
        if (t.length > 3 && !std.includes(t) && !btn.disabled && !t.startsWith('↑') && !t.startsWith('←')
            && !t.includes('Historical') && !t.includes('life event needs')) {
          btn.click(); return t;
        }
      }
      return null;
    }, [...stdSet]);
    await page.waitForTimeout(350);
    continue;
  }
  if (state.state === 'no_age_up') {
    if (lastNonReadyState !== 'no_age_up' || i % 5 === 0) {
      console.log(`\nno_age_up at iter ${i} (ageUps=${ageUps}):`);
      console.log('  allBtns:', state.allBtns);
      console.log('  body:', state.bodySnippet?.substring(0, 200));
    }
    lastNonReadyState = 'no_age_up';
    await page.waitForTimeout(300);
    if (i > ageUps * 5 + 20) { console.log('STUCK'); break; }
    continue;
  }
  if (state.state === 'disabled') {
    await page.waitForTimeout(300);
    continue;
  }

  // ready
  if (ageUps >= 50) { console.log('MAX'); break; }
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Age Up'));
    if (btn && !btn.disabled) btn.click();
  });
  await page.waitForTimeout(350);
  ageUps++;
  lastNonReadyState = null;
  if (ageUps % 5 === 0) console.log(`Age-ups: ${ageUps}`);
}

await browser.close();
