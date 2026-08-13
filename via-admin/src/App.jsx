import { useState, useEffect } from 'react'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import { authService } from './services/authService'
import { isSupabaseConfigured } from './lib/supabaseClient'

export default function App() {
  const [authSession, setAuthSession] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // If Supabase is not configured yet (e.g. initial local dev before .env set), allow access to prototype
    if (!isSupabaseConfigured()) {
      setCheckingAuth(false)
      return
    }

    // Check existing auth session
    authService.getCurrentSession().then((sessionData) => {
      setAuthSession(sessionData)
      setCheckingAuth(false)
    })

    // Subscribe to auth state updates
    const unsubscribe = authService.onAuthStateChange(async (event, session) => {
      if (session) {
        const sessionData = await authService.getCurrentSession()
        setAuthSession(sessionData)
      } else {
        setAuthSession(null)
      }
      setCheckingAuth(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async (email, password) => {
    const sessionData = await authService.login(email, password)
    setAuthSession(sessionData)
  }

  const handleLogout = async () => {
    await authService.logout()
    setAuthSession(null)
  }

  if (checkingAuth) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner}></div>
        <p style={{ marginTop: '16px', color: '#888', fontSize: '13px', letterSpacing: '1px' }}>
          VERIFYING VIA CMS AUTHENTICATION...
        </p>
      </div>
    )
  }

  // Require Auth if Supabase is configured
  if (isSupabaseConfigured() && !authSession) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard adminSession={authSession} onLogout={handleLogout} />
}

const styles = {
  loadingScreen: {
    minHeight: '100vh',
    background: '#0a0a0a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid rgba(255,255,255,0.1)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
}
