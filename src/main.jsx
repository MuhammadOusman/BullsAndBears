import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Import API test (temporary for development)
import './services/apiTest.js'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <App />
  </BrowserRouter>


)
