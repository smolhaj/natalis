// Six stats, six emoji, six candy colours, and a 2×2 grid of them occupying the
// top third of every screen above the prose. CLAUDE.md: "Stats are numbers. The
// game's primary mechanic is the sentence that lands."
//
// So the word leads and the number follows it, quietly. The bar is one ink at
// varying weight rather than six hues, because the hue was carrying no
// information — health being red told you nothing that the word "Critical" did
// not. Only a genuinely failing body gets colour, because that is the one case
// where the player needs to look now.

const STAT_LABELS = {
  happiness: 'Happiness',
  health:    'Health',
  smarts:    'Smarts',
  looks:     'Looks',
  charisma:  'Charisma',
  wealth:    'Wealth',
}

const STAT_TIERS = {
  happiness: ['Hollow', 'Low', 'Content', 'Warm', 'Joyful'],
  health:    ['Critical', 'Declining', 'Steady', 'Good', 'Robust'],
  smarts:    ['Limited', 'Average', 'Capable', 'Sharp', 'Brilliant'],
  looks:     ['Worn', 'Plain', 'Decent', 'Attractive', 'Striking'],
  charisma:  ['Withdrawn', 'Reserved', 'Warm', 'Charming', 'Magnetic'],
  wealth:    ['Destitute', 'Struggling', 'Getting by', 'Comfortable', 'Wealthy'],
}

/**
 * 0-4, in twenties. Exported because the Stats tab prints a sentence beside
 * each bar and was banding it independently — at 60 the bar said "Attractive"
 * and the caption said "Unremarkable in the best sense". One source of truth.
 */
export function statTier(value) {
  return Math.min(4, Math.max(0, Math.floor(value / 20)))
}

function getTierLabel(stat, value) {
  const tiers = STAT_TIERS[stat]
  if (!tiers) return ''
  return tiers[statTier(value)]
}

export default function StatBar({ stat, label, value, delta }) {
  const pct = Math.round(Math.max(0, Math.min(100, value)))
  const tier = getTierLabel(stat, pct)
  const name = label ?? STAT_LABELS[stat] ?? stat
  // A body below 25 is the one stat state that warrants being looked at now.
  const critical = stat === 'health' && pct < 25

  return (
    <div>
      {/* "HAPPINESS" needed 71px and had 63, so the longest stat label was
          clipped to "HAPPI…" at every width including desktop. Less tracking
          and a tighter gap; `truncate` stays as the backstop rather than the
          mechanism. */}
      <div className="flex items-baseline justify-between gap-1.5 mb-1">
        <span className="text-[11px] font-medium text-natalis-muted uppercase tracking-[0.04em] truncate">
          {name}
        </span>
        <span className="flex items-baseline gap-1.5 flex-shrink-0">
          {tier && (
            <span className={`text-xs ${critical ? 'text-natalis-alarm font-medium' : 'text-natalis-dim'}`}>
              {tier}
            </span>
          )}
          {delta != null && delta !== 0 && (
            <span className={`text-[10px] tabular-nums ${delta > 0 ? 'text-natalis-gain' : 'text-natalis-loss'}`}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
          <span className="text-[10px] tabular-nums text-natalis-faint w-5 text-right">{pct}</span>
        </span>
      </div>
      <div
        className="h-[3px] rounded-full bg-natalis-border overflow-hidden"
        role="meter"
        aria-label={name}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={tier ? `${tier}, ${pct} of 100` : `${pct} of 100`}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: critical ? '#8c3a2e' : '#403b33',
            opacity: critical ? 1 : 0.32 + (pct / 100) * 0.38,
          }}
        />
      </div>
    </div>
  )
}
