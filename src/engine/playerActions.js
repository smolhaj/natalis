import { COUNTRIES } from '../data/countries'
import { DESTINATIONS } from '../data/destinations'
import { ACTIVITIES, localCost } from '../data/activities'
import { inEraMoney } from '../data/economy.js'
import { preferUnsaid, rememberSaid, hasSaid } from './prose.js'
import { habitLines } from '../data/habitProse.js'
import { PROPERTY_TYPES, VEHICLE_TYPES, localisePrice } from '../data/assets'
import { PLACES, getPlacesForCountry, pickNeighborhoodTier, pickNamedNeighborhood, getRelocationCost } from '../data/places'
import { randomBetween, pickFrom, clamp, chance } from '../utils/random'
import {
  getPhase, GDP_MULT,
  ADULT_TRAITS, CHILD_TRAITS, pickTraits, partnerOccupation, BUSINESS_TYPES, childNameCountry, nameSourceCountry, communityPersonName,
} from './character'
import {
  buildG, buildEffectProxy, applyProxy, resolveProxyExtras, liveCountry,
} from './tick'
import { hasTech, wasWealthy } from '../data/technology.js'
import { livingRuralUrban, getCountryRegime } from './character'
import { urbanChanceFor } from '../data/series.js'
import { institutionExists, healthcareAt, divorceLegalFor } from '../data/history.js'
import { exitClosed, entryRoute, destinationsFor, destinationThen, routeCost } from '../data/exitRules.js'
import { getCountryDisplayName } from '../utils/countryUtils.js'

// Re-export enterCareer and getAvailableCareers so callers that import from gameEngine still work
export { enterCareer, getAvailableCareers } from './tick'
import { earnedGain } from './tick'
import { arrangedShare } from './lifeCourse'

function genPartnerName(state, gender) {
  return communityPersonName(state, gender, { partner: true })
}

export function generatePartnerProfile(state, overrides = {}) {
  const myGender = state.character.gender
  const preferredGender = myGender === 'male' ? 'female' : myGender === 'female' ? 'male' : pickFrom(['male', 'female'])
  const gender = overrides.gender ?? preferredGender
  const nameGender = gender === 'non-binary' ? pickFrom(['male', 'female']) : gender
  const name = genPartnerName(state, nameGender)
  const birthGender = Math.random() < 0.04 ? (gender === 'male' ? 'female' : 'male') : gender === 'non-binary' ? pickFrom(['male', 'female']) : gender

  const minAge = overrides.minAge ?? Math.max(18, state.age - 8)
  const maxAge = overrides.maxAge ?? (state.age + 12)
  const age = clamp(randomBetween(minAge, maxAge), 16, 99)

  const looks = randomBetween(15, 95)
  const smarts = randomBetween(15, 95)
  const wealthStat = overrides.minWealthStat != null
    ? randomBetween(overrides.minWealthStat, 100)
    : randomBetween(5, 90)
  const craziness = randomBetween(10, 90)

  return {
    name, gender, birthGender, age,
    occupation: partnerOccupation(state, gender),
    looks, smarts, wealthStat, craziness,
    relationshipQuality: randomBetween(45, 72),
    married: false, engaged: false, years: 0, alive: true,
    traits: pickTraits(ADULT_TRAITS),
  }
}

/**
 * The partner who is alive, or null.
 *
 * `tickPartner` keeps a partner who has died on state as `{ alive: false }`, so
 * that `G.deceasedPartner` can speak about them — and every player verb read
 * `state.partner` as "has a partner". A widow could take her dead husband on a
 * date, propose to him, divorce him and try for a child with him, and could
 * never meet anybody else: "You already have a partner." The People tab showed
 * him as married, ageing. One predicate, read by the verbs and the interface.
 */
export function livingPartner(state) {
  const p = state?.partner
  return p && p.alive !== false ? p : null
}

export function meetPotentialPartner(state) {
  if (livingPartner(state)) return { ...state, log: [...state.log, { age: state.age, text: "You already have a partner.", isKey: false }] }
  if (state.age < 16) return state
  const attractScore = (state.stats.looks + state.stats.charisma) / 2
  if (!chance(clamp(attractScore / 100 + 0.1, 0.15, 0.9))) {
    return { ...state, log: [...state.log, { age: state.age, text: "You try to meet someone, but nothing clicks.", isKey: false }] }
  }
  const profile = generatePartnerProfile(state)
  return {
    ...state,
    pendingPartner: profile,
    log: [...state.log, { age: state.age, text: `You meet ${profile.name}.`, isKey: false }],
  }
}

export function hookUp(state) {
  if (state.age < 16) return state
  const updatedCount = (state.hooksUpCount ?? 0) + 1
  const stdRisk = 0.06 + (state.flags.includes('risky_behavior') ? 0.08 : 0)
  if (chance(stdRisk)) {
    const std = pickFrom(['chlamydia', 'gonorrhea', 'herpes'])
    return {
      ...state, hooksUpCount: updatedCount,
      flags: [...new Set([...state.flags, std, 'has_std'])],
      stats: { ...state.stats, health: clamp(state.stats.health - 5, 0, 100), happiness: clamp(state.stats.happiness + 4, 0, 100) },
      log: [...state.log, { age: state.age, text: `A night with somebody whose surname you never learn. A fortnight later something is wrong, and a clinic gives it a name you have to say out loud: ${std}.`, isKey: true }],
    }
  }
  const h = habituated(state, 'night', 4)
  return {
    ...h.state, hooksUpCount: updatedCount,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + h.gain, 0, 100) },
    ...sayFresh(h.state, [
      'A night with somebody you will not see again. Neither of you pretends otherwise.',
      'You go home with somebody. In the morning you both have somewhere to be.',
      'It is late, and then it is later, and then it is a stranger\'s ceiling.',
      'A night that asks nothing of the next day. You are not sure, walking home, whether that was what you wanted.',
    ]),
  }
}

// The fortieth kind word of a marriage does not land like the first, and the
// same night out every year stops being an occasion. Even at two a year, the
// same warm verb pressed every year for forty years held adult happiness near
// 90 against a control of 38. The relationship still gains in full; what the
// character feels from it wears in, the way it does.
function habituated(state, key, base) {
  const n = state.mem?.habit?.[key] ?? 0
  return {
    gain: Math.max(base > 0 ? 1 : 0, Math.round(base / (1 + n / 3))),
    state: { ...state, mem: { ...(state.mem ?? {}), habit: { ...(state.mem?.habit ?? {}), [key]: n + 1 } } },
  }
}

export function goOnDate(state) {
  if (!livingPartner(state)) return state
  const gain = randomBetween(5, 14)
  const cost = estimateCost(state, randomBetween(40, 180))
  const h = habituated(state, 'date', 4)
  const first = state.partner.name.split(' ')[0]
  return {
    ...h.state,
    partner: { ...state.partner, relationshipQuality: clamp(state.partner.relationshipQuality + gain, 0, 100) },
    money: Math.max(0, (state.money ?? 0) - cost),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + h.gain, 0, 100) },
    ...sayFresh(h.state, [
      `An evening out with ${first}. You talk about nothing in particular for three hours.`,
      `You and ${first} go out, and for one evening neither of you mentions the house, the money or anybody else.`,
      `Dinner with ${first} at the place you always go. The waiter knows the order.`,
      `You take ${first} somewhere neither of you has been. It is not very good, and that becomes the story.`,
    ]),
  }
}

export function complimentPartner(state) {
  if (!livingPartner(state)) return state
  const gain = randomBetween(4, 10)
  const h = habituated(state, 'kind_word', 3)
  const first = state.partner.name.split(' ')[0]
  return {
    ...h.state,
    partner: { ...state.partner, relationshipQuality: clamp(state.partner.relationshipQuality + gain, 0, 100) },
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + h.gain, 0, 100) },
    ...sayFresh(h.state, [
      `You tell ${first} something true and kind, and watch it arrive.`,
      `You say the thing you usually only think about ${first}. It is received in silence and then, later, mentioned.`,
      `You thank ${first} for something from years ago. ${first} had not known you noticed.`,
    ]),
  }
}

export function proposeMarriage(state) {
  if (!livingPartner(state) || state.partner.engaged || state.partner.married) return state
  const partner = state.partner
  const name = partner.name
  if (partner.relationshipQuality < 55) {
    return { ...state, log: [...state.log, { age: state.age, text: `You bring it up, carefully, and ${name} changes the subject just as carefully. Not yet, then.`, isKey: false }] }
  }
  // "You propose to Olawunmi. They say yes." — the same sentence for every
  // couple in every decade, with a pronoun that declined to know who the
  // partner was. Who asks, and whether anybody asks at all, is the part of a
  // marriage that most belongs to its place and its year.
  const he = partner.gender === 'female' ? 'she' : partner.gender === 'male' ? 'he' : 'they'
  const He = he.charAt(0).toUpperCase() + he.slice(1)
  const says = he === 'they' ? 'say' : 'says'
  const asks = he === 'they' ? 'ask' : 'asks'
  const p = placeNow(state)
  const arranged = arrangedShare(state)
  const sheWaits = state.character?.gender === 'female' && partner.gender === 'male' && (p.year < 1975 || arranged > 0.3)
  let text
  if (arranged > 0 && chance(arranged)) {
    text = pickFrom([
      `Your family and ${name}'s family begin to talk. The terms take a season. The answer was given before anybody sat down.`,
      `Somebody older is sent to speak to ${name}'s people. You are not in the room, which is how it is done, and it is agreed.`,
    ])
  } else if (sheWaits) {
    text = pickFrom([
      `You let ${name} understand that you would say yes if asked. ${He} ${asks} within the month, as though it had been ${he === 'they' ? 'their' : 'his'} idea, and you let it have been.`,
      `${name} asks, in the end, on an ordinary evening. You had known for weeks what you would say.`,
    ])
  } else {
    text = pickFrom([
      `You ask ${name}. ${He} ${says} yes before you have finished asking.`,
      `You ask ${name} to marry you, badly, with the speech you had rehearsed gone entirely. ${He} ${says} yes anyway.`,
      `You ask. ${name} is quiet for long enough that you begin to take it back, and then ${says} yes.`,
    ])
  }
  return {
    ...state,
    partner: { ...partner, engaged: true },
    log: [...state.log, { age: state.age, text, isKey: true }],
  }
}

export function getMarried(state) {
  if (!livingPartner(state)?.engaged) return state
  // A wedding is a large expense everywhere and a large expense is a local
  // quantity. Flat dollars made it 72x annual income in Ethiopia and 45x in
  // Niger, while every other cost in the engine already localises.
  const cost = $$(localCost(randomBetween(800, 18000), gdpTierOf(state)), state)
  return {
    ...state,
    partner: { ...state.partner, married: true, engaged: false, relationshipQuality: clamp(state.partner.relationshipQuality + 10, 0, 100) },
    money: Math.max(0, (state.money ?? 0) - cost),
    flags: [...new Set([...state.flags, 'married'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 12, 0, 100) },
    log: [...state.log, { age: state.age, text: `You marry ${state.partner.name}. The ceremony costs $${cost.toLocaleString()}.`, isKey: true }],
  }
}

// Where and until when a marriage could not be ended by a court. A married
// Irish couple in 1980 could separate, live apart and never remarry; the
// panel granted them a divorce for a legal fee.
export function divorceLegal(state) {
  return divorceLegalFor(liveCountry(state), state.currentYear, state.religion ?? state.character?.religion ?? '')
}

export function fileForDivorce(state) {
  if (!livingPartner(state)) return state
  const name = state.partner.name
  const wasMarried = state.partner.married
  if (wasMarried && !divorceLegal(state)) {
    // Separation, which the law permits, rather than a divorce, which it does not.
    return {
      ...state,
      partner: null,
      children: (state.children ?? []).map(child => ({ ...child, relationshipQuality: clamp((child.relationshipQuality ?? 60) - 12, 0, 100) })),
      flags: [...new Set([...state.flags, 'breakup'])],
      mem: { ...(state.mem ?? {}), marriedStillInLaw: { name, year: state.currentYear } },
      regret: clamp(state.regret + 8, 0, 100),
      stats: { ...state.stats, happiness: clamp(state.stats.happiness - 20, 0, 100) },
      log: [...state.log, { age: state.age, isKey: true, text: `There is no divorce here. You and ${name} separate, which the law allows, and stay married, which it insists on. You will be married to ${name} on paper for as long as the law says.` }],
    }
  }
  const cost = wasMarried ? $$(localCost(randomBetween(2000, 25000), gdpTierOf(state)), state) : 0
  const updatedChildren = (state.children ?? []).map(child => ({
    ...child,
    relationshipQuality: clamp((child.relationshipQuality ?? 60) - 12, 0, 100),
  }))
  return {
    ...state,
    partner: null,
    children: updatedChildren,
    money: Math.max(0, (state.money ?? 0) - cost),
    // The marriage ends with the divorce: `married`/`engaged` used to survive
    // it, so the next wedding read as a second, concurrent one.
    flags: [...new Set([...state.flags.filter(f => f !== 'married' && f !== 'engaged'), wasMarried ? 'divorced' : 'breakup'])],
    exPartners: [...(state.exPartners ?? []), { name, gender: state.partner.gender, years: state.partner.years ?? 0, married: !!wasMarried, endedYear: state.currentYear, alive: true }],
    mem: { ...(state.mem ?? {}), ...(wasMarried ? { divorcedYear: state.currentYear } : {}) },
    regret: clamp(state.regret + 8, 0, 100),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness - 20, 0, 100) },
    log: [...state.log, {
      age: state.age,
      text: wasMarried
        ? `You divorce ${name}. The lawyers cost $${cost.toLocaleString()}, and the furniture is divided by a list neither of you can look at for long.`
        : `You and ${name} end it. ${state.partner.gender === 'female' ? 'Her' : state.partner.gender === 'male' ? 'His' : 'The'} things leave in two trips.`,
      isKey: true,
    }],
  }
}

export function tryForChild(state, opts = {}) {
  if (!livingPartner(state)) return state
  // `lifeCourse` calls this every year on its own account. A refusal there is
  // not something the character asked for, and printing it read as a verdict:
  // "Having a biological child is no longer possible." seven times between 38
  // and 44, and then a son.
  const refuse = (text) => opts.silent ? state
    : { ...state, log: [...state.log, { age: state.age, text, isKey: false }] }
  if (state.flags.includes('pregnant') || state.flags.includes('expecting')) {
    return refuse('You are already expecting.')
  }
  if (state.birthControl) {
    return refuse("You're currently using birth control.")
  }
  // Sterilisation was a flag nothing read. A Moscow father who had "the number
  // of children you are going to have" said out loud to a doctor at 33 went on
  // to have two more, and a Swedish woman sterilised without her consent in
  // 1958 — an event written about exactly that — gave birth in 1970.
  if (state.flags.includes('sterilised')) {
    return refuse('That was settled at the clinic, and it stays settled.')
  }
  // The limit is the age of whoever would carry the child. It tested the
  // partner's age whatever the character's gender, so a woman of 38 with a
  // husband of 49 was told it was over.
  const bearerIsPlayer = state.character?.gender === 'female'
  const bearerAge = bearerIsPlayer ? state.age : (state.partner.age ?? state.age)
  const otherAge = bearerIsPlayer ? (state.partner.age ?? state.age) : state.age
  if (bearerAge > 48 || otherAge > 75) {
    return refuse('Having a biological child is no longer possible.')
  }
  const fertChance = state.partner.married ? 0.65 : 0.38
  if (!chance(fertChance)) {
    // `lifeCourse` calls this silently for unmarried couples too, where it is
    // modelling an unplanned pregnancy, not a couple trying — and "You try for
    // a child" printed for unmarried Muslim couples in 1980s Kano. A couple
    // the player has not steered only try once they are married.
    if (opts.silent && !state.partner.married) return state
    // All five of the original lines are about years of this — the counting,
    // the word neither of you says — and all five fired on the FIRST failed
    // attempt, in the same year a couple met, and to couples who already had
    // two children. `lifeCourse` calls this annually, so one life read "You had
    // told yourselves you were not counting" twice, two years apart, verbatim.
    //
    // How long it has been is the whole content of these sentences, so it has
    // to be counted before they can be said.
    const tryingSince = state.mem?.tryingSinceAge ?? state.age
    const years = Math.max(1, state.age - tryingSince + 1)
    const hasChildren = (state.children ?? []).some(c => c.alive !== false)
    const pool = hasChildren
      // A couple who already have a child are not inside the same silence.
      ? years <= 2
        ? ["You try for another. It doesn't happen this year.",
           'Nothing this year. There is already a child asleep down the hall, which changes the shape of it without changing it.',
           'Not this year. You are not worried, and you notice that you have had to decide not to be.']
        : ['You had assumed it would work the way it worked before. It has not.',
           'The second one is not arriving. Nobody offers you the sympathy they offered the people who had none, and you do not ask for it.',
           'You have started to think of the one you have as the only one, and then to take the thought back, and then to have it again.',
           'Somebody asks when the next one is coming and you give the light answer, and you are getting better at the light answer.']
      : years === 1
        ? ["You try for a child — it doesn't happen this year.",
           'Nothing yet. Neither of you thinks anything of it.']
        : years <= 3
          ? ['Another year and no news. Neither of you says the word for it.',
             'The month passes the way the last one did. You have started counting without deciding to.']
          : ['Nothing this year. You are both careful with each other about it, which is its own kind of tiring.',
             'You had told yourselves you were not counting. You know exactly how many it has been.',
             'Someone asks, kindly, and you have an answer ready because you have needed one before.']
    return {
      ...state,
      flags: [...new Set([...state.flags, 'trying_for_child'])],
      mem: { ...(state.mem ?? {}), tryingSinceAge: tryingSince },
      log: [...state.log, { age: state.age, isKey: false, text: pickFrom(preferUnsaid(state, pool)) }],
    }
  }
  // Conception — store child details in mem; birth will be delivered by tick() ~2 years later
  const cGender = chance(0.5) ? 'male' : 'female'
  const c = childNameCountry(state)
  const childName = personName(c, cGender, state, { surname: childSurname(state) })
  const traits = pickTraits(CHILD_TRAITS)
  // `expecting` is the couple's state and drives the birth in tick(); `pregnant`
  // is the player's own body and is what the maternal-mortality roll and the
  // pregnancy-arc events read. Only one of those is true for a male character.
  const flags = [...state.flags, 'expecting', 'trying_for_child']
  // The count is about THIS attempt; a birth ends it.
  state = { ...state, mem: { ...(state.mem ?? {}), tryingSinceAge: undefined } }
  if (bearerIsPlayer) flags.push('pregnant')
  // A first pregnancy and a sixth are not the same event. In a high-fertility
  // life this line printed nine times, identically, which is both a repetition
  // bug and a failure to notice that the thing being narrated has changed.
  const parity = state.children?.length ?? 0
  const own = parity === 0
    ? [
        'You are pregnant. The knowledge of it sits in your body before you have words for it.',
        'You are pregnant. You tell nobody for a fortnight, and carry it around like something in a coat pocket.',
      ]
    : parity <= 2
      ? [
          'You are pregnant again. You know the shape of the next two years now, which is a comfort and is also the problem.',
          'Pregnant. You recognise it a week earlier than last time, from something in the way food smells.',
        ]
      : [
          'Pregnant again. You do the arithmetic of the house — the beds, the pot, the shoes — before you do any of the feeling.',
          'Another one. Your mother had more than this and said less about it, and you are aware of both facts at once.',
          'You are pregnant. Nobody in the household is surprised, including you.',
        ]
  // A life can hold six of these and there were three sentences for it, so one
  // family heard "You find yourself counting rooms" four times. "You are told
  // in a kitchen, or a corridor" is also the game declining to say which.
  const theirs = parity === 0
    ? [
        `${state.partner.name} is pregnant. You are told in the kitchen, standing up, and you do not know what to do with your hands.`,
        `${state.partner.name} is pregnant. Something in the room reorganises itself and you are standing in the middle of it.`,
        `${state.partner.name} tells you and then watches your face, which you understand afterwards was the whole of the test.`,
        `${state.partner.name} is pregnant. You say the wrong thing first and the right thing about four seconds later, and both of them get remembered.`,
      ]
    : [
        `${state.partner.name} is pregnant again. You are better at the news this time and slightly worse at the arithmetic.`,
        `${state.partner.name} tells you. You have been here before, which does not make it ordinary, only familiar.`,
        `${state.partner.name} is expecting. You find yourself counting rooms.`,
        `${state.partner.name} is pregnant again and tells you in the middle of something else, which is how the second and third ones arrive.`,
        `${state.partner.name} is expecting. Neither of you says anything for a moment and then one of you laughs, and it is not entirely a happy laugh, and that is fine.`,
        `${state.partner.name} is pregnant again. The older one is in the next room and does not know yet, and for one day you are the only two people who do.`,
      ]
  // A life can hold six pregnancies against six sentences, so drawing blind gave
  // one family the same announcement four times.
  const announcement = pickFrom(preferUnsaid(state, bearerIsPlayer ? own : theirs))
  return {
    ...state,
    flags: [...new Set(flags)],
    mem: rememberSaid(
      { ...(state.mem ?? {}), pregnancyYear: state.age, pendingChild: { name: childName, gender: cGender, traits } },
      announcement,
    ),
    log: [...state.log, { age: state.age, text: announcement, isKey: true }],
  }
}

