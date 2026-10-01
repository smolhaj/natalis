import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import StatBar from './StatBar'
import { RELIGION_LABELS, getCountryDisplayName, getRegionLabel, birthEraLines } from '../utils/countryUtils'
import { getWealthTierLabel } from '../engine/gameEngine'
import { countryWithArticle } from '../engine/epitaph'

// The preview used to open on five STARTING STATS bars — Happiness 62, Smarts
// 48 — before it said who this was. A newborn is not a stat block. It is a
// name, a place, a people, a faith and a household, in a country as it was
// that year; the numbers are still here for anyone who wants them, folded.

const STABILITY_PHRASE = {
  unstable: 'an unsteady household',
  struggling: 'a household that is struggling',
  stable: 'a steady household',
  secure: 'a secure household',
}
const COUNT_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six']

const STAT_LABELS = [
  ['happiness', 'Happiness'],
  ['health',    'Health'],
  ['smarts',    'Smarts'],
  ['looks',     'Looks'],
  ['charisma',  'Charisma'],
]

/** The country as it was in the birth year, as two or three plain lines. */
export function EraNote({ country, year }) {
  const lines = birthEraLines(country, year)
  if (!lines.length) return null
  return (
    <div className="bg-natalis-surface rounded-2xl px-5 py-4 border border-natalis-border">
      <p className="text-natalis-muted text-[11px] font-medium uppercase tracking-[0.14em] mb-1.5">
        {getCountryDisplayName(country, year)}, {year}
      </p>
      <p className="font-prose text-natalis-dim text-[0.9375rem] leading-relaxed">{lines.join(' ')}</p>
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
  const { firstName, surname, country, gender, birthYear, wealthTier, familyStability, familySize, initialStats } = character

  const yearMin = country.yearRange[0]
  const yearMax = country.yearRange[1]
  const shownYear = birthYearMode === 'choose' ? manualYear : birthYear

  const handleYearChange = (e) => {
    const y = parseInt(e.target.value, 10)
    setManualYear(y)
    setCharacterBirthYear(y)
  }

  const handleBegin = () => {
    if (birthYearMode === 'choose') setCharacterBirthYear(manualYear)
    startGame()
  }

  const countryThen = getCountryDisplayName(country, shownYear)
  const place = character.birthPlace?.name
  const nbr = character.birthNeighborhoodName
  const people = country.ethnicGroups?.find(g => g.id === character.ethnicity)?.name
  const faith = RELIGION_LABELS[character.religion] ?? null
  const child = gender === 'male' ? 'A boy' : 'A girl'
  const household = STABILITY_PHRASE[familyStability] ?? 'a household'
  const means = getWealthTierLabel(wealthTier, country.archetype)?.toLowerCase()
  // familySize is the number of children the parents have; the sibling list
  // is drawn from it and capped at five, so the sentence uses the same cap.
  const kids = Math.min(Math.max(1, familySize ?? 1), 6)
  const birthOrder = kids === 1 ? 'The only child' : `One of ${COUNT_WORDS[kids]} children`
  const where = [place, nbr].filter(Boolean).join(' · ')

  return (
    <div className="min-h-screen bg-natalis-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm space-y-4">

        <button onClick={goToTitle} className="text-natalis-muted text-sm hover:text-natalis-text">
          ← Back
        </button>

        {/* The person */}
        <div className="bg-natalis-surface rounded-2xl overflow-hidden border border-natalis-border">
          <div className="px-5 pt-5 pb-4 space-y-3">
            <div>
              <h1 className="font-prose text-2xl text-natalis-text leading-tight">{firstName} {surname}</h1>
              <p className="text-natalis-muted text-xs mt-1">{where ? `${where} · ` : ''}{getRegionLabel(country)}</p>
            </div>
            <p className="font-prose text-natalis-dim text-prose leading-relaxed">
              {child}, born in {countryWithArticle(countryThen)} in {shownYear}.
              {people || faith ? <> {[people, faith].filter(Boolean).join(', ')}.</> : null}
              {' '}{birthOrder}, in {household}; {means}.
            </p>
          </div>

          {/* Birth year */}
          <div className="px-5 pb-4 space-y-2">
            <div className="flex gap-2" role="group" aria-label="Birth year">
              {['random', 'choose'].map(m => (
                <button
                  key={m}
                  onClick={() => { setBirthYearMode(m); if (m === 'choose') setManualYear(birthYear) }}
                  aria-pressed={birthYearMode === m}
                  className={`flex-1 py-2 rounded-xl text-xs border transition-colors ${
                    birthYearMode === m
                      ? 'border-natalis-text text-natalis-text bg-natalis-surface'
                      : 'border-natalis-border text-natalis-muted bg-natalis-bg hover:border-natalis-rule'
                  }`}
                >
                  {m === 'random' ? 'Year as drawn' : 'Choose the year'}
                </button>
              ))}
            </div>
            {birthYearMode === 'choose' && (
              <div className="space-y-1">
                <input type="range" min={yearMin} max={yearMax} value={manualYear} onChange={handleYearChange} className="w-full" aria-label="Birth year" />
                <div className="flex justify-between text-xs text-natalis-muted tabular-nums">
                  <span>{yearMin}</span><span className="text-natalis-text">{manualYear}</span><span>{yearMax}</span>
                </div>
              </div>
            )}
          </div>

          <details className="px-5 pb-4 group">
            <summary className="cursor-pointer text-[11px] font-medium uppercase tracking-[0.14em] text-natalis-muted hover:text-natalis-dim list-none">
              <span aria-hidden="true" className="mr-1 text-[9px]">▸</span>The numbers
            </summary>
            <div className="space-y-3 pt-3">
              {STAT_LABELS.map(([key, label]) => (
                <StatBar key={key} stat={key} label={label} value={initialStats[key]} />
              ))}
            </div>
          </details>
        </div>

        <EraNote country={country} year={shownYear} />

        <div className="flex gap-3">
          <button
            onClick={rerollCharacter}
            className="flex-1 py-3.5 rounded-xl border border-natalis-rule bg-natalis-surface text-natalis-dim font-prose text-[0.9375rem]
                       hover:border-natalis-text hover:text-natalis-text transition-colors active:scale-[0.99]"
          >
            Someone else
          </button>
          <button
            onClick={handleBegin}
            className="flex-[2] py-3.5 rounded-xl bg-natalis-text text-natalis-surface font-prose text-[0.9375rem]
                       hover:bg-natalis-dim transition-colors active:scale-[0.99]"
          >
            Begin This Life
          </button>
        </div>

      </div>
    </div>
  )
}
