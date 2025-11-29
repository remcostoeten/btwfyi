import { useEffect } from 'react'
import { Vigilo, useVigiloInstance } from '@remcostoeten/vigilo/react'
import type { CategoryConfig } from '@remcostoeten/vigilo/react'

const categories: readonly CategoryConfig[] = [
  {
    id: 'development',
    displayName: 'Development Tasks',
    items: [
      {
        text: 'Implement user authentication',
        action: 'FEATURE',
        description: 'Add login and registration functionality with JWT tokens',
        info: 'This feature requires integration with the backend API',
        priority: 'high',
        tags: ['backend', 'auth', 'security'],
      },
      {
        text: 'Add dark mode toggle',
        action: 'ENHANCEMENT',
        description: 'Allow users to switch between light and dark themes',
        info: 'Use CSS variables for theme switching',
        priority: 'medium',
        tags: ['frontend', 'ui'],
      },
      {
        text: 'Write unit tests for API endpoints',
        action: 'TEST',
        description: 'Cover all API endpoints with comprehensive tests',
        info: 'Use Jest and Supertest for testing',
        priority: 'high',
        tags: ['testing', 'backend'],
      },
    ],
  },
  {
    id: 'design',
    displayName: 'Design Tasks',
    items: [
      {
        text: 'Create landing page mockup',
        action: 'DESIGN',
        description: 'Design a modern landing page with hero section',
        info: 'Focus on mobile-first responsive design',
        priority: 'high',
        tags: ['ui', 'design', 'frontend'],
      },
      {
        text: 'Design user dashboard',
        action: 'DESIGN',
        description: 'Create wireframes for the main dashboard',
        info: 'Include data visualization components',
        priority: 'medium',
        tags: ['design', 'dashboard'],
      },
      {
        text: 'Update brand colors',
        action: 'BRAND',
        description: 'Refresh the color palette to match new brand guidelines',
        info: 'Ensure accessibility contrast ratios',
        priority: 'low',
        tags: ['brand', 'design'],
      },
    ],
  },
] as const

function App() {
  // Access both Vigilo instances to add demo connections
  const devInstance = useVigiloInstance({ instanceId: 'development' })
  const designInstance = useVigiloInstance({ instanceId: 'design' })

  // Add demo connections on mount with longer paths
  useEffect(() => {
    // Wait a bit for the DOM to be ready
    const timer = setTimeout(() => {
      // Connect first dev task to feature-1 (top left)
      const feature1 = document.querySelector('#feature-1')
      if (feature1) {
        devInstance.addConnection(0, feature1, 'Feature 1')
      }

      // Connect first design task to feature-4 (bottom right) - this creates a longer connection
      const feature4 = document.querySelector('#feature-4')
      if (feature4) {
        designInstance.addConnection(0, feature4, 'Feature 4')
      }

      // Connect second dev task to feature-2 (top right)
      const feature2 = document.querySelector('#feature-2')
      if (feature2) {
        devInstance.addConnection(1, feature2, 'Feature 2')
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [devInstance, designInstance])

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Vigilo React Example</h1>
          <p className="text-zinc-400">
            A task awareness overlay for development environments
          </p>
          <p className="text-sm text-zinc-500">
            This demo shows two Vigilo instances with connection lines
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            id="feature-1"
            className="p-6 bg-zinc-800 rounded-lg border-2 border-blue-500/50 hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Feature 1</h2>
            <p className="text-zinc-400">
              Connected to Development task #1. Notice the connection line going
              from the top-left overlay to this element.
            </p>
          </div>

          <div
            id="feature-2"
            className="p-6 bg-zinc-800 rounded-lg border-2 border-blue-500/50 hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Feature 2</h2>
            <p className="text-zinc-400">
              Connected to Development task #2. This shows how multiple tasks can
              connect to different elements.
            </p>
          </div>

          <div
            id="feature-3"
            className="p-6 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-purple-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Feature 3</h2>
            <p className="text-zinc-400">
              You can also use freeroam mode by holding Shift while right-clicking
              on a task to create custom connection paths.
            </p>
          </div>

          <div
            id="feature-4"
            className="p-6 bg-zinc-800 rounded-lg border-2 border-purple-500/50 hover:border-purple-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Feature 4</h2>
            <p className="text-zinc-400">
              Connected to Design task #1. This creates a longer connection line
              going from the bottom-right overlay (Design panel) all the way to
              this element, demonstrating how connection lines navigate around
              the page.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-zinc-800 rounded-lg border border-zinc-700">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ul className="space-y-2 text-zinc-400 list-disc list-inside">
            <li>Right-click on a task to connect it to a page element</li>
            <li>Hold Shift while right-clicking for freeroam mode</li>
            <li>Double-click a task to view details</li>
            <li>Click the status indicator to cycle through todo → working → done</li>
            <li>Press 's' to open settings</li>
            <li>Press '/' to search tasks</li>
            <li>Drag the overlay panel to reposition it</li>
          </ul>
        </div>
      </div>

      {/* First Vigilo instance - Development tasks */}
      <Vigilo 
        categories={categories} 
        category="development" 
        enabled={true}
        instanceId="development"
      />
      
      {/* Second Vigilo instance - Design tasks */}
      <Vigilo 
        categories={categories} 
        category="design" 
        enabled={true}
        instanceId="design"
      />
    </div>
  )
}

export default App


