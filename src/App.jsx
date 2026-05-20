import { useGameStore } from './store/gameStore'
import TitleScreen from './components/TitleScreen'
import BirthScreen from './components/BirthScreen'
import LifeScreen from './components/LifeScreen'
import DeathScreen from './components/DeathScreen'

export default function App() {
  const screen = useGameStore(s => s.screen)

  return (
    <div className="min-h-screen bg-natalis-bg text-natalis-text">
      {screen === 'title' && <TitleScreen />}
      {screen === 'birth' && <BirthScreen />}
      {screen === 'life' && <LifeScreen />}
      {screen === 'death' && <DeathScreen />}
    </div>
  )
}
