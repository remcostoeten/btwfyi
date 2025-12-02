'use client'

import { Vigilo } from '@remcostoeten/vigilo-react'
import type { CategoryConfig } from '@remcostoeten/vigilo-core'

const defaultCategories: CategoryConfig[] = [
  {
    id: 'demo',
    displayName: 'Demo Tasks',
    items: [
      { text: 'Click the dot to connect to an element', action: 'tip', priority: 'high' },
      { text: 'Drag the panel to reposition', action: 'tip', priority: 'medium' },
      { text: 'Hold Shift for freeroam mode', action: 'tip', priority: 'low' },
      { text: 'Press Alt+K for command palette', action: 'tip' },
    ],
  },
]

export function VigiloDemo() {
  return (
    <div className="relative min-h-[400px] rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-4 text-sm text-zinc-400">
        Interactive demo - try connecting tasks to the elements below
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div id="demo-card-1" className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <h3 className="font-medium text-zinc-100">Card One</h3>
          <p className="text-sm text-zinc-400">Connect a task to this card</p>
        </div>
        
        <div id="demo-card-2" className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <h3 className="font-medium text-zinc-100">Card Two</h3>
          <p className="text-sm text-zinc-400">Or connect to this one</p>
        </div>
        
        <button id="demo-button" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Demo Button
        </button>
        
        <div id="demo-input" className="flex items-center">
          <input 
            type="text" 
            placeholder="Demo input field"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500"
          />
        </div>
      </div>
      
      <Vigilo 
        category="demo" 
        categories={defaultCategories}
        instanceId="docs-demo"
      />
    </div>
  )
}
