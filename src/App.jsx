import { useGameStore } from './store/gameStore'
import TitleScreen from './components/TitleScreen'
import BirthScreen from './components/BirthScreen'
import CuratedBirthScreen from './components/CuratedBirthScreen'
import LifeScreen from './components/LifeScreen'
import DeathScreen from './components/DeathScreen'
import MinigameScreen from './components/MinigameScreen'

export default function App() {
  const screen = useGameStore(s => s.screen)
  const pendingMinigame = useGameStore(s => s.pendingMinigame)

  return (
    <div className="min-h-screen bg-natalis-bg text-natalis-text">
      {screen === 'title' && <TitleScreen />}
      {screen === 'birth' && <BirthScreen />}
      {screen === 'curated_birth' && <CuratedBirthScreen />}
      {screen === 'life' && <LifeScreen />}
      {screen === 'death' && <DeathScreen />}
      {pendingMinigame && <MinigameScreen />}
    </div>
  )
}
