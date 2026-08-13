import { createContext, useContext, useState, useRef, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  const toast = useCallback((msg) => {
    setMessage(msg)
    setVisible(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setVisible(false), 2200)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`via-toast${visible ? ' is-visible' : ''}`}>{message}</div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