export function spendTimeWithChild(state, childIndex) {
  const child = state.children[childIndex]
  if (!child || child.alive === false) return state
  const updated = [...state.children]
  updated[childIndex] = { ...child, relationshipQuality: clamp(child.relationshipQuality + randomBetween(5, 12), 0, 100) }
  const h = habituated(state, 'child_time', 3)
  return {
    ...h.state, children: updated,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + h.gain, 0, 100) },
    ...sayFresh(h.state, [
      `You spend time with ${child.name}. It matters more than you say.`,
      `An afternoon with ${child.name}, doing nothing that will be remembered, which is how the remembered ones are made.`,
      `${child.name} tells you something they have not told anyone. You try not to make it larger than they meant it.`,
      `You and ${child.name} have a way of being in a room together now. It took years and neither of you planned it.`,
      child.age != null && child.age < 12
        ? `${child.name} wants to show you everything. You look at everything.`
        : `${child.name} is busy, and makes time anyway. You notice that it is being made.`,
    ]),
  }
}

export function callParent(state, key) {
  const parent = state.parents?.[key]
  if (!parent?.alive) return state
  const gain = randomBetween(3, 10)
  const h = habituated(state, 'parent_call', 2)
  return {
    ...h.state,
    parents: { ...state.parents, [key]: { ...parent, relationshipQuality: clamp(parent.relationshipQuality + gain, 0, 100) } },
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + h.gain, 0, 100) },
    ...sayFresh(h.state, hasPhone(state) ? [
      `You call your ${key}. It is a good conversation.`,
      `You ring your ${key} on an ordinary evening and stay on longer than either of you meant to.`,
      `Your ${key} answers on the second ring, as if waiting. Perhaps they were.`,
      `The call is mostly news about people you have never met. You listen to all of it.`,
      `You call your ${key}, and hear in the first word what kind of week it has been.`,
    ] : [
      `You go to see your ${key}. It is a good visit.`,
      `You sit with your ${key} for an afternoon. Nothing much is said. Nothing much needs to be.`,
      `You walk over to your ${key}'s and are given food before you are given news.`,
      `Your ${key} has saved up things to tell you. You hear all of them.`,
    ]),
  }
}

// ─── Health actions ───────────────────────────────────────────────────────────

export function getPlasticSurgery(state, surgeryType) {
  if (state.age < 18) return state
  if (!surgeryOptions(state).some(o => o.id === surgeryType)) return state
  const s = SURGERY[surgeryType]
  const money = state.money ?? 0
  const surgeryCost = surgeryPrice(state, surgeryType)
  if (money < surgeryCost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford that surgery.", isKey: false }] }
  }
  if (chance(s.successChance)) {
    return {
      ...state, money: money - surgeryCost,
      stats: { ...state.stats, looks: clamp(state.stats.looks + s.looksGain, 0, 100), happiness: clamp(state.stats.happiness + 5, 0, 100) },
      flags: [...new Set([...state.flags, 'plastic_surgery'])],
      log: [...state.log, { age: state.age, text: `The swelling goes down over a month. The face it leaves is yours, slightly corrected, and people who have not seen you in a while cannot say what has changed.`, isKey: false }],
    }
  }
  return {
    ...state, money: money - surgeryCost,
    stats: { ...state.stats, looks: clamp(state.stats.looks - 15, 0, 100), health: clamp(state.stats.health - 10, 0, 100), happiness: clamp(state.stats.happiness - 20, 0, 100) },
    log: [...state.log, { age: state.age, text: `Something goes wrong under the anaesthetic, or after it. The result is worse than what you went in with, and there is a second operation to talk about.`, isKey: true }],
  }
}

// A button pressed every year used to print the same sentence every year —
// "You call your mother. It is a good conversation." fourteen times in one
// life. Pick an unheard line and remember it.
function sayFresh(state, pool, isKey = false) {
  const fresh = preferUnsaid(state, pool)
  const text = fresh[Math.floor(Math.random() * fresh.length)]
  return {
    log: [...state.log, { age: state.age, text, isKey }],
    mem: rememberSaid(state.mem ?? {}, text),
  }
}

function hasPhone(state) {
  const c = liveCountry(state)
  const rural = livingRuralUrban(state) === 'rural'
  return hasTech(c, 'landline', state.currentYear, { rural }) || hasTech(c, 'mobile_phone', state.currentYear, { rural })
}

// ─── What is here to be done ──────────────────────────────────────────────────
//
// The activities panel was a catalogue written for a present-day suburb and
// shown to everybody. A Yoruba farm hand on $1,000 a year in 1981 was offered a
// facelift, a ski chalet, a penthouse, a mountain bike that would not be made
// until that autumn, a pilot's licence, a hamster from a shelter, blackjack and
// a race card of comic horse names, with every price a fraction of a cent of
// what it would have cost him. Nothing in the panel asked where he was.
//
// Every offer now asks three things the rest of the engine already knows how
// to answer: did this exist here, then (`hasTech`, `wasWealthy`, the place's
// own urban share, `institutionExists`); is it a thing somebody in this
// person's position would have within reach (their wage and their savings,
// not the country's); and what does it cost in the money of the place and the
// year. The panel shows only what these return, and the store refuses what
// they refuse, so a verb that is not offered cannot be pressed through some
// other path either.

const LANDLOCKED = new Set([
  'Afghanistan', 'Armenia', 'Austria', 'Belarus', 'Bhutan', 'Bolivia', 'Burkina Faso',
  'Central African Republic', 'Chad', 'Czech Republic', 'Hungary', 'Kazakhstan', 'Kyrgyzstan',
  'Laos', 'Mali', 'Moldova', 'Mongolia', 'Nepal', 'Niger', 'Paraguay', 'Rwanda', 'Serbia',
  'Slovakia', 'Switzerland', 'Tajikistan', 'Turkmenistan', 'Uganda', 'Uzbekistan', 'Zambia',
  'Zimbabwe', 'Azerbaijan',
])
// Ethiopia lost the coast in 1993.
const landlocked = (name, year) => LANDLOCKED.has(name) || (name === 'Ethiopia' && year >= 1993)

// Where there were mountains with lifts on them, and since when.
const SKI_FROM = {
  Switzerland: 1930, Austria: 1930, France: 1935, Italy: 1935, Germany: 1935, Norway: 1935,
  Sweden: 1940, Finland: 1950, 'United States': 1936, Canada: 1940, Japan: 1950, Chile: 1950,
  Argentina: 1950, Spain: 1960, 'New Zealand': 1960, Australia: 1960, 'South Korea': 1975,
  Iceland: 1970, Slovenia: 1960, Bulgaria: 1965, Georgia: 1975, Lebanon: 1960, Iran: 1970,
  Turkey: 1980, Kazakhstan: 2000, Russia: 1995, Poland: 1960, 'Czech Republic': 1960, Slovakia: 1960,
}

// Licensed casinos, by the year the law allowed one an ordinary resident could walk into.
const CASINO_FROM = {
  'United States': 1931, 'United Kingdom': 1961, France: 1907, Germany: 1949, Austria: 1934,
  Italy: 1927, Portugal: 1927, Belgium: 1902, Netherlands: 1976, Spain: 1978, Switzerland: 2002,
  Australia: 1973, 'New Zealand': 1994, Canada: 1989, 'South Africa': 1979, Argentina: 1944,
  Uruguay: 1912, Chile: 1928, Peru: 1990, Colombia: 1990, Mexico: 2004, Philippines: 1977,
  Cambodia: 1995, Lebanon: 1959, Kenya: 1965, Panama: 1950, 'Dominican Republic': 1960,
  'Puerto Rico': 1948, Czechia: 1990, 'Czech Republic': 1990, Poland: 1989, Hungary: 1989,
  Russia: 1992, Ukraine: 1992, Latvia: 1993, Estonia: 1993, Lithuania: 1993, Georgia: 2000,
  Slovenia: 1964, Croatia: 1972, Greece: 1995, Cyprus: 2019, Singapore: 2010, 'South Korea': 2000,
  Vietnam: 2017, Nigeria: 1990, Ghana: 1990, Tanzania: 2003, Zimbabwe: 1990, Namibia: 1995, Sweden: 2001,
  Finland: 1991, Denmark: 1990, Norway: 9999, Ireland: 9999, Iceland: 9999,
}
// Racecourses that held race meetings with betting an ordinary person could attend.
const RACING_FROM = {
  'United Kingdom': 1800, Ireland: 1800, France: 1830, 'United States': 1870, Australia: 1850,
  'New Zealand': 1860, Japan: 1930, India: 1850, Pakistan: 1950, 'South Africa': 1880, Kenya: 1920,
  Zimbabwe: 1920, Nigeria: 1920, Argentina: 1880, Brazil: 1880, Chile: 1880, Peru: 1900,
  Uruguay: 1890, Venezuela: 1950, Mexico: 1940, Jamaica: 1900, 'Trinidad and Tobago': 1900,
  Barbados: 1900, Guyana: 1900, Malaysia: 1900, Singapore: 1900, Philippines: 1900, Thailand: 1920,
  Turkey: 1930, Germany: 1870, Italy: 1880, Sweden: 1920, Norway: 1930, Russia: 1880, Poland: 1920,
  'Czech Republic': 1920, Hungary: 1900, Belgium: 1900, Netherlands: 1900, Austria: 1880, Canada: 1870,
  'South Korea': 1990, UAE: 1992, Morocco: 1920, Mauritius: 1812, 'Sri Lanka': 1900,
}
// Where the 1917, 1949 and 1959 revolutions closed the betting along with everything else.
const RACING_CLOSED = { Russia: [1918, 1991], Poland: [1950, 1990], 'Czech Republic': [1950, 1990], Hungary: [1950, 1990] }

// Where going out at night to drink and dance was a crime.
function nightlifeBanned(c, year) {
  const n = c?.name
  if (n === 'Saudi Arabia') return year < 2019
  if (n === 'Iran') return year >= 1979
  if (n === 'Afghanistan') return (year >= 1996 && year <= 2001) || year >= 2021
  if (n === 'Kuwait' || n === 'Libya' && year >= 1969) return true
  if (n === 'Cambodia') return year >= 1975 && year <= 1979
  if (n === 'North Korea') return true
  return false
}

// Exchanges an ordinary saver could buy into.
const STOCK_EXCHANGE = {
  // [from, to]: closed outside the window
  Russia: [1992, 9999], Ukraine: [1992, 9999], Belarus: [1998, 9999], Kazakhstan: [1993, 9999],
  Poland: [1991, 9999], Hungary: [1990, 9999], 'Czech Republic': [1993, 9999], Slovakia: [1993, 9999],
  Romania: [1995, 9999], Bulgaria: [1997, 9999], Estonia: [1996, 9999], Latvia: [1995, 9999], Lithuania: [1993, 9999],
  China: [1990, 9999], Vietnam: [2000, 9999], Mongolia: [1991, 9999], Cuba: [0, 1959], 'North Korea': [9999, 9999],
  Nigeria: [1961, 9999], Kenya: [1954, 9999], Ghana: [1990, 9999], 'Ivory Coast': [1976, 9999], Zimbabwe: [1946, 9999],
  Zambia: [1994, 9999], Tanzania: [1998, 9999], Uganda: [1997, 9999], Namibia: [1992, 9999], Botswana: [1989, 9999],
  Egypt: [1883, 9999], Morocco: [1929, 9999], Tunisia: [1969, 9999], Iran: [1967, 9999], Iraq: [2004, 9999],
  'Saudi Arabia': [1985, 9999], UAE: [2000, 9999], Kuwait: [1983, 9999], Qatar: [1997, 9999], Bahrain: [1987, 9999], Oman: [1988, 9999],
  Jordan: [1978, 9999], Lebanon: [1920, 9999], Israel: [1953, 9999], Turkey: [1986, 9999],
  Bangladesh: [1954, 9999], Pakistan: [1947, 9999], 'Sri Lanka': [1985, 9999], Nepal: [1994, 9999],
  Indonesia: [1977, 9999], Philippines: [1927, 9999], Thailand: [1975, 9999], Malaysia: [1960, 9999],
  Cambodia: [2012, 9999], Laos: [2011, 9999], Myanmar: [2016, 9999],
}
const DEVELOPED_MARKET = new Set(['wealthy_west', 'wealthy_east', 'developing_urban'])
export function stockMarketOpen(country, year) {
  const w = STOCK_EXCHANGE[country?.name]
  if (w) return year >= w[0] && year <= w[1]
  return DEVELOPED_MARKET.has(country?.archetype)
}

/**
 * Where the character is and what they have. Everything below reads this.
 * `means` is the larger of a year's income and what is in the account, in the
 * money of the year: the yardstick for "within reach".
 */
export function placeNow(state) {
  const c = liveCountry(state)
  const year = state.currentYear
  const rural = livingRuralUrban(state) === 'rural'
  const urbanShare = urbanChanceFor(c, year) ?? 0.5
  const wealthy = wasWealthy(c, year)
  const income = state.career?.salary ?? (state.retired ? (state.pensionAnnual ?? 0) : 0)
  const means = Math.max(income, state.money ?? 0, 0)
  const tier = state.classTier ?? state.character?.wealthTier ?? 3
  // A household that could buy what the rich world buys: rich country, or the
  // top of a poor one, or simply a lot of money in this place's terms.
  const comfortable = wealthy || tier >= 5 || means >= $$(localCost(40000, c?.gdp), state)
  const regime = getCountryRegime(c, year)
  // The health system there THAT YEAR. `c.healthcare` is today's rating, and
  // put 2020 clinics into 1950 Seoul.
  const hc = healthcareAt(c, year) ?? c?.healthcare
  return { c, name: c?.name, year, rural, urbanShare, wealthy, income, means, tier, comfortable, regime, hc }
}

/** A price within reach of somebody with these means: `years` of income, or the savings. */
function withinReach(p, price, years = 1) {
  return price <= Math.max(p.means * years, 1)
}

const clinicHere = (p) => institutionExists(p.name, p.year, 'clinic') && p.hc !== 'very_poor' || (p.comfortable && institutionExists(p.name, p.year, 'clinic'))

// ── Salon, shopping, surgery ────────────────────────────────────────────────

const SALON = {
  haircut:  { cost: 60,  happiness: 5, looks: 1, health: 0 },
  hairdye:  { cost: 120, happiness: 6, looks: 2, health: 0 },
  massage:  { cost: 150, happiness: 9, looks: 0, health: 3 },
  facial:   { cost: 100, happiness: 5, looks: 3, health: 0 },
  manicure: { cost: 50,  happiness: 4, looks: 1, health: 0 },
}
export function salonPrice(state, id) { return estimateCost(state, SALON[id]?.cost ?? 60) }
export function salonOptions(state) {
  const p = placeNow(state)
  const polished = !p.rural && (p.wealthy || p.comfortable) && p.year >= 1950
  const out = [{
    id: 'haircut', label: 'A haircut',
    desc: p.rural ? 'The barber at the market: a chair, a mirror, a radio.' : 'Ten minutes of somebody else\'s hands.',
  }]
  if (p.year >= 1950 && (!p.rural || p.wealthy)) out.push({ id: 'hairdye', label: 'Colour your hair', desc: 'A different face in the mirror for a while.' })
  if (polished) out.push({ id: 'manicure', label: 'A manicure', desc: 'Small, and noticed.' })
  if (polished && p.year >= 1960) out.push({ id: 'facial', label: 'A facial', desc: 'An hour lying very still under a towel.' })
  if (polished && p.year >= 1960) out.push({ id: 'massage', label: 'A massage', desc: 'Somebody finds the knot you had stopped noticing.' })
  return out.map(o => ({ ...o, cost: salonPrice(state, o.id) }))
}

