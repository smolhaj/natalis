import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CHROME_PATH = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE_URL = 'http://localhost:5173/natalis/';
const MAX_AGEUPS = 80; // up to 80 age-ups per life

// Curated playthroughs — years adjusted to be within country yearRange
// Nigeria: 1960-2005, China/Germany/Russia/Brazil/SA/Philippines/Ukraine: 1950-2005
// India: 1947-2005, Iran: 1950-2005, Cambodia: 1953-2005
// USA = "United States": 1950-2005
const CURATED_CONFIGS = [
  { country: 'Nigeria', year: 1965, gender: 'male', label: 'Nigeria-1965-M' },
  { country: 'Nigeria', year: 1965, gender: 'female', label: 'Nigeria-1965-F' },
  { country: 'China', year: 1952, gender: 'male', label: 'China-1952-M' },
  { country: 'China', year: 1952, gender: 'female', label: 'China-1952-F' },
  { country: 'United States', year: 1955, gender: 'male', label: 'USA-1955-M' },
  { country: 'United States', year: 1955, gender: 'female', label: 'USA-1955-F' },
  { country: 'India', year: 1975, gender: 'female', label: 'India-1975-F' },
  { country: 'Iran', year: 1970, gender: 'female', label: 'Iran-1970-F' },
  { country: 'Germany', year: 1955, gender: 'male', label: 'Germany-1955-M' },
  { country: 'Cambodia', year: 1965, gender: 'male', label: 'Cambodia-1965-M' },
  { country: 'Russia', year: 1980, gender: 'male', label: 'Russia-1980-M' },
  { country: 'Brazil', year: 1970, gender: 'female', label: 'Brazil-1970-F' },
  { country: 'South Africa', year: 1960, gender: 'male', label: 'SouthAfrica-1960-M' },
  { country: 'Philippines', year: 1980, gender: 'female', label: 'Philippines-1980-F' },
  { country: 'Ukraine', year: 1985, gender: 'male', label: 'Ukraine-1985-M' },
];

const RANDOM_COUNT = 8;

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

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
          entries.push({
            age: ageMatch ? parseInt(ageMatch[1]) : null,
            text,
          });
        }
      }
    }
    return entries;
  });
}

async function getCurrentAgeYear(page) {
  return page.evaluate(() => {
    const el = document.querySelector('header p.text-natalis-muted.text-xs');
    return el?.textContent?.trim() || '';
  });
}

// Check the page state comprehensively
async function getPageState(page) {
  return page.evaluate(() => {
    const text = document.body.textContent;
    const buttons = Array.from(document.querySelectorAll('button'));
    const btnTexts = buttons.map(b => b.textContent.trim());

    const hasAgeUp = buttons.some(b => b.textContent.includes('Age Up'));
    const ageUpDisabled = buttons.find(b => b.textContent.includes('Age Up'))?.disabled ?? false;

    // Death screen detection
    const isDead = text.includes('Ribbons Earned') || text.includes('Life Summary')
      || text.includes('Epitaph') || text.includes('passed away at')
      || text.includes('Here Lies') || text.includes('died at age');

    // Trial detection
    const hasTrial = btnTexts.some(t => t.includes('No Lawyer') || t.includes('Mid-tier') || t.includes('Top Lawyer') || t.includes('public defender'));
    if (hasTrial) {
      return { state: 'trial', buttons: btnTexts };
    }

    // Pending event: the "decisions" button in fixed bottom bar appears when pendingEvent is set
    const hasPendingEventIndicator = btnTexts.some(t => t.includes('life event needs'));

    // EventBox: look for the event display header band
    const eventBoxes = document.querySelectorAll('.bg-bit-blue');
    let hasEventBox = false;
    let eventChoices = [];
    for (const header of eventBoxes) {
      if (header.textContent.includes('Life Event') || header.textContent.includes('World Event')) {
        hasEventBox = true;
        const card = header.closest('.bg-white') || header.parentElement;
        // Find choice buttons — look for "What will you do?" section
        const choiceSection = card?.querySelectorAll('button') || [];
        for (const btn of choiceSection) {
          const t = btn.textContent.trim();
          if (t && t.length > 3 && !t.includes('Historical context') && !btn.disabled) {
            eventChoices.push(t);
          }
        }
      }
    }

    if (isDead) return { state: 'dead' };
    if (hasPendingEventIndicator) {
      // The "A life event needs your decision" button is always shown when pendingEvent is set
      // Find the choice buttons (non-standard)
      const stdSet = new Set(['📖Life', '📊Stats', '👥People', '🏠Assets', 'Recent', 'Timeline',
        '🔍 Search', '⚡ Activities', 'Age Up +', '← Back', '✕ Close', '🔒 Prison Life',
        'Historical context']);
      const nonStdBtns = buttons.filter(b => {
        const t = b.textContent.trim();
        return t.length > 3 && !stdSet.has(t) && !b.disabled
          && !t.startsWith('↑') && !t.startsWith('←') && !t.includes('Historical context')
          && !t.includes('life event needs');
      }).map(b => b.textContent.trim());
      return { state: 'pending_event', choices: nonStdBtns };
    }
    if (!hasAgeUp) return { state: 'no_age_up' };
    if (ageUpDisabled) return { state: 'age_up_disabled' };
    return { state: 'ready' };
  });
}

