import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import MazeGame from './minigames/MazeGame'
import LockPick from './minigames/LockPick'
import QuickTime from './minigames/QuickTime'
import HackGame from './minigames/HackGame'
import FightGame from './minigames/FightGame'

const GAME_META = {
  maze:      { title: 'Escape',       icon: '🏃', desc: 'Navigate to the exit before you\'re caught.' },
  lockpick:  { title: 'Pick the Lock', icon: '🔓', desc: 'Set each pin when it hits the green zone.' },
  quicktime: { title: 'Quick Hands',  icon: '👋', desc: 'Tap at the right moment.' },
  hack:      { title: 'System Breach', icon: '💻', desc: 'Memorise and replay the sequence.' },
  fight:     { title: 'Fight Back',   icon: '👊', desc: 'Read the attack — counter correctly.' },
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
 */
function MinigameDialog({ meta, type, difficulty, title, description, skipable, pendingMinigame, handleComplete, handleSkip }) {
  const panelRef = useRef(null)

  useEffect(() => {
    panelRef.current?.focus()
    if (!skipable) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      handleSkip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [skipable, handleSkip])

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
          {type === 'maze' && <MazeGame onComplete={handleComplete} difficulty={difficulty} />}
          {type === 'lockpick' && <LockPick onComplete={handleComplete} difficulty={difficulty} />}
          {type === 'quicktime' && (
            <QuickTime
              onComplete={handleComplete}
              difficulty={difficulty}
              label={pendingMinigame.actionLabel ?? 'Now!'}
              rounds={pendingMinigame.rounds ?? 3}
            />
          )}
          {type === 'hack' && <HackGame onComplete={handleComplete} difficulty={difficulty} />}
          {type === 'fight' && (
            <FightGame
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
