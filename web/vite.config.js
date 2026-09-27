import {resolve} from 'node:path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// A relative base means the same build works at a domain root
// (findmejob.xyz) and under a project path (souvikns.github.io/findmejob)
// without rebuilding. Hosting is still undecided; this keeps both open.
export default defineConfig({
  base: './',
  plugins: [react()],
  // Two pages, two HTML entry points. Real URLs rather than client-side
  // routing: the site deploys static, and /download.html resolves the same
  // at a domain root and under a project path with no server rewrites.
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        download: resolve(import.meta.dirname, 'download.html')
      }
    }
  },
  server: {
    port: 4004,
    host: '0.0.0.0',
    allowedHosts: ['www.findmejob.xyz', 'findmejob.xyz']
  }
})
