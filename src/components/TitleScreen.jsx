import { useGameStore } from '../store/gameStore'

export default function TitleScreen() {
  const goToBirth = useGameStore(s => s.goToBirth)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-natalis-bg px-6">
      <div className="w-full max-w-sm text-center space-y-8">

        {/* Logo area */}
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-3xl mx-auto flex items-center justify-center shadow-card-lg"
            style={{ background: 'linear-gradient(135deg, #007aff, #af52de)' }}>
            <span className="text-5xl">🌱</span>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-natalis-text tracking-tight">Natalis</h1>
            <p className="text-natalis-muted text-sm font-medium">A Life Simulator</p>
          </div>
        </div>

        {/* Tagline card */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-natalis-border space-y-2">
          <p className="text-natalis-text text-sm font-medium leading-relaxed">
            You don't choose where you begin.
          </p>
          <p className="text-natalis-muted text-xs leading-relaxed">
            Make choices. Build a life. See how it turns out.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['50+ Countries', '59 Careers', '40+ Ribbons', 'Real History'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-natalis-dim border border-natalis-border shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={goToBirth}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-card-lg transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #007aff, #0055cc)' }}
        >
          Start a New Life
        </button>

        <p className="text-natalis-muted text-xs">
          Your choices shape everything.
        </p>
      </div>
    </div>
  )
}
