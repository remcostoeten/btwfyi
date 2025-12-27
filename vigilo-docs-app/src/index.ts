export { defineConfig } from 'fumadocs'

export default defineConfig({
  project: {
    name: 'Vigilo Documentation',
    description: 'Interactive documentation for the Vigilo task awareness overlay',
    logo: 'https://github.com/remcostoeten.png',
    url: 'https://github.com/remcostoeten/btwfyi',
    version: '1.0.0'
  },

  // Import all MDX pages from docs directory
  pages: {
    dir: '../../docs',
    extension: '.mdx'
  },

  // Override theme to match Vigilo's dark theme
  theme: {
    colors: {
      primary: '#3b82f6',     // Vigilo blue
      background: '#18181b',     // Dark background
      foreground: '#e4e4e7',     // Light text
    }
  },

  // Additional Fumadocs pages
  pages: [
    {
      name: 'Getting Started',
      slug: 'getting-started',
      content: 'docs/getting-started.mdx'
    },
    {
      name: 'React Integration',
      slug: 'react-integration',
      content: 'docs/react-integration.mdx'
    },
    {
      name: 'Vue Integration',
      slug: 'vue-integration',
      content: 'docs/vue-integration.mdx'
    },
    {
      name: 'Configuration',
      slug: 'configuration',
      content: 'docs/configuration.mdx'
    },
    {
      name: 'API Reference',
      slug: 'api',
      content: 'docs/api-reference.mdx'
    }
  ]
})