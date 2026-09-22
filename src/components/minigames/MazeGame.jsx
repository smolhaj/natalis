import { useState, useEffect, useCallback, useRef } from 'react'

const COLS = 9
const ROWS = 11
const START = { r: ROWS - 1, c: 0 }
const EXIT = { r: 0, c: COLS - 1 }

// Slack on top of the shortest route. The budget used to be a flat 35 moves
// against a maze whose shortest path is between 18 and 58 steps depending on
// the seed: 34% of normal mazes and 78% of hard ones could not be finished with
// perfect play, before a single wasted step. Measuring the route and paying for
// it is the only way the number means anything.
const SLACK = { easy: 18, normal: 12, hard: 7 }

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

function shortestPath(walls) {
  const key = (r, c) => `${r},${c}`
  const queue = [[START.r, START.c, 0]]
  const seen = new Set([key(START.r, START.c)])
  while (queue.length) {
    const [r, c, d] = queue.shift()
    if (r === EXIT.r && c === EXIT.c) return d
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr; const nc = c + dc
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue
      if (walls.has(key(nr, nc)) || seen.has(key(nr, nc))) continue
      seen.add(key(nr, nc))
      queue.push([nr, nc, d + 1])
    }
  }
  return Infinity
}

// The maze was built in the render body, so every keypress produced a new one:
// a player pressing up watched the whole layout reshuffle under them. It is
// drawn once, at mount, with the budget derived from its own shortest route.
function newLevel(difficulty) {
  for (let attempt = 0; attempt < 40; attempt++) {
    const walls = buildMaze(42 + Math.floor(Math.random() * 100000))
    const best = shortestPath(walls)
    if (!Number.isFinite(best)) continue
    return { walls, best, budget: best + (SLACK[difficulty] ?? SLACK.normal) }
  }
  const walls = buildMaze(42)
  const best = shortestPath(walls)
  return { walls, best, budget: best + (SLACK[difficulty] ?? SLACK.normal) }
}

export default function MazeGame({ onComplete, difficulty = 'normal' }) {
  const [level] = useState(() => newLevel(difficulty))
  const { walls, budget } = level
  const [pos, setPos] = useState(START)
  const [turns, setTurns] = useState(0)
  const [outcome, setOutcome] = useState(null) // null | 'out' | 'caught'
  const posRef = useRef(START)
  const settled = useRef(false)

  // The move is decided outside any state updater. React invokes updaters twice
  // under StrictMode, so a `setTurns` called from inside `setPos` charged two
  // moves for every one step taken.
  const move = useCallback((dr, dc) => {
    if (settled.current) return
    const nr = posRef.current.r + dr
    const nc = posRef.current.c + dc
    // A step into a wall or off the edge is not a step. It used to cost a move
    // from the budget, so walking into the left edge five times from the
    // starting corner spent five of thirty-five moves on nothing.
    if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return
    if (walls.has(`${nr},${nc}`)) return
    posRef.current = { r: nr, c: nc }
    setPos(posRef.current)
    setTurns(t => t + 1)
  }, [walls])

  // Win and loss are read from state in an effect rather than written from
  // inside a state updater: React invokes updaters twice under StrictMode, and
  // the old code called onComplete from inside one — every result was delivered
  // to the store twice.
  useEffect(() => {
    if (settled.current) return
    if (pos.r === EXIT.r && pos.c === EXIT.c) {
      settled.current = true
      setOutcome('out')
      const t = setTimeout(() => onComplete(true), 800)
      return () => clearTimeout(t)
    }
    if (turns >= budget) {
      settled.current = true
      setOutcome('caught')
      const t = setTimeout(() => onComplete(false), 800)
      return () => clearTimeout(t)
    }
  }, [pos, turns, budget, onComplete])

  useEffect(() => {
    const handler = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const code = e.code
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(code)) return
      e.preventDefault()
      if (code === 'ArrowUp' || code === 'KeyW') move(-1, 0)
      if (code === 'ArrowDown' || code === 'KeyS') move(1, 0)
      if (code === 'ArrowLeft' || code === 'KeyA') move(0, -1)
      if (code === 'ArrowRight' || code === 'KeyD') move(0, 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [move])

  const movesLeft = Math.max(0, budget - turns)

  const arrow = (label, dr, dc, glyph) => (
    <button
      type="button"
      aria-label={label}
      onClick={() => move(dr, dc)}
      disabled={!!outcome}
      className="w-12 h-12 rounded-xl border border-natalis-border text-natalis-dim text-lg
                 flex items-center justify-center hover:border-natalis-accent
                 hover:bg-natalis-accent-soft active:scale-95 transition-all
                 disabled:opacity-40 disabled:hover:border-natalis-border disabled:hover:bg-transparent"
    >
      <span aria-hidden="true">{glyph}</span>
    </button>
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-baseline justify-between w-full max-w-xs">
        <span className="text-natalis-muted text-xs uppercase tracking-wider">Moves left</span>
        <span className={`text-lg tabular-nums ${movesLeft <= 5 ? 'text-natalis-alarm' : 'text-natalis-text'}`}>
          {movesLeft}
        </span>
      </div>

      {/* Maze grid */}
      <div
        role="img"
        aria-label={`Maze. You are at row ${ROWS - pos.r}, column ${pos.c + 1}. The way out is the far top corner.`}
        className="border border-natalis-rule rounded overflow-hidden"
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
                className={`w-7 h-7 flex items-center justify-center
                  ${isWall ? 'bg-natalis-text' : isExit ? 'bg-natalis-accent-soft' : 'bg-natalis-surface'}`}
              >
                {isExit && !isPlayer && (
                  <span className="w-3 h-3 rounded-sm border border-natalis-accent" />
                )}
                {isPlayer && (
                  <span className={`w-3.5 h-3.5 rounded-full ${outcome === 'caught' ? 'bg-natalis-alarm' : 'bg-natalis-accent'}`} />
                )}
              </div>
            )
          })
        )}
      </div>

      <p className="text-natalis-muted text-xs text-center max-w-xs">
        {outcome === 'out'
          ? 'You are through, and out into the street.'
          : outcome === 'caught'
            ? 'You are still inside when they come round the corner.'
            : 'The filled circle is you. The way out is the far corner.'}
      </p>

      {/* Touch controls */}
      <div className="grid grid-cols-3 gap-1">
        <div />
        {arrow('Move up', -1, 0, '↑')}
        <div />
        {arrow('Move left', 0, -1, '←')}
        {arrow('Move down', 1, 0, '↓')}
        {arrow('Move right', 0, 1, '→')}
      </div>

      <p className="text-xs text-natalis-faint">Arrow keys, WASD, or the buttons</p>
    </div>
  )
}
