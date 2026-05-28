import { useState, useMemo } from 'react'
import { useGameStore } from '../store/gameStore'
import { COUNTRIES } from '../data/countries'
import { RELIGION_LABELS } from '../utils/countryUtils'
import StatBar from './StatBar'

const STABILITY_OPTIONS = [
  { value: 'secure',    label: 'Secure',    desc: 'Stable, privileged, loving household', color: '#007aff' },
  { value: 'stable',    label: 'Stable',    desc: 'Solid, modest, functional family', color: '#34c759' },
  { value: 'struggling', label: 'Struggling', desc: 'Real hardship, but holding together', color: '#ff9500' },
  { value: 'unstable',  label: 'Unstable',  desc: 'Difficult, unpredictable circumstances', color: '#ff3b30' },
]

const RURAL_OPTIONS = [
  { value: 'urban',    label: 'Urban',    desc: 'City-born — density, opportunity, pace' },
  { value: 'suburban', label: 'Suburban', desc: 'Town or outskirts — between worlds' },
  { value: 'rural',    label: 'Rural',    desc: 'Countryside or village — slower, rooted' },
]

const STAT_LABELS = [
  ['happiness', 'Happiness'],
  ['health',    'Health'],
  ['smarts',    'Smarts'],
  ['looks',     'Looks'],
  ['charisma',  'Charisma'],
]

