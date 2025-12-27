import { defineConfig } from 'fumadocs'

export default defineConfig({
  project: {
    name: 'Vigilo',
    description: 'A lightweight task awareness overlay for development environments',
    logo: 'https://github.com/remcostoeten.png', // You can replace with your logo
    url: 'https://github.com/remcostoeten/btwfyi',
    version: '0.0.13'
  },

  theme: {
    colors: {
      primary: '#3b82f6', // Blue from your brand
      background: '#18181b'  // Dark background
      foreground: '#e4e4e7', // Light text
    }
  },

  // API documentation from your code
  api: {
    patterns: ['src/**/*.ts', 'src/**/*.tsx'],
    exclude: ['**/*.test.*', '**/*.spec.*'],
    outputDir: 'docs/api'
  },

  // Guide pages for interactive docs
  pages: {
    dir: 'docs',
    extension: '.mdx'
  }
})