const SHOPPING = {
  clothes:     { happiness: 5, looks: 2 },
  electronics: { happiness: 7, looks: 0 },
  luxury:      { happiness: 10, looks: 3 },
}
export function shoppingPrice(state, category) {
  const y = state.currentYear
  if (category === 'clothes') return estimateCost(state, 200)
  if (category === 'electronics') return estimatePrice(state, y < 1975 ? 150 : y < 1995 ? 450 : 800, 'imported')
  return estimatePrice(state, 3000, 'imported')
}
export function shoppingOptions(state) {
  const p = placeNow(state)
  const out = [{
    id: 'clothes', label: 'Clothes',
    desc: !p.wealthy && (p.rural || p.year < 1960) ? 'Cloth from the market, and the tailor who knows your measurements.' : 'Something new to wear.',
  }]
  if (p.year >= 1950 && hasTech(p.c, 'radio', p.year, { rural: p.rural })) {
    out.push({
      id: 'electronics',
      label: p.year < 1975 ? 'A radio' : p.year < 1995 ? 'A cassette player, or a television' : p.year < 2008 ? 'Something with a screen' : 'A phone',
      desc: p.year < 1975 ? 'A box that brings in the capital, and music after dark.' : 'Bought, carried home, plugged in.',
    })
  }
  const lux = shoppingPrice(state, 'luxury')
  if (p.comfortable && withinReach(p, lux, 0.5)) out.push({ id: 'luxury', label: 'Something expensive', desc: 'Bought because it can be.' })
  return out.map(o => ({ ...o, cost: shoppingPrice(state, o.id) }))
}

const SURGERY = {
  minor:    { cost: 3000,  successChance: 0.85, looksGain: 8,  label: 'A minor procedure', desc: 'Small adjustments, under a local anaesthetic.' },
  major:    { cost: 12000, successChance: 0.62, looksGain: 18, label: 'A major procedure', desc: 'General anaesthetic, weeks of bruising.' },
  facelift: { cost: 7500,  successChance: 0.75, looksGain: 12, label: 'A facelift', desc: 'The years taken in at the hairline.' },
}
export function surgeryPrice(state, type) { return estimateCost(state, SURGERY[type]?.cost ?? 3000) }
export function surgeryOptions(state) {
  if (state.age < 18) return []
  const p = placeNow(state)
  const hc = p.hc
  // Cosmetic surgery as a thing ordinary people bought is postwar and rich-world,
  // and then the cities of Brazil, Korea, Iran and Lebanon from the 1980s.
  const exists = p.year >= 1950 && clinicHere(p) && (
    (p.wealthy && hc !== 'poor') ||
    (!p.rural && p.year >= 1980 && ['excellent', 'good', 'fair'].includes(hc))
  )
  if (!exists) return []
  return Object.entries(SURGERY)
    .filter(([id]) => withinReach(p, surgeryPrice(state, id), 1))
    .map(([id, s]) => ({ id, label: s.label, desc: s.desc, cost: surgeryPrice(state, id) }))
}

// ── Martial arts ────────────────────────────────────────────────────────────

const MARTIAL = [
  { name: 'Judo', home: ['Japan'], homeFrom: 1890, globalFrom: 1955, belts: true },
  { name: 'Karate', home: ['Japan'], homeFrom: 1930, globalFrom: 1965, belts: true },
  { name: 'Taekwondo', home: ['South Korea'], homeFrom: 1955, globalFrom: 1975, belts: true },
  { name: 'Kung Fu', home: ['China', 'Taiwan', 'Singapore', 'Malaysia'], homeFrom: 0, globalFrom: 1972, closed: { China: [1966, 1976] } },
  { name: 'Brazilian Jiu-Jitsu', home: ['Brazil'], homeFrom: 1930, globalFrom: 1995, belts: true },
  { name: 'Capoeira', home: ['Brazil'], homeFrom: 1937, globalFrom: 1995 },
  { name: 'Muay Thai', home: ['Thailand'], homeFrom: 0, globalFrom: 1995 },
  { name: 'Silat', home: ['Indonesia', 'Malaysia'], homeFrom: 0, globalFrom: 9999 },
  { name: 'Wrestling', home: ['Iran', 'Turkey', 'Mongolia', 'Senegal', 'Nigeria', 'Niger', 'Georgia', 'Russia', 'India', 'Pakistan', 'Japan', 'Azerbaijan', 'Kazakhstan', 'Kyrgyzstan', 'Uzbekistan', 'Bulgaria', 'United States'], homeFrom: 0, globalFrom: 9999 },
  { name: 'Boxing', home: [], homeFrom: 0, globalFrom: 1920, urban: true },
]
export function martialOptions(state) {
  if (state.age < 12) return []
  const p = placeNow(state)
  return MARTIAL.filter(m => {
    const shut = m.closed?.[p.name]
    if (shut && p.year >= shut[0] && p.year <= shut[1]) return false
    if (m.home.includes(p.name) && p.year >= m.homeFrom) return true
    return !p.rural && p.year >= m.globalFrom && p.urbanShare >= 0.3
  }).map(m => ({ name: m.name, belts: !!m.belts }))
}

// ── Pets ────────────────────────────────────────────────────────────────────

const PET_FEES = { dog: 400, cat: 200, rabbit: 80, hamster: 30, parrot: 300, fish: 20, bird: 150 }
/** A shelter or a breeder charges; a neighbour's litter does not. */
export function petFee(state, species) {
  const p = placeNow(state)
  if (!(p.wealthy && !p.rural)) return 0
  return estimateCost(state, PET_FEES[species] ?? 200)
}
export function petOptions(state) {
  if (state.age < 8) return []
  const p = placeNow(state)
  const ids = ['dog', 'cat', 'bird']
  if (p.wealthy) ids.push('rabbit')
  if (p.wealthy && p.year >= 1950) ids.push('hamster')
  if (p.wealthy && hasTech(p.c, 'electricity', p.year, { rural: p.rural })) ids.push('fish')
  if (p.comfortable && p.wealthy) ids.push('parrot')
  const desc = {
    dog: p.wealthy && !p.rural ? 'From a shelter, with a form to sign.' : 'One of a neighbour\'s litter, who would otherwise have gone to the river.',
    cat: p.wealthy && !p.rural ? 'From a shelter, already named by somebody else.' : 'It was coming round anyway. Now it is fed.',
    bird: 'A small cage by the window, and a song in the morning.',
    rabbit: 'A hutch in the yard.', hamster: 'A cage, a wheel, the wheel at three in the morning.',
    fish: 'A tank, a pump, the hum of it.', parrot: 'It will outlive the furniture and possibly you.',
  }
  return ids.map(id => ({ id, desc: desc[id], fee: petFee(state, id) }))
}

// ── Licences ────────────────────────────────────────────────────────────────

const LICENCES = {
  driver:  { cost: 500,  flag: 'has_licence',     minAge: 16, label: 'A driving licence', text: 'You pass the driving test.' },
  pilot:   { cost: 8000, flag: 'pilot_licence',   minAge: 18, label: 'A pilot\'s licence', text: 'After a long year of hours in the air, the licence is yours.' },
  boating: { cost: 600,  flag: 'boating_licence', minAge: 16, label: 'A boating licence', text: 'You pass the boating course.' },
}
export function licencePrice(state, type) { return estimateCost(state, LICENCES[type]?.cost ?? 500) }
export function licenceOptions(state) {
  const p = placeNow(state)
  const out = []
  const drives = p.year >= 1920 && (
    hasTech(p.c, 'automobile', p.year, { rural: p.rural, rich: p.comfortable }) ||
    state.career?.field === 'transport' || (!p.rural && p.urbanShare >= 0.25)
  )
  if (drives) out.push('driver')
  if (p.year >= 1930 && p.wealthy && p.comfortable && withinReach(p, licencePrice(state, 'pilot'), 1)) out.push('pilot')
  if (p.year >= 1960 && p.wealthy && p.comfortable && !landlocked(p.name, p.year)) out.push('boating')
  return out.filter(id => state.age >= LICENCES[id].minAge)
    .map(id => ({ id, label: LICENCES[id].label, cost: licencePrice(state, id), held: state.flags.includes(LICENCES[id].flag) }))
}

// ── Property and vehicles ───────────────────────────────────────────────────

const LUXURY_PROPERTY = new Set(['mansion', 'beach_house', 'penthouse', 'ski_chalet'])
export function propertyPrice(state, type) { return estimatePrice(state, type.basePrice, 'local') }
export function propertyOptions(state) {
  if (state.age < 18) return []
  const p = placeNow(state)
  return PROPERTY_TYPES.filter(t => {
    if (p.rural && ['studio_flat', 'apartment', 'terraced_house', 'penthouse'].includes(t.id)) return false
    if (!p.rural && t.id === 'farmhouse' && !p.comfortable) return false
    if (t.id === 'penthouse' && (p.year < 1960 || p.urbanShare < 0.4)) return false
    if (t.id === 'beach_house' && landlocked(p.name, p.year)) return false
    if (t.id === 'ski_chalet' && !(SKI_FROM[p.name] && p.year >= SKI_FROM[p.name])) return false
    if (LUXURY_PROPERTY.has(t.id)) {
      return (p.wealthy || p.tier >= 4) && withinReach(p, propertyPrice(state, t) * t.downPaymentRate, 1)
    }
    return true
  }).map(t => {
    const price = propertyPrice(state, t)
    return { ...t, price, deposit: Math.round(price * t.downPaymentRate) }
  })
}

const BIKE_FOR_EVERYONE = new Set(['bike_city'])
const SMALL_MOTO = new Set(['moto_royal_enfield_bullet', 'moto_vespa', 'moto_honda_super_cub'])
export function vehiclePrice(state, type) { return estimatePrice(state, type.basePrice, 'imported') }
export function vehicleOptions(state) {
  const p = placeNow(state)
  return VEHICLE_TYPES.filter(t => {
    if (t.minYear && p.year < t.minYear) return false
    if (t.maxYear && p.year > t.maxYear) return false
    const price = vehiclePrice(state, t)
    if (t.tier === 'bicycle') return BIKE_FOR_EVERYONE.has(t.id) || ((p.wealthy || p.comfortable) && withinReach(p, price, 0.5))
    if (!state.licenceObtained) return false
    if (t.tier === 'motorcycle') return SMALL_MOTO.has(t.id) ? withinReach(p, price, 3) : (p.comfortable && withinReach(p, price, 1.5))
    if (t.tier === 'used_car') return withinReach(p, price, 3)
    if (t.tier === 'new_car') return p.comfortable && withinReach(p, price, 2)
    if (t.tier === 'watercraft') return !landlocked(p.name, p.year) && p.comfortable && withinReach(p, price, 1)
    return withinReach(p, price, 1)   // luxury and supercars: only for those who could
  }).map(t => ({ ...t, price: vehiclePrice(state, t), upkeep: estimatePrice(state, t.annualMaintenance, 'imported') }))
}

// ── Travel ──────────────────────────────────────────────────────────────────

const TRIP_IS_HOME = {
  japan_trip: (p) => p.name === 'Japan',
  europe_trip: (p) => /Europe|Balkans/.test(p.c?.region ?? ''),
  asia_trip: (p) => p.c?.region === 'Southeast Asia',
  americas_trip: (p) => /America|Caribbean/.test(p.c?.region ?? ''),
  safari: (p) => /Africa/.test(p.c?.region ?? '') && !/North/.test(p.c?.region ?? ''),
}
/** A trip abroad is a world-priced ticket; a weekend inside the country is local. */
export function tripPrice(state, dest) {
  return estimatePrice(state, dest.cost, dest.region === 'domestic' ? 'local' : 'imported')
}
export function tripOptions(state) {
  if (state.age < 16) return []
  const p = placeNow(state)
  const canLeave = !exitClosed(p.c, p.year, state)
  return DESTINATIONS.filter(d => {
    if (d.minAge > state.age || (d.minYear && p.year < d.minYear)) return false
    if (TRIP_IS_HOME[d.id]?.(p)) return false
    const price = tripPrice(state, d)
    if (d.region === 'domestic') {
      if (p.year < 1950 && !p.comfortable) return false
      if (d.id === 'beach_domestic' && landlocked(p.name, p.year)) return false
      if (d.id === 'road_trip' && !state.licenceObtained) return false
      if (d.id === 'national_park' && !(p.wealthy || p.comfortable)) return false
      return withinReach(p, price, 0.25)
    }
    if (!canLeave) return false
    if (d.region === 'regional') return (p.wealthy || p.comfortable) && withinReach(p, price, 0.4)
    if (d.region === 'international') return (p.wealthy || p.comfortable) && withinReach(p, price, 0.5)
    return withinReach(p, price, 0.3)   // luxury
  }).map(d => ({ ...d, price: tripPrice(state, d) }))
}

// ── Going out ───────────────────────────────────────────────────────────────

export function goingOutAvailable(state) {
  const p = placeNow(state)
  if (state.age < 18 || p.rural || p.year < 1920) return false
  if (nightlifeBanned(p.c, p.year)) return false
  return hasTech(p.c, 'electricity', p.year)
}
export function cinemaAvailable(state) {
  const p = placeNow(state)
  return hasTech(p.c, 'cinema', p.year, { rural: p.rural }) && !(p.name === 'Saudi Arabia' && p.year >= 1983 && p.year < 2018)
    && !(p.name === 'Cambodia' && p.year >= 1975 && p.year <= 1979)
}
export function datingAppAvailable(state) {
  const p = placeNow(state)
  return p.year >= 1996 && (hasTech(p.c, 'smartphone', p.year, { rural: p.rural }) || hasTech(p.c, 'home_internet', p.year, { rural: p.rural }))
}
export function datingAppLabel(state) {
  const p = placeNow(state)
  return hasTech(p.c, 'smartphone', p.year, { rural: p.rural }) && p.year >= 2012 ? 'A dating app' : 'A dating website'
}

// ── Gambling ────────────────────────────────────────────────────────────────

export function casinoOpen(state) {
  const p = placeNow(state)
  const from = CASINO_FROM[p.name]
  return !p.rural && from != null && p.year >= from
}
export function racecourseOpen(state) {
  const p = placeNow(state)
  const from = RACING_FROM[p.name]
  if (from == null || p.year < from) return false
  const shut = RACING_CLOSED[p.name]
  if (shut && p.year >= shut[0] && p.year <= shut[1]) return false
  return !p.rural
}
export function lotteryExists(state) {
  const p = placeNow(state)
  if (p.year < 1930 || p.regime === 'theocracy') return false
  if (['Saudi Arabia', 'Afghanistan', 'North Korea', 'Kuwait', 'Qatar', 'Oman', 'Libya', 'Brunei'].includes(p.name)) return false
  if (p.name === 'China' && p.year < 1987) return false
  return institutionExists(p.name, p.year, 'money')
}

/** Stakes a person here would actually put down: a small one, a real one, a foolish one. */
export function raceStakes(state) {
  return [20, 80, 300].map(b => estimateCost(state, b))
}

// ── Drink and drugs ─────────────────────────────────────────────────────────

const SUBSTANCES = {
  alcohol:  { cost: 30,  label: 'A drink', desc: 'And then another.', minAge: 14 },
  cannabis: { cost: 40,  label: 'Smoke something', desc: 'Passed round, the windows open.', minAge: 16 },
  pills:    { cost: 60,  label: 'Pills', desc: 'Somebody\'s prescription, or nobody\'s.', minAge: 18, from: 1955 },
  cocaine:  { cost: 200, label: 'Cocaine', desc: 'Expensive, and the wanting it again is the expensive part.', minAge: 18, from: 1970, urban: true },
  heroin:   { cost: 150, label: 'Heroin', desc: 'The one people do not come back from the same.', minAge: 18, from: 1960, urban: true },
}
const DRY = (c, year) => ['Saudi Arabia', 'Kuwait'].includes(c?.name) || (c?.name === 'Iran' && year >= 1979) ||
  (c?.name === 'Libya' && year >= 1969) || (c?.name === 'Afghanistan' && year >= 1996)
export function substancePrice(state, id) { return estimateCost(state, SUBSTANCES[id]?.cost ?? 30) }
export function substanceOptions(state) {
  const p = placeNow(state)
  return Object.entries(SUBSTANCES).filter(([id, sub]) => {
    if (state.age < sub.minAge) return false
    if (sub.from && p.year < sub.from) return false
    if (sub.urban && p.rural) return false
    if (id === 'alcohol' && DRY(p.c, p.year)) return false
    return true
  }).map(([id, sub]) => ({ id, label: sub.label, desc: sub.desc, cost: substancePrice(state, id), hard: ['pills', 'cocaine', 'heroin'].includes(id) }))
}

// ── Health and care ─────────────────────────────────────────────────────────

export function therapyExists(state) {
  const p = placeNow(state)
  const hc = p.hc
  return p.year >= 1920 && hc !== 'poor' && hc !== 'very_poor' && (!p.rural || p.wealthy) && clinicHere(p)
}
export function rehabExists(state) {
  const p = placeNow(state)
  return p.year >= 1950 && therapyExists(state) && (p.wealthy || p.comfortable)
}
export function gymExists(state) {
  const p = placeNow(state)
  return p.year >= 1960 && !p.rural && (p.wealthy || p.comfortable)
}
export function libraryHere(state) {
  const p = placeNow(state)
  return !p.rural || p.wealthy
}
export function adoptionExists(state) {
  const p = placeNow(state)
  return p.wealthy && p.year >= 1950 && institutionExists(p.name, p.year, 'clinic')
}
export function adoptionPrice(state) { return estimateCost(state, 15000) }
export function sterilisationExists(state) {
  const p = placeNow(state)
  return p.year >= 1960 && institutionExists(p.name, p.year, 'clinic')
}

/**
 * Whether one of the ACTIVITIES entries can be done here, now, by this person.
 * The activity's own `condition` and age band, plus the place: the panel reads
 * this to decide what to show, and the store reads it to decide what to allow,
 * so a button that does nothing is a button that is not there.
 */
