// _phaseLines.js — the lines every life reads at the same ages.
//
// A reading pass of 22 lives found the same sentences printed into nearly all
// of them: "The early years end. You begin to know where you are." (19 of 22),
// "The body is changing. The world is starting to require something from you."
// (14), "You are thirty ... What matters most in this half?" (14), "You are
// fifty ... like a landscape from a height" (11). A six-year-old minding goats
// in 1950s Benue and a six-year-old in a 1990s Seoul apartment block were told
// the same thing in the same words, which is the opposite of what the game is
// for.
//
// These are the openers for those beats, chosen from what the state actually
// holds: where the character lives now, whether they were schooled, whether
// there is a war this year, a partner, children, work. Every clause is a claim
// about the state and is only offered where the state backs it.
//
// `phaseTransitionLine(G, phase)` is for the engine's phase-transition log line
// (tick.js); `groundLine(G, phase)` is the opener the phase-entry and decade
// events build on.

import { numberWord } from '../_words.js'
import { wasWealthy } from '../../technology.js'

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const first = (name, dflt) => (name ? String(name).split(' ')[0] : dflt)

/** The facts these lines may lean on, read once. */
export function lifeFacts(G) {
  const flags = G.flags ?? { has: () => false }
  const has = (f) => (typeof flags.has === 'function' ? flags.has(f) : (flags.includes?.(f) ?? false))
  const country = G.currentCountry ?? G.character?.country
  const year = G.currentYear
  const kidAge = (c) => c.age ?? (G.age - (c.ageAtBirth ?? 0))
  const kids = (G.children ?? []).filter(c => c.alive !== false)
  const eldest = kids.length ? kids.reduce((a, b) => (kidAge(a) >= kidAge(b) ? a : b)) : null
  const schooled = G.mem?.attendedSchool !== false && !has('never_schooled') && G.literate !== false
  return {
    has,
    female: G.character?.gender === 'female',
    rural: G.ruralUrban === 'rural',
    schooled,
    student: !!G.education?.enrolled,
    poor: (G.wealthTier ?? 3) <= 1,
    wealthyPlace: country ? wasWealthy(country, year) : false,
    war: (G.conflictRisk ?? 0) >= 0.1,
    farmer: G.career?.field === 'agriculture' || (!G.career && G.ruralUrban === 'rural' && !schooled && G.age >= 16),
    career: G.career && !G.retired ? G.career : null,
    partner: G.partner ?? null,
    married: !!G.partner?.married,
    widowed: has('widowed') && !G.partner,
    kids,
    eldest,
    eldestAge: eldest ? kidAge(eldest) : null,
    grandchildren: G.grandchildCount ?? 0,
    abroad: !!(G.currentCountry?.name && G.character?.country?.name && G.currentCountry.name !== G.character.country.name),
    bothParentsGone: G.parents?.father?.alive === false && G.parents?.mother?.alive === false,
    childMarriageRisk: G.childMarriageRisk ?? 0,
  }
}

// ── Childhood: turning six ──────────────────────────────────────────────────

function childhoodLines(G, f) {
  const six = numberWord(G.age)
  const out = []
  if (f.war) {
    out.push(`You are ${six}. You know which sounds mean get down and which mean nothing, and you have stopped asking the adults which is which.`)
    out.push(`You are ${six}. You know the way to the place the family goes when the shooting is close, and you could walk it in the dark.`)
    return out
  }
  if (f.rural && !f.wealthyPlace) {
    if (f.female) {
      out.push(`You are ${six}, and there is a small water container that is yours to carry now, and a younger child who is yours to watch.`)
      out.push(`You are ${six}. You can light the fire if somebody else has the matches, and you know which pot is for what.`)
    } else {
      out.push(`You are ${six}, and the goats, or the chickens, or the edge of the field where the birds come down, are yours to mind now. Nobody announces it.`)
      out.push(`You are ${six}. You know the path to the water without looking at it, and which dogs on it bite.`)
    }
  } else if (f.rural) {
    out.push(`You are ${six}. You know the lanes around the house now, which farm dog barks and which one only watches.`)
    out.push(`You are ${six}. You can walk to the end of the road and back on your own, and you know whose land begins where.`)
  } else if (f.poor) {
    out.push(`You are ${six}. You know your street now: which corner, which stall, which door to knock on if nobody is home.`)
    out.push(`You are ${six}, and you are sent to the shop with coins in your fist and the name of the thing repeated all the way there.`)
  } else {
    out.push(`You are ${six}. You can find your way from the door to the corner and back, and you know which neighbours to call aunt.`)
    out.push(`You are ${six}. You know the sound of each of your family on the stairs, and which of them is in a mood.`)
  }
  return out
}

