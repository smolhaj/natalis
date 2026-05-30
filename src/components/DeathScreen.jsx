import { useGameStore } from '../store/gameStore'
import { generateLifeNotes } from '../engine/gameEngine'
import StatBar from './StatBar'

const RIBBON_STYLES = {
  gold:   { bg: '#fffbeb', border: '#f59e0b', text: '#92400e', badge: '🏆' },
  green:  { bg: '#f0fdf4', border: '#22c55e', text: '#14532d', badge: '🌿' },
  red:    { bg: '#fef2f2', border: '#ef4444', text: '#7f1d1d', badge: '🔥' },
  blue:   { bg: '#eff6ff', border: '#3b82f6', text: '#1e3a8a', badge: '💎' },
  purple: { bg: '#faf5ff', border: '#a855f7', text: '#581c87', badge: '👑' },
  gray:   { bg: '#f9fafb', border: '#e5e7eb', text: '#374151', badge: '🌫️' },
}

export default function DeathScreen() {
  const character     = useGameStore(s => s.character)
  const stats         = useGameStore(s => s.stats)
  const flags         = useGameStore(s => s.flags)
  const regret        = useGameStore(s => s.regret)
  const age           = useGameStore(s => s.age)
  const causeOfDeath  = useGameStore(s => s.causeOfDeath)
  const ribbon        = useGameStore(s => s.ribbon)
  const epitaph       = useGameStore(s => s.epitaph)
  const criminalRecord = useGameStore(s => s.criminalRecord)
  const career        = useGameStore(s => s.career)
  const children      = useGameStore(s => s.children)
  const money         = useGameStore(s => s.money)
  const startNewLife  = useGameStore(s => s.startNewLife)
  const fullState     = useGameStore(s => s)

  if (!character) return null

  const birthYear = character.birthYear
  const deathYear = birthYear + age
  const rs = RIBBON_STYLES[ribbon?.color ?? 'gray']
  const lifeNotes = generateLifeNotes(fullState)
  const epitaphParagraphs = epitaph ? epitaph.split('\n\n').filter(Boolean) : []

  const formatMoney = (n) => {
    if (!n) return '$0'
    if (n >= 1000000) return `$${(n/1000000).toFixed(2)}M`
    if (n >= 1000) return `$${Math.round(n/1000)}k`
    return `$${n.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-natalis-bg flex items-start justify-center py-8 px-4">
      <div className="w-full max-w-sm space-y-4">

        {/* Gravestone header */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-natalis-border text-center">
          <div className="py-6 px-5" style={{ background: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' }}>
            <p className="text-4xl mb-3">⚰️</p>
            <h1 className="text-2xl font-black text-white">{character.firstName} {character.surname}</h1>
            <p className="text-gray-400 text-sm mt-1">{birthYear} – {deathYear}</p>
            <p className="text-gray-400 text-xs mt-0.5">{character.country.name} · Died age {age}</p>
            <p className="text-gray-500 text-xs italic mt-2">Cause: {causeOfDeath}</p>
          </div>

          {/* Ribbon */}
          {ribbon && (
            <div className="px-5 py-4 border-t border-natalis-border" style={{ background: rs.bg }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: rs.text, opacity: 0.7 }}>Life Archetype</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{rs.badge}</span>
                <p className="text-xl font-black" style={{ color: rs.text }}>{ribbon.name}</p>
              </div>
              <p className="text-xs italic mt-1" style={{ color: rs.text, opacity: 0.8 }}>{ribbon.description}</p>
            </div>
          )}
        </div>

        {/* Epitaph */}
        <div className="bg-white rounded-2xl p-5 border border-natalis-border shadow-card">
          <p className="text-xs font-bold uppercase tracking-wider text-natalis-muted mb-3">Obituary</p>
          <div className="space-y-3">
            {epitaphParagraphs.map((para, i) => (
              <p key={i} className="text-natalis-text text-sm leading-relaxed italic">{para}</p>
            ))}
            {epitaphParagraphs.length === 0 && epitaph && (
              <p className="text-natalis-text text-sm leading-relaxed italic">{epitaph}</p>
            )}
          </div>
        </div>

        {/* Stats summary */}
        <div className="bg-white rounded-2xl p-5 border border-natalis-border shadow-card space-y-3">
          <p className="font-bold text-natalis-text text-sm">Final Stats</p>
          <StatBar stat="happiness" label="Happiness" value={stats.happiness} />
          <StatBar stat="health"    label="Health"    value={stats.health} />
          <StatBar stat="smarts"    label="Smarts"    value={stats.smarts} />
          <StatBar stat="looks"     label="Looks"     value={stats.looks} />

          <div className="pt-2 border-t border-natalis-border space-y-1.5">
            {[
              { label: '💰 Final Net Worth', value: formatMoney(money), color: '#34c759' },
              career && { label: '💼 Final Career', value: career.title, color: '#007aff' },
              children.length > 0 && { label: '👨‍👩‍👧 Children', value: children.length.toString(), color: '#ff9500' },
              regret > 0 && { label: '😔 Regret', value: Math.round(regret).toString(), color: '#8e8e93' },
              criminalRecord.length > 0 && { label: '⚠️ Criminal Record', value: `${criminalRecord.length} offence${criminalRecord.length !== 1 ? 's' : ''}`, color: '#ff3b30' },
            ].filter(Boolean).map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center text-sm">
                <span className="text-natalis-muted text-xs">{label}</span>
                <span className="font-bold text-xs" style={{ color }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Life in brief */}
        {lifeNotes.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border border-natalis-border shadow-card">
            <p className="text-xs font-bold uppercase tracking-wider text-natalis-muted mb-3">Life in brief</p>
            <ul className="space-y-1.5">
              {lifeNotes.map((note, i) => (
                <li key={i} className="text-sm text-natalis-text italic flex items-start gap-2">
                  <span className="text-natalis-muted mt-0.5 shrink-0">—</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Restart */}
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
