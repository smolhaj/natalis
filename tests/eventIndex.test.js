import { describe, it, expect } from 'vitest'
import { EVENTS, classifyEventRaw } from '../src/data/events.js'
import { CAREERS } from '../src/data/careers.js'
import EVENT_INDEX from '../src/data/eventIndex.generated.js'

// The shipped game reads event classification from eventIndex.generated.js,
// because the production build minifies the guard source that classification
// reads. If the index drifts from the source, the game a player receives and
// the game every test and sim measures stop being the same game — which is
// exactly the defect the index exists to close.
const FIELDS = ['departs', 'writtenForAbroad', 'assumesSchool', 'assumesInstitutions',
  'anchored', 'continuesMem', 'continuesFlag', 'specificity', 'dated', 'register']
const COMPUTED = new Set(FIELDS)

// A module may declare a field by hand (specificity, register, claimsYears…);
// those survive, everything computed is cleared so this is a fresh read.
const DECLARED = Symbol('declared')
function freshRaw(e) {
  const c = Object.create(Object.getPrototypeOf(e))
  for (const k of Object.keys(e)) if (!COMPUTED.has(k)) c[k] = e[k]
  if (e[DECLARED]) Object.assign(c, e[DECLARED])
  return classifyEventRaw(c)
}

describe('event classification index', () => {
  const all = [...EVENTS.filter(Boolean)]
  for (const c of CAREERS) for (const e of c.events ?? []) all.push(e)
  // Hand-declared specificity is part of the module, not of classification.
  for (const e of all) if (typeof e.specificity === 'number' && e.register === undefined) e[DECLARED] = { specificity: e.specificity }

  it('covers every event in the corpus', () => {
    const missing = all.filter(e => e.id && !EVENT_INDEX[e.id]).map(e => e.id)
    expect(missing, `run: node scripts/build-event-index.js`).toEqual([])
  })

  it('matches classification from source for every event', () => {
    const diff = []
    for (const e of all) {
      if (!e.id || !EVENT_INDEX[e.id]) continue
      const raw = freshRaw(e)
      const row = EVENT_INDEX[e.id]
      FIELDS.forEach((f, i) => {
        const a = JSON.stringify(row[i] ?? null), b = JSON.stringify(raw[f] ?? null)
        if (a !== b && !(a === 'null' && b === 'false') && !(a === 'false' && b === 'null')) diff.push(`${e.id}.${f}: index ${a} vs source ${b}`)
      })
    }
    expect(diff.slice(0, 20), `${diff.length} differences — run: node scripts/build-event-index.js`).toEqual([])
  })

  it('classification survives a minified guard', () => {
    // A guard as the production build emits it: parameter renamed, optional
    // chaining lowered. Reading source would see nothing; the index answers.
    const e = EVENTS.find(x => x && EVENT_INDEX[x.id]?.[6]?.length)
    expect(e).toBeTruthy()
    const shipped = { ...e }
    for (const f of FIELDS) delete shipped[f]
    shipped.when = new Function('e', 'return !!e')
    expect(classifyEventRaw({ ...shipped }).continuesFlag ?? null).toBeNull()
  })
})
