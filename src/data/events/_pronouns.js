// _pronouns.js — "Kudirat is finding their shape."
//
// The children, partners, siblings and parents in a life all carry a gender in
// the state, and about a hundred text functions referred to them as "they"
// anyway, because the prose was written once for every child. A mother of a
// named daughter does not think of her as "them". `gendered(text, person)`
// renders a passage whose every they/them/their refers to ONE person in that
// person's pronouns, fixing the verb agreement the plural forced.
//
// Only wrap a passage after reading it: a "they" that means the doctors, or
// the neighbours, would be turned into the child. Where a passage mixes
// referents, write the pronouns by hand instead.

// Verbs that appear after "they" in the passages this is used on. Plural form →
// singular third person.
const VERBS = {
  are: 'is', were: 'was', have: 'has', do: 'does', go: 'goes', say: 'says',
  tell: 'tells', call: 'calls', need: 'needs', want: 'wants', write: 'writes',
  leave: 'leaves', look: 'looks', come: 'comes', know: 'knows', mention: 'mentions',
  describe: 'describes', ask: 'asks', sleep: 'sleeps', seem: 'seems', talk: 'talks',
  watch: 'watches', think: 'thinks', take: 'takes', make: 'makes', get: 'gets',
  eat: 'eats', live: 'lives', work: 'works', love: 'loves', like: 'likes', send: 'sends',
  manage: 'manages', mean: 'means', choose: 'chooses', decide: 'decides', keep: 'keeps',
  hold: 'holds', stand: 'stands', sit: 'sits', laugh: 'laughs', cry: 'cries', try: 'tries',
  carry: 'carries', remember: 'remembers', forget: 'forgets', notice: 'notices',
  read: 'reads', play: 'plays', run: 'runs', walk: 'walks', speak: 'speaks', hear: 'hears',
  see: 'sees', find: 'finds', give: 'gives', put: 'puts', move: 'moves', stay: 'stays',
  return: 'returns', visit: 'visits', answer: 'answers', listen: 'listens', wait: 'waits',
  explain: 'explains', start: 'starts', stop: 'stops', turn: 'turns', open: 'opens',
  close: 'closes', earn: 'earns', build: 'builds', grow: 'grows', change: 'changes',
  phone: 'phones', text: 'texts', check: 'checks', mind: 'minds', hate: 'hates',
  wear: 'wears', bring: 'brings', show: 'shows', use: 'uses', learn: 'learns',
  struggle: 'struggles', worry: 'worries', hope: 'hopes', die: 'dies', wake: 'wakes',
  arrive: 'arrives', recognise: 'recognises', recognize: 'recognizes', fall: 'falls',
  feel: 'feels', become: 'becomes', pause: 'pauses', smile: 'smiles', nod: 'nods',
  touch: 'touches', reach: 'reaches', finish: 'finishes', belong: 'belongs', owe: 'owes',
  happen: 'happens', insist: 'insists', refuse: 'refuses', agree: 'agrees', hum: 'hums',
}

const pronounsFor = (gender) => gender === 'female'
  ? { they: 'she', them: 'her', their: 'her', theirs: 'hers', themselves: 'herself' }
  : { they: 'he', them: 'him', their: 'his', theirs: 'his', themselves: 'himself' }

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const keepCase = (src, out) => (src[0] === src[0].toUpperCase() ? cap(out) : out)

/**
 * `text` with every they/them/their/theirs/themselves rendered for `person`
 * (anything with a `gender` of 'male' or 'female'). Unknown gender: unchanged.
 */
export function gendered(text, person) {
  const g = person?.gender
  if (g !== 'male' && g !== 'female' || typeof text !== 'string') return text
  const P = pronounsFor(g)
  let out = text
  // they're / they've / they'd / they'll
  out = out.replace(/\b(they|They)('|’)(re|ve|d|ll)\b/g, (m, t, q, c) => {
    const sub = keepCase(t, P.they)
    return c === 're' ? `${sub}${q}s` : c === 've' ? `${sub}${q}s` : `${sub}${q}${c}`
  })
  out = out.replace(/\b(they|They)(\s+)(don|aren|weren|haven)('|’)t\b/g, (m, t, sp, v, q) => {
    const sub = keepCase(t, P.they)
    return `${sub}${sp}${{ don: 'doesn', aren: 'isn', weren: 'wasn', haven: 'hasn' }[v]}${q}t`
  })
  // they + verb (optionally after an adverb: "they always say")
  out = out.replace(/\b(they|They)(\s+)((?:always|never|also|still|often|only|just|both|already|usually|sometimes|probably|really|simply|even|rarely|clearly|quietly|barely)\s+)?([a-z]+)\b/g,
    (m, t, sp, adv = '', verb) => {
      const sub = keepCase(t, P.they)
      const v = VERBS[verb]
      return `${sub}${sp}${adv}${v ?? verb}`
    })
  out = out.replace(/\b(themselves|Themselves)\b/g, (m) => keepCase(m, P.themselves))
  out = out.replace(/\b(theirs|Theirs)\b/g, (m) => keepCase(m, P.theirs))
  out = out.replace(/\b(their|Their)\b/g, (m) => keepCase(m, P.their))
  out = out.replace(/\b(them|Them)\b/g, (m) => keepCase(m, P.them))
  return out
}
