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
                style={{ background: 'linear-gradient(135deg, #34c759, #248a3d)' }}
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

        {/* Logo area */}
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-3xl mx-auto flex items-center justify-center shadow-card-lg"
            style={{ background: 'linear-gradient(135deg, #007aff, #af52de)' }}>
            <span className="text-5xl">🌱</span>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-natalis-text tracking-tight">Natalis</h1>
            <p className="text-natalis-muted text-sm font-medium">A Life Simulator</p>
          </div>
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
          <div className="bg-white rounded-2xl p-5 shadow-card border border-natalis-border space-y-2">
            <p className="text-natalis-text text-sm font-medium leading-relaxed">
              You don't choose where you begin.
            </p>
            <p className="text-natalis-muted text-xs leading-relaxed">
              Make choices. Build a life. See how it turns out.
            </p>
          </div>
        )}

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {FEATURE_PILLS.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-natalis-dim border border-natalis-border shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* How you want to live it. Fixed for the run once it begins. */}
        <div className="space-y-2 text-left">
          <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider px-1">How you'll live it</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'active', name: 'Inhabit', blurb: 'You make the choices. Work, money, risk, who you keep.' },
              { id: 'passive', name: 'Witness', blurb: 'The life goes as it goes. You read it, year by year.' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                aria-pressed={mode === m.id}
                className={`text-left px-3 py-3 rounded-2xl border-2 transition-all active:scale-95 ${
                  mode === m.id
                    ? 'border-bit-blue bg-white shadow-card'
                    : 'border-natalis-border bg-white/60 hover:border-natalis-dim'
                }`}
              >
                <p className={`font-bold text-sm ${mode === m.id ? 'text-bit-blue' : 'text-natalis-text'}`}>{m.name}</p>
                <p className="text-natalis-muted text-[11px] leading-snug mt-1">{m.blurb}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Start buttons */}
        <div className="space-y-3">
          <button
            onClick={goToBirth}
            className="w-full py-3 rounded-2xl text-white font-bold text-sm shadow-card-lg transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #007aff, #0055cc)' }}
          >
            {hasSave ? 'New Life' : 'Random Life'}
          </button>
          <button
            onClick={goToCuratedBirth}
            className="w-full py-3 rounded-2xl font-bold text-bit-blue text-sm border-2 border-bit-blue bg-white transition-all active:scale-95"
          >
            Craft a Life
          </button>
        </div>

        <p className="text-natalis-muted text-xs">
          {mode === 'passive'
            ? 'Nobody chooses where they begin. Most of it happens anyway.'
            : 'Your choices shape everything.'}
        </p>
      </div>
    </div>
  )
}
