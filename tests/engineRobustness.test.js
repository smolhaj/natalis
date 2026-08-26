// Whole-corpus soak. Runs the real engine across every playable country, both
// modes, and three birth eras per country, and asserts that nothing throws.
//
// This exists because buildYearTexture went from firing in ~2% of years to ~60%.
// 14,808 lines that had essentially never executed started executing constantly,
// and immediately surfaced a missing import and an undefined variable that had
// sat there unnoticed. A crash in prose generation kills the run.
import { it, expect } from 'vitest'
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} }
import { tick, resolveAutoEvent, resolveChoice } from '../src/engine/tick.js'
import { generateEpitaph } from '../src/engine/epitaph.js'
import { useGameStore } from '../src/store/gameStore.js'
import { COUNTRIES } from '../src/data/countries.js'

it('every country, both modes, three eras: no runtime errors', () => {
  const errs = new Map()
  let lives = 0, years = 0, deaths = 0
  for (const country of COUNTRIES) {
    for (const mode of ['active', 'passive']) {
      const [lo, hi] = country.yearRange
      for (const by of [lo, Math.floor((lo + hi) / 2), hi]) {
        lives++
        let s
        try {
          useGameStore.getState().startCuratedGame({ country: country.name, birthYear: by })
          s = { ...useGameStore.getState(), mode }
        } catch (e) { errs.set(`CREATE ${country.name}: ${e.message}`, 1); continue }
        for (let y = 0; y < 110 && !s.dead; y++) {
          try {
            s = tick(s); years++
            const ev = s.pendingEvent
            if (ev) s = ev.isAutomatic ? resolveAutoEvent(s) : resolveChoice(s, Math.floor(Math.random() * ev.choices.length))
          } catch (e) {
            const k = `${e.message} @ ${(e.stack || '').split('\n')[1]?.trim().slice(0, 120)}`
            errs.set(k, (errs.get(k) ?? 0) + 1)
            break
          }
        }
        if (s.dead) deaths++
        try { generateEpitaph(s) } catch (e) { errs.set(`EPITAPH ${e.message}`, (errs.get('EPITAPH') ?? 0) + 1) }
      }
    }
  }
  console.log(`  soak: ${lives} lives / ${years} years / ${COUNTRIES.length} countries; ${deaths} reached an ending`)
  if (errs.size) for (const [k, v] of errs) console.log(`  x${v}  ${k}`)
  expect([...errs.keys()]).toEqual([])
  expect(years).toBeGreaterThan(20000)
}, 1800000)
