import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@remcostoeten/vigilo/vue': path.resolve(__dirname, '../../src/vue'),
      '@remcostoeten/vigilo': path.resolve(__dirname, '../../src/core'),
    },
  },
})


