import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/61n35y5-seashellocean/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})