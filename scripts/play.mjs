// Plays full lives through the real store, as a player does, and writes each
// life's complete log + death screen to a text file for reading end to end.
import fs from 'node:fs'
import { registerResolveHooks } from './lib/register.js'
registerResolveHooks()
const mem = new Map()
globalThis.localStorage = { getItem: k => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)), removeItem: k => mem.delete(k), clear: () => mem.clear() }

const { useGameStore } = await import('../src/store/gameStore.js')
const { generateLifeNotes, generateIdentityCard } = await import('../src/engine/gameEngine.js')
const { ACTIVITIES } = await import('../src/data/activities.js')
const { buildG } = await import('../src/engine/tick.js')

const OUT = process.argv[2]
const personas = JSON.parse(process.argv[3])
const S = () => useGameStore.getState()

function pick(ev, strat) {
  const n = ev.choices.length
  if (strat === 'first') return 0
  if (strat === 'last') return n - 1
  if (strat === 'defiant') { const i = ev.choices.findIndex(c => c.tag === 'defiant'); return i >= 0 ? i : Math.floor(Math.random() * n) }
  if (strat === 'yielding') { const i = ev.choices.findIndex(c => c.tag === 'yielding'); return i >= 0 ? i : 0 }
  return Math.floor(Math.random() * n)
}

const allActs = Object.values(ACTIVITIES).flat()
for (const [idx, p] of personas.entries()) {
  S().setMode(p.mode ?? 'active')
  S().startCuratedGame({ country: p.country, birthYear: p.year, gender: p.gender })
  useGameStore.setState({ mode: p.mode ?? 'active' })
  const lines = []
  const c = S().character
  lines.push(`### ${c.firstName} ${c.surname} — ${c.gender}, ${c.country.name} ${c.birthYear}, ${c.ruralUrban}, wealth ${c.wealthTier}, eth ${c.ethnicity?.name ?? c.ethnicity}, rel ${c.religion}, place ${c.birthPlace?.name ?? c.birthPlace} (${p.mode ?? 'active'}, ${p.strat})`)
  let logSeen = 0
  const errs = []
  for (let y = 0; y < 115 && !S().dead && S().screen !== 'death'; y++) {
    try {
      // activities as a player would
      const st = S()
      if ((p.mode ?? 'active') === 'active' && !st.inPrison) {
        const G = buildG(st)
        for (const want of p.acts ?? []) {
          const a = allActs.find(x => x.id === want)
          if (!a || st.age < (a.minAge ?? 0) || (a.maxAge && st.age > a.maxAge)) continue
          if (a.condition && !a.condition(G)) continue
          S().takeActivity(want)
        }
        if (p.career && st.age >= 22 && !S().career && !S().retired) S().enterCareer(p.career)
        if (p.date && st.age >= 20 && !S().partner && Math.random() < 0.3) { S().meetSomeone(); if (S().pendingPartner) S().acceptPartner() }
        if (p.emigrate && st.age === p.emigrate[1]) S().emigrate(p.emigrate[0])
        if (p.busy) {
          const s2 = S()
          if (st.age === 30) S().buyProperty('apartment')
          if (st.age === 32) S().startBusiness(p.busy.business ?? 'food_stall')
          if (st.age > 32 && st.age < 45 && S().business) S().manageBusiness()
          if (st.age === 34) S().adoptPet('dog')
          if (st.age === 36) S().bookTrip('city_break')
          if (st.age === 40 && s2.partner && s2.partner.alive !== false) S().fileForDivorce()
          if (st.age === 50) S().buyVehicle('sedan')
          if (st.age === 45 && S().business) S().closeBusiness()
          if (st.age >= 25 && st.age < 45 && S().partner && Math.random() < 0.3) S().tryForChild()
          if (st.age >= 30 && (S().children ?? []).length) S().spendTimeWithChild(0)
          if (st.age >= 20 && Math.random() < 0.2) S().callParent('mother')
        }
        if (p.crime && st.age >= 17 && st.age < 40 && Math.random() < 0.2) S().commitCrime(p.crime)
      }
      S().ageUp()
      for (let k = 0; k < 6; k++) {
        const s = S()
        if (s.pendingTrial) { S().resolveTrial(p.lawyer ?? 'mid'); continue }
        if (s.pendingMinigame) { S().resolveMinigame(Math.random() < 0.5); continue }
        const ev = s.pendingEvent
        if (!ev) break
        if (ev.choices?.length) {
          const i = pick(ev, p.strat)
          lines.push(`   [EVENT ${ev.id}] ${typeof ev.text === 'function' ? ev.text(buildG(s)) : ev.text}`)
          ev.choices.forEach((ch, j) => lines.push(`     ${j === i ? '>' : ' '} ${ch.text}${ch.tag ? ' <' + ch.tag + '>' : ''}`))
          S().resolveChoice(i)
          if (S().lastOutcome) lines.push(`     => ${S().lastOutcome}`)
        } else if (ev.isAutomatic) S().resolveAutoEvent()
        else { useGameStore.setState({ pendingEvent: null }) ; lines.push('   !! stuck event ' + ev.id) }
      }
    } catch (e) { errs.push(`age ${S().age}: ${e.stack.split('\n').slice(0,3).join(' | ')}`); break }
    const s = S()
    for (const e of s.log.slice(logSeen)) {
      const tag = e.isWorld ? 'W' : e.isHeadline ? 'H' : e.isTexture ? 'T' : e.isMundane ? 'M' : e.isSoundtrack ? 'S' : e.isKey ? 'K' : ' '
      lines.push(`${String(e.age).padStart(3)} ${e.year ?? ''} ${tag} ${e.text}${e.eventId ? '  {' + e.eventId + '}' : ''}`)
    }
    logSeen = s.log.length
    if (s.age % 10 === 0) lines.push(`      -- age ${s.age} ${s.currentYear} | ${JSON.stringify(s.stats)} money ${Math.round(s.money)} debt ${Math.round(s.debt ?? 0)} | career ${s.career?.title ?? '-'} ${s.career?.salary ?? ''} | partner ${s.partner ? s.partner.name + (s.partner.alive === false ? ' (dead)' : '') : '-'} married:${s.flags.includes('married')} kids ${s.children.length} | ${s.currentCountry?.name} ${s.currentPlace?.name ?? ''} ${s.residencyStatus} edu ${s.education?.level}`)
  }
  const s = S()
  lines.push(`\n=== DEATH age ${s.age} (${s.currentYear}) cause: ${s.causeOfDeath} ribbon: ${s.ribbon?.name ?? JSON.stringify(s.ribbon)}`)
  lines.push(`EPITAPH:\n${s.epitaph}`)
  try { lines.push('NOTES:\n' + JSON.stringify(generateLifeNotes(s), null, 1)) } catch (e) { lines.push('NOTES ERR ' + e.message) }
  try { lines.push('IDCARD:\n' + JSON.stringify(generateIdentityCard(s), null, 1)) } catch (e) { lines.push('ID ERR ' + e.message) }
  if (errs.length) lines.push('ERRORS: ' + errs.join('\n'))
  fs.writeFileSync(`${OUT}/${String(idx).padStart(2, '0')}_${p.country.replace(/ /g, '_')}_${p.year}.txt`, lines.join('\n'))
  console.log(idx, p.country, p.year, 'died', s.age, s.causeOfDeath, errs.length ? 'ERR ' + errs[0] : '')
}
