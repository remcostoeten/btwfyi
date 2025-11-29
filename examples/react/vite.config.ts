import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@remcostoeten/vigilo/react': path.resolve(__dirname, '../../src/react'),
      '@remcostoeten/vigilo': path.resolve(__dirname, '../../src/core'),
    },
  },
})


