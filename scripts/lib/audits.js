/**
 * scripts/lib/audits.js
 *
 * Reachability audits. Every one of these exists because a specific, verified
 * defect got all the way through review, the flag auditor and the test suite:
 *
 *   1  reverseFlags        a guard requiring a flag nothing ever sets
 *   2  enumDomain          a string compared against an enum it is not in
 *                          (including `G.currentCountry === 'Ethiopia'`, which
 *                          is always false — currentCountry is an object)
 *   3  unknownGProps       a guard reading a property G does not have
 *   4  phaseReachability   a phase whose age band its own guard cannot reach
 *   5  yearWindow          a year window that closes before anyone is old enough
 *   6  worldEventScope     archetypes[] excluding the countries[] beside it
 *
 * Findings are objects: { level, code, where, id, message }.
 *   level 'error' — the content is unreachable or the comparison is always false
 *   level 'warn'  — reachable, but narrower or stranger than it looks authored
 */

import {
  loadCorpus, vocab, gPropertyNames, sourceFiles, locate,
  fnSource, stripComments, guardParam,
} from './corpus.js'

const ERR = 'error'
const WARN = 'warn'

function finding(level, code, id, where, message) {
  return { level, code, id, where, message }
}

// ── Shared source-reading helpers ─────────────────────────────────────────────

