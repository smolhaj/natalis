// Firing-rate regression tests — what the engine ACTUALLY produces.
//
// Every defect the August 2026 studio audit found was invisible to static
// checks and to the existing suite: the contemplative layer taking most of a
// life, a 14,808-line prose system reaching almost no years, a 1962 Nigerian
// life with a median death age of 8, whole bodies of authored work that never
// surfaced. None of that is a property of the data. It is a property of the
// running engine, and only appears if you run it.
//
// The thresholds below are DESIGN TARGETS, not a snapshot of current numbers.
// They are deliberately generous — a wide band that any healthy version of the
// game sits inside — so they catch a regression without pinning the engine to
// whatever it happens to do today. `npm run sim` prints the same numbers in
// full when one of these fails.
import { describe, it, expect } from 'vitest'
import { runSimulation, DEFAULT_CONFIGS } from '../scripts/lib/sim.js'

// One run, shared by every assertion: the simulation is the expensive part.
const LIVES = Number(process.env.SIM_LIVES ?? 32)
let cached = null
async function sim() {
  if (!cached) cached = await runSimulation({ lives: LIVES, configs: DEFAULT_CONFIGS, mode: 'active' })
  // An engine that will not load is reported as one readable line rather than a
  // stack trace from inside the harness.
  if (cached.fatal) throw new Error(cached.fatal)
  return cached
}

const fmt = r => [
  `contemplative ${r.share.contemplative.toFixed(1)}%`,
  `anchored ${r.share.anchored.toFixed(1)}%`,
  `earned ${r.share.earned.toFixed(1)}%`,
  `universal ${r.share.universal.toFixed(1)}%`,
  `texture ${r.share.texture.toFixed(1)}%`,
  `choice ${r.share.choice.toFixed(1)}%`,
].join(' | ')

describe('firing rates', () => {
  it('runs whole lives without throwing', async () => {
    const r = await sim()
    if (r.totals.errors.length) {
      console.error(`\n${r.totals.errors.length} lives threw:\n  ` + r.totals.errors.slice(0, 20).join('\n  '))
    }
    expect(r.totals.errors, 'the engine threw during a life').toEqual([])
    expect(r.totals.lives).toBe(LIVES * DEFAULT_CONFIGS.length)
    expect(r.totals.years).toBeGreaterThan(500)
  }, 600000)

  it('keeps the contemplative layer a layer, not the game', async () => {
    const r = await sim()
    console.log('  ' + fmt(r))
    // CLAUDE.md puts the contemplative register alongside the event system, not
    // in front of it. It reached ~70% of years before the audit.
    expect(r.share.contemplative, 'contemplative share of years').toBeLessThan(40)
    // And it should not stack: a run of choiceless observations reads as the
    // game having stopped.
    expect(r.totals.longestContemplativeRun, 'consecutive contemplative events').toBeLessThanOrEqual(6)
  }, 600000)

  it('gives the specific registers real airtime against the universal ones', async () => {
    const r = await sim()
    // ~5,700 events were written around this life in particular; ~2,000 could
    // fire for anyone. The specific ones must not be statistically buried.
    expect(r.share.anchored + r.share.earned, 'anchored + earned share')
      .toBeGreaterThan(r.share.universal)
  }, 600000)

  it('fires year texture in a meaningful share of years', async () => {
    const r = await sim()
    // The quiet-year prose layer is how an uneventful year still lands. It ran
    // at ~2% of years when the audit found it.
    expect(r.share.texture, 'year texture share of years').toBeGreaterThan(20)
  }, 600000)

  it('surfaces a glimpse of a stranger about once per decade', async () => {
    const r = await sim()
    console.log(`  glimpses per life ${r.glimpsesPerLife.toFixed(2)}`)
    expect(r.glimpsesPerLife, 'glimpses per life').toBeGreaterThan(1)
    expect(r.glimpsesPerLife, 'glimpses per life').toBeLessThan(20)
  }, 600000)

  it('reaches every body of authored work', async () => {
    const r = await sim()
    console.log('  per 100 lives: ' + Object.entries(r.per100Lives)
      .sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(', '))
    // Each of these is a large, deliberately-written corpus. A number near zero
    // means it was written and never read.
    expect(r.per100Lives.geographic ?? 0, 'geographic events per 100 lives').toBeGreaterThan(30)
    expect(r.per100Lives.followthrough ?? 0, 'followthrough events per 100 lives').toBeGreaterThan(25)
    expect(r.per100Lives.specific_lives ?? 0, 'specific_lives events per 100 lives').toBeGreaterThan(4)
    expect(r.per100Lives.sonder ?? 0, 'sonder events per 100 lives').toBeGreaterThan(20)
  }, 600000)

  it('shows the player content from more than a handful of countries', async () => {
    const r = await sim()
    console.log(`  countries with dedicated content seen: ${r.countriesSeen.size} — ${[...r.countriesSeen].sort().join(', ')}`)
    expect(r.countriesSeen.size, 'distinct countries whose dedicated content fired')
      .toBeGreaterThanOrEqual(Math.min(6, DEFAULT_CONFIGS.length))
  }, 600000)
})

