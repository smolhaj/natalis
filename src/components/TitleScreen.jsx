import { useState, useEffect } from 'react'
import { useGameStore, getAllSlotMeta } from '../store/gameStore'
import { getCountryFlag } from '../utils/countryUtils'
import { COUNTRIES } from '../data/countries'
import { CAREERS } from '../data/careers'
import { RIBBONS } from '../data/ribbons'

// Derived, not typed. The hardcoded version had drifted to 145/59/379 against a
// real 146/49/377 — the careers figure was out by a fifth.
const FEATURE_PILLS = [
  `${COUNTRIES.length} Countries`,
  `${CAREERS.length} Careers`,
  `${RIBBONS.length} Ribbons`,
  'Real History',
]

function SlotCard({ meta, onContinue, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (meta.empty) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-natalis-border px-4 py-3 flex items-center justify-center">
        <p className="text-natalis-muted text-xs">Empty slot</p>
      </div>
    )
  }

  const flagEmoji = meta.country ? getCountryFlag({ name: meta.country }) : ''

  return (
    <div className="bg-white rounded-2xl border border-natalis-border shadow-sm overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-natalis-text text-sm truncate">{meta.displayName || 'Unknown'}</p>
          <p className="text-natalis-muted text-xs mt-0.5">
            {flagEmoji} {meta.country} · Age {meta.age} · {meta.year}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-3">
          {confirmDelete ? (
            <>
              <button
                onClick={() => { onDelete(); setConfirmDelete(false) }}
                className="text-xs font-bold text-red-500 px-2 py-1 rounded-lg bg-red-50"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-natalis-muted px-2 py-1"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-natalis-muted text-xs hover:text-red-400 transition-colors px-1"
                aria-label="Delete save"
              >
                ✕
              </button>
              <button
                onClick={onContinue}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: '#3f6146' }}
              >
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TitleScreen() {
  const goToBirth = useGameStore(s => s.goToBirth)
  const goToCuratedBirth = useGameStore(s => s.goToCuratedBirth)
  const continueSaveSlot = useGameStore(s => s.continueSaveSlot)
  const mode = useGameStore(s => s.mode)
  const setMode = useGameStore(s => s.setMode)
  const deleteSaveSlot = useGameStore(s => s.deleteSaveSlot)

  const [slots, setSlots] = useState(() => getAllSlotMeta())

  // Re-read slots when component mounts (handles deletions)
  useEffect(() => {
    setSlots(getAllSlotMeta())
  }, [])

  const hasSave = slots.some(s => !s.empty)
  const filledSlots = slots.filter(s => !s.empty)

  const handleDelete = (slot) => {
    deleteSaveSlot(slot)
    setSlots(getAllSlotMeta())
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-natalis-bg px-6">
      <div className="w-full max-w-sm text-center space-y-8">

        {/* The blue-to-purple app-store tile and the 🌱 are gone. So is "A Life
            Simulator", which describes the genre rather than the game. */}
        <div className="space-y-2 pt-2">
          <h1 className="font-prose text-5xl text-natalis-text tracking-tight">natalis</h1>
          <p className="font-prose text-natalis-muted text-sm italic">
            from <span className="not-italic">natalis</span> — of a birth
          </p>
        </div>

        {/* Saved lives */}
        {hasSave && (
          <div className="space-y-2 text-left">
            <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1">Your Lives</p>
            {filledSlots.map(meta => (
              <SlotCard
                key={meta.slot}
                meta={meta}
                onContinue={() => continueSaveSlot(meta.slot)}
                onDelete={() => handleDelete(meta.slot)}
              />
            ))}
          </div>
        )}

        {/* Tagline — only when no saves */}
        {!hasSave && (
          <div className="space-y-3 px-1">
            {/* "Make choices. Build a life. See how it turns out." used to sit
                directly under this line, undoing it. */}
            <p className="font-prose text-natalis-text text-prose">
              You don't choose where you begin.
            </p>
            <p className="font-prose text-natalis-muted text-sm leading-relaxed">
              A country, a year, a household, a body. The life runs forward from
              there, one year at a time, in the world as it actually was.
            </p>
          </div>
        )}

        {/* Was a row of rounded badges lifted off a store page. One quiet line
            of figures says the same thing without the packaging. */}
        <p className="text-natalis-faint text-[11px] tracking-[0.08em] tabular-nums">
          {FEATURE_PILLS.join('   ·   ')}
        </p>

        {/* How you want to live it. Fixed for the run once it begins. */}
        <div className="space-y-2 text-left">
          <p className="text-natalis-muted text-[11px] font-medium uppercase tracking-[0.14em] px-1">How you'll live it</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'active', name: 'Inhabit', blurb: 'You make the choices. Work, money, risk, who you keep.' },
              { id: 'passive', name: 'Witness', blurb: 'The life goes as it goes. You read it, year by year.' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                aria-pressed={mode === m.id}
                className={`text-left px-3 py-3 rounded-xl border transition-colors active:scale-[0.99] ${
                  mode === m.id
                    ? 'border-natalis-text bg-natalis-surface'
                    : 'border-natalis-border bg-natalis-surface/50 hover:border-natalis-rule'
                }`}
              >
                <p className={`font-prose text-[0.9375rem] ${mode === m.id ? 'text-natalis-text' : 'text-natalis-dim'}`}>{m.name}</p>
                <p className="text-natalis-muted text-[11px] leading-snug mt-1">{m.blurb}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Start buttons */}
        <div className="space-y-3">
          <button
            onClick={goToBirth}
            className="w-full py-3 rounded-xl bg-natalis-text text-natalis-surface font-prose text-[0.9375rem]
                       hover:bg-natalis-dim transition-colors active:scale-[0.99]"
          >
            {hasSave ? 'Begin another life' : 'Begin a life'}
          </button>
          <button
            onClick={goToCuratedBirth}
            className="w-full py-3 rounded-xl border border-natalis-rule text-natalis-dim font-prose text-[0.9375rem]
                       bg-natalis-surface hover:border-natalis-text hover:text-natalis-text
                       transition-colors active:scale-[0.99]"
          >
            Choose where it starts
          </button>
        </div>

        {/* "Your choices shape everything" was the previous line here, which is
            the negation of the game's own thesis AND of what the engine models:
            tickLifeCourse supplies work, a partner, a marriage and children at
            era- and place-accurate rates precisely because a life nobody steers
            is still a life. */}
        <p className="font-prose text-natalis-muted text-xs italic leading-relaxed">
          {mode === 'passive'
            ? 'Nobody chooses where they begin. Most of it happens anyway.'
            : 'Your choices matter. They are not the largest thing in the room.'}
        </p>
      </div>
    </div>
  )
}
