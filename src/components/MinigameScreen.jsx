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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-4 flex items-center gap-3">
          <span className="text-3xl">{meta.icon}</span>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">{title ?? meta.title}</h2>
            <p className="text-gray-400 text-xs">{description ?? meta.desc}</p>
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
              className="text-xs text-gray-400 underline underline-offset-2"
            >
              Skip (counts as failure)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
