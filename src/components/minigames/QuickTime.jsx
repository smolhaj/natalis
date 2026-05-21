import { useState, useEffect, useRef } from 'react'

// Generic quick-time event: a target slides across and player must tap at the right moment
// Used for: pickpocketing, escaping a mugger, bar fight timing

export default function QuickTime({ onComplete, difficulty = 'normal', label = 'Grab it!', rounds = 3 }) {
  const [round, setRound] = useState(0)
  const [hits, setHits] = useState(0)
  const [pos, setPos] = useState(0) // 0-100 across the bar
  const [dir, setDir] = useState(1)
  const [flash, setFlash] = useState(null) // 'hit' | 'miss'
  const [done, setDone] = useState(false)
  const posRef = useRef(0)
  const dirRef = useRef(1)
  const interval = useRef(null)

  const speed = difficulty === 'hard' ? 2.2 : difficulty === 'easy' ? 1.2 : 1.7
  // Target zone: 40-60 (center 20%)
  const ZONE_START = 38
  const ZONE_END = 62

  const startRound = () => {
    posRef.current = 0
    dirRef.current = 1
    setPos(0)
    setDir(1)
    setFlash(null)
    interval.current = setInterval(() => {
      posRef.current += dirRef.current * speed
      if (posRef.current >= 100) { posRef.current = 100; dirRef.current = -1 }
      if (posRef.current <= 0) { posRef.current = 0; dirRef.current = 1 }
      setPos(posRef.current)
    }, 30)
  }

  useEffect(() => {
    startRound()
    return () => clearInterval(interval.current)
  }, [round])

  const handleTap = () => {
    if (done || flash) return
    clearInterval(interval.current)
    const hit = posRef.current >= ZONE_START && posRef.current <= ZONE_END
    setFlash(hit ? 'hit' : 'miss')
    const newHits = hit ? hits + 1 : hits

    setTimeout(() => {
      if (round + 1 >= rounds) {
        setDone(true)
        const needed = difficulty === 'hard' ? rounds : Math.ceil(rounds * 0.6)
        setTimeout(() => onComplete(newHits >= needed), 400)
      } else {
        setHits(newHits)
        setRound(r => r + 1)
      }
    }, 500)

    if (hit) setHits(newHits)
  }

  const needed = difficulty === 'hard' ? rounds : Math.ceil(rounds * 0.6)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">Round {round + 1} of {rounds}</p>
        <p className="text-xs text-gray-400 mt-0.5">Hit {needed}/{rounds} to succeed</p>
      </div>

      {/* Sliding bar */}
      <div className="relative w-72 h-14 rounded-xl overflow-hidden" style={{ background: '#f3f4f6' }}>
        {/* Target zone */}
        <div
          className="absolute top-0 bottom-0 bg-green-200 opacity-70"
          style={{ left: `${ZONE_START}%`, width: `${ZONE_END - ZONE_START}%` }}
        />
        {/* Center line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-green-500 opacity-50" style={{ left: '50%' }} />
        {/* Moving target */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{
            left: `${pos}%`,
            transform: `translateX(-50%) translateY(-50%)`,
            background: flash === 'hit' ? '#34d399' : flash === 'miss' ? '#f87171' : '#6366f1',
            transition: 'background 0.15s',
            boxShadow: flash === 'hit' ? '0 0 12px #34d399' : 'none',
          }}
        >
          {flash === 'hit' ? '✓' : flash === 'miss' ? '✗' : '👋'}
        </div>
      </div>

      <button
        onClick={handleTap}
        disabled={done || !!flash}
        className="w-40 py-4 rounded-2xl text-white font-bold text-lg active:scale-95 transition-transform"
        style={{ background: done ? '#9ca3af' : '#6366f1', cursor: done ? 'default' : 'pointer' }}
      >
        {label}
      </button>

      <div className="flex gap-2">
        {Array.from({ length: rounds }, (_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i < hits ? 'bg-green-400' : i === round && flash === 'miss' ? 'bg-red-400' : 'bg-gray-200'}`} />
        ))}
      </div>
    </div>
  )
}
