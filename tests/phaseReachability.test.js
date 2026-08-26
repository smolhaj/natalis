// An event is only ever drawn from EVENTS_BY_PHASE[currentPhase] plus the
// phase:null bucket. So if an event declares a phase whose age band cannot
// overlap the age range its own guard requires, it can never fire — silently,
// with no error anywhere.
//
// This killed whole arcs: all three retirement events (phase 'midlife', guards
// 55-70), five parent-care steps, all three late-fertility events, three
// menopause events, and the child-marriage removal event. ~170 more were
// truncated rather than killed — a guard saying `age >= 20` on a young_adult
// event silently stops at 29.
import { it, expect } from 'vitest'
import { EVENTS } from '../src/data/events.js'
import { CAREERS } from '../src/data/careers.js'

const PHASE_RANGE = {
  early_childhood: [0, 5],
  childhood: [6, 11],
  adolescence: [12, 17],
  young_adult: [18, 29],
  midlife: [30, 49],
  late_life: [50, 120],
}

// Extract the age bounds a guard actually enforces. Conservative by design:
// only simple, unambiguous comparisons count, so a guard we cannot read is
// treated as unbounded and never reported.
function guardAgeRange(src) {
  if (/G\.age\s*[<>=]/.test(src) === false) return null
  let lo = 0, hi = 120
  let sawAny = false
  for (const m of src.matchAll(/G\.age\s*(>=|>|<=|<)\s*(\d{1,3})/g)) {
    const [, op, nRaw] = m
    const n = Number(nRaw)
    if (op === '>=') { lo = Math.max(lo, n); sawAny = true }
    else if (op === '>') { lo = Math.max(lo, n + 1); sawAny = true }
    else if (op === '<=') { hi = Math.min(hi, n); sawAny = true }
    else if (op === '<') { hi = Math.min(hi, n - 1); sawAny = true }
  }
  // A guard with || branches can widen the range in ways this cannot model.
  if (!sawAny || /\|\|/.test(src)) return null
  return [lo, hi]
}

function scan(events, label) {
  const dead = []
  for (const e of events) {
    const phase = e.phase
    if (!phase || !PHASE_RANGE[phase] || typeof e.when !== 'function') continue
    const range = guardAgeRange(Function.prototype.toString.call(e.when))
    if (!range) continue
    const [glo, ghi] = range
    const [plo, phi] = PHASE_RANGE[phase]
    if (ghi < plo || glo > phi) {
      dead.push(`${label} ${e.id}: phase '${phase}' (${plo}-${phi}) vs guard age ${glo}-${ghi}`)
    }
  }
  return dead
}

it('no event declares a phase its own guard can never reach', () => {
  const dead = [
    ...scan(EVENTS, 'event'),
    ...scan(CAREERS.flatMap(c => c.events ?? []), 'career-event'),
  ]
  if (dead.length) console.log(`DEAD (${dead.length}):\n  ` + dead.join('\n  '))
  expect(dead).toEqual([])
})