export function activityOffered(state, id) {
  const hobby = (ACTIVITIES.hobbies ?? []).find(a => a.id === id)
  const G = buildG(state)
  const p = placeNow(state)
  if (hobby) {
    if (hobby.minAge && state.age < hobby.minAge) return false
    if (hobby.minYear && p.year < hobby.minYear) return false
    if (hobby.literate && G.literate === false) return false
    if (hobby.id === 'practice_coding' && !hasTech(p.c, 'personal_computer', p.year, { rural: p.rural, rich: p.comfortable })) return false
    if (['music_lesson', 'art_class'].includes(hobby.id) && p.rural && !p.wealthy) return false
    if (hobby.id === 'writing_workshop' && !(p.wealthy && !p.rural && p.year >= 1950)) return false
    return true
  }
  const all = ['mind', 'body', 'social', 'money', 'extracurricular', 'appearance'].flatMap(k => ACTIVITIES[k] ?? [])
  const a = all.find(x => x.id === id)
  if (!a) return false
  if (a.minAge && state.age < a.minAge) return false
  if (a.maxAge && state.age > a.maxAge) return false
  if (a.minYear && p.year < a.minYear) return false
  if (a.condition && !a.condition(G)) return false
  const gate = PLACE_GATES[id]
  if (gate && !gate(state, p)) return false
  return true
}

// What each activity needs to exist where the character is. The activity's own
// `condition` says whether it applies to this person; this says whether the
// thing it names was there.
const PLACE_GATES = {
  gym: (s) => gymExists(s),
  library: (s) => libraryHere(s),
  online_course: (s, p) => hasTech(p.c, 'home_internet', p.year, { rural: p.rural }),
  book_therapy: (s) => therapyExists(s),
  therapy: (s) => therapyExists(s),
  rehab: (s) => rehabExists(s),
  sterilization: (s) => sterilisationExists(s),
  doctor: (s, p) => clinicHere(p),
  dentist: (s, p) => p.year >= 1930 && (p.wealthy || !p.rural) && clinicHere(p),
  optometrist: (s, p) => p.year >= 1950 && p.wealthy,
  therapy_body: (s, p) => p.year >= 1950 && p.wealthy && clinicHere(p),
  treat_sti: (s, p) => clinicHere(p) && p.year >= 1945,
  yoga: (s, p) => p.year >= 1970 && (p.wealthy || ['India', 'Nepal', 'Sri Lanka'].includes(p.name)),
  diet: (s, p) => p.wealthy || p.comfortable || !p.rural,
  gardening: (s, p) => !p.rural || p.wealthy,
  join_sports_team: (s, p) => !p.rural || p.year >= 1950,
  invest_stocks: (s, p) => stockMarketOpen(p.c, p.year) && (s.money ?? 0) >= estimateCost(s, 500),
  take_loan: (s, p) => p.wealthy || p.comfortable || s.banked === true,
  lottery: (s) => lotteryExists(s),
  casino_blackjack: (s) => casinoOpen(s),
  casino_slots: (s) => casinoOpen(s) && s.currentYear >= 1935,
  casino_roulette: (s) => casinoOpen(s),
  networking: (s, p) => !p.rural && !!s.career,
  get_tattoo: (s, p) => p.year >= 1950 && !p.rural,
  personal_stylist: (s, p) => p.wealthy && p.comfortable && !p.rural,
  chess_tournament: (s, p) => !p.rural,
  mentor_young: (s) => !!s.career || !!s.mem?.retiredFrom,
}
export { exitClosed }

/**
 * What a successful crime pays, here, this year — the same draw attemptCrime
 * makes: the crime's present-day estimate, priced like local goods where the
 * character lives, in the money of the year.
 */
export function crimeHaul(state, crime) {
  if (!(crime?.incomeEstimate > 0)) return 0
  return estimateCost(state, Math.round(crime.incomeEstimate * (0.4 + Math.random() * 0.9)))
}

// ── Hardship ────────────────────────────────────────────────────────────────

const PAYDAY_FROM = { 'United States': 1993, 'United Kingdom': 2005, Canada: 2000, Australia: 2000 }
/**
 * Money now, more later. A "payday loan, 400% APR" is an American and British
 * product of the 1990s and 2000s; everywhere else, and before, the same need
 * met a moneylender, at terms just as hard and phrased differently.
 */
export function paydayOffer(state) {
  const p = placeNow(state)
  const receive = estimateCost(state, 300)
  const payday = PAYDAY_FROM[p.name] != null && p.year >= PAYDAY_FROM[p.name]
  if (payday) {
    const owe = Math.round(receive * 1.4)
    return {
      label: 'Take a payday loan', receive, owe,
      desc: 'Cash today. Two-fifths more by the next pay cheque, and more again if it is late.',
      text: `You take a payday loan of $${receive.toLocaleString()}. By the next pay cheque you will owe $${owe.toLocaleString()}.`,
    }
  }
  const owe = Math.round(receive * 1.5)
  return {
    label: 'Borrow from a moneylender', receive, owe,
    desc: p.rural ? 'Half as much again, by the harvest.' : 'Half as much again, by the end of the month after next.',
    text: `The moneylender counts out $${receive.toLocaleString()} twice and writes your name in a book. It will be $${owe.toLocaleString()} when he comes back for it.`,
  }
}

// Where the state paid something to a person with nothing, and since when.
const WELFARE_FROM = {
  'United Kingdom': 1948, 'United States': 1935, Germany: 1949, France: 1945, Sweden: 1934, Norway: 1938,
  Denmark: 1933, Finland: 1956, Netherlands: 1965, Belgium: 1944, Austria: 1950, Switzerland: 1950,
  Ireland: 1952, Canada: 1940, Australia: 1945, 'New Zealand': 1938, Japan: 1950, Iceland: 1950,
  Israel: 1954, 'South Korea': 2000, Italy: 1990, Spain: 1990, Portugal: 1996, Czechia: 1991,
  'Czech Republic': 1991, Slovenia: 1992, Estonia: 1995, Poland: 1990, 'South Africa': 1994,
}
export function benefitsOffer(state) {
  const p = placeNow(state)
  const from = WELFARE_FROM[p.name]
  if (from == null || p.year < from) return null
  if (!['citizen', 'permanent_resident', 'refugee_status'].includes(state.residencyStatus ?? 'citizen')) return null
  return { payment: estimateCost(state, 400), threshold: estimateCost(state, 500) }
}
/** Personal bankruptcy as a court remedy, where there is one. Mirrors `dischargeable` in tick. */
export function bankruptcyOpen(state) {
  const c = liveCountry(state)
  if (!['very_high', 'high'].includes(c?.gdp) || state.currentYear < 1970) return false
  return (state.debt ?? 0) >= estimateCost(state, 8000) && (state.money ?? 0) < estimateCost(state, 500)
}

// ─── Activity system ──────────────────────────────────────────────────────────


export function applyActivity(state, activityId) {
  // A verb that is not offered here does nothing, and says nothing; the panel
  // does not show it. Before this, seven activities (the doctor at 35, quitting
  // a habit you did not have, the physiotherapist for a healthy back) were
  // offered and silently returned the state unchanged.
  if (!activityOffered(state, activityId)) return state
  // ── Hobby practice activities ────────────────────────────────────────────────
  const hobbyActivity = (ACTIVITIES.hobbies ?? []).find(a => a.id === activityId)
  if (hobbyActivity) {
    if (hobbyActivity.literate && buildG(state).literate === false) return state
    let updated = { ...state }
    const cost = $$(hobbyActivity.cost ?? 0, state)
    if (cost > 0 && (updated.money ?? 0) < cost) {
      return { ...updated, log: [...updated.log, { age: updated.age, text: `You can't afford the ${hobbyActivity.label} ($${cost}).`, isKey: false }] }
    }
    updated.money = (updated.money ?? 0) - cost
    // Progress the hobby
    const current = updated.hobbies?.[hobbyActivity.hobbyId] ?? 0
    updated.hobbies = { ...(updated.hobbies ?? {}), [hobbyActivity.hobbyId]: Math.min(100, current + hobbyActivity.delta) }
    // Store primary hobby in mem if not set
    if (!updated.mem?.primaryHobby) updated.mem = { ...(updated.mem ?? {}), primaryHobby: hobbyActivity.hobbyId }
    // Increment per-hobby activity counter so story events can fire at thresholds
    const _countKey = `actCount_${hobbyActivity.hobbyId}`
    updated.mem = { ...(updated.mem ?? {}), [_countKey]: ((updated.mem ?? {})[_countKey] ?? 0) + 1 }
    // Apply stat bonuses
    const b = hobbyActivity.statBonus ?? {}
    const s = updated.stats
    // `s` is charisma everywhere else in the effect vocabulary, and this line
    // was adding it to looks — so the only activity that grants it, training a
    // sport, made the character better-looking rather than better with people.
    // `earnedGain` for the same reason it exists in applyProxy: a player who
    // studies every year for fifty years had smarts pinned at 100 by thirty.
    updated.stats = {
      ...s,
      happiness: Math.min(100, (s.happiness ?? 80) + (b.m ?? 0)),
      health:    Math.min(100, (s.health    ?? 80) + (b.h ?? 0)),
      smarts:    Math.round(Math.min(100, (s.smarts   ?? 50) + earnedGain(s.smarts ?? 50, b.e ?? 0))),
      charisma:  Math.round(Math.min(100, (s.charisma ?? 50) + earnedGain(s.charisma ?? 50, b.s ?? 0))),
      looks:     Math.min(100, (s.looks     ?? 50) + (b.lo ?? 0)),
    }
    const newLevel = updated.hobbies[hobbyActivity.hobbyId]
    const _hobbyProse = {
      music:    ['You play for a while.', 'The practice session runs longer than you planned.', 'Something in a passage clicks that didn\'t last time.', 'You work through the same difficult section several times.'],
      art:      ['You work on something for an hour or two.', 'The piece goes somewhere you didn\'t expect.', 'You discard what you started and begin again.', 'A version of it comes together.'],
      writing:  ['You write.', 'The pages accumulate.', 'You work through a passage that has been resisting you.', 'The words come more easily today.'],
      cooking:  ['You try a new dish.', 'The kitchen smells like something is working.', 'You adjust the recipe until it tastes right.', 'You cook for a while, attentively.'],
      coding:   ['You build something small.', 'You debug something that has been broken for days.', 'A piece of logic clicks into place.', 'You write code for a few hours.'],
      sport:    ['You train.', 'The run is harder than last time and that is the point.', 'You push past where you usually stop.', 'The body does what you ask of it.'],
      reading:  ['You read.', 'A chapter turns into several.', 'You sit with the book longer than you meant to.', 'You finish a section and think about it for a while.'],
      meditation: ['You sit with it.', 'The practice goes quietly.', 'The mind settles, eventually.', 'Fifteen minutes that are harder and more useful than they look.'],
    }
    const _prosePool = _hobbyProse[hobbyActivity.hobbyId] ?? [`You spend time on ${hobbyActivity.hobbyId}.`]
    const _fresh = preferUnsaid(updated, _prosePool)
    const _proseLine = _fresh[Math.floor(Math.random() * _fresh.length)]
    updated.log = [...updated.log, { age: updated.age, text: _proseLine, isKey: false }]
    updated.mem = rememberSaid(updated.mem ?? {}, _proseLine)
    updated.actionsThisYear = (updated.actionsThisYear ?? 0) + 1
    return updated
  }

  // ── Therapy booking ──────────────────────────────────────────────────────────
  if (activityId === 'book_therapy') {
    // There is nobody to book where the health system has no one trained in
    // it, which is the same sentence the diagnosis prints there. Costs nothing
    // and no action, because nothing happened.
    const hc = healthcareAt(liveCountry(state), state.currentYear)
    if (hc === 'poor' || hc === 'very_poor' || state.currentYear < 1920) {
      return { ...state, log: [...state.log, { age: state.age, isKey: false, text: pickFrom(preferUnsaid(state, [
        'There is nobody here who does this. You ask, and the answer is a pastor, an imam, an aunt, or a doctor in the capital who does something else.',
        'You look for someone to talk to in that way and there is no such person within any distance you could travel.',
      ])) }] }
    }
    const cost = estimateCost(state, 120)
    if ((state.money ?? 0) < cost) {
      return { ...state, log: [...state.log, { age: state.age, text: "You can't afford therapy right now.", isKey: false }] }
    }
    let updated = { ...state }
    updated.money = (updated.money ?? 0) - cost
    updated.mentalHealth = {
      ...(updated.mentalHealth ?? {}),
      therapy: true,
      condition: updated.mentalHealth?.condition ?? null,
    }
    const happyBoost = updated.mentalHealth?.condition ? 6 : 4
    updated.stats = { ...updated.stats, happiness: Math.min(100, updated.stats.happiness + happyBoost) }
    updated = { ...updated, ...sayFresh(updated, [
      'You sit in a room with somebody whose job is to listen, and say a thing you have not said before.',
      'The session is mostly silence and one sentence. The sentence is the one you take home.',
      'You go every week for a season. Nothing dramatic happens, which you are told is how it works.',
    ]) }
    updated.actionsThisYear = (updated.actionsThisYear ?? 0) + 1
    return updated
  }

  // ── Debt management ──────────────────────────────────────────────────────────
  if (activityId === 'pay_debt') {
    if (!state.debt || state.debt <= 0) {
      return { ...state, log: [...state.log, { age: state.age, text: 'You have no debt to pay off.', isKey: false }] }
    }
    // The floor was a nominal 500 — most of a year's wage in 1950 Lagos, a bad
    // evening in 2020 Stockholm.
    const payment = Math.min(state.debt, Math.max(estimateCost(state, 500), Math.round((state.money ?? 0) * 0.1)))
    if (payment <= 0 || (state.money ?? 0) < payment) {
      return { ...state, log: [...state.log, { age: state.age, text: "You don't have enough to make an extra payment.", isKey: false }] }
    }
    let updated = { ...state }
    updated.money = (updated.money ?? 0) - payment
    updated.debt = Math.max(0, updated.debt - payment)
    updated.log = [...updated.log, { age: updated.age, text: `You pay $${payment.toLocaleString()} off your debt. Remaining: $${updated.debt.toLocaleString()}.`, isKey: false }]
    updated.actionsThisYear = (updated.actionsThisYear ?? 0) + 1
    return updated
  }

  if (activityId === 'take_loan') {
    let updated = { ...state }
    if (!activityOffered(state, 'take_loan')) return state
    const maxLoan = Math.max(estimateCost(state, 1000), Math.round(Math.max(0, updated.money ?? 0) * 3 + estimateCost(state, 5000)))
    const amount = Math.min(maxLoan, estimateCost(state, 10000))
    updated.money = (updated.money ?? 0) + amount
    updated.debt = (updated.debt ?? 0) + amount
    updated.mem = { ...(updated.mem ?? {}), debtType: 'personal' }
    updated.log = [...updated.log, { age: updated.age, text: `You borrow $${amount.toLocaleString()} at 18% annual interest.`, isKey: false }]
    updated.actionsThisYear = (updated.actionsThisYear ?? 0) + 1
    return updated
  }

  // ── ROSCA joining ────────────────────────────────────────────────────────────
  if (activityId === 'join_rosca') {
    if (state.rosca) return { ...state, log: [...state.log, { age: state.age, text: 'You are already part of a savings circle.', isKey: false }] }
    if (!activityOffered(state, 'join_rosca')) return state
    const gdp = gdpTierOf(state)
    const mult = GDP_MULT[gdp] ?? 0.1
    const cycleLength = 10
    const monthlyContribution = Math.max(1, $$(Math.max(3, Math.round(50 * mult)), state))
    const joinFee = monthlyContribution * 2
    if ((state.money ?? 0) < joinFee) return { ...state, log: [...state.log, { age: state.age, text: `You can't afford the joining fee ($${joinFee}).`, isKey: false }] }
    const position = Math.ceil(Math.random() * cycleLength)
    const nextPayoutYear = state.currentYear + position
    const updated = {
      ...state,
      money: (state.money ?? 0) - joinFee,
      rosca: { monthlyContribution, cycleLength, cyclePosition: position, nextPayoutYear },
      flags: [...new Set([...state.flags, 'rosca_member'])],
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    }
    updated.log = [...updated.log, { age: updated.age, text: `You join a savings circle — ${cycleLength} members, $${monthlyContribution}/month. Your payout year: ${nextPayoutYear}.`, isKey: true }]
    return updated
  }

  if (activityId === 'leave_rosca') {
    if (!state.rosca) return { ...state, log: [...state.log, { age: state.age, text: 'You are not in a savings circle.', isKey: false }] }
    return {
      ...state,
      rosca: null,
      flags: state.flags.filter(f => f !== 'rosca_member'),
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      log: [...state.log, { age: state.age, text: 'You leave the savings circle. You lose your place in the rotation.', isKey: false }],
    }
  }

  // ── Buy / sell gold ──────────────────────────────────────────────────────────
  if (activityId === 'buy_gold') {
    const gdp = gdpTierOf(state)
    const mult = GDP_MULT[gdp] ?? 0.2
    const amount = $$(Math.round(200 * mult), state)
    if ((state.money ?? 0) < amount) return { ...state, log: [...state.log, { age: state.age, text: `You can't afford to buy gold right now ($${amount} needed).`, isKey: false }] }
    return {
      ...state,
      money: (state.money ?? 0) - amount,
      gold: (state.gold ?? 0) + amount,
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      log: [...state.log, { age: state.age, text: `You convert $${amount.toLocaleString()} into gold. A tangible store of value.`, isKey: false }],
    }
  }

  if (activityId === 'sell_gold') {
    const gold = state.gold ?? 0
    if (gold <= 0) return { ...state, log: [...state.log, { age: state.age, text: 'You have no gold to sell.', isKey: false }] }
    const sellAmount = Math.round(gold * 0.92) // small transaction cost
    return {
      ...state,
      money: (state.money ?? 0) + sellAmount,
      gold: 0,
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      log: [...state.log, { age: state.age, text: `You sell your gold for $${sellAmount.toLocaleString()}.`, isKey: false }],
    }
  }

  // ── Standard activities ──────────────────────────────────────────────────────
  const allActivities = [
    ...(ACTIVITIES.mind ?? []),
    ...(ACTIVITIES.body ?? []),
    ...(ACTIVITIES.social ?? []),
    ...(ACTIVITIES.money ?? []),
    ...(ACTIVITIES.extracurricular ?? []),
    ...(ACTIVITIES.appearance ?? []),
  ]
  const activity = allActivities.find(a => a.id === activityId)
  if (!activity) return state

  const G = buildG(state)
  if (activity.condition && !activity.condition(G)) return state
  if (activity.minAge && state.age < activity.minAge) return state
  if (activity.maxAge && state.age > activity.maxAge) return state

  const proxy = buildEffectProxy(state)
  // Deduct actual money for activities with a dollar cost
  if (activity.cost) proxy.moNominal -= $$(localCost(activity.cost, gdpTierOf(state)), state)
  activity.effect(proxy)
  let updated = applyProxy(state, proxy)
  updated = resolveProxyExtras(updated, proxy)

  // Fitness bonuses for physical activities
  const fitnessGain = activityId === 'gym' ? 5 : activityId === 'walk' ? 2 : activityId === 'join_sports_team' ? 8 : 0
  if (fitnessGain > 0) {
    updated = { ...updated, fitness: clamp((updated.fitness ?? 50) + fitnessGain, 0, 100) }
  }

  updated.actionsThisYear = state.actionsThisYear + 1
  // An activity chosen every year used to print the same sentence every year.
  // Once its own line has been said, the habit speaks instead.
  let activityLogText = typeof activity.prose === 'function' ? activity.prose(G) : activity.outcome
  if (activityLogText && hasSaid(updated, activityLogText)) {
    const category = Object.keys(ACTIVITIES).find(k => (ACTIVITIES[k] ?? []).some(a => a.id === activityId))
    const pool = habitLines(activityId, category, G)
    if (pool?.length) {
      const fresh = preferUnsaid(updated, pool)
      activityLogText = fresh[Math.floor(Math.random() * fresh.length)]
    }
  }
  updated.log = [...updated.log, { age: state.age, text: activityLogText, isKey: false }]
  updated.mem = rememberSaid(updated.mem ?? {}, activityLogText)

  // Track cumulative activity counts for flag generation in tick()
  const countKey = `act_count_${activityId}`
  updated.mem = { ...(updated.mem ?? {}), [countKey]: ((updated.mem?.[countKey] ?? 0) + 1) }

  return updated
}

