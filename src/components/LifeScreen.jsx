import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import StatBar from './StatBar'
import FlagChip from './FlagChip'
import EventBox from './EventBox'
import { getCountryFlag, REGIME_LABELS, REGIME_COLORS, RELIGION_LABELS, RESIDENCY_LABELS } from '../utils/countryUtils'
import { getCountryRegime, generateIdentityCard, DESIRE_LABELS, getWealthTierLabel, getFinancialReputationDisplay, formatParentIncome, getPhase } from '../engine/gameEngine'
import { getPlacesForCountry, getRelocationCost } from '../data/places'
import ActivitiesPanel from './ActivitiesPanel'

const PHASE_CHAPTER_LABELS = {
  childhood: 'Early Years',
  adolescence: 'Coming of Age',
  young_adult: 'Young Adulthood',
  midlife: 'Midlife',
  late_life: 'Late Life',
}

const PHASE_LABELS = {
  early_childhood: 'Early Childhood',
  childhood: 'Childhood',
  adolescence: 'Adolescence',
  young_adult: 'Young Adult',
  midlife: 'Midlife',
  late_life: 'Late Life',
}

const BELT_NAMES = ['white','yellow','orange','green','blue','purple','red','brown','black']


function RelBar({ value, color }) {
  return (
    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  )
}

/** Escape dismisses the open sheet. Both sheets render a full-screen scrim. */
function EscapeCloses({ active, onClose }) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onClose])
  return null
}

function relColor(q) {
  return q > 65 ? '#3f6146' : q > 35 ? '#8a6635' : '#8c3a2e'
}

// Tab panels
// Emoji removed. An emoji tab bar is the single loudest "this is a mobile game"
// signal available, and the design document asks for the opposite four times
// over. The words were always doing the work.
const TABS = [
  { key: 'life',   label: 'Life' },
  { key: 'stats',  label: 'Stats' },
  { key: 'people', label: 'People' },
  { key: 'assets', label: 'Assets' },
]

