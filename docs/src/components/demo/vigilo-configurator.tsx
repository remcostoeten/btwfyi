'use client'

import { useState, useMemo } from 'react'
import { Vigilo } from '@remcostoeten/vigilo-react'
import type { CategoryConfig, TodoItem } from '@remcostoeten/vigilo-core'

type ConfigState = {
  displayMode: 'full' | 'compact' | 'minimal'
  showLines: boolean
  showBadges: boolean
  taskCount: number
  categoryName: string
}

const defaultConfig: ConfigState = {
  displayMode: 'full',
  showLines: true,
  showBadges: true,
  taskCount: 3,
  categoryName: 'My Tasks',
}

const sampleTasks: TodoItem[] = [
  { text: 'Implement user authentication', action: 'feat', priority: 'high' },
  { text: 'Fix responsive layout issues', action: 'fix', priority: 'medium' },
  { text: 'Add unit tests for API', action: 'test', priority: 'low' },
  { text: 'Update documentation', action: 'docs' },
  { text: 'Optimize database queries', action: 'perf', priority: 'high' },
  { text: 'Review pull requests', action: 'review', priority: 'medium' },
]

export function VigiloConfigurator() {
  const [config, setConfig] = useState<ConfigState>(defaultConfig)

  const categories: CategoryConfig[] = useMemo(() => [
    {
      id: 'configured',
      displayName: config.categoryName,
      items: sampleTasks.slice(0, config.taskCount),
    },
  ], [config.categoryName, config.taskCount])

  const updateConfig = <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <h3 className="mb-4 text-sm font-medium text-zinc-100">Configuration</h3>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Category Name */}
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Category Name</label>
            <input
              type="text"
              value={config.categoryName}
              onChange={(e) => updateConfig('categoryName', e.target.value)}
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-zinc-100"
            />
          </div>

          {/* Task Count */}
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Task Count: {config.taskCount}</label>
            <input
              type="range"
              min="1"
              max="6"
              value={config.taskCount}
              onChange={(e) => updateConfig('taskCount', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Display Mode */}
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Display Mode</label>
            <select
              value={config.displayMode}
              onChange={(e) => updateConfig('displayMode', e.target.value as ConfigState['displayMode'])}
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-zinc-100"
            >
              <option value="full">Full</option>
              <option value="compact">Compact</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={config.showLines}
                onChange={(e) => updateConfig('showLines', e.target.checked)}
                className="rounded"
              />
              Show Lines
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={config.showBadges}
                onChange={(e) => updateConfig('showBadges', e.target.checked)}
                className="rounded"
              />
              Show Badges
            </label>
          </div>
        </div>
      </div>

      {/* Demo Area */}
      <div className="relative min-h-[500px] rounded-lg border border-zinc-800 bg-zinc-950 p-4">
        <div className="mb-4 text-sm text-zinc-400">
          Try connecting tasks to these elements. Changes apply in real-time.
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div id="config-card-1" className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <h3 className="font-medium text-zinc-100">Authentication</h3>
            <p className="text-sm text-zinc-400">User login system</p>
          </div>
          
          <div id="config-card-2" className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <h3 className="font-medium text-zinc-100">Dashboard</h3>
            <p className="text-sm text-zinc-400">Main interface</p>
          </div>
          
          <div id="config-card-3" className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <h3 className="font-medium text-zinc-100">Settings</h3>
            <p className="text-sm text-zinc-400">Configuration panel</p>
          </div>
          
          <button id="config-submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Submit Button
          </button>
          
          <button id="config-cancel" className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800">
            Cancel Button
          </button>
          
          <div id="config-input" className="flex items-center">
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div id="config-sidebar" className="rounded-lg border border-dashed border-zinc-700 p-4">
            <p className="text-xs text-zinc-500">Sidebar Area</p>
          </div>
          <div id="config-content" className="rounded-lg border border-dashed border-zinc-700 p-4">
            <p className="text-xs text-zinc-500">Content Area</p>
          </div>
        </div>
        
        <Vigilo 
          key={`${config.displayMode}-${config.taskCount}-${config.categoryName}`}
          category="configured" 
          categories={categories}
          instanceId="docs-configurator"
        />
      </div>

      {/* Generated Code */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <h3 className="mb-2 text-sm font-medium text-zinc-100">Generated Code</h3>
        <pre className="overflow-x-auto rounded bg-zinc-950 p-3 text-xs text-zinc-300">
{`import { Vigilo } from '@remcostoeten/vigilo-react'

const categories = [
  {
    id: 'configured',
    displayName: '${config.categoryName}',
    items: [
${sampleTasks.slice(0, config.taskCount).map(t => 
  `      { text: '${t.text}', action: '${t.action}'${t.priority ? `, priority: '${t.priority}'` : ''} }`
).join(',\n')}
    ],
  },
]

<Vigilo
  category="configured"
  categories={categories}
/>`}
        </pre>
      </div>
    </div>
  )
}
