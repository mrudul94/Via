import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ToastProvider } from './context/ToastContext'
import { CartProvider } from './context/CartContext'
import { CMSProvider } from './context/CMSContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CMSProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CMSProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
)
