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
            if (id.includes('react')) return 'vendor-react'
            return 'vendor'
          }
          if (id.includes('/src/data/events/geographic/')) return 'content-geographic'
          if (id.includes('/src/data/events/sonder/')) return 'content-sonder'
          if (id.includes('/src/data/events/followthrough/')) return 'content-followthrough'
          if (id.includes('/src/data/events/thematic/')) return 'content-thematic'
          if (id.includes('/src/data/events/lifecycle/')) return 'content-lifecycle'
          if (id.includes('/src/data/events/specific_lives/')) return 'content-specific-lives'
          if (id.includes('/src/data/events/')) return 'content-events'
          if (id.includes('/src/data/worldEvents')) return 'content-world'
          if (id.includes('/src/data/countries') || id.includes('/src/data/places')) return 'content-world'
          if (id.includes('/src/engine/yearTexture') || id.includes('/src/engine/mundaneLayer')) return 'engine-texture'
          if (id.includes('/src/engine/')) return 'engine'
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
    coverage: {
      provider: 'v8',
      include: ['src/engine/**', 'src/data/**', 'src/store/**'],
    },
  },
})
