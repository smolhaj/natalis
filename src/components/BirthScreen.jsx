import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { COUNTRIES } from '../data/countries'

const WEALTH_LABELS = ['Destitute', 'Poor', 'Working Class', 'Middle Class', 'Wealthy']
const STABILITY_LABELS = {
  unstable: 'Unstable',
  struggling: 'Struggling',
  stable: 'Stable',
  secure: 'Secure',
}
const TRAIT_NAMES = { intel: 'Intelligence', con: 'Constitution', res: 'Resilience', cha: 'Charisma' }

function TraitBar({ label, value }) {
  const pct = ((value - 3) / 7) * 100
  const color = value >= 8 ? '#4ade80' : value >= 6 ? '#a3e635' : value >= 4 ? '#facc15' : '#f87171'
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-natalis-dim">
        <span>{label}</span>
        <span>{value}/10</span>
      </div>
      <div className="h-1 bg-natalis-muted rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function BirthScreen() {
  const character = useGameStore(s => s.character)
  const birthYearMode = useGameStore(s => s.birthYearMode)
  const setBirthYearMode = useGameStore(s => s.setBirthYearMode)
  const setCharacterBirthYear = useGameStore(s => s.setCharacterBirthYear)
  const rerollCharacter = useGameStore(s => s.rerollCharacter)
  const startGame = useGameStore(s => s.startGame)
  const goToTitle = useGameStore(s => s.goToTitle)

  const [manualYear, setManualYear] = useState(character?.birthYear ?? 1980)

  if (!character) return null
  const { firstName, surname, country, gender, birthYear, wealthTier, familyStability, familySize, traits } = character

  const yearMin = country.yearRange[0]
  const yearMax = country.yearRange[1]

  const handleYearChange = (e) => {
    const y = parseInt(e.target.value, 10)
    setManualYear(y)
    setCharacterBirthYear(y)
  }

  const handleBegin = () => {
    if (birthYearMode === 'choose') {
      setCharacterBirthYear(manualYear)
    }
    startGame()
  }

  return (
    <div className="min-h-screen bg-natalis-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={goToTitle} className="text-natalis-muted hover:text-natalis-dim text-xs tracking-widest uppercase transition-colors">
            ← Back
          </button>
          <h2 className="text-natalis-dim text-xs tracking-widest uppercase">Your Life</h2>
          <div />
        </div>

        {/* Name & Country */}
        <div className="border border-natalis-border bg-natalis-surface p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-2xl text-natalis-text font-light">{firstName} {surname}</p>
            <p className="text-natalis-dim text-sm">
              {gender.charAt(0).toUpperCase() + gender.slice(1)} · {country.name} · {country.region}
            </p>
          </div>

          {/* Birth Year toggle */}
          <div className="space-y-2">
            <div className="flex gap-3 text-xs">
              <button
                onClick={() => setBirthYearMode('random')}
                className={`px-3 py-1 border transition-colors ${birthYearMode === 'random' ? 'border-natalis-dim text-natalis-text' : 'border-natalis-border text-natalis-muted hover:border-natalis-muted'}`}
              >
                Random Year
              </button>
              <button
                onClick={() => { setBirthYearMode('choose'); setManualYear(birthYear) }}
                className={`px-3 py-1 border transition-colors ${birthYearMode === 'choose' ? 'border-natalis-dim text-natalis-text' : 'border-natalis-border text-natalis-muted hover:border-natalis-muted'}`}
              >
                Choose Year
              </button>
            </div>

            {birthYearMode === 'random' ? (
              <p className="text-natalis-text text-sm">Born: <span className="text-natalis-dim">{birthYear}</span></p>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-natalis-dim">
                  <span>Birth year</span>
                  <span>{manualYear}</span>
                </div>
                <input
                  type="range"
                  min={yearMin}
                  max={yearMax}
                  value={manualYear}
                  onChange={handleYearChange}
                  className="w-full accent-natalis-dim"
                />
                <div className="flex justify-between text-xs text-natalis-muted">
                  <span>{yearMin}</span>
                  <span>{yearMax}</span>
                </div>
              </div>
            )}
          </div>

          {/* Wealth & Stability */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-natalis-muted text-xs uppercase tracking-wider mb-1">Family Wealth</p>
              <p className="text-natalis-text">{WEALTH_LABELS[wealthTier]}</p>
            </div>
            <div>
              <p className="text-natalis-muted text-xs uppercase tracking-wider mb-1">Family Stability</p>
              <p className="text-natalis-text">{STABILITY_LABELS[familyStability]}</p>
            </div>
            <div>
              <p className="text-natalis-muted text-xs uppercase tracking-wider mb-1">Family Size</p>
              <p className="text-natalis-text">{familySize} {familySize === 1 ? 'person' : 'people'}</p>
            </div>
            <div>
              <p className="text-natalis-muted text-xs uppercase tracking-wider mb-1">Language</p>
              <p className="text-natalis-text">{country.languages.join(', ')}</p>
            </div>
          </div>

          {/* Traits */}
          <div className="space-y-2 pt-2 border-t border-natalis-border">
            <p className="text-natalis-muted text-xs uppercase tracking-wider">Traits</p>
            {Object.entries(traits).map(([key, val]) => (
              <TraitBar key={key} label={TRAIT_NAMES[key]} value={val} />
            ))}
          </div>
        </div>

        {/* Country Context */}
        <div className="border-l-2 border-natalis-muted pl-4">
          <p className="text-natalis-dim text-sm leading-relaxed">{country.context}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={rerollCharacter}
            className="flex-1 py-3 border border-natalis-border text-natalis-muted text-xs tracking-widest uppercase hover:border-natalis-muted hover:text-natalis-dim transition-all"
          >
            Reroll
          </button>
          <button
            onClick={handleBegin}
            className="flex-2 px-8 py-3 border border-natalis-muted text-natalis-text text-xs tracking-widest uppercase hover:bg-natalis-surface transition-all"
          >
            Begin This Life
          </button>
        </div>

      </div>
    </div>
  )
}
