import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginScreen from './components/sso/LoginScreen'
import AppLauncher from './components/sso/AppLauncher'
import ProfileScreen from './components/sso/ProfileScreen'

function AppRoutes() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<LandingPage onLaunchSSO={() => navigate('/login')} />} />
      <Route path="/login" element={<LoginScreen onLogin={() => navigate('/launcher')} />} />
      <Route path="/launcher" element={<AppLauncher onGoToProfile={() => navigate('/profile')} onLogout={() => navigate('/')} />} />
      <Route path="/profile" element={<ProfileScreen onBack={() => navigate('/launcher')} onLogout={() => navigate('/')} />} />
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