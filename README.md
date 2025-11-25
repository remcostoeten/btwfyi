# 

**Vigilo** *(verb)*  
/ˈwi.ɡi.loː/ — *Latin, “to watch, stay alert, keep aware.”*

A lightweight task awareness overlay for development environments. Vigilo keeps tasks visible on top of your interface, helping you stay focused, plan effectively, and avoid forgetting important work. Designed for developers who want persistent task clarity without leaving the UI.

## Installation

```bash
npm install vigilo
# or
pnpm add vigilo
# or
yarn add vigilo
```

## Usage

### React

```tsx
import { Vigilo } from 'vigilo/react'
import type { CategoryConfig } from 'vigilo/react'

const categories: CategoryConfig[] = [
  {
    id: 'my-tasks',
    displayName: 'My Tasks',
    items: [
      { text: 'Fix bug in login flow', action: 'fix' },
      { text: 'Add user profile page', action: 'add' },
    ],
  },
]

function App() {
  return (
    <div>
      <Vigilo category="my-tasks" categories={categories} enabled={true} />
    </div>
  )
}
```

### Framework Agnostic Core

```typescript
import {
  createStorageKeys,
  loadState,
  savePosition,
  generateSelector,
  calculateBezier,
} from 'vigilo'

const keys = createStorageKeys('my-instance')
const state = loadState(keys)
```

## API

### React Component

#### Props

- `category: string` - The category ID to display
- `categories: CategoryConfig[]` - Array of category configurations
- `instanceId?: string` - Optional instance identifier
- `enabled?: boolean` - Whether the component is enabled (default: true)

#### CategoryConfig

```typescript
type CategoryConfig = {
  id: string
  displayName?: string
  items: TodoItem[]
}

type TodoItem = {
  text: string
  action?: string
  info?: string
  description?: string
  notes?: string
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}
```

## Core API

The framework-agnostic core provides utilities for:

- Storage management (`createStorageKeys`, `loadState`, `savePosition`, etc.)
- DOM utilities (`generateSelector`, `getElementLabel`, `isValidSelector`)
- Connection calculations (`calculateBezier`)

## License

MIT
=we 