import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

export default function EventBox({ event }) {
  const resolveChoice = useGameStore(s => s.resolveChoice)
  const resolveAutoEvent = useGameStore(s => s.resolveAutoEvent)
  const [contextOpen, setContextOpen] = useState(false)

  if (!event) return null

  const isAutomatic = event.isAutomatic === true

  return (
    <div className="bg-white rounded-2xl shadow-card-lg overflow-hidden border border-natalis-border">
      {/* Event header band — heavier treatment for significant choice events */}
      <div className="px-5 py-3" style={{
        background: isAutomatic
          ? '#6b7280'
          : event.isWorld
            ? '#1d4ed8'
            : event.isKey
              ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
              : '#007aff',
      }}>
        <p className="text-white text-xs font-semibold uppercase tracking-widest opacity-80">
          {event.isWorld ? '🌍 World Event' : isAutomatic ? '· Life' : event.isKey ? '◆ Life — Choose carefully' : '📖 Life Event'}
        </p>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-natalis-text text-base font-medium leading-relaxed">
          {event.text}
        </p>

        {event.context && (
          <div className="border-l-2 border-bit-blue pl-3">
            <button
              onClick={() => setContextOpen(o => !o)}
              className="flex items-center gap-1.5 text-xs font-semibold text-bit-blue tracking-wide uppercase"
            >
              <span>{contextOpen ? '▾' : '▸'}</span>
              Historical context
            </button>
            {contextOpen && (
              <p className="mt-2 text-natalis-muted text-xs leading-relaxed italic">
                {event.context}
              </p>
            )}
          </div>
        )}

        {isAutomatic ? (
          <div className="pt-1">
            <button
              onClick={resolveAutoEvent}
              className="w-full text-center px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 border border-natalis-border text-natalis-muted hover:bg-natalis-bg"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="space-y-2 pt-1">
            <p className="text-natalis-muted text-xs font-semibold uppercase tracking-wider">What will you do?</p>
            {event.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => resolveChoice(i)}
                className="w-full text-center px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-150 active:scale-95"
                style={{
                  background: i === 0
                    ? 'linear-gradient(135deg, #007aff, #0055cc)'
                    : i === 1
                    ? 'linear-gradient(135deg, #34c759, #28a046)'
                    : 'linear-gradient(135deg, #ff9500, #e07800)',
                }}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
