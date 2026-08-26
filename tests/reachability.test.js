// Reachability regression tests.
//
// scripts/check-flags.js audits one direction — registered flags are set
// somewhere and consumed somewhere — and answered it with "2672 covered,
// 0 orphaned, 0 partial" while an entire country's content, the retirement arc
// and the grief after a parent's death were unreachable. Textual presence is
// not reachability. These tests ask the other question.
//
// Two things are guarded here:
//   1. the analysers themselves, on synthetic input, so a false "this is dead"
//      cannot creep in (a crying-wolf audit gets switched off, which is worse
//      than no audit)
//   2. the corpus, against tests/reachability.baseline.json — the backlog the
//      August 2026 audit found. New unreachable content fails; the existing
//      backlog is listed loudly and worked down separately.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import {
  runAllAudits, numericBounds, collectSetFlags, flagChecksWithContext,
  countriesInGuard, auditPhaseReachability, auditWorldEventScope,
} from '../scripts/lib/audits.js'

const baseline = JSON.parse(
  readFileSync(fileURLToPath(new URL('./reachability.baseline.json', import.meta.url)), 'utf8')
)
const key = (audit, f) => `${audit}|${f.code}|${f.id}`

// ─── The analysers, on input whose right answer is known ─────────────────────

describe('guard age-bound reader', () => {
  const src = fn => fn.toString()

  it('reads an inline AND-chain', () => {
    const b = numericBounds(src((G) => G.age >= 55 && G.age <= 70), 'age')
    expect([b.lo, b.hi]).toEqual([55, 70])
  })

  it('reads an early-return guard the opposite way round', () => {
    // `if (G.age < 55) return false` REQUIRES 55+, and reading it literally is
    // how a naive scan invents bounds that are not there.
    const b = numericBounds(src((G) => { if (G.age < 55) return false; return true }), 'age')
    expect(b.lo).toBe(55)
    expect(b.hi).toBe(Infinity)
  })

  it('does not mistake a child\'s age for the character\'s', () => {
    const b = numericBounds(src((G) => G.age >= 30 && G.children.some(c => c.age <= 14)), 'age')
    expect(b.lo).toBe(30)
    expect(b.hi).toBe(Infinity)
  })

  it('refuses to guess when the guard branches', () => {
    const b = numericBounds(src((G) => G.age > 60 || G.flags.has('x')), 'age')
    expect(b.confident).toBe(false)
  })

  it('handles the non-G parameter name', () => {
    const b = numericBounds(src((g) => g.age >= 12 && g.age < 18), 'age')
    expect([b.lo, b.hi]).toEqual([12, 17])
  })
})

describe('phase reachability analyser', () => {
  it('flags a guard whose age range its phase cannot contain', async () => {
    // Reproduces the retirement arc: phase 'midlife' (30-49), guard 55+.
    const fake = [
      { id: 'fake_retire', phase: 'midlife', when: (G) => G.age >= 55 && G.career },
      { id: 'fake_ok', phase: 'midlife', when: (G) => G.age >= 35 },
    ]
    const { loadCorpus } = await import('../scripts/lib/corpus.js')
    const corpus = await loadCorpus()
    corpus.EVENTS.push(...fake)
    try {
      const findings = await auditPhaseReachability()
      const dead = findings.filter(f => f.id === 'fake_retire' && f.level === 'error')
      expect(dead.length, 'the unreachable phase is reported').toBe(1)
      expect(findings.some(f => f.id === 'fake_ok' && f.level === 'error')).toBe(false)
    } finally {
      corpus.EVENTS.length = corpus.EVENTS.length - fake.length
    }
  }, 120000)
})

describe('country-name reader', () => {
  it('reads escaped apostrophes as one name', () => {
    const { required } = countriesInGuard(`G.currentCountry?.name === 'C\\'te d\\'Ivoire'`)
    expect(required.size).toBe(1)
  })
  it('treats a !== country as excluded, not required', () => {
    const { required, mentioned } = countriesInGuard(`G.currentCountry?.name !== 'Chad'`)
    expect(required.has('Chad')).toBe(false)
    expect(mentioned.has('Chad')).toBe(true)
  })
})

