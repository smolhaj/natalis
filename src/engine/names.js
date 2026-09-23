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
  const add = (n) => { if (typeof n === 'string' && n) used.add(nameKey(n.split(' ')[0])) }
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
 * Two names are the same name when they are the same person's name written two
 * ways. A household came out holding Yelena Orlov and her daughter Elena Orlov,
 * because the comparison was a lowercase string match and those are two
 * spellings of one name. `Natalia`/`Natalya`, `Sergei`/`Sergey`, `Mohamed`/
 * `Mohammed`/`Muhammad` are the same trap, and a family with two of them reads
 * as a bug rather than as a coincidence.
 */
export function nameKey(n) {
  // Deliberately narrow. A key that collapses aggressively rejects names that
  // are genuinely different, exhausts the twelve draws and falls back to an
  // ordinary pick — which produces the real duplicates it was meant to prevent.
  // Measured: a phonetic key took family collisions from under 1% to 14%.
  // Only the transliteration pairs that actually appear in the pools.
  return String(n)
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/^ye/, 'e')             // Yelena / Elena
    .replace(/(ey|ei)$/, 'i')        // Sergey / Sergei
    .replace(/ya$/, 'ia')            // Natalya / Natalia
    .replace(/(mm|nn|ll|ss|tt|dd)/g, m => m[0])
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
    if (!used || !used.has(nameKey(n))) return n
  }
  return pickFrom(pool)
}

// Slavic family names take a feminine form, and the game was producing Yulia
// Orlov and her daughters Elena Orlov and Alina Orlov. This is the whole of the
// rule for the common endings; a name it does not recognise is left alone,
// which is the right failure.
const SLAVIC_FEMININE = [
  [/sky$/, 'skaya'], [/ski$/, 'ska'], [/tsky$/, 'tskaya'],
  [/ov$/, 'ova'], [/ev$/, 'eva'], [/yov$/, 'yova'], [/in$/, 'ina'], [/yn$/, 'yna'],
]
const SLAVIC_COUNTRIES = new Set([
  'Russia', 'Ukraine', 'Belarus', 'Bulgaria', 'Czech Republic', 'Slovakia', 'Poland',
])
export function surnameFor(country, surname, gender) {
  if (gender !== 'female' || !surname) return surname
  if (!SLAVIC_COUNTRIES.has(country?.name)) return surname
  for (const [re, tail] of SLAVIC_FEMININE) {
    if (re.test(surname)) return surname.replace(re, tail)
  }
  return surname
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
  let base
  if (opts.surname !== undefined) {
    base = opts.surname
  } else {
    // Not the household's. A partner met as an adult has their own family
    // behind them, and drawing blind from a thirty-name pool married a
    // Stefanie Zimmermann to a Simon Zimmermann.
    const own = state?.character?.surnameBase ?? state?.character?.surname
    const pool = (country?.surnames ?? []).filter(n => n !== own)
    base = pickFrom(pool.length ? pool : (country?.surnames ?? []))
  }
  return `${first} ${surnameFor(country, base, gender)}`.trim()
}

/**
 * The surname a child of this character is given.
 *
 * Every child took the CHARACTER's surname, so when the character was a woman
 * the children carried their mother's family name in countries where that was
 * never the practice: a Dalit woman in Uttar Pradesh married Rajesh Singh and
 * raised seven children called Das. Across nearly all of the roster, for
 * nearly all of the period, a child born inside a marriage took the father's
 * name. A woman without a partner still gives her own.
 */
export function childSurname(state) {
  // The base form: `character.surname` is already feminised in Slavic naming.
  const own = state?.character?.surnameBase ?? state?.character?.surname ?? ''
  if (state?.character?.gender !== 'female') return own
  const full = state?.partner?.name
  if (!full || !full.includes(' ')) return own
  return full.slice(full.indexOf(' ') + 1)
}