async function resolveAnyPendingEvent(page) {
  // Click the first available choice button that isn't a standard UI button
  const STD_UI = new Set([
    '📖Life', '📊Stats', '👥People', '🏠Assets', 'Recent', 'Timeline',
    '🔍 Search', '⚡ Activities', 'Age Up +', '← Back', '✕ Close',
    '🔒 Prison Life', 'Historical context',
  ]);

  const clicked = await page.evaluate((std) => {
    const allBtns = Array.from(document.querySelectorAll('button'));
    for (const btn of allBtns) {
      const text = btn.textContent.trim();
      if (text.length > 3
          && !std.includes(text)
          && !btn.disabled
          && !text.startsWith('↑')
          && !text.startsWith('←')
          && !text.includes('Historical context')
          && !text.includes('life event needs')) {
        btn.click();
        return text;
      }
    }
    return null;
  }, [...STD_UI]);

  if (clicked) {
    await page.waitForTimeout(400);
    return true;
  }
  return false;
}

async function checkForTrial(page) {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).some(
      b => b.textContent.includes('No Lawyer') || b.textContent.includes('public defender')
        || b.textContent.includes('Mid-tier') || b.textContent.includes('Top Lawyer')
    );
  });
}

async function resolveTrial(page) {
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    // Pick cheapest option
    const btn = btns.find(b => b.textContent.includes('No Lawyer') || b.textContent.includes('public defender'));
    if (btn && !btn.disabled) { btn.click(); return true; }
    // Fallback: any trial-related button
    const btn2 = btns.find(b => b.textContent.includes('Mid-tier') || b.textContent.includes('Top Lawyer'));
    if (btn2 && !btn2.disabled) { btn2.click(); return true; }
    return false;
  });
  if (clicked) await page.waitForTimeout(400);
  return clicked;
}

async function checkForDeath(page) {
  return page.evaluate(() => {
    const text = document.body.textContent;
    return text.includes('Ribbons Earned') || text.includes('Life Summary')
      || text.includes('You lived') || text.includes('Epitaph')
      || text.includes('passed away at') || text.includes('Here Lies')
      || document.querySelector('.death-screen') !== null;
  });
}

async function getDeathInfo(page) {
  return page.evaluate(() => {
    const text = document.body.textContent;
    // Try to get death age
    const ageMatch = text.match(/(?:died|passed away|lived to|age) (\d+)/i);
    return {
      age: ageMatch ? parseInt(ageMatch[1]) : null,
      snippet: text.substring(0, 500),
    };
  });
}

