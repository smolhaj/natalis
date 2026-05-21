import { useState, useEffect, useRef } from 'react'

// Fight minigame: attack/dodge/block timing
// Enemy telegraphs a move, player reacts correctly

const MOVES = [
  { id: 'punch', label: 'Punch', emoji: '👊', beats: 'dodge', losesTo: 'block' },
  { id: 'block', label: 'Block', emoji: '🛡️', beats: 'punch', losesTo: 'dodge' },
  { id: 'dodge', label: 'Dodge', emoji: '🏃', beats: 'block', losesTo: 'punch' },
]

const ENEMY_NAMES = ['the mugger', 'your attacker', 'the guard', 'your opponent']

function getCounterTo(moveId) {
  return MOVES.find(m => m.beats === moveId)
}

export default function FightGame({ onComplete, difficulty = 'normal', enemyLabel }) {
  const rounds = difficulty === 'hard' ? 7 : 5
  const thinkMs = difficulty === 'hard' ? 1200 : 1800

  const [round, setRound] = useState(0)
  const [playerHP, setPlayerHP] = useState(3)
  const [enemyHP, setEnemyHP] = useState(3)
  const [phase, setPhase] = useState('telegraph') // telegraph | react | result
  const [enemyMove, setEnemyMove] = useState(null)
  const [playerMove, setPlayerMove] = useState(null)
  const [roundResult, setRoundResult] = useState(null) // 'win' | 'lose' | 'draw'
  const [done, setDone] = useState(false)
  const timer = useRef(null)
  const enemy = enemyLabel ?? ENEMY_NAMES[Math.floor(Math.random() * ENEMY_NAMES.length)]

  const runRound = () => {
    const em = MOVES[Math.floor(Math.random() * MOVES.length)]
    setEnemyMove(em)
    setPlayerMove(null)
    setRoundResult(null)
    setPhase('telegraph')

    timer.current = setTimeout(() => {
      // Player didn't react in time — enemy hits
      setPhase('result')
      setRoundResult('lose')
      const newHP = playerHP - 1
      setPlayerHP(newHP)
      setTimeout(() => {
        if (newHP <= 0 || round + 1 >= rounds) {
          setDone(true)
          onComplete(newHP > 0 && enemyHP > 0 ? enemyHP <= playerHP : enemyHP <= 0)
        } else {
          setRound(r => r + 1)
        }
      }, 800)
    }, thinkMs)
  }

  useEffect(() => {
    runRound()
    return () => clearTimeout(timer.current)
  }, [round])

  const handleMove = (move) => {
    if (phase !== 'telegraph' || done) return
    clearTimeout(timer.current)
    setPlayerMove(move)
    setPhase('react')

    const counter = getCounterTo(enemyMove.id)
    const playerWinsRound = move.id === counter?.id
    const draw = move.id === enemyMove.id

    let result = 'lose'
    let newEnemyHP = enemyHP
    let newPlayerHP = playerHP

    if (playerWinsRound) { result = 'win'; newEnemyHP = enemyHP - 1 }
    else if (draw) { result = 'draw' }
    else { result = 'lose'; newPlayerHP = playerHP - 1 }

    setRoundResult(result)
    setEnemyHP(newEnemyHP)
    setPlayerHP(newPlayerHP)
    setPhase('result')

    setTimeout(() => {
      if (newPlayerHP <= 0 || newEnemyHP <= 0 || round + 1 >= rounds) {
        setDone(true)
        onComplete(newEnemyHP <= 0 || (round + 1 >= rounds && newPlayerHP > newEnemyHP) || (newPlayerHP > 0 && newEnemyHP > newPlayerHP))
      } else {
        setRound(r => r + 1)
      }
    }, 900)
  }

  const HP = ({ n, max = 3, color }) => (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <div key={i} className="w-5 h-5 rounded-full" style={{ background: i < n ? color : '#e5e7eb' }} />
      ))}
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-5">
      {/* HP bars */}
      <div className="w-full max-w-xs flex justify-between items-center">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-gray-500 font-semibold">You</span>
          <HP n={playerHP} color="#34d399" />
        </div>
        <span className="text-lg font-bold text-gray-400">VS</span>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-gray-500 font-semibold capitalize">{enemy}</span>
          <HP n={enemyHP} color="#f87171" />
        </div>
      </div>

      {/* Enemy telegraph */}
      <div className="bg-gray-100 rounded-2xl p-5 w-full max-w-xs text-center min-h-24 flex flex-col items-center justify-center">
        {phase === 'telegraph' && enemyMove && (
          <>
            <p className="text-xs text-gray-400 mb-2 animate-pulse">Incoming...</p>
            <div className="text-5xl">{enemyMove.emoji}</div>
            <p className="text-sm text-gray-600 mt-1 font-semibold">{enemyMove.label}</p>
          </>
        )}
        {phase === 'result' && (
          <>
            <div className={`text-2xl font-bold ${roundResult === 'win' ? 'text-green-600' : roundResult === 'lose' ? 'text-red-500' : 'text-gray-500'}`}>
              {roundResult === 'win' ? '✓ Hit!' : roundResult === 'lose' ? '✗ Ouch!' : '— Draw'}
            </div>
            {playerMove && <p className="text-xs text-gray-400 mt-1">{playerMove.emoji} vs {enemyMove?.emoji}</p>}
          </>
        )}
      </div>

      {/* Player choices */}
      <div className="flex gap-3">
        {MOVES.map(m => (
          <button
            key={m.id}
            onClick={() => handleMove(m)}
            disabled={phase !== 'telegraph' || done}
            className="flex flex-col items-center gap-1 px-5 py-4 rounded-2xl text-white font-semibold transition-all active:scale-90"
            style={{
              background: phase === 'telegraph' ? '#6366f1' : '#9ca3af',
              cursor: phase === 'telegraph' ? 'pointer' : 'default',
            }}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-xs">{m.label}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400">Round {round + 1}/{rounds}</p>
    </div>
  )
}
