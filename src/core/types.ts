export type Pos = {
  x: number
  y: number
}

export type TodoStatus = 'todo' | 'working' | 'done'

export type TodoItem = {
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

export type CategoryConfig = {
  id: string
  displayName?: string
  items: TodoItem[]
}

export type Connection = {
  todoIndex: number
  targetSelector?: string
  targetLabel?: string
  targetPosition?: Pos
}

export type DisplayMode = 'full' | 'compact' | 'minimal'

export type UndoSnapshot = {
  displayMode: DisplayMode
  isHidden: boolean
}

export type VigiloConfig = {
  category: string
  instanceId?: string
}

export type StorageKeys = {
  pos: string
  col: string
  con: string
  mode: string
  hidden: string
  lines: string
  badges: string
  lineColor: string
  lineOpacity: string
  componentOpacity: string
  statuses: string
}

export type VigiloState = {
  position: Pos
  connections: Connection[]
  displayMode: DisplayMode
  isHidden: boolean
  showLines: boolean
  showBadges: boolean
  lineColor: string
  lineOpacity: number
  componentOpacity: number
  statuses: Map<number, TodoStatus>
}
