import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/natalis/',
  build: {
    // The whole game used to ship as a single ~10.4 MB / 3.09 MB-gzip chunk, so
    // editing one event's prose changed the content hash and forced every
    // returning player to re-download all of it. Content is split by directory:
    // a fix to one country arc now invalidates only that chunk, and the engine,
    // the UI and the vendor code stay cached across content deploys.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/src/') && id.includes('node_modules')) {
            // `id.includes('react')` is a substring test on a path, and the
            // packages React needs at module-init time do not all have "react"
            // in their names. `scheduler` went to `vendor` while react-dom went
            // to `vendor-react`, and the two chunks import each other — Vite
            // says so, in a warning on a build that exits 0:
            //
            //   Circular chunk: vendor -> vendor-react -> vendor
            //
            // `index` loads `vendor-react` first, react-dom reaches for a
            // scheduler that has not initialised, and the deployed page throws
            // "Cannot read properties of undefined (reading 'useState')" and
            // renders nothing. Every check in this repo passed the whole time.
            // Match the package directory, not the substring.
            if (/node_modules\/(react|react-dom|scheduler|use-sync-external-store)\//.test(id)) return 'vendor-react'
            return 'vendor'
          }
          // Engine and content are one chunk. They were split by directory so a
          // prose fix would invalidate only its own chunk, but content imports
          // engine helpers and the engine imports all content, so the split
          // produced nine circular chunks — the same class of defect that once
          // shipped an empty page. The game now loads behind a static title
          // shell (index.html, src/main.jsx), so first paint no longer waits on
          // it, and correct initialisation order is worth more than a finer
          // cache key.
          if (id.includes('/src/data/') || id.includes('/src/engine/')) return 'game'
          return undefined
        },
      },
    },
  },
  test: {
    environment: 'node',
    globals: true,
    // .jsx so the component tests are picked up; each declares
    // `@vitest-environment jsdom` at the top of the file, because the engine
    // and data tests are far faster in node and there are 264 of them.
    include: ['tests/**/*.test.{js,jsx}'],
    setupFiles: ['tests/setup/seed.js'],
    coverage: {
      provider: 'v8',
      include: ['src/engine/**', 'src/data/**', 'src/store/**'],
    },
  },
})
