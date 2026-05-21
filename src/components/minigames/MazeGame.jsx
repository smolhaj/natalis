import { useState, useEffect, useCallback } from 'react'

const COLS = 9
const ROWS = 11
const START = { r: ROWS - 1, c: 0 }
const EXIT = { r: 0, c: COLS - 1 }
const MAX_TURNS = 35

function buildMaze(seed) {
  // Seeded random
  let s = seed
  const rnd = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff }

  const walls = new Set()
  // Recursive backtracker on a 2-cell-step grid
  const visited = new Set()
  const key = (r, c) => `${r},${c}`

  const stack = [{ r: ROWS - 1, c: 0 }]
  visited.add(key(ROWS - 1, 0))

  while (stack.length) {
    const cur = stack[stack.length - 1]
    const dirs = [
      { dr: -2, dc: 0 }, { dr: 2, dc: 0 },
      { dr: 0, dc: -2 }, { dr: 0, dc: 2 },
    ].filter(({ dr, dc }) => {
      const nr = cur.r + dr; const nc = cur.c + dc
      return nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !visited.has(key(nr, nc))
    })

    if (dirs.length === 0) { stack.pop(); continue }

    const { dr, dc } = dirs[Math.floor(rnd() * dirs.length)]
    const wallR = cur.r + dr / 2; const wallC = cur.c + dc / 2
    const nextR = cur.r + dr; const nextC = cur.c + dc
    visited.add(key(nextR, nextC))
    // Remove the wall between cur and next
    walls.add(key(wallR, wallC)) // these are passages, we'll invert

    stack.push({ r: nextR, c: nextC })
  }

  // Build the actual wall set: cells not visited and not passages
  const passable = new Set(visited)
  walls.forEach(k => passable.add(k))
  // Start and exit are always passable
  passable.add(key(ROWS - 1, 0))
  passable.add(key(0, COLS - 1))

  const wallSet = new Set()
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!passable.has(key(r, c))) wallSet.add(key(r, c))
    }
  }
  return wallSet
}

export default function MazeGame({ onComplete, difficulty = 'normal' }) {
  const seed = 42 + Math.floor(Math.random() * 1000)
  const walls = buildMaze(seed)
  const [pos, setPos] = useState(START)
  const [turns, setTurns] = useState(0)
  const [done, setDone] = useState(false)
  const [won, setWon] = useState(false)

  const move = useCallback((dr, dc) => {
    if (done) return
    setPos(prev => {
      const nr = prev.r + dr
      const nc = prev.c + dc
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return prev
      if (walls.has(`${nr},${nc}`)) return prev
      const next = { r: nr, c: nc }

      if (nr === EXIT.r && nc === EXIT.c) {
        setDone(true)
        setWon(true)
        setTimeout(() => onComplete(true), 700)
      }
      return next
    })
    setTurns(t => {
      const nt = t + 1
      if (nt >= MAX_TURNS + (difficulty === 'hard' ? -10 : 0)) {
        setDone(true)
        setTimeout(() => onComplete(false), 700)
      }
      return nt
    })
  }, [done, walls, onComplete, difficulty])

  useEffect(() => {
    const handler = (e) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyA','KeyS','KeyD'].includes(e.code)) {
        e.preventDefault()
        if (e.code === 'ArrowUp' || e.code === 'KeyW') move(-1, 0)
        if (e.code === 'ArrowDown' || e.code === 'KeyS') move(1, 0)
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') move(0, -1)
        if (e.code === 'ArrowRight' || e.code === 'KeyD') move(0, 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [move])

  const maxTurns = MAX_TURNS - (difficulty === 'hard' ? 10 : 0)
  const turnsLeft = maxTurns - turns

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-xs">
        <span className="text-sm font-semibold text-gray-600">Moves left: <span className={turnsLeft <= 8 ? 'text-red-500' : 'text-gray-800'}>{turnsLeft}</span></span>
        <div className="flex gap-1 text-xs">
          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">You 🔵</span>
          <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700">Exit 🟢</span>
        </div>
      </div>

      {/* Maze grid */}
      <div
        className="border-2 border-gray-800 rounded"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: 0 }}
      >
        {Array.from({ length: ROWS }, (_, r) =>
          Array.from({ length: COLS }, (_, c) => {
            const isWall = walls.has(`${r},${c}`)
            const isPlayer = pos.r === r && pos.c === c
            const isExit = r === EXIT.r && c === EXIT.c
            return (
              <div
                key={`${r},${c}`}
                className={`w-8 h-8 flex items-center justify-center text-sm
                  ${isWall ? 'bg-gray-800' : 'bg-gray-50'}
                  ${isExit && !isWall ? 'bg-green-200' : ''}`}
              >
                {isPlayer && !done && '🔵'}
                {isPlayer && done && won && '🎉'}
                {isPlayer && done && !won && '❌'}
                {isExit && !isPlayer && '🟢'}
              </div>
            )
          })
        )}
      </div>

      {/* Touch controls */}
      <div className="grid grid-cols-3 gap-1 mt-1">
        <div />
        <button onClick={() => move(-1, 0)} className="w-12 h-12 rounded-xl bg-gray-800 text-white text-xl flex items-center justify-center active:bg-gray-600">↑</button>
        <div />
        <button onClick={() => move(0, -1)} className="w-12 h-12 rounded-xl bg-gray-800 text-white text-xl flex items-center justify-center active:bg-gray-600">←</button>
        <button onClick={() => move(1, 0)} className="w-12 h-12 rounded-xl bg-gray-800 text-white text-xl flex items-center justify-center active:bg-gray-600">↓</button>
        <button onClick={() => move(0, 1)} className="w-12 h-12 rounded-xl bg-gray-800 text-white text-xl flex items-center justify-center active:bg-gray-600">→</button>
      </div>

      <p className="text-xs text-gray-400">Arrow keys / WASD or tap buttons</p>
    </div>
  )
}
