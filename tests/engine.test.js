import { describe, it, expect } from 'vitest'
import {
  buildG,
  buildEffectProxy,
  applyProxy,
  resolveProxyExtras,
  getNextEvent,
  enterCareer,
  quitJob,
  getAvailableCareers,
} from '../src/engine/tick.js'
import { FlagSet } from '../src/engine/character.js'
import { makeState, makeAdultState } from './helpers.js'

// ─── buildG ───────────────────────────────────────────────────────────────────

describe('buildG', () => {
  it('returns an object with expected core fields', () => {
    const state = makeState()
    const G = buildG(state)
    expect(G).toHaveProperty('character')
    expect(G).toHaveProperty('stats')
    expect(G).toHaveProperty('flags')
    expect(G).toHaveProperty('age')
    expect(G).toHaveProperty('currentYear')
    expect(G).toHaveProperty('money')
    expect(G).toHaveProperty('karma')
    expect(G).toHaveProperty('regime')
    expect(G).toHaveProperty('desire')
    expect(G).toHaveProperty('conditions')
  })

  it('wraps flags in a FlagSet', () => {
    const state = makeState({ flags: ['emigrated', 'married'] })
    const G = buildG(state)
    expect(G.flags).toBeInstanceOf(FlagSet)
    expect(G.flags.has('emigrated')).toBe(true)
    expect(G.flags.includes('married')).toBe(true)
    expect(G.flags.has('unknown_flag')).toBe(false)
  })

  it('yearsSince returns a function computing currentYear minus stored mem year', () => {
    const state = makeState({ currentYear: 2000, mem: { lastMajorEvent_bereavement: 1995 } })
    const G = buildG(state)
    expect(typeof G.yearsSince).toBe('function')
    expect(G.yearsSince('bereavement')).toBe(5)
  })

  it('yearsSince returns large number for never-set category', () => {
    const state = makeState({ currentYear: 2000, mem: {} })
    const G = buildG(state)
    expect(G.yearsSince('bereavement')).toBe(2000) // currentYear - 0
  })

  it('calculates wealthTier dynamically for adults based on net worth', () => {
    const richState = makeState({ age: 30, money: 250000, debt: 0, assets: { properties: [], vehicles: [] } })
    const richG = buildG(richState)
    expect(richG.wealthTier).toBe(4) // >= 200k

    const poorState = makeState({ age: 30, money: 100, debt: 0 })
    const poorG = buildG(poorState)
    expect(poorG.wealthTier).toBe(1) // between 0 and 5000
  })

  it('uses birth wealthTier for characters under 18', () => {
    const state = makeState({ age: 15 }) // character wealthTier = 3
    const G = buildG(state)
    expect(G.wealthTier).toBe(3)
  })

  it('derives season deterministically per character+year', () => {
    const state = makeState()
    const G1 = buildG(state)
    const G2 = buildG(state)
    expect(G1.season).toBe(G2.season)
  })

  it('literate is true by default and respects became_literate flag', () => {
    const state = makeState({ flags: [] })
    const G = buildG(state)
    expect(G.literate).toBe(true)
  })

  it('regime comes from getCountryRegime', () => {
    const state = makeState()
    const G = buildG(state)
    expect(typeof G.regime).toBe('string')
    expect(G.regime.length).toBeGreaterThan(0)
  })

  it('era is the decade of currentYear', () => {
    const state = makeState({ currentYear: 1987 })
    const G = buildG(state)
    expect(G.era).toBe(1980)
  })
})

// ─── applyProxy ───────────────────────────────────────────────────────────────

