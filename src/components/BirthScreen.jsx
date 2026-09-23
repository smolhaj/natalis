import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import StatBar from './StatBar'

const WEALTH_LABELS = ['Destitute', 'Poor', 'Working Class', 'Middle Class', 'Wealthy']
const STABILITY_LABELS = {
  unstable: 'Unstable',
  struggling: 'Struggling',
  stable: 'Stable',
  secure: 'Secure',
}
const STABILITY_COLORS = {
  unstable: '#8c3a2e',
  struggling: '#8a6635',
  stable: '#3f6146',
  secure: '#3f5670',
}

const STAT_LABELS = [
  ['happiness', 'Happiness'],
  ['health',    'Health'],
  ['smarts',    'Smarts'],
  ['looks',     'Looks'],
  ['charisma',  'Charisma'],
]

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
  const { firstName, surname, country, gender, birthYear, wealthTier, familyStability, familySize, initialStats } = character

  const yearMin = country.yearRange[0]
  const yearMax = country.yearRange[1]

  const handleYearChange = (e) => {
    const y = parseInt(e.target.value, 10)
    setManualYear(y)
    setCharacterBirthYear(y)
  }

  const handleBegin = () => {
    if (birthYearMode === 'choose') setCharacterBirthYear(manualYear)
    startGame()
  }


  return (
    <div className="min-h-screen bg-natalis-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm space-y-4">

        {/* Back */}
        <button onClick={goToTitle} className="flex items-center gap-1 text-bit-blue text-sm font-semibold">
          ← Back
        </button>

        {/* Identity card */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-natalis-border">
          {/* The avatar emoji went in the no-emoji pass and left its white
              tile behind, an empty square beside the name; and the name was
              set in the ink colour on the slate header, which it all but
              disappeared into. */}
          <div className="px-5 py-4 border-b border-natalis-border">
            <div>
              <p className="font-prose text-xl text-natalis-text">{firstName} {surname}</p>
              <p className="text-natalis-muted text-sm">
                {gender === 'male' ? 'Male' : 'Female'} · {country.name}
              </p>
            </div>
          </div>

          <div className="px-5 py-4 space-y-4">
            {/* Birth Year */}
            <div className="space-y-2">
              <div className="flex gap-2">
                {['random', 'choose'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => { setBirthYearMode(mode); if (mode === 'choose') setManualYear(birthYear) }}
                    className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: birthYearMode === mode ? '#3f5670' : '#f4f2ed',
                      color: birthYearMode === mode ? 'white' : '#7d766a',
                    }}
                  >
                    {mode === 'random' ? 'Random Year' : 'Choose Year'}
                  </button>
                ))}
              </div>

              {birthYearMode === 'random' ? (
                <div className="flex items-center justify-between px-3 py-2 bg-natalis-bg rounded-xl">
                  <span className="text-natalis-muted text-sm">Born</span>
                  <span className="font-bold text-natalis-text">{birthYear}</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-natalis-muted">Birth Year</span>
                    <span className="text-bit-blue">{manualYear}</span>
                  </div>
                  <input type="range" min={yearMin} max={yearMax} value={manualYear} onChange={handleYearChange} className="w-full" />
                  <div className="flex justify-between text-xs text-natalis-muted">
                    <span>{yearMin}</span><span>{yearMax}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Wealth & Stability chips */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-natalis-bg rounded-xl px-3 py-2">
                <p className="text-natalis-muted text-xs mb-0.5">Wealth</p>
                <p className="font-bold text-natalis-text text-sm">{WEALTH_LABELS[wealthTier]}</p>
              </div>
              <div className="bg-natalis-bg rounded-xl px-3 py-2">
                <p className="text-natalis-muted text-xs mb-0.5">Family</p>
                <p className="font-bold text-sm" style={{ color: STABILITY_COLORS[familyStability] }}>
                  {STABILITY_LABELS[familyStability]}
                </p>
              </div>
              <div className="bg-natalis-bg rounded-xl px-3 py-2">
                <p className="text-natalis-muted text-xs mb-0.5">Family Size</p>
                <p className="font-bold text-natalis-text text-sm">{familySize} {familySize === 1 ? 'person' : 'people'}</p>
              </div>
              <div className="bg-natalis-bg rounded-xl px-3 py-2">
                <p className="text-natalis-muted text-xs mb-0.5">Region</p>
                <p className="font-bold text-natalis-text text-sm truncate">{country.region}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 pt-2 border-t border-natalis-border">
              <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">Starting Stats</p>
              {STAT_LABELS.map(([key, label]) => (
                <StatBar key={key} stat={key} label={label} value={initialStats[key]} />
              ))}
            </div>
          </div>
        </div>

        {/* Country context */}
        <div className="bg-white rounded-2xl px-5 py-4 border border-natalis-border shadow-card">
          <p className="text-natalis-muted text-sm leading-relaxed">{country.context}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={rerollCharacter}
            className="flex-1 py-4 rounded-2xl font-bold text-natalis-dim border-2 border-natalis-border bg-white text-sm transition-all active:scale-95"
          >
            Someone else
          </button>
          <button
            onClick={handleBegin}
            className="flex-[2] py-4 rounded-2xl font-bold text-white text-sm shadow-card-lg transition-all active:scale-95"
            style={{ background: '#1c1a16' }}
          >
            Begin This Life →
          </button>
        </div>

      </div>
    </div>
  )
}
