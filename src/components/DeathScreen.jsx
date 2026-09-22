import { useGameStore } from '../store/gameStore'
import { generateLifeNotes } from '../engine/gameEngine'

// The ribbon palette bypassed the muted remap with raw saturated hexes. The
// ribbon is a one-line verdict on a life; it does not need to be a colour.
const RIBBON_STYLES = {
  gold:   { border: '#8a7435', text: '#403b33', accent: '#b6a256' },
  green:  { border: '#3f6146', text: '#403b33', accent: '#6b8f79' },
  red:    { border: '#8c3a2e', text: '#403b33', accent: '#9b5445' },
  blue:   { border: '#3f5670', text: '#403b33', accent: '#6e7e96' },
  purple: { border: '#5b4a6b', text: '#403b33', accent: '#8f739a' },
  gray:   { border: '#615b52', text: '#403b33', accent: '#a9a297' },
  orange: { border: '#8a6635', text: '#403b33', accent: '#b18660' },
  pink:   { border: '#7b4356', text: '#403b33', accent: '#ae7182' },
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
        <div className="rounded-2xl overflow-hidden border border-natalis-border" style={{ background: '#fdfcf9' }}>
          {/* Thin decorative top rule */}
          <div className="h-1" style={{ background: '#1c1a16' }} />

          {/* Publication line */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2 border-b border-natalis-border">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-natalis-muted">natalis</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-natalis-faint">Obituaries</span>
          </div>

          {/* Name block */}
          <div className="px-5 pt-4 pb-2 text-center">
            <h1 className="font-prose text-3xl text-natalis-text leading-tight">
              {character.firstName} {character.surname}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <span className="text-xs text-natalis-muted">{birthYear}</span>
              <span className="text-natalis-faint">—</span>
              <span className="text-xs text-natalis-muted">{deathYear}</span>
            </div>
            <p className="text-xs text-natalis-faint mt-0.5">{character.country.name} · Died aged {age}</p>
            {causeOfDeath && (
              <p className="text-xs text-natalis-faint italic mt-1">{causeOfDeath}</p>
            )}
          </div>

          {/* Ribbon as pull-quote */}
          {ribbon && (
            <div className="mx-5 mb-4 mt-2 px-4 py-3 rounded-xl border-l-4" style={{ borderColor: rs.border, background: 'rgba(0,0,0,0.03)' }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: rs.text, opacity: 0.6 }}>
                Life Archetype
              </p>
              <p className="font-prose text-[1.0625rem] text-natalis-text">{ribbon.name}</p>
              <p className="font-prose text-sm italic mt-1 text-natalis-dim leading-relaxed">{ribbon.description}</p>
            </div>
          )}
        </div>

        {/* ── Epitaph ── */}
        {epitaphParagraphs.length > 0 && (
          <div className="rounded-2xl p-5 border border-natalis-border" style={{ background: '#fdfcf9' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-natalis-faint mb-3">Obituary</p>
            <div className="space-y-3">
              {epitaphParagraphs.map((para, i) => (
                <p key={i} className="font-prose text-prose text-natalis-text" style={{ fontStyle: i === 0 ? 'normal' : 'italic' }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* ── Final stats — compact inline ── */}
        <div className="rounded-2xl px-5 py-4 border border-natalis-border" style={{ background: '#fdfcf9' }}>
          <p className="text-xs font-bold uppercase tracking-wider text-natalis-faint mb-3">At death</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {statItems.map(([label, val]) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs text-natalis-muted">{label}</span>
                    <span className="text-xs font-bold text-natalis-dim">{Math.round(val)}</span>
                  </div>
                  <div className="h-1.5 bg-natalis-border rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-natalis-dim" style={{ width: `${val}%`, opacity: 0.6 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-natalis-border grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              ['Cash', formatMoney(money)],
              career && ['Career',      career.title],
              children.length > 0 && ['Children', children.length.toString()],
              criminalRecord.length > 0 && ['Offences', criminalRecord.length.toString()],
            ].filter(Boolean).map(([label, value]) => (
              <div key={label} className="flex flex-col">
                <span className="text-xs text-natalis-faint uppercase tracking-wide" style={{ fontSize: '0.6rem' }}>{label}</span>
                <span className="text-xs font-bold text-natalis-dim truncate">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Life in brief ── */}
        {lifeNotes.length > 0 && (
          <div className="rounded-2xl px-5 py-4 border border-natalis-border" style={{ background: '#fdfcf9' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-natalis-faint mb-3">Life in brief</p>
            <ul className="space-y-1.5">
              {lifeNotes.map((note, i) => (
                <li key={i} className="text-sm text-natalis-dim flex items-start gap-2">
                  <span className="text-natalis-faint mt-0.5 shrink-0 font-bold">—</span>
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
          style={{ background: '#3f5670' }}
        >
          Begin another life
        </button>

      </div>
    </div>
  )
}
