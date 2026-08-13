import { useState } from 'react'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.')
      return
    }
    setErrorMsg('')
    setLoading(true)
    try {
      await onLogin(email, password)
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>VIA CMS</div>
          <p style={styles.subtitle}>ADMINISTRATOR CONTROL PANEL</p>
        </div>

        {errorMsg && <div style={styles.errorBox}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>ADMIN EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@houseofvia.com"
              style={styles.input}
              required
              autoFocus
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={styles.input}
              required
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'AUTHENTICATING...' : 'ACCESS CMS DASHBOARD'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: '#141414',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '36px 30px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#fff',
  },
  subtitle: {
    fontSize: '11px',
    letterSpacing: '1.5px',
    color: '#888',
    marginTop: '6px',
  },
  errorBox: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    fontSize: '13px',
    padding: '10px 14px',
    borderRadius: '6px',
    marginBottom: '20px',
    lineHeight: '1.4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '1px',
    color: '#aaa',
  },
  input: {
    background: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '6px',
    padding: '12px 14px',
    color: '#fff',
    // 16px keeps iOS Safari from auto-zooming the page on focus
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.2s',
    width: '100%',
  },
  button: {
    marginTop: '10px',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    padding: '14px',
    fontWeight: '700',
    fontSize: '13px',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
}
