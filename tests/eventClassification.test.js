// A guard written against a module-local helper — HOME(G), IS_GY(G) — names no
// state field the classifier can recognise, and Kabyle village councils,
// Amhara church schools and the Guyanese seawall were filed `universal`, to
// compete with content that could fire for anyone. Geographic modules are
// tagged at load (GEOGRAPHIC_MODULES in events.js) so the classifier can tell.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { EVENTS, classifyEvent, GEOGRAPHIC_MODULES } from '../src/data/events.js'

describe('events behind a module-local helper', () => {
  it('tags every array imported from a geographic module', () => {
    const src = fs.readFileSync(new URL('../src/data/events.js', import.meta.url), 'utf8')
    const imported = new Set()
    for (const m of src.matchAll(/import \{([^}]+)\} from '\.\/events\/geographic\/[^']+'/g)) {
      for (const n of m[1].split(',')) if (n.trim()) imported.add(n.trim())
    }
    const block = src.slice(src.indexOf('export const GEOGRAPHIC_MODULES = ['), src.indexOf(']', src.indexOf('export const GEOGRAPHIC_MODULES = [')))
    const listed = new Set(block.replace('export const GEOGRAPHIC_MODULES = [', '').split(',').map(x => x.trim()).filter(Boolean))
    expect([...imported].filter(n => !listed.has(n))).toEqual([])
    expect(GEOGRAPHIC_MODULES.length).toBe(imported.size)
  })

  it('files no geographic event as universal', () => {
    const universal = EVENTS.filter(e => e?.geoModule).filter(e => classifyEvent(e).register === 'universal').map(e => e.id)
    expect(universal).toEqual([])
  })

  it('files a HOME(G) event as anchored', () => {
    const e = EVENTS.find(x => x.id === 'kab_tajmaat')
    expect(classifyEvent(e).register).toBe('anchored')
  })
})