// Set a range input to a specific value using JavaScript
async function setRangeInput(page, value) {
  await page.evaluate((val) => {
    const input = document.querySelector('input[type="range"]');
    if (input) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(input, val);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, String(value));
  await page.waitForTimeout(200);
}

async function runGameLoop(page, maxAgeUps) {
  const logEntries = [];
  let ageUpsCompleted = 0;
  let outcome = 'unknown';
  let finalAge = null;
  let seenTexts = new Set();
  let stuckCount = 0;
  const MAX_STUCK = 10; // Max iterations without progress before giving up

  const collectLogs = async () => {
    const entries = await getLogEntries(page);
    for (const entry of entries) {
      if (!seenTexts.has(entry.text)) {
        seenTexts.add(entry.text);
        logEntries.push(entry);
      }
    }
  };

  await collectLogs();

  for (let i = 0; i < maxAgeUps + 200; i++) { // extra iterations for events
    const pageState = await getPageState(page);

    if (pageState.state === 'dead') {
      outcome = 'died_naturally';
      const deathInfo = await getDeathInfo(page);
      finalAge = deathInfo.age;
      logEntries.push({ age: null, text: '[DEATH] ' + deathInfo.snippet.substring(0, 200) });
      break;
    }

    if (pageState.state === 'trial') {
      await resolveTrial(page);
      stuckCount = 0;
      continue;
    }

    if (pageState.state === 'pending_event') {
      if (pageState.choices && pageState.choices.length > 0) {
        await resolveAnyPendingEvent(page);
        stuckCount = 0;
      } else {
        // No visible choices — might be auto-resolve still loading or a different state
        stuckCount++;
        await page.waitForTimeout(300);
        if (stuckCount > MAX_STUCK) {
          outcome = 'soft_locked';
          break;
        }
      }
      continue;
    }

    if (pageState.state === 'no_age_up') {
      stuckCount++;
      await page.waitForTimeout(300);
      if (stuckCount > MAX_STUCK) {
        outcome = 'soft_locked';
        break;
      }
      continue;
    }

    if (pageState.state === 'age_up_disabled') {
      stuckCount++;
      await page.waitForTimeout(300);
      if (stuckCount > MAX_STUCK) {
        outcome = 'soft_locked';
        break;
      }
      continue;
    }

    // state === 'ready' — click age up
    if (ageUpsCompleted >= maxAgeUps) {
      outcome = 'max_ageups_reached';
      break;
    }

    const ageClicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Age Up'));
      if (btn && !btn.disabled) { btn.click(); return true; }
      return false;
    });

    if (!ageClicked) {
      stuckCount++;
      await page.waitForTimeout(300);
      continue;
    }

    await page.waitForTimeout(350);
    ageUpsCompleted++;
    stuckCount = 0;

    await collectLogs();

    // Get current age
    const ageYear = await getCurrentAgeYear(page);
    const ageMatch = ageYear.match(/Age (\d+)/);
    if (ageMatch) finalAge = parseInt(ageMatch[1]);
  }

  if (outcome === 'unknown') {
    outcome = ageUpsCompleted >= maxAgeUps ? 'max_ageups_reached' : 'unknown';
  }

  await collectLogs();

  return { logEntries, ageUpsCompleted, outcome, finalAge };
}

async function runCraftedLife(browser, config) {
  const { country, year, gender, label } = config;
  const errors = [];
  let result = { label, country, birthYear: year, gender, characterName: 'Unknown',
    ageUpsCompleted: 0, finalAge: null, outcome: 'crashed', errors, logEntries: [] };

  const page = await browser.newPage();
  page.on('pageerror', err => errors.push({ type: 'pageerror', msg: err.message }));
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('favicon') && !msg.text().includes('404')) {
      errors.push({ type: 'console_error', msg: msg.text() });
    }
  });

  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Click Craft a Life
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Craft a Life'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);

    // Step 1: Select country by searching
    const searchInput = page.locator('input[placeholder="Search countries..."]');
    await searchInput.fill(country);
    await page.waitForTimeout(350);

    // Click the matching country button via JS
    const countryClicked = await page.evaluate((c) => {
      const btns = Array.from(document.querySelectorAll('button'));
      // Button text is "CountryNameRegion" concatenated without space
      // Use startsWith since region is appended directly
      const btn = btns.find(b => {
        const text = b.textContent.trim();
        return text === c || text.startsWith(c);
      });
      if (btn) { btn.click(); return btn.textContent.trim(); }
      return null;
    }, country);
    if (!countryClicked) throw new Error(`Country button not found for: ${country}`);
    await page.waitForTimeout(300);

    // Click Next via JavaScript (avoids disabled-check race conditions)
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('Next'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);

    // Step 2: Set year via range input and gender
    // Get the range input bounds
    const rangeBounds = await page.evaluate(() => {
      const input = document.querySelector('input[type="range"]');
      return input ? { min: parseInt(input.min), max: parseInt(input.max), current: parseInt(input.value) } : null;
    });

    if (rangeBounds) {
      // Clamp year to bounds
      const clampedYear = Math.max(rangeBounds.min, Math.min(rangeBounds.max, year));
      await setRangeInput(page, clampedYear);
      result.birthYear = clampedYear;
    }

    // Select gender
    const genderText = gender === 'male' ? '♂ Male' : '♀ Female';
    await page.evaluate((gt) => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === gt);
      if (btn) btn.click();
    }, genderText);
    await page.waitForTimeout(200);

    // Click Next (step 2 -> 3)
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('Next'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);

    // Step 3: Lifestyle — click Preview → (not "Next →")
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b =>
        b.textContent.trim().startsWith('Preview') || b.textContent.trim().startsWith('Next')
      );
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);

    // Step 4: Preview — click Begin This Life
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Begin This Life'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(600);

    // Get character name
    result.characterName = await page.evaluate(() => {
      return document.querySelector('header p.font-bold')?.textContent?.trim() || 'Unknown';
    });

    // Run the game loop
    const gameResult = await runGameLoop(page, MAX_AGEUPS);
    result = { ...result, ...gameResult };

  } catch (err) {
    errors.push({ type: 'crash', msg: err.message });
    result.outcome = 'crashed';
    result.errors = errors;
  } finally {
    await page.close();
  }

  result.errors = errors;
  return result;
}

