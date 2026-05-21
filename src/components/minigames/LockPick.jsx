import { useState, useEffect, useRef } from 'react'

const NUM_PINS = 5
const TICK_MS = 40

function Pin({ index, onSet, isSet, speed }) {
  const [pos, setPos] = useState(Math.random() * 80)
  const [tension, setTension] = useState(0)
  const dirRef = useRef(1)
  const posRef = useRef(pos)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isSet) return
    intervalRef.current = setInterval(() => {
      posRef.current += dirRef.current * speed
      if (posRef.current >= 100) { posRef.current = 100; dirRef.current = -1 }
      if (posRef.current <= 0) { posRef.current = 0; dirRef.current = 1 }
      setPos(posRef.current)
    }, TICK_MS)
    return () => clearInterval(intervalRef.current)
  }, [isSet, speed])

  // Sweet spot is 70–85
  const inZone = pos >= 70 && pos <= 85
  const handleClick = () => {
    if (isSet) return
    setTension(1)
    setTimeout(() => setTension(0), 200)
    if (inZone) {
      onSet(index)
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative w-10 rounded-lg overflow-hidden cursor-pointer select-none"
        style={{ height: 120, background: isSet ? '#d1fae5' : '#f3f4f6', border: `2px solid ${isSet ? '#34d399' : tension ? '#f87171' : '#d1d5db'}`, transition: 'border-color 0.1s' }}
        onClick={handleClick}
      >
        {/* Sweet spot indicator */}
        <div
          className="absolute w-full"
          style={{ top: `${100 - 85}%`, height: `${85 - 70}%`, background: 'rgba(52,211,153,0.3)' }}
        />
        {/* Pin */}
        <div
          className="absolute w-6 h-6 rounded-full left-1/2 -translate-x-1/2"
          style={{
            bottom: `${pos}%`,
            transform: 'translateX(-50%)',
            background: isSet ? '#34d399' : '#6366f1',
            transition: 'background 0.1s',
            boxShadow: inZone ? '0 0 8px #34d399' : 'none',
          }}
        />
      </div>
      <span className="text-xs text-gray-500">{isSet ? '✓' : `${index + 1}`}</span>
    </div>
  )
}

export default function LockPick({ onComplete, difficulty = 'normal' }) {
  const [set, setSet] = useState(Array(NUM_PINS).fill(false))
  const [attempts, setAttempts] = useState(0)
  const [done, setDone] = useState(false)
  const maxAttempts = difficulty === 'hard' ? 8 : 12

  const speeds = [1.2, 1.8, 1.5, 2.2, 1.0]

  const handleSet = (idx) => {
    if (done) return
    setAttempts(a => {
      const na = a + 1
      if (na >= maxAttempts) {
        setDone(true)
        setTimeout(() => onComplete(false), 600)
      }
      return na
    })
    setSet(prev => {
      const next = [...prev]
      next[idx] = true
      if (next.every(Boolean)) {
        setDone(true)
        setTimeout(() => onComplete(true), 600)
      }
      return next
    })
  }

  const attemptsLeft = maxAttempts - attempts

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-sm text-gray-600">Tap each pin when it hits the <span className="text-green-600 font-semibold">green zone</span></p>
        <p className="text-xs text-gray-400 mt-1">Attempts left: <span className={attemptsLeft <= 3 ? 'text-red-500 font-bold' : 'text-gray-600'}>{attemptsLeft}</span></p>
      </div>

      <div className="flex gap-4 items-end">
        {Array.from({ length: NUM_PINS }, (_, i) => (
          <Pin
            key={i}
            index={i}
            isSet={set[i]}
            speed={speeds[i]}
            onSet={handleSet}
          />
        ))}
      </div>

      <div className="text-xs text-center text-gray-400">
        {set.filter(Boolean).length}/{NUM_PINS} pins set
      </div>

      {done && (
        <div className={`text-lg font-bold ${set.every(Boolean) ? 'text-green-600' : 'text-red-500'}`}>
          {set.every(Boolean) ? '🔓 Lock picked!' : '🔒 Lock held'}
        </div>
      )}
    </div>
  )
}