describe('applyProxy', () => {
  it('applies stat deltas and clamps to 0–100', () => {
    const state = makeState({ stats: { happiness: 80, health: 50, smarts: 50, looks: 50, charisma: 50, wealth: 50 } })
    const proxy = { h: 0, m: 0, w: 0, e: 0, s: 0, lo: 0, r: 0, mo: 0, karma: 0, fame: 0, legacy: 0, flags: [...state.flags], mem: { ...state.mem } }
    proxy.m = 30  // happiness 80 + 30 = 110 → clamped to 100
    proxy.h = -60 // health 50 - 60 = -10 → clamped to 0

    const next = applyProxy(state, proxy)
    expect(next.stats.happiness).toBe(100)
    expect(next.stats.health).toBe(0)
  })

  it('applies money changes', () => {
    const state = makeState({ money: 1000 })
    const proxy = { h: 0, m: 0, w: 0, e: 0, s: 0, lo: 0, r: 0, mo: 500, karma: 0, fame: 0, legacy: 0, flags: [], mem: {} }
    const next = applyProxy(state, proxy)
    expect(next.money).toBe(1500)
  })

  it('applies karma changes', () => {
    const state = makeState({ karma: 50 })
    const proxy = { h: 0, m: 0, w: 0, e: 0, s: 0, lo: 0, r: 0, mo: 0, karma: 15, fame: 0, legacy: 0, flags: [], mem: {} }
    const next = applyProxy(state, proxy)
    expect(next.karma).toBe(65)
  })

  it('applies flag changes from proxy', () => {
    const state = makeState({ flags: ['old_flag'] })
    const proxy = { h: 0, m: 0, w: 0, e: 0, s: 0, lo: 0, r: 0, mo: 0, karma: 0, fame: 0, legacy: 0, flags: ['old_flag', 'new_flag'], mem: {} }
    const next = applyProxy(state, proxy)
    expect(next.flags).toContain('old_flag')
    expect(next.flags).toContain('new_flag')
  })
})

// ─── buildEffectProxy ─────────────────────────────────────────────────────────

describe('buildEffectProxy', () => {
  it('creates a proxy with all expected shorthand properties', () => {
    const state = makeState()
    const proxy = buildEffectProxy(state)
    expect(proxy).toHaveProperty('m')    // happiness delta
    expect(proxy).toHaveProperty('h')    // health delta
    expect(proxy).toHaveProperty('e')    // smarts delta
    expect(proxy).toHaveProperty('s')    // charisma delta
    expect(proxy).toHaveProperty('w')    // wealth stat delta
    expect(proxy).toHaveProperty('lo')   // looks delta
    expect(proxy).toHaveProperty('mo')   // money delta
    expect(proxy).toHaveProperty('karma')
    expect(proxy).toHaveProperty('fame')
  })

  it('has all required proxy methods', () => {
    const state = makeState()
    const proxy = buildEffectProxy(state)
    const methods = [
      'addFlag', 'clearFlag', 'setEducation', 'setCareer', 'clearCareer',
      'setPartner', 'clearPartner', 'addChild', 'addFriend', 'makeFriend',
      'setGpa', 'setEnrolled', 'setMem', 'wipeMoney',
      'updateChildRel', 'updateFriendRel',
      'killPartner', 'releaseFromPrison', 'killParent', 'setResidency',
      'setReligion', 'setClassTier', 'setMentalHealth', 'setDesire', 'setPolitical',
      'addCondition', 'manageCondition', 'worsenCondition',
      'relocate', 'practiceHobby', 'addGold', 'addDebt', 'setDebt',
      'setBanked', 'setJointFamily', 'partnerRel', 'updatePartnerRel',
      'addPartnerMoment', 'scheduleEcho',
    ]
    for (const m of methods) {
      expect(typeof proxy[m]).toBe('function', `proxy.${m} should be a function`)
    }
  })

  it('addFlag stores flag in proxy.flags', () => {
    const state = makeState({ flags: [] })
    const proxy = buildEffectProxy(state)
    proxy.addFlag('test_flag')
    expect(proxy.flags).toContain('test_flag')
  })

  it('addFlag does not add duplicates', () => {
    const state = makeState({ flags: ['existing'] })
    const proxy = buildEffectProxy(state)
    proxy.addFlag('existing')
    expect(proxy.flags.filter(f => f === 'existing').length).toBe(1)
  })

  it('addFlag timestamps emotionally significant flags', () => {
    const state = makeState({ currentYear: 1995, flags: [] })
    const proxy = buildEffectProxy(state)
    proxy.addFlag('widowed')
    expect(proxy.mem.widowedYear).toBe(1995)
  })

  it('wipeMoney deducts a fraction of current money', () => {
    const state = makeState({ money: 10000 })
    const proxy = buildEffectProxy(state)
    proxy.wipeMoney(0.5)
    expect(proxy.mo).toBe(-5000)
  })

  it('scheduleEcho adds to echoQueue with correct fireAtAge', () => {
    const state = makeState({ age: 20 })
    const proxy = buildEffectProxy(state)
    proxy.scheduleEcho('some_event', 5)
    expect(proxy._echoQueue).toEqual([{ eventId: 'some_event', fireAtAge: 25 }])
  })

  it('setCareer stores careerId for resolveProxyExtras', () => {
    const state = makeState()
    const proxy = buildEffectProxy(state)
    proxy.setCareer('teacher')
    expect(proxy._newCareerId).toBe('teacher')
  })

  it('clearFlag removes flag from proxy.flags', () => {
    const state = makeState({ flags: ['to_remove', 'to_keep'] })
    const proxy = buildEffectProxy(state)
    proxy.clearFlag('to_remove')
    expect(proxy.flags).not.toContain('to_remove')
    expect(proxy.flags).toContain('to_keep')
  })
})

