import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

const srcDir = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts', 'src/test/setupNodeGlobals.ts'],
    globals: true,
    alias: {
      '@': srcDir,
    },
    deps: { inline: ['@tanstack/react-router'] },
  },
  plugins: [tsconfigPaths()],
})