async function runRandomLife(browser, label) {
  const errors = [];
  let country = 'unknown';
  let birthYear = null;
  let gender = 'unknown';
  let characterName = 'Unknown';

  const page = await browser.newPage();
  page.on('pageerror', err => errors.push({ type: 'pageerror', msg: err.message }));
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('favicon') && !msg.text().includes('404')) {
      errors.push({ type: 'console_error', msg: msg.text() });
    }
  });

  let result = { label, country, birthYear, gender, characterName,
    ageUpsCompleted: 0, finalAge: null, outcome: 'crashed', errors, logEntries: [] };

  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Click Random Life
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Random Life'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);

    // On the birth preview screen — click Begin This Life via JS
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Begin This Life'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(600);

    // Extract character info from header
    characterName = await page.evaluate(() => {
      return document.querySelector('header p.font-bold')?.textContent?.trim() || 'Unknown';
    });

    // Get gender from avatar emoji
    gender = await page.evaluate(() => {
      const span = document.querySelector('header .w-10.h-10');
      const text = span?.textContent || '';
      if (text.includes('👦') || text.includes('👨')) return 'male';
      if (text.includes('👧') || text.includes('👩')) return 'female';
      return 'unknown';
    });

    // Get initial log entries (first entry often has country/year)
    await page.waitForTimeout(300);
    const initEntries = await getLogEntries(page);
    // Last entry is usually the birth entry
    const birthEntry = initEntries[initEntries.length - 1];
    if (birthEntry) {
      const m = birthEntry.text.match(/^([A-Za-z ]+),\s+(\d{4})/);
      if (m) {
        country = m[1].trim();
        birthYear = parseInt(m[2]);
      }
    }

    result = { ...result, country, birthYear, gender, characterName };

    // Run game loop
    const gameResult = await runGameLoop(page, MAX_AGEUPS);
    result = { ...result, ...gameResult };

  } catch (err) {
    errors.push({ type: 'crash', msg: err.message });
    result.outcome = 'crashed';
  } finally {
    await page.close();
  }

  result.errors = errors;
  return result;
}

async function main() {
  log('Starting natalis audit (v2)...');

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];

  // Run curated lives
  for (let i = 0; i < CURATED_CONFIGS.length; i++) {
    const config = CURATED_CONFIGS[i];
    log(`Curated ${i + 1}/${CURATED_CONFIGS.length}: ${config.label}`);
    try {
      const r = await runCraftedLife(browser, config);
      results.push(r);
      log(`  -> age ${r.finalAge}, outcome: ${r.outcome}, errors: ${r.errors.length}, entries: ${r.logEntries.length}`);
    } catch (err) {
      log(`  -> FATAL: ${err.message}`);
      results.push({
        label: config.label, country: config.country, birthYear: config.year,
        gender: config.gender, characterName: 'Unknown', ageUpsCompleted: 0,
        finalAge: null, outcome: 'crashed',
        errors: [{ type: 'crash', msg: err.message }], logEntries: [],
      });
    }
  }

  // Run random lives
  for (let i = 0; i < RANDOM_COUNT; i++) {
    log(`Random ${i + 1}/${RANDOM_COUNT}`);
    try {
      const r = await runRandomLife(browser, `Random-${i + 1}`);
      results.push(r);
      log(`  -> ${r.country} ${r.birthYear} ${r.gender}, age ${r.finalAge}, outcome: ${r.outcome}`);
    } catch (err) {
      log(`  -> FATAL: ${err.message}`);
      results.push({
        label: `Random-${i + 1}`, country: 'unknown', birthYear: null, gender: 'unknown',
        characterName: 'Unknown', ageUpsCompleted: 0, finalAge: null, outcome: 'crashed',
        errors: [{ type: 'crash', msg: err.message }], logEntries: [],
      });
    }
  }

  await browser.close();

  const outputPath = path.join(__dirname, 'audit_results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  log(`Results written to ${outputPath}`);

  log('\n=== SUMMARY ===');
  for (const r of results) {
    const sigErrors = r.errors.filter(e => e.type !== 'console_error').length;
    log(`${r.label}: ${r.country} ${r.birthYear} ${r.gender} -> age ${r.finalAge}, ${r.outcome}, ${sigErrors} sig errors, ${r.logEntries.length} log entries`);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
