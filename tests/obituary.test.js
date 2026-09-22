// The death screen: the last thing a player reads, and for a long time the
// thinnest thing in the game.
//
// "Life in brief" consulted about thirty-five hand-listed flags out of a
// registry of 2,887 and nothing else. Over thirty simulated lives it came back
// EMPTY 67% of the time, with a median of zero notes. A Romanian born in 1934
// who lived through Ceaușescu's whole rule and died the year after the
// revolution got a blank panel and an obituary that mentioned neither — while
// her own state object had been holding `romania_revolution_1989` and
// `cold_war_end` in `worldEventsFired` since the year they happened.
//
// Two layers were missing and both were already in state: what actually
// reached this character, and the ordinary shape of the life.
import { describe, it, expect } from 'vitest'
import { generateLifeNotes, generateEpitaph, __testables } from '../src/engine/epitaph.js'
import { WORLD_EVENTS } from '../src/data/worldEvents.js'
import { runSimulation } from '../scripts/lib/sim.js'

describe('the tables the historical spine reads', () => {
  it('keys every clause off a world-event id that exists', () => {
    // Five of the first version's keys were flag names or inventions —
    // `witnessed_wall_fall` is a flag, the world event is `berlin_wall_fall` —
    // so they matched nothing and were silently dead.
    const ids = new Set(WORLD_EVENTS.map(w => w.id))
    for (const k of Object.keys(__testables.WORLD_EVENT_NOTES)) {
      expect(ids.has(k), `WORLD_EVENT_NOTES."${k}" is not a world event id`).toBe(true)
    }
    for (const k of __testables.AMBIENT_WORLD_EVENTS) {
      expect(ids.has(k), `AMBIENT_WORLD_EVENTS has "${k}", which is not a world event id`).toBe(true)
    }
  })

  it('gives a world event the article its name takes, without touching its case', () => {
    // The names are Title Case proper nouns, so lowercasing the first letter
    // to make them read as common nouns produced "the september 11 Attacks"
    // and "the post-Soviet Shock Therapy".
    const a = __testables.withDefiniteArticle
    expect(a('Cuban Missile Crisis')).toBe('the Cuban Missile Crisis')
    expect(a('September 11 Attacks')).toBe('the September 11 Attacks')
    expect(a('Fall of the Berlin Wall')).toBe('the Fall of the Berlin Wall')
    expect(a('Apartheid')).toBe('Apartheid')
    expect(a('Chernobyl')).toBe('Chernobyl')
    expect(a('El Caracazo')).toBe('El Caracazo')
    expect(a('The Troubles')).toBe('The Troubles')
  })
})

describe('across whole lives', () => {
  it('never leaves the panel empty, and names what the character lived through', async () => {
    const r = await runSimulation({
      lives: 3,
      configs: [['Romania', 1934], ['Nigeria', 1962], ['Germany', 1930], ['India', 1975],
                ['Brazil', 1995], ['Japan', 1935], ['Chile', 1950], ['Vietnam', 1955]],
      mode: 'passive',
      keepFinalStates: true,
    })
    expect(r.fatal).toBeNull()
    expect(r.totals.errors).toEqual([])
    const finals = r.finalStates ?? []
    expect(finals.length).toBeGreaterThan(10)

    const empty = []
    let withHistory = 0
    for (const s of finals) {
      const notes = generateLifeNotes(s)
      if (notes.length === 0) empty.push(`${s.character?.country?.name} ${s.character?.birthYear}, died at ${s.age}`)
      // Everybody who lived past childhood lived through something.
      if (notes.some(n => /^(Lived through|Saw |Was there|Was alive for|Remembered where)/.test(n))) withHistory++
      // And the prose still comes out as prose.
      const ep = generateEpitaph(s)
      if (ep) {
        expect(ep, 'an unresolved template reached the page').not.toMatch(/\bundefined\b|\[object|\$\{/)
        expect(ep.length).toBeGreaterThan(60)
      }
    }
    expect(empty, 'lives whose "Life in brief" came back blank').toEqual([])
    // Not every life reaches a world event — a child who dies at three in a
    // quiet decade may reach none — but most of them do.
    expect(withHistory / finals.length).toBeGreaterThan(0.5)
  }, 300_000)
})