export default function CuratedBirthScreen() {
  const goToTitle       = useGameStore(s => s.goToTitle)
  const startCuratedGame = useGameStore(s => s.startCuratedGame)

  const [step, setStep] = useState(1) // 1=country, 2=year+gender, 3=lifestyle, 4=preview

  // Selections
  const [country, setCountry] = useState(null)
  const [birthYear, setBirthYear] = useState(null)
  const [gender, setGender] = useState(null)
  const [ruralUrban, setRuralUrban] = useState(null)
  const [familyStability, setFamilyStability] = useState(null)
  const [religion, setReligion] = useState(null)
  const [countrySearch, setCountrySearch] = useState('')

  const selectedCountry = useMemo(() =>
    country ? COUNTRIES.find(c => c.name === country) : null
  , [country])

  const filteredCountries = useMemo(() =>
    COUNTRIES
      .filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
  , [countrySearch])

  const yearMin = selectedCountry?.yearRange[0] ?? 1900
  const yearMax = selectedCountry?.yearRange[1] ?? 2010
  const effectiveYear = birthYear ?? Math.round((yearMin + yearMax) / 2)

  const religions = selectedCountry
    ? Object.keys(selectedCountry.religionWeights ?? {}).sort((a, b) =>
        (selectedCountry.religionWeights[b] ?? 0) - (selectedCountry.religionWeights[a] ?? 0)
      )
    : []

  // Preview stats (approximate without full character creation)
  const previewStats = useMemo(() => {
    if (!selectedCountry) return null
    const wt = 2 // middle wealth tier for preview
    const stab = familyStability ?? 'stable'
    const hc = selectedCountry.healthcare ?? 'fair'
    const hcBonus = { excellent: 15, good: 8, fair: 0, poor: -10, very_poor: -20 }[hc] ?? 0
    const stabBonus = { secure: 15, stable: 5, struggling: -5, unstable: -20 }[stab] ?? 0
    const gdpBonus = { very_high: 15, high: 10, medium_high: 5, medium: 0, low_medium: -5, low: -10, very_low: -15 }[selectedCountry.gdp] ?? 0
    return {
      happiness: Math.min(95, Math.max(10, 60 + stabBonus)),
      health: Math.min(95, Math.max(15, 55 + hcBonus)),
      smarts: Math.min(90, Math.max(15, 50 + gdpBonus)),
      looks: 50,
      charisma: Math.min(85, Math.max(15, 50 + Math.round(stabBonus / 2))),
    }
  }, [selectedCountry, familyStability])

  const canProceed = (s) => {
    if (s === 1) return !!country
    if (s === 2) return gender !== null
    if (s === 3) return true
    return true
  }

  const handleBegin = () => {
    startCuratedGame({
      country,
      birthYear: effectiveYear,
      gender,
      ruralUrban,
      familyStability,
      religion,
    })
  }

  return (
    <div className="min-h-screen bg-natalis-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm space-y-4">

        {/* Header */}
        <div className="flex items-center gap-2">
          <button onClick={goToTitle} className="text-bit-blue text-sm font-semibold">← Back</button>
          <p className="text-natalis-muted text-xs ml-auto">Step {step} of 4</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 justify-center">
          {[1,2,3,4].map(s => (
            <div key={s} className="w-2 h-2 rounded-full transition-all"
              style={{ background: s <= step ? '#007aff' : '#d1d1d6' }} />
          ))}
        </div>

        {/* ── STEP 1: Country ─────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-5 border border-natalis-border shadow-card space-y-3">
              <h2 className="font-bold text-natalis-text text-lg">Where are you born?</h2>
              <p className="text-natalis-muted text-xs">Choose a country. This shapes everything.</p>

              <input
                type="text"
                value={countrySearch}
                onChange={e => setCountrySearch(e.target.value)}
                placeholder="Search countries..."
                className="w-full px-3 py-2 rounded-xl border border-natalis-border text-sm bg-natalis-bg text-natalis-text"
              />

              <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                {filteredCountries.map(c => (
                  <button
                    key={c.name}
                    onClick={() => { setCountry(c.name); setBirthYear(null); setReligion(null) }}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm transition-all"
                    style={{
                      background: country === c.name ? '#007aff' : '#f2f2f7',
                      color: country === c.name ? 'white' : '#1c1c1e',
                    }}
                  >
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-xs opacity-60 ml-2">{c.region}</span>
                  </button>
                ))}
              </div>

              {selectedCountry && (
                <div className="bg-natalis-bg rounded-xl p-3 text-xs text-natalis-muted leading-relaxed">
                  {selectedCountry.context}
                </div>
              )}
            </div>

            <button
              disabled={!canProceed(1)}
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
              style={{ background: canProceed(1) ? 'linear-gradient(135deg, #007aff, #0055cc)' : '#c7c7cc' }}
            >
              Next →
            </button>
          </div>
        )}

        {/* ── STEP 2: Year + Gender ────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-5 border border-natalis-border shadow-card space-y-4">
              <h2 className="font-bold text-natalis-text text-lg">When and who?</h2>

              {/* Birth year */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-natalis-muted">Birth Year</span>
                  <span className="text-bit-blue">{effectiveYear}</span>
                </div>
                <input
                  type="range"
                  min={yearMin}
                  max={yearMax}
                  value={effectiveYear}
                  onChange={e => setBirthYear(parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-natalis-muted">
                  <span>{yearMin}</span><span>{yearMax}</span>
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <p className="text-natalis-muted text-xs font-semibold">Gender</p>
                <div className="flex gap-2">
                  {['male', 'female'].map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: gender === g ? '#007aff' : '#f2f2f7',
                        color: gender === g ? 'white' : '#8e8e93',
                      }}
                    >
                      {g === 'male' ? '♂ Male' : '♀ Female'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl font-bold text-natalis-dim border-2 border-natalis-border bg-white text-sm">← Back</button>
              <button
                disabled={!canProceed(2)}
                onClick={() => setStep(3)}
                className="flex-[2] py-4 rounded-2xl font-bold text-white text-sm transition-all"
                style={{ background: canProceed(2) ? 'linear-gradient(135deg, #007aff, #0055cc)' : '#c7c7cc' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Lifestyle choices ────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-5 border border-natalis-border shadow-card space-y-4">
              <h2 className="font-bold text-natalis-text text-lg">Your circumstances</h2>
              <p className="text-natalis-muted text-xs">Optional — leave any blank to let the game decide.</p>

              {/* Rural/Urban */}
              <div className="space-y-2">
                <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Origin</p>
                <div className="space-y-1">
                  {RURAL_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setRuralUrban(ruralUrban === opt.value ? null : opt.value)}
                      className="w-full text-left px-3 py-2 rounded-xl transition-all"
                      style={{
                        background: ruralUrban === opt.value ? '#007aff' : '#f2f2f7',
                        color: ruralUrban === opt.value ? 'white' : '#1c1c1e',
                      }}
                    >
                      <span className="text-sm font-semibold">{opt.label}</span>
                      <span className="text-xs opacity-60 ml-2">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Family stability */}
              <div className="space-y-2">
                <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Family</p>
                <div className="space-y-1">
                  {STABILITY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setFamilyStability(familyStability === opt.value ? null : opt.value)}
                      className="w-full text-left px-3 py-2 rounded-xl transition-all"
                      style={{
                        background: familyStability === opt.value ? opt.color : '#f2f2f7',
                        color: familyStability === opt.value ? 'white' : '#1c1c1e',
                      }}
                    >
                      <span className="text-sm font-semibold">{opt.label}</span>
                      <span className="text-xs opacity-60 ml-2">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Religion */}
              {religions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Religion</p>
                  <div className="flex flex-wrap gap-1">
                    {religions.map(r => (
                      <button
                        key={r}
                        onClick={() => setReligion(religion === r ? null : r)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          background: religion === r ? '#007aff' : '#f2f2f7',
                          color: religion === r ? 'white' : '#3c3c43',
                        }}
                      >
                        {RELIGION_LABELS[r] ?? r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-2xl font-bold text-natalis-dim border-2 border-natalis-border bg-white text-sm">← Back</button>
              <button
                onClick={() => setStep(4)}
                className="flex-[2] py-4 rounded-2xl font-bold text-white text-sm transition-all"
                style={{ background: 'linear-gradient(135deg, #007aff, #0055cc)' }}
              >
                Preview →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Preview ──────────────────────────────────────────────── */}
        {step === 4 && selectedCountry && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-natalis-border">
              <div className="px-5 py-4 flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #007aff22, #af52de22)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-white shadow-sm">
                  {gender === 'male' ? '👦' : '👧'}
                </div>
                <div>
                  <p className="text-xl font-bold text-natalis-text">{selectedCountry.name}</p>
                  <p className="text-natalis-muted text-sm">
                    {gender === 'male' ? 'Male' : 'Female'} · Born {effectiveYear}
                  </p>
                </div>
              </div>

              <div className="px-5 py-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {ruralUrban && (
                    <div className="bg-natalis-bg rounded-xl px-3 py-2">
                      <p className="text-natalis-muted text-xs mb-0.5">Origin</p>
                      <p className="font-bold text-natalis-text text-sm capitalize">{ruralUrban}</p>
                    </div>
                  )}
                  {familyStability && (
                    <div className="bg-natalis-bg rounded-xl px-3 py-2">
                      <p className="text-natalis-muted text-xs mb-0.5">Family</p>
                      <p className="font-bold text-natalis-text text-sm capitalize">{familyStability}</p>
                    </div>
                  )}
                  {religion && (
                    <div className="bg-natalis-bg rounded-xl px-3 py-2 col-span-2">
                      <p className="text-natalis-muted text-xs mb-0.5">Religion</p>
                      <p className="font-bold text-natalis-text text-sm">{RELIGION_LABELS[religion] ?? religion}</p>
                    </div>
                  )}
                </div>

                {previewStats && (
                  <div className="space-y-3 pt-2 border-t border-natalis-border">
                    <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Approximate Starting Stats</p>
                    {STAT_LABELS.map(([key, label]) => (
                      <StatBar key={key} stat={key} label={label} value={previewStats[key] ?? 50} />
                    ))}
                    <p className="text-natalis-muted text-xs italic">Final stats set at game start with some variation.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl px-5 py-4 border border-natalis-border shadow-card">
              <p className="text-natalis-muted text-xs leading-relaxed">{selectedCountry.context}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(3)} className="flex-1 py-4 rounded-2xl font-bold text-natalis-dim border-2 border-natalis-border bg-white text-sm">← Back</button>
              <button
                onClick={handleBegin}
                className="flex-[2] py-4 rounded-2xl font-bold text-white text-sm shadow-card-lg transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #34c759, #28a046)' }}
              >
                Begin This Life →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
