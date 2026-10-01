import { useState, useMemo } from 'react'
import { useGameStore } from '../store/gameStore'
import { COUNTRIES } from '../data/countries'
import { ETHNIC_RELIGION } from '../data/identity'
import { RELIGION_LABELS, getCountryDisplayName, getRegionLabel } from '../utils/countryUtils'
import { EraNote } from './BirthScreen'

// The wizard was the one surface still in the old theme: bold sans headings,
// slate-blue pills that filled solid when chosen, a green "Begin". It now uses
// the same two controls as the rest of the game — a paper option that takes an
// ink rule when chosen, and one ink button that moves you on — and its preview
// describes a person in a place and a year rather than five stat bars.

const STABILITY_OPTIONS = [
  { value: 'secure',    label: 'Secure',    desc: 'Stable, comfortable, loving' },
  { value: 'stable',    label: 'Stable',    desc: 'Modest and functional' },
  { value: 'struggling', label: 'Struggling', desc: 'Real hardship, holding together' },
  { value: 'unstable',  label: 'Unstable',  desc: 'Difficult and unpredictable' },
]

const RURAL_OPTIONS = [
  { value: 'urban',    label: 'A city',        desc: 'Density, pace, strangers' },
  { value: 'suburban', label: 'A town',        desc: 'The edge of somewhere' },
  { value: 'rural',    label: 'The countryside', desc: 'A village, the land, the seasons' },
]

const STABILITY_PHRASE = {
  unstable: 'an unsteady household', struggling: 'a household that is struggling',
  stable: 'a steady household', secure: 'a secure household',
}
const ORIGIN_PHRASE = { urban: 'in a city', suburban: 'in a town', rural: 'in the countryside' }

const ink = `py-3.5 rounded-xl bg-natalis-text text-natalis-surface font-prose text-[0.9375rem]
  hover:bg-natalis-dim transition-colors active:scale-[0.99] disabled:opacity-35 disabled:hover:bg-natalis-text`
const paper = `py-3.5 rounded-xl border border-natalis-rule bg-natalis-surface text-natalis-dim font-prose text-[0.9375rem]
  hover:border-natalis-text hover:text-natalis-text transition-colors active:scale-[0.99]`
const option = (on) => `w-full text-left px-3 py-2 rounded-xl border transition-colors ${
  on ? 'border-natalis-text bg-natalis-surface text-natalis-text' : 'border-natalis-border bg-natalis-bg text-natalis-dim hover:border-natalis-rule'
}`
const chip = (on) => `px-3 py-1.5 rounded-lg border text-xs transition-colors ${
  on ? 'border-natalis-text bg-natalis-surface text-natalis-text' : 'border-natalis-border bg-natalis-bg text-natalis-dim hover:border-natalis-rule'
}`
const heading = 'font-prose text-natalis-text text-xl'
const label = 'text-natalis-muted text-[11px] font-medium uppercase tracking-[0.14em]'

