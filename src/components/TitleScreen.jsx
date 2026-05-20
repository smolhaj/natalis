import { useGameStore } from '../store/gameStore'

export default function TitleScreen() {
  const goToBirth = useGameStore(s => s.goToBirth)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-natalis-bg px-8">
      <div className="max-w-md text-center space-y-10">
        <div className="space-y-3">
          <h1
            className="text-6xl tracking-[0.25em] uppercase text-natalis-text font-light"
            style={{ letterSpacing: '0.3em' }}
          >
            NATALIS
          </h1>
          <p className="text-natalis-dim text-sm tracking-widest uppercase">
            You don't choose where you begin.
          </p>
        </div>

        <div className="w-12 h-px bg-natalis-muted mx-auto" />

        <p className="text-natalis-dim text-sm leading-relaxed max-w-xs mx-auto">
          A life simulator grounded in the reality of where and who you were born.
          The birth lottery is the first and most consequential event.
        </p>

        <button
          onClick={goToBirth}
          className="
            w-full py-3 border border-natalis-muted text-natalis-text text-sm tracking-widest uppercase
            hover:border-natalis-dim hover:bg-natalis-surface transition-all duration-200
          "
        >
          Begin
        </button>
      </div>
    </div>
  )
}
