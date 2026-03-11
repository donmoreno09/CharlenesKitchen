// Vite's config file. Plugins extend Vite's build pipeline.
// The Tailwind plugin processes your CSS and injects the utility classes.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // Adds Tailwind to the build pipeline
  ],
})