export default function CuratedBirthScreen() {
  const goToTitle       = useGameStore(s => s.goToTitle)
  const startCuratedGame = useGameStore(s => s.startCuratedGame)

  const [step, setStep] = useState(1) // 1=country, 2=year+gender, 3=circumstances, 4=preview

  const [country, setCountry] = useState(null)
  const [birthYear, setBirthYear] = useState(null)
  const [gender, setGender] = useState(null)
  const [ruralUrban, setRuralUrban] = useState(null)
  const [familyStability, setFamilyStability] = useState(null)
  const [ethnicity, setEthnicity] = useState(null)
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

  const groups = useMemo(() =>
    [...(selectedCountry?.ethnicGroups ?? [])].sort((a, b) => (b.share ?? 0) - (a.share ?? 0))
  , [selectedCountry])

  // A people and a faith are not independent (src/data/identity.js): once a
  // people is chosen, the faiths offered are the ones that people holds.
  const religions = useMemo(() => {
    if (!selectedCountry) return []
    const weights = (ethnicity && ETHNIC_RELIGION[ethnicity]) || selectedCountry.religionWeights || {}
    return Object.keys(weights)
      .filter(r => (weights[r] ?? 0) >= 0.01)
      .sort((a, b) => (weights[b] ?? 0) - (weights[a] ?? 0))
  }, [selectedCountry, ethnicity])

  const chooseEthnicity = (id) => {
    const next = ethnicity === id ? null : id
    setEthnicity(next)
    const w = (next && ETHNIC_RELIGION[next]) || selectedCountry?.religionWeights || {}
    if (religion && !((w[religion] ?? 0) >= 0.01)) setReligion(null)
  }

  const canProceed = (s) => {
    if (s === 1) return !!country
    if (s === 2) return gender !== null
    return true
  }

  const handleBegin = () => {
    startCuratedGame({
      country,
      birthYear: effectiveYear,
      gender,
      ruralUrban,
      familyStability,
      ethnicity,
      religion,
    })
  }

  const thenName = selectedCountry ? getCountryDisplayName(selectedCountry, effectiveYear) : ''
  const groupName = groups.find(g => g.id === ethnicity)?.name

  return (
    <div className="min-h-screen bg-natalis-bg flex flex-col justify-start px-4 pt-6 pb-8">
      <div className="w-full max-w-sm mx-auto space-y-4">

        <div className="flex items-center gap-2">
          <button onClick={goToTitle} className="text-natalis-muted text-sm hover:text-natalis-text">Cancel</button>
          <p className="text-natalis-muted text-xs ml-auto tabular-nums">Step {step} of 4</p>
        </div>

        <div className="flex gap-2 justify-center" aria-hidden="true">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`h-px w-8 transition-colors ${s <= step ? 'bg-natalis-text' : 'bg-natalis-rule'}`} />
          ))}
        </div>

        {/* ── STEP 1: Country ─────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="bg-natalis-surface rounded-2xl p-5 border border-natalis-border space-y-3">
              <h2 className={heading}>Where are you born?</h2>
              <p className="text-natalis-muted text-xs">The country and the year decide most of what follows.</p>

              <input
                type="text"
                value={countrySearch}
                onChange={e => setCountrySearch(e.target.value)}
                placeholder="Search countries..."
                className="w-full px-3 py-2 rounded-xl border border-natalis-border text-sm bg-natalis-bg text-natalis-text"
              />

              <div className="max-h-[52vh] overflow-y-auto space-y-1 pr-1">
                {filteredCountries.length === 0 && (
                  <p className="text-natalis-muted text-sm px-3 py-6 text-center">
                    Nothing matches &ldquo;{countrySearch}&rdquo;. There are {COUNTRIES.length} countries here; try a shorter search.
                  </p>
                )}
                {filteredCountries.map(c => (
                  <button
                    key={c.name}
                    onClick={() => { setCountry(c.name); setBirthYear(null); setReligion(null); setEthnicity(null) }}
                    aria-pressed={country === c.name}
                    className={option(country === c.name)}
                  >
                    <span className="text-sm">{c.name}</span>
                    <span className="text-xs text-natalis-muted ml-2">{getRegionLabel(c)}</span>
                  </button>
                ))}
              </div>
            </div>

            <button disabled={!canProceed(1)} onClick={() => setStep(2)} className={`w-full ${ink}`}>
              Next →
            </button>
          </div>
        )}

        {/* ── STEP 2: Year + Gender ────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-natalis-surface rounded-2xl p-5 border border-natalis-border space-y-4">
              <h2 className={heading}>When, and who?</h2>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className={label}>Born</span>
                  <span className="font-prose text-natalis-text tabular-nums">
                    {effectiveYear}
                    {thenName && thenName !== selectedCountry?.name && <span className="text-natalis-muted text-sm"> · {thenName}</span>}
                  </span>
                </div>
                <input
                  type="range"
                  min={yearMin}
                  max={yearMax}
                  value={effectiveYear}
                  onChange={e => setBirthYear(parseInt(e.target.value, 10))}
                  className="w-full"
                  aria-label="Birth year"
                />
                <div className="flex justify-between text-xs text-natalis-muted tabular-nums">
                  <span>{yearMin}</span><span>{yearMax}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className={label}>A girl or a boy</p>
                <div className="flex gap-2">
                  {['female', 'male'].map(g => (
                    <button key={g} onClick={() => setGender(g)} aria-pressed={gender === g}
                      className={`flex-1 py-2.5 rounded-xl border font-prose text-[0.9375rem] transition-colors ${
                        gender === g ? 'border-natalis-text text-natalis-text bg-natalis-surface' : 'border-natalis-border text-natalis-dim bg-natalis-bg hover:border-natalis-rule'
                      }`}>
                      {g === 'male' ? 'Male' : 'Female'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedCountry && <EraNote country={selectedCountry} year={effectiveYear} />}

            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className={`flex-1 ${paper}`}>← Back</button>
              <button disabled={!canProceed(2)} onClick={() => setStep(3)} className={`flex-[2] ${ink}`}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Circumstances ────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-natalis-surface rounded-2xl p-5 border border-natalis-border space-y-5">
              <div>
                <h2 className={heading}>Into what?</h2>
                <p className="text-natalis-muted text-xs mt-1">All optional. Leave any of them and the country decides, in its own proportions.</p>
              </div>

              <div className="space-y-2">
                <p className={label}>Where</p>
                <div className="space-y-1">
                  {RURAL_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => setRuralUrban(ruralUrban === opt.value ? null : opt.value)}
                      aria-pressed={ruralUrban === opt.value} className={option(ruralUrban === opt.value)}>
                      <span className="text-sm">{opt.label}</span>
                      <span className="text-xs text-natalis-muted ml-2">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className={label}>The household</p>
                <div className="space-y-1">
                  {STABILITY_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => setFamilyStability(familyStability === opt.value ? null : opt.value)}
                      aria-pressed={familyStability === opt.value} className={option(familyStability === opt.value)}>
                      <span className="text-sm">{opt.label}</span>
                      <span className="text-xs text-natalis-muted ml-2">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {groups.length > 1 && (
                <div className="space-y-2">
                  <p className={label}>People</p>
                  <div className="flex flex-wrap gap-1.5">
                    {groups.map(g => (
                      <button key={g.id} onClick={() => chooseEthnicity(g.id)} aria-pressed={ethnicity === g.id} className={chip(ethnicity === g.id)}>
                        {g.name}
                        <span className="text-natalis-faint ml-1 tabular-nums">{Math.round((g.share ?? 0) * 100)}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {religions.length > 0 && (
                <div className="space-y-2">
                  <p className={label}>Faith</p>
                  <div className="flex flex-wrap gap-1.5">
                    {religions.map(r => (
                      <button key={r} onClick={() => setReligion(religion === r ? null : r)} aria-pressed={religion === r} className={chip(religion === r)}>
                        {RELIGION_LABELS[r] ?? r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className={`flex-1 ${paper}`}>← Back</button>
              <button onClick={() => setStep(4)} className={`flex-[2] ${ink}`}>Preview →</button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Preview ──────────────────────────────────────────────── */}
        {step === 4 && selectedCountry && (
          <div className="space-y-3">
            <div className="bg-natalis-surface rounded-2xl p-5 border border-natalis-border space-y-2">
              <p className={label}>{getRegionLabel(selectedCountry)}</p>
              <p className="font-prose text-natalis-text text-prose leading-relaxed">
                {gender === 'male' ? 'A boy' : 'A girl'}, born in {effectiveYear}
                {ruralUrban ? ` ${ORIGIN_PHRASE[ruralUrban]}` : ''}, {thenName}.
                {groupName || religion ? ` ${[groupName, religion ? RELIGION_LABELS[religion] ?? religion : null].filter(Boolean).join(', ')}.` : ''}
                {familyStability ? ` Born into ${STABILITY_PHRASE[familyStability]}.` : ''}
              </p>
              <p className="text-natalis-muted text-xs">The name, the parents and the rest are drawn at birth.</p>
            </div>

            <EraNote country={selectedCountry} year={effectiveYear} />

            <div className="flex gap-2">
              <button onClick={() => setStep(3)} className={`flex-1 ${paper}`}>← Back</button>
              <button onClick={handleBegin} className={`flex-[2] ${ink}`}>
                Begin This Life
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
