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
// SCREAMING_CASE predicates (IS_MAYA, IS_GUATEMALAN) and is*/has* helpers are
// the project's convention for guard helpers; all of them take G.
const G_HELPER_CALLED_WITH_PROXY = /\b(?:[A-Z][A-Z0-9_]{2,}|is[A-Z]\w*|has[A-Z]\w*)\s*\(\s*p\s*[,)]/

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
      // Strip comments too — a comment explaining a past G-misuse is not a use.
      const code = src
        .replace(/\/\*[\s\S]*?\*\//g, ' ')
        .replace(/\/\/[^\n]*/g, ' ')
        .replace(/'(?:[^'\\]|\\.)*'/g, "''").replace(/"(?:[^"\\]|\\.)*"/g, '""').replace(/`(?:[^`\\]|\\.)*`/g, '``')
      if (G_IDENTIFIER.test(code)) bad.push(`${label} ${e.id} → ${where} (reads G)`)
      // The subtler form: handing the PROXY to a helper written for G. The
      // identifier G never appears, so the check above cannot see it, but the
      // helper dereferences G.character and throws the moment the effect runs.
      // events_guatemala.js did exactly this and crashed one run in 46,000 years.
      else if (G_HELPER_CALLED_WITH_PROXY.test(code)) bad.push(`${label} ${e.id} → ${where} (passes proxy to a G-helper)`)
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
