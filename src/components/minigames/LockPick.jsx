import { useState, useEffect, useRef } from 'react'

const NUM_PINS = 5
const TICK_MS = 40
const ZONE_TOP = 85

// Base travel per tick, per pin, so the five are never in phase. Scaled by
// difficulty — which previously changed nothing a player could feel.
const BASE_SPEEDS = [1.1, 1.6, 1.35, 1.9, 0.95]

const LEVEL = {
  easy:   { speed: 0.70, zone: 20, attempts: 14 },
  normal: { speed: 1.00, zone: 15, attempts: 10 },
  hard:   { speed: 1.25, zone: 13, attempts: 8 },
}

function Pin({ index, onAttempt, isSet, speed, zone, disabled }) {
  const [pos, setPos] = useState(() => Math.random() * 80)
  const [nudged, setNudged] = useState(false)
  const dirRef = useRef(1)
  const posRef = useRef(pos)

  useEffect(() => {
    if (isSet || disabled) return
    const id = setInterval(() => {
      posRef.current += dirRef.current * speed
      if (posRef.current >= 100) { posRef.current = 100; dirRef.current = -1 }
      if (posRef.current <= 0) { posRef.current = 0; dirRef.current = 1 }
      setPos(posRef.current)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [isSet, speed, disabled])

  const zoneBottom = ZONE_TOP - zone
  const inZone = pos >= zoneBottom && pos <= ZONE_TOP

  const tryIt = () => {
    if (isSet || disabled) return
    setNudged(true)
    setTimeout(() => setNudged(false), 180)
    // The attempt is reported whether or not it lands. It used to be reported
    // only on a hit, so the attempt counter could never reach its own limit and
    // the lock could not be failed: a bot clicking blind opened it every time,
    // at every difficulty, in about three seconds.
    onAttempt(index, inZone)
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        id={`lockpick-pin-${index}`}
        onClick={tryIt}
        disabled={isSet || disabled}
        aria-label={isSet ? `Pin ${index + 1}, set` : `Set pin ${index + 1}`}
        className="relative w-10 rounded-lg overflow-hidden select-none disabled:cursor-default
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-natalis-accent"
        style={{
          height: 120,
          background: isSet ? '#eceef2' : '#f0ede7',
          border: `1px solid ${isSet ? '#3f5670' : nudged ? '#8c3a2e' : '#d6d0c2'}`,
          transition: 'border-color 0.12s',
        }}
      >
        {/* The shear line, drawn as a band with a rule at each edge. The pin
            marker is centred on its own position, so what the eye reads as "in
            the band" is what the press tests. */}
        <span
          className="absolute left-0 w-full"
          style={{ bottom: `${zoneBottom}%`, height: `${zone}%`, background: 'rgba(63,86,112,0.16)' }}
        />
        <span className="absolute left-0 w-full" style={{ bottom: `${zoneBottom}%`, height: 1, background: '#a9a297' }} />
        <span className="absolute left-0 w-full" style={{ bottom: `${ZONE_TOP}%`, height: 1, background: '#a9a297' }} />
        <span
          className="absolute w-6 h-1.5 rounded-sm left-1/2"
          style={{
            bottom: `calc(${pos}% - 3px)`,
            transform: 'translateX(-50%)',
            background: isSet ? '#3f5670' : inZone ? '#403b33' : '#7d766a',
          }}
        />
      </button>
      <span className={`text-xs tabular-nums ${isSet ? 'text-natalis-accent' : 'text-natalis-faint'}`}>
        {isSet ? '—' : index + 1}
      </span>
    </div>
  )
}

export default function LockPick({ onComplete, difficulty = 'normal' }) {
  const level = LEVEL[difficulty] ?? LEVEL.normal
  const [set, setSet] = useState(() => Array(NUM_PINS).fill(false))
  const [attempts, setAttempts] = useState(0)
  const [outcome, setOutcome] = useState(null) // null | 'open' | 'held'
  const settled = useRef(false)

  const handleAttempt = (idx, hit) => {
    if (settled.current) return
    setAttempts(a => a + 1)
    if (hit) setSet(prev => prev.map((v, i) => (i === idx ? true : v)))
  }

  useEffect(() => {
    if (settled.current) return
    if (set.every(Boolean)) {
      settled.current = true
      setOutcome('open')
      const t = setTimeout(() => onComplete(true), 700)
      return () => clearTimeout(t)
    }
    if (attempts >= level.attempts) {
      settled.current = true
      setOutcome('held')
      const t = setTimeout(() => onComplete(false), 700)
      return () => clearTimeout(t)
    }
  }, [set, attempts, level.attempts, onComplete])

  // Number keys, because the pins were plain divs carrying an onClick: the only
  // thing a keyboard could reach inside this dialog was the skip link, and
  // skipping counts as failure.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const n = Number(e.key)
      if (!Number.isInteger(n) || n < 1 || n > NUM_PINS) return
      e.preventDefault()
      document.getElementById(`lockpick-pin-${n - 1}`)?.click()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const attemptsLeft = Math.max(0, level.attempts - attempts)
  const pinsSet = set.filter(Boolean).length

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-baseline justify-between w-full max-w-xs">
        <span className="text-natalis-muted text-xs uppercase tracking-wider">Tries left</span>
        <span className={`text-lg tabular-nums ${attemptsLeft <= 2 ? 'text-natalis-alarm' : 'text-natalis-text'}`}>
          {attemptsLeft}
        </span>
      </div>

      <div className="flex gap-3 items-end">
        {Array.from({ length: NUM_PINS }, (_, i) => (
          <Pin
            key={i}
            index={i}
            isSet={set[i]}
            speed={BASE_SPEEDS[i] * level.speed}
            zone={level.zone}
            disabled={!!outcome}
            onAttempt={handleAttempt}
          />
        ))}
      </div>

      <p className="text-natalis-muted text-xs text-center max-w-xs">
        {outcome === 'open'
          ? 'The last pin gives and the cylinder turns.'
          : outcome === 'held'
            ? 'The lock holds. You have been at it long enough.'
            : `Press a pin as it crosses the shear line. ${pinsSet} of ${NUM_PINS} set.`}
      </p>

      <p className="text-xs text-natalis-faint">Keys 1–5, or press a pin</p>
    </div>
  )
}
