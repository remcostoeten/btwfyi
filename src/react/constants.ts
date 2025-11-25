export const MAX_VISIBLE_ITEMS = 3
export const UNDO_WINDOW_MS = 8000

export const theme = {
  colors: {
    primary: 'rgb(59, 130, 246)',
    primaryDim: 'rgba(59, 130, 246, 0.1)',
    freeroam: 'rgb(139, 92, 246)',
    textMain: 'text-gray-200',
    textDim: 'text-zinc-500',
    bgPanel: 'bg-zinc-950',
    borderPanel: 'border-zinc-800',
    bgOverlay: 'rgba(0, 0, 0, 0.0)',
  },
  layout: {
    panel:
      'fixed flex flex-col gap-2 rounded-lg border px-4 pb-4 pt-0 w-96 shadow-2xl transition-all backdrop-blur-md z-50',
    item: 'relative flex items-center gap-3 p-1.5 px-2 rounded transition-colors w-full',
    header: 'flex items-center justify-between gap-2 min-w-0 border-b pb-1',
    badge: 'shrink-0 rounded px-1.5 py-0.5 text-xs font-medium',
  },
  z: {
    lines: 9990,
    overlay: 9995,
    panel: 9999,
  },
}

export const styles = {
  panel: `${theme.layout.panel} ${theme.colors.textMain} ${theme.colors.bgPanel} ${theme.colors.borderPanel}`,
  item: `${theme.layout.item} hover:bg-white/5`,
  header: `${theme.layout.header} ${theme.colors.borderPanel}`,
  badge: `${theme.layout.badge} bg-blue-900/50 text-blue-200`,
  connectorDot: {
    fill: theme.colors.primary,
    r: 4,
  },
  freeroamDot: {
    fill: theme.colors.freeroam,
    stroke: theme.colors.freeroam,
    strokeWidth: 1.5,
    r: 3.5,
    opacity: 0.9,
  },
}