// ── Adolescence: turning twelve ─────────────────────────────────────────────

const ADOLESCENT_DESIRE = {
  prove_worth: 'You have started noticing who is ranked above you, and by how much.',
  belong: 'The groups are forming, and you can feel yourself at the edge of one.',
  be_seen: 'Being looked at has become the weather of the whole day.',
  safety: 'You check the door at night now, though nobody asked you to.',
  connection: 'You want people with a force that embarrasses you.',
  leave_mark: 'Something in you is restless and has nothing to be restless about yet.',
  freedom: 'The rules that were the furniture of childhood have started to chafe.',
  redemption: 'The thing from before has started to have a shape.',
}

function adolescenceLines(G, f) {
  const age = numberWord(G.age)
  const out = []
  if (f.war) {
    out.push(f.female
      ? `You are ${age}. Your mother has started keeping you inside when there are soldiers on the road.`
      : `You are ${age}, old enough now that the men with guns look at you differently, and your mother knows it before you do.`)
    return out
  }
  if (f.female) {
    if (f.rural && f.childMarriageRisk >= 0.25) {
      out.push(`You are ${age}, and the women of the house have begun to talk about you while you are in the room. Where you may go has become a shorter list.`)
    }
    out.push(`You are ${age}. Your body has started to change, and the household noticed before you did. There are new rules about where you may go, and who walks you there.`)
  } else {
    out.push(`You are ${age}. Your voice breaks in the middle of a sentence and nobody in the family lets it go.`)
    if (f.rural || f.poor) out.push(`You are ${age}. The men have begun to speak to you in short sentences, about work, as if you were one of them.`)
  }
  if (!f.schooled) {
    out.push(`You are ${age}, and you do a full day's work now, and are fed like someone who does. Nobody calls it growing up.`)
  } else if (!f.rural) {
    out.push(`You are ${age}. The school has started to want more from you: an exam with a date on it, a list of what you might become.`)
  }
  return out
}

// ── Young adult: eighteen ────────────────────────────────────────────────────

function youngAdultLines(G, f) {
  const age = numberWord(G.age)
  const out = []
  if (f.kids.length) out.push(`You are ${age}, and there is a child who knows your voice before anyone else's.`)
  if (f.married) {
    out.push(f.female
      ? `You are ${age} and married, and most of the large decisions about your life have already been made, some of them by you.`
      : `You are ${age} and married, and there is a household now that counts on what you bring home.`)
  }
  if (f.abroad) out.push(`You are ${age}, in a country that is not the one you were born in, and you dream in two languages or in neither.`)
  if (f.student) out.push(`You are ${age} and a student, and you sit beside people whose parents never once worried about the fees.`)
  if (f.war) out.push(`You are ${age}. Anyone your age is either in it, hiding from it, or trying to leave.`)
  if (!f.schooled && (f.rural || f.poor)) {
    out.push(`You are ${age}. You have been working since you could carry a load; the change is that it now counts as yours.`)
  } else if (f.career) {
    out.push(`You are ${age}, and you have a job, and you take your first wages home and put them on the table to be looked at.`)
  } else if (f.schooled && !f.rural) {
    out.push(`You are ${age}. For the first time in your life nobody has written you a timetable.`)
  }
  if (!out.length) out.push(`You are ${age}. Whatever the next years hold, you will be the one answering for them.`)
  return out
}

