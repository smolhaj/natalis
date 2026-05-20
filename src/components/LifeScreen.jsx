import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import StatBar from './StatBar'
import FlagChip from './FlagChip'
import EventBox from './EventBox'
import ActivitiesPanel from './ActivitiesPanel'

const PHASE_LABELS = {
  early_childhood: 'Early Childhood',
  childhood: 'Childhood',
  adolescence: 'Adolescence',
  young_adult: 'Young Adult',
  midlife: 'Midlife',
  late_life: 'Late Life',
}

function getPhase(age) {
  if (age <= 5) return 'early_childhood'
  if (age <= 11) return 'childhood'
  if (age <= 17) return 'adolescence'
  if (age <= 29) return 'young_adult'
  if (age <= 49) return 'midlife'
  return 'late_life'
}

export default function LifeScreen() {
  const [showActivities, setShowActivities] = useState(false)

  const character = useGameStore(s => s.character)
  const stats = useGameStore(s => s.stats)
  const flags = useGameStore(s => s.flags)
  const regret = useGameStore(s => s.regret)
  const age = useGameStore(s => s.age)
  const currentYear = useGameStore(s => s.currentYear)
  const log = useGameStore(s => s.log)
  const pendingEvent = useGameStore(s => s.pendingEvent)
  const career = useGameStore(s => s.career)
  const education = useGameStore(s => s.education)
  const partner = useGameStore(s => s.partner)
  const children = useGameStore(s => s.children)
  const inPrison = useGameStore(s => s.inPrison)
  const prisonSentence = useGameStore(s => s.prisonSentence)
  const actionsThisYear = useGameStore(s => s.actionsThisYear)
  const maxActionsPerYear = useGameStore(s => s.maxActionsPerYear)
  const lastOutcome = useGameStore(s => s.lastOutcome)
  const ageUp = useGameStore(s => s.ageUp)
  const dead = useGameStore(s => s.dead)

  if (!character) return null

  const phase = getPhase(age)
  const recentLog = [...log].reverse().slice(0, 30)

  return (
    <div className="h-screen bg-natalis-bg flex overflow-hidden">

      {/* ── Left Sidebar ────────────────────────────────────────────────── */}
      <aside className="w-64 h-screen sticky top-0 border-r border-natalis-border bg-natalis-surface flex flex-col flex-shrink-0 overflow-hidden">

        {/* Identity */}
        <div className="p-4 border-b border-natalis-border space-y-0.5">
          <p className="text-natalis-text text-sm font-light">{character.firstName} {character.surname}</p>
          <p className="text-natalis-muted text-xs">{character.country.name}</p>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-natalis-text text-2xl font-light">{age}</span>
            <span className="text-natalis-muted text-xs">years old</span>
          </div>
          <p className="text-natalis-muted text-xs">{currentYear} · {PHASE_LABELS[phase]}</p>
        </div>

        {/* Stats */}
        <div className="p-4 border-b border-natalis-border space-y-3">
          <StatBar stat="health" label="Health" value={stats.health} />
          <StatBar stat="mental" label="Mental" value={stats.mental} />
          <StatBar stat="wealth" label="Wealth" value={stats.wealth} />
          <StatBar stat="education" label="Education" value={stats.education} />
          <StatBar stat="social" label="Social" value={stats.social} />
          {regret > 0 && (
            <div className="text-natalis-muted text-xs flex justify-between pt-1">
              <span>Regret</span>
              <span>{Math.round(regret)}</span>
            </div>
          )}
        </div>

        {/* Life status */}
        <div className="p-4 border-b border-natalis-border space-y-2 text-xs text-natalis-dim">
          {career && (
            <div>
              <p className="text-natalis-muted uppercase tracking-wider text-xs mb-0.5">Career</p>
              <p>{career.title}</p>
              <p className="text-natalis-muted">${career.salary.toLocaleString()}/yr · Level {career.level + 1}</p>
            </div>
          )}
          {education.level !== 'none' && (
            <div>
              <p className="text-natalis-muted uppercase tracking-wider text-xs mb-0.5">Education</p>
              <p className="capitalize">{education.level.replace('_', ' ')}{education.field ? ` · ${education.field}` : ''}</p>
            </div>
          )}
          {partner && (
            <div>
              <p className="text-natalis-muted uppercase tracking-wider text-xs mb-0.5">Partner</p>
              <p>{partner.name}{partner.married ? ' (married)' : ''}</p>
            </div>
          )}
          {children.length > 0 && (
            <div>
              <p className="text-natalis-muted uppercase tracking-wider text-xs mb-0.5">Children</p>
              <p>{children.length}</p>
            </div>
          )}
          {inPrison && (
            <div className="text-red-400">
              <p className="uppercase tracking-wider text-xs mb-0.5">In Prison</p>
              <p>{prisonSentence} yr{prisonSentence !== 1 ? 's' : ''} remaining</p>
            </div>
          )}
        </div>

        {/* Flags */}
        {flags.length > 0 && (
          <div className="p-4 flex-1 overflow-y-auto">
            <p className="text-natalis-muted text-xs uppercase tracking-wider mb-2">Life Flags</p>
            <div className="flex flex-wrap gap-1">
              {flags.map(f => <FlagChip key={f} flag={f} />)}
            </div>
          </div>
        )}
      </aside>

      {/* ── Main Area ───────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">

        {/* Top bar */}
        <header className="border-b border-natalis-border p-4 flex items-center justify-between flex-shrink-0">
          <div className="text-natalis-muted text-xs tracking-wider">
            {character.country.name} · {currentYear} · Age {age}
          </div>
          <div className="text-natalis-muted text-xs">
            {actionsThisYear}/{maxActionsPerYear} actions taken
          </div>
        </header>

        {/* Event / Activity area */}
        <div className="flex-shrink-0 p-4 space-y-3 border-b border-natalis-border">

          {/* Last choice outcome flash */}
          {lastOutcome && !pendingEvent && (
            <div className="text-natalis-dim text-xs italic border-l-2 border-natalis-muted pl-3 py-0.5">
              {lastOutcome}
            </div>
          )}

          {/* Prison state */}
          {inPrison && !pendingEvent && (
            <div className="border border-red-900 bg-red-950/20 p-4 text-red-300 text-sm">
              You are serving your sentence. {prisonSentence} year{prisonSentence !== 1 ? 's' : ''} remain.
            </div>
          )}

          {/* Pending event */}
          {pendingEvent && <EventBox event={pendingEvent} />}

          {/* Activities & Age Up */}
          {!pendingEvent && !dead && (
            <div className="space-y-2">
              {showActivities && (
                <ActivitiesPanel onClose={() => setShowActivities(false)} />
              )}
              <div className="flex gap-2">
                {!inPrison && (
                  <button
                    onClick={() => setShowActivities(v => !v)}
                    disabled={actionsThisYear >= maxActionsPerYear}
                    className="
                      flex-1 py-2.5 border border-natalis-border text-natalis-muted text-xs tracking-widest uppercase
                      hover:border-natalis-muted hover:text-natalis-dim
                      disabled:opacity-40 disabled:cursor-not-allowed
                      transition-all
                    "
                  >
                    {showActivities ? 'Close Activities' : 'Activities'}
                  </button>
                )}
                <button
                  onClick={ageUp}
                  className="
                    flex-1 py-2.5 border border-natalis-muted text-natalis-text text-xs tracking-widest uppercase
                    hover:bg-natalis-surface
                    transition-all
                  "
                >
                  Age Up →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Log */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-natalis-muted text-xs uppercase tracking-wider mb-3">Life Log</p>
          <div className="space-y-1.5">
            {recentLog.map((entry, i) => (
              <div
                key={i}
                className={`text-xs leading-relaxed py-0.5 ${
                  entry.isWorld
                    ? 'text-amber-400/80 border-l border-amber-900 pl-2'
                    : entry.isKey
                    ? 'text-natalis-text border-l border-natalis-muted pl-2'
                    : 'text-natalis-dim'
                }`}
              >
                <span className="text-natalis-muted mr-2">Age {entry.age}</span>
                {entry.text}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
