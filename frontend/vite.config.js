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
        // This is the Laravel Docker container's address from the HOST machine.
        // The Docker container exposes port 8000 (mapped in docker-compose.yml).
        target: 'http://localhost:8000',

        // changeOrigin: true rewrites the Host header to match the target.
        // Required for some Laravel setups to route the request correctly.
        changeOrigin: true,
      },
    },
  },
})