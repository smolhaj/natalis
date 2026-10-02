// The engine kills children, siblings and partners on country-and-year rates
// and keeps them on state with `alive: false`, because the grief layer needs
// their names. ~350 guards read `G.children` and 81 read `G.siblings` as "the
// people you have" — `.length > 0`, `.some(c => c.age >= 18)`, `[0].name` — so
// every one of them could hand a living-tense sentence to the dead. buildG now
// exposes the living under the old names and the dead under `allChildren`,
// `deadChildren` and `allSiblings`; these tests hold that in place, and the
// verbs that make a narrated death or divorce true.
import { describe, it, expect } from 'vitest'

const store = {}
globalThis.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v) },
  removeItem: k => { delete store[k] },
}

const { useGameStore } = await import('../src/store/gameStore.js')
const { buildG, buildEffectProxy, applyProxy, resolveProxyExtras } = await import('../src/engine/tick.js')
const { EVENTS } = await import('../src/data/events.js')
const { buildYearTexture } = await import('../src/engine/yearTexture.js')
const { buildMundaneLayer } = await import('../src/engine/mundaneLayer.js')
const { generateIdentityCard } = await import('../src/engine/epitaph.js')
const { divorceLegalFor } = await import('../src/data/history.js')

function born(country, birthYear) {
  useGameStore.getState().setMode('passive')
  useGameStore.getState().startCuratedGame({ country, birthYear })
  return { ...useGameStore.getState(), mode: 'passive' }
}
function runEffect(state, fn) {
  const proxy = buildEffectProxy(state)
  fn(proxy)
  return resolveProxyExtras(applyProxy(state, proxy), proxy)
}

// Names nothing else in the corpus could print.
const DEAD = ['Quillonde', 'Barrowmere', 'Tessivane']
const LIVING = 'Orsolwyn'

function bereaved(country = 'Nigeria', birthYear = 1950, age = 55) {
  const s = born(country, birthYear)
  const kids = DEAD.map((name, i) => ({
    name: `${name} X`, gender: i % 2 ? 'male' : 'female', ageAtBirth: 20 + i * 3,
    age: 3 + i, relationshipQuality: 30 + i * 10, traits: [],
    alive: false, deathYear: birthYear + 25 + i * 3, deathAge: 3 + i,
  }))
  const sibs = DEAD.map((name, i) => ({ name: `${name}a Y`, gender: 'female', ageDiff: i - 1, relationshipQuality: 80, alive: false, deathYear: birthYear + 40 }))
  return {
    ...s, age, currentYear: birthYear + age,
    children: kids, siblings: sibs,
    flags: [...new Set([...(s.flags ?? []), 'lost_child', 'bereaved', 'lost_sibling', 'sibling_estranged', 'grandparent'])],
    mem: { ...(s.mem ?? {}), lost_childYear: birthYear + 30 },
  }
}

const namesDead = (line) => DEAD.some(n => String(line ?? '').includes(n))

describe('the dead are not counted among the living', () => {
  const s = bereaved()
  const G = buildG(s)

  it('G.children and G.siblings hold the living; the dead are kept elsewhere', () => {
    expect(G.children).toEqual([])
    expect(G.siblings).toEqual([])
    expect(G.allChildren).toHaveLength(3)
    expect(G.deadChildren).toHaveLength(3)
    expect(G.allSiblings).toHaveLength(3)
  })

  it('no event that reads children or siblings names a dead one', () => {
    const readers = EVENTS.filter(e => /G\.(children|siblings|allChildren|allSiblings)/.test(`${e.when} ${e.text}`))
    expect(readers.length).toBeGreaterThan(200)
    const offenders = []
    const real = Math.random
    Math.random = () => 0 // open every random gate, so the guard's own logic decides
    try {
      for (const e of readers) {
        let pass = false
        try { pass = !e.when || !!e.when(G) } catch { pass = false }
        if (!pass) continue
        let text = e.text
        try { text = typeof e.text === 'function' ? e.text(G) : e.text } catch { continue }
        const choiceText = (e.choices ?? []).map(c => `${c.text} ${typeof c.outcome === 'function' ? '' : c.outcome}`).join(' ')
        if (namesDead(text) || namesDead(choiceText)) offenders.push(e.id)
      }
    } finally { Math.random = real }
    expect(offenders).toEqual([])
  })

  it('representative guards about a living child or sibling stay closed', () => {
    const real = Math.random
    Math.random = () => 0
    try {
      for (const id of ['rq_child_drift', 'rq_child_estrangement', 'grief_child_young_death', 'child_death_surviving_siblings', 'sib_late_death', 'ft56_sib_estranged_funeral']) {
        const e = EVENTS.find(x => x.id === id)
        expect(e, id).toBeTruthy()
        expect(!!e.when(G), id).toBe(false)
      }
    } finally { Math.random = real }
  })

  it('a living child among the dead is the one that is named', () => {
    const withLiving = {
      ...s,
      children: [...s.children, { name: `${LIVING} X`, gender: 'male', ageAtBirth: 30, age: 25, relationshipQuality: 35, traits: [] }],
    }
    const G2 = buildG(withLiving)
    expect(G2.children.map(c => c.name)).toEqual([`${LIVING} X`])
    const e = EVENTS.find(x => x.id === 'rq_child_drift')
    expect(e.when(G2)).toBe(true)
    expect(e.text(G2)).toContain(LIVING)
    // `updateChildRel(0, …)` was aimed at the eldest, who is dead; it lands on
    // the child the sentence named.
    const after = runEffect(withLiving, (p) => p.updateChildRel(0, 10))
    expect(after.children[0].relationshipQuality).toBe(withLiving.children[0].relationshipQuality)
    expect(after.children[3].relationshipQuality).toBe(45)
  })

  it('the quiet-year layers and the identity card do not name the dead as living', () => {
    // The grief layer is supposed to name them ("would have been 56 this
    // year"); what must not happen is a living-tense line about them.
    const MOURNING = /would have been|died|dead|death|grave|funeral|lost|remember|last one|gone|missing|absence/i
    const living = (l) => namesDead(l) && !MOURNING.test(String(l))
    for (let i = 0; i < 300; i++) {
      expect(living(buildYearTexture(s, { specificOnly: true })), 'yearTexture').toBe(false)
      expect(living(buildMundaneLayer(s)), 'mundane').toBe(false)
    }
    const card = generateIdentityCard(s)
    expect(namesDead(JSON.stringify(card))).toBe(false)
    expect(JSON.stringify(card)).not.toMatch(/3 children|three children/)
  })
})