describe('flag setter scan', () => {
  const flags = collectSetFlags()
  it('finds literal, array, tag and template setters', () => {
    // One of each mechanism the engine actually uses.
    expect(flags.has('emigrated'), 'spread-array assignment').toBe(true)
    expect(flags.has('holocaust_family_memory'), 'birth-time flags.push in character.js').toBe(true)
    expect(flags.has('born_gifted_musical'), 'push of a const array element').toBe(true)
    expect(flags.has('lost_parent_mother'), 'template-literal flag').toBe(true)
    expect(flags.has('cancer_survivor'), 'survivorFlag data field').toBe(true)
    expect(flags.has('petty_criminal'), 'addFlag data field in crimes.js').toBe(true)
  })
  it('does not claim a flag nobody sets', () => {
    expect(flags.has('a_flag_that_does_not_exist_anywhere')).toBe(false)
  })
})

describe('flag check context', () => {
  it('separates a hard requirement from a dead OR branch', () => {
    const hard = flagChecksWithContext(`(G) => G.flags.has('x') && G.age > 20`)
    expect(hard[0]).toEqual({ flag: 'x', required: true })
    const soft = flagChecksWithContext(`(G) => (G.flags.has('x') || G.career) && G.age > 20`)
    expect(soft[0].required).toBe(false)
  })
  it('ignores a negated check', () => {
    expect(flagChecksWithContext(`(G) => !G.flags.has('x')`)).toEqual([])
  })
})

describe('world event scope analyser', () => {
  it('flags archetypes that exclude the event\'s own countries', async () => {
    // Reproduces the Chile/Argentina coup event: the matcher requires BOTH
    // filters, so a country whose archetype is not listed never sees it.
    const { loadCorpus } = await import('../scripts/lib/corpus.js')
    const corpus = await loadCorpus()
    const fake = {
      id: 'fake_scope_bug', name: 'Fake', years: [1970, 1980],
      archetypes: ['wealthy_west'], countries: ['Chile', 'Argentina'],
      narrative: 'x', effect: () => {},
    }
    corpus.WORLD_EVENTS.push(fake)
    try {
      const findings = await auditWorldEventScope()
      const hit = findings.find(f => f.id === 'fake_scope_bug')
      expect(hit?.level).toBe('error')
    } finally {
      corpus.WORLD_EVENTS.pop()
    }
  }, 120000)
})

// ─── The corpus ───────────────────────────────────────────────────────────────

describe('corpus reachability', () => {
  it('introduces no new unreachable content', async () => {
    const results = await runAllAudits()
    const known = new Set(baseline.entries.map(e => key(e.audit, e)))
    const seen = new Set()
    const fresh = []

    for (const r of results) {
      for (const f of r.findings) {
        if (f.level !== 'error') continue
        const k = key(r.name, f)
        seen.add(k)
        if (!known.has(k)) fresh.push(`${r.name}  ${f.where}  ${f.id}\n      ${f.message}`)
      }
    }

    const fixed = [...known].filter(k => !seen.has(k))
    if (fixed.length) {
      console.log(`\n${fixed.length} baseline entr${fixed.length === 1 ? 'y is' : 'ies are'} fixed — ` +
        `remove from tests/reachability.baseline.json:\n  ` + fixed.join('\n  '))
    }
    if (known.size) {
      console.log(`\nOutstanding unreachable content (${known.size - fixed.length} of ${known.size} still open) — ` +
        `run \`node scripts/check-events.js\` for the full report.`)
    }
    if (fresh.length) console.log(`\nNEW unreachable content:\n  ` + fresh.join('\n  '))
    expect(fresh, 'new unreachable content was introduced').toEqual([])
  }, 120000)

  it('reports its warnings without failing on them', async () => {
    const results = await runAllAudits()
    const warnCounts = results.map(r => `${r.name}: ${r.findings.filter(f => f.level === 'warn').length}`)
    console.log('  reachability warnings — ' + warnCounts.join(', '))
    expect(results.length).toBeGreaterThan(0)
  }, 120000)
})
