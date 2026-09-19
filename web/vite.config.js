import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// A relative base means the same build works at a domain root
// (findmejob.xyz) and under a project path (souvikns.github.io/findmejob)
// without rebuilding. Hosting is still undecided; this keeps both open.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 4004,
    host: '0.0.0.0',
    allowedHosts: ['www.findmejob.xyz', 'findmejob.xyz']
  }
})
