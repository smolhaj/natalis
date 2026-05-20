const COLORS = {
  health: { low: '#f87171', mid: '#fb923c', high: '#4ade80' },
  mental: { low: '#f87171', mid: '#c084fc', high: '#818cf8' },
  wealth: { low: '#94a3b8', mid: '#facc15', high: '#4ade80' },
  education: { low: '#94a3b8', mid: '#38bdf8', high: '#818cf8' },
  social: { low: '#94a3b8', mid: '#fb923c', high: '#4ade80' },
}

function getColor(stat, value) {
  const c = COLORS[stat] ?? COLORS.health
  if (value < 30) return c.low
  if (value < 65) return c.mid
  return c.high
}

export default function StatBar({ stat, label, value }) {
  const color = getColor(stat, value)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-natalis-dim uppercase tracking-wider">{label}</span>
        <span className="text-natalis-dim">{Math.round(value)}</span>
      </div>
      <div className="h-1.5 bg-natalis-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
