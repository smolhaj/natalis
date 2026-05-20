import { useGameStore } from '../store/gameStore'

export default function EventBox({ event }) {
  const resolveChoice = useGameStore(s => s.resolveChoice)

  if (!event) return null

  const isAutomatic = !event.choices || event.choices.length === 0

  return (
    <div className="border border-natalis-border bg-natalis-surface p-5 space-y-4">
      {event.context && (
        <div className="text-natalis-muted text-xs italic border-l border-natalis-muted pl-3">
          {event.context}
        </div>
      )}

      <p className="text-natalis-text text-sm leading-relaxed">{event.text}</p>

      {!isAutomatic && (
        <div className="space-y-2 pt-1">
          {event.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => resolveChoice(i)}
              className="
                w-full text-left p-3 border border-natalis-border
                hover:border-natalis-muted hover:bg-natalis-bg
                transition-all duration-150 space-y-1 group
              "
            >
              <p className="text-natalis-text text-sm group-hover:text-white transition-colors">
                {choice.text}
              </p>
              {choice.outcome && (
                <p className="text-natalis-muted text-xs italic">{choice.outcome}</p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