// ─── Asset system ────────────────────────────────────────────────────────────

export function buyProperty(state, typeId) {
  if (state.age < 18) return state
  const offer = propertyOptions(state).find(t => t.id === typeId)
  if (!offer) return state
  // The price shown is the price charged: what this kind of house costs here,
  // this year. It used to be drawn at random across the type's range after the
  // panel had printed a different, fixed figure.
  const price = offer.price
  const downPayment = offer.deposit
  if ((state.money ?? 0) < downPayment) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford the down payment for a ${offer.name.toLowerCase()}.`, isKey: false }] }
  }
  const mortgage = price - downPayment
  const property = { typeId: offer.id, name: offer.name, purchasePrice: price, currentValue: price, mortgage }
  return {
    ...state,
    money: (state.money ?? 0) - downPayment,
    assets: { ...state.assets, properties: [...(state.assets?.properties ?? []), property] },
    flags: [...new Set([...state.flags, 'homeowner'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 8, 0, 100) },
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: `You buy ${/^[aeiou]/i.test(offer.name) ? 'an' : 'a'} ${offer.name.toLowerCase()} for $${price.toLocaleString()}. The deposit is $${downPayment.toLocaleString()}; the rest belongs to the bank for a long time.`, isKey: true }],
  }
}

export function sellProperty(state, propertyIdx) {
  const properties = state.assets?.properties ?? []
  const prop = properties[propertyIdx]
  if (!prop) return state
  const equity = prop.currentValue - (prop.mortgage ?? 0)
  const agentFee = Math.round(prop.currentValue * 0.025)
  const proceeds = Math.max(0, equity - agentFee)
  const newProperties = properties.filter((_, i) => i !== propertyIdx)
  return {
    ...state,
    money: (state.money ?? 0) + proceeds,
    assets: { ...state.assets, properties: newProperties },
    log: [...state.log, { age: state.age, text: `You sell your ${prop.name} for $${prop.currentValue.toLocaleString()}, netting $${proceeds.toLocaleString()} after fees and mortgage.`, isKey: true }],
  }
}

export function buyVehicle(state, typeId) {
  const type = VEHICLE_TYPES.find(t => t.id === typeId)
  if (!type) return state
  if (!state.licenceObtained && type.tier !== 'bicycle') {
    return { ...state, log: [...state.log, { age: state.age, text: "You need a driving licence first.", isKey: false }] }
  }
  const offer = vehicleOptions(state).find(t => t.id === typeId)
  if (!offer) return state
  // Vehicles are largely imported, so they do NOT scale down as far as housing.
  const price = offer.price
  const displayName = type.make ? `${type.make} ${type.model}` : type.name
  if ((state.money ?? 0) < price) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford a ${displayName}.`, isKey: false }] }
  }
  const happinessDelta = type.tier === 'supercar' ? 12 : type.tier === 'luxury_car' ? 8 : type.tier === 'watercraft' ? 10 : 4
  const vehicle = { typeId: type.id, tier: type.tier, name: displayName, purchasePrice: price, currentValue: price }
  const newFlags = state.flags.includes('has_vehicle') ? state.flags : [...state.flags, 'has_vehicle']
  return {
    ...state,
    money: (state.money ?? 0) - price,
    assets: { ...state.assets, vehicles: [...(state.assets?.vehicles ?? []), vehicle] },
    flags: newFlags,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + happinessDelta, 0, 100) },
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: `You buy a ${displayName} for $${price.toLocaleString()}.`, isKey: false }],
  }
}

export function sellVehicle(state, vehicleIdx) {
  const vehicles = state.assets?.vehicles ?? []
  const vehicle = vehicles[vehicleIdx]
  if (!vehicle) return state
  const newVehicles = vehicles.filter((_, i) => i !== vehicleIdx)
  return {
    ...state,
    money: (state.money ?? 0) + vehicle.currentValue,
    assets: { ...state.assets, vehicles: newVehicles },
    log: [...state.log, { age: state.age, text: `You sell your ${vehicle.name} for $${vehicle.currentValue.toLocaleString()}.`, isKey: false }],
  }
}

export function abandonChild(state, childIndex) {
  const child = state.children[childIndex]
  if (!child || child.alive === false) return state
  const updated = state.children.filter((_, i) => i !== childIndex)
  return {
    ...state,
    children: updated,
    flags: [...new Set([...state.flags, 'deadbeat_parent'])],
    regret: clamp(state.regret + 25, 0, 100),
    karma: clamp((state.karma ?? 50) - 20, 0, 100),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness - 15, 0, 100) },
    log: [...state.log, { age: state.age, text: `You abandon ${child.name.split(' ')[0]}. The weight of this will not leave you.`, isKey: true }],
  }
}

// ─── Pets ─────────────────────────────────────────────────────────────────────

const PET_NAMES = ['Buddy', 'Luna', 'Max', 'Bella', 'Charlie', 'Milo', 'Daisy', 'Rocky', 'Cleo', 'Oscar']

export function adoptPet(state, species) {
  if (state.age < 8) return state
  if (!petOptions(state).some(o => o.id === species)) return state
  const name = pickFrom(PET_NAMES)
  const adoptionCost = petFee(state, species)
  if ((state.money ?? 0) < adoptionCost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford the adoption fee.`, isKey: false }] }
  }
  const pet = { name, species, age: 0, alive: true }
  return {
    ...state,
    money: (state.money ?? 0) - adoptionCost,
    pets: [...(state.pets ?? []), pet],
    flags: [...new Set([...state.flags, 'pet_owner'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 8, 0, 100) },
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: `You take in a ${species} and call it ${name}.`, isKey: true }],
  }
}

export function visitVet(state, petIdx) {
  const pets = state.pets ?? []
  const pet = pets[petIdx]
  if (!pet?.alive) return state
  const cost = estimateCost(state, randomBetween(150, 600))
  if ((state.money ?? 0) < cost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford the vet bill right now.`, isKey: false }] }
  }
  return {
    ...state,
    money: (state.money ?? 0) - cost,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 3, 0, 100) },
    log: [...state.log, { age: state.age, text: `You take ${pet.name} to the vet. Cost: $${cost.toLocaleString()}.`, isKey: false }],
  }
}

// ─── Career actions (continued) ──────────────────────────────────────────────

export function workHarder(state) {
  if (!state.career) return state
  const gain = randomBetween(5, 14)
  return {
    ...state,
    career: { ...state.career, performance: clamp((state.career.performance ?? 70) + gain, 0, 100) },
    stats: { ...state.stats, health: clamp(state.stats.health - 3, 0, 100), happiness: clamp(state.stats.happiness - 2, 0, 100) },
    log: [...state.log, { age: state.age, text: `You put in extra hours. Performance improves. The body notices.`, isKey: false }],
  }
}

export function schmoozeBoss(state) {
  if (!state.career) return state
  const successChance = clamp(0.3 + (state.stats.charisma - 50) * 0.006, 0.1, 0.8)
  if (chance(successChance)) {
    const gain = randomBetween(8, 18)
    return {
      ...state,
      career: { ...state.career, performance: clamp((state.career.performance ?? 70) + gain, 0, 100) },
      stats: { ...state.stats, happiness: clamp(state.stats.happiness - 1, 0, 100) },
      log: [...state.log, { age: state.age, text: `Your charm lands. Your manager thinks well of you.`, isKey: false }],
    }
  }
  return {
    ...state,
    log: [...state.log, { age: state.age, text: `The schmoozing reads as transparent. No ground gained.`, isKey: false }],
  }
}

// Prices are quoted in a wealthy-country frame throughout the data files.
// Everything a character BUYS has to be converted into the economy they are
// actually living in, or a studio flat costs a Lagos teacher forty years of
// salary while the salary itself is already scaled down by GDP.
/**
 * What a listed price costs this character, here, this year.
 *
 * The engine charges `$$(localisePrice(base, tier, class), state)` — place and
 * era — and the panels printed `base` raw, so a Studio Flat showed $90,000 in
 * 1950 Germany against an engine price of $1,260, a factor of 71. Worse, the
 * `disabled` gates compared a NOMINAL balance to a present-day price, so
 * property, vehicles, travel, business and the dating app were falsely locked
 * for every character before about 2000 — the exact "the economy is a
 * statement about NOW" failure economy.js was written to fix, surviving in the
 * interface.
 *
 * One function, used by the display, the affordability check and the charge.
 */
/** A present-day figure in the money of this character's year and place. */
export function eraMoney(amount, state) { return $$(amount, state) }

export function estimatePrice(state, base, priceClass = 'local') {
  return $$(localisePrice(base, gdpTierOf(state), priceClass), state)
}

/** The same, for costs that are localised through `localCost` rather than price class. */
export function estimateCost(state, base) {
  return $$(localCost(base, gdpTierOf(state)), state)
}

function gdpTierOf(state) {
  return (state.currentCountry ?? state.character?.country)?.gdp
}

// ─── Life transitions ─────────────────────────────────────────────────────────

export function retire(state) {
  if (!state.career || state.retired) return state
  const pension = state.career ? Math.round(state.career.salary * 0.35) : 0
  return {
    ...state,
    career: null,
    // What they retired FROM. Both epitaph readers take `state.career`, and
    // nulling it here erased the working life from the death screen.
    mem: { ...(state.mem ?? {}), retiredFrom: { title: state.career.title, field: state.career.field, id: state.career.id } },
    retired: true,
    // Recorded so tick() can actually pay it — the promise used to be prose only.
    pensionAnnual: pension,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 10, 0, 100) },
    log: [...state.log, { age: state.age, text: `You retire.${pension > 0 ? ` You'll receive approximately $${pension.toLocaleString()}/yr in pension.` : ''}`, isKey: true }],
  }
}

// ─── Internal relocation ─────────────────────────────────────────────────────

export function relocate(state, destPlaceId, destNeighborhoodTier) {
  const destPlace = PLACES.find(p => p.id === destPlaceId)
  if (!destPlace) return state

  const fromPlace = state.currentPlace ?? state.character?.birthPlace
  if (fromPlace?.id === destPlace.id) return state

  const moveCost = $$(getRelocationCost(fromPlace, destPlace), state)
  if ((state.money ?? 0) < moveCost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You need $${moveCost.toLocaleString()} to move to ${destPlace.name}. You can't afford it right now.`, isKey: false }] }
  }

  const tier = destNeighborhoodTier ?? pickNeighborhoodTier(state.classTier ?? state.character?.wealthTier ?? 3)
  const nbrName = pickNamedNeighborhood(destPlace, tier, { ethnicity: state.character?.ethnicity, religion: state.religion ?? state.character?.religion, year: state.currentYear })
  const fromName = fromPlace?.name ?? (state.currentCountry ?? state.character?.country)?.name ?? 'where you were'

  const isSameCountry = destPlace.country === (state.currentCountry ?? state.character?.country)?.name

  const logText = isSameCountry
    ? `You move from ${fromName} to ${destPlace.name}${nbrName ? ` — ${nbrName}` : ''}. Moving costs $${moveCost.toLocaleString()}.`
    : `You move to ${destPlace.name}, ${destPlace.country}${nbrName ? ` — ${nbrName}` : ''}. Moving costs $${moveCost.toLocaleString()}.`

  return {
    ...state,
    currentPlace: destPlace,
    currentNeighborhoodTier: tier,
    currentNeighborhoodName: nbrName,
    money: Math.max(0, (state.money ?? 0) - moveCost),
    flags: [...new Set([...state.flags, 'relocated'])],
    queue: [...(state.queue ?? []), {
      id: `place_arrival_${destPlace.id}_${state.age}`,
      phase: null, cooldown: 0, when: null,
      text: buildArrivalText(fromPlace, destPlace, state),
      choices: null,
      effect: (p) => { p.m -= 3; p.s += 2 },
    }],
    log: [...state.log, { age: state.age, text: logText, isKey: true }],
  }
}

function buildArrivalText(fromPlace, toPlace, state) {
  const fromCity = fromPlace?.name ?? 'where you were'
  const toCity = toPlace.name
  const isUrbanArrival = ['urban', 'major_city', 'megacity'].includes(toPlace.type) || ['major_city', 'megacity', 'mid_city'].includes(toPlace.scale)
  const isRuralArrival = toPlace.type === 'rural'

  if (isUrbanArrival) {
    return `${toCity} is larger than anything you expected. The volume of it — the traffic, the crowds, the distances between things — takes adjustment. You learn the routes. You find where the cheap food is. You begin the work of making a new place ordinary.`
  }
  if (isRuralArrival) {
    return `The quiet of ${toCity} is the first thing. After ${fromCity}, the absence of constant sound is its own kind of sound. The pace is different here. The days have different shapes.`
  }
  return `${toCity} takes time to become familiar. The streets, the rhythms, the unwritten rules of who goes where. You are still learning which of these will become yours.`
}

/**
 * The places this character could think of going, with what each would cost
 * and on what paper they would arrive. One list, read by the panel and by the
 * verb, so the figure shown is the figure charged and a closed door is shown
 * as closed rather than as a price.
 */
export function emigrationOptions(state) {
  const year = state.currentYear
  const from = liveCountry(state)
  const closed = exitClosed(from, year, state)
  const opts = destinationsFor(state).map(name => emigrationQuote(state, name)).filter(Boolean)
  return { closed, options: opts.filter(o => o.open) }
}

export function emigrationQuote(state, destCountryName) {
  const year = state.currentYear
  const fromName = liveCountry(state)?.name
  const reached = destinationThen(destCountryName, year)
  const dest = reached ? COUNTRIES.find(c => c.name === reached) : null
  if (!dest) return null
  const route = entryRoute(state, dest.name)
  const rc = routeCost(fromName, dest.name, year, route)
  return {
    name: dest.name,
    display: getCountryDisplayName(dest, year),
    open: route.open,
    status: route.status ?? null,
    note: route.note,
    how: rc.how,
    cost: estimatePrice(state, rc.base, rc.priceClass),
  }
}

const RESIDENCY_WORDS = {
  citizen: 'as a citizen', permanent_resident: 'with the right to stay', work_visa: 'on a work permit',
  asylum_seeker: 'to ask for asylum', refugee_status: 'as a refugee', tourist_overstay: 'on a visitor\'s visa',
  undocumented: 'without papers',
}

export function emigrate(state, destCountryName, destPlaceId) {
  if (state.wanted) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You are wanted, and the border is the one place they will certainly look. If you go, it will have to be another way.', isKey: false }] }
  }
  const quote = emigrationQuote(state, destCountryName)
  if (!quote) return state
  const dest = COUNTRIES.find(c => c.name === quote.name)
  const alreadyAbroad = state.flags.includes('emigrated')
  const here = liveCountry(state)
  if (here?.name === dest.name) return state
  const year = state.currentYear
  const goingHome = dest.name === state.character?.country?.name
  // Leaving was the state's to grant for a third of the century. Nothing is
  // spent and nothing moves; the sentence says why.
  const shut = goingHome ? null : exitClosed(here, year, state)
  if (shut) return { ...state, log: [...state.log, { age: state.age, text: shut, isKey: false }] }
  if (!quote.open) return { ...state, log: [...state.log, { age: state.age, text: quote.note, isKey: false }] }

  const moveCost = quote.cost
  const internal = destinationThen(here?.name, year) === destinationThen(dest.name, year) && here?.name !== dest.name
  const fromName = getCountryDisplayName(here, year) ?? state.character?.country?.name

  // Pick destination place: explicit placeId > largest city in dest country > null
  let destPlace = null
  if (destPlaceId) {
    destPlace = PLACES.find(p => p.id === destPlaceId) ?? null
  }
  if (!destPlace) {
    const destPlaces = getPlacesForCountry(dest.name)
    // Pick the largest city as default immigration destination
    const scaleOrder = ['megacity', 'major_city', 'mid_city', 'town', 'village']
    for (const scale of scaleOrder) {
      const match = destPlaces.find(p => p.scale === scale)
      if (match) { destPlace = match; break }
    }
    if (!destPlace && destPlaces.length) destPlace = destPlaces[0]
  }

  const destTier = pickNeighborhoodTier(state.classTier ?? state.character?.wealthTier ?? 2)
  const destNbr = destPlace ? pickNamedNeighborhood(destPlace, destTier, { ethnicity: state.character?.ethnicity, religion: state.religion ?? state.character?.religion, year: state.currentYear }) : null

  // A bill you cannot pay does not stop existing. The move was charged through
  // Math.max(0, ...), so a Lagos man holding nothing emigrated to London on a
  // $8,263 ticket that evaporated. Most people who have made this journey
  // borrowed for it; the part that was not in hand is owed.
  const shortfall = Math.max(0, moveCost - Math.max(0, state.money ?? 0))
  const borrowed = shortfall > 0 ? ` $${shortfall.toLocaleString()} of it is borrowed.` : ''
  const isRefugee = state.flags.includes('refugee') || state.flags.includes('displaced')
  const status = isRefugee && quote.status === 'asylum_seeker' ? 'asylum_seeker' : (quote.status ?? 'work_visa')
  const destLabel = quote.display
  const logText = goingHome
    ? `You go home to ${destLabel}${destPlace ? ` — ${destPlace.name}` : ''}, ${quote.how}. It costs $${moveCost.toLocaleString()}.${borrowed}`
    : alreadyAbroad
      ? `You move on from ${fromName} to ${destLabel}${destPlace ? ` — ${destPlace.name}` : ''}, ${quote.how}, ${RESIDENCY_WORDS[status] ?? ''}. It costs $${moveCost.toLocaleString()}.${borrowed}`
      : `You leave for ${destLabel}${destPlace ? ` — ${destPlace.name}` : ''}, ${quote.how}, ${RESIDENCY_WORDS[status] ?? ''}. It costs $${moveCost.toLocaleString()}.${borrowed}`

  // The work does not come with you. A Russian wholesale merchant on $629
  // became a Trading Company Owner on $43,054 the year after he landed in New
  // York, because the career crossed the border intact and was re-based to
  // American wages. Credentials, a language and a reference nobody can phone
  // stay behind; what is offered to a newcomer is what lifeCourse finds for
  // one. Inside one federation, a transfer is a transfer.
  let career = state.career
  let mem = { ...(state.mem ?? {}) }
  const log = [...state.log, { age: state.age, text: logText, isKey: true }]
  if (career && !internal && !goingHome) {
    mem = { ...mem, careerLeftBehind: { title: career.title, field: career.field, id: career.id, year }, lcLastCareer: undefined }
    log.push({ age: state.age, isKey: false, text: pickFrom([
      `What you were — ${career.title.toLowerCase()} — does not come through the airport with you. The papers say it in a language nobody here reads.`,
      `Nobody here has heard of the place that trained you. You are, for the purposes of every form, somebody starting.`,
      `The job stays behind with the address. What you can do here is what somebody will give a newcomer.`,
    ]) })
    career = null
  }

  return {
    ...state,
    currentCountry: dest,
    currentPlace: destPlace ?? state.currentPlace,
    currentNeighborhoodTier: destTier,
    currentNeighborhoodName: destNbr,
    residencyStatus: goingHome ? 'citizen' : internal ? (state.residencyStatus ?? 'citizen') : status,
    career,
    mem,
    money: Math.max(0, (state.money ?? 0) - moveCost),
    debt: Math.round((state.debt ?? 0) + shortfall),
    flags: goingHome ? state.flags : [...new Set([...state.flags, 'emigrated'])],
    // A move costs the year and the people. It did not make anybody cleverer:
    // a flat +5 smarts per move took a character to 100 in ten moves.
    stats: {
      ...state.stats,
      happiness: clamp(state.stats.happiness - (goingHome ? 4 : 10), 0, 100),
    },
    log,
  }
}