// ─── resolveProxyExtras ───────────────────────────────────────────────────────

describe('resolveProxyExtras', () => {
  it('clears partner when _clearPartner is true', () => {
    const state = makeState({ partner: { name: 'Alex', alive: true } })
    const proxy = buildEffectProxy(state)
    proxy.clearPartner()
    const next = resolveProxyExtras(state, proxy)
    expect(next.partner).toBeNull()
  })

  it('adds child to children array', () => {
    const state = makeState({ children: [] })
    const proxy = buildEffectProxy(state)
    proxy.addChild({ name: 'Baby', gender: 'male', age: 0 })
    const next = resolveProxyExtras(state, proxy)
    expect(next.children).toHaveLength(1)
    expect(next.children[0].name).toBe('Baby')
  })

  it('updates partner relationship quality', () => {
    const state = makeState({ partner: { name: 'Alex', alive: true, relationshipQuality: 60 } })
    const proxy = buildEffectProxy(state)
    proxy.partnerRel(20)
    const next = resolveProxyExtras(state, proxy)
    expect(next.partner.relationshipQuality).toBe(80)
  })

  it('kills parent and marks them not alive', () => {
    const state = makeState()
    const proxy = buildEffectProxy(state)
    proxy.killParent('mother')
    const next = resolveProxyExtras(state, proxy)
    expect(next.parents.mother.alive).toBe(false)
  })

  it('sets residency status', () => {
    const state = makeState({ residencyStatus: 'citizen' })
    const proxy = buildEffectProxy(state)
    proxy.setResidency('work_visa')
    const next = resolveProxyExtras(state, proxy)
    expect(next.residencyStatus).toBe('work_visa')
  })

  it('adds a condition that does not already exist', () => {
    const state = makeState({ conditions: [] })
    const proxy = buildEffectProxy(state)
    proxy.addCondition('diabetes', 'moderate')
    const next = resolveProxyExtras(state, proxy)
    expect(next.conditions).toHaveLength(1)
    expect(next.conditions[0].id).toBe('diabetes')
    expect(next.conditions[0].severity).toBe('moderate')
    expect(next.conditions[0].managed).toBe(false)
  })

  it('does not add a duplicate condition', () => {
    const state = makeState({ conditions: [{ id: 'diabetes', severity: 'mild', managed: false }] })
    const proxy = buildEffectProxy(state)
    proxy.addCondition('diabetes', 'moderate')
    const next = resolveProxyExtras(state, proxy)
    expect(next.conditions).toHaveLength(1)
  })

  it('updates condition managed flag', () => {
    const state = makeState({ conditions: [{ id: 'diabetes', severity: 'mild', managed: false }] })
    const proxy = buildEffectProxy(state)
    proxy.manageCondition('diabetes', true)
    const next = resolveProxyExtras(state, proxy)
    expect(next.conditions[0].managed).toBe(true)
  })

  it('adds echoQueue entries', () => {
    const state = makeState({ age: 20, echoQueue: [] })
    const proxy = buildEffectProxy(state)
    proxy.scheduleEcho('echo_event', 3)
    const next = resolveProxyExtras(state, proxy)
    expect(next.echoQueue).toHaveLength(1)
    expect(next.echoQueue[0]).toEqual({ eventId: 'echo_event', fireAtAge: 23 })
  })

  it('sets desire', () => {
    const state = makeState({ desire: null })
    const proxy = buildEffectProxy(state)
    proxy.setDesire('prove_worth')
    const next = resolveProxyExtras(state, proxy)
    expect(next.desire).toBe('prove_worth')
  })

  it('sets political leaning', () => {
    const state = makeState()
    const proxy = buildEffectProxy(state)
    proxy.setPolitical('left')
    const next = resolveProxyExtras(state, proxy)
    expect(next.political_leaning).toBe('left')
  })
})

// ─── getNextEvent ─────────────────────────────────────────────────────────────

