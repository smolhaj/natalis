import { useGameStore } from '../store/gameStore'
import FlagChip from './FlagChip'
import StatBar from './StatBar'

const RIBBON_COLORS = {
  gold: 'text-yellow-400 border-yellow-800 bg-yellow-950/30',
  green: 'text-green-400 border-green-800 bg-green-950/30',
  red: 'text-red-400 border-red-800 bg-red-950/30',
  blue: 'text-blue-400 border-blue-800 bg-blue-950/30',
  purple: 'text-purple-400 border-purple-800 bg-purple-950/30',
  gray: 'text-natalis-dim border-natalis-border bg-natalis-surface',
}

export default function DeathScreen() {
  const character = useGameStore(s => s.character)
  const stats = useGameStore(s => s.stats)
  const flags = useGameStore(s => s.flags)
  const regret = useGameStore(s => s.regret)
  const age = useGameStore(s => s.age)
  const causeOfDeath = useGameStore(s => s.causeOfDeath)
  const ribbon = useGameStore(s => s.ribbon)
  const epitaph = useGameStore(s => s.epitaph)
  const criminalRecord = useGameStore(s => s.criminalRecord)
  const career = useGameStore(s => s.career)
  const children = useGameStore(s => s.children)
  const startNewLife = useGameStore(s => s.startNewLife)

  if (!character) return null

  const birthYear = character.birthYear
  const deathYear = birthYear + age
  const ribbonStyle = RIBBON_COLORS[ribbon?.color ?? 'gray']

  return (
    <div className="min-h-screen bg-natalis-bg flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-2xl space-y-8">

        {/* Header */}
        <div className="text-center space-y-2 border-b border-natalis-border pb-8">
          <p className="text-natalis-muted text-xs uppercase tracking-widest">In Memoriam</p>
          <h1 className="text-3xl text-natalis-text font-light">{character.firstName} {character.surname}</h1>
          <p className="text-natalis-dim text-sm">
            {birthYear} – {deathYear} · {character.country.name} · Died age {age}
          </p>
          <p className="text-natalis-muted text-xs italic">Cause: {causeOfDeath}</p>
        </div>

        {/* Ribbon */}
        {ribbon && (
          <div className={`border p-4 text-center space-y-1 ${ribbonStyle}`}>
            <p className="text-xs uppercase tracking-widest opacity-70">Life Archetype</p>
            <p className="text-lg">{ribbon.name}</p>
            <p className="text-xs opacity-70 italic">{ribbon.description}</p>
          </div>
        )}

        {/* Epitaph */}
        <div className="border-l-2 border-natalis-muted pl-5 space-y-3">
          <p className="text-natalis-dim text-xs uppercase tracking-wider">Epitaph</p>
          <p className="text-natalis-text text-sm leading-relaxed">{epitaph}</p>
        </div>

        {/* Stats */}
        <div className="border border-natalis-border p-4 space-y-3">
          <p className="text-natalis-dim text-xs uppercase tracking-wider">Final Stats</p>
          <StatBar stat="happiness" label="Happiness" value={stats.happiness} />
          <StatBar stat="health"    label="Health"    value={stats.health} />
          <StatBar stat="smarts"    label="Smarts"    value={stats.smarts} />
          <StatBar stat="looks"     label="Looks"     value={stats.looks} />
          <StatBar stat="charisma"  label="Charisma"  value={stats.charisma} />
          <StatBar stat="wealth"    label="Wealth"    value={stats.wealth} />
          {regret > 0 && (
            <div className="flex justify-between text-xs text-natalis-muted pt-1 border-t border-natalis-border">
              <span>Regret carried</span>
              <span>{Math.round(regret)}</span>
            </div>
          )}
          {career && (
            <div className="flex justify-between text-xs text-natalis-muted pt-1 border-t border-natalis-border">
              <span>Final career</span>
              <span>{career.title}</span>
            </div>
          )}
          {children.length > 0 && (
            <div className="flex justify-between text-xs text-natalis-muted">
              <span>Children</span>
              <span>{children.length}</span>
            </div>
          )}
          {criminalRecord.length > 0 && (
            <div className="flex justify-between text-xs text-red-400/70">
              <span>Criminal record</span>
              <span>{criminalRecord.length} offence{criminalRecord.length !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Flags */}
        {flags.length > 0 && (
          <div className="space-y-3">
            <p className="text-natalis-dim text-xs uppercase tracking-wider">Life Flags</p>
            <div className="flex flex-wrap gap-1.5">
              {flags.map(f => <FlagChip key={f} flag={f} />)}
            </div>
          </div>
        )}

        {/* Criminal record detail */}
        {criminalRecord.length > 0 && (
          <div className="space-y-2">
            <p className="text-natalis-dim text-xs uppercase tracking-wider">Criminal Record</p>
            <div className="space-y-1">
              {criminalRecord.map((entry, i) => (
                <p key={i} className="text-red-400/70 text-xs border-l border-red-900 pl-2">{entry}</p>
              ))}
            </div>
          </div>
        )}

        {/* Restart */}
        <div className="pt-4 border-t border-natalis-border">
          <button
            onClick={startNewLife}
            className="
              w-full py-3 border border-natalis-muted text-natalis-text text-xs tracking-widest uppercase
              hover:bg-natalis-surface transition-all
            "
          >
            Another Life
          </button>
        </div>
      </div>
    </div>
  )
}
