import { useState } from 'react'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginScreen from './components/sso/LoginScreen'
import AppLauncher from './components/sso/AppLauncher'
import ProfileScreen from './components/sso/ProfileScreen'
import Enterprises from './components/admin/Enterprises'

function AppRoutes() {
  const navigate = useNavigate()
  const [enterprise, setEnterprise] = useState('Esther Fashions')

  return (
    <Routes>
      <Route path="/" element={<LandingPage onLaunchSSO={() => navigate('/login')} onLaunchAdmin={() => navigate('/admin')} />} />
      <Route path="/login" element={<LoginScreen onLogin={() => navigate('/launcher')} />} />
      <Route path="/launcher" element={
        <AppLauncher
          enterprise={enterprise}
          onSwitchEnterprise={setEnterprise}
          onGoToProfile={() => navigate('/profile')}
          onLogout={() => navigate('/login')}
        />
      } />
      <Route path="/profile" element={
        <ProfileScreen
          enterprise={enterprise}
          onSwitchEnterprise={setEnterprise}
          onBack={() => navigate('/launcher')}
          onLogout={() => navigate('/login')}
        />
      } />
      <Route path="/admin" element={<Enterprises onLogout={() => navigate('/login')} />} />
    </Routes>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="h-screen w-full overflow-hidden font-sans">
        <AppRoutes />
      </div>
    </HashRouter>
  )
}