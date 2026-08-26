// Effect functions receive ONLY the proxy `p`. `G` is available in when() guards
// and nowhere else — an effect that reaches for it throws at the moment the
// player picks that choice.
//
// A previous sweep looked for `G.` and `G[` and reported zero violations, which
// missed a bare `G` passed as an argument (`IS_ANGLOPHONE(G)`). That event
// crashed the game for any Cameroonian character who picked it, and had done so
// for as long as it existed. This check matches the identifier itself.
import { it, expect } from 'vitest'
import { EVENTS } from '../src/data/events.js'
import { CAREERS } from '../src/data/careers.js'

const G_IDENTIFIER = /(^|[^A-Za-z0-9_$.'"`])G([^A-Za-z0-9_$]|$)/

function violations(events, label) {
  const bad = []
  for (const e of events) {
    const fns = []
    if (typeof e.effect === 'function') fns.push(['effect', e.effect])
    for (const [i, c] of (e.choices ?? []).entries()) {
      if (typeof c.effect === 'function') fns.push([`choices[${i}].effect`, c.effect])
    }
    for (const [where, fn] of fns) {
      const src = Function.prototype.toString.call(fn)
      // Strip string literals so prose containing a lone "G" is not a false positive.
      const code = src.replace(/'(?:[^'\\]|\\.)*'/g, "''").replace(/"(?:[^"\\]|\\.)*"/g, '""').replace(/`(?:[^`\\]|\\.)*`/g, '``')
      if (G_IDENTIFIER.test(code)) bad.push(`${label} ${e.id} → ${where}`)
    }
  }
  return bad
}

it('no effect reaches for G', () => {
  const bad = [
    ...violations(EVENTS, 'event'),
    ...violations(CAREERS.flatMap(c => c.events ?? []), 'career-event'),
  ]
  if (bad.length) console.log('VIOLATIONS:\n  ' + bad.join('\n  '))
  expect(bad).toEqual([])
})