// ─── Residency upgrade ───────────────────────────────────────────────────────

const RESIDENCY_LADDER = {
  work_visa:          { next: 'permanent_resident', yearsRequired: 5,  fee: 3000  },
  permanent_resident: { next: 'citizen',            yearsRequired: 10, fee: 1500  },
  refugee_status:     { next: 'permanent_resident', yearsRequired: 3,  fee: 500   },
  asylum_seeker:      { next: 'refugee_status',     yearsRequired: 1,  fee: 0     },
  undocumented:       { next: 'work_visa',           yearsRequired: 0,  fee: 2000  },
  tourist_overstay:   { next: 'work_visa',           yearsRequired: 0,  fee: 2000  },
  climate_displaced:  { next: 'refugee_status',     yearsRequired: 2,  fee: 0     },
}

export function upgradeResidency(state) {
  const status = state.residencyStatus ?? 'citizen'
  const path = RESIDENCY_LADDER[status]
  if (!path) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You are already a citizen.', isKey: false }] }
  }
  const yearsAbroad = state.yearsAbroad ?? 0
  if (yearsAbroad < path.yearsRequired) {
    const rem = path.yearsRequired - yearsAbroad
    return { ...state, log: [...state.log, { age: state.age, text: `You need ${rem} more year${rem !== 1 ? 's' : ''} of residency before you can apply.`, isKey: false }] }
  }
  const fee = $$(path.fee, state)
  if ((state.money ?? 0) < fee) {
    return { ...state, log: [...state.log, { age: state.age, text: `The application fee is $${fee.toLocaleString()}. You can't afford it right now.`, isKey: false }] }
  }

  const hasSeriousCrime = (state.criminalRecord ?? []).some(r => {
    const c = typeof r === 'string' ? r : (r.crime ?? '')
    return /murder|assault|robbery|trafficking|terrorism|rape|manslaughter/i.test(c)
  })
  const hasCriminalRecord = (state.criminalRecord ?? []).length > 0
  let successChance = status === 'undocumented' || status === 'tourist_overstay' ? 0.35 : status === 'asylum_seeker' ? 0.55 : 0.75
  if (hasSeriousCrime) successChance *= 0.15
  else if (hasCriminalRecord) successChance *= 0.55
  if (Math.random() > successChance) {
    return {
      ...state,
      money: Math.max(0, (state.money ?? 0) - fee),
      log: [...state.log, { age: state.age, text: `Your application for ${path.next.replace(/_/g, ' ')} was rejected. The fee is gone. You can try again later.`, isKey: true }],
    }
  }

  const msgs = {
    permanent_resident: `After years of paperwork and waiting, permanent residency is granted. You now have the right to stay.`,
    citizen:            `The citizenship certificate arrives. You hold a passport with a different flag on the cover than the one you were born with.`,
    refugee_status:     `Your refugee status is officially recognised. You realise you had been holding your breath for years.`,
    work_visa:          `Your status is regularised. You are no longer invisible to the system.`,
  }

  return {
    ...state,
    residencyStatus: path.next,
    money: Math.max(0, (state.money ?? 0) - fee),
    flags: [...new Set([...state.flags, `achieved_${path.next}`])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 10, 0, 100) },
    log: [...state.log, { age: state.age, text: msgs[path.next] ?? `Status upgraded to ${path.next.replace(/_/g, ' ')}.`, isKey: true }],
  }
}

export function seekAsylum(state) {
  if (['citizen', 'permanent_resident'].includes(state.residencyStatus)) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You already have secure status here.', isKey: false }] }
  }
  if (state.residencyStatus === 'asylum_seeker' || state.residencyStatus === 'refugee_status') {
    return { ...state, log: [...state.log, { age: state.age, text: 'Your asylum application is already in progress.', isKey: false }] }
  }
  const isConflict = state.flags.some(f => ['war_childhood', 'displaced', 'persecution', 'genocide_survivor', 'revolution_generation', 'learned_silence'].includes(f))
  const accepted = Math.random() < (isConflict ? 0.65 : 0.35)
  const dest = state.currentCountry ?? state.character?.country
  return {
    ...state,
    residencyStatus: accepted ? 'refugee_status' : 'asylum_seeker',
    flags: [...new Set([...state.flags, 'sought_asylum', 'emigrated'])],
    currentCountry: dest,
    yearsAbroad: state.yearsAbroad ?? 0,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + (accepted ? 12 : -5), 0, 100) },
    log: [...state.log, {
      age: state.age,
      text: accepted
        ? `Your asylum claim is accepted. You have the right to remain in ${dest?.name}. The relief is physical.`
        : `You file for asylum in ${dest?.name}. The decision is pending. You enter a waiting period with no defined end.`,
      isKey: true,
    }],
  }
}

// ─── Sibling interaction ──────────────────────────────────────────────────────

export function callSibling(state, siblingIdx) {
  const siblings = state.siblings ?? []
  const sib = siblings[siblingIdx]
  if (!sib?.alive) return state
  const gain = randomBetween(3, 10)
  const updated = [...siblings]
  updated[siblingIdx] = { ...sib, relationshipQuality: clamp(sib.relationshipQuality + gain, 0, 100) }
  const h = habituated(state, 'sibling_call', 3)
  return {
    ...h.state,
    siblings: updated,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + h.gain, 0, 100) },
    ...sayFresh(h.state, [
      hasPhone(state) ? `You call ${sib.name}. It is a good conversation.` : `You go to see ${sib.name}. It is a good afternoon.`,
      `You and ${sib.name} fall into the old way of talking inside a minute, the one nobody else can follow.`,
      `${sib.name} remembers it differently. You let them.`,
      `You and ${sib.name} talk about your parents the way only the two of you can.`,
    ]),
  }
}

// ─── Child adoption ───────────────────────────────────────────────────────────

export function adoptChild(state) {
  if (state.age < 25 || state.age > 55) return state
  if (!adoptionExists(state)) return state
  const adoptionCost = adoptionPrice(state)
  if ((state.money ?? 0) < adoptionCost) {
    return { ...state, log: [...state.log, { age: state.age, text: `The adoption process requires funds you don't currently have.`, isKey: false }] }
  }
  const cGender = chance(0.5) ? 'male' : 'female'
  const c = childNameCountry(state)
  const childName = personName(c, cGender, state, { surname: childSurname(state) })
  const childAge = randomBetween(0, 8)
  const child = { name: childName, gender: cGender, ageAtBirth: state.age - childAge, relationshipQuality: 75, adopted: true }
  return {
    ...state,
    money: (state.money ?? 0) - adoptionCost,
    children: [...state.children, child],
    flags: [...new Set([...state.flags, 'parent', 'adoptive_parent'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 12, 0, 100) },
    log: [...state.log, { age: state.age, text: `You adopt ${childName}. Adoption costs: $${adoptionCost.toLocaleString()}.`, isKey: true }],
  }
}

// ─── Study harder ─────────────────────────────────────────────────────────────

export function studyHarder(state) {
  const gpaGain = parseFloat((Math.random() * 0.2 + 0.05).toFixed(2))
  const newGpa = Math.min(4.0, parseFloat(((state.gpa ?? 2.0) + gpaGain).toFixed(2)))
  return {
    ...state,
    gpa: newGpa,
    stats: { ...state.stats, smarts: clamp(state.stats.smarts + 3, 0, 100), happiness: clamp(state.stats.happiness - 3, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `You put in extra study hours. GPA: ${newGpa.toFixed(2)}.`, isKey: false }],
  }
}

// ─── Movie theater ────────────────────────────────────────────────────────────

export function goToMovies(state) {
  if (!cinemaAvailable(state)) return state
  const cost = estimateCost(state, randomBetween(15, 25))
  const y = state.currentYear
  const lines = y < 1955
    ? ['You go to the pictures. The newsreel first, then the film, the smoke going up through the projector light.',
       'A Saturday at the cinema. Everyone in the row laughs at the same moment and it is the best part.']
    : y < 1990
      ? ['You see a film. Afterwards the street is too bright and you walk home inside it a little longer.',
         'The cinema is full and somebody talks through the whole of it. The film is good anyway.']
      : ['You see a film. For two hours nobody can reach you.',
         'The film is not as good as everyone said, and you are glad you went.']
  return {
    ...state,
    money: Math.max(0, (state.money ?? 0) - cost),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 5, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    ...sayFresh(state, lines),
  }
}

// ─── Nightlife ────────────────────────────────────────────────────────────────

export function goClubbing(state) {
  if (!goingOutAvailable(state)) return state
  const cost = estimateCost(state, randomBetween(50, 120))
  const newFlags = [...state.flags]
  if (!newFlags.includes('heavy_drinker') && chance(0.15)) newFlags.push('heavy_drinker')
  if (newFlags.includes('heavy_drinker') && !newFlags.includes('alcohol_addiction') && chance(0.08)) newFlags.push('alcohol_addiction')
  const met = !livingPartner(state) && chance(0.2)
  let next = {
    ...state,
    money: Math.max(0, (state.money ?? 0) - cost),
    flags: [...new Set(newFlags)],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 8, 0, 100), health: clamp(state.stats.health - 2, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: (state.currentYear < 1965
      ? 'The dance hall on Saturday, the band too loud for talking, the walk home with your shoes in your hand.'
      : 'A night out that goes on longer than it should. The music is too loud to talk over, which is part of what it is for.') + (met ? ' Somebody talks to you at the end of it, and it does not feel like the end of it.' : ''), isKey: false }],
  }
  // Meeting someone does not refund the evening. This used to subtract the
  // action back out before handing off, so a night out that worked was free.
  if (met) next = meetPotentialPartner(next)
  return next
}

// ─── Shopping ────────────────────────────────────────────────────────────────

export function goShopping(state, category) {
  const offer = shoppingOptions(state).find(o => o.id === category)
  if (!offer) return state
  const opt = SHOPPING[category]
  const optCost = offer.cost
  if ((state.money ?? 0) < optCost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford that right now.", isKey: false }] }
  }
  const p = placeNow(state)
  const said = {
    clothes: p.wealthy || !p.rural
      ? ['You buy something new to wear and wear it out of the shop.', 'A new shirt, folded in paper. You put it on the next morning and feel it all day.']
      : ['The tailor measures you again, though he knows the numbers.', 'Cloth from the market, and a week to wait for the tailor.'],
    electronics: ['It comes home in its box and the household gathers round to watch it switched on.', 'You carry it home with both hands. It is the most expensive thing in the room.'],
    luxury: ['Something expensive, bought because it could be. You are not sure afterwards who it was for.', 'You buy the expensive thing. It is beautiful and it is in a drawer within the month.'],
  }[category]
  const said$ = said.map(t => `${t} It costs $${optCost.toLocaleString()}.`)
  return {
    ...state,
    money: (state.money ?? 0) - optCost,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + opt.happiness, 0, 100), looks: clamp(state.stats.looks + opt.looks, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    ...sayFresh(state, said$),
  }
}

// ─── Salon & Spa ──────────────────────────────────────────────────────────────

export function visitSalonSpa(state, service) {
  const offer = salonOptions(state).find(o => o.id === service)
  if (!offer) return state
  const svc = SALON[service]
  const svcCost = offer.cost
  if ((state.money ?? 0) < svcCost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford that right now.", isKey: false }] }
  }
  const p = placeNow(state)
  const said = {
    haircut: p.rural
      ? ['The barber talks the whole time and gets it right anyway.', 'A haircut under the awning, and the hair swept into the road.']
      : ['A haircut. For two days you catch yourself in shop windows.', 'The barber has opinions about everything and none about your hair, which is restful.'],
    hairdye: ['You colour your hair. For a week the mirror is a stranger who is getting easier to know.'],
    massage: ['Somebody works at your shoulders for an hour and you find out how long you have been holding them like that.'],
    facial: ['An hour under a warm towel. Your skin feels like somebody else\'s for the evening.'],
    manicure: ['Your hands look like they belong to somebody who does not use them, for about three days.'],
  }[service]
  return {
    ...state,
    money: (state.money ?? 0) - svcCost,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + svc.happiness, 0, 100), looks: clamp(state.stats.looks + svc.looks, 0, 100), health: clamp(state.stats.health + svc.health, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    ...sayFresh(state, said),
  }
}

// ─── Social media ─────────────────────────────────────────────────────────────

export function postSocialMedia(state) {
  const sm = state.socialMedia ?? { followers: 0, verified: false, genre: null }
  const famous = (state.fame ?? 0) > 20
  // Genre-based multipliers — niche audiences grow faster, mass-appeal grows big
  const genreBonus = {
    comedy: 1.3, gaming: 1.2, fitness: 1.1, lifestyle: 1.15,
    beauty: 1.1, music: 1.2, food: 1.1, politics: 0.85,
  }
  const mult = sm.genre ? (genreBonus[sm.genre] ?? 1.0) : 0.7
  const baseMin = famous ? 200 : sm.genre ? -50 : -100
  const baseMax = famous ? 5000 : sm.genre ? 400 : 300
  const charismaMult = 1 + (state.stats.charisma - 50) / 200
  const followerDelta = Math.round(randomBetween(baseMin, baseMax) * mult * charismaMult)
  const newFollowers = Math.max(0, sm.followers + followerDelta)
  const nowVerified = sm.verified || (newFollowers >= 100000 && (state.fame ?? 0) >= 25)
  const genreLabel = sm.genre ? ` (${sm.genre})` : ''
  return {
    ...state,
    socialMedia: { ...sm, followers: newFollowers, verified: nowVerified },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, {
      age: state.age,
      text: followerDelta > 0
        ? `Your${genreLabel} post gets traction. Followers: ${newFollowers.toLocaleString()}.${nowVerified && !sm.verified ? ' The account is verified now.' : ''}`
        : sm.genre
          ? `Your${genreLabel} post underperforms. Followers: ${newFollowers.toLocaleString()}.`
          : `Your post flops — try picking a niche. Followers: ${newFollowers.toLocaleString()}.`,
      isKey: nowVerified && !sm.verified,
    }],
  }
}

export function promoteSocialMedia(state) {
  const sm = state.socialMedia ?? { followers: 0, verified: false, genre: null }
  if (sm.followers < 5000) {
    return { ...state, log: [...state.log, { age: state.age, text: "You need more followers before brands will work with you.", isKey: false }] }
  }
  const income = Math.round(sm.followers * randomBetween(1, 5) / 100)
  const followerRisk = chance(0.3) ? -randomBetween(100, 2000) : randomBetween(0, 500)
  const newFollowers = Math.max(0, sm.followers + followerRisk)
  return {
    ...state,
    money: (state.money ?? 0) + income,
    socialMedia: { ...sm, followers: newFollowers },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, {
      age: state.age,
      text: followerRisk < 0
        ? `The sponsored post alienates some followers. You earn $${income.toLocaleString()} but lose ${Math.abs(followerRisk).toLocaleString()} followers.`
        : `The sponsored post lands well. You earn $${income.toLocaleString()}.`,
      isKey: income > 10000,
    }],
  }
}

// ─── Race tracks ─────────────────────────────────────────────────────────────

// The race card was "Thunderhooves", "Lucky Lightning" and "Iron Maiden", bet
// on from a button with a slot-machine on it, at fixed stakes of $50 to $1,000
// whatever the year — a 1981 farm hand with $0 was offered a thousand-dollar
// bet. The names are plain now, the stakes are the local price of a small, a
// real and a foolish bet, and the tote keeps its share.
export const HORSE_NAMES = [
  'Northern Light', 'Small Hours', 'Harbour Wall', 'Late Frost', 'Dry Season',
  'Second Thoughts', 'Kettle Drum', 'Long Division', 'Market Day', 'Quiet Street',
  'Tin Roof', 'Far Field', 'Morning Tide', 'Old Bridge', 'Half Measure',
]

export function raceCard(state) {
  // The same five names for the whole afternoon, different afternoon to afternoon.
  const seed = (state.currentYear ?? 0) * 7 + (state.age ?? 0)
  return Array.from({ length: 5 }, (_, i) => HORSE_NAMES[(seed + i * 4) % HORSE_NAMES.length])
}