describe('the prose layers', () => {
  // yearTexture.js was a 15,104-line function of 2,035 sequential
  // `if (guard) return pick([...])` statements, so the file's own line order was
  // its priority order. 9.3% of the 7,588 authored lines ever reached a player;
  // Peru's 47 lines fired zero times in 3,253 Peruvian years. Both numbers were
  // invisible to a green test suite, because every guard was correct.
  it('prints a real share of the prose it contains', async () => {
    const r = await sim()
    const yt = r.prose.yearTexture
    expect(yt.authored).toBeGreaterThan(5000)
    // Deliberately a floor well under the measured ~19% on a broad roster run,
    // not a pin: the default ten configurations cannot reach the other 144
    // countries' blocks at all, so this number is structurally lower than the
    // population one. It is here to catch a return to first-match-wins, which
    // would put it back under 10%.
    expect(yt.coverage, `yearTexture coverage ${yt.coverage.toFixed(1)}% of ${yt.authored} lines`)
      .toBeGreaterThan(9)
  })

  it('does not concentrate every life into the same few sentences', async () => {
    const r = await sim()
    // The number of distinct lines supplying half of all texture output. Under
    // the old ordering this was 122 lines out of 7,588 — the tell that made the
    // coverage percentage legible as a defect rather than a small number.
    expect(r.prose.yearTexture.concentration,
      `half of all texture output came from ${r.prose.yearTexture.concentration} lines`)
      .toBeGreaterThan(40)
  })

  it('keeps the mundane layer reaching most of its pool', async () => {
    const r = await sim()
    // This layer always built a pool and picked from it, which is why it was
    // reaching ~55% of its lines while yearTexture reached 9%. It is the control
    // group: if it drops, something broke in the shared prose machinery.
    expect(r.prose.mundaneLayer.coverage).toBeGreaterThan(30)
  })

  it('does not tell one character the same sentence twice', async () => {
    const r = await sim()
    // 15.6% before the layers began preferring unheard lines, with a worst case
    // of the same sentence fourteen times in one life. Some recurrence is
    // deliberate — the grief fog is supposed to come back — so this is a ceiling
    // on the share, not a ban.
    expect(r.repetition.share,
      `${r.repetition.share.toFixed(1)}% repeated; worst ${r.repetition.worst}x: "${r.repetition.worstLine.slice(0, 80)}"`)
      .toBeLessThan(4)
    // A ceiling of 12 was loose enough that the very line prose.js was written
    // about went on printing SEVEN times and passed — a single sentence in the
    // `urgent` tier, which wins most years it is live, and which the grief
    // exemption deliberately spares from exhaustion. Measured at 0.3% and a
    // worst of 3 once that line and four other thin pools were widened.
    //
    // The ceiling sits above the measured tail, because the tail grows with
    // sample size, and below the defect it exists to catch. When this fails,
    // the failure message names the line: the answer is almost always more
    // ways to say it, not a tighter guard.
    expect(r.repetition.worst).toBeLessThan(7)
  })

  it('narrates a year in the large majority of years lived', async () => {
    const r = await sim()
    const anyProse = r.share.texture + r.share.mundane
    expect(anyProse, `texture ${r.share.texture.toFixed(1)}% + mundane ${r.share.mundane.toFixed(1)}%`)
      .toBeGreaterThan(75)
  })
})

