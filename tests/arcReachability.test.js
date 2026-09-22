import { describe, it, expect } from 'vitest'
import { runSimulation } from '../scripts/lib/sim.js'

/**
 * Does the arc reach the life it was written for?
 *
 * Every static audit asks whether a guard COULD pass. `npm run sim` asks what
 * fires. Neither asks the question that matters for a follow-through arc: given
 * that the thing happened — the partner died, the marriage ended, the character
 * left — did the writing about it ever arrive.
 *
 * `grief_partner_death` is why this exists. Its guard was correct, its prose was
 * correct, and it reached 1 widowing in 33: it was declared `phase: 'midlife'`,
 * which caps at 49, while `tickPartner` only kills a partner from 65, so the
 * first event of the partner-death arc was out of reach of its own trigger. The
 * three follow-throughs behind it had the same phase and the same problem. None
 * of that is visible to `check-events` — the guard's age band and the declared
 * phase genuinely do overlap; it is the TRIGGER that fires outside them, which
 * is a runtime fact.
 *
 * The floors are deliberately well below the measured values, because a
 * 100-life sample of a precondition that occurs in a quarter of lives has a
 * wide interval. They are set to catch an arc falling off a cliff, which is
 * what happened, not to pin a number.
 */
const ARCS = [
  // name              precondition                                             arc events                                      measured  floor
  ['widowed',          s => (s.flags ?? []).includes('widowed'),                /^grief_partner|^late_partner|^widow/,          0.77,     0.45],
  ['lost a child',     s => (s.flags ?? []).includes('lost_child'),             /child_death|^cd_|lost_child/,                  1.00,     0.40],
  ['chronic illness',  s => (s.conditions ?? []).length > 0,                    /condition|illness|^ill_/,                      0.94,     0.50],
  ['lost a parent',    s => (s.flags ?? []).some(f => f.startsWith('lost_parent')), /grief|parent_care|^pc_/,                   0.49,     0.25],
  ['emigrated',        s => (s.flags ?? []).includes('emigrated'),              /emig|integration|diaspora|^ei_/,               0.40,     0.15],
]

describe('an arc reaches the life it was written for', () => {
  it('fires the follow-through for the things that actually happened', async () => {
    const r = await runSimulation({ lives: 10, mode: 'passive', keepFinalStates: true })
    const states = r.finalStates ?? []
    expect(states.length, 'lives played').toBeGreaterThan(40)

    const report = []
    for (const [name, pre, re, measured, floor] of ARCS) {
      const lives = states.filter(pre)
      // Too small a sample to assert on in this run; report and move on rather
      // than fail on noise.
      if (lives.length < 8) { report.push(`${name}: only ${lives.length} lives, skipped`); continue }
      const reached = lives.filter(s => (s.log ?? []).some(e => re.test(String(e.eventId ?? ''))))
      const rate = reached.length / lives.length
      report.push(`${name}: ${reached.length}/${lives.length} = ${Math.round(100 * rate)}% (measured ${Math.round(100 * measured)}%)`)
      expect(rate, `${name} arc reachability`).toBeGreaterThan(floor)
    }
    console.log('arc reachability — ' + report.join('; '))
  }, 900_000)
})
