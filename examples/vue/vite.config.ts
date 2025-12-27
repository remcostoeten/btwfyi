import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'btwfyi/vue': path.resolve(__dirname, '../../src/vue'),
      'btwfyi': path.resolve(__dirname, '../../src/core'),
    },
  },
})


