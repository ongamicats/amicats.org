import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'

import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  ssr: {
    // Some tooling (jiti, lilconfig, etc.) is used during build-time and
    // must remain as external Node modules so Rollup doesn't try to bundle
    // Node builtin helpers (createRequire) for the browser. Externalizing
    // `jiti` avoids the "createRequire is not exported" rollup error.
    external: ['jiti'],
  },
  build: {
    rollupOptions: {
      // Ensure rollup treats jiti and its internal paths as external to
      // avoid bundling node-only helpers into client/server bundles.
      external: ['jiti', 'jiti/*', 'jiti/**'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact({
      babel: {
        // Use the official Lingui babel plugin (v6) by name so resolution
        // works in all environments instead of a brittle hard-coded path.
        plugins: ['@lingui/babel-plugin-lingui-macro', 'babel-plugin-react-compiler'],
      },
    }),
    // Note: we don't add @lingui/vite-plugin here to avoid pulling
    // Node-only Lingui config code into the browser bundle during build.
    // The app imports compiled catalogs (src/locales/*/messages.json)
    // directly, which is sufficient for runtime.
  ],
})

export default config
