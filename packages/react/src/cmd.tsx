import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import {
  getPaletteInstances,
  subscribePaletteInstances,
  type PaletteInstanceSnapshot,
  type PaletteTaskSnapshot,
} from './registry'

function isEditableElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  const editable =
    target.isContentEditable ||
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT'
  return editable
}

/**
 * Global command palette that surfaces all Vigilo tasks across an application.
 * Opens via Alt + K or by typing "vigilo" in sequence.
 */
export function VigiloCommandPalette() {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [instances, setInstances] = useState<PaletteInstanceSnapshot[]>(
    () => getPaletteInstances()
  )
  const inputRef = useRef<HTMLInputElement | null>(null)
  const typedRef = useRef('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => subscribePaletteInstances(setInstances), [])

  useEffect(() => {
    if (!isOpen) return
    const id = window.setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
    return () => window.clearTimeout(id)
  }, [isOpen])

  const closePalette = useCallback(() => {
    setIsOpen(false)
    setQuery('')
  }, [])

  const openPalette = useCallback((initialQuery = '') => {
    setQuery(initialQuery)
    setIsOpen(true)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isEditableElement(e.target)) return

      const key = e.key.toLowerCase()
      const isAltK = e.altKey && key === 'k'
      if (isAltK) {
        e.preventDefault()
        openPalette('')
        return
      }

      if (!isOpen && e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        typedRef.current = (typedRef.current + key).slice(-6)
        if (typedRef.current.endsWith('vigilo')) {
          openPalette('vigilo')
          typedRef.current = ''
          e.preventDefault()
        }
        return
      }

      if (isOpen && key === 'escape') {
        e.preventDefault()
        closePalette()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closePalette, isOpen, openPalette])

  const managementMode = query.trim().toLowerCase() === 'vigilo'

  const tasks = useMemo(() => {
    return instances.flatMap((instance) =>
      instance.tasks.map((task) => ({
        instance,
        task,
      }))
    )
  }, [instances])

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || managementMode) return tasks
    return tasks.filter(({ task, instance }) => {
      const haystack = `${task.text} ${task.status} ${instance.label} ${instance.categoryId}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [managementMode, query, tasks])

  const handleSelectTask = useCallback(
    (task: PaletteTaskSnapshot) => {
      task.focusTask()
      closePalette()
    },
    [closePalette]
  )

  const handleClearConnection = useCallback((task: PaletteTaskSnapshot) => {
    task.clearConnection?.()
  }, [])

  if (!isMounted) return null

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24">
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl text-zinc-50">
        <div className="border-b border-zinc-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Vigilo tasks… (type “vigilo” for management view)"
              className="flex-1 bg-transparent text-base focus:outline-none placeholder:text-zinc-500"
            />
            <kbd className="rounded-md border border-zinc-800 px-2 py-1 text-xs text-zinc-400">
              esc
            </kbd>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Alt + K to open from anywhere. Type "vigilo" for overlay management.
          </p>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {instances.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-zinc-500">
              No Vigilo overlays are active on this page yet.
            </div>
          ) : managementMode ? (
            <ManagementView instances={instances} closePalette={closePalette} />
          ) : filteredTasks.length > 0 ? (
            <ul className="divide-y divide-zinc-900">
              {filteredTasks.map(({ instance, task }) => (
                <li key={task.id}>
                  <button
                    className="flex w-full flex-col gap-1 px-5 py-3 text-left hover:bg-white/5"
                    onClick={() => handleSelectTask(task)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-zinc-100">
                        {task.text}
                      </span>
                      <span className="text-2xs inline-flex items-center gap-1 rounded-full border border-zinc-800 px-2 py-0.5 text-zinc-400">
                        {instance.label}
                        {task.hasConnection && (
                          <span className="inline-flex h-2 w-2 rounded-full bg-blue-400" />
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>Status: {task.status}</span>
                      {task.hasConnection && (
                        <button
                          type="button"
                          className="text-xs text-rose-400 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleClearConnection(task)
                          }}
                        >
                          Remove connection
                        </button>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-8 text-center text-sm text-zinc-500">
              No tasks match “{query}”.
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

function ManagementView({
  instances,
  closePalette,
}: {
  instances: PaletteInstanceSnapshot[]
  closePalette: () => void
}) {
  if (instances.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-zinc-500">
        Nothing to manage yet.
      </div>
    )
  }

  return (
    <div className="divide-y divide-zinc-900">
      {instances.map((instance) => (
        <div key={instance.instanceKey} className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-100">
                {instance.label}
              </p>
              <p className="text-xs text-zinc-500">
                {instance.connectedCount} connections • {instance.totalTasks} tasks
              </p>
            </div>
            <span
              className={`text-2xs rounded-full border px-2 py-0.5 ${
                instance.hidden
                  ? 'border-zinc-800 text-zinc-500'
                  : 'border-emerald-500/40 text-emerald-300'
              }`}
            >
              {instance.hidden ? 'Hidden' : 'Visible'}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <button
              className="rounded-md border border-blue-500/40 px-3 py-1 text-blue-200 hover:bg-blue-500/10"
              onClick={() => {
                closePalette()
                instance.actions.focus()
              }}
            >
              Focus overlay
            </button>
            <button
              className="rounded-md border border-zinc-700 px-3 py-1 text-zinc-300 hover:bg-white/5"
              onClick={() => {
                instance.actions.show()
              }}
            >
              Show
            </button>
            <button
              className="rounded-md border border-zinc-700 px-3 py-1 text-zinc-300 hover:bg-white/5"
              onClick={() => instance.actions.hide()}
            >
              Hide
            </button>
            <button
              className="rounded-md border border-rose-500/40 px-3 py-1 text-rose-300 hover:bg-rose-500/10"
              onClick={() => instance.actions.resetConnections()}
            >
              Clear connections
            </button>
            <button
              className="rounded-md border border-amber-500/40 px-3 py-1 text-amber-200 hover:bg-amber-500/10"
              onClick={() => instance.actions.resetStatuses()}
            >
              Reset statuses
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
