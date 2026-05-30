import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import StatBar from './StatBar'
import FlagChip from './FlagChip'
import EventBox from './EventBox'
import { getCountryFlag, REGIME_LABELS, REGIME_COLORS, RELIGION_LABELS, RESIDENCY_LABELS } from '../utils/countryUtils'
import { getCountryRegime, generateIdentityCard, DESIRE_LABELS, getWealthTierLabel, getFinancialReputationDisplay, formatParentIncome } from '../engine/gameEngine'
import { PLACES, getPlacesForCountry, getRelocationCost } from '../data/places'
import ActivitiesPanel from './ActivitiesPanel'

const PHASE_LABELS = {
  early_childhood: 'Early Childhood',
  childhood: 'Childhood',
  adolescence: 'Adolescence',
  young_adult: 'Young Adult',
  midlife: 'Midlife',
  late_life: 'Late Life',
}

const BELT_NAMES = ['white','yellow','orange','green','blue','purple','red','brown','black']

function getPhase(age) {
  if (age <= 5) return 'early_childhood'
  if (age <= 11) return 'childhood'
  if (age <= 17) return 'adolescence'
  if (age <= 29) return 'young_adult'
  if (age <= 49) return 'midlife'
  return 'late_life'
}

function RelBar({ value, color }) {
  return (
    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  )
}

function relColor(q) {
  return q > 65 ? '#34c759' : q > 35 ? '#ff9500' : '#ff3b30'
}

// Tab panels
const TABS = [
  { key: 'life',   label: 'Life',   emoji: '📖' },
  { key: 'stats',  label: 'Stats',  emoji: '📊' },
  { key: 'people', label: 'People', emoji: '👥' },
  { key: 'assets', label: 'Assets', emoji: '🏠' },
]