export default function LifeScreen() {
  const mode = useGameStore(st => st.mode)
  const isPassive = mode === 'passive'
  const [showActivities, setShowActivities] = useState(false)
  const [activeTab, setActiveTab] = useState('life')
  const [logMode, setLogMode] = useState('recent')
  const [openDecades, setOpenDecades] = useState(() => new Set([0]))
  const [searchQuery, setSearchQuery] = useState('')
  const eventRef = useRef(null)

  const pendingEvent = useGameStore(s => s.pendingEvent)

  useEffect(() => {
    if (pendingEvent && eventRef.current) {
      eventRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [pendingEvent])

  // Auto-open the current decade when the character enters a new one
  const ageFromStore = useGameStore(s => s.age)
  useEffect(() => {
    const d = Math.floor(ageFromStore / 10) * 10
    setOpenDecades(prev => prev.has(d) ? prev : new Set([...prev, d]))
  }, [Math.floor(ageFromStore / 10)])

  const [showMoveModal, setShowMoveModal] = useState(false)
  const [moveStep, setMoveStep] = useState('pick') // 'pick' | 'confirm'
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [flashDeltas, setFlashDeltas] = useState({})
  const prevStatsRef = useRef(null)
  const flashTimerRef = useRef(null)

  const resolveAutoEvent = useGameStore(s => s.resolveAutoEvent)
  const resolveChoice = useGameStore(s => s.resolveChoice)

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
  const goToTitle    = useGameStore(s => s.goToTitle)

  // Stat delta flash — shows +/- on stat bars when values change
  useEffect(() => {
    if (!prevStatsRef.current) { prevStatsRef.current = stats; return }
    const prev = prevStatsRef.current
    const deltas = {}
    let changed = false
    for (const key of ['happiness', 'health', 'smarts', 'looks']) {
      const d = Math.round((stats[key] ?? 0) - (prev[key] ?? 0))
      if (d !== 0) { deltas[key] = d; changed = true }
    }
    prevStatsRef.current = { ...stats }
    if (changed) {
      setFlashDeltas(deltas)
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
      flashTimerRef.current = setTimeout(() => setFlashDeltas({}), 2000)
    }
  }, [stats.happiness, stats.health, stats.smarts, stats.looks])

  // Keyboard shortcuts: Space/Enter → age up or continue; 1/2/3 → choices.
  //
  // The handler used to exempt only INPUT/TEXTAREA/SELECT and then call
  // preventDefault, which made the game unusable by keyboard: with a button
  // focused, Space both activated the button AND aged the character (focus
  // "Timeline", press Space, the view changes and a year passes), while Enter
  // was swallowed entirely so no button in the game could ever be activated
  // with it. A keyboard-only player could not reach Menu, the tabs, Move or
  // Activities without burning a year each time.
  //
  // So: anything focusable handles its own keys, and these shortcuts apply only
  // when the focus is on the page rather than on a control.
  useEffect(() => {
    const handleKey = (e) => {
      const t = e.target
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT') return
      // A focused button, link, or anything with a tabindex owns Space and Enter.
      if (typeof t.closest === 'function' &&
          t.closest('button, a, [role="button"], [role="tab"], [tabindex]:not([tabindex="-1"])')) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (pendingEvent?.isAutomatic) {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); resolveAutoEvent() }
        return
      }
      if (pendingEvent?.choices?.length > 0) {
        if (e.key === '1') { resolveChoice(0); return }
        if (e.key === '2' && pendingEvent.choices.length > 1) { resolveChoice(1); return }
        if (e.key === '3' && pendingEvent.choices.length > 2) { resolveChoice(2); return }
        return
      }
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); ageUp() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [pendingEvent, ageUp, resolveAutoEvent, resolveChoice])

  if (!character) return null

  const phase = getPhase(age)
  const liveCountry = currentCountry ?? character.country
  const birthCountry = character.country
  const isAbroad = liveCountry?.name !== birthCountry?.name
  const regime = getCountryRegime(liveCountry, currentYear)
  const regimeLabel = REGIME_LABELS[regime] ?? regime
  const regimeColor = REGIME_COLORS[regime] ?? '#7d766a'
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
  const legacy            = useGameStore(s => s.legacy ?? 0)

  // Derive addiction stage label for display
  const getAddictionStage = () => {
    const isAlcohol = flags.includes('alcohol_addiction') || flags.includes('heavy_drinker')
    const isDrug = flags.includes('drug_addiction') || flags.includes('drug_user') || flags.includes('substance_abuser')
    if (!isAlcohol && !isDrug && !flags.includes('gambling_addiction')) return null
    const uses = (mem?.alcoholUses ?? 0) + (mem?.drugUses ?? 0)
    const isAddicted = flags.includes('alcohol_addiction') || flags.includes('drug_addiction') || flags.includes('gambling_addiction')
    const isOverdosed = flags.includes('overdosed')
    if (isOverdosed || (isAddicted && uses > 20)) return { label: 'Stage 4 — Crisis', color: '#8c3a2e' }
    if (isAddicted) return { label: 'Stage 3 — Dependent', color: '#8c3a2e' }
    if (uses >= 5) return { label: 'Stage 2 — Heavy Use', color: '#8a6635' }
    return { label: 'Stage 1 — Casual Use', color: '#8a6635' }
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

  const karmaLabel = karma >= 85 ? 'Lives with deep purpose' : karma >= 70 ? 'More good than not' : karma >= 50 ? 'Navigating, as most do' : karma >= 30 ? 'Compromised by choices' : 'Haunted by what you\'ve done'
  const karmaColor = karma >= 70 ? '#3f6146' : karma >= 50 ? '#8a6635' : '#8c3a2e'
  const genderMark = (g) => g === 'male' ? <span className="text-blue-400 text-xs ml-1">♂</span> : g === 'female' ? <span className="text-pink-400 text-xs ml-1">♀</span> : null

  // Derives a readable status label from relationship quality
  const relStatusLabel = (quality, extraFlags = []) => {
    const labels = []
    if (extraFlags.includes('estranged')) labels.push({ text: 'Estranged', color: '#8c3a2e' })
    else if (extraFlags.includes('reconciled')) labels.push({ text: 'Reconciled', color: '#3f6146' })
    else if (extraFlags.includes('abroad')) labels.push({ text: 'Lives abroad', color: '#7d766a' })
    else if (quality <= 24) labels.push({ text: 'Estranged', color: '#8c3a2e' })
    else if (quality <= 39) labels.push({ text: 'Strained', color: '#8a6635' })
    else if (quality <= 55) labels.push({ text: 'Steady', color: '#7d766a' })
    else if (quality <= 75) labels.push({ text: 'Good', color: '#3f6470' })
    else if (quality >= 90) labels.push({ text: 'Very close', color: '#3f6146' })
    else if (quality >= 76) labels.push({ text: 'Close', color: '#3f6146' })
    if (extraFlags.includes('caretaker')) labels.push({ text: 'You\'re their carer', color: '#3f5670' })
    if (extraFlags.includes('therapy')) labels.push({ text: 'In couples therapy', color: '#3f5670' })
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
      {/* The gendered gradient emoji avatar is gone. A game that models what it
          was to be a woman in a particular place and decade should not open by
          reducing her to a pink bubble. The name and the year do the work. */}
      <header className="bg-natalis-surface border-b border-natalis-border flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-prose text-natalis-text text-base leading-tight truncate">
              {character.firstName} {character.surname}
            </h1>
            <p className="text-natalis-muted text-xs truncate">
              {career ? career.title : (retired ? 'Retired' : PHASE_LABELS[phase])}
            </p>
          </div>
          <div className="flex items-baseline gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-natalis-dim text-sm leading-tight tabular-nums">
                <span className="mr-1.5" aria-hidden="true">{getCountryFlag(currentCountry ?? character.country)}</span>
                {currentYear} · age {age}
              </p>
              <p className="text-natalis-muted text-xs tabular-nums">{formatMoney(money)}</p>
            </div>
            <button
              onClick={goToTitle}
              className="text-natalis-muted text-xs border border-natalis-border rounded-lg px-2 py-1 hover:bg-natalis-bg transition-colors"
              title="Save and return to title"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* ── Stats strip ────────────────────────────────────────────────── */}
      {/* Was a 2×2 grid of large saturated bars taking roughly a third of the
          screen, above the prose. Now one quiet row: four columns of hairline
          bars, so the writing starts near the top of the page where it belongs.
          The full six live in the Stats tab for anyone who wants them. */}
      <div className="bg-natalis-surface border-b border-natalis-border flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-2 grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-1.5">
          <StatBar stat="happiness" value={stats.happiness} delta={flashDeltas.happiness} />
          <StatBar stat="health"    value={stats.health}    delta={flashDeltas.health} />
          <StatBar stat="smarts"    value={stats.smarts}    delta={flashDeltas.smarts} />
          <StatBar stat="looks"     value={stats.looks}     delta={flashDeltas.looks} />
        </div>
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <div className="bg-natalis-surface border-b border-natalis-border flex-shrink-0">
        <div className="max-w-2xl mx-auto flex" role="tablist">
          {TABS.map(tab => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => { setActiveTab(tab.key); setShowActivities(false) }}
              className={`flex-1 py-2 text-xs tracking-[0.06em] transition-colors border-b-2 ${
                activeTab === tab.key
                  ? 'border-natalis-text text-natalis-text font-medium'
                  : 'border-transparent text-natalis-muted hover:text-natalis-dim'
              }`}
            >
              {tab.label}
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
            <div className="bg-natalis-surface rounded-2xl shadow-card overflow-hidden border border-natalis-border border-l-2 border-l-natalis-alarm">
              <div className="px-5 pt-5 pb-1">
                <p className="text-natalis-muted text-[11px] font-medium uppercase tracking-[0.14em]">On trial</p>
              </div>
              <div className="px-5 pt-3 pb-5 space-y-4">
                <p className="font-prose text-natalis-text text-prose-lg">
                  You are charged with <strong>{pendingTrial.crimeName.toLowerCase()}</strong> and facing up to {pendingTrial.sentence} year{pendingTrial.sentence !== 1 ? 's' : ''} in prison.
                </p>
                <div className="space-y-2 pt-1">
                  <p className="text-natalis-muted text-[11px] font-medium uppercase tracking-[0.14em]">How you answer it</p>
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
                        className="w-full text-left px-4 py-3 rounded-xl border border-natalis-rule
                                   bg-natalis-raised text-natalis-text font-prose text-[0.9375rem]
                                   hover:border-natalis-accent hover:bg-natalis-accent-soft
                                   transition-colors duration-150 active:scale-[0.99]
                                   disabled:opacity-40 disabled:hover:border-natalis-rule"
                      >
                        <div>{opt.label}</div>
                        <div className="text-xs text-natalis-muted mt-0.5">{opt.sub}</div>
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
            const tierColors = { informal: '#8c3a2e', working_class: '#8a6635', middle_class: '#3f6146', elite: '#3f5670' }
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

                {/* Who You Are — identity card pinned to top of Life tab */}
                {(() => {
                  const card = generateIdentityCard(fullState)
                  if (!card) return null
                  return (
                    <div className="px-4 py-3 border-l-2 border-natalis-rule">
                      <p className="text-[11px] font-medium text-natalis-muted uppercase tracking-[0.14em] mb-1.5">Who you are</p>
                      <p className="font-prose text-natalis-dim text-[0.9375rem] leading-relaxed">{card}</p>
                    </div>
                  )
                })()}

                {/* Toggle */}
                <div className="flex gap-1.5 bg-white rounded-2xl p-1.5 border border-natalis-border">
                  {[['recent','Recent'],['decades','Timeline'],['search','Search']].map(([mode, label]) => (
                    <button key={mode}
                      onClick={() => {
                        setLogMode(mode)
                        if (mode === 'decades') {
                          const d = Math.floor(age / 10) * 10
                          setOpenDecades(prev => prev.has(d) ? prev : new Set([...prev, d]))
                        }
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs transition-colors ${
                        logMode === mode
                          ? 'bg-natalis-accent-soft text-natalis-text font-medium'
                          : 'text-natalis-muted hover:text-natalis-dim'
                      }`}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* ── RECENT VIEW ── */}
                {logMode === 'recent' && recentLog.map((entry, i) => {
                  const entryYear = entry.year ?? ((character.birthYear ?? 1960) + (entry.age ?? 0))
                  const ageLabel = `Age ${entry.age} · ${entryYear}`

                  // Phase transition — chapter heading treatment
                  if (entry.isPhaseTransition) {
                    const chapterLabel = PHASE_CHAPTER_LABELS[entry.toPhase] ?? ''
                    return (
                      <div key={i} className="relative flex items-center my-1">
                        <div className="flex-grow border-t border-natalis-border" />
                        <div className="mx-3 text-center">
                          {chapterLabel && <p className="text-[10px] font-bold uppercase tracking-widest text-natalis-muted mb-0.5">{chapterLabel}</p>}
                          <p className="text-xs italic text-natalis-dim leading-snug max-w-xs">{entry.text}</p>
                          <p className="text-[10px] text-natalis-muted mt-0.5">{ageLabel}</p>
                        </div>
                        <div className="flex-grow border-t border-natalis-border" />
                      </div>
                    )
                  }

                  return (
                    <div key={i} className={`rounded-xl px-4 py-3 border text-sm leading-relaxed ${
                      entry.isDeath      ? 'bg-zinc-900 border-zinc-800 text-zinc-100' :
                      entry.isHeadline   ? 'bg-stone-100 border-stone-300 text-stone-700' :
                      entry.isSoundtrack ? 'bg-violet-50 border-violet-200 text-violet-900' :
                      entry.isWorld      ? 'bg-amber-50 border-amber-200 text-amber-800' :
                      entry.isLetter     ? 'bg-amber-50 border-amber-300 text-stone-800' :
                      entry.isKey        ? 'bg-blue-50 border-l-4 border-blue-400 text-blue-900' :
                      'bg-white border-natalis-border text-natalis-dim'
                    }`}>
                      {entry.isDeath && (
                        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">{ageLabel}</div>
                      )}
                      {entry.isHeadline && (
                        <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{ageLabel} · in the news</div>
                      )}
                      {entry.isSoundtrack && (
                        <div className="text-xs font-semibold uppercase tracking-wider text-violet-500 mb-1">{ageLabel} · what was playing</div>
                      )}
                      {entry.isWorld && entry.worldEventName && (
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">{entry.worldEventName}</div>
                      )}
                      {entry.isLetter && (
                        <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">{ageLabel} · a letter</div>
                      )}
                      {!entry.isHeadline && !entry.isSoundtrack && !entry.isDeath && !entry.isLetter && (
                        <span className={`font-bold mr-2 text-xs uppercase tracking-wider ${entry.isKey ? 'text-blue-500 opacity-100' : 'opacity-60'}`}>{ageLabel}</span>
                      )}
                      <span className={`font-prose ${entry.isHeadline || entry.isSoundtrack ? 'italic text-sm' : ''} ${entry.isLetter ? 'italic block ml-2 border-l-2 border-amber-300 pl-3' : ''} ${entry.isKey && !entry.isWorld ? 'text-natalis-text' : ''}`}>{entry.text}</span>
                      {entry.outcome && (
                        <span className="block mt-1.5 pl-3 border-l border-natalis-rule text-natalis-muted font-prose">{entry.outcome}</span>
                      )}
                    </div>
                  )
                })}

                {/* ── TIMELINE / DECADES VIEW ── */}
                {logMode === 'decades' && (() => {
                  const DECADE_LABELS = {
                    0: 'Childhood', 10: 'Your Teens', 20: 'Your Twenties',
                    30: 'Your Thirties', 40: 'Your Forties', 50: 'Your Fifties',
                    60: 'Your Sixties', 70: 'Your Seventies', 80: 'Your Eighties', 90: 'Your Nineties',
                  }
                  const birthYear = character.birthYear ?? (currentYear - age)

                  const grouped = {}
                  for (const entry of log) {
                    const d = Math.floor((entry.age ?? 0) / 10) * 10
                    if (!grouped[d]) grouped[d] = []
                    grouped[d].push(entry)
                  }
                  const sortedDecades = Object.keys(grouped).map(Number).sort((a, b) => a - b)

                  return sortedDecades.map(decade => {
                    const entries = grouped[decade]
                    const isOpen = openDecades.has(decade)
                    const label = DECADE_LABELS[decade] ?? `Your ${decade}s`
                    const yearStart = birthYear + decade
                    const yearEnd = Math.min(birthYear + decade + 9, currentYear)
                    const deathCount = entries.filter(e => e.isDeath).length
                    const worldCount = entries.filter(e => e.isWorld).length

                    // Up to 3 pull-quotes: prioritise key/death/world entries, then any
                    const keyEntries = entries.filter(e => e.isKey || e.isDeath || e.isWorld)
                    const previewEntries = keyEntries.length >= 2 ? keyEntries.slice(0, 3) : [...keyEntries, ...entries.filter(e => !e.isKey && !e.isDeath && !e.isWorld)].slice(0, 3)

                    return (
                      <div key={decade} className="bg-white rounded-2xl border border-natalis-border overflow-hidden">
                        <button
                          className="w-full px-4 py-3 bg-gray-50 border-b border-natalis-border flex items-start justify-between text-left active:bg-gray-100 transition-colors"
                          onClick={() => setOpenDecades(prev => {
                            const next = new Set(prev)
                            if (next.has(decade)) next.delete(decade)
                            else next.add(decade)
                            return next
                          })}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold uppercase tracking-wider text-natalis-text">{label}</span>
                              {deathCount > 0 && <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">· loss</span>}
                              {worldCount > 0 && <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-wide">· {worldCount} world</span>}
                            </div>
                            <div className="text-[11px] text-natalis-muted mt-0.5">
                              {yearStart}–{yearEnd} · {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                            </div>
                            {!isOpen && previewEntries.length > 0 && (
                              <div className="mt-1.5 space-y-0.5">
                                {previewEntries.map((entry, pi) => (
                                  <p key={pi} className={`text-[11px] italic truncate pr-4 ${entry.isWorld ? 'text-amber-600' : entry.isKey ? 'text-blue-500' : 'text-natalis-muted'}`}>
                                    {pi > 0 && <span className="not-italic text-natalis-muted opacity-50 mr-1">·</span>}
                                    {(entry.text ?? '').slice(0, 90)}{(entry.text ?? '').length > 90 ? '…' : ''}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="text-natalis-muted text-sm ml-2 mt-0.5 flex-shrink-0">{isOpen ? '▾' : '▸'}</span>
                        </button>

                        {isOpen && (
                          <div className="divide-y divide-natalis-border">
                            {entries.map((entry, i) => {
                              const ey = entry.year ?? ((character.birthYear ?? 1960) + (entry.age ?? 0))
                              const al = `Age ${entry.age} · ${ey}`
                              if (entry.isPhaseTransition) {
                                return (
                                  <div key={i} className="px-4 py-3 text-center bg-natalis-bg">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-natalis-muted">{PHASE_CHAPTER_LABELS[entry.toPhase] ?? ''}</p>
                                    <p className="text-xs italic text-natalis-dim mt-0.5">{entry.text}</p>
                                  </div>
                                )
                              }
                              return (
                                <div key={i} className={`px-4 py-2.5 text-sm leading-relaxed ${
                                  entry.isDeath      ? 'bg-zinc-900 text-zinc-100' :
                                  entry.isHeadline   ? 'bg-stone-100 text-stone-700' :
                                  entry.isSoundtrack ? 'bg-violet-50 text-violet-900' :
                                  entry.isWorld      ? 'bg-amber-50 text-amber-800' :
                                  entry.isLetter     ? 'bg-amber-50 text-stone-800' :
                                  entry.isKey        ? 'bg-blue-50 border-l-4 border-blue-400 text-blue-900' :
                                  'text-natalis-dim'
                                }`}>
                                  {entry.isDeath && <span className="font-semibold mr-1.5 text-xs text-zinc-400 uppercase">{al} — </span>}
                                  {!entry.isHeadline && !entry.isSoundtrack && !entry.isDeath && !entry.isLetter && <span className={`font-bold mr-2 text-xs ${entry.isKey ? 'text-blue-500' : 'opacity-50'}`}>{al}</span>}
                                  {entry.isHeadline && <span className="text-xs font-semibold mr-1 text-stone-500">📰 {al} — </span>}
                                  {entry.isSoundtrack && <span className="text-xs font-semibold mr-1 text-violet-500">🎵 {al} — </span>}
                                  {entry.isWorld && entry.worldEventName && <span className="text-xs font-bold mr-1">🌐 {entry.worldEventName} — </span>}
                                  {entry.isLetter && <span className="text-xs font-semibold mr-1 text-amber-700">✉ {al} — </span>}
                                  <span className={`${entry.isHeadline || entry.isSoundtrack ? 'italic' : ''} ${entry.isLetter ? 'italic' : ''} ${entry.isKey && !entry.isWorld ? 'font-medium' : ''}`}>{entry.text}</span>
                                  {entry.outcome && (
                                    <span className="block mt-1 pl-2 border-l-2 border-natalis-border text-natalis-dim">{entry.outcome}</span>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })
                })()}

                {/* ── SEARCH VIEW ── */}
                {logMode === 'search' && (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search your life story…"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        autoFocus
                        className="w-full bg-white border border-natalis-border rounded-xl px-4 py-3 text-sm text-natalis-text placeholder-natalis-muted focus:outline-none focus:border-bit-blue"
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-3 text-natalis-muted text-sm font-bold hover:text-natalis-text">✕</button>
                      )}
                    </div>
                    {searchQuery.length >= 2 ? (() => {
                      const q = searchQuery.toLowerCase()
                      const matches = log.filter(e => e.text?.toLowerCase().includes(q) || e.outcome?.toLowerCase().includes(q))
                      if (matches.length === 0) return (
                        <p className="text-natalis-muted text-sm italic text-center py-6">No entries match "{searchQuery}"</p>
                      )
                      return (
                        <>
                          <p className="text-natalis-muted text-xs px-1">{matches.length} {matches.length === 1 ? 'result' : 'results'}</p>
                          {matches.slice(0, 60).map((entry, i) => (
                            <div key={i} className={`rounded-xl px-4 py-3 border text-sm leading-relaxed ${
                              entry.isDeath      ? 'bg-zinc-900 border-zinc-800 text-zinc-100' :
                              entry.isHeadline   ? 'bg-stone-100 border-stone-300 text-stone-700' :
                              entry.isSoundtrack ? 'bg-violet-50 border-violet-200 text-violet-900' :
                              entry.isWorld      ? 'bg-amber-50 border-amber-200 text-amber-800' :
                              entry.isKey        ? 'bg-blue-50 border-blue-200 text-blue-800' :
                              'bg-white border-natalis-border text-natalis-dim'
                            }`}>
                              <span className="font-bold mr-2 text-xs uppercase tracking-wider opacity-60">Age {entry.age}</span>
                              {entry.isSoundtrack && <span className="text-xs font-semibold mr-1 text-violet-500">🎵 </span>}
                              {entry.isWorld && entry.worldEventName && <span className="text-xs font-bold mr-1">🌐 {entry.worldEventName} — </span>}
                              <span className={entry.isHeadline || entry.isSoundtrack ? 'italic' : ''}>{entry.text}</span>
                              {entry.outcome && <span className="block mt-1 text-natalis-dim">{entry.outcome}</span>}
                            </div>
                          ))}
                        </>
                      )
                    })() : (
                      <p className="text-natalis-muted text-sm italic text-center py-6">Type to search across your entire life story</p>
                    )}
                  </div>
                )}

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
              {/* All stats */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card space-y-4">
                <p className="font-bold text-natalis-text text-sm">Your Stats</p>
                <StatBar stat="happiness" label="Happiness" value={stats.happiness} />
                <StatBar stat="health"    label="Health"    value={stats.health} />
                <StatBar stat="smarts"    label="Smarts"    value={stats.smarts} />
                <div>
                  <StatBar stat="looks" label="Looks" value={stats.looks} />
                  <p className="text-xs text-natalis-muted mt-0.5">
                    {stats.looks >= 75 ? 'Appearance opens certain doors. Not all of them worth opening.' :
                     stats.looks >= 50 ? 'Unremarkable in the best sense.' :
                     'You have learned that appearance carries weight in the world.'}
                  </p>
                </div>
                <div>
                  <StatBar stat="charisma" label="Charisma" value={stats.charisma} />
                  <p className="text-xs text-natalis-muted mt-0.5">
                    {stats.charisma >= 75 ? 'People are drawn to you. Doors open before you knock.' :
                     stats.charisma >= 50 ? 'You make friends without difficulty. Rooms feel open to you.' :
                     stats.charisma >= 30 ? 'Some social situations cost you more than others.' :
                     'You do better one-on-one than in groups. Groups are exhausting.'}
                  </p>
                </div>
                <div>
                  <StatBar stat="wealth" label="Wealth (lifestyle score)" value={stats.wealth} />
                  <p className="text-xs text-natalis-muted mt-1">Cash: <span className="font-semibold text-natalis-text">{formatMoney(money)}</span> · Net Worth: <span className="font-semibold text-natalis-text">{formatMoney(netWorth)}</span></p>
                </div>
              </div>

              {/* Extra stats */}
              <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                <p className="font-bold text-natalis-text text-sm mb-3">Profile</p>
                <div className="space-y-2">
                  {/* Karma — shown as prose label, not a number */}
                  <div className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-2">
                      <span>{karma >= 70 ? '😇' : karma >= 50 ? '😐' : '😈'}</span>
                      <span className="text-sm text-natalis-dim font-medium">Karma</span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: karmaColor }}>{karmaLabel}</span>
                  </div>

                  {/* Fame — bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>⭐</span>
                      <span className="text-sm text-natalis-dim font-medium">Fame</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${fame}%`, backgroundColor: '#8a7435' }} />
                      </div>
                      <span className="text-xs font-bold text-natalis-muted w-8 text-right">{Math.round(fame)}</span>
                    </div>
                  </div>

                  {/* Weight — qualitative label, not a raw number */}
                  <div className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-2">
                      <span>🪨</span>
                      <span className="text-sm text-natalis-dim font-medium">Weight</span>
                    </div>
                    <span className="text-xs font-semibold text-natalis-muted">
                      {regret > 70 ? 'Heavy'
                        : regret > 50 ? 'Considerable'
                        : regret > 30 ? 'Something there'
                        : regret > 15 ? 'A little'
                        : 'Clear'}
                    </span>
                  </div>

                  {/* Legacy — only shown once it accumulates */}
                  {legacy > 0 && (
                    <div className="flex items-center justify-between py-0.5">
                      <div className="flex items-center gap-2">
                        <span>🕯️</span>
                        <span className="text-sm text-natalis-dim font-medium">Legacy</span>
                      </div>
                      <span className="text-xs font-semibold text-natalis-muted">
                        {legacy >= 80 ? 'Enduring'
                          : legacy >= 60 ? 'Remembered'
                          : legacy >= 40 ? 'Touched lives'
                          : legacy >= 20 ? 'Left a mark'
                          : 'Taking shape'}
                      </span>
                    </div>
                  )}
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
                      <span className="font-semibold text-xs" style={{ color: residencyStatus === 'undocumented' || residencyStatus === 'tourist_overstay' ? '#8c3a2e' : residencyStatus === 'refugee_status' || residencyStatus === 'asylum_seeker' ? '#8a6635' : '#3f5670' }}>
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
                        color: political_leaning === 'left' ? '#3f6146' :
                               political_leaning === 'right' ? '#8c3a2e' :
                               political_leaning === 'nationalist' ? '#8c3a2e' :
                               political_leaning === 'dissident' ? '#8a6635' :
                               '#3f5670'
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

              {/* Significant Experiences — curated subset of flags */}
              {(() => {
                const SIGNIFICANT_FLAG_LABELS = {
                  // Hardships & wounds
                  war_childhood: 'War Childhood', hunger_childhood: 'Childhood Hunger',
                  anxious_child: 'Anxious Child', orphan: 'Orphan', early_grief: 'Early Grief',
                  child_labor: 'Child Labor', child_soldier: 'Child Soldier',
                  missed_schooling: 'Missed Schooling', left_school_early: 'Left School Early',
                  dropped_out: 'Dropped Out', early_marriage: 'Early Marriage',
                  refugee: 'Refugee', displaced: 'Displaced',
                  abusive_relationship: 'Abusive Relationship',
                  learned_silence: 'Learned Silence', guarded_heart: 'Guarded Heart',
                  estranged_family: 'Estranged Family', reluctant_parent: 'Reluctant Parent',
                  deadbeat_parent: 'Absent Parent', child_loss: 'Lost a Child',
                  // Struggles & conditions
                  smoker: 'Smoker', heavy_drinker: 'Heavy Drinker',
                  alcohol_addiction: 'Alcohol Addiction', drug_addiction: 'Drug Addiction',
                  gambling_addiction: 'Gambling Addiction', addiction: 'Addiction',
                  chronic_illness: 'Chronic Illness', medical_debt: 'Medical Debt',
                  in_therapy: 'In Therapy', abuser: 'Abuser', widowed: 'Widowed',
                  divorced: 'Divorced', criminal_record: 'Criminal Record',
                  gang_past: 'Gang Past', gang_member: 'Gang Member',
                  compromised: 'Compromised', corruption_exposed: 'Exposed for Corruption',
                  // World events survived
                  genocide_survivor: 'Genocide Survivor', famine_survivor: 'Famine Survivor',
                  disaster_survivor: 'Disaster Survivor', war_generation: 'War Generation',
                  revolution_generation: 'Revolution Generation',
                  lived_through_occupation: 'Lived Through Occupation',
                  lived_through_coup: 'Lived Through Coup',
                  hyperinflation_survivor: 'Hyperinflation Survivor',
                  economic_collapse_survivor: 'Economic Collapse Survivor',
                  aids_generation: 'AIDS Generation', apartheid_generation: 'Apartheid Generation',
                  chernobyl_generation: 'Chernobyl Generation',
                  lived_through_pandemic: 'Pandemic Survivor',
                  // Achievements & character
                  secure_base: 'Stable Upbringing', determined_student: 'Determined Student',
                  scholarship_won: 'Scholarship', university_graduate: 'University Graduate',
                  first_gen_graduate: 'First-Gen Graduate', adult_learner: 'Adult Learner',
                  integrity: 'Person of Integrity', trusted_person: 'Trusted',
                  emotionally_honest: 'Emotionally Honest', compassionate: 'Compassionate',
                  strong_marriage: 'Strong Marriage', found_meaning: 'Found Meaning',
                  acceptance: 'At Peace', processed_grief: 'Processed Grief',
                  reconciled_family: 'Family Reconciled', reconciled_with_child: 'Reconciled with Child',
                  cared_for_parents: 'Cared for Parents', cycle_broken: 'Broke the Cycle',
                  in_recovery: 'In Recovery', rehab_graduate: 'Rehabilitation',
                  grandparent: 'Grandparent', mentor: 'Mentor',
                  community_leader: 'Community Leader', committed_activist: 'Activist',
                  bridge_builder: 'Bridge Builder', legacy_support: 'Left a Legacy',
                  // Life paths
                  emigrated: 'Emigrated', entrepreneur: 'Entrepreneur',
                  self_made_woman: 'Self-Made', veteran: 'Veteran',
                  prison_education: 'Educated in Prison',
                  health_conscious: 'Health Conscious',
                  bookworm: 'Bookworm', school_athlete: 'School Athlete',
                  has_close_friend: 'Close Friend', martial_arts: 'Martial Artist',
                  has_licence: "Driver's Licence", pilot_licence: "Pilot's Licence",
                  survived_soviet_collapse: 'Survived Soviet Collapse',
                  cold_war_generation: 'Cold War Generation',
                }
                const significant = flags.filter(f => SIGNIFICANT_FLAG_LABELS[f])
                if (significant.length === 0) return null
                return (
                  <div className="bg-white rounded-2xl p-4 border border-natalis-border shadow-card">
                    <p className="font-bold text-natalis-text text-sm mb-3">Significant Experiences</p>
                    <div className="flex flex-wrap gap-1.5">
                      {significant.map(f => <FlagChip key={f} flag={f} label={SIGNIFICANT_FLAG_LABELS[f]} />)}
                    </div>
                  </div>
                )
              })()}
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
                        style={{ width: `${career.performance ?? 70}%`, backgroundColor: (career.performance ?? 70) > 60 ? '#3f6146' : (career.performance ?? 70) > 30 ? '#8a6635' : '#8c3a2e' }} />
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
                        <span className="text-xs font-semibold" style={{ color: effectivePct > 0.2 ? '#3f6146' : effectivePct > 0.1 ? '#8a6635' : '#7d766a' }}>
                          ~{Math.round(effectivePct * 100)}%/yr{estYears ? ` · ~${estYears}yr avg` : ''}
                        </span>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* Partner */}
              {partner && (
                <div className="bg-white rounded-2xl overflow-hidden border border-natalis-border shadow-card">
                  {/* Partner moment — shown prominently at top when available */}
                  {mem?.partnerMoments?.length > 0 && (
                    <div className="px-4 pt-4 pb-3" style={{ background: '#f8eef0' }}>
                      <p className="text-[13px] italic leading-relaxed" style={{ color: '#7b4356' }}>
                        &ldquo;{mem.partnerMoments.at(-1)}&rdquo;
                      </p>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="font-bold text-natalis-text text-sm mb-3">❤️ Partner</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-natalis-text">{partner.name}{genderMark(partner.gender)}</p>
                        <p className="text-natalis-muted text-xs">{partner.married ? '💍 Married' : partner.engaged ? '💌 Engaged' : '💑 Dating'}{partner.age ? ` · Age ${partner.age}` : ''}</p>
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
                  <p className="text-natalis-muted text-sm">Nobody yet. That changes, or it does not.</p>
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
                      <p className="font-bold text-sm" style={{ color: (business.performance ?? 50) > 60 ? '#3f6146' : (business.performance ?? 50) > 35 ? '#8a6635' : '#8c3a2e' }}>
                        {Math.round(business.performance ?? 50)}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${business.performance ?? 50}%`, backgroundColor: (business.performance ?? 50) > 60 ? '#3f6146' : (business.performance ?? 50) > 35 ? '#8a6635' : '#8c3a2e' }} />
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
                  <p className="text-natalis-muted text-sm">Nothing here yet. Most lives take a while to accumulate anything a list can hold.</p>
                </div>
              )}
            </div>
            )
          })()}

        </div>
      </div>

      {/* ── Activities Panel (slides up) ─────────────────────────────── */}
      {/* Escape closes whichever sheet is open. The Move sheet's confirm step
          had no close control at all, so Escape left a full-screen scrim over
          the app with no way out but reloading. */}
      <EscapeCloses
        active={showActivities || showMoveModal}
        onClose={() => { setShowActivities(false); setShowMoveModal(false) }}
      />

      {showActivities && !pendingEvent && !isPassive && (
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
                const tierColors = { informal: '#8c3a2e', working_class: '#8a6635', middle_class: '#3f6146', elite: '#3f5670' }
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
                                <p className="font-bold text-sm" style={{ color: canAfford ? '#3f6146' : '#8c3a2e' }}>
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
                const nbTierColors = { informal: '#8c3a2e', working_class: '#8a6635', middle_class: '#3f6146', elite: '#3f5670' }
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
              className="w-full py-2.5 rounded-xl text-sm font-prose text-natalis-dim
                         border border-natalis-rule bg-natalis-surface
                         hover:border-natalis-text hover:text-natalis-text
                         transition-colors active:scale-[0.99]"
            >
              Something is waiting for you &uarr;
            </button>
          </div>
        </div>
      )}

      {/* ── Bottom bar ──────────────────────────────────────────────────── */}
      {!pendingEvent && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-natalis-border shadow-card-lg">
          <div className="max-w-2xl mx-auto flex items-center px-4 py-2 gap-3">

            {/* Actions remaining — meaningless in passive mode, where the only verb is Age Up */}
            <div className={`flex-col items-center gap-1 min-w-[36px] ${isPassive ? 'hidden' : 'flex'}`}>
              <div className="flex gap-1">
                {Array.from({ length: maxActionsPerYear }).map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: i < actionsThisYear ? '#e2ddd2' : '#3f5670' }} />
                ))}
              </div>
              <span className="text-[9px] font-medium leading-none" style={{ color: actionsLeft > 0 ? '#3f5670' : '#7d766a' }}>
                {actionsLeft > 0 ? `${actionsLeft} left` : 'none left'}
              </span>
            </div>

            {/* Activities / Prison Life button — active mode only */}
            {isPassive ? null : inPrison ? (
              <button
                onClick={() => setShowActivities(v => !v)}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                style={{ background: showActivities ? '#4a453e' : '#8c3a2e', color: '#fdfcf9' }}
              >
                Prison life
              </button>
            ) : (
              <button
                onClick={() => setShowActivities(v => !v)}
                disabled={actionsLeft <= 0}
                className="flex-1 py-3 rounded-xl text-sm font-prose border transition-colors active:scale-[0.99]
                           disabled:opacity-40 border-natalis-rule bg-natalis-surface text-natalis-dim
                           hover:border-natalis-text hover:text-natalis-text"
              >
                Activities
              </button>
            )}

            {/* Age Up — disabled during pending trial */}
            <div className="flex-1 flex flex-col gap-1">
              {desire && DESIRE_LABELS[desire] && (
                <p className="text-center text-xs italic text-natalis-dim leading-snug border-l-2 border-natalis-border pl-2">
                  {DESIRE_LABELS[desire]}
                </p>
              )}
              <button
                onClick={ageUp}
                disabled={!!pendingTrial}
                className="w-full py-3 rounded-xl font-black text-lg text-white transition-all active:scale-95 shadow-card disabled:opacity-50"
                style={{ background: pendingTrial ? '#e2ddd2' : '#1c1a16', color: pendingTrial ? '#7d766a' : '#fdfcf9' }}
              >
                {pendingTrial ? 'On trial' : 'Another year'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
