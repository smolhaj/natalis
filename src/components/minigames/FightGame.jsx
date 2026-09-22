import { useState, useEffect, useRef } from 'react'

// The other one telegraphs a move and you answer it before the window closes.

const MOVES = [
  { id: 'punch', label: 'Punch', beats: 'dodge' },
  { id: 'block', label: 'Block', beats: 'punch' },
  { id: 'dodge', label: 'Dodge', beats: 'block' },
]

const ENEMY_NAMES = ['the mugger', 'your attacker', 'the guard', 'your opponent']

const LEVEL = {
  easy:   { rounds: 5, thinkMs: 2400 },
  normal: { rounds: 5, thinkMs: 2000 },
  hard:   { rounds: 7, thinkMs: 1400 },
}

function counterTo(moveId) {
  return MOVES.find(m => m.beats === moveId)
}

export default function FightGame({ onComplete, difficulty = 'normal', enemyLabel }) {
  const level = LEVEL[difficulty] ?? LEVEL.normal
  const { rounds, thinkMs } = level

  const [round, setRound] = useState(0)
  const [playerHP, setPlayerHP] = useState(3)
  const [enemyHP, setEnemyHP] = useState(3)
  const [phase, setPhase] = useState('telegraph') // telegraph | result
  const [enemyMove, setEnemyMove] = useState(MOVES[0])
  const [playerMove, setPlayerMove] = useState(null)
  const [roundResult, setRoundResult] = useState(null) // 'win' | 'lose' | 'draw' | 'late'
  const timer = useRef(null)
  const settled = useRef(false)
  // A round resolves on a timer. If the dialog closes first — a skip, an
  // Escape, the store moving on — that timer still fires, and an unmounted game
  // reporting a result lands on whatever is pending next.
  const alive = useRef(true)
  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])
  const [enemy] = useState(() => enemyLabel ?? ENEMY_NAMES[Math.floor(Math.random() * ENEMY_NAMES.length)])

  // You have won if they are down, or if the rounds run out with you ahead on
  // what you have taken. The old predicate carried a third clause,
  // `newPlayerHP > 0 && newEnemyHP > newPlayerHP`, which reads "the other one
  // has more left than you" — so losing one exchange and drawing the rest
  // reported a win, with the fight's success prose ("It stops when they stay
  // down") printed over a character who never landed a hit.
  const settle = (p, e) => {
    if (settled.current) return
    settled.current = true
    setTimeout(() => { if (alive.current) onComplete(e <= 0 || (p > 0 && p > e)) }, 900)
  }

  const finishRound = (result, p, e) => {
    setRoundResult(result)
    setPlayerHP(p)
    setEnemyHP(e)
    setPhase('result')
    setTimeout(() => {
      if (!alive.current) return
      if (p <= 0 || e <= 0 || round + 1 >= rounds) settle(p, e)
      else setRound(r => r + 1)
    }, 900)
  }

  useEffect(() => {
    if (settled.current) return
    setEnemyMove(MOVES[Math.floor(Math.random() * MOVES.length)])
    setPlayerMove(null)
    setRoundResult(null)
    setPhase('telegraph')
    timer.current = setTimeout(() => {
      // Too slow. They hit you.
      finishRound('late', playerHP - 1, enemyHP)
    }, thinkMs)
    return () => clearTimeout(timer.current)
  }, [round])

  const handleMove = (move) => {
    if (phase !== 'telegraph' || settled.current) return
    clearTimeout(timer.current)
    setPlayerMove(move)

    const wins = move.id === counterTo(enemyMove.id)?.id
    const draw = move.id === enemyMove.id
    if (wins) finishRound('win', playerHP, enemyHP - 1)
    else if (draw) finishRound('draw', playerHP, enemyHP)
    else finishRound('lose', playerHP - 1, enemyHP)
  }

  // A telegraph lasts between 1.4 and 2.4 seconds. Tabbing to the right button
  // and pressing it does not fit inside that, so the three answers are also
  // the keys 1, 2 and 3.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const n = Number(e.key)
      if (!Number.isInteger(n) || n < 1 || n > MOVES.length) return
      e.preventDefault()
      handleMove(MOVES[n - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const Marks = ({ n, max = 3, alarm }) => (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`w-2.5 h-2.5 rounded-full border ${
            i < n
              ? (alarm ? 'bg-natalis-alarm border-natalis-alarm' : 'bg-natalis-dim border-natalis-dim')
              : 'border-natalis-border'
          }`}
        />
      ))}
    </div>
  )

  const resultLine =
    roundResult === 'win' ? 'That lands.'
      : roundResult === 'draw' ? 'Nothing in it.'
        : roundResult === 'late' ? 'You were still deciding.'
          : roundResult === 'lose' ? 'You take it on the side of the head.'
            : ''

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* What each of you has left */}
      <div className="w-full max-w-xs flex justify-between items-end">
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-natalis-muted text-xs uppercase tracking-wider">You</span>
          <Marks n={playerHP} alarm={playerHP <= 1} />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-natalis-muted text-xs uppercase tracking-wider">{enemy}</span>
          <Marks n={enemyHP} />
        </div>
      </div>

      {/* The telegraph */}
      <div className="rounded-2xl border border-natalis-border bg-natalis-bg px-5 py-5 w-full max-w-xs
                      text-center min-h-[104px] flex flex-col items-center justify-center">
        {phase === 'telegraph' ? (
          <>
            <p className="text-natalis-faint text-xs uppercase tracking-wider mb-1.5">They are about to</p>
            <p className="text-natalis-text font-prose text-2xl leading-none">{enemyMove.label}</p>
          </>
        ) : (
          <>
            <p className={`font-prose text-lg ${roundResult === 'win' ? 'text-natalis-text' : roundResult === 'draw' ? 'text-natalis-dim' : 'text-natalis-alarm'}`}>
              {resultLine}
            </p>
            {playerMove && (
              <p className="text-natalis-faint text-xs mt-1.5">
                {playerMove.label} against {enemyMove.label}
              </p>
            )}
          </>
        )}
      </div>

      {/* Your answer. Identical buttons: the ordering and the colour say
          nothing about which one is right. */}
      <div className="flex gap-2.5">
        {MOVES.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => handleMove(m)}
            disabled={phase !== 'telegraph'}
            aria-keyshortcuts={String(i + 1)}
            className="px-5 py-3 rounded-xl border border-natalis-accent text-natalis-accent
                       hover:bg-natalis-accent-soft active:scale-95 transition-all
                       disabled:opacity-40 disabled:hover:bg-transparent"
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-natalis-faint text-center leading-relaxed">
        Block stops a punch. A punch catches a dodge. A dodge leaves a block swinging.<br />
        Keys 1, 2, 3.
      </p>
      <p className="text-xs text-natalis-faint">Round {Math.min(round + 1, rounds)} of {rounds}</p>
    </div>
  )
}
