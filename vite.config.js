/**
 * Vite configuration for the React client and Sites-compatible worker output.
 */
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const projectDirectory = dirname(fileURLToPath(import.meta.url))

/**
 * Copies the static worker into the final build after Vite emits client assets.
 */
function sitesWorker() {
  return {
    name: 'sites-worker',
    closeBundle() {
      // Hosting expects the worker at this stable server entry point.
      const serverDirectory = resolve(projectDirectory, 'dist/server')
      mkdirSync(serverDirectory, { recursive: true })
      copyFileSync(
        resolve(projectDirectory, 'server/index.js'),
        resolve(serverDirectory, 'index.js'),
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), sitesWorker()],
  server: {
    host: true,
    allowedHosts: true
  }
})
