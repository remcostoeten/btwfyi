import type { TodoStatus } from '@remcostoeten/vigilo-core'

/** Snapshot describing a single task inside the command palette. */
export type PaletteTaskSnapshot = {
  id: string
  instanceKey: string
  index: number
  text: string
  status: TodoStatus
  hasConnection: boolean
  focusTask: () => void
  clearConnection?: () => void
}

/** Aggregated data for each mounted Vigilo instance. */
export type PaletteInstanceSnapshot = {
  instanceKey: string
  categoryId: string
  label: string
  hidden: boolean
  totalTasks: number
  connectedCount: number
  tasks: PaletteTaskSnapshot[]
  actions: {
    focus: () => void
    show: () => void
    hide: () => void
    resetConnections: () => void
    resetStatuses: () => void
  }
}

const registry = new Map<string, PaletteInstanceSnapshot>()
const listeners = new Set<(instances: PaletteInstanceSnapshot[]) => void>()

function emit() {
  const snapshot = Array.from(registry.values())
  listeners.forEach((listener) => listener(snapshot))
}

/** Registers or updates an instance snapshot. Pass `null` to remove it. */
export function updatePaletteInstance(
  instanceKey: string,
  snapshot: PaletteInstanceSnapshot | null
) {
  if (snapshot === null) {
    if (registry.delete(instanceKey)) {
      emit()
    }
    return
  }

  registry.set(instanceKey, snapshot)
  emit()
}

/** Removes an instance from the palette registry. */
export function removePaletteInstance(instanceKey: string) {
  if (registry.delete(instanceKey)) {
    emit()
  }
}

/** Subscribe to palette snapshots. Returns an unsubscribe function. */
export function subscribePaletteInstances(
  listener: (instances: PaletteInstanceSnapshot[]) => void
) {
  listeners.add(listener)
  listener(Array.from(registry.values()))
  return () => {
    listeners.delete(listener)
  }
}

/** Returns a snapshot of all known instances. */
export function getPaletteInstances(): PaletteInstanceSnapshot[] {
  return Array.from(registry.values())
}
