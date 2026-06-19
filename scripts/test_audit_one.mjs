// Quick test: run one random life with the audit script logic
import { chromium } from 'playwright';

const CHROME_PATH = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const MAX_AGEUPS = 50;

async function getLogEntries(page) {
  return page.evaluate(() => {
    const entries = [];
    const logDivs = document.querySelectorAll('.rounded-xl.px-4.py-3.border.text-sm');
    for (const div of logDivs) {
      const ageEl = div.querySelector('.font-bold.mr-2');
      const textEl = div.querySelector('span:last-child');
      if (ageEl && textEl) {
        const ageText = ageEl.textContent.trim();
        const ageMatch = ageText.match(/Age (\d+)/);
        const text = textEl.textContent.trim();
        if (text && text.length > 5) {
          entries.push({ age: ageMatch ? parseInt(ageMatch[1]) : null, text });
        }
      }
    }
    return entries;
  });
}

async function getPageState(page) {
  return page.evaluate(() => {
    const text = document.body.textContent;
    const buttons = Array.from(document.querySelectorAll('button'));

    const isDead = text.includes('Ribbons Earned') || text.includes('Life Summary')
      || text.includes('Epitaph') || text.includes('passed away at');
    if (isDead) return { state: 'dead' };

    const hasTrial = buttons.some(b => b.textContent.includes('No Lawyer') || b.textContent.includes('Mid-tier'));
    if (hasTrial) return { state: 'trial' };

    const hasPendingEventIndicator = buttons.some(b => b.textContent.includes('life event needs'));

    const stdSet = new Set(['📖Life', '📊Stats', '👥People', '🏠Assets', 'Recent', 'Timeline',
      '🔍 Search', '⚡ Activities', 'Age Up +', '← Back', '✕ Close', '🔒 Prison Life',
      'Historical context']);
    const nonStdBtns = buttons.filter(b => {
      const t = b.textContent.trim();
      return t.length > 3 && !stdSet.has(t) && !b.disabled
        && !t.startsWith('↑') && !t.startsWith('←') && !t.includes('Historical context')
        && !t.includes('life event needs');
    }).map(b => b.textContent.trim());

    if (hasPendingEventIndicator) {
      return { state: 'pending_event', choices: nonStdBtns };
    }

    const ageUpBtn = buttons.find(b => b.textContent.includes('Age Up'));
    if (!ageUpBtn) return { state: 'no_age_up', nonStd: nonStdBtns };
    if (ageUpBtn.disabled) return { state: 'disabled' };
    return { state: 'ready' };
  });
}

const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', msg => { if (msg.type() === 'error' && !msg.text().includes('404') && !msg.text().includes('Warning:')) errors.push(msg.text()); });

await page.goto('http://localhost:5173/natalis/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.querySelectorAll('button').forEach(b => { if (b.textContent.includes('Random Life')) b.click(); }));
await page.waitForTimeout(400);
await page.evaluate(() => document.querySelectorAll('button').forEach(b => { if (b.textContent.includes('Begin This Life')) b.click(); }));
await page.waitForTimeout(600);

let ageUps = 0, stuckCount = 0;
const allLogs = [];
const seenTexts = new Set();

for (let i = 0; i < MAX_AGEUPS + 200; i++) {
  const state = await getPageState(page);
  console.log(`Iter ${i}: state=${state.state}${state.choices ? ' choices=' + JSON.stringify(state.choices.slice(0,2)) : ''}`);

  if (state.state === 'dead') { console.log('DIED'); break; }

  if (state.state === 'trial') {
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('No Lawyer') || b.textContent.includes('Mid-tier'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(300);
    stuckCount = 0;
    continue;
  }

  if (state.state === 'pending_event') {
    if (state.choices && state.choices.length > 0) {
      const stdSet = new Set(['📖Life', '📊Stats', '👥People', '🏠Assets', 'Recent', 'Timeline',
        '🔍 Search', '⚡ Activities', 'Age Up +', '← Back', '✕ Close', '🔒 Prison Life', 'Historical context']);
      const r = await page.evaluate((std) => {
        const allBtns = Array.from(document.querySelectorAll('button'));
        for (const btn of allBtns) {
          const text = btn.textContent.trim();
          if (text.length > 3 && !std.includes(text) && !btn.disabled
              && !text.startsWith('↑') && !text.startsWith('←') && !text.includes('Historical context') && !text.includes('life event needs')) {
            btn.click();
            return text;
          }
        }
        return null;
      }, [...stdSet]);
      console.log(`  -> Clicked choice: "${r}"`);
      await page.waitForTimeout(400);
      stuckCount = 0;
    } else {
      stuckCount++;
      await page.waitForTimeout(200);
      if (stuckCount > 10) { console.log('STUCK (pending with no choices)'); break; }
    }
    continue;
  }

  if (state.state === 'no_age_up' || state.state === 'disabled') {
    stuckCount++;
    await page.waitForTimeout(200);
    if (stuckCount > 10) { console.log(`STUCK (${state.state})`); break; }
    continue;
  }

  if (ageUps >= MAX_AGEUPS) { console.log('MAX AGE UPS'); break; }

  // Click age up
  const r = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Age Up'));
    if (btn && !btn.disabled) { btn.click(); return true; }
    return false;
  });
  if (r) {
    await page.waitForTimeout(350);
    ageUps++;
    stuckCount = 0;
    const entries = await getLogEntries(page);
    for (const e of entries) {
      if (!seenTexts.has(e.text)) { seenTexts.add(e.text); allLogs.push(e); }
    }
  }
}

console.log(`\nCompleted: ${ageUps} age-ups, ${allLogs.length} log entries, ${errors.length} errors`);
allLogs.slice(0, 10).forEach(e => console.log(`  Age ${e.age}: ${e.text?.substring(0, 100)}`));
await browser.close();