describe('a narrated death is made true', () => {
  it('killSibling marks the first living sibling', () => {
    const s = born('Germany', 1940)
    const state = { ...s, age: 70, currentYear: 2010, siblings: [
      { name: 'Anna B', gender: 'female', ageDiff: 2, relationshipQuality: 60, alive: false, deathYear: 1990 },
      { name: 'Karl B', gender: 'male', ageDiff: -3, relationshipQuality: 60, alive: true },
    ] }
    const after = runEffect(state, (p) => p.killSibling())
    expect(after.siblings[1].alive).toBe(false)
    expect(after.siblings[1].deathYear).toBe(2010)
    expect(after.flags).toContain('lost_sibling')
  })

  it('the late sibling death and the young child death leave the person dead', () => {
    const s = born('Germany', 1940)
    const state = { ...s, age: 70, currentYear: 2010,
      siblings: [{ name: 'Karl B', gender: 'male', ageDiff: -3, relationshipQuality: 60, alive: true }],
      children: [{ name: 'Lena B', gender: 'female', ageAtBirth: 28, age: 42, relationshipQuality: 70, traits: [] }],
    }
    const sib = EVENTS.find(x => x.id === 'sib_late_death')
    expect(runEffect(state, sib.effect).siblings[0].alive).toBe(false)
    const child = EVENTS.find(x => x.id === 'grief_child_young_death')
    expect(runEffect(state, child.effect).children[0].alive).toBe(false)
  })

  it('spouse_death kills the partner rather than clearing them', () => {
    const s = born('Japan', 1940)
    const state = { ...s, age: 70, currentYear: 2010, partner: { name: 'Haru T', gender: 'male', age: 72, married: true, relationshipQuality: 70, years: 40 } }
    const e = EVENTS.find(x => x.id === 'spouse_death')
    const after = runEffect(state, e.choices[0].effect)
    expect(after.partner?.alive).toBe(false)
    expect(after.flags).toContain('widowed')
  })
})

describe('a marriage ends in the law of where it ends', () => {
  const marriedIn = (country, year) => {
    const s = born(country, year - 40)
    return { ...s, age: 40, currentYear: year, partner: { name: 'Pat M', gender: 'male', age: 41, married: true, relationshipQuality: 30, years: 12 }, flags: [...(s.flags ?? []), 'married'] }
  }

  it('there is no divorce in Ireland before 1997 or the Philippines at all, except for Filipino Muslims', () => {
    expect(divorceLegalFor('Ireland', 1985)).toBe(false)
    expect(divorceLegalFor('Ireland', 1997)).toBe(true)
    expect(divorceLegalFor('Philippines', 2020, 'christian_catholic')).toBe(false)
    expect(divorceLegalFor('Philippines', 2020, 'muslim_sunni')).toBe(true)
  })

  it('endMarriage is a separation where divorce is illegal, and a divorce where it is not', () => {
    const before = runEffect(marriedIn('Ireland', 1985), (p) => p.endMarriage())
    expect(before.flags).not.toContain('divorced')
    expect(before.flags).toContain('breakup')
    expect(before.partner).toBeNull()
    const after = runEffect(marriedIn('Ireland', 2005), (p) => p.endMarriage())
    expect(after.flags).toContain('divorced')
  })

  it('no event in the corpus sets `divorced` by hand', () => {
    const bySetter = EVENTS.filter(e => [e.effect, ...(e.choices ?? []).map(c => c?.effect)]
      .some(f => typeof f === 'function' && /addFlag\(['"]divorced['"]\)/.test(f.toString())))
    const byTag = EVENTS.filter(e => (e.choices ?? []).some(c => c?.tag === 'divorced'))
    expect([...bySetter, ...byTag].map(e => e.id)).toEqual([])
  })
})