export function betOnHorses(state, horseIdx, stakeIdx) {
  if (!racecourseOpen(state) || state.age < 18) return state
  const stakes = raceStakes(state)
  const bet = stakes[Math.max(0, Math.min(stakes.length - 1, stakeIdx ?? 0))]
  if ((state.money ?? 0) < bet) {
    return { ...state, log: [...state.log, { age: state.age, text: "You don't have enough to place that bet.", isKey: false }] }
  }
  const raceHorses = raceCard(state)
  const winner = randomBetween(0, 4)
  const won = winner === horseIdx
  // Five runners at 4 to 1: the tote's cut is the fifth that a fair book would pay.
  const payout = won ? bet * 4 : 0
  const net = payout - bet
  const newFlags = [...state.flags]
  if (!newFlags.includes('gambler')) newFlags.push('gambler')
  if (!newFlags.includes('gambling_addiction') && chance(0.06)) newFlags.push('gambling_addiction')
  return {
    ...state,
    money: (state.money ?? 0) + net,
    flags: [...new Set(newFlags)],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + (won ? 8 : -3), 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    mem: { ...state.mem, lastRaceHorses: raceHorses, lastRaceWinner: winner },
    log: [...state.log, {
      age: state.age,
      text: won
        ? `${raceHorses[horseIdx]} comes home first by a neck. You collect $${payout.toLocaleString()} at the window and do not look anybody in the eye.`
        : `${raceHorses[winner]} wins. ${raceHorses[horseIdx]} is somewhere in the pack. The slip goes on the ground with the others.`,
      isKey: false,
    }],
  }
}

// ─── Rehab ────────────────────────────────────────────────────────────────────

export function goToRehab(state) {
  const addictions = ['alcohol_addiction', 'gambling_addiction', 'drug_addiction'].filter(f => state.flags.includes(f))
  if (addictions.length === 0) {
    return { ...state, log: [...state.log, { age: state.age, text: "You don't have any active addictions to treat.", isKey: false }] }
  }
  if (!rehabExists(state)) return state
  const cost = $$(localCost(randomBetween(5000, 25000), gdpTierOf(state)), state)
  if ((state.money ?? 0) < cost) {
    return { ...state, log: [...state.log, { age: state.age, text: `Rehab would cost about $${cost.toLocaleString()}. You can't afford it right now.`, isKey: false }] }
  }
  const newFlags = state.flags.filter(f => !addictions.includes(f))
  return {
    ...state,
    money: (state.money ?? 0) - cost,
    flags: [...new Set([...newFlags, 'rehab_graduate', 'in_recovery'])],
    mem: { ...(state.mem ?? {}), recoveryStartYear: state.currentYear },
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 12, 0, 100), health: clamp(state.stats.health + 8, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `Six weeks in a place with a schedule on the wall and no locks on the doors. It costs $${cost.toLocaleString()}. You come out clear-headed and frightened of how easy the old way would be.`, isKey: true }],
  }
}

// ─── Birth control ────────────────────────────────────────────────────────────

export function toggleBirthControl(state) {
  const current = state.birthControl ?? false
  return {
    ...state,
    birthControl: !current,
    log: [...state.log, { age: state.age, text: !current ? 'You start using birth control.' : 'You stop using birth control.', isKey: false }],
  }
}

export function useSubstance(state, substance) {
  const opts = {
    alcohol:  { cost: 30,  hDelta: -3, mDelta: 8,  addFlag: 'heavy_drinker',    addictionFlag: 'alcohol_addiction', addictChance: 0.08 },
    cannabis: { cost: 40,  hDelta: -2, mDelta: 7,  addFlag: 'drug_user',        addictionFlag: 'drug_addiction',    addictChance: 0.06 },
    cocaine:  { cost: 200, hDelta: -5, mDelta: 12, addFlag: 'substance_abuser', addictionFlag: 'drug_addiction',    addictChance: 0.18 },
    heroin:   { cost: 150, hDelta: -8, mDelta: 10, addFlag: 'substance_abuser', addictionFlag: 'drug_addiction',    addictChance: 0.30 },
    pills:    { cost: 60,  hDelta: -4, mDelta: 9,  addFlag: 'drug_user',        addictionFlag: 'drug_addiction',    addictChance: 0.12 },
  }
  const opt = opts[substance]
  if (!opt) return state
  if (!substanceOptions(state).some(o => o.id === substance)) return state
  const optCost = substancePrice(state, substance)
  if ((state.money ?? 0) < optCost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford that right now.", isKey: false }] }
  }
  const newFlags = [...state.flags]
  if (!newFlags.includes(opt.addFlag)) newFlags.push(opt.addFlag)
  if (!newFlags.includes(opt.addictionFlag) && chance(opt.addictChance + (newFlags.includes(opt.addFlag) ? 0.05 : 0))) {
    newFlags.push(opt.addictionFlag)
  }
  // Track use count for addiction stage display
  const substKey = ['alcohol'].includes(substance) ? 'alcoholUses' : 'drugUses'
  const newUses = (state.mem?.[substKey] ?? 0) + 1
  const newMem = { ...state.mem, [substKey]: newUses }
  // Overdose risk for hard drugs
  const overdoseRisk = { heroin: 0.06, cocaine: 0.03, pills: 0.02 }[substance] ?? 0
  if (chance(overdoseRisk)) {
    return {
      ...state,
      money: Math.max(0, (state.money ?? 0) - optCost),
      flags: [...new Set([...newFlags, 'overdosed'])],
      mem: newMem,
      stats: { ...state.stats, health: clamp(state.stats.health - 25, 0, 100), happiness: clamp(state.stats.happiness - 10, 0, 100) },
      actionsThisYear: state.actionsThisYear + 1,
      log: [...state.log, { age: state.age, text: `You overdose on ${substance}. Someone finds you in time. Barely.`, isKey: true }],
    }
  }
  return {
    ...state,
    money: Math.max(0, (state.money ?? 0) - optCost),
    flags: [...new Set(newFlags)],
    mem: newMem,
    stats: { ...state.stats, health: clamp(state.stats.health + opt.hDelta, 0, 100), happiness: clamp(state.stats.happiness + opt.mDelta, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    ...sayFresh({ ...state, mem: newMem }, {
      alcohol: ['You drink until the evening goes soft at the edges.', 'A drink, and then the one after it, which is the one you wanted.'],
      cannabis: ['Something is passed round and you take it. The room slows down and gets funnier.', 'You smoke, and for an hour nothing needs doing.'],
      pills: ['The pills take the edges off the day, and then off the next one.'],
      cocaine: ['For an hour you are the most interesting person you have ever met. Then you want more of it.'],
      heroin: ['It is the warmest you have ever been. That is the problem, and you know it is.'],
    }[substance] ?? [`You use ${substance}.`]),
  }
}

// ─── Martial arts ─────────────────────────────────────────────────────────────

const BELT_NAMES = ['white', 'yellow', 'orange', 'green', 'blue', 'purple', 'red', 'brown', 'black']

const BELTED = new Set(['Judo', 'Karate', 'Taekwondo', 'Brazilian Jiu-Jitsu', 'Jiu-Jitsu'])
export function practiceMartalArts(state, discipline) {
  const ma = state.martialArts ?? { discipline: null, belt: 0 }
  const active = discipline ?? ma.discipline
  if (!active) return state
  // A discipline already begun can always be trained; a new one must exist here.
  if (active !== ma.discipline && !martialOptions(state).some(m => m.name === active)) return state
  const belt = ma.belt ?? 0
  const progressChance = clamp(0.25 + state.stats.health * 0.003, 0.1, 0.65)
  if (belt < BELT_NAMES.length - 1 && chance(progressChance)) {
    const newBelt = belt + 1
    return {
      ...state,
      martialArts: { discipline: active, belt: newBelt },
      stats: { ...state.stats, health: clamp(state.stats.health + 4, 0, 100), happiness: clamp(state.stats.happiness + 3, 0, 100) },
      flags: [...new Set([...state.flags, 'martial_arts'])],
      actionsThisYear: state.actionsThisYear + 1,
      log: [...state.log, { age: state.age, text: BELTED.has(active) ? `You are given your ${BELT_NAMES[newBelt]} belt in ${active}. You tie it badly the first time.` : `You move up a grade in ${active}. The teacher says so in one word, which is how you know he means it.`, isKey: newBelt === 8 }],
    }
  }
  return {
    ...state,
    martialArts: { discipline: active, belt },
    stats: { ...state.stats, health: clamp(state.stats.health + 2, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    ...sayFresh(state, [`You train ${active} twice a week all year. Most of it is falling down and getting up.`, `A year of ${active}. The progress is slow and you can feel all of it.`]),
  }
}

// ─── Licenses ─────────────────────────────────────────────────────────────────

export function obtainLicense(state, licType) {
  const lic = LICENCES[licType]
  if (!lic) return state
  if (!licenceOptions(state).some(o => o.id === licType)) return state
  if (state.age < lic.minAge) return { ...state, log: [...state.log, { age: state.age, text: "You're not old enough for that licence yet.", isKey: false }] }
  if (state.flags.includes(lic.flag)) return { ...state, log: [...state.log, { age: state.age, text: "You already have that licence.", isKey: false }] }
  const licCost = licencePrice(state, licType)
  if ((state.money ?? 0) < licCost) return { ...state, log: [...state.log, { age: state.age, text: "You can't afford the licence fees right now.", isKey: false }] }
  return {
    ...state,
    money: (state.money ?? 0) - licCost,
    flags: [...new Set([...state.flags, lic.flag])],
    licenceObtained: licType === 'driver' ? true : (state.licenceObtained ?? false),
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: lic.text, isKey: true }],
  }
}

// ─── Friend interactions ──────────────────────────────────────────────────────

export function interactWithFriend(state, friendIdx, action) {
  const friends = state.friends ?? []
  const friend = friends[friendIdx]
  if (!friend?.alive) return state
  const acts = {
    hangout:   { rqDelta: 8,  happiness: 6, cost: 30,  text: `You hang out with ${friend.name}. A good time.` },
    compliment:{ rqDelta: 6,  happiness: 3, cost: 0,   text: `You say something kind to ${friend.name}.` },
    gift:      { rqDelta: 12, happiness: 4, cost: 100, text: `You give ${friend.name} a thoughtful gift.` },
    prank: {
      rqDelta: chance(0.5) ? 5 : -10,
      happiness: 4,
      cost: 0,
      text: chance(0.5) ? `You prank ${friend.name}. They laugh it off.` : `You prank ${friend.name}. They don't find it funny.`,
    },
  }
  const act = acts[action]
  if (!act) return state
  const actCost = act.cost ? estimateCost(state, act.cost) : 0
  if ((state.money ?? 0) < actCost) return { ...state, log: [...state.log, { age: state.age, text: "You can't afford to do that right now.", isKey: false }] }
  const updatedFriends = friends.map((f, i) => i === friendIdx ? { ...f, relationshipQuality: clamp(f.relationshipQuality + act.rqDelta, 0, 100) } : f)
  return {
    ...state,
    friends: updatedFriends,
    money: Math.max(0, (state.money ?? 0) - actCost),
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + act.happiness, 0, 100) },
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: act.text, isKey: false }],
  }
}

// ─── Drop out of school ───────────────────────────────────────────────────────

export function dropOutOfSchool(state) {
  if (!state.education?.enrolled) return state
  const { type, field, year } = state.education.enrolled
  return {
    ...state,
    education: { ...state.education, enrolled: null },
    flags: [...new Set([...state.flags, 'dropped_out'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness - 8, 0, 100) },
    log: [...state.log, { age: state.age, text: `You drop out of ${type === 'university' ? 'university' : 'trade school'} after year ${year + 1}.`, isKey: true }],
  }
}

// ─── Travel / Vacation ────────────────────────────────────────────────────────

export function bookTrip(state, destinationId) {
  const dest = DESTINATIONS.find(d => d.id === destinationId)
  if (!dest) return state
  if (state.age < dest.minAge) return { ...state, log: [...state.log, { age: state.age, text: `You're too young for ${dest.name}.`, isKey: false }] }
  if (dest.minYear && state.currentYear < dest.minYear) return { ...state, log: [...state.log, { age: state.age, text: `${dest.name} isn't available yet.`, isKey: false }] }
  if (dest.requiresLicence && !state.licenceObtained) return { ...state, log: [...state.log, { age: state.age, text: "You need a driver's licence for a road trip.", isKey: false }] }
  // A ticket abroad was priced by GDP tier as steeply as a haircut, so a
  // Nigerian farm hand in 1981 was offered Japan for $239. A fare is a world
  // price; a weekend inside the country is a local one.
  if (!tripOptions(state).some(d => d.id === destinationId)) return state
  const cost = tripPrice(state, dest)

  if ((state.money ?? 0) < cost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You can't afford ${dest.name} right now ($${cost.toLocaleString()}).`, isKey: false }] }
  }

  const travels = [...(state.travels ?? []), { id: dest.id, name: dest.name, age: state.age, year: state.currentYear, type: dest.type }]
  const newFlags = [...state.flags]
  if (travels.length >= 5 && !newFlags.includes('well_traveled')) newFlags.push('well_traveled')
  if (travels.length >= 10 && !newFlags.includes('world_explorer')) newFlags.push('world_explorer')

  // Queue a random travel event
  const travelEventPool = [
    { id: `travel_food_poison_${state.age}`, phase: getPhase(state.age), weight: 5, text: `You get food poisoning in ${dest.name}. Two days in bed. Still worth it.`, effect: (p) => { p.m -= 10; p.h -= 5 }, choices: null },
    { id: `travel_pickpocket_${state.age}`, phase: getPhase(state.age), weight: 4, text: `Someone picks your pocket in a crowded market. You lose some cash but not your passport.`, effect: (p) => { p.moNominal -= Math.round(cost * 0.1); p.h -= 5 }, choices: null },
    { id: `travel_beautiful_${state.age}`, phase: getPhase(state.age), weight: 8, text: `${dest.name} is more beautiful than the photos. You watch the sunset from a hillside and feel genuinely alive.`, effect: (p) => { p.m += 15; p.h += 2; p.e += 3 }, choices: null },
    { id: `travel_culture_${state.age}`, phase: getPhase(state.age), weight: 7, text: `You spend a morning in a local market in ${dest.name}, eating things you can't name and watching how people live. Something shifts in how you see the world.`, effect: (p) => { p.m += 10; p.e += 2; p.e += 8 }, choices: null },
    { id: `travel_romance_${state.age}`, phase: getPhase(state.age), weight: 3, text: `You meet someone interesting on the trip. It doesn't last past the airport, but while it lasted it was perfect.`, effect: (p) => { p.m += 20; p.s += 3 }, choices: null, when: (G) => !G.partner },
    { id: `travel_delay_${state.age}`, phase: getPhase(state.age), weight: 4, text: `Your flight home is delayed by 18 hours. The airport floor. The single power outlet. The long conversations with strangers.`, effect: (p) => { p.h -= 3; p.e += 5 }, choices: null },
    { id: `travel_adventure_${state.age}`, phase: getPhase(state.age), weight: 6, text: `You do something you've never done before — a hike, a dive, a climb. Your body reminds you what it's for.`, effect: (p) => { p.h += 12; p.m += 5 }, choices: null, when: (G) => dest.type === 'adventure' },
    { id: `travel_homesick_${state.age}`, phase: getPhase(state.age), weight: 3, text: `Two weeks in, you miss home. Not the place, exactly — the feeling. You book an earlier flight.`, effect: (p) => { p.m -= 5; p.e += 3 }, choices: null },
  ]

  // Pick a random event from pool (filter by when if applicable)
  const G = buildG(state)
  const eligible = travelEventPool.filter(e => !e.when || e.when(G))
  const travelEvent = (() => {
      // Each of these declares a weight and the picker drew uniformly.
      const total = eligible.reduce((a, e) => a + (e.weight ?? 1), 0)
      let r = Math.random() * total
      for (const e of eligible) { r -= (e.weight ?? 1); if (r <= 0) return e }
      return eligible[eligible.length - 1]
    })()

  return {
    ...state,
    money: (state.money ?? 0) - cost,
    travels,
    flags: newFlags,
    actionsThisYear: state.actionsThisYear + 1,
    queue: [...state.queue, travelEvent],
    log: [...state.log, { age: state.age, text: `You take a trip to ${dest.name}. Cost: $${cost.toLocaleString()}.`, isKey: true }],
  }
}

// ─── Business ownership ───────────────────────────────────────────────────────

// BUSINESS_TYPES is imported from './character' and re-exported via gameEngine.js
export { BUSINESS_TYPES } from './character'
import { personName, childSurname } from './names'

// Every price in this file is written in present-day dollars, and until
// economy.js existed that is what the player was charged and shown, in every
// year the game covers. `$$` denominates one into the money of the year and
// country the character is standing in.
//
// It is applied at the DEFINITION of a cost and never at the deduction, so
// that the figure printed in the log, the affordability check and the amount
// taken out of the balance are all necessarily the same number. Costs that
// travel through `proxy.mo` are denominated by applyProxy instead and must NOT
// be passed through here.
const $$ = (amount, state) => inEraMoney(amount, state.currentCountry ?? state.character?.country, state.currentYear)


// What could be opened here. The list was the same in every place and year a
// character could reach eighteen in, so a Yoruba farm hand was shown "Gym /
// Fitness" and "Bar / Nightclub" in a village in 1981, and then, being under
// the smarts bar for everything else, "No business types available yet."
const BUSINESS_HERE = {
  corner_shop: () => true,
  restaurant: (p) => !p.rural || p.comfortable,
  consulting: (p) => !p.rural && p.urbanShare >= 0.3,
  bar: (p) => !p.rural && !nightlifeBanned(p.c, p.year),
  tech_startup: (p) => !p.rural && hasTech(p.c, 'home_internet', p.year),
  online_shop: (p) => hasTech(p.c, 'home_internet', p.year, { rural: p.rural }),
  gym: (p) => !p.rural && p.year >= 1960 && (p.wealthy || p.comfortable),
}
const BUSINESS_LOCAL_NAME = {
  corner_shop: (p) => p.rural ? 'Village shop' : p.year < 1960 || !p.wealthy ? 'Kiosk' : 'Corner shop',
  restaurant: (p) => p.wealthy ? 'Restaurant' : 'Chop house',
}

export function getAvailableBusinessTypes(state) {
  const p = placeNow(state)
  if (!institutionExists(p.name, p.year, 'money') || !institutionExists(p.name, p.year, 'wages')) return []
  return BUSINESS_TYPES.filter(bt => {
    if (state.age < bt.minAge) return false
    if (bt.minSmarts && state.stats.smarts < bt.minSmarts) return false
    if (bt.minYear && state.currentYear < bt.minYear) return false
    if (bt.minEducation) {
      const order = ['none', 'primary', 'secondary', 'university', 'graduate']
      if (order.indexOf(state.education?.level ?? 'none') < order.indexOf(bt.minEducation)) return false
    }
    return BUSINESS_HERE[bt.id]?.(p) ?? true
  }).map(bt => {
    const local = BUSINESS_LOCAL_NAME[bt.id]?.(p)
    return { ...bt, name: local ?? bt.name, cost: businessStartupCost(state, bt) }
  })
}

/**
 * What it costs to open one, here, now. Read the BIRTH country's GDP tier, so
 * a Nigerian who had moved to London opened a London restaurant at Lagos
 * prices; and the steep wage curve, as if a lease and a fridge got forty times
 * cheaper when wages did.
 */
export function businessStartupCost(state, bt) {
  return estimateCost(state, bt.startupCost)
}

export function startBusiness(state, typeId) {
  if (state.business?.active) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You already run a business.', isKey: false }] }
  }
  const bt = getAvailableBusinessTypes(state).find(b => b.id === typeId)
  if (!bt) return state
  const cost = bt.cost

  if ((state.money ?? 0) < cost) {
    return { ...state, log: [...state.log, { age: state.age, text: `You need $${cost.toLocaleString()} to start a ${bt.name.toLowerCase()}.`, isKey: false }] }
  }

  const business = {
    id: bt.id, name: bt.name, emoji: bt.emoji,
    active: true, yearsOpen: 0,
    performance: 50, // 0-100
    employees: 0, value: cost,
    revenue: 0, expenses: 0,
  }

  return {
    ...state,
    money: (state.money ?? 0) - cost,
    business,
    actionsThisYear: state.actionsThisYear + 1,
    flags: [...new Set([...state.flags, 'entrepreneur'])],
    log: [...state.log, { age: state.age, text: `You open a ${bt.name.toLowerCase()}. It takes $${cost.toLocaleString()} before the first customer comes through the door.`, isKey: true }],
  }
}

