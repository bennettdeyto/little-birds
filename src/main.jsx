import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/intel-one-mono/300.css'
import '@fontsource/intel-one-mono/400.css'
import '@fontsource/intel-one-mono/300-italic.css'
import '@fontsource/intel-one-mono/400-italic.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
