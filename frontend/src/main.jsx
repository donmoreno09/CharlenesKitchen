// Entry point — mounts the React app onto the HTML root div.
// All global providers (Router, Auth context) will wrap <App /> here
// as we build them in later phases.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'   // ← Tailwind's base styles will live here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)