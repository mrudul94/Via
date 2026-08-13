import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CMSProvider } from './context/CMSContext'
import './styles/admin.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CMSProvider>
      <App />
    </CMSProvider>
  </React.StrictMode>
)