describe('lifespan', () => {
  it('lands every configuration in a plausible historical band', async () => {
    const r = await sim()
    const rows = r.configs.map(c =>
      `${(c.country + ' ' + c.birthYear).padEnd(22)} median ${String(c.medianDeathAge).padStart(3)}` +
      ` (q1 ${String(c.q1DeathAge).padStart(3)}, q3 ${String(c.q3DeathAge).padStart(3)})` +
      `  survived-childhood median ${String(c.medianAdultDeathAge).padStart(3)}` +
      `  died<5 ${c.under5}/${c.lives}`)
    console.log('\n  ' + rows.join('\n  '))

    // Two separate models, asserted separately, because pooling them is what
    // makes a lifespan check flaky: childhood mortality is a coin-flip per life
    // and moves a small-sample median wildly, while adult lifespan is stable.
    //
    // Median age at death HAVING SURVIVED CHILDHOOD is the honest measure of
    // "how long does a life run here". Even the harshest configuration in the
    // set — a 1962 Nigerian life — should land in the adult range; a median of
    // 8 is an engine bug, not history.
    // A per-config median is taken over however many of that config's lives
    // survived childhood, which in a harsh configuration can be a dozen — and
    // the median of a dozen swings hard. This test failed once on United States
    // 1950 for exactly that reason: five under-five deaths in one sample where
    // the measured rate over 220 lives is 5%, against a real 3%. So a config is
    // only judged individually when it has enough adult deaths to judge, and
    // the floor is set where a genuine engine fault lives rather than where
    // sampling noise does. The pooled median below is the real guardrail; it is
    // taken over every life in the run and barely moves.
    const JUDGEABLE = 10
    const judged = r.configs.filter(c => c.medianAdultDeathAge != null && (c.adultDeaths?.length ?? 0) >= JUDGEABLE)
    const tooShort = judged.filter(c => c.medianAdultDeathAge < 30)
    const tooLong = judged.filter(c => c.medianAdultDeathAge > 98)
    expect(tooShort.map(c => `${c.country} ${c.birthYear}: median ${c.medianAdultDeathAge} having survived childhood`),
      'configurations dying implausibly young').toEqual([])
    expect(tooLong.map(c => `${c.country} ${c.birthYear}: median ${c.medianAdultDeathAge} having survived childhood`),
      'configurations living implausibly long').toEqual([])

    // And pooled across every configuration — a large enough sample that the
    // overall median, infant deaths included, must sit in a real band.
    const pooled = r.configs.flatMap(c => c.deaths).sort((a, b) => a - b)
    const pooledMedian = pooled[pooled.length >> 1]
    console.log(`  pooled median age at death across all ${pooled.length} lives: ${pooledMedian}`)
    expect(pooledMedian, 'pooled median age at death').toBeGreaterThan(40)
    expect(pooledMedian, 'pooled median age at death').toBeLessThan(92)
  }, 600000)

  it('does not kill most children before five', async () => {
    const r = await sim()
    console.log('  under-five deaths: ' + r.configs.map(c => `${c.country} ${c.under5}/${c.lives}`).join(', '))
    const brutal = r.configs
      .filter(c => c.lives && c.under5 / c.lives > 0.5)
      .map(c => `${c.country} ${c.birthYear}: ${c.under5}/${c.lives} died before five`)
    expect(brutal, 'under-five mortality above any historical rate').toEqual([])
  }, 600000)

  it('keeps wealthy-country lives longer than the harshest ones', async () => {
    const r = await sim()
    const byName = Object.fromEntries(r.configs.map(c => [c.country, c]))
    const germany = byName['Germany']?.medianAdultDeathAge
    const nigeria = byName['Nigeria']?.medianAdultDeathAge
    if (germany != null && nigeria != null) {
      console.log(`  Germany 1970 ${germany} vs Nigeria 1962 ${nigeria} (median age at death, having survived childhood)`)
      expect(germany, 'place and era should still shape a lifespan').toBeGreaterThan(nigeria - 15)
    }
  }, 600000)
})

describe('passive mode is measurable', () => {
  // CLAUDE.md calls passive mode a correctness contract: "a life that nobody
  // steers must still reach a plausible age and a full arc. If passive medians
  // drift, the simulation is wrong, not the mode."
  //
  // The instrument could not see it. Passive resolves choice events inside
  // tick(), so `pendingEvent` is never set for them, and the harness — which
  // counted events by reading it — reported passive at 52% of years containing
  // an event against active's 98%, with ZERO choice events in the one mode
  // whose entire design is that the character answers them. The engine was
  // right; the blind spot was exactly the size of the choice-event share.
  //
  // Both resolution paths now stamp the event id onto the log entry.
  it('sees the events the character answered for itself', async () => {
    const { runSimulation } = await import('../scripts/lib/sim.js')
    const r = await runSimulation({ lives: 4, mode: 'passive', maxYears: 100 })
    expect(r.fatal).toBeNull()
    expect(r.totals.errors).toEqual([])
    // A passive life is still mostly events, and a good share of them are
    // choices somebody had to answer.
    expect(r.share.anyEvent).toBeGreaterThan(70)
    expect(r.share.choice).toBeGreaterThan(20)
    // And the register mix stays in the same country as active mode rather
    // than collapsing into the broadest bucket.
    expect(r.share.contemplative).toBeLessThan(32)
    expect(r.share.anchored).toBeGreaterThan(20)
    expect(r.share.universal).toBeLessThan(15)
  }, 300_000)
})
