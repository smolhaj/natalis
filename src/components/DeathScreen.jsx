import { useGameStore } from '../store/gameStore'
import { generateLifeNotes } from '../engine/gameEngine'

const RIBBON_STYLES = {
  gold:   { border: '#d97706', text: '#92400e', accent: '#fbbf24' },
  green:  { border: '#16a34a', text: '#14532d', accent: '#4ade80' },
  red:    { border: '#dc2626', text: '#7f1d1d', accent: '#f87171' },
  blue:   { border: '#2563eb', text: '#1e3a8a', accent: '#60a5fa' },
  purple: { border: '#9333ea', text: '#581c87', accent: '#c084fc' },
  gray:   { border: '#6b7280', text: '#374151', accent: '#9ca3af' },
  orange: { border: '#ea580c', text: '#7c2d12', accent: '#fb923c' },
  pink:   { border: '#db2777', text: '#831843', accent: '#f472b6' },
}

export default function DeathScreen() {
  const character      = useGameStore(s => s.character)
  const stats          = useGameStore(s => s.stats)
  const flags          = useGameStore(s => s.flags)
  const regret         = useGameStore(s => s.regret)
  const age            = useGameStore(s => s.age)
  const causeOfDeath   = useGameStore(s => s.causeOfDeath)
  const ribbon         = useGameStore(s => s.ribbon)
  const epitaph        = useGameStore(s => s.epitaph)
  const criminalRecord = useGameStore(s => s.criminalRecord)
  const career         = useGameStore(s => s.career)
  const children       = useGameStore(s => s.children)
  const money          = useGameStore(s => s.money)
  const startNewLife   = useGameStore(s => s.startNewLife)
  const fullState      = useGameStore(s => s)

  if (!character) return null

  const birthYear = character.birthYear
  const deathYear = birthYear + age
  const rs = RIBBON_STYLES[ribbon?.color ?? 'gray'] ?? RIBBON_STYLES.gray
  const lifeNotes = generateLifeNotes(fullState)
  const epitaphParagraphs = epitaph ? epitaph.split('\n\n').filter(Boolean) : []

  const formatMoney = (n) => {
    if (!n) return '$0'
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
    if (n >= 1_000) return `$${Math.round(n / 1_000)}k`
    return `$${n.toLocaleString()}`
  }

  const statItems = [
    ['Happiness',  stats.happiness],
    ['Health',     stats.health],
    ['Smarts',     stats.smarts],
    ['Looks',      stats.looks],
  ]

  return (
    <div className="min-h-screen flex items-start justify-center py-8 px-4" style={{ background: '#f5f0e8' }}>
      <div className="w-full max-w-sm space-y-4">

        {/* ── Masthead ── */}
        <div className="rounded-2xl overflow-hidden border border-stone-300" style={{ background: '#faf7f2' }}>
          {/* Thin decorative top rule */}
          <div className="h-1" style={{ background: '#1c1c1e' }} />

          {/* Publication line */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2 border-b border-stone-200">
            <span className="text-xs font-black uppercase tracking-widest text-stone-500">Natalis</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Obituaries</span>
          </div>

          {/* Name block */}
          <div className="px-5 pt-4 pb-2 text-center">
            <h1 className="text-2xl font-black text-stone-900 leading-tight">
              {character.firstName} {character.surname}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <span className="text-xs text-stone-500">{birthYear}</span>
              <span className="text-stone-300">—</span>
              <span className="text-xs text-stone-500">{deathYear}</span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">{character.country.name} · Died aged {age}</p>
            {causeOfDeath && (
              <p className="text-xs text-stone-400 italic mt-1">{causeOfDeath}</p>
            )}
          </div>

          {/* Ribbon as pull-quote */}
          {ribbon && (
            <div className="mx-5 mb-4 mt-2 px-4 py-3 rounded-xl border-l-4" style={{ borderColor: rs.border, background: 'rgba(0,0,0,0.03)' }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: rs.text, opacity: 0.6 }}>
                Life Archetype
              </p>
              <p className="text-base font-black" style={{ color: rs.text }}>{ribbon.name}</p>
              <p className="text-xs italic mt-0.5" style={{ color: rs.text, opacity: 0.7 }}>{ribbon.description}</p>
            </div>
          )}
        </div>

        {/* ── Epitaph ── */}
        {epitaphParagraphs.length > 0 && (
          <div className="rounded-2xl p-5 border border-stone-300" style={{ background: '#faf7f2' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Obituary</p>
            <div className="space-y-3">
              {epitaphParagraphs.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-stone-800" style={{ fontStyle: i === 0 ? 'normal' : 'italic' }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* ── Final stats — compact inline ── */}
        <div className="rounded-2xl px-5 py-4 border border-stone-300" style={{ background: '#faf7f2' }}>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">At death</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {statItems.map(([label, val]) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs text-stone-500">{label}</span>
                    <span className="text-xs font-bold text-stone-700">{Math.round(val)}</span>
                  </div>
                  <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-stone-600" style={{ width: `${val}%`, opacity: 0.6 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-200 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              ['Net Worth',    formatMoney(money)],
              career && ['Career',      career.title],
              children.length > 0 && ['Children', children.length.toString()],
              criminalRecord.length > 0 && ['Offences', criminalRecord.length.toString()],
            ].filter(Boolean).map(([label, value]) => (
              <div key={label} className="flex flex-col">
                <span className="text-xs text-stone-400 uppercase tracking-wide" style={{ fontSize: '0.6rem' }}>{label}</span>
                <span className="text-xs font-bold text-stone-700 truncate">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Life in brief ── */}
        {lifeNotes.length > 0 && (
          <div className="rounded-2xl px-5 py-4 border border-stone-300" style={{ background: '#faf7f2' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Life in brief</p>
            <ul className="space-y-1.5">
              {lifeNotes.map((note, i) => (
                <li key={i} className="text-sm text-stone-700 flex items-start gap-2">
                  <span className="text-stone-300 mt-0.5 shrink-0 font-bold">—</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Restart ── */}
        <button
          onClick={startNewLife}
          className="w-full py-4 rounded-2xl font-bold text-white text-base shadow-card-lg transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #007aff, #0055cc)' }}
        >
          🌱 Start Another Life
        </button>

      </div>
    </div>
  )
}
