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
  [/\bvoice note\b|\bselfie\b/, 'smartphone'],
  [/\bstreaming\b|\bnetflix\b/, 'streaming'],
  [/\bvideo call\b|\bvideo-call\b|\bzoom call\b|\bskype\b/, 'video_call'],
  [/\bbroadband\b|\bwi-?fi\b|\bthe internet\b|\bonline\b|\bwebsite\b|\bsearch engine\b/, 'home_internet'],
  [/\binternet caf|\bcyber ?caf/, 'personal_computer'],
  [/\bemail\b|\be-mail\b|\binbox\b/, 'email'],
  [/\bmobile phone\b|\bmobile money\b|\bm-pesa\b|\btext message\b|\bsends a text\b|\bsim card\b/, 'mobile_phone'],
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
const NEGATED = /\b(no|not|never|without|before|until|had not|hasn't|doesn't|there is no|nobody has|none of|lacks|absence of|would not|didn't|did not)\b/

/**
 * @param {object} entry   a log entry: { text, year, age, isMundane, isTexture }
 * @param {object} country the country the character was living in that year
 * @returns {null | {phrase, tech, arrived, year, text}}
 */
export function checkLine(text, year, country, opts = {}) {
  if (typeof text !== 'string' || !text) return null
  const lower = text.toLowerCase()
  if (!opts.strict && NEGATED.test(lower)) return null
  for (const [re, tech] of TECH_PHRASES) {
    if (!re.test(lower)) continue
    const arrived = techYear(country, tech)
    // A grace margin, because a wealthy household in a capital city really is
    // early and the arrival table is a median, not a floor. Anything inside the
    // margin is not worth a reviewer's time; anything outside it is a mistake
    // about the century.
    const margin = 15
    if (year < arrived - margin) {
      return { phrase: re.source, tech, arrived, year, text }
    }
    return null   // first match wins; the most specific phrases are listed first
  }
  return null
}

/** Minimum plausible age for a line that describes doing the thing yourself. */
export const AGE_FLOORS = [
  [/\bemail\b|\binbox\b|\bthe office\b|\byour salary\b|\bthe commute\b|\byour colleagues\b/, 16],
  [/\bsmartphone\b|\bwhatsapp\b|\bthe app\b|\bmobile phone\b/, 10],
  [/\bthe newspaper is folded\b|\bthe mortgage\b|\byour employer\b/, 18],
]

export function checkAge(text, age) {
  if (typeof text !== 'string' || !text) return null
  const lower = text.toLowerCase()
  for (const [re, floor] of AGE_FLOORS) {
    if (re.test(lower) && age < floor) return { phrase: re.source, floor, age, text }
  }
  return null
}
