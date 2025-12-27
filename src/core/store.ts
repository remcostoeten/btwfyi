import type {
  Connection,
  DisplayMode,
  Pos,
  StorageKeys,
  TodoStatus,
  BtwfyiState,
} from './types'
import {
  saveComponentOpacity,
  saveConnections,
  saveDisplayMode,
  saveHidden,
  saveLineColor,
  saveLineOpacity,
  savePosition,
  saveShowBadges,
  saveShowLines,
  saveStatuses,
} from './storage'
import { hydrateState } from './state'

type Listener = () => void

type PositionOptions = {
  persist?: boolean
}

export type BtwfyiStore = {
  getState: () => BtwfyiState
  subscribe: (listener: Listener) => () => void
  setPosition: (position: Pos, options?: PositionOptions) => void
  setConnections: (connections: Connection[]) => void
  setDisplayMode: (mode: DisplayMode) => void
  setHidden: (isHidden: boolean) => void
  setShowLines: (showLines: boolean) => void
  setShowBadges: (showBadges: boolean) => void
  setLineColor: (color: string) => void
  setLineOpacity: (opacity: number) => void
  setComponentOpacity: (opacity: number) => void
  setStatuses: (statuses: Map<number, TodoStatus>) => void
  setStatus: (index: number, status: TodoStatus) => void
  resetStatuses: () => void
}

/**
 * Creates a lightweight store for Btwfyi state that persists via localStorage.
 */
export function createBtwfyiStore(
  keys: StorageKeys,
  overrides?: Partial<BtwfyiState>
): BtwfyiStore {
  let state = hydrateState(keys, overrides)

  const listeners = new Set<Listener>()

  function emit() {
    listeners.forEach((listener) => listener())
  }

  function setState(next: BtwfyiState) {
    state = next
    emit()
  }

  function update(partial: Partial<BtwfyiState>) {
    setState({
      ...state,
      ...partial,
    })
  }

  function setPosition(position: Pos, options?: PositionOptions) {
    update({ position: { ...position } })
    if (options?.persist === false) return
    savePosition(keys, position)
  }

  function setConnections(connections: Connection[]) {
    update({ connections: [...connections] })
    saveConnections(keys, connections)
  }

  function setDisplayMode(mode: DisplayMode) {
    update({ displayMode: mode })
    saveDisplayMode(keys, mode)
  }

  function setHidden(isHidden: boolean) {
    update({ isHidden })
    saveHidden(keys, isHidden)
  }

  function setShowLines(showLines: boolean) {
    update({ showLines })
    saveShowLines(keys, showLines)
  }

  function setShowBadges(showBadges: boolean) {
    update({ showBadges })
    saveShowBadges(keys, showBadges)
  }

  function setLineColor(color: string) {
    update({ lineColor: color })
    saveLineColor(keys, color)
  }

  function setLineOpacity(opacity: number) {
    update({ lineOpacity: opacity })
    saveLineOpacity(keys, opacity)
  }

  function setComponentOpacity(opacity: number) {
    update({ componentOpacity: opacity })
    saveComponentOpacity(keys, opacity)
  }

  function setStatuses(statuses: Map<number, TodoStatus>) {
    update({ statuses: new Map(statuses) })
    saveStatuses(keys, statuses)
  }

  function setStatus(index: number, status: TodoStatus) {
    const next = new Map(state.statuses)
    next.set(index, status)
    setStatuses(next)
  }

  function resetStatuses() {
    setStatuses(new Map())
  }

  return {
    getState: () => state,
    subscribe(listener: Listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    setPosition,
    setConnections,
    setDisplayMode,
    setHidden,
    setShowLines,
    setShowBadges,
    setLineColor,
    setLineOpacity,
    setComponentOpacity,
    setStatuses,
    setStatus,
    resetStatuses,
  }
}
