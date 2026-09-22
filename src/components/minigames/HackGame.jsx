import { useState, useEffect, useRef } from 'react'

// A sequence is shown once and has to be given back. Used for the breach.

const SYMBOLS = ['A1', 'B2', 'C3', 'D4', 'E5', 'F6', '7G', '8H', '9I', '0J']

// Faint tints from the remapped ramp, purely as a second handle for memory.
// Three of the originals were raw Tailwind defaults (#06b6d4, #84cc16,
// #f97316) which the palette remap in tailwind.config.js cannot reach, because
// they were inline styles.
const TINTS = [
  '#dde1e9', '#f0dee2', '#f0e8d7', '#dde7e0', '#dbe5e7',
  '#f1dfdb', '#e4dee9', '#e0dee9', '#f1ebd4', '#f1e5da',
]

const LEVEL = {
  easy:   { len: 3, rounds: 2, perSymbol: 700 },
  normal: { len: 4, rounds: 2, perSymbol: 560 },
  hard:   { len: 5, rounds: 3, perSymbol: 440 },
}

function genSequence(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * SYMBOLS.length))
}

export default function HackGame({ onComplete, difficulty = 'normal' }) {
  const level = LEVEL[difficulty] ?? LEVEL.normal
  const { rounds } = level
  const needed = Math.ceil(rounds / 2)

  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState('show') // show | input | result | done
  const [sequence, setSequence] = useState(() => genSequence(LEVEL[difficulty]?.len ?? LEVEL.normal.len))
  const [input, setInput] = useState([])
  const inputRef = useRef([])
  const [record, setRecord] = useState([])
  const [lastResult, setLastResult] = useState(null)
  const settled = useRef(false)
  // A round resolves on a timer; if the dialog closes first that timer still
  // fires, and an unmounted game reporting a result lands on whatever is
  // pending next.
  const alive = useRef(true)
  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])

  // The round was started from inside the previous round's setTimeout, so it
  // closed over a stale `round`: the header counted the sequence up while the
  // sequence itself never grew. It is driven from the round now, which is also
  // what makes it survive StrictMode's double mount.
  useEffect(() => {
    if (settled.current) return
    const len = level.len + round
    setSequence(genSequence(len))
    setInput([])
    inputRef.current = []
    setLastResult(null)
    setPhase('show')
    const t = setTimeout(() => setPhase('input'), len * level.perSymbol)
    return () => clearTimeout(t)
  }, [round, level.len, level.perSymbol])

  const submit = (next) => {
    const correct = next.every((v, i) => v === sequence[i])
    const nextRecord = [...record, correct]
    setRecord(nextRecord)
    setLastResult(correct)
    setPhase('result')
    setTimeout(() => {
      if (!alive.current) return
      if (round + 1 >= rounds) {
        if (settled.current) return
        settled.current = true
        setPhase('done')
        setTimeout(() => { if (alive.current) onComplete(nextRecord.filter(Boolean).length >= needed) }, 700)
      } else {
        setRound(r => r + 1)
      }
    }, 900)
  }

  const handlePick = (idx) => {
    if (phase !== 'input') return
    if (inputRef.current.length >= sequence.length) return
    // Read the entered run from a ref, not from state: two presses inside one
    // render both compute from the same stale array and the first is lost,
    // which is easy to do on a keypad and impossible to explain.
    const next = [...inputRef.current, idx]
    inputRef.current = next
    setInput(next)
    if (next.length === sequence.length) submit(next)
  }

  // Ten tabbable buttons is a lot of Tab presses under a memory load. The keys
  // 1–9 and 0 run along the grid in reading order.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (!/^[0-9]$/.test(e.key)) return
      e.preventDefault()
      const idx = e.key === '0' ? 9 : Number(e.key) - 1
      handlePick(idx)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const banner =
    phase === 'show' ? 'Hold this.'
      : phase === 'input' ? 'Give it back.'
        : phase === 'result' ? (lastResult ? 'That was it.' : 'Not that.')
          : record.filter(Boolean).length >= needed ? 'You are in.' : 'Something on the other end notices.'

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-baseline justify-between w-full max-w-xs">
        <span className="text-natalis-muted text-xs uppercase tracking-wider">
          Round {Math.min(round + 1, rounds)} of {rounds}
        </span>
        <span className="text-natalis-faint text-xs">{sequence.length} long</span>
      </div>

      {/* The sequence, then what you have typed back */}
      <div className="w-full max-w-xs min-h-[76px] rounded-xl border border-natalis-border bg-natalis-bg
                      px-3 py-3 flex items-center justify-center gap-1.5 flex-wrap">
        {phase === 'show' && sequence.map((s, i) => (
          <span
            key={i}
            className="w-11 h-11 rounded-lg flex items-center justify-center font-mono text-sm
                       text-natalis-text border border-natalis-rule"
            style={{ background: TINTS[s] }}
          >
            {SYMBOLS[s]}
          </span>
        ))}
        {phase === 'input' && (
          sequence.map((_, i) => (
            <span
              key={i}
              className={`w-11 h-11 rounded-lg flex items-center justify-center font-mono text-sm
                          border ${input[i] === undefined ? 'border-dashed border-natalis-rule text-natalis-faint' : 'border-natalis-rule text-natalis-text'}`}
              style={{ background: input[i] === undefined ? 'transparent' : TINTS[input[i]] }}
            >
              {input[i] === undefined ? '·' : SYMBOLS[input[i]]}
            </span>
          ))
        )}
        {(phase === 'result' || phase === 'done') && (
          <p className={`text-sm ${lastResult === false && phase === 'result' ? 'text-natalis-alarm' : 'text-natalis-dim'}`}>
            {banner}
          </p>
        )}
      </div>

      {(phase === 'show' || phase === 'input') && (
        <p className="text-natalis-muted text-xs">{banner}</p>
      )}

      {/* Keypad */}
      <div className="grid grid-cols-5 gap-2">
        {SYMBOLS.map((sym, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePick(idx)}
            disabled={phase !== 'input'}
            aria-keyshortcuts={idx === 9 ? '0' : String(idx + 1)}
            className="w-[52px] h-[52px] rounded-xl font-mono text-sm text-natalis-text
                       border border-natalis-rule active:scale-95 transition-all
                       disabled:opacity-35 disabled:cursor-default"
            style={{ background: phase === 'input' ? TINTS[idx] : 'transparent' }}
          >
            {sym}
          </button>
        ))}
      </div>

      <p className="text-xs text-natalis-faint">Keys 1–9 and 0, in reading order</p>
    </div>
  )
}
