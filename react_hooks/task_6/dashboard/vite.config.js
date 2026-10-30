import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // The base path is only needed for the GitHub Pages build; in dev the public
  // files are served from the root (localhost:5173/notifications.json).
  base: command === 'build' ? '/holbertonschool-web_react/' : '/',
  plugins: [react(), tailwindcss()],
}))
