import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import MazeGame from './minigames/MazeGame'
import LockPick from './minigames/LockPick'
import QuickTime from './minigames/QuickTime'
import HackGame from './minigames/HackGame'
import FightGame from './minigames/FightGame'

const GAME_META = {
  maze:      { title: 'Escape',        icon: '🏃', desc: 'Read the route, then walk it before they reach you.' },
  lockpick:  { title: 'Pick the Lock', icon: '🔓', desc: 'Set each pin as it crosses the shear line.' },
  quicktime: { title: 'Quick Hands',   icon: '👋', desc: 'Act at the right moment.' },
  hack:      { title: 'System Breach', icon: '💻', desc: 'The sequence is on the screen once. Give it back.' },
  fight:     { title: 'Fight Back',    icon: '👊', desc: 'Read the attack — answer it.' },
}

export default function MinigameScreen() {
  const pendingMinigame = useGameStore(s => s.pendingMinigame)
  const resolveMinigame = useGameStore(s => s.resolveMinigame)

  if (!pendingMinigame) return null

  const { type, difficulty, title, description, skipable = true } = pendingMinigame
  const meta = GAME_META[type] ?? GAME_META.quicktime

  const handleComplete = (success) => {
    resolveMinigame(success)
  }

  const handleSkip = () => {
    resolveMinigame(false)
  }

  return <MinigameDialog {...{ pendingMinigame, meta, type, difficulty, title, description, skipable, handleComplete, handleSkip }} />
}

/**
 * The one full-screen surface with no way out by keyboard and nothing telling
 * assistive technology it was a dialog: no role, no label, no focus move, and
 * Escape did nothing, so a keyboard player who reached it was stuck there. The
 * other two sheets grew an Escape handler in the redesign and this one was
 * missed. Escape counts as a failure, exactly as the visible Skip control does,
 * and is only offered where that control is.
 *
 * `aria-modal` is a promise to assistive technology, not a behaviour: two Tabs
 * from inside the game still walked out of the dialog and into the life screen
 * underneath it, where the next Tab reaches Menu and the one after that Age Up.
 * The Tab key is wrapped so focus stays inside the thing that is blocking the
 * page.
 */
function MinigameDialog({ meta, type, difficulty, title, description, skipable, pendingMinigame, handleComplete, handleSkip }) {
  const panelRef = useRef(null)

  useEffect(() => {
    panelRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (!skipable) return
        e.preventDefault()
        handleSkip()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const stops = [...panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter(el => !el.disabled && el.offsetParent !== null)
      if (stops.length === 0) { e.preventDefault(); panel.focus(); return }
      const first = stops[0]
      const last = stops[stops.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === panel || !panel.contains(active))) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault(); first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [skipable, handleSkip])

  // A second minigame of the same type mounts into the first one's React
  // instance and inherits its round, its HP and its maze unless the element is
  // keyed to the thing being played.
  const gameKey = `${type}-${difficulty ?? 'normal'}-${title ?? ''}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="minigame-title"
        aria-describedby="minigame-desc"
        className="bg-natalis-surface rounded-3xl shadow-card-lg w-full max-w-sm overflow-hidden border border-natalis-border"
      >
        {/* Header. The icon is wayfinding in a utility surface, which the design
            document keeps; the black slab and the 70% blurred scrim it sat on
            were the last of the old palette on any screen. */}
        <div className="bg-natalis-bg border-b border-natalis-border px-6 py-4 flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">{meta.icon}</span>
          <div>
            <h2 id="minigame-title" className="text-natalis-text font-prose text-lg leading-tight">{title ?? meta.title}</h2>
            <p id="minigame-desc" className="text-natalis-muted text-xs">{description ?? meta.desc}</p>
          </div>
        </div>

        {/* Game area */}
        <div className="px-4 py-6 flex flex-col items-center">
          {type === 'maze' && <MazeGame key={gameKey} onComplete={handleComplete} difficulty={difficulty} />}
          {type === 'lockpick' && <LockPick key={gameKey} onComplete={handleComplete} difficulty={difficulty} />}
          {type === 'quicktime' && (
            <QuickTime
              key={gameKey}
              onComplete={handleComplete}
              difficulty={difficulty}
              label={pendingMinigame.actionLabel ?? 'Now'}
              rounds={pendingMinigame.rounds ?? 3}
            />
          )}
          {type === 'hack' && <HackGame key={gameKey} onComplete={handleComplete} difficulty={difficulty} />}
          {type === 'fight' && (
            <FightGame
              key={gameKey}
              onComplete={handleComplete}
              difficulty={difficulty}
              enemyLabel={pendingMinigame.enemyLabel}
            />
          )}
        </div>

        {/* Skip option */}
        {skipable && (
          <div className="px-6 pb-5 text-center">
            <button
              onClick={handleSkip}
              className="text-xs text-natalis-muted underline underline-offset-2 hover:text-natalis-dim"
            >
              Skip (counts as failure)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
