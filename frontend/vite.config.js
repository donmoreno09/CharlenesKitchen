// Vite's config file. Plugins extend Vite's build pipeline.
// The Tailwind plugin processes your CSS and injects the utility classes.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      // Any request starting with /api is forwarded to Laravel.
      '/api': {
        // Read from .env — falls back to 8080 if not set.
        // process.env is available in vite.config.js (Node.js context).
        // Note: use process.env here, NOT import.meta.env —
        // import.meta.env is only available inside your React components.
        target: process.env.VITE_API_TARGET || 'http://localhost:8080',

        // changeOrigin: true rewrites the Host header to match the target.
        // Required for some Laravel setups to route the request correctly.
        changeOrigin: true,
      },
    },
  },
})