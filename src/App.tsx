import { useState } from 'react'
import LandingPage from './components/LandingPage'
import LoginScreen from './components/sso/LoginScreen'
import AppLauncher from './components/sso/AppLauncher'
import ProfileScreen from './components/sso/ProfileScreen'

type Screen = 'landing' | 'login' | 'launcher' | 'profile'

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')

  return (
    <div className="h-screen w-full overflow-hidden font-sans">
      {screen === 'landing' && (
        <LandingPage onLaunchSSO={() => setScreen('login')} />
      )}
      {screen === 'login' && (
        <LoginScreen onLogin={() => setScreen('launcher')} />
      )}
      {screen === 'launcher' && (
        <AppLauncher
          onGoToProfile={() => setScreen('profile')}
          onLogout={() => setScreen('landing')}
        />
      )}
      {screen === 'profile' && (
        <ProfileScreen
          onBack={() => setScreen('launcher')}
          onLogout={() => setScreen('landing')}
        />
      )}
    </div>
  )
}