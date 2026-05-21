import { useState, useEffect } from 'react'

// Hacking minigame: match a sequence of hex/binary values
// Shows the sequence briefly, then player recreates it

const SYMBOLS = ['A1', 'B2', 'C3', 'D4', 'E5', 'F6', '7G', '8H', '9I', '0J']
const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316']

function genSequence(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * SYMBOLS.length))
}

export default function HackGame({ onComplete, difficulty = 'normal' }) {
  const seqLen = difficulty === 'hard' ? 6 : difficulty === 'easy' ? 3 : 4
  const rounds = difficulty === 'hard' ? 3 : 2
  const showMs = difficulty === 'hard' ? 1500 : 2200

  const [phase, setPhase] = useState('intro') // intro | show | input | result | done
  const [sequence, setSequence] = useState([])
  const [input, setInput] = useState([])
  const [round, setRound] = useState(0)
  const [successes, setSuccesses] = useState(0)
  const [lastResult, setLastResult] = useState(null)

  const startRound = () => {
    const seq = genSequence(seqLen + round)
    setSequence(seq)
    setInput([])
    setLastResult(null)
    setPhase('show')
    setTimeout(() => setPhase('input'), showMs)
  }

  useEffect(() => {
    if (phase === 'intro') {
      setTimeout(() => startRound(), 500)
    }
  }, [])

  const handlePick = (idx) => {
    if (phase !== 'input') return
    const next = [...input, idx]
    setInput(next)
    if (next.length === sequence.length) {
      const correct = next.every((v, i) => v === sequence[i])
      const newSuccesses = correct ? successes + 1 : successes
      setSuccesses(newSuccesses)
      setLastResult(correct)
      setPhase('result')
      setTimeout(() => {
        if (round + 1 >= rounds) {
          setPhase('done')
          setTimeout(() => onComplete(newSuccesses > 0), 600)
        } else {
          setRound(r => r + 1)
          startRound()
        }
      }, 800)
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-center">
        <p className="text-sm font-mono font-bold text-green-600">SYSTEM BREACH</p>
        <p className="text-xs text-gray-500 mt-0.5">Round {round + 1}/{rounds} — sequence length: {seqLen + round}</p>
      </div>

      {/* Sequence display */}
      <div className="bg-gray-900 rounded-xl p-4 w-full max-w-xs min-h-16 flex items-center justify-center gap-2 flex-wrap">
        {phase === 'show' && sequence.map((s, i) => (
          <div key={i} className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-mono font-bold text-white"
            style={{ background: COLORS[s] }}>
            {SYMBOLS[s]}
          </div>
        ))}
        {phase === 'input' && (
          <p className="text-green-400 font-mono text-sm animate-pulse">Recreate the sequence...</p>
        )}
        {phase === 'show' && (
          <div className="absolute" /> // placeholder to keep layout stable
        )}
        {phase === 'result' && (
          <p className={`font-bold text-lg ${lastResult ? 'text-green-400' : 'text-red-400'}`}>
            {lastResult ? '✓ CORRECT' : '✗ WRONG'}
          </p>
        )}
        {phase === 'intro' && (
          <p className="text-green-400 font-mono text-sm animate-pulse">Initialising...</p>
        )}
        {phase === 'done' && (
          <p className="text-green-400 font-mono text-sm">ACCESS {successes > 0 ? 'GRANTED' : 'DENIED'}</p>
        )}
      </div>

      {/* Input progress */}
      {phase === 'input' && (
        <div className="flex gap-1">
          {Array.from({ length: sequence.length }, (_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < input.length ? 'bg-green-500' : 'bg-gray-300'}`} />
          ))}
        </div>
      )}

      {/* Symbol grid */}
      <div className="grid grid-cols-5 gap-2">
        {SYMBOLS.map((sym, idx) => (
          <button
            key={idx}
            onClick={() => handlePick(idx)}
            disabled={phase !== 'input'}
            className="w-14 h-14 rounded-xl font-mono font-bold text-sm text-white transition-all active:scale-90"
            style={{
              background: phase === 'input' ? COLORS[idx] : '#d1d5db',
              opacity: phase === 'input' ? 1 : 0.5,
              cursor: phase === 'input' ? 'pointer' : 'default',
            }}
          >
            {sym}
          </button>
        ))}
      </div>
    </div>
  )
}