// ── Midlife: thirty ──────────────────────────────────────────────────────────

function midlifeLines(G, f) {
  const age = numberWord(G.age)
  const out = []
  if (f.eldest && f.eldestAge >= 2) {
    const name = first(f.eldest.name, null)
    out.push(name
      ? `You are ${age}, and ${name} is ${numberWord(f.eldestAge)}.`
      : `You are ${age}, and your eldest is ${numberWord(f.eldestAge)}.`)
  }
  if (f.farmer) out.push(`You are ${age}. You have worked the same ground for years now and you know it the way you know a face.`)
  else if (f.career) out.push(`You are ${age}, and your work has become the thing people say when they say who you are.`)
  if (f.widowed) out.push(`You are ${age} and already widowed, which is a word you had thought belonged to old people.`)
  else if (!f.partner && !f.wealthyPlace) out.push(`You are ${age} and unmarried, and people in your family have stopped asking about it directly.`)
  else if (!f.partner) out.push(`You are ${age}. You live alone and have got good at it.`)
  if (f.abroad) out.push(`You are ${age} and you have now lived abroad long enough to be a foreigner in both places.`)
  if (!out.length) out.push(`You are ${age}. The life you have been building is recognisably a life now, with a shape other people could describe.`)
  return out
}

// ── Late life: fifty ─────────────────────────────────────────────────────────

function lateLifeLines(G, f) {
  const age = numberWord(G.age)
  const out = []
  if (f.grandchildren > 1) out.push(`You are ${age}, and there are ${numberWord(f.grandchildren)} grandchildren, and you mix up their names.`)
  else if (f.grandchildren === 1) out.push(`You are ${age}, and there is a grandchild, and you are somebody's ${f.female ? 'grandmother' : 'grandfather'} now.`)
  if (f.bothParentsGone) out.push(`You are ${age}, and both your parents are gone, and nobody stands between you and the front of the line.`)
  if (f.farmer || (f.rural && !f.wealthyPlace)) out.push(`You are ${age}. Your knees know the rain is coming before the sky does.`)
  else if (f.career) out.push(`You are ${age}. Younger people at work have started asking you how things used to be done, and listening less to the answer.`)
  if (f.widowed) out.push(`You are ${age}, and you sleep on your own side of the bed still.`)
  if (!out.length) out.push(`You are ${age}. Most of the people who will matter in your life are already in it.`)
  return out
}

const BY_PHASE = {
  childhood: childhoodLines,
  adolescence: adolescenceLines,
  young_adult: youngAdultLines,
  midlife: midlifeLines,
  late_life: lateLifeLines,
}

/** One grounded opener for this phase, read from the state. */
export function groundLine(G, phase) {
  const fn = BY_PHASE[phase]
  if (!fn) return null
  return pick(fn(G, lifeFacts(G)))
}

/**
 * The engine's phase-transition log line. For adolescence the desire, where
 * one has formed, adds a second sentence; elsewhere the entry events carry it.
 */
export function phaseTransitionLine(G, phase) {
  const line = groundLine(G, phase)
  if (!line) return null
  if (phase === 'adolescence' && G.desire && ADOLESCENT_DESIRE[G.desire] && Math.random() < 0.6) {
    return `${line} ${ADOLESCENT_DESIRE[G.desire]}`
  }
  return line
}

export const PHASE_QUESTIONS = {
  young_adult: ['What do you want from the years ahead?', 'What is it all going to be for?', 'What matters most, from here?'],
  midlife: ['What is the next stretch for?', 'What do you want the next twenty years to hold?', 'What matters most now?'],
  late_life: ['What do you carry into the last stretch?', 'What are the years that are left for?', 'What is still to be done?'],
}
export const phaseQuestion = (phase) => pick(PHASE_QUESTIONS[phase] ?? ['What matters most now?'])
