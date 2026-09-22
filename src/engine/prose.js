// prose.js — the layer that stops a life repeating itself.
//
// Measured over 96 lives: 15.6% of all prose a player read was a sentence they
// had already read in the same life, and the worst case printed
// "Something is off. You are managing, which is not the same as being fine."
// fourteen times to one character. In a game whose stated mechanic is the
// sentence that lands, that is the loudest failure available — and it was
// invisible to every audit, because each of those fourteen printings was a
// guard correctly passing.
//
// Both prose layers now prefer a line the character has not heard. Not a hard
// ban: a repeat beats silence, and some lines (the grief fog, the year after a
// death) are *supposed* to recur because the feeling recurs. So the rule is
// preference, with a cooldown long enough that a recurrence reads as a motif
// rather than a bug.

/**
 * A short stable key for a prose line.
 *
 * Hashed rather than stored verbatim because this lives in `mem`, which is
 * serialised into every save: 250 whole sentences would be a ~30KB save file
 * for a feature nobody can see.
 */
export function lineKey(text) {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(36)
}

// Long enough that a repeat reads as deliberate. A life prints on the order of
// one prose line a year, so this is most of a lifetime.
const SAID_MEMORY = 220

/** Has this character already been told this, recently? */
export function hasSaid(state, text) {
  const said = state?.mem?.saidLines
  return Array.isArray(said) && said.includes(lineKey(text))
}

/**
 * The candidates this character has not heard yet, or all of them if that
 * leaves nothing. Candidates may be a single line or a pool of variants, so the
 * filter descends into pools and drops only the exhausted ones.
 */
export function preferUnsaid(state, candidates) {
  const said = state?.mem?.saidLines
  if (!Array.isArray(said) || said.length === 0) return candidates
  const seen = new Set(said)
  const fresh = []
  for (const c of candidates) {
    if (Array.isArray(c)) {
      const unheard = c.filter(line => !seen.has(lineKey(line)))
      if (unheard.length > 0) fresh.push(unheard)
    } else if (!seen.has(lineKey(c))) {
      fresh.push(c)
    }
  }
  return fresh.length > 0 ? fresh : candidates
}

/** The new `mem` after telling the character this line. */
export function rememberSaid(mem, text) {
  if (typeof text !== 'string' || text.length === 0) return mem
  const prev = Array.isArray(mem?.saidLines) ? mem.saidLines : []
  const key = lineKey(text)
  const next = prev[prev.length - 1] === key ? prev : [...prev, key]
  return { ...mem, saidLines: next.length > SAID_MEMORY ? next.slice(-SAID_MEMORY) : next }
}