export default function LifeScreen() {
  const [showActivities, setShowActivities] = useState(false)
  const [activeTab, setActiveTab] = useState('life')
  const [logMode, setLogMode] = useState('recent')
  const eventRef = useRef(null)

  const pendingEvent = useGameStore(s => s.pendingEvent)

  useEffect(() => {
    if (pendingEvent && eventRef.current) {
      eventRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [pendingEvent])
  const [showMoveModal, setShowMoveModal] = useState(false)
  const [moveStep, setMoveStep] = useState('pick') // 'pick' | 'confirm'
  const [selectedPlace, setSelectedPlace] = useState(null)

  const character    = useGameStore(s => s.character)
  const stats        = useGameStore(s => s.stats)
  const flags        = useGameStore(s => s.flags)
  const regret       = useGameStore(s => s.regret)
  const age          = useGameStore(s => s.age)
  const currentYear  = useGameStore(s => s.currentYear)
  const currentCountry = useGameStore(s => s.currentCountry)
  const residencyStatus = useGameStore(s => s.residencyStatus)
  const log          = useGameStore(s => s.log)
  const career       = useGameStore(s => s.career)
  const education    = useGameStore(s => s.education)
  const partner      = useGameStore(s => s.partner)
  const children     = useGameStore(s => s.children)
  const inPrison     = useGameStore(s => s.inPrison)
  const prisonSentence = useGameStore(s => s.prisonSentence)
  const pendingTrial = useGameStore(s => s.pendingTrial)
  const resolveTrial = useGameStore(s => s.resolveTrial)
  const wanted       = useGameStore(s => s.wanted)
  const assumedIdentity = useGameStore(s => s.assumedIdentity)
  const actionsThisYear = useGameStore(s => s.actionsThisYear)
  const maxActionsPerYear = useGameStore(s => s.maxActionsPerYear)
  const lastOutcome  = useGameStore(s => s.lastOutcome)
  const money        = useGameStore(s => s.money)
  const parents      = useGameStore(s => s.parents)
  const siblings     = useGameStore(s => s.siblings)
  const pets         = useGameStore(s => s.pets)
  const assets       = useGameStore(s => s.assets)
  const karma        = useGameStore(s => s.karma)
  const fame         = useGameStore(s => s.fame)
  const retired      = useGameStore(s => s.retired)
  const gpa          = useGameStore(s => s.gpa)
  const friends      = useGameStore(s => s.friends)
  const socialMedia  = useGameStore(s => s.socialMedia)
  const martialArts  = useGameStore(s => s.martialArts)
  const birthControl = useGameStore(s => s.birthControl)
  const criminalRecord = useGameStore(s => s.criminalRecord)
  const mentalHealth = useGameStore(s => s.mentalHealth)
  const conditions   = useGameStore(s => s.conditions ?? [])
  const hobbies      = useGameStore(s => s.hobbies)
  const fitness      = useGameStore(s => s.fitness)
  const debt         = useGameStore(s => s.debt)
  const creditScore  = useGameStore(s => s.creditScore)
  const pendingMinigame = useGameStore(s => s.pendingMinigame)
  const ageUp        = useGameStore(s => s.ageUp)

  if (!character) return null

  const phase = getPhase(age)
  const liveCountry = currentCountry ?? character.country
  const birthCountry = character.country
  const isAbroad = liveCountry?.name !== birthCountry?.name
  const regime = getCountryRegime(liveCountry, currentYear)
  const regimeLabel = REGIME_LABELS[regime] ?? regime
  const regimeColor = REGIME_COLORS[regime] ?? '#8e8e93'
  const religionLabel = RELIGION_LABELS[character.religion] ?? character.religion ?? 'Unknown'
  const ethnicName = character.country.ethnicGroups?.find(eg => eg.id === character.ethnicity)?.name ?? character.ethnicity ?? 'Unknown'
  const residencyLabel = RESIDENCY_LABELS[residencyStatus] ?? residencyStatus
  const recentLog = [...log].reverse().slice(0, 40)
  const actionsLeft = maxActionsPerYear - actionsThisYear
  const hasAddiction = flags.includes('alcohol_addiction') || flags.includes('gambling_addiction') || flags.includes('drug_addiction') || flags.includes('addiction') || flags.includes('addicted_gambling')

  const business     = useGameStore(s => s.business)
  const travels      = useGameStore(s => s.travels)
  const exPartners   = useGameStore(s => s.exPartners)
  const mem          = useGameStore(s => s.mem)
  const desire            = useGameStore(s => s.desire)
  const political_leaning = useGameStore(s => s.political_leaning)
  const fullState    = useGameStore(s => s)
  const currentPlace = useGameStore(s => s.currentPlace)
  const currentNeighborhoodName = useGameStore(s => s.currentNeighborhoodName)
  const currentNeighborhoodTier = useGameStore(s => s.currentNeighborhoodTier)
  const relocateTo   = useGameStore(s => s.relocateTo)
  const gold              = useGameStore(s => s.gold ?? 0)
  const householdContribution = useGameStore(s => s.householdContribution)
  const rosca             = useGameStore(s => s.rosca)
  const jointFamily       = useGameStore(s => s.jointFamily ?? false)
  const jointFamilyPool   = useGameStore(s => s.jointFamilyPool ?? 0)
  const banked            = useGameStore(s => s.banked ?? false)
  const hardCurrencyReserve = useGameStore(s => s.hardCurrencyReserve ?? 0)

  // Derive addiction stage label for display
  const getAddictionStage = () => {
    const isAlcohol = flags.includes('alcohol_addiction') || flags.includes('heavy_drinker')
    const isDrug = flags.includes('drug_addiction') || flags.includes('drug_user') || flags.includes('substance_abuser')
    if (!isAlcohol && !isDrug && !flags.includes('gambling_addiction')) return null
    const uses = (mem?.alcoholUses ?? 0) + (mem?.drugUses ?? 0)
    const isAddicted = flags.includes('alcohol_addiction') || flags.includes('drug_addiction') || flags.includes('gambling_addiction')
    const isOverdosed = flags.includes('overdosed')
    if (isOverdosed || (isAddicted && uses > 20)) return { label: 'Stage 4 — Crisis', color: '#ff3b30' }
    if (isAddicted) return { label: 'Stage 3 — Dependent', color: '#ff3b30' }
    if (uses >= 5) return { label: 'Stage 2 — Heavy Use', color: '#ff9500' }
    return { label: 'Stage 1 — Casual Use', color: '#ff9500' }
  }
  const addictionStage = getAddictionStage()

  const formatMoney = (n) => {
    if (n === null || n === undefined) return '$0'
    const abs = Math.abs(n)
    const sign = n < 0 ? '-' : ''
    if (abs >= 1000000) return `${sign}$${(abs/1000000).toFixed(2)}M`
    if (abs >= 1000) return `${sign}$${Math.round(abs/1000)}k`
    return `${sign}$${Math.round(abs).toLocaleString()}`
  }

  const karmaLabel = karma >= 85 ? 'Saint' : karma >= 70 ? 'Virtuous' : karma >= 50 ? 'Neutral' : karma >= 30 ? 'Questionable' : 'Sinister'
  const genderMark = (g) => g === 'male' ? <span className="text-blue-400 text-xs ml-1">♂</span> : g === 'female' ? <span className="text-pink-400 text-xs ml-1">♀</span> : null

  // Derives a readable status label from relationship quality
  const relStatusLabel = (quality, extraFlags = []) => {
    const labels = []
    if (extraFlags.includes('estranged')) labels.push({ text: 'Estranged', color: '#ff3b30' })
    else if (extraFlags.includes('reconciled')) labels.push({ text: 'Reconciled', color: '#34c759' })
    else if (extraFlags.includes('abroad')) labels.push({ text: 'Lives abroad', color: '#8e8e93' })
    else if (quality <= 24) labels.push({ text: 'Estranged', color: '#ff3b30' })
    else if (quality <= 39) labels.push({ text: 'Strained', color: '#ff9500' })
    else if (quality >= 90) labels.push({ text: 'Very close', color: '#34c759' })
    else if (quality >= 76) labels.push({ text: 'Close', color: '#34c759' })
    if (extraFlags.includes('caretaker')) labels.push({ text: 'You\'re their carer', color: '#007aff' })
    if (extraFlags.includes('therapy')) labels.push({ text: 'In couples therapy', color: '#007aff' })
    return labels
  }

  const propertyEquity = (assets?.properties ?? []).reduce((sum, p) => sum + (p.currentValue ?? 0) - (p.mortgage ?? 0), 0)
  const vehicleValue = (assets?.vehicles ?? []).reduce((sum, v) => sum + (v.currentValue ?? 0), 0)
  const netWorth = (money ?? 0) + propertyEquity + vehicleValue + gold + hardCurrencyReserve - (debt ?? 0)

  const creditLabel = (cs) => {
    if (!cs) return 'Unknown'
    if (cs >= 750) return 'Excellent'
    if (cs >= 700) return 'Good'
    if (cs >= 650) return 'Fair'
    if (cs >= 600) return 'Poor'
    return 'Very Poor'
  }

  return (
    <div className="h-screen bg-natalis-bg flex flex-col overflow-hidden">

      {/* ── Top Header ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-natalis-border flex-shrink-0 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
              style={{ background: character.gender === 'male' ? 'linear-gradient(135deg,#5ac8fa,#007aff)' : 'linear-gradient(135deg,#ff2d55,#af52de)' }}>
              {character.gender === 'male' ? '👦' : '👧'}
            </div>
            <div>
              <p className="font-bold text-natalis-text text-sm leading-tight">{character.firstName} {character.surname}</p>
              <p className="text-natalis-muted text-xs">{career ? career.title : (retired ? 'Retired' : PHASE_LABELS[phase])}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-bit-green text-base leading-tight">{formatMoney(money)}</p>
            <p className="text-natalis-muted text-xs">
              <span className="mr-1">{getCountryFlag(currentCountry ?? character.country)}</span>
              Age {age} · {currentYear}
            </p>
          </div>
        </div>
      </header>

      {/* ── Stats strip ────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-natalis-border flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-3 grid grid-cols-2 gap-x-6 gap-y-2">
          <StatBar stat="happiness" label="Happiness" value={stats.happiness} />
          <StatBar stat="health"    label="Health"    value={stats.health} />
          <StatBar stat="smarts"    label="Smarts"    value={stats.smarts} />
          <StatBar stat="looks"     label="Looks"     value={stats.looks} />
        </div>
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-natalis-border flex-shrink-0">
        <div className="max-w-2xl mx-auto flex">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setShowActivities(false) }}
              className="flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-all"
              style={{ borderBottom: activeTab === tab.key ? '2.5px solid #007aff' : '2.5px solid transparent' }}
            >
              <span className="text-base">{tab.emoji}</span>
              <span className="text-xs font-semibold" style={{ color: activeTab === tab.key ? '#007aff' : '#8e8e93' }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content area ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4 pb-28">

          {/* Prison banner */}
          {inPrison && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-bold text-red-600 text-sm">In Prison</p>
                <p className="text-red-500 text-xs">{prisonSentence} year{prisonSentence !== 1 ? 's' : ''} remaining</p>
              </div>
            </div>
          )}

          {/* Wanted / fugitive banner */}
          {wanted && !inPrison && (
            <div className="bg-red-600 rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <p className="font-bold text-white text-sm">WANTED FUGITIVE</p>
                <p className="text-red-200 text-xs">{assumedIdentity ? `Living as ${assumedIdentity.name}` : 'Police are actively searching for you'}</p>
              </div>
            </div>
          )}

          {/* Addiction warning */}
          {hasAddiction && addictionStage && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-orange-600 text-sm">Active Addiction</p>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: addictionStage.color + '22', color: addictionStage.color }}>
                    {addictionStage.label}
                  </span>
                </div>
                <p className="text-orange-500 text-xs mt-0.5">
                  {addictionStage.label.includes('4') ? 'Seek help urgently — your health is at serious risk.' :
                   addictionStage.label.includes('3') ? 'Dependent. Rehab is available in Activities.' :
                   addictionStage.label.includes('2') ? 'Use is escalating. Consider addressing it now.' :
                   'Early stage. You can still turn this around easily.'}
                </p>
              </div>
            </div>
          )}

          {/* Trial modal — blocks Age Up until resolved */}
          {pendingTrial && (
            <div className="bg-white rounded-2xl shadow-card-lg overflow-hidden border border-red-200">
              <div className="bg-red-600 px-5 py-3 flex items-center gap-2">
                <span className="text-xl">⚖️</span>
                <p className="text-white text-xs font-semibold uppercase tracking-widest">On Trial</p>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-natalis-text text-base font-medium leading-relaxed">
                  You are charged with <strong>{pendingTrial.crimeName.toLowerCase()}</strong> and facing up to {pendingTrial.sentence} year{pendingTrial.sentence !== 1 ? 's' : ''} in prison. Choose your defense.
                </p>
                <div className="space-y-2 pt-1">
                  <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Choose your defense</p>
                  {[
                    { tier: 'none', label: 'Represent yourself', sub: 'Free · Low chance of leniency', cost: 0 },
                    { tier: 'mid',  label: 'Hire a local lawyer', sub: `$${(pendingTrial.lawyerCosts?.mid ?? 0).toLocaleString()} · Moderate chance of reduction`, cost: pendingTrial.lawyerCosts?.mid ?? 0 },
                    { tier: 'top',  label: 'Hire a top firm', sub: `$${(pendingTrial.lawyerCosts?.top ?? 0).toLocaleString()} · Best chance of dismissal`, cost: pendingTrial.lawyerCosts?.top ?? 0 },
                  ].map((opt, i) => {
                    const canAfford = (money ?? 0) >= opt.cost
                    return (
                      <button
                        key={opt.tier}
                        disabled={!canAfford}
                        onClick={() => resolveTrial(opt.tier)}
                        className="w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 disabled:opacity-40"
                        style={{ background: !canAfford ? '#e5e5ea' : i === 0 ? 'linear-gradient(135deg,#636366,#48484a)' : i === 1 ? 'linear-gradient(135deg,#007aff,#0055cc)' : 'linear-gradient(135deg,#ff9500,#e07800)', color: !canAfford ? '#8e8e93' : 'white' }}
                      >
                        <div>{opt.label}</div>
                        <div className="text-xs font-normal opacity-80 mt-0.5">{opt.sub}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Pending event */}
          <div ref={eventRef}>
            {pendingEvent && <EventBox event={pendingEvent} />}
          </div>

          {/* Last outcome flash */}
          {lastOutcome && !pendingEvent && (
            <div className="bg-white rounded-xl px-4 py-3 border border-natalis-border shadow-sm flex items-start gap-2">
              <span className="text-base">💬</span>
              <p className="text-natalis-dim text-sm italic leading-relaxed">{lastOutcome}</p>
            </div>
          )}

          {/* ── LIFE TAB ── */}
          {activeTab === 'life' && (() => {
            const PHASE_ORDER = ['early_childhood','childhood','adolescence','young_adult','midlife','late_life']
            const phaseForAge = (a) => a <= 5 ? 'early_childhood' : a <= 11 ? 'childhood' : a <= 17 ? 'adolescence' : a <= 29 ? 'young_adult' : a <= 49 ? 'midlife' : 'late_life'
            const phaseLabel = { early_childhood: 'Early Childhood (0–5)', childhood: 'Childhood (6–11)', adolescence: 'Adolescence (12–17)', young_adult: 'Young Adult (18–29)', midlife: 'Midlife (30–49)', late_life: 'Late Life (50+)' }
            const livePlace = currentPlace ?? character.birthPlace
            const liveNbr = currentNeighborhoodName ?? character.birthNeighborhoodName
            const tierColors = { informal: '#ff3b30', working_class: '#ff9500', middle_class: '#34c759', elite: '#007aff' }
            const tierLabel = { informal: 'Informal', working_class: 'Working Class', middle_class: 'Middle Class', elite: 'Elite' }
            const nbTier = currentNeighborhoodTier ?? character.birthNeighborhoodTier
            return (
              <div className="space-y-3">

                {/* Location bar */}
                {livePlace && (
                  <div className="bg-white rounded-2xl border border-natalis-border px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg flex-shrink-0">📍</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-natalis-text text-sm truncate">
                          {livePlace.name}{livePlace.region && livePlace.region !== livePlace.name ? `, ${livePlace.region}` : ''}
                        </p>
                        <p className="text-natalis-muted text-xs truncate">
                          {liveNbr && <span>{liveNbr} <span className="opacity-60">· neighborhood</span></span>}
                          {nbTier && (
                            <span className={liveNbr ? 'ml-2' : ''}>
                              <span className="font-semibold" style={{ color: tierColors[nbTier] }}>
                                {liveNbr ? '· ' : ''}{tierLabel[nbTier]}
                              </span>
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    {age >= 18 && !inPrison && (
                      <button
                        onClick={() => { setMoveStep('pick'); setSelectedPlace(null); setShowMoveModal(true) }}
                        className="ml-2 flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 text-natalis-muted hover:bg-gray-200 transition-all"
                      >
                        Move
                      </button>
                    )}
                  </div>
                )}

                {/* Toggle */}
                <div className="flex gap-2 bg-white rounded-2xl p-1.5 border border-natalis-border">
                  {[['recent','Recent 40'],['timeline','By Phase']].map(([mode, label]) => (
                    <button key={mode} onClick={() => setLogMode(mode)}
                      className="flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: logMode === mode ? '#007aff' : 'transparent', color: logMode === mode ? 'white' : '#8e8e93' }}>
                      {label}
                    </button>
                  ))}
                </div>

                {logMode === 'recent' && recentLog.map((entry, i) => (
                  <div key={i} className={`rounded-xl px-4 py-3 border text-sm leading-relaxed ${
                    entry.isDeath    ? 'bg-zinc-900 border-zinc-800 text-zinc-100' :
                    entry.isHeadline ? 'bg-stone-100 border-stone-300 text-stone-700' :
                    entry.isWorld    ? 'bg-amber-50 border-amber-200 text-amber-800' :
                    entry.isKey      ? 'bg-blue-50 border-blue-200 text-blue-800' :
                    'bg-white border-natalis-border text-natalis-dim'
                  }`}>
                    {entry.isDeath && (
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">Age {entry.age}</div>
                    )}
                    {entry.isHeadline && (
                      <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">📰 {entry.age}</div>
                    )}
                    {entry.isWorld && entry.worldEventName && (
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">🌐 {entry.worldEventName}</div>
                    )}
                    {!entry.isHeadline && !entry.isDeath && <span className="font-bold mr-2 text-xs uppercase tracking-wider opacity-60">Age {entry.age}</span>}
                    <span className={entry.isHeadline ? 'italic text-sm' : ''}>{entry.text}</span>
                  </div>
                ))}

                {logMode === 'timeline' && (() => {
                  const grouped = {}
                  for (const entry of [...log].reverse()) {
                    const ph = phaseForAge(entry.age)
                    if (!grouped[ph]) grouped[ph] = []
                    grouped[ph].push(entry)
                  }
                  return PHASE_ORDER.filter(ph => grouped[ph]?.length > 0).map(ph => (
                    <div key={ph} className="bg-white rounded-2xl border border-natalis-border overflow-hidden">
                      <div className="px-4 py-2.5 bg-gray-50 border-b border-natalis-border">
                        <span className="text-xs font-bold uppercase tracking-wider text-natalis-muted">{phaseLabel[ph]}</span>
                      </div>
                      <div className="divide-y divide-natalis-border">
                        {grouped[ph].map((entry, i) => (
                          <div key={i} className={`px-4 py-2.5 text-sm leading-relaxed ${
                            entry.isDeath    ? 'bg-zinc-900 text-zinc-100' :
                            entry.isHeadline ? 'bg-stone-100 text-stone-700' :
                            entry.isWorld    ? 'bg-amber-50 text-amber-800' :
                            entry.isKey      ? 'text-blue-800' : 'text-natalis-dim'
                          }`}>
                            {entry.isDeath && <span className="font-semibold mr-2 text-xs text-zinc-400 uppercase tracking-wider">Age {entry.age} — </span>}
                            {!entry.isHeadline && !entry.isDeath && <span className="font-bold mr-2 text-xs opacity-50">Age {entry.age}</span>}
                            {entry.isHeadline && <span className="text-xs font-semibold mr-1 text-stone-500">📰 {entry.age} — </span>}
                            {entry.isWorld && entry.worldEventName && <span className="text-xs font-bold mr-1">🌐 {entry.worldEventName} — </span>}
                            <span className={entry.isHeadline ? 'italic' : ''}>{entry.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                })()}

                {log.length === 0 && (
                  <div className="bg-white rounded-2xl px-5 py-8 text-center border border-natalis-border">
                    <p className="text-4xl mb-2">🌱</p>
                    <p className="text-natalis-muted text-sm">Your life story begins here.</p>
                  </div>
                )}
              </div>
            )
          })()}

          {/* ── STATS TAB ── */}
          {activeTab === 'stats' && (
            <div className="space-y-3">
              {/* Who Am I — living identity card */}
              {(() => {
                const card = generateIdentityCard(fullState)
                if (!card) return null
                return (
                  <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                    <p className="font-bold text-natalis-text text-sm mb-2">Who You Are</p>
                    <p className="text-sm text-natalis-dim leading-relaxed italic">{card}</p>
                  </div>
                )
              })()}

              {/* All stats */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card space-y-4">
                <p className="font-bold text-natalis-text text-sm">Your Stats</p>
                <StatBar stat="happiness" label="Happiness" value={stats.happiness} />
                <StatBar stat="health"    label="Health"    value={stats.health} />
                <StatBar stat="smarts"    label="Smarts"    value={stats.smarts} />
                <StatBar stat="looks"     label="Looks"     value={stats.looks} />
                <StatBar stat="charisma"  label="Charisma"  value={stats.charisma} />
                <div>
                  <StatBar stat="wealth" label="Wealth (lifestyle score)" value={stats.wealth} />
                  <p className="text-xs text-natalis-muted mt-1">Cash: <span className="font-semibold text-natalis-text">{formatMoney(money)}</span> · Net Worth: <span className="font-semibold text-natalis-text">{formatMoney(netWorth)}</span></p>
                </div>
              </div>

              {/* Extra stats */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                <p className="font-bold text-natalis-text text-sm mb-3">Profile</p>
                <div className="space-y-2">
                  {[
                    { label: `Karma · ${karmaLabel}`, value: karma, emoji: karma > 60 ? '😇' : karma < 40 ? '😈' : '😐', color: karma > 60 ? '#34c759' : karma < 40 ? '#ff3b30' : '#ff9500' },
                    { label: 'Fame', value: fame, emoji: '⭐', color: '#ffcc00' },
                    { label: 'Regret', value: regret, emoji: '😔', color: '#8e8e93' },
                  ].map(({ label, value, emoji, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{emoji}</span>
                        <span className="text-sm text-natalis-dim font-medium">{label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
                        </div>
                        <span className="text-xs font-bold text-natalis-muted w-8 text-right">{Math.round(value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Identity & World Context */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                <p className="font-bold text-natalis-text text-sm mb-3">Identity & World</p>
                <div className="space-y-2 text-sm">
                  {/* Current country + flag */}
                  <div className="flex justify-between items-center py-1 border-b border-natalis-border">
                    <span className="text-natalis-muted text-xs">📍 Living in</span>
                    <span className="text-natalis-text font-semibold text-xs">
                      {getCountryFlag(liveCountry)} {liveCountry?.name}
                    </span>
                  </div>
                  {isAbroad && (
                    <div className="flex justify-between items-center py-1 border-b border-natalis-border">
                      <span className="text-natalis-muted text-xs">🏠 Born in</span>
                      <span className="text-natalis-text font-semibold text-xs">
                        {getCountryFlag(birthCountry)} {birthCountry?.name}
                      </span>
                    </div>
                  )}
                  {isAbroad && residencyStatus !== 'citizen' && (
                    <div className="flex justify-between items-center py-1 border-b border-natalis-border">
                      <span className="text-natalis-muted text-xs">📋 Status</span>
                      <span className="font-semibold text-xs" style={{ color: residencyStatus === 'undocumented' || residencyStatus === 'tourist_overstay' ? '#ff3b30' : residencyStatus === 'refugee_status' || residencyStatus === 'asylum_seeker' ? '#ff9500' : '#007aff' }}>
                        {residencyLabel}
                      </span>
                    </div>
                  )}
                  {/* Regime */}
                  <div className="flex justify-between items-center py-1 border-b border-natalis-border">
                    <span className="text-natalis-muted text-xs">⚖️ Government</span>
                    <span className="font-semibold text-xs" style={{ color: regimeColor }}>{regimeLabel}</span>
                  </div>
                  {/* Religion */}
                  <div className="flex justify-between items-center py-1 border-b border-natalis-border">
                    <span className="text-natalis-muted text-xs">🙏 Religion</span>
                    <span className="text-natalis-text font-semibold text-xs">{religionLabel}</span>
                  </div>
                  {/* Ethnicity */}
                  <div className="flex justify-between items-center py-1 border-b border-natalis-border">
                    <span className="text-natalis-muted text-xs">👤 Background</span>
                    <span className="text-natalis-text font-semibold text-xs">{ethnicName}</span>
                  </div>
                  {/* Sexual orientation */}
                  <div className={`flex justify-between items-center py-1${political_leaning ? ' border-b border-natalis-border' : ''}`}>
                    <span className="text-natalis-muted text-xs">🏳️‍🌈 Sexuality</span>
                    <span className="text-natalis-text font-semibold text-xs">
                      {flags.includes('orientation_asexual') ? 'Asexual' :
                       flags.includes('orientation_bisexual') ? 'Bisexual' :
                       flags.includes('orientation_gay') ? (character.gender === 'female' ? 'Lesbian' : 'Gay') :
                       flags.includes('lgbtq_identity') ? 'LGBTQ+' :
                       'Heterosexual'}
                    </span>
                  </div>
                  {/* Political leaning — only shown once earned through events */}
                  {political_leaning && (
                    <div className="flex justify-between items-center py-1">
                      <span className="text-natalis-muted text-xs">🗳️ Politics</span>
                      <span className="font-semibold text-xs capitalize" style={{
                        color: political_leaning === 'left' ? '#34c759' :
                               political_leaning === 'right' ? '#ff3b30' :
                               political_leaning === 'nationalist' ? '#ff3b30' :
                               political_leaning === 'dissident' ? '#ff9500' :
                               '#007aff'
                      }}>{political_leaning.replace('_', ' ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Life status */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                <p className="font-bold text-natalis-text text-sm mb-3">Life Status</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: '📍 Country', value: character.country.name },
                    { label: '📅 Phase', value: PHASE_LABELS[phase] },
                    { label: '🎓 Education', value: education.level !== 'none' ? `${education.level.replace('_',' ')}${education.field ? ` · ${education.field}` : ''}` : 'None' },
                    gpa !== null && { label: '📝 GPA', value: gpa.toFixed(2) },
                    martialArts?.discipline && { label: '🥋 Martial Arts', value: `${martialArts.discipline} — ${BELT_NAMES[martialArts.belt ?? 0]} belt` },
                    socialMedia?.followers > 0 && { label: '📱 Followers', value: `${socialMedia.followers >= 1000 ? `${(socialMedia.followers/1000).toFixed(1)}k` : socialMedia.followers}${socialMedia.verified ? ' ✓' : ''}` },
                    birthControl && { label: '💊 Birth Control', value: 'Active' },
                    inPrison && { label: '🔒 Prison', value: `${prisonSentence} yr remaining` },
                    criminalRecord.length > 0 && { label: '⚠️ Criminal Record', value: `${criminalRecord.length} offence${criminalRecord.length !== 1 ? 's' : ''}` },
                    fitness !== undefined && { label: '💪 Fitness', value: `${Math.round(fitness ?? 50)}/100` },
                    mentalHealth?.condition && { label: '🧠 Mental Health', value: `${mentalHealth.condition}${mentalHealth.therapy ? ' · therapy' : ''}${mentalHealth.medicating ? ' · medicated' : ''}` },
                    conditions.length > 0 && { label: '🩺 Conditions', value: conditions.map(c => `${c.id.replace(/_/g, ' ')}${c.managed ? ' (managed)' : ''}`).join(', ') },
                    (debt ?? 0) > 0 && { label: '💳 Debt', value: formatMoney(debt) },
                  ].filter(Boolean).map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-1 border-b border-natalis-border last:border-0">
                      <span className="text-natalis-muted text-xs">{label}</span>
                      <span className="text-natalis-text font-semibold text-xs capitalize">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Criminal Record */}
              {criminalRecord.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-red-200 shadow-card">
                  <p className="font-bold text-red-600 text-sm mb-3">⚠️ Criminal Record</p>
                  <div className="space-y-1">
                    {criminalRecord.map((entry, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-natalis-border last:border-0">
                        <span className="text-natalis-dim text-xs capitalize">{typeof entry === 'string' ? entry.replace(/_/g, ' ') : (entry.crime ?? 'Unknown offence').replace(/_/g, ' ')}</span>
                        {entry.age !== undefined && <span className="text-natalis-muted text-xs">Age {entry.age}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hobbies */}
              {hobbies && Object.keys(hobbies).length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">Hobbies</p>
                  <div className="space-y-2">
                    {Object.entries(hobbies).map(([hobby, level]) => {
                      const hobbyEmoji = { music: '🎸', art: '🎨', sport: '⚽', writing: '✍️', cooking: '🍳', coding: '💻', general: '🎯' }[hobby] ?? '🎯'
                      const tier = level >= 80 ? 'Master' : level >= 60 ? 'Expert' : level >= 40 ? 'Skilled' : level >= 20 ? 'Learning' : 'Beginner'
                      return (
                        <div key={hobby} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>{hobbyEmoji}</span>
                            <span className="text-sm text-natalis-dim font-medium capitalize">{hobby}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-purple-400" style={{ width: `${level}%` }} />
                            </div>
                            <span className="text-xs text-natalis-muted w-16 text-right">{tier}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Flags */}
              {flags.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">Life Flags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {flags.map(f => <FlagChip key={f} flag={f} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── PEOPLE TAB ── */}
          {activeTab === 'people' && (
            <div className="space-y-3">
              {/* Career */}
              {career && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">💼 Career</p>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-natalis-text">{career.title}</p>
                      <p className="text-bit-green font-bold text-sm">{formatMoney(career.salary)}/yr</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                      Yr {career.yearsInRole}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-natalis-muted">
                      <span>Performance</span>
                      <span>{Math.round(career.performance ?? 70)}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${career.performance ?? 70}%`, backgroundColor: (career.performance ?? 70) > 60 ? '#34c759' : (career.performance ?? 70) > 30 ? '#ff9500' : '#ff3b30' }} />
                    </div>
                  </div>
                  {career.level < (career.maxLevel ?? 99) && (() => {
                    const perf = career.performance ?? 70
                    const basePct = career.promotionChance ?? 0.12
                    const perfBonus = (perf - 70) * 0.003
                    const yearsBonus = Math.min((career.yearsInRole ?? 0) * 0.03, 0.15)
                    const smartsBonus = (stats.smarts - 50) * 0.001
                    const charismaBonus = (stats.charisma - 50) * 0.001
                    const effectivePct = Math.max(0, basePct + perfBonus + yearsBonus + smartsBonus + charismaBonus)
                    const estYears = effectivePct > 0 ? Math.round(1 / effectivePct) : null
                    return (
                      <div className="mt-2 pt-2 border-t border-natalis-border flex justify-between items-center">
                        <span className="text-xs text-natalis-muted">Promotion chance</span>
                        <span className="text-xs font-semibold" style={{ color: effectivePct > 0.2 ? '#34c759' : effectivePct > 0.1 ? '#ff9500' : '#8e8e93' }}>
                          ~{Math.round(effectivePct * 100)}%/yr{estYears ? ` · ~${estYears}yr avg` : ''}
                        </span>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* Partner */}
              {partner && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">❤️ Partner</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-natalis-text">{partner.name}{genderMark(partner.gender)}</p>
                      <p className="text-natalis-muted text-xs">{partner.married ? '💍 Married' : partner.engaged ? '💌 Engaged' : '💑 Dating'}{partner.age ? ` · Age ${partner.age}` : ''}</p>
                      {partner.traits?.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {partner.traits.map(t => (
                            <span key={t} className="text-[10px] bg-natalis-bg px-1.5 py-0.5 rounded-full text-natalis-muted capitalize">{t}</span>
                          ))}
                        </div>
                      )}
                      {(() => {
                        const pFlags = []
                        if (flags.includes('partner_illness_caretaker')) pFlags.push('caretaker')
                        if (flags.includes('couples_therapy')) pFlags.push('therapy')
                        const labels = relStatusLabel(partner.relationshipQuality, pFlags)
                        return labels.length > 0 ? (
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {labels.map(l => (
                              <span key={l.text} className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ color: l.color, background: l.color + '18' }}>{l.text}</span>
                            ))}
                          </div>
                        ) : null
                      })()}
                    </div>
                    <RelBar value={partner.relationshipQuality} color={relColor(partner.relationshipQuality)} />
                  </div>
                </div>
              )}

              {/* Children */}
              {children.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">👨‍👩‍👧 Children</p>
                  <div className="space-y-2">
                    {children.map((child, i) => {
                      const childAge = child.ageAtBirth !== undefined ? age - child.ageAtBirth : null
                      return (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <p className="text-natalis-dim text-sm">{child.name.split(' ')[0]}{genderMark(child.gender)}</p>
                            {childAge !== null && <p className="text-natalis-muted text-xs">Age {childAge}</p>}
                            {child.traits?.length > 0 && (
                              <div className="flex gap-1 mt-0.5 flex-wrap">
                                {child.traits.map(t => (
                                  <span key={t} className="text-[10px] bg-natalis-bg px-1.5 py-0.5 rounded-full text-natalis-muted capitalize">{t}</span>
                                ))}
                              </div>
                            )}
                            {(() => {
                              const cFlags = []
                              if (flags.includes('reconciled_with_child')) cFlags.push('reconciled')
                              const labels = relStatusLabel(child.relationshipQuality ?? 50, cFlags)
                              return labels.length > 0 ? (
                                <div className="flex gap-1 mt-0.5 flex-wrap">
                                  {labels.map(l => (
                                    <span key={l.text} className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ color: l.color, background: l.color + '18' }}>{l.text}</span>
                                  ))}
                                </div>
                              ) : null
                            })()}
                          </div>
                          <RelBar value={child.relationshipQuality} color={relColor(child.relationshipQuality)} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Parents */}
              {parents && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">👪 Parents</p>
                  <div className="space-y-2">
                    {['mother', 'father'].map(key => {
                      const p = parents[key]
                      if (!p) return null
                      const parentIncome = p.occupation ? formatParentIncome(p.occupation, character?.country?.gdp) : null
                      return (
                        <div key={key} className="flex justify-between items-center">
                          <div>
                            <p className="text-natalis-dim text-sm">{p.name.split(' ')[0]}{genderMark(key === 'mother' ? 'female' : 'male')}</p>
                            {p.currentAge && <p className="text-natalis-muted text-xs">{p.alive ? `Age ${p.currentAge}` : `Deceased · Age ${p.currentAge}`}</p>}
                            {!p.currentAge && !p.alive && <p className="text-natalis-muted text-xs">Deceased</p>}
                            {p.occupation?.title && p.occupation.title !== 'Homemaker' && (
                              <p className="text-natalis-muted text-xs italic">
                                {p.occupation.title}{parentIncome ? ` · ${parentIncome}` : ''}
                              </p>
                            )}
                            {p.occupation?.title === 'Homemaker' && (
                              <p className="text-natalis-muted text-xs italic">Homemaker</p>
                            )}
                            {p.alive && p.traits?.length > 0 && (
                              <div className="flex gap-1 mt-0.5 flex-wrap">
                                {p.traits.map(t => (
                                  <span key={t} className="text-[10px] bg-natalis-bg px-1.5 py-0.5 rounded-full text-natalis-muted capitalize">{t}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          {p.alive
                            ? <RelBar value={p.relationshipQuality} color={relColor(p.relationshipQuality)} />
                            : <span className="text-xs text-natalis-muted">✞</span>
                          }
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Siblings */}
              {siblings && siblings.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">👫 Siblings</p>
                  <div className="space-y-2">
                    {siblings.filter(sib => sib.ageDiff === undefined || age + sib.ageDiff >= 0).map((sib, i) => {
                      const sibAge = sib.ageDiff !== undefined ? age + sib.ageDiff : null
                      return (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <p className="text-natalis-dim text-sm">{sib.name.split(' ')[0]}{genderMark(sib.gender)}</p>
                            {sibAge !== null && <p className="text-natalis-muted text-xs">{sib.alive ? `Age ${Math.max(0, sibAge)}` : `Deceased · Age ${Math.max(0, sibAge)}`}</p>}
                            {sibAge === null && !sib.alive && <p className="text-natalis-muted text-xs">Deceased</p>}
                            {sib.alive && (() => {
                              const sf = []
                              if (flags.includes('sibling_estranged') && (sib.relationshipQuality ?? 50) < 40) sf.push('estranged')
                              if (flags.includes('sibling_reconciled') && (sib.relationshipQuality ?? 50) >= 50) sf.push('reconciled')
                              if (flags.includes('sibling_emigrated')) sf.push('abroad')
                              const labels = relStatusLabel(sib.relationshipQuality ?? 50, sf)
                              return labels.length > 0 ? (
                                <div className="flex gap-1 mt-0.5 flex-wrap">
                                  {labels.map(l => (
                                    <span key={l.text} className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ color: l.color, background: l.color + '18' }}>{l.text}</span>
                                  ))}
                                </div>
                              ) : null
                            })()}
                          </div>
                          {sib.alive
                            ? <RelBar value={sib.relationshipQuality} color={relColor(sib.relationshipQuality)} />
                            : <span className="text-xs text-natalis-muted">✞</span>
                          }
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Friends */}
              {friends && friends.filter(f => f.alive).length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">👥 Friends</p>
                  <div className="space-y-2">
                    {friends.filter(f => f.alive).map((friend, i) => {
                      const fLabels = relStatusLabel(friend.relationshipQuality ?? 60, [])
                      return (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <p className="text-natalis-dim text-sm">{friend.name.split(' ')[0]}</p>
                            {fLabels.length > 0 && (
                              <div className="flex gap-1 mt-0.5 flex-wrap">
                                {fLabels.map(l => (
                                  <span key={l.text} className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ color: l.color, background: l.color + '18' }}>{l.text}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <RelBar value={friend.relationshipQuality} color={relColor(friend.relationshipQuality)} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Pets */}
              {pets && pets.filter(p => p.alive).length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">🐾 Pets</p>
                  <div className="space-y-1">
                    {pets.filter(p => p.alive).map((pet, i) => (
                      <p key={i} className="text-natalis-dim text-sm capitalize">{pet.name} the {pet.species} · age {pet.age}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Ex-Partners */}
              {exPartners && exPartners.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">💔 Past Relationships</p>
                  <div className="space-y-2">
                    {exPartners.map((ex, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-natalis-border last:border-0">
                        <div>
                          <p className="text-natalis-dim text-sm">{ex.name}{genderMark(ex.gender)}</p>
                          <p className="text-natalis-muted text-xs">
                            {ex.married ? 'Divorced' : 'Separated'}{ex.separatedAt ? ` · Age ${ex.separatedAt}` : ''}
                          </p>
                        </div>
                        <span className="text-xs text-natalis-muted capitalize">{ex.occupation ?? ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!partner && children.length === 0 && (!friends || friends.filter(f=>f.alive).length === 0) && (
                <div className="bg-white rounded-2xl px-5 py-8 text-center border border-natalis-border">
                  <p className="text-4xl mb-2">🤝</p>
                  <p className="text-natalis-muted text-sm">No relationships yet. Get out there!</p>
                </div>
              )}
            </div>
          )}

          {/* ── ASSETS TAB ── */}
          {activeTab === 'assets' && (() => {
            const finRep = getFinancialReputationDisplay(fullState)
            const isChild = age < 18 && !career
            const familyTierLabel = isChild ? getWealthTierLabel(character.wealthTier ?? 3, character.country?.archetype) : null
            const showHardCurrency = hardCurrencyReserve > 0
            const hcLabel = ['wealthy_west','wealthy_east','post_soviet'].includes(character.country?.archetype) ? 'USD reserve' : 'Hard currency'

            return (
            <div className="space-y-3">

              {/* ── Family context (childhood only) ── */}
              {isChild && familyTierLabel && (
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 shadow-card">
                  <p className="font-bold text-amber-800 text-sm mb-1">🏡 Family Background</p>
                  <p className="text-amber-700 text-sm font-semibold">{familyTierLabel}</p>
                  <p className="text-xs text-amber-500 mt-2">Your personal savings: <span className="font-semibold">{formatMoney(money ?? 0)}</span></p>
                </div>
              )}

              {/* Net Worth Summary */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                <p className="font-bold text-natalis-text text-sm mb-3">💰 {isChild ? 'Personal Savings' : 'Net Worth'}</p>
                {!isChild && (
                  <div className="text-center mb-4">
                    <p className={`font-black text-2xl ${netWorth >= 0 ? 'text-green-600' : 'text-red-500'}`}>{formatMoney(netWorth)}</p>
                    <p className="text-xs text-natalis-muted mt-1">total net worth</p>
                  </div>
                )}
                <div className="space-y-2">
                  {[
                    { label: 'Cash', value: money ?? 0, color: 'text-green-600' },
                    gold > 0 && { label: 'Gold & jewelry', value: gold, color: 'text-yellow-600' },
                    showHardCurrency && { label: hcLabel, value: hardCurrencyReserve, color: 'text-blue-600' },
                    propertyEquity !== 0 && !isChild && { label: 'Property equity', value: propertyEquity, color: propertyEquity >= 0 ? 'text-green-600' : 'text-red-500' },
                    vehicleValue > 0 && !isChild && { label: 'Vehicles', value: vehicleValue, color: 'text-blue-600' },
                    (debt ?? 0) > 0 && { label: 'Outstanding debt', value: -(debt ?? 0), color: 'text-red-500' },
                  ].filter(Boolean).map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between items-center text-sm">
                      <span className="text-natalis-muted">{label}</span>
                      <span className={`font-semibold ${color}`}>{value >= 0 ? '+' : ''}{formatMoney(value)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-natalis-border grid grid-cols-2 gap-2">
                  {career && (
                    <div className="bg-blue-50 rounded-xl p-2.5">
                      <p className="text-xs text-blue-600 font-semibold">Annual Salary</p>
                      <p className="font-bold text-blue-700">{formatMoney(career.salary)}</p>
                    </div>
                  )}
                  {/* Financial reputation: credit score for wealthy_west/east, archetype-appropriate otherwise */}
                  {finRep && finRep.type === 'credit_score' && creditScore && (
                    <div className={`rounded-xl p-2.5 ${creditScore >= 700 ? 'bg-green-50' : creditScore >= 600 ? 'bg-yellow-50' : 'bg-red-50'}`}>
                      <p className={`text-xs font-semibold ${creditScore >= 700 ? 'text-green-600' : creditScore >= 600 ? 'text-yellow-600' : 'text-red-600'}`}>Credit Score</p>
                      <p className={`font-bold ${creditScore >= 700 ? 'text-green-700' : creditScore >= 600 ? 'text-yellow-700' : 'text-red-700'}`}>{creditScore} <span className="text-xs font-normal">({creditLabel(creditScore)})</span></p>
                    </div>
                  )}
                  {finRep && finRep.type !== 'credit_score' && (
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-xs text-natalis-muted font-semibold">{finRep.label}</p>
                      <p className="font-bold text-natalis-dim text-sm">{finRep.value}</p>
                    </div>
                  )}
                  {/* Banking status */}
                  <div className={`rounded-xl p-2.5 ${banked ? 'bg-green-50' : 'bg-orange-50'}`}>
                    <p className={`text-xs font-semibold ${banked ? 'text-green-600' : 'text-orange-600'}`}>Banking</p>
                    <p className={`font-bold text-sm ${banked ? 'text-green-700' : 'text-orange-700'}`}>{banked ? 'Banked' : 'Unbanked'}</p>
                  </div>
                </div>
              </div>

              {/* Household contribution */}
              {householdContribution?.annualAmount > 0 && (
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200 shadow-card">
                  <p className="font-bold text-orange-800 text-sm mb-2">🏠 Family Obligation</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-orange-700 text-sm">
                        {householdContribution.obligationType === 'zakat' ? 'Zakat (2.5% of savings)' :
                         householdContribution.obligationType === 'remittance' ? 'Remittances home' :
                         householdContribution.obligationType === 'joint_family' ? 'Joint family pool' :
                         'Household support'}
                      </p>
                      {householdContribution.reduced && <p className="text-xs text-orange-500 mt-0.5">Negotiated reduction</p>}
                    </div>
                    <p className="font-bold text-orange-800">{formatMoney(householdContribution.annualAmount)}<span className="text-xs font-normal text-orange-600">/yr</span></p>
                  </div>
                </div>
              )}

              {/* Joint family pool */}
              {jointFamily && jointFamilyPool > 0 && (
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 shadow-card">
                  <p className="font-bold text-amber-800 text-sm mb-1">🏘️ Joint Family Pool</p>
                  <p className="text-amber-700 font-black text-xl">{formatMoney(jointFamilyPool)}</p>
                  <p className="text-xs text-amber-600 mt-1">Shared family property — accessible via partition event</p>
                </div>
              )}

              {/* ROSCA */}
              {rosca && (
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-purple-800 text-sm">🔄 Savings Circle (ROSCA)</p>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">Active</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-600">Monthly contribution</span>
                      <span className="font-semibold text-purple-800">{formatMoney(rosca.monthly)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Annual contribution</span>
                      <span className="font-semibold text-purple-800">{formatMoney(rosca.monthly * 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Your payout year</span>
                      <span className="font-semibold text-purple-800">{rosca.nextPayoutYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Payout amount</span>
                      <span className="font-bold text-purple-900">{formatMoney(rosca.payoutAmount)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Properties */}
              {assets?.properties?.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">🏠 Properties</p>
                  <div className="space-y-2">
                    {assets.properties.map((prop, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-natalis-border last:border-0">
                        <p className="text-natalis-dim text-sm">{prop.name}</p>
                        <div className="text-right">
                          <p className="font-bold text-natalis-text text-sm">{formatMoney(prop.currentValue)}</p>
                          {prop.mortgage > 0 && <p className="text-xs text-red-500">-{formatMoney(prop.mortgage)}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vehicles */}
              {assets?.vehicles?.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <p className="font-bold text-natalis-text text-sm mb-3">🚗 Vehicles</p>
                  <div className="space-y-2">
                    {assets.vehicles.map((v, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <p className="text-natalis-dim text-sm">{v.name}</p>
                        <p className="font-bold text-natalis-text text-sm">{formatMoney(v.currentValue)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Debt detail */}
              {(debt ?? 0) > 0 && (
                <div className="bg-red-50 rounded-2xl p-4 border border-red-200 shadow-card">
                  <p className="font-bold text-red-600 text-sm mb-3">💳 Debt</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-red-700 font-black text-xl">{formatMoney(debt)}</p>
                      <p className="text-red-400 text-xs">~18% APR · interest accrues each year</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-red-500 font-semibold">Use Activities → Money</p>
                      <p className="text-xs text-red-400">to make payments</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Business P&L */}
              {business?.active && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{business.emoji ?? '🏢'}</span>
                    <p className="font-bold text-natalis-text text-sm">{business.name}</p>
                    <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                      Yr {business.yearsOpen ?? 0}
                    </span>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    {[
                      { label: 'Revenue', value: business.revenue ?? 0, color: 'text-green-600' },
                      { label: 'Expenses', value: -(business.expenses ?? 0), color: 'text-red-500' },
                      { label: 'Profit', value: (business.revenue ?? 0) - (business.expenses ?? 0), color: ((business.revenue ?? 0) - (business.expenses ?? 0)) >= 0 ? 'text-green-700 font-bold' : 'text-red-600 font-bold' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex justify-between items-center text-xs">
                        <span className="text-natalis-muted">{label}</span>
                        <span className={color}>{value >= 0 ? '' : '−'}{formatMoney(Math.abs(value))}/yr</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-natalis-border">
                    <div className="text-center">
                      <p className="text-xs text-natalis-muted">Employees</p>
                      <p className="font-bold text-natalis-text text-sm">{business.employees ?? 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-natalis-muted">Value</p>
                      <p className="font-bold text-natalis-text text-sm">{formatMoney(business.value ?? 0)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-natalis-muted">Performance</p>
                      <p className="font-bold text-sm" style={{ color: (business.performance ?? 50) > 60 ? '#34c759' : (business.performance ?? 50) > 35 ? '#ff9500' : '#ff3b30' }}>
                        {Math.round(business.performance ?? 50)}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${business.performance ?? 50}%`, backgroundColor: (business.performance ?? 50) > 60 ? '#34c759' : (business.performance ?? 50) > 35 ? '#ff9500' : '#ff3b30' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Closed business note */}
              {business && !business.active && (
                <div className="bg-gray-50 rounded-2xl p-4 border border-natalis-border">
                  <p className="text-sm text-natalis-muted">{business.emoji ?? '🏢'} <span className="font-semibold text-natalis-dim">{business.name}</span> — closed after {business.yearsOpen ?? 0} year{business.yearsOpen !== 1 ? 's' : ''}.</p>
                </div>
              )}

              {/* Travel history */}
              {travels && travels.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-natalis-text text-sm">✈️ Travel</p>
                    <span className="text-xs text-natalis-muted">{travels.length} trip{travels.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="space-y-1">
                    {[...travels].reverse().map((t, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-natalis-border last:border-0">
                        <p className="text-natalis-dim text-sm">{t.name}</p>
                        <p className="text-natalis-muted text-xs">Age {t.age} · {t.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {assets?.properties?.length === 0 && assets?.vehicles?.length === 0 && (debt ?? 0) === 0 && !business?.active && travels?.length === 0 && !rosca && !jointFamily && gold === 0 && (
                <div className="bg-white rounded-2xl px-5 py-8 text-center border border-natalis-border">
                  <p className="text-4xl mb-2">🏦</p>
                  <p className="text-natalis-muted text-sm">No assets yet. Start saving!</p>
                </div>
              )}
            </div>
            )
          })()}

        </div>
      </div>

      {/* ── Activities Panel (slides up) ─────────────────────────────── */}
      {showActivities && !pendingEvent && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end" onClick={() => setShowActivities(false)}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-50 bg-natalis-bg rounded-t-3xl max-h-[80vh] overflow-hidden shadow-card-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="overflow-y-auto max-h-[75vh]">
              <ActivitiesPanel onClose={() => setShowActivities(false)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Relocation Modal ───────────────────────────────────────────── */}
      {showMoveModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end" onClick={() => setShowMoveModal(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-50 bg-natalis-bg rounded-t-3xl max-h-[85vh] overflow-hidden shadow-card-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="overflow-y-auto max-h-[80vh] pb-6">
              {moveStep === 'pick' && (() => {
                const liveCountry = currentCountry ?? character.country
                const samePlaces = getPlacesForCountry(liveCountry.name).filter(p => p.id !== (currentPlace ?? character.birthPlace)?.id)
                const fromPlace = currentPlace ?? character.birthPlace
                const tierColors = { informal: '#ff3b30', working_class: '#ff9500', middle_class: '#34c759', elite: '#007aff' }
                const tierLabel = { informal: 'Informal', working_class: 'Working Class', middle_class: 'Middle Class', elite: 'Elite' }
                const scaleLabel = { village: 'Village', town: 'Town', mid_city: 'City', major_city: 'Major City', megacity: 'Megacity' }
                return (
                  <div className="px-4 py-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-natalis-text text-base">Move Within {liveCountry.name}</p>
                      <button onClick={() => setShowMoveModal(false)} className="text-natalis-muted text-sm">✕ Close</button>
                    </div>
                    <p className="text-natalis-muted text-xs">Select a destination. Cost shown is the moving expense.</p>
                    {samePlaces.length === 0 && (
                      <p className="text-natalis-dim text-sm text-center py-6">No other places available in {liveCountry.name}.</p>
                    )}
                    <div className="space-y-2">
                      {samePlaces.map(place => {
                        const cost = getRelocationCost(fromPlace, place)
                        const canAfford = (money ?? 0) >= cost
                        return (
                          <button
                            key={place.id}
                            onClick={() => { setSelectedPlace(place); setMoveStep('confirm') }}
                            disabled={!canAfford}
                            className="w-full text-left bg-white rounded-xl px-4 py-3 border border-natalis-border transition-all active:scale-95 disabled:opacity-40"
                          >
                            <div className="flex items-center justify-between">
                              <div className="min-w-0">
                                <p className="font-semibold text-natalis-text text-sm">{place.name}</p>
                                <p className="text-natalis-muted text-xs">{place.region} · {scaleLabel[place.scale] ?? place.scale}</p>
                              </div>
                              <div className="text-right ml-3 flex-shrink-0">
                                <p className="font-bold text-sm" style={{ color: canAfford ? '#34c759' : '#ff3b30' }}>
                                  {cost === 0 ? 'Free' : `$${cost.toLocaleString()}`}
                                </p>
                                <p className="text-xs text-natalis-muted">{canAfford ? 'Can afford' : 'Too expensive'}</p>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })()}
              {moveStep === 'confirm' && selectedPlace && (() => {
                const fromPlace = currentPlace ?? character.birthPlace
                const cost = getRelocationCost(fromPlace, selectedPlace)
                const canAfford = (money ?? 0) >= cost
                const nbTierColors = { informal: '#ff3b30', working_class: '#ff9500', middle_class: '#34c759', elite: '#007aff' }
                const nbTierLabels = { informal: 'Informal', working_class: 'Working Class', middle_class: 'Middle Class', elite: 'Elite' }
                const affordableNbrs = Object.entries(selectedPlace.neighborhoods ?? {}).map(([tier, names]) => ({
                  tier, names, label: nbTierLabels[tier], color: nbTierColors[tier],
                }))
                return (
                  <div className="px-4 py-3 space-y-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setMoveStep('pick')} className="text-natalis-muted text-sm">← Back</button>
                      <p className="font-bold text-natalis-text text-base flex-1 text-center">Moving to {selectedPlace.name}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-blue-800 text-sm">{selectedPlace.name}</p>
                        <p className="text-blue-600 text-xs">{selectedPlace.region}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-800 text-sm">${cost.toLocaleString()}</p>
                        <p className="text-blue-600 text-xs">moving cost</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-natalis-muted uppercase tracking-wider mb-2">Neighbourhood (where you end up)</p>
                      <div className="space-y-2">
                        {affordableNbrs.map(({ tier, names, label, color }) => (
                          <button
                            key={tier}
                            disabled={!canAfford}
                            onClick={() => {
                              relocateTo(selectedPlace.id, tier)
                              setShowMoveModal(false)
                              setSelectedPlace(null)
                            }}
                            className="w-full text-left bg-white rounded-xl px-4 py-3 border border-natalis-border transition-all active:scale-95 disabled:opacity-40"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-natalis-text text-sm">{label}</p>
                                <p className="text-natalis-muted text-xs">{names[0]}{names.length > 1 ? ` · ${names[1]}` : ''}</p>
                              </div>
                              <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: color + '22', color }}>
                                {label}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    {!canAfford && (
                      <p className="text-red-500 text-xs text-center">You need ${cost.toLocaleString()} to move here. You have ${(money ?? 0).toLocaleString()}.</p>
                    )}
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ── Pending event indicator (shown when event is waiting off-screen) ── */}
      {pendingEvent && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-natalis-border shadow-card-lg">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <button
              onClick={() => eventRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #007aff, #0055cc)' }}
            >
              ↑ A life event needs your decision
            </button>
          </div>
        </div>
      )}

      {/* ── Bottom bar ──────────────────────────────────────────────────── */}
      {!pendingEvent && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-natalis-border shadow-card-lg">
          <div className="max-w-2xl mx-auto flex items-center px-4 py-2 gap-3">

            {/* Actions remaining dots */}
            <div className="flex gap-1">
              {Array.from({ length: maxActionsPerYear }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i < actionsThisYear ? '#e5e5ea' : '#007aff' }} />
              ))}
            </div>

            {/* Activities / Prison Life button */}
            {inPrison ? (
              <button
                onClick={() => setShowActivities(v => !v)}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                style={{ background: showActivities ? '#636366' : 'linear-gradient(135deg,#ff3b30,#c0392b)', color: 'white' }}
              >
                {showActivities ? '✕ Close' : '🔒 Prison Life'}
              </button>
            ) : (
              <button
                onClick={() => setShowActivities(v => !v)}
                disabled={actionsLeft <= 0}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-40"
                style={{
                  background: actionsLeft > 0 ? 'linear-gradient(135deg,#af52de,#007aff)' : '#e5e5ea',
                  color: actionsLeft > 0 ? 'white' : '#8e8e93',
                }}
              >
                {showActivities ? '✕ Close' : '⚡ Activities'}
              </button>
            )}

            {/* Age Up — disabled during pending trial */}
            <div className="flex-1 flex flex-col gap-1">
              {desire && DESIRE_LABELS[desire] && (
                <p className="text-center text-[11px] italic text-natalis-muted leading-tight px-1">
                  {DESIRE_LABELS[desire]}
                </p>
              )}
              <button
                onClick={ageUp}
                disabled={!!pendingTrial}
                className="w-full py-3 rounded-xl font-black text-lg text-white transition-all active:scale-95 shadow-card disabled:opacity-50"
                style={{ background: pendingTrial ? '#e5e5ea' : 'linear-gradient(135deg, #34c759, #28a046)', color: pendingTrial ? '#8e8e93' : 'white' }}
              >
                {pendingTrial ? 'On Trial...' : 'Age Up +'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