const OPS = '>=|<=|===|!==|==|!=|>|<'
// A string literal, escapes included: 'Côte d\'Ivoire' must read as one value,
// not as two broken fragments.
const STR = `'(?:\\\\.|[^'\\\\])*'|"(?:\\\\.|[^"\\\\])*"`
const unquote = raw => raw.slice(1, -1).replace(/\\(['"\\])/g, '$1')

/** Every string literal compared against `prop`, with the operator used. */
function literalsComparedTo(src, propPattern) {
  const out = []
  const p = propPattern
  for (const m of src.matchAll(new RegExp(`${p}\\s*(${OPS})\\s*(${STR})`, 'g'))) {
    out.push({ op: m[1], value: unquote(m[2]) })
  }
  for (const m of src.matchAll(new RegExp(`(${STR})\\s*(${OPS})\\s*${p}`, 'g'))) {
    out.push({ op: m[2], value: unquote(m[1]) })
  }
  // [ 'a', 'b' ].includes(prop)  /  ['a','b'].indexOf(prop)
  for (const m of src.matchAll(new RegExp(`\\[([^\\][]*)\\]\\s*\\.\\s*(?:includes|indexOf)\\(\\s*${p}`, 'g'))) {
    for (const lit of m[1].matchAll(new RegExp(STR, 'g'))) out.push({ op: '===', value: unquote(lit[0]) })
  }
  return out
}

const negativeOp = op => op === '!==' || op === '!='

/**
 * The age (or year, or any numeric) bounds a guard actually enforces.
 *
 * Two authoring styles are in the corpus and both must be read, because they
 * mean opposite things with the same operator:
 *     when: (G) => G.age >= 55 && ...          → requires age >= 55
 *     when: (G) => { if (G.age < 55) return false; ... } → ALSO requires >= 55
 * Reading the second one literally is how a naive scan invents bounds that are
 * not there. Anything it cannot read confidently is left unbounded and never
 * reported: a false "this is dead" costs more than a missed one.
 */
export function numericBounds(rawSrc, propName) {
  const src = stripComments(rawSrc)
  // Scope the read to the guard's OWN argument. `G.children.some(c => c.age <= 14)`
  // is a fact about a child, not about the character, and reading it as an age
  // bound invents dead events that are perfectly alive.
  const { name, destructured } = guardParam(rawSrc)
  if (!name || (destructured && !destructured.includes(propName))) {
    return { lo: -Infinity, hi: Infinity, sawLo: false, sawHi: false, confident: false }
  }
  const propPattern = `\\b${name}\\s*\\??\\s*\\.\\s*${propName}\\b`
  let lo = -Infinity, hi = Infinity, sawLo = false, sawHi = false, confident = true

  const apply = (op, n, inverted) => {
    let o = op
    if (inverted) {
      o = { '>=': '<', '>': '<=', '<=': '>', '<': '>=', '===': null, '==': null, '!==': '===', '!=': '===' }[op]
      if (!o) return
    }
    if (o === '>=') { if (n > lo) { lo = n; sawLo = true } }
    else if (o === '>') { if (n + 1 > lo) { lo = n + 1; sawLo = true } }
    else if (o === '<=') { if (n < hi) { hi = n; sawHi = true } }
    else if (o === '<') { if (n - 1 < hi) { hi = n - 1; sawHi = true } }
    else if (o === '===' || o === '==') { lo = Math.max(lo, n); hi = Math.min(hi, n); sawLo = sawHi = true }
  }

  const scan = (text, inverted) => {
    for (const m of text.matchAll(new RegExp(`${propPattern}\\s*(${OPS})\\s*(\\d{1,4})\\b`, 'g'))) {
      apply(m[1], Number(m[2]), inverted)
    }
    // reversed operands: `55 <= G.age`
    const flip = { '>=': '<=', '<=': '>=', '>': '<', '<': '>', '===': '===', '==': '==', '!==': '!==', '!=': '!=' }
    for (const m of text.matchAll(new RegExp(`(\\d{1,4})\\s*(${OPS})\\s*${propPattern}`, 'g'))) {
      apply(flip[m[2]], Number(m[1]), inverted)
    }
  }

  // Early-exit guards: `if (<cond>) return false` requires NOT cond.
  let rest = src
  for (const m of src.matchAll(/if\s*\(([^{;]*?)\)\s*\{?\s*return\s+false/g)) {
    rest = rest.replace(m[0], ' ')
    const cond = m[1]
    // !(A && B) gives no single bound; !(A || B) requires both negations.
    if (/&&/.test(cond)) continue
    scan(cond, true)
  }
  // What is left is only trustworthy as an AND-chain.
  if (/\|\|/.test(rest)) confident = false
  else scan(rest, false)

  return { lo, hi, sawLo, sawHi, confident }
}

/** Country names a guard positively requires, and every name it mentions. */
export function countriesInGuard(src) {
  const required = new Set()
  const mentioned = new Set()
  const NAME = `(?:currentCountry|\\.country)\\s*\\??\\s*\\.\\s*name`
  for (const m of src.matchAll(new RegExp(`${NAME}\\s*(${OPS})\\s*(${STR})`, 'g'))) {
    const v = unquote(m[2]); mentioned.add(v); if (!negativeOp(m[1])) required.add(v)
  }
  for (const m of src.matchAll(new RegExp(`(${STR})\\s*(${OPS})\\s*${NAME}`, 'g'))) {
    const v = unquote(m[1]); mentioned.add(v); if (!negativeOp(m[2])) required.add(v)
  }
  for (const m of src.matchAll(new RegExp(`\\[([^\\][]*)\\]\\s*\\.\\s*includes\\(\\s*[^)]*?${NAME}`, 'g'))) {
    for (const lit of m[1].matchAll(new RegExp(STR, 'g'))) { const v = unquote(lit[0]); mentioned.add(v); required.add(v) }
  }
  return { required, mentioned }
}

// ── 1. Reverse flag audit ─────────────────────────────────────────────────────

/**
 * Reads a balanced bracket region starting at `open`, so a flag literal buried
 * inside `flags: [...new Set([...(next.flags ?? []), 'x'])]` is still found.
 * Regexes stop at the first inner `]`; the corpus is full of inner `]`.
 */
function balancedRegion(text, open) {
  const CLOSE = { '[': ']', '(': ')', '{': '}' }
  const stack = [text[open]]
  for (let i = open + 1; i < text.length && i < open + 4000; i++) {
    const ch = text[i]
    if (ch === '[' || ch === '(' || ch === '{') stack.push(ch)
    else if (ch === ']' || ch === ')' || ch === '}') {
      if (CLOSE[stack[stack.length - 1]] !== ch) return text.slice(open, i + 1)
      stack.pop()
      if (stack.length === 0) return text.slice(open, i + 1)
    }
  }
  return text.slice(open, open + 4000)
}

/**
 * Every flag any mechanism in the codebase can actually set.
 *
 * Returns a lookup rather than a bare Map because some flags are composed at
 * runtime — `lost_parent_${which}`, `${illness.id}_diagnosed` — and a literal-
 * only scan reports the grief arc as unreachable when it is not. Templates
 * become patterns; a flag matching one counts as set.
 */
export function collectSetFlags() {
  const literal = new Map()   // flag → Set<file>
  const dynamic = []          // { pattern: RegExp, source, file }

  const add = (flag, rel) => {
    if (!flag) return
    if (!literal.has(flag)) literal.set(flag, new Set())
    literal.get(flag).add(rel)
  }
  const addTemplate = (raw, rel) => {
    const body = raw.slice(1, -1)
    if (!body.includes('${')) { add(body, rel); return }
    const pattern = new RegExp('^' + body
      .split(/\$\{[^}]*\}/)
      .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('[A-Za-z_0-9]+') + '$')
    dynamic.push({ pattern, source: body, file: rel })
  }
  const harvest = (block, rel) => {
    for (const m of block.matchAll(/'([A-Za-z_0-9]+)'|"([A-Za-z_0-9]+)"/g)) add(m[1] ?? m[2], rel)
    for (const m of block.matchAll(/`[^`]*`/g)) addTemplate(m[0], rel)
  }

  for (const { rel, content } of sourceFiles()) {
    // p.addFlag('x') / p.addFlag(`x_${y}`)
    for (const m of content.matchAll(/addFlag\s*\(/g)) {
      harvest(balancedRegion(content, m.index + m[0].length - 1), rel)
    }
    // flags.push(...) — including the birth-time pushes in character.js
    for (const m of content.matchAll(/flags\s*\.\s*push\s*\(/g)) {
      const block = balancedRegion(content, m.index + m[0].length - 1)
      harvest(block, rel)
      // flags.push(GIFT_TYPES[i]) — the literals live in a const array above,
      // which is exactly how the five born_gifted_* flags are set.
      // Only const-style names, so `flags.push(f)` cannot vacuum up an
      // unrelated local array and hide a genuinely unset flag.
      for (const ident of block.matchAll(/\b([A-Z][A-Z_0-9]{2,}|[A-Za-z_$][\w$]*(?:[Ff]lags?|TYPES))\b/g)) {
        const decl = content.match(new RegExp(`(?:const|let|var)\\s+${ident[1]}\\s*=\\s*\\[`))
        if (decl) harvest(balancedRegion(content, decl.index + decl[0].length - 1), rel)
      }
    }
    // flags: [ ... ]  /  flags = [ ... ]  /  addFlags: [...]  /  flagsAdded: [...]
    for (const m of content.matchAll(/(?:flags|addFlags|flagsAdded)\s*(?::|=)\s*\[/g)) {
      harvest(balancedRegion(content, m.index + m[0].length - 1), rel)
    }
    // choice.tag becomes a flag verbatim in resolveChoice()
    for (const m of content.matchAll(/\btag\s*:\s*['"]([A-Za-z_0-9]+)['"]/g)) add(m[1], rel)
    // Data-file fields the engine consumes as flags
    for (const m of content.matchAll(/\b(?:addFlag|flag|survivorFlag|addictionFlag|setsFlag|grantsFlag)\s*:\s*['"]([A-Za-z_0-9]+)['"]/g)) add(m[1], rel)
  }

  return {
    literal, dynamic,
    size: literal.size,
    has: (flag) => literal.has(flag) || dynamic.some(d => d.pattern.test(flag)),
    setBy: (flag) => literal.get(flag) ?? new Set(dynamic.filter(d => d.pattern.test(flag)).map(d => d.file)),
  }
}

/**
 * Flags a guard checks positively, and whether the guard actually DEPENDS on
 * each one.
 *
 * The distinction matters. `G.flags.has('camp_born')` sitting alone in an
 * AND-chain means the event dies if nothing sets that flag. The same call as
 * one arm of `(A || B)` means only that arm is dead — the event still fires.
 * Reporting both as "this can never fire" would be false, and an audit that
 * cries wolf gets ignored, which is how the corpus got here.
 *
 * Ambiguity resolves downward: any `||` anywhere in an enclosing scope demotes
 * the check to a dead branch rather than a dead event.
 */
export function flagChecksWithContext(src) {
  const out = []
  const re = /([!\s(&|]{0,3})(?:[A-Za-z_$][\w$]*\s*\??\s*\.\s*)*flags\s*\??\s*\.\s*(?:has|includes)\(\s*['"]([A-Za-z_0-9]+)['"]\s*\)/g
  for (const m of src.matchAll(re)) {
    if (/!\s*$/.test(m[1])) continue // !G.flags.has('x') — an absence, not a requirement
    out.push({ flag: m[2], required: !hasOrInScope(src, m.index) })
  }
  return out
}

/** Does any parenthesised scope enclosing `index` contain a `||`? */
function hasOrInScope(src, index) {
  if (/\|\|/.test(src)) {
    // Cheap pre-test: no `||` anywhere means every check is in an AND-chain.
    let depth = 0
    const opens = []
    for (let i = 0; i < src.length; i++) {
      if (src[i] === '(') opens.push(i)
      else if (src[i] === ')') {
        const start = opens.pop()
        if (start != null && start < index && i > index) {
          if (src.slice(start, i).includes('||')) return true
        }
      }
      if (i === index) depth = opens.length
    }
    return true // the guard body itself contains `||` somewhere — stay conservative
  }
  return false
}

/** Backwards-compatible: the flags a guard checks positively, context ignored. */
export function positiveFlagChecks(src) {
  return new Set(flagChecksWithContext(src).map(c => c.flag))
}

export async function auditReverseFlags() {
  const { allCharacterEvents, WORLD_EVENTS, RIBBONS } = await loadCorpus()
  const setFlags = collectSetFlags()
  const findings = []
  const usage = new Map() // flag → { hard: Set<id>, soft: Set<id> }

  const consider = (list, key) => {
    for (const e of list) {
      const src = stripComments(fnSource(e[key]))
      if (!src) continue
      for (const { flag, required } of flagChecksWithContext(src)) {
        if (!usage.has(flag)) usage.set(flag, { hard: new Set(), soft: new Set() })
        usage.get(flag)[required ? 'hard' : 'soft'].add(e.id)
      }
    }
  }
  consider(allCharacterEvents, 'when')
  consider(WORLD_EVENTS, 'when')
  consider(RIBBONS ?? [], 'condition')

  const list = (set) => {
    const ids = [...set]
    return ids.slice(0, 4).join(', ') + (ids.length > 4 ? `, … (+${ids.length - 4})` : '')
  }

  for (const [flag, { hard, soft }] of [...usage].sort()) {
    if (setFlags.has(flag)) continue
    if (hard.size) {
      findings.push(finding(ERR, 'flag-never-set', [...hard][0], locate([...hard][0]),
        `guard requires flag '${flag}' and nothing in the codebase sets it — ` +
        `${hard.size} guard${hard.size === 1 ? '' : 's'} can never pass: ${list(hard)}`))
    } else {
      findings.push(finding(WARN, 'flag-never-set-branch', [...soft][0], locate([...soft][0]),
        `flag '${flag}' is checked in ${soft.size} guard${soft.size === 1 ? '' : 's'} but nothing sets it — ` +
        `a dead branch of an OR, so the event still fires without it: ${list(soft)}`))
    }
  }
  return findings
}

// ── 2. Enum-domain audit ──────────────────────────────────────────────────────

export async function auditEnumDomains() {
  const { allCharacterEvents, WORLD_EVENTS, HEADLINES } = await loadCorpus()
  const V = await vocab()
  const findings = []

  const DOMAINS = [
    { prop: '(?:\\bG\\b\\s*\\.|\\.)\\s*ethnicity', name: 'ethnicity', allowed: V.ethnicIds, hint: 'ethnicGroups id in countries.js' },
    { prop: '(?:\\bG\\b\\s*\\.|\\.)\\s*religion', name: 'religion', allowed: V.religionKeys, hint: 'religionWeights key in countries.js' },
    { prop: '(?:\\bG\\b\\s*\\.|\\.)\\s*ruralUrban', name: 'ruralUrban', allowed: V.ruralUrban, hint: 'urban | suburban | rural' },
    { prop: '(?:\\bG\\b\\s*\\.|\\.)\\s*regime', name: 'regime', allowed: V.regimes, hint: 'regime in countries.js' },
    { prop: '(?:\\bG\\b\\s*\\.|\\.)\\s*archetype', name: 'archetype', allowed: V.archetypes, hint: 'country archetype' },
    { prop: '(?:\\bG\\b\\s*\\.|\\.)\\s*residencyStatus', name: 'residencyStatus', allowed: V.residency, hint: 'residencyStatus value' },
  ]

  const scanGuard = (e, kind) => {
    const src = stripComments(fnSource(e.when))
    if (!src) return
    const where = locate(e.id)

    // The comparison that is always false: currentCountry is an object.
    for (const m of src.matchAll(/(currentCountry|\.\s*country)\s*(===|!==|==|!=)\s*['"]([^'"]+)['"]/g)) {
      findings.push(finding(ERR, 'country-object-vs-string', e.id, where,
        `compares ${m[1].replace(/\s+/g, '')} directly to '${m[3]}' — that is always false; ` +
        `use ${m[1].includes('currentCountry') ? 'G.currentCountry?.name' : 'G.character.country.name'} === '${m[3]}'`))
    }

    for (const d of DOMAINS) {
      for (const { op, value } of literalsComparedTo(src, d.prop)) {
        if (value === '' || d.allowed.has(value)) continue
        findings.push(finding(negativeOp(op) ? WARN : ERR, `unknown-${d.name}`, e.id, where,
          `compares ${d.name} ${op} '${value}', which is not a known ${d.hint}` +
          (negativeOp(op) ? ' — the check is always true' : ' — the guard can never pass')))
      }
    }

    const { mentioned } = countriesInGuard(src)
    for (const name of mentioned) {
      if (!V.countryNames.has(name)) {
        findings.push(finding(ERR, 'unknown-country', e.id, where,
          `guard names country '${name}', which does not exist in countries.js`))
      }
    }
  }

  for (const e of allCharacterEvents) scanGuard(e, 'event')
  for (const we of WORLD_EVENTS) {
    scanGuard(we, 'world')
    for (const name of we.countries ?? []) {
      if (!V.countryNames.has(name)) {
        findings.push(finding(ERR, 'unknown-country', we.id, locate(we.id),
          `world event countries: [...] names '${name}', which does not exist in countries.js`))
      }
    }
    const arche = we.archetypes
    if (Array.isArray(arche)) {
      for (const a of arche) {
        if (!V.archetypes.has(a)) {
          findings.push(finding(ERR, 'unknown-archetype', we.id, locate(we.id),
            `world event archetypes: [...] names '${a}', which is not a country archetype`))
        }
      }
    }
  }
  for (const h of HEADLINES ?? []) {
    for (const name of h.countries ?? []) {
      if (!V.countryNames.has(name)) {
        findings.push(finding(ERR, 'unknown-country', h.id ?? h.text?.slice(0, 30), 'src/data/headlines.js',
          `headline countries: [...] names '${name}', which does not exist in countries.js`))
      }
    }
  }
  return findings
}

// ── 3. Unknown-G-property audit ───────────────────────────────────────────────

export async function auditUnknownGProps() {
  const { allCharacterEvents, WORLD_EVENTS } = await loadCorpus()
  const keys = await gPropertyNames()
  const findings = []

  const scan = (e) => {
    const raw = fnSource(e.when)
    if (!raw) return
    const src = stripComments(raw)
    const { name, destructured } = guardParam(raw)
    const where = locate(e.id)

    if (destructured) {
      for (const d of destructured) {
        if (!keys.has(d)) {
          findings.push(finding(ERR, 'unknown-g-prop', e.id, where,
            `guard destructures '${d}' from G, which G does not provide`))
        }
      }
      return
    }
    if (!name) return
    const seen = new Set()
    for (const m of src.matchAll(new RegExp(`\\b${name}\\s*\\??\\s*\\.\\s*([A-Za-z_$][\\w$]*)`, 'g'))) {
      const prop = m[1]
      if (keys.has(prop) || seen.has(prop)) continue
      seen.add(prop)
      findings.push(finding(ERR, 'unknown-g-prop', e.id, where,
        `guard reads ${name}.${prop} — G has no such property, so the value is always undefined`))
    }
    // character.archetype is the same bug one level down: archetype lives on
    // character.country, and G exposes it directly as G.archetype.
    if (/character\s*\??\s*\.\s*archetype\b/.test(src)) {
      findings.push(finding(ERR, 'unknown-g-prop', e.id, where,
        `guard reads character.archetype — always undefined; archetype is G.archetype (or character.country.archetype)`))
    }
  }
  for (const e of allCharacterEvents) scan(e)
  for (const we of WORLD_EVENTS) scan(we)
  return findings
}

// ── 4. Phase / guard-age reachability ─────────────────────────────────────────

export async function auditPhaseReachability() {
  const { EVENTS, careerEvents } = await loadCorpus()
  const V = await vocab()
  const findings = []

  for (const e of [...EVENTS, ...careerEvents]) {
    const band = V.phases[e.phase]
    if (!band || typeof e.when !== 'function') continue
    const src = fnSource(e.when)
    const { lo, hi, sawLo, sawHi, confident } = numericBounds(src, 'age')
    if (!sawLo && !sawHi) continue
    const [plo, phi] = band
    const where = locate(e.id)

    if (hi < plo || lo > phi) {
      findings.push(finding(ERR, 'phase-unreachable', e.id, where,
        `phase '${e.phase}' covers ages ${plo}-${phi === 120 ? '120+' : phi} but the guard requires age ` +
        `${lo === -Infinity ? '≤' + hi : hi === Infinity ? '≥' + lo : lo + '-' + hi} — this event can never fire`))
      continue
    }
    if (!confident) continue
    const lostBelow = sawLo && lo < plo ? plo - lo : 0
    const lostAbove = sawHi && hi > phi ? hi - phi : 0
    if (lostBelow >= 5 || lostAbove >= 5) {
      const parts = []
      if (lostBelow >= 5) parts.push(`${lostBelow} years below (guard opens at ${lo}, phase at ${plo})`)
      if (lostAbove >= 5) parts.push(`${lostAbove} years above (guard runs to ${hi}, phase stops at ${phi})`)
      findings.push(finding(WARN, 'phase-truncates-guard', e.id, where,
        `phase '${e.phase}' silently cuts ${parts.join(' and ')} — set phase: null if the guard is self-sufficient`))
    }
  }
  return findings
}

// ── 5. Year-window reachability ───────────────────────────────────────────────

const OLDEST = 105

export async function auditYearWindows() {
  const { EVENTS, careerEvents, WORLD_EVENTS } = await loadCorpus()
  const V = await vocab()
  const findings = []

  const livedWindow = (countryName, minAge) => {
    const yr = V.yearRange.get(countryName)
    if (!yr) return null
    return [yr[0] + minAge, yr[1] + OLDEST]
  }

  for (const e of [...EVENTS, ...careerEvents]) {
    const src = fnSource(e.when)
    if (!src) continue
    const { required } = countriesInGuard(stripComments(src))
    if (required.size === 0) continue
    const yb = numericBounds(src, 'currentYear')
    if (!yb.confident || (!yb.sawLo && !yb.sawHi)) continue
    const ab = numericBounds(src, 'age')
    const phaseLo = V.phases[e.phase]?.[0] ?? 0
    const minAge = Math.max(ab.sawLo && ab.lo > -Infinity ? ab.lo : 0, phaseLo)

    const reachable = []
    const unreachable = []
    for (const name of required) {
      const w = livedWindow(name, minAge)
      if (!w) continue // unknown country — the enum audit reports that separately
      const overlap = yb.lo <= w[1] && yb.hi >= w[0]
      ;(overlap ? reachable : unreachable).push(`${name} [${w[0]}-${w[1]}]`)
    }
    if (reachable.length === 0 && unreachable.length > 0) {
      findings.push(finding(ERR, 'year-window-unreachable', e.id, locate(e.id),
        `guard needs year ${yb.lo === -Infinity ? '≤' + yb.hi : yb.hi === Infinity ? '≥' + yb.lo : yb.lo + '-' + yb.hi}` +
        ` at age ≥${minAge}, but no required country can supply anyone then: ${unreachable.join(', ')}`))
    }
  }

  for (const we of WORLD_EVENTS) {
    if (!Array.isArray(we.years) || !Array.isArray(we.countries) || we.countries.length === 0) continue
    const minAge = we.minAge ?? 0
    const reachable = []
    const unreachable = []
    for (const name of we.countries) {
      const w = livedWindow(name, minAge)
      if (!w) continue
      const overlap = we.years[0] <= w[1] && we.years[1] >= w[0]
      ;(overlap ? reachable : unreachable).push(`${name} [${w[0]}-${w[1]}]`)
    }
    if (reachable.length === 0 && unreachable.length > 0) {
      findings.push(finding(ERR, 'year-window-unreachable', we.id, locate(we.id),
        `world event years ${we.years[0]}-${we.years[1]} at minAge ${minAge} cannot reach any of its countries: ${unreachable.join(', ')}`))
    }
  }
  return findings
}

// ── 6. World-event scope ──────────────────────────────────────────────────────

export async function auditWorldEventScope() {
  const { WORLD_EVENTS, HEADLINES } = await loadCorpus()
  const V = await vocab()
  const findings = []

  for (const we of WORLD_EVENTS) {
    const where = locate(we.id)
    const arche = we.archetypes
    // The matcher requires BOTH filters to pass. A country listed in
    // countries[] whose archetype is absent from archetypes[] is therefore
    // excluded by the event's own scoping — silently.
    if (Array.isArray(arche) && Array.isArray(we.countries) && we.countries.length) {
      const excluded = we.countries.filter(name => {
        const a = V.archetypeOf.get(name)
        return a && !arche.includes(a)
      })
      if (excluded.length === we.countries.length) {
        findings.push(finding(ERR, 'world-scope-contradiction', we.id, where,
          `archetypes ${JSON.stringify(arche)} exclude every country it lists ` +
          `(${excluded.map(n => `${n}/${V.archetypeOf.get(n)}`).join(', ')}) — both filters must match, so it can never fire`))
      } else if (excluded.length) {
        findings.push(finding(WARN, 'world-scope-narrowed', we.id, where,
          `archetypes ${JSON.stringify(arche)} exclude ${excluded.map(n => `${n}/${V.archetypeOf.get(n)}`).join(', ')} ` +
          `from its own countries list — those countries never see this event`))
      }
    }
    if (we.minAge != null && we.maxAge != null && we.minAge > we.maxAge) {
      findings.push(finding(ERR, 'age-window-empty', we.id, where,
        `minAge ${we.minAge} > maxAge ${we.maxAge} — no age can satisfy both`))
    }
    if (Array.isArray(we.years) && we.years[0] > we.years[1]) {
      findings.push(finding(ERR, 'year-range-reversed', we.id, where,
        `years [${we.years[0]}, ${we.years[1]}] is reversed — the window is empty`))
    }
    if (Array.isArray(we.archetypes) && we.archetypes.length === 0) {
      findings.push(finding(ERR, 'world-scope-contradiction', we.id, where,
        `archetypes: [] matches nothing — use 'all' or name the archetypes`))
    }
  }

  // Headlines use the same both-must-match matcher.
  for (const h of HEADLINES ?? []) {
    if (!Array.isArray(h.archetypes) || !Array.isArray(h.countries) || !h.countries.length) continue
    const excluded = h.countries.filter(n => {
      const a = V.archetypeOf.get(n)
      return a && !h.archetypes.includes(a)
    })
    if (excluded.length === h.countries.length) {
      findings.push(finding(ERR, 'headline-scope-contradiction', h.id ?? h.text?.slice(0, 40), 'src/data/headlines.js',
        `headline archetypes ${JSON.stringify(h.archetypes)} exclude every country it lists (${excluded.join(', ')})`))
    }
  }
  return findings
}

// ── Runner ────────────────────────────────────────────────────────────────────

// ── 6. Identity-in-country cross audit ────────────────────────────────────────

/**
 * An ethnicity or religion literal must exist in the country the guard REQUIRES,
 * not merely somewhere in countries.js.
 *
 * The enum audit above checks each literal against the global set of ids, which
 * is the right question for a guard that names no country and the wrong one for
 * a guard that does. `dalit` is a real ethnicGroupsofIndia id, so
 *
 *     G.character.country.name === 'Nepal' && G.ethnicity === 'dalit'
 *
 * passes the global check and can still never fire, because Nepal's id for the
 * same population is `dalit_nepal`. Every guard of that shape is authored
 * content aimed at a person the generator cannot produce.
 */
export async function auditIdentityInCountry() {
  const { allCharacterEvents, WORLD_EVENTS } = await loadCorpus()
  const V = await vocab()
  const findings = []

  const CHECKS = [
    { prop: '(?:\\bG\\b\\s*\\.|\\.)\\s*ethnicity', name: 'ethnicity', by: V.ethnicByCountry, what: 'ethnicGroups' },
    { prop: '(?:\\bG\\b\\s*\\.|\\.)\\s*religion', name: 'religion', by: V.religionByCountry, what: 'religionWeights' },
  ]

  const scan = (e) => {
    const src = stripComments(fnSource(e.when))
    if (!src) return
    const required = [...countriesInGuard(src).required].filter(n => V.countryNames.has(n))
    if (required.length === 0) return
    const where = locate(e.id)

    for (const c of CHECKS) {
      const positives = literalsComparedTo(src, c.prop).filter(l => !negativeOp(l.op))
      if (positives.length === 0) continue
      // A guard may offer several alternatives; only flag when NONE is possible.
      const anyPossible = positives.some(l => required.some(n => c.by.get(n)?.has(l.value)))
      if (anyPossible) continue
      const values = [...new Set(positives.map(l => l.value))]
      const suggestions = []
      for (const n of required) {
        for (const id of c.by.get(n) ?? []) {
          if (values.some(v => id.includes(v) || v.includes(id))) suggestions.push(`${n}: '${id}'`)
        }
      }
      findings.push(finding(ERR, `${c.name}-not-in-country`, e.id, where,
        `guard requires ${required.map(n => `'${n}'`).join(' or ')} and ${c.name} ` +
        `${values.map(v => `'${v}'`).join(' or ')}, but no required country has that in its ${c.what}` +
        (suggestions.length ? ` — did you mean ${[...new Set(suggestions)].join(', ')}?` : '')))
    }
  }

  for (const e of allCharacterEvents) scan(e)
  for (const we of WORLD_EVENTS) scan(we)
  return findings
}

// ── 8. Season-in-country audit ────────────────────────────────────────────────

/**
 * A guard asking for a season the country cannot have.
 *
 * `deriveSeason` returns wet/dry for monsoon and tropical countries and the
 * four temperate seasons everywhere else, so `season === 'wet'` in a guard that
 * also requires a four-season country can never pass. This was not theoretical:
 * two lists of "which countries are monsoon countries" existed and disagreed,
 * and the one deriveSeason consulted omitted India, Pakistan, Sri Lanka, Nepal
 * and Malaysia — so the monsoon prose written for the subcontinent was
 * unreachable in the largest monsoon country on earth.
 */
export async function auditSeasonInCountry() {
  const { allCharacterEvents, WORLD_EVENTS } = await loadCorpus()
  const V = await vocab()
  const { seasonsFor } = await import('../../src/engine/character.js')
  const findings = []

  const scan = (e) => {
    const src = stripComments(fnSource(e.when))
    if (!src) return
    const required = [...countriesInGuard(src).required].filter(n => V.countryNames.has(n))
    if (required.length === 0) return
    const positives = literalsComparedTo(src, '(?:\\bG\\b\\s*\\.|\\.)\\s*season').filter(l => !negativeOp(l.op))
    if (positives.length === 0) return
    // A guard may offer alternatives, and a country list may be mixed-climate.
    // Only flag when NO required country can produce ANY demanded season.
    const want = [...new Set(positives.map(l => l.value))]
    const anyPossible = want.some(v => required.some(n => seasonsFor(n).includes(v)))
    if (!anyPossible) {
      const can = [...new Set(required.flatMap(n => seasonsFor(n)))]
      findings.push(finding(ERR, 'season-not-in-country', e.id, locate(e.id),
        `guard requires ${required.map(n => `'${n}'`).join(' or ')} and season ` +
        `${want.map(v => `'${v}'`).join(' or ')}, but those countries only have ${can.join('/')}`))
      return
    }
    // The interesting case is PARTIAL: a guard naming twelve countries where
    // four of them can never satisfy it fires happily for the other eight, so
    // nothing looks broken and a slice of the intended audience silently never
    // sees the event. That is how the subcontinent lost its monsoon.
    if (required.length < 2) return
    const excluded = required.filter(n => !want.some(v => seasonsFor(n).includes(v)))
    if (excluded.length === 0) return
    findings.push(finding(WARN, 'season-excludes-some-countries', e.id, locate(e.id),
      `guard asks for season ${want.map(v => `'${v}'`).join(' or ')} and lists ` +
      `${required.length} countries, but ${excluded.length} of them can never have it: ` +
      `${excluded.map(n => `${n} (${seasonsFor(n).join('/')})`).join(', ')}`))
  }

  for (const e of allCharacterEvents) scan(e)
  for (const we of WORLD_EVENTS) scan(we)
  return findings
}

/**
 * A choice that does nothing back.
 *
 * `outcome` is the sentence the player reads after pressing the button — the
 * entire feedback of the choice system, in a game whose stated mechanic is the
 * sentence that lands. Fifty-one choices in one file carried `outcome: null`
 * with a live `effect`, so the player chose "Navigate carefully — know the
 * rules and survive" and the game printed nothing at all. Nothing static could
 * see it: the event is reachable, the guard is correct, the effect applies.
 */
export async function auditSilentChoices() {
  const { allCharacterEvents } = await loadCorpus()
  const findings = []
  for (const e of allCharacterEvents) {
    if (!Array.isArray(e.choices)) continue
    for (const [i, c] of e.choices.entries()) {
      if (!c) continue
      const hasEffect = typeof c.effect === 'function' || typeof c.inject === 'string'
      const hasOutcome = typeof c.outcome === 'string' ? c.outcome.trim().length > 0 : typeof c.outcome === 'function'
      if (hasEffect && !hasOutcome) {
        findings.push(finding(ERR, 'silent-choice', e.id, locate(e.id),
          `choice ${i + 1} ("${String(c.text ?? '').slice(0, 48)}") applies an effect and prints no outcome`))
      }
    }
  }
  return findings
}

/**
 * Prose that narrates a move the effect never makes.
 *
 * `ya_city_arrival` told a young adult they had left the village for the city
 * and left them in the village; four emigration events set the `emigrated`
 * flag and changed no country, so the engine went on paying a Venezuelan
 * salary while every diaspora line in the game addressed a person in Madrid.
 * A guard answers "may this fire", never "is this true afterwards".
 */
export async function auditNarratedMoves() {
  const { allCharacterEvents } = await loadCorpus()
  const findings = []
  // A destination, not a direction: "you move to help" and "you move to the
  // things that don't require it" are not migrations. Requires a place — a
  // proper noun, or one of the handful of common nouns that name one.
  // Case-SENSITIVE on purpose: `[A-Z]` is how the pattern tells a destination
  // from a direction, so the subject has to spell both cases itself rather
  // than lean on an /i flag that would also make [A-Z] meaningless.
  const MOVES = new RegExp(
    String.raw`\b[Yy]ou\s+(?:move|relocate)\s+to\s+(?:[A-Z]|the (?:city|capital|coast|mainland|north|south|interior)\b)`
    + String.raw`|\b[Tt]he family\s+(?:moves|relocates|leaves for|emigrates)\s*(?:to\s+)?(?:[A-Z]|the (?:city|capital|coast)\b)`
    + String.raw`|\b[Yy]ou emigrate\b|\b[Yy]ou leave the country\b|[Aa]rrange the exit`
    + String.raw`|\b[Yy]ou board the (?:boat|ship|plane) for\b`,
  )
  const bodies = (e) => {
    const out = []
    const push = (v) => { if (typeof v === 'string') out.push(v) }
    push(e.text)
    for (const c of e.choices ?? []) { push(c?.text); push(c?.outcome) }
    return out.join(' \n ')
  }
  const effectSrc = (e) => {
    const parts = [e.effect, ...(e.choices ?? []).map(c => c?.effect)]
    return parts.filter(f => typeof f === 'function').map(f => f.toString()).join(' ')
  }
  for (const e of allCharacterEvents) {
    const prose = bodies(e)
    if (!MOVES.test(prose)) continue
    const src = effectSrc(e)
    if (/relocate\s*\(|emigrateTo\s*\(|setResidency\s*\(/.test(src)) continue
    findings.push(finding(WARN, 'narrated-move', e.id, locate(e.id),
      'prose narrates leaving and no effect calls relocate() or emigrateTo()'))
  }
  return findings
}

/**
 * A population the roster models and the corpus has never addressed.
 *
 * `wealthy_gulf` was the worst-covered archetype in the roster, and the reason
 * was not the citizens: the UAE is 59% South Asian in the data, Qatar 60%,
 * Kuwait 40%, every migrant group flagged `disadvantaged` — and across eleven
 * Gulf ethnic ids the corpus contained ONE reference. The engine drew those
 * characters correctly and had nothing to say to them.
 *
 * Nothing else here can see that. `check-flags` audits flags, `check-events`
 * audits guards, `npm run sim` audits what fires — and a group nothing was ever
 * written for fires nothing, which is indistinguishable from a group that is
 * simply rare. So walk the roster's own `ethnicGroups` and report the ids that
 * no guard, in the whole corpus, has ever named.
 *
 * A warning rather than an error: 154 countries is a lot of groups and nobody
 * is obliged to write every one. The number it reports is the shape of the
 * next content decision, and a group with a large `share` is the one to look
 * at first.
 */
export async function auditUnwrittenGroups() {
  const { COUNTRIES } = await import('../../src/data/countries.js')

  // Read the SOURCE, not the function bodies. A module that lifts its ids into
  // a shared constant — `const MIGRANT_IDS = new Set([...])`, which is the
  // natural way to write a guard that covers eight of them — has those ids
  // nowhere in `when.toString()`, and a body-only scan reported a module of
  // thirty events about those exact groups as still unwritten. That is the
  // wrong direction for this audit to be wrong in: it would tell you the gap
  // is still there after somebody has closed it.
  //
  // And exclude the files that merely DECLARE the ids. `countries.js` defines
  // every one of them and `identity.js` gives their religion distribution, so
  // scanning those makes every id trivially "named" and the audit reports zero
  // forever — the same shape as the negation exemption that made
  // check-anachronisms blind to the sentences worth auditing. Scan the files
  // that would USE an id.
  const DECLARES = /src[/\\]data[/\\](countries|identity)\.js$/
  let corpus = ''
  for (const { rel, content } of sourceFiles()) {
    if (DECLARES.test(rel)) continue
    corpus += content
  }

  // Naming the id is not the only way to write for a group. An event guarded on
  // `country === 'Greece'` addresses the 94% of Greeks who are Greek perfectly
  // well, and reporting that as a gap produced 328 warnings and no signal.
  //
  // The case worth reporting is the one the Gulf turned out to be: a group
  // whose experience of its own country is NOT the country-generic one, which
  // is exactly what `disadvantaged` marks — or a large minority inside a
  // country that is plainly not one people. Those are the characters for whom
  // the country's own content is about somebody else.
  const nameCount = new Map()
  for (const c of COUNTRIES) {
    const cited = (corpus.match(new RegExp(`['"]${c.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g')) ?? []).length
    nameCount.set(c.name, cited)
  }

  const findings = []
  for (const c of COUNTRIES) {
    // A country nobody has written for at all is a different finding, and the
    // roster owner already knows which those are.
    if ((nameCount.get(c.name) ?? 0) < 5) continue
    for (const g of c.ethnicGroups ?? []) {
      if (!g?.id) continue
      if (corpus.includes(`'${g.id}'`) || corpus.includes(`"${g.id}"`)) continue
      const share = g.share ?? 0
      const majority = share >= 0.5
      // The two shapes that matter, and nothing else.
      const distinct = g.disadvantaged === true
      const largeMinority = !majority && share >= 0.2
      if (!distinct && !largeMinority) continue
      if (share < 0.1) continue
      findings.push(finding(WARN, 'unwritten-group', `${c.name}:${g.id}`, null,
        `${Math.round(share * 100)}% of ${c.name} (${g.name ?? g.id})` +
        `${g.disadvantaged ? ', flagged disadvantaged' : ''} — the country has content and ` +
        'no guard or line in it names this group'))
    }
  }
  findings.sort((a, b) => (parseInt(b.message) || 0) - (parseInt(a.message) || 0))
  return findings
}

export const AUDITS = [
  ['reverse-flags', 'flags a guard requires that nothing sets', auditReverseFlags],
  ['enum-domains', 'string literals compared against an enum they are not in', auditEnumDomains],
  ['g-properties', 'guards reading properties G does not provide', auditUnknownGProps],
  ['phase-reach', 'phases whose age band the guard cannot reach', auditPhaseReachability],
  ['year-windows', 'year windows no living character can be inside', auditYearWindows],
  ['world-scope', 'world events scoped out of their own countries', auditWorldEventScope],
  ['identity-country', 'identity literals absent from the country the guard requires', auditIdentityInCountry],
  ['season-country', 'seasons a guard demands that its country cannot have', auditSeasonInCountry],
  ['silent-choice', 'choices that apply an effect and print no outcome', auditSilentChoices],
  ['narrated-move', 'prose that narrates leaving where no effect moves anyone', auditNarratedMoves],
  ['unwritten-group', 'populations the roster models that no guard has ever named', auditUnwrittenGroups],
]

export async function runAllAudits(only = null) {
  const results = []
  for (const [name, description, fn] of AUDITS) {
    if (only && !only.includes(name)) continue
    results.push({ name, description, findings: await fn() })
  }
  return results
}
