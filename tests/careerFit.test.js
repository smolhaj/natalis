import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { CAREERS } from '../src/data/careers.js'

// FIELD_FIT is the table that stops getAvailableCareers — which answers "is
// this legal for this character" — from making a 1974 Ethiopian villager a dog
// walker. `chooseCareer` reads it as `FIELD_FIT[c.field]?.[col] ?? 1`, and that
// `?? 1` is silent: a career whose field has no row is weighted identically for
// a rural subsistence character and an urban graduate, in every column, and
// nothing anywhere says so.
//
// The table is complete today. It is complete by somebody's diligence, not by
// anything that would notice if it stopped being — and the whole history in
// CLAUDE.md is of silent fallbacks that were correct until they were not:
// `check-flags` falling through to `partial` for an unrecognised intent,
// `check-anachronisms` exempting any line containing a negation, `isRich`
// answering a question about now three separate times. Adding one career with
// a new field name is all it takes.
function readFieldFit() {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/engine/lifeCourse.js'), 'utf8')
  const block = src.match(/const FIELD_FIT = \{[\s\S]*?\n\}/)
  expect(block, 'FIELD_FIT literal not found in lifeCourse.js').toBeTruthy()
  const rows = new Map()
  for (const m of block[0].matchAll(/^\s{2}([A-Za-z_]+):\s*\[([^\]]+)\]/gm)) {
    rows.set(m[1], m[2].split(',').map(n => Number(n.trim())))
  }
  return rows
}

describe('career field fit', () => {
  it('weights every field some career actually uses', () => {
    const rows = readFieldFit()
    const used = [...new Set(CAREERS.map(c => c.field))]
    const missing = used.filter(f => !rows.has(f))
    expect(missing, `these career fields fall through to \`?? 1\` and are weighted the same for a rural villager as for an urban graduate: ${missing.join(', ')}`).toEqual([])
  })

  it('carries no row no career uses', () => {
    const rows = readFieldFit()
    const used = new Set(CAREERS.map(c => c.field))
    const orphans = [...rows.keys()].filter(f => !used.has(f))
    expect(orphans, `FIELD_FIT rows for fields no career declares — either a typo or a career that was renamed: ${orphans.join(', ')}`).toEqual([])
  })

  it('gives every row three columns of finite, non-negative weight', () => {
    const rows = readFieldFit()
    const bad = []
    for (const [field, cols] of rows) {
      if (cols.length !== 3) bad.push(`${field}: ${cols.length} columns, expected rural-poor/urban-poor/urban-rich`)
      else if (cols.some(n => !Number.isFinite(n) || n < 0)) bad.push(`${field}: ${cols.join(', ')}`)
    }
    expect(bad).toEqual([])
  })

  // The part the table exists for. Subsistence agriculture is what a rural poor
  // economy employs people to do, and a trading floor is not.
  it('keeps the rural-poor and urban-rich columns pointing in opposite directions', () => {
    const rows = readFieldFit()
    const ruralOver = (a, b) => rows.get(a)[0] > rows.get(b)[0]
    const richOver = (a, b) => rows.get(a)[2] > rows.get(b)[2]
    expect(ruralOver('agriculture', 'finance'), 'a rural poor character should reach farming before finance').toBe(true)
    expect(ruralOver('agriculture', 'technology'), 'a rural poor character should reach farming before software').toBe(true)
    expect(richOver('technology', 'agriculture'), 'an urban rich character should reach software before farming').toBe(true)
    expect(richOver('finance', 'agriculture'), 'an urban rich character should reach finance before farming').toBe(true)
  })
})
