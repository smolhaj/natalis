/**
 * scripts/lib/anachronism.js
 *
 * Runs whole lives and reads every line of prose that reached the log, looking
 * for a sentence that names a thing the character could not have been standing
 * next to.
 *
 * This is deliberately a RUNNING audit rather than a static one, for the same
 * reason the firing-rate report is. Every offending line found in the first
 * pass had a syntactically valid guard and was reachable; they were wrong about
 * the world, not about JavaScript:
 *
 *   "You take dozens. The dozens accumulate."   — phone photographs, in 1960
 *   "The email inbox has tripled in a year."    — to a three-year-old
 *   "The television has arrived in the living room."
 *                                               — Iceland, 1944, twenty-two
 *                                                 years before Icelandic
 *                                                 broadcasting existed
 *   "The microwave is in some kitchens."        — Kuwait, 1970
 *   "the internet that works"                   — an aid compound, 1973
 *
 * The phrase table below is the vocabulary that gives a date away. It is not
 * exhaustive and is not meant to be: it is the set of words whose presence in
 * a sentence pins that sentence to a decade.
 */

import { techYear } from '../../src/data/technology.js'

// phrase → the technology key whose arrival year it implies. Matching is on the
// lowercased line, so each entry should be a phrase that cannot appear
// innocently ("radio" alone would match "radiology"; "the radio" is safe).
export const TECH_PHRASES = [
  [/\bsmartphone\b/, 'smartphone'],
  [/\bwhatsapp\b/, 'smartphone'],
  [/\binstagram\b|\bfacebook\b|\btiktok\b|\btwitter\b/, 'smartphone'],
  [/\bthe app\b|\ban app\b|\bthe algorithm\b/, 'smartphone'],
  // A phone somebody looks at, scrolls, or carries in a pocket. The table
  // named the brands and the word `smartphone` and missed the phrasing the
  // prose actually uses, so a glimpse of a man "looking at a photograph on
  // his phone for the past four stops" printed into 1958 rural Bavaria.
  // Possessive only. "on a phone with a queue behind you" is a public call
  // office and "the phone" is the instrument in the hall; both are ordinary
  // in 1960 and neither is a pocket screen. Including them made this cry
  // wolf on an OFW ringing home from Mexico in 1984.
  // And the bare verb `scroll(s|ing|ed)` was too loose in the other direction:
  // a Japanese household in 1947 trades the kimono, then the other kimono,
  // then THE SCROLLS, which are kakemono. A scroll is a noun older than paper
  // mills. The verb needs its particle.
  [/\b(?:on|at|to) (?:his|her|their|your) phone\b|\bchecking (?:his|her|their|your) phone\b|\bscroll(?:s|ing|ed)?\s+(?:through|past|down|up|back)\b|\bscrolling\b/, 'mobile_phone'],
  [/\bvoice note\b|\bselfie\b/, 'smartphone'],
  [/\bstreaming\b|\bnetflix\b/, 'streaming'],
  [/\bvideo call\b|\bvideo-call\b|\bzoom call\b|\bskype\b/, 'video_call'],
  // Ahead of home_internet, because the café is the thing you go to when the
  // house has no connection, and `\bthe internet\b` matched inside "the
  // internet café" — reporting an Asmara terminal in 2004 against Eritrea's
  // home-connection date of 2020. First match wins, so the narrower phrase
  // has to be listed first.
  [/\binternet caf|\bcyber ?caf/, 'personal_computer'],
  [/\bbroadband\b|\bwi-?fi\b|\bthe internet\b|\bonline\b|\bwebsite\b|\bsearch engine\b/, 'home_internet'],
  [/\bemail\b|\be-mail\b|\binbox\b/, 'email'],
  [/\bmobile phone\b|\bmobile money\b|\bm-pesa\b|\btext message\b|\bsends a text\b|\bsim card\b/, 'mobile_phone'],
  // The phone you carry. The table only knew "mobile phone" by name, and the
  // prose almost never says it: "goes through your phone" printed into 1976
  // Seoul, "somebody's phone is at forty percent" into a 1983 power cut in
  // Benue, and "the phone screen is lit" into 1989 São Paulo. A possessive
  // phone is a handset; "the phone" and "on the phone" are left alone,
  // because the hallway telephone is the right sentence for most of the century.
  [/\bwechat\b|\bgroup chat\b|\bphone screen\b|\bphone is at \w+ percent\b|\bphone to pay\b/, 'smartphone'],
  [/\b(?:your|my|his|her|their|someone's|somebody's|everyone's) phone\b(?! (?:number|call|line|book|bill|rings|box))/, 'mobile_phone'],
  [/\bpersonal computer\b|\blaptop\b|\bthe computer\b/, 'personal_computer'],
  [/\bmicrowave\b/, 'microwave'],
  [/\bthe vcr\b|\bvideotape\b|\bthe dvd\b/, 'vcr'],
  [/\bcassette\b|\bwalkman\b|\bthe cd player\b/, 'cassette'],
  [/\bcolour television\b|\bcolor television\b|\bcolour tv\b/, 'colour_television'],
  [/\bthe television\b|\bthe telly\b|\bthe tv\b|\btelevision (?:has|is|arrived|schedule|set)\b/, 'television'],
  [/\bwashing machine\b/, 'washing_machine'],
  [/\bthe refrigerator\b|\bthe fridge\b|\bthe freezer\b/, 'refrigerator'],
  [/\bthe telephone\b|\bthe landline\b/, 'landline'],
  [/\bthe radio\b|\bwireless set\b/, 'radio'],
  [/\bthe cinema\b/, 'cinema'],
  [/\bthe newspaper\b/, 'newspaper'],
]

// Some lines legitimately name a thing the character does NOT have — an
// emigrant describing what home lacks, a memory, a refusal. Skip those rather
// than report them, because the alternative is an audit nobody can get to zero.
//
// But the negation has to govern the PHRASE, not merely appear somewhere in the
// sentence. Tested against the whole line this exempted
//
//     Mobile money has made it possible to send and receive money without a
//     bank account.
//
// which asserts mobile money and negates the bank, and which was printing into
// 1990 Nigeria, seventeen years before M-Pesa. Any sentence that mentions what
// something replaced was invisible to this audit, which is most of the
// sentences worth auditing.
const HANDHELD = new Set(['mobile_phone', 'smartphone'])

const NEGATED = /\b(no|not|never|without|before|until|had not|hasn't|doesn't|there is no|nobody has|none of|lacks|absence of|would not|didn't|did not)\b/

// A line may also name a thing that has not arrived YET, which is not an
// anachronism but the opposite — "When the refrigerator arrives, a white
// enamelled box, it will change what a week is" is exactly the sentence a 1921
// American childhood should contain. Scoped to the clause like the negation,
// so a future clause does not exempt a present-tense claim beside it.
const FUTURE = /\b(when|will|one day|eventually|years later|by the time|some day|someday|is coming|are coming)\b/

// Clause boundaries, so a negation in one clause does not exempt a claim in the
// next. Em dashes and semicolons separate two statements as reliably as a full
// stop does in this prose.
const CLAUSE = /[.;:—]|,\s+(?:and|but|though|while|which|who)\b|\s+(?:but|though|whereas)\s+/g

/** The clause `index` falls inside, so negation can be scoped to it. */
function clauseAround(lower, index) {
  let start = 0
  CLAUSE.lastIndex = 0
  let m
  while ((m = CLAUSE.exec(lower)) !== null) {
    if (m.index >= index) break
    start = m.index + m[0].length
  }
  const rest = lower.slice(index)
  CLAUSE.lastIndex = 0
  const endM = CLAUSE.exec(rest)
  const end = endM ? index + endM.index : lower.length
  return lower.slice(start, end)
}

/**
 * @param {object} entry   a log entry: { text, year, age, isMundane, isTexture }
 * @param {object} country the country the character was living in that year
 * @returns {null | {phrase, tech, arrived, year, text}}
 */
export function checkLine(text, year, country, opts = {}) {
  if (typeof text !== 'string' || !text) return null
  const lower = text.toLowerCase()
  for (const [re, tech] of TECH_PHRASES) {
    const m = lower.match(re)
    if (!m) continue
    // Scoped to the clause the phrase is actually in.
    if (!opts.strict) {
      const clause = clauseAround(lower, m.index)
      if (NEGATED.test(clause) || FUTURE.test(clause)) return null
    }
    const arrived = techYear(country, tech)
    // A grace margin, because a wealthy household in a capital city really is
    // early and the arrival table is a median, not a floor. Anything inside the
    // margin is not worth a reviewer's time; anything outside it is a mistake
    // about the century.
    // Not for the handheld. The table's mobile-phone year is already the
    // year the richest households had one, and fifteen years before it there
    // was no handset to be early with — "goes through your phone" in 1976
    // Seoul sat inside the margin and was never reported.
    const margin = HANDHELD.has(tech) ? 8 : 15
    if (year < arrived - margin) {
      return { phrase: re.source, tech, arrived, year, text }
    }
    return null   // first match wins; the most specific phrases are listed first
  }
  return null
}

/** Minimum plausible age for a line that describes doing the thing yourself. */
// The first three rows are objects. The rest are a REGISTER: prose that looks
// back over a life, or evaluates a social occasion, or reports a domestic
// responsibility, told to somebody who has not had one. A browser smoke test
// caught a one-year-old in 1955 Libya being told "The meal was ordinary and the
// company was good, or the company was ordinary and the meal was good" — from a
// bare `add()` in the mundane layer with no age guard at all.
export const AGE_FLOORS = [
  [/\bemail\b|\binbox\b|\bthe office\b|\byour salary\b|\bthe commute\b|\byour colleagues\b/, 16],
  [/\bsmartphone\b|\bwhatsapp\b|\bthe app\b|\bmobile phone\b/, 10],
  [/\bthe newspaper is folded\b|\bthe mortgage\b|\byour employer\b/, 18],
  // Looking back over a span nobody that age has had. Deliberately narrow: a
  // first pass included "the rent", "for decades" and "your marriage", and
  // those appear in prose ABOUT a child's household, about a historical event
  // they witnessed, and in the child-marriage arc, where they are correct.
  // The test is what the CHARACTER has, not what the sentence mentions.
  [/\bcumulatively\b|\bin retrospect\b|\byears of your life\b|\bwhen you were younger\b/, 22],
  // Your own tenancy, not your family's
  [/\byour landlord\b|\byour tenancy\b|\byour own kitchen\b|\byour own place\b|\bthe rent you pay\b/, 17],
  // An adult social occasion, evaluated afterwards
  [/\bthe company was (good|ordinary|dreadful)\b|\bdinner party\b|\bhangover\b|\bthe bar closes\b/, 16],
]

export function checkAge(text, age) {
  if (typeof text !== 'string' || !text) return null
  const lower = text.toLowerCase()
  for (const [re, floor] of AGE_FLOORS) {
    if (re.test(lower) && age < floor) return { phrase: re.source, floor, age, text }
  }
  return null
}
