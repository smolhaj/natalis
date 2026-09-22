import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

// Choice buttons used to be hardcoded gradients by index: blue for the first
// option, green for the second, orange for the third. Green reads as the right
// answer and orange as the risky one, so the interface was telling the player
// which choice to make — in a game whose entire premise is that there isn't a
// right one, and whose choices are things like "Push to go" against
// "Stay — this is your home". Every option now looks identical. The only
// signal is the sentence.

const KIND = {
  world:  { label: 'The world', rule: 'border-natalis-accent' },
  key:    { label: 'A turning point', rule: 'border-natalis-text' },
  letter: { label: 'A letter', rule: 'border-bit-orange' },
  auto:   { label: null, rule: 'border-natalis-rule' },
  choice: { label: null, rule: 'border-natalis-rule' },
}

export default function EventBox({ event }) {
  const resolveChoice = useGameStore(s => s.resolveChoice)
  const resolveAutoEvent = useGameStore(s => s.resolveAutoEvent)
  const [contextOpen, setContextOpen] = useState(false)

  if (!event) return null

  const isAutomatic = event.isAutomatic === true
  // isKey marks narrative weight, not a decision — it was labelling a toddler's
  // first steps "A turning point" above a single button reading "Toddle
  // forward". A turning point needs something to turn on.
  const isRealChoice = !isAutomatic && (event.choices?.length ?? 0) > 1
  const kind = event.isWorld ? KIND.world
    : event.isLetter ? KIND.letter
    : (event.isKey && isRealChoice) ? KIND.key
    : isAutomatic ? KIND.auto
    : KIND.choice

  return (
    <article className={`bg-natalis-surface rounded-2xl shadow-card border border-natalis-border border-l-2 ${kind.rule} overflow-hidden`}>
      <div className="px-5 pt-5 pb-4 space-y-4">
        {kind.label && (
          <p className="text-natalis-muted text-[11px] font-medium uppercase tracking-[0.14em]">
            {kind.label}
          </p>
        )}

        {/* The largest type on the screen, because it is the thing being read. */}
        <p className={`font-prose text-natalis-text ${event.isLetter ? 'italic' : ''} text-prose-lg`}>
          {event.text}
        </p>

        {event.context && (
          <div className="pt-1">
            <button
              onClick={() => setContextOpen(o => !o)}
              aria-expanded={contextOpen}
              className="flex items-center gap-1.5 text-[11px] font-medium text-natalis-accent uppercase tracking-[0.12em] hover:underline"
            >
              <span aria-hidden="true" className="text-[9px]">{contextOpen ? '▾' : '▸'}</span>
              What was happening
            </button>
            {contextOpen && (
              <p className="mt-2 pl-3 border-l border-natalis-rule font-prose text-natalis-dim text-sm leading-relaxed">
                {event.context}
              </p>
            )}
          </div>
        )}

        {isAutomatic ? (
          <button
            onClick={resolveAutoEvent}
            className="w-full px-4 py-3 rounded-xl text-sm font-medium border border-natalis-border
                       text-natalis-dim bg-natalis-bg hover:bg-natalis-accent-soft
                       transition-colors duration-150 active:scale-[0.99]"
          >
            Go on
          </button>
        ) : (
          <div className="space-y-2">
            {isRealChoice && (
              <p className="text-natalis-muted text-[11px] font-medium uppercase tracking-[0.14em]">
                What do you do
              </p>
            )}
            {event.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => resolveChoice(i)}
                className="w-full text-left px-4 py-3 rounded-xl border border-natalis-rule
                           bg-natalis-raised text-natalis-text font-prose text-[0.9375rem] leading-snug
                           hover:border-natalis-accent hover:bg-natalis-accent-soft
                           transition-colors duration-150 active:scale-[0.99]"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
