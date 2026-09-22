import { useState, useEffect, useRef } from 'react'

// Generic quick-time event: a marker sweeps across and the player acts at the
// right moment. Used for pickpocketing, hot-wiring, a hand that has to be fast.

const ZONE_START = 38
const ZONE_END = 62
const TICK_MS = 30

const LEVEL = {
  easy:   { speed: 1.2, share: 0.34 },
  normal: { speed: 1.7, share: 0.60 },
  hard:   { speed: 2.0, share: 1.00 },
}

export default function QuickTime({ onComplete, difficulty = 'normal', label = 'Now', rounds = 3 }) {
  const level = LEVEL[difficulty] ?? LEVEL.normal
  const needed = Math.max(1, Math.ceil(rounds * level.share))

  const [round, setRound] = useState(0)
  const [record, setRecord] = useState([])   // one entry per round played: true if taken
  const [pos, setPos] = useState(0)
  const [flash, setFlash] = useState(null) // 'hit' | 'miss'
  const [done, setDone] = useState(false)
  const posRef = useRef(0)
  const dirRef = useRef(1)
  const interval = useRef(null)
  const settled = useRef(false)
  // A round resolves on a timer; if the dialog closes first that timer still
  // fires, and an unmounted game reporting a result lands on whatever is
  // pending next.
  const alive = useRef(true)
  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])

  useEffect(() => {
    if (done) return
    posRef.current = 0
    dirRef.current = 1
    setPos(0)
    setFlash(null)
    interval.current = setInterval(() => {
      posRef.current += dirRef.current * level.speed
      if (posRef.current >= 100) { posRef.current = 100; dirRef.current = -1 }
      if (posRef.current <= 0) { posRef.current = 0; dirRef.current = 1 }
      setPos(posRef.current)
    }, TICK_MS)
    return () => clearInterval(interval.current)
  }, [round, done, level.speed])

  const handleTap = () => {
    if (done || flash || settled.current) return
    clearInterval(interval.current)
    const hit = posRef.current >= ZONE_START && posRef.current <= ZONE_END
    setFlash(hit ? 'hit' : 'miss')
    const nextRecord = [...record, hit]
    const newHits = nextRecord.filter(Boolean).length
    setRecord(nextRecord)

    setTimeout(() => {
      if (!alive.current) return
      if (round + 1 >= rounds) {
        setDone(true)
        if (settled.current) return
        settled.current = true
        setTimeout(() => { if (alive.current) onComplete(newHits >= needed) }, 500)
      } else {
        setRound(r => r + 1)
      }
    }, 550)
  }

  // The panel takes focus when the dialog opens, so without this the player has
  // to Tab to the button before the first round is playable — which costs them
  // the round.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== ' ' && e.key !== 'Enter') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      e.preventDefault()
      handleTap()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-baseline justify-between w-full max-w-xs">
        <span className="text-natalis-muted text-xs uppercase tracking-wider">
          Round {Math.min(round + 1, rounds)} of {rounds}
        </span>
        <span className="text-natalis-faint text-xs">{needed} of {rounds} needed</span>
      </div>

      {/* The sweep */}
      <div className="relative w-64 h-14 rounded-xl overflow-hidden border border-natalis-border bg-natalis-bg">
        <div
          className="absolute top-0 bottom-0 border-x border-natalis-accent"
          style={{ left: `${ZONE_START}%`, width: `${ZONE_END - ZONE_START}%`, background: 'rgba(63,86,112,0.13)' }}
        />
        <div
          className="absolute top-1.5 bottom-1.5 w-1 rounded-full"
          style={{
            left: `${pos}%`,
            transform: 'translateX(-50%)',
            background: flash === 'miss' ? '#8c3a2e' : flash === 'hit' ? '#3f5670' : '#403b33',
          }}
        />
      </div>

      <p className="h-4 text-xs text-natalis-muted">
        {flash === 'hit' ? 'Clean.' : flash === 'miss' ? 'Too early, or too late.' : '\u00a0'}
      </p>

      <button
        type="button"
        onClick={handleTap}
        disabled={done || !!flash}
        className="w-40 py-3.5 rounded-xl border border-natalis-accent text-natalis-accent
                   hover:bg-natalis-accent-soft active:scale-95 transition-all
                   disabled:opacity-40 disabled:hover:bg-transparent"
      >
        {label}
      </button>

      {/* Round record: filled for a round taken, hollow for one missed. */}
      <div className="flex gap-2" aria-label={`${record.filter(Boolean).length} of ${rounds} taken`}>
        {Array.from({ length: rounds }, (_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full border ${
              record[i] === true ? 'bg-natalis-accent border-natalis-accent'
                : record[i] === false ? 'border-natalis-alarm' : 'border-natalis-border'
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-natalis-faint">Space, Enter, or press the button</p>
    </div>
  )
}
