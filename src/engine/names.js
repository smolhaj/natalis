// names.js — one place to draw a person's name, so two people in one life are
// not the same person.
//
// Names were drawn by ten independent `pickFrom(country.namePool.male)` calls
// across four files, each with no idea what the others had produced. Over ten
// observed lives that gave a player and their own sister both called Reem, a
// partner and a father both called Patrick, and enough twins that the family
// tree stopped reading as a family.
//
// A pool holds about thirty names, so with a mother, a father, four siblings,
// a partner, three children and a few friends, a collision somewhere is close
// to certain — the birthday problem, with a very small year.
//
// Real families do reuse names, and this does not forbid it; it takes a small
// number of tries to find an unused one and gives up rather than failing,
// because a repeat is a curiosity and an empty name is a bug.

import { pickFrom } from '../utils/random'

/**
 * Every first name already spoken for in this life: the character, their
 * parents, siblings, partner, children, friends and pets.
 */
export function namesInUse(state) {
  const used = new Set()
  const add = (n) => { if (typeof n === 'string' && n) used.add(n.split(' ')[0].toLowerCase()) }
  add(state?.character?.firstName)
  add(state?.character?.name)
  for (const p of Object.values(state?.parents ?? {})) add(p?.name)
  for (const group of [state?.siblings, state?.children, state?.friends, state?.pets]) {
    for (const m of group ?? []) add(m?.name)
  }
  add(state?.partner?.name)
  return used
}

/**
 * Draw a first name from `pool` that nobody in this life is using.
 *
 * Falls back to an ordinary draw after a few attempts: a pool can legitimately
 * be exhausted by a large family, and a family where everyone shares a name is
 * less wrong than a family where somebody has none.
 */
export function pickUnusedName(pool, used, tries = 12) {
  if (!Array.isArray(pool) || pool.length === 0) return ''
  for (let i = 0; i < tries; i++) {
    const n = pickFrom(pool)
    if (!used || !used.has(String(n).toLowerCase())) return n
  }
  return pickFrom(pool)
}

/**
 * A full name for a new person in this life.
 *
 * `opts.surname` forces one — a sibling or a child shares the household's.
 * Otherwise the surname is drawn, because a partner met as an adult has their
 * own family behind them. Some name systems have no family name at all, and
 * those countries simply carry a second given name in `surnames`, which is how
 * they read.
 */
export function personName(country, gender, state, opts = {}) {
  const pool = gender === 'male' ? country?.namePool?.male : country?.namePool?.female
  const used = opts.used ?? namesInUse(state)
  const first = pickUnusedName(pool, used)
  if (opts.surname !== undefined) return `${first} ${opts.surname}`.trim()
  const surname = pickFrom(country?.surnames ?? [])
  return `${first} ${surname}`.trim()
}
