// src/main.jsx
// This is the entry point — the file that mounts React onto the HTML page.
// document.getElementById('root') finds the <div id="root"> in index.html.
// React takes over that div and manages everything inside it.
// StrictMode is a development helper — it intentionally runs effects twice
// to help you spot bugs. It has no effect in production builds.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)