export function manageBusiness(state) {
  if (!state.business?.active) return state
  const perf = clamp((state.business.performance ?? 50) + randomBetween(5, 15), 0, 100)
  const business = { ...state.business, performance: perf }
  return {
    ...state,
    business,
    actionsThisYear: state.actionsThisYear + 1,
    stats: { ...state.stats, happiness: clamp(state.stats.happiness - 3, 0, 100) },
    ...sayFresh(state, [
      `You are at the ${business.name.toLowerCase()} before it opens and after it shuts.`,
      `You do the books at the kitchen table, late, twice.`,
      `A supplier is let go and a better one found. It costs you a week.`,
      `You learn which days are slow and stop pretending they will not be.`,
      `The regulars know your name. You know what they will ask for before they ask.`,
    ]),
  }
}

/** What a hire costs where the business is — shared with the panel that shows it. */
export function hiringCostOf(state) {
  return estimateCost(state, 2000)
}

export function hireEmployee(state) {
  if (!state.business?.active) return state
  const hiringCost = hiringCostOf(state)
  if ((state.money ?? 0) < hiringCost) {
    return { ...state, log: [...state.log, { age: state.age, text: "You can't afford to hire right now.", isKey: false }] }
  }
  const business = { ...state.business, employees: (state.business.employees ?? 0) + 1, performance: clamp((state.business.performance ?? 50) + 8, 0, 100) }
  return {
    ...state,
    money: (state.money ?? 0) - hiringCost,
    business,
    actionsThisYear: state.actionsThisYear + 1,
    log: [...state.log, { age: state.age, text: `You hire a new employee for the ${business.name}. Staff: ${business.employees}.`, isKey: false }],
  }
}

export function closeBusiness(state) {
  if (!state.business?.active) return state
  const salvage = Math.round(state.business.value * (state.business.performance >= 60 ? 0.5 : 0.2))
  return {
    ...state,
    money: (state.money ?? 0) + salvage,
    business: { ...state.business, active: false },
    log: [...state.log, { age: state.age, text: `You close the ${state.business.name}. Salvage value: $${salvage.toLocaleString()}.`, isKey: true }],
  }
}

// ─── Fugitive system ─────────────────────────────────────────────────────────




export function prisonWork(state) {
  if (!state.inPrison) return state
  const earned = $$(randomBetween(50, 200), state)
  let healthDelta = -2
  let logText = `You put in hours in the prison laundry/kitchen. $${earned} earned.`
  const injured = chance(0.05)
  if (injured) {
    healthDelta -= 10
    logText = `You put in hours in the prison laundry/kitchen. $${earned} earned. A work accident leaves you bruised and aching.`
  }
  return {
    ...state,
    money: (state.money ?? 0) + earned,
    stats: {
      ...state.stats,
      health: clamp((state.stats.health ?? 50) + healthDelta, 0, 100),
      happiness: clamp((state.stats.happiness ?? 50) - 3, 0, 100),
    },
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: logText, isKey: false }],
  }
}

export function prisonCry(state) {
  if (!state.inPrison) return state
  const comforted = chance(0.30)
  const happinessDelta = comforted ? 8 + 3 : 8
  const regretDelta = -3
  const logText = comforted
    ? 'You break down in your cell. Another inmate sits beside you in silence until you steady yourself — a small, unexpected kindness.'
    : 'You allow yourself to fall apart for a while. The tears come, and then they stop. You feel hollow but lighter.'
  return {
    ...state,
    stats: {
      ...state.stats,
      happiness: clamp((state.stats.happiness ?? 50) + happinessDelta, 0, 100),
    },
    regret: clamp((state.regret ?? 50) + regretDelta, 0, 100),
    log: [...state.log, { age: state.age, text: logText, isKey: false }],
  }
}

export function prisonConjugalVisit(state) {
  if (!state.inPrison || !state.partner) return state
  if (!state.partner.alive || (state.partner.relationshipQuality ?? 50) <= 30) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'A conjugal visit isn\'t possible right now.', isKey: false }],
    }
  }
  const noShow = chance(0.10)
  if (noShow) {
    return {
      ...state,
      stats: {
        ...state.stats,
        happiness: clamp((state.stats.happiness ?? 50) - 8, 0, 100),
      },
      regret: clamp((state.regret ?? 50) + 5, 0, 100),
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      log: [...state.log, { age: state.age, text: `${state.partner.name} never shows. You wait in the visitation room until the guard walks you back.`, isKey: false }],
    }
  }
  return {
    ...state,
    stats: {
      ...state.stats,
      happiness: clamp((state.stats.happiness ?? 50) + 15, 0, 100),
    },
    partner: {
      ...state.partner,
      relationshipQuality: clamp((state.partner.relationshipQuality ?? 50) + 10, 0, 100),
    },
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: `${state.partner.name} visits. For a brief hour the walls don't feel so permanent.`, isKey: false }],
  }
}

export function prisonBribeGuard(state) {
  if (!state.inPrison) return state
  const bribe = $$(randomBetween(500, 3000), state)
  if ((state.money ?? 0) < bribe) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: `You don't have enough money to bribe a guard right now.`, isKey: false }],
    }
  }
  const roll = Math.random()
  let newSentence = state.prisonSentence ?? 0
  let happinessDelta = 0
  let regretDelta = 0
  let logText
  if (roll < 0.50) {
    newSentence = Math.max(0, newSentence - 1)
    happinessDelta = 10
    logText = `You slip a guard $${bribe.toLocaleString()}. Days later, paperwork goes missing and a year disappears from your sentence.`
  } else if (roll < 0.75) {
    logText = `You pay the guard $${bribe.toLocaleString()}. He pockets it and nothing changes. You've been had.`
  } else {
    newSentence = newSentence + 1
    regretDelta = 10
    logText = `The guard reports you. $${bribe.toLocaleString()} confiscated, an extra year added to your sentence.`
  }
  return {
    ...state,
    money: (state.money ?? 0) - bribe,
    prisonSentence: newSentence,
    stats: {
      ...state.stats,
      happiness: clamp((state.stats.happiness ?? 50) + happinessDelta, 0, 100),
    },
    regret: clamp((state.regret ?? 50) + regretDelta, 0, 100),
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: logText, isKey: false }],
  }
}

export function prisonStartRiot(state) {
  if (!state.inPrison) return state
  const success = chance(0.40)
  let newState
  if (success) {
    const sentenceReduced = chance(0.25)
    const newSentence = sentenceReduced
      ? Math.max(0, (state.prisonSentence ?? 0) - 1)
      : (state.prisonSentence ?? 0)
    const logText = sentenceReduced
      ? 'The riot you sparked descends into chaos. Guards retreat, paperwork burns — somehow a year gets wiped from your record in the confusion.'
      : 'You ignite the ward. For a few violent hours the inmates run the block. The rush is like nothing else.'
    newState = {
      ...state,
      prisonSentence: newSentence,
      stats: {
        ...state.stats,
        happiness: clamp((state.stats.happiness ?? 50) + 20, 0, 100),
      },
      karma: clamp((state.karma ?? 50) - 5, 0, 100),
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      flags: [...new Set([...state.flags, 'riot_instigator'])],
      log: [...state.log, { age: state.age, text: logText, isKey: true }],
    }
  } else {
    const extraYears = randomBetween(1, 2)
    newState = {
      ...state,
      prisonSentence: (state.prisonSentence ?? 0) + extraYears,
      stats: {
        ...state.stats,
        health: clamp((state.stats.health ?? 50) - 15, 0, 100),
        happiness: clamp((state.stats.happiness ?? 50) - 10, 0, 100),
        discipline: clamp((state.stats.discipline ?? 50) - 5, 0, 100),
      },
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      flags: [...new Set([...state.flags, 'riot_instigator'])],
      log: [...state.log, { age: state.age, text: `The riot collapses almost immediately. You take a beating and earn ${extraYears} more year${extraYears > 1 ? 's' : ''} on your sentence.`, isKey: true }],
    }
  }
  return newState
}

// ─── Stocks / Investment system ───────────────────────────────────────────────

const STOCKS = [
  { symbol: 'TECH', name: 'TechCorp',     sector: 'tech',    basePrice: 150, volatility: 0.15, minYear: 1990 },
  { symbol: 'BANK', name: 'GlobalBank',   sector: 'finance', basePrice: 80,  volatility: 0.10 },
  { symbol: 'HLTH', name: 'HealthPlus',   sector: 'health',  basePrice: 60,  volatility: 0.12 },
  { symbol: 'ENRG', name: 'EnergyFirst',  sector: 'energy',  basePrice: 45,  volatility: 0.18 },
  { symbol: 'RETL', name: 'RetailMax',    sector: 'retail',  basePrice: 30,  volatility: 0.20 },
  { symbol: 'REIT', name: 'PropertyFund', sector: 'realty',  basePrice: 100, volatility: 0.08 },
  { symbol: 'CRPT', name: 'CryptoCoin',   sector: 'crypto',  basePrice: 200, volatility: 0.50, minYear: 2010 },
]

export function getAvailableStocks(state) {
  const currentYear = state.currentYear ?? 2000
  const portfolio = state.stockPortfolio ?? []
  return STOCKS
    .filter(s => !s.minYear || currentYear >= s.minYear)
    .map(s => {
      const owned = portfolio.find(p => p.symbol === s.symbol)
      return owned
        ? { ...s, currentPrice: owned.currentPrice, sharesOwned: owned.shares }
        : { ...s, currentPrice: s.basePrice, sharesOwned: 0 }
    })
}

export function buyStock(state, symbol, shares) {
  const stockDef = STOCKS.find(s => s.symbol === symbol)
  if (!stockDef) {
    return { ...state, log: [...state.log, { age: state.age, text: `Unknown stock symbol: ${symbol}.`, isKey: false }] }
  }
  if (!shares || shares <= 0) {
    return { ...state, log: [...state.log, { age: state.age, text: 'You must buy at least one share.', isKey: false }] }
  }
  const portfolio = state.stockPortfolio ?? []
  const existing = portfolio.find(p => p.symbol === symbol)
  const currentPrice = existing ? existing.currentPrice : stockDef.basePrice
  const cost = Math.round(shares * currentPrice)
  if ((state.money ?? 0) < cost) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: `You need $${cost.toLocaleString()} to buy ${shares} share${shares > 1 ? 's' : ''} of ${stockDef.name}. Not enough funds.`, isKey: false }],
    }
  }
  let updatedPortfolio
  if (existing) {
    const totalShares = existing.shares + shares
    const newAvg = ((existing.avgBuyPrice * existing.shares) + (currentPrice * shares)) / totalShares
    updatedPortfolio = portfolio.map(p =>
      p.symbol === symbol
        ? { ...p, shares: totalShares, avgBuyPrice: Math.round(newAvg * 100) / 100 }
        : p
    )
  } else {
    updatedPortfolio = [
      ...portfolio,
      { symbol, name: stockDef.name, shares, avgBuyPrice: currentPrice, currentPrice, sector: stockDef.sector },
    ]
  }
  return {
    ...state,
    money: (state.money ?? 0) - cost,
    stockPortfolio: updatedPortfolio,
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: `You buy ${shares} share${shares > 1 ? 's' : ''} of ${stockDef.name} at $${currentPrice.toLocaleString()} each. Total cost: $${cost.toLocaleString()}.`, isKey: false }],
  }
}

export function sellStock(state, symbol, shares) {
  const portfolio = state.stockPortfolio ?? []
  const existing = portfolio.find(p => p.symbol === symbol)
  if (!existing) {
    return { ...state, log: [...state.log, { age: state.age, text: `You don't own any shares of ${symbol}.`, isKey: false }] }
  }
  if (!shares || shares <= 0 || shares > existing.shares) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: `You only own ${existing.shares} share${existing.shares !== 1 ? 's' : ''} of ${existing.name}.`, isKey: false }],
    }
  }
  const salePrice = existing.currentPrice
  const grossProceeds = Math.round(shares * salePrice)
  const costBasis = Math.round(shares * existing.avgBuyPrice)
  const rawGain = grossProceeds - costBasis
  let taxPaid = 0
  let netProceeds = grossProceeds
  if (rawGain > 0) {
    taxPaid = Math.round(rawGain * 0.15)
    netProceeds = grossProceeds - taxPaid
  }
  const remainingShares = existing.shares - shares
  const updatedPortfolio = remainingShares > 0
    ? portfolio.map(p => p.symbol === symbol ? { ...p, shares: remainingShares } : p)
    : portfolio.filter(p => p.symbol !== symbol)
  let logText
  if (rawGain > 0) {
    logText = `You sell ${shares} share${shares > 1 ? 's' : ''} of ${existing.name} for $${grossProceeds.toLocaleString()}. Gain: $${rawGain.toLocaleString()} — capital gains tax of $${taxPaid.toLocaleString()} applied. Net: $${netProceeds.toLocaleString()}.`
  } else if (rawGain < 0) {
    logText = `You sell ${shares} share${shares > 1 ? 's' : ''} of ${existing.name} for $${grossProceeds.toLocaleString()}. Loss: $${Math.abs(rawGain).toLocaleString()}.`
  } else {
    logText = `You sell ${shares} share${shares > 1 ? 's' : ''} of ${existing.name} at break-even for $${grossProceeds.toLocaleString()}.`
  }
  return {
    ...state,
    money: (state.money ?? 0) + netProceeds,
    stockPortfolio: updatedPortfolio,
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: logText, isKey: false }],
  }
}

export function tickStocks(state) {
  const portfolio = state.stockPortfolio ?? []
  if (portfolio.length === 0) return state

  const DIVIDEND_SECTORS = new Set(['finance', 'realty', 'health'])

  const oldTotalValue = portfolio.reduce((sum, p) => sum + p.shares * p.currentPrice, 0)

  const marketCrash = Math.random() < 0.05
  const marketBoom = !marketCrash && Math.random() < 0.03

  let dividendTotal = 0
  const updatedPortfolio = portfolio.map(p => {
    const stockDef = STOCKS.find(s => s.symbol === p.symbol)
    const volatility = stockDef ? stockDef.volatility : 0.15
    const basePrice = stockDef ? stockDef.basePrice : p.currentPrice

    let newPrice = p.currentPrice * (1 + (Math.random() - 0.5) * 2 * volatility)

    if (marketCrash) {
      newPrice *= 1 - (0.30 + Math.random() * 0.20)
    } else if (marketBoom) {
      newPrice *= 1 + (0.20 + Math.random() * 0.20)
    }

    newPrice = clamp(newPrice, basePrice * 0.10, basePrice * 20)
    newPrice = Math.round(newPrice * 100) / 100

    if (DIVIDEND_SECTORS.has(p.sector)) {
      const dividend = Math.round(p.shares * newPrice * 0.02)
      dividendTotal += dividend
    }

    return { ...p, currentPrice: newPrice }
  })

  const newTotalValue = updatedPortfolio.reduce((sum, p) => sum + p.shares * p.currentPrice, 0)

  const newLogs = [...state.log]

  if (marketCrash) {
    newLogs.push({ age: state.age, text: 'A market crash hammers your portfolio. Stock prices drop sharply across the board.', isKey: true })
  } else if (marketBoom) {
    newLogs.push({ age: state.age, text: 'A market-wide surge lifts your portfolio. Everything is up.', isKey: false })
  } else if (oldTotalValue > 0) {
    const pctChange = (newTotalValue - oldTotalValue) / oldTotalValue
    if (Math.abs(pctChange) >= 0.20) {
      const direction = pctChange > 0 ? 'up' : 'down'
      const pctDisplay = Math.round(Math.abs(pctChange) * 100)
      newLogs.push({ age: state.age, text: `Your stock portfolio is ${direction} ${pctDisplay}% this year. Total value: $${Math.round(newTotalValue).toLocaleString()}.`, isKey: false })
    }
  }

  if (dividendTotal > 0) {
    newLogs.push({ age: state.age, text: `Dividend payments deposited: $${dividendTotal.toLocaleString()}.`, isKey: false })
  }

  return {
    ...state,
    money: (state.money ?? 0) + dividendTotal,
    stockPortfolio: updatedPortfolio,
    log: newLogs,
  }
}

// NOTE: goIllegal / breakOut / assumeIdentity used to be duplicated here as well
// as in the store. Nothing imported these copies — the UI wires to the store's
// versions — and this file's goIllegal spread a new country over
// `state.character`, which would have corrupted the frozen birth identity every
// downstream model reads (world events, regime, mortality). Removed rather than
// left as a trap; the store's implementations are the real ones.
