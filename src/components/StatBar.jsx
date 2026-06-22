const STAT_CONFIG = {
  happiness: { emoji: '😊', color: '#ffcc00', bg: '#fff9e6', label: 'Happiness' },
  health:    { emoji: '❤️',  color: '#ff3b30', bg: '#fff0ef', label: 'Health' },
  smarts:    { emoji: '🧠', color: '#007aff', bg: '#e8f2ff', label: 'Smarts' },
  looks:     { emoji: '✨', color: '#af52de', bg: '#f5eeff', label: 'Looks' },
  charisma:  { emoji: '💬', color: '#34c759', bg: '#e9faf0', label: 'Charisma' },
  wealth:    { emoji: '💰', color: '#ff9500', bg: '#fff4e6', label: 'Wealth' },
}

const STAT_TIERS = {
  happiness: ['Hollow', 'Low', 'Content', 'Warm', 'Joyful'],
  health:    ['Critical', 'Declining', 'Steady', 'Good', 'Robust'],
  smarts:    ['Limited', 'Average', 'Capable', 'Sharp', 'Brilliant'],
  looks:     ['Worn', 'Plain', 'Decent', 'Attractive', 'Striking'],
  charisma:  ['Withdrawn', 'Reserved', 'Warm', 'Charming', 'Magnetic'],
  wealth:    ['Destitute', 'Struggling', 'Getting by', 'Comfortable', 'Wealthy'],
}

function getTierLabel(stat, value) {
  const tiers = STAT_TIERS[stat]
  if (!tiers) return ''
  return tiers[Math.min(4, Math.floor(value / 20))]
}

export default function StatBar({ stat, label, value }) {
  const cfg = STAT_CONFIG[stat] ?? STAT_CONFIG.health
  const pct = Math.round(Math.max(0, Math.min(100, value)))
  const tier = getTierLabel(stat, pct)

  return (
    <div className="flex items-center gap-2">
      <span className="text-base w-6 text-center flex-shrink-0">{cfg.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-natalis-dim">{label ?? cfg.label}</span>
          <div className="flex items-center gap-1.5">
            {tier && <span className="text-[10px] italic text-natalis-muted">{tier}</span>}
            <span className="text-xs font-bold" style={{ color: cfg.color }}>{pct}</span>
          </div>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: cfg.bg }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: cfg.color }}
          />
        </div>
      </div>
    </div>
  )
}