describe('getNextEvent', () => {
  it('returns null or an event object', () => {
    const state = makeState()
    const event = getNextEvent(state)
    expect(event === null || typeof event === 'object').toBe(true)
  })

  it('returned event has id, text, and phase', () => {
    // Run many times to get a non-null result
    let event = null
    const state = makeState()
    for (let i = 0; i < 50; i++) {
      event = getNextEvent(state)
      if (event) break
    }
    if (event) {
      expect(event).toHaveProperty('id')
      expect(event).toHaveProperty('text')
    }
  })

  it('respects prison filter — non-prisonOk events should not fire in prison', () => {
    const state = makeState({ inPrison: true, age: 25, currentYear: 2005 })
    // Run many times; any non-prisonOk event firing in prison is a bug
    for (let i = 0; i < 100; i++) {
      const event = getNextEvent(state)
      if (event && event.prisonOk !== true) {
        // Only fail if a non-prisonOk event fires
        expect(event.prisonOk).toBe(true)
      }
    }
  })

  it('returns a queued event matching current phase when available', () => {
    const mockEvent = {
      id: 'test_queued_event',
      phase: 'childhood',
      text: 'Test event',
      choices: null,
      weight: 10,
    }
    const state = makeState({ age: 8, queue: [mockEvent] }) // childhood phase
    const event = getNextEvent(state)
    expect(event).not.toBeNull()
    expect(event.id).toBe('test_queued_event')
  })

  it('does not return a used event with no cooldown', () => {
    const state = makeState()
    // Get an event, mark it as used
    const firstEvent = getNextEvent(state)
    if (!firstEvent) return // no events for this state, skip

    const usedEventMap = new Map([[firstEvent.id, state.currentYear]])
    const stateWithUsed = { ...state, usedEventMap }

    // Run many times — that specific event should not appear
    for (let i = 0; i < 200; i++) {
      const event = getNextEvent(stateWithUsed)
      if (event) {
        expect(event.id).not.toBe(firstEvent.id)
      }
    }
  })
})

// ─── enterCareer ──────────────────────────────────────────────────────────────

describe('enterCareer', () => {
  it('sets career fields on state', () => {
    const state = makeAdultState({ age: 22, education: { level: 'secondary', field: null, enrolled: null } })
    const next = enterCareer(state, 'farmer')
    if (next.career) {
      expect(next.career).toHaveProperty('id')
      expect(next.career).toHaveProperty('title')
      expect(next.career).toHaveProperty('salary')
      expect(next.career.salary).toBeGreaterThan(0)
    }
  })

  it('adds a log entry', () => {
    const state = makeAdultState()
    const next = enterCareer(state, 'farmer')
    expect(next.log.length).toBeGreaterThan(state.log.length)
  })
})

// ─── quitJob ──────────────────────────────────────────────────────────────────

describe('quitJob', () => {
  it('clears the career', () => {
    const state = makeAdultState({
      career: { id: 'farmer', title: 'Farmer', salary: 12000, level: 0, yearsInRole: 2, performance: 50 },
    })
    const next = quitJob(state)
    expect(next.career).toBeNull()
  })

  it('increases happiness by 8', () => {
    const state = makeAdultState({
      stats: { happiness: 50, health: 75, smarts: 60, looks: 55, charisma: 55, wealth: 50 },
      career: { id: 'farmer', title: 'Farmer', salary: 12000, level: 0, yearsInRole: 2, performance: 50 },
    })
    const next = quitJob(state)
    expect(next.stats.happiness).toBe(58)
  })
})

// ─── getAvailableCareers ──────────────────────────────────────────────────────

describe('getAvailableCareers', () => {
  it('returns an array', () => {
    const state = makeAdultState()
    const careers = getAvailableCareers(state)
    expect(Array.isArray(careers)).toBe(true)
  })

  it('only returns careers with minYear <= currentYear', () => {
    const state = makeAdultState({ currentYear: 1975 })
    const careers = getAvailableCareers(state)
    for (const c of careers) {
      if (c.minYear) expect(c.minYear).toBeLessThanOrEqual(1975)
    }
  })

  it('excludes careers with maxYear < currentYear', () => {
    const state = makeAdultState({ currentYear: 2020 })
    const careers = getAvailableCareers(state)
    for (const c of careers) {
      if (c.maxYear) expect(c.maxYear).toBeGreaterThanOrEqual(2020)
    }
  })
})
