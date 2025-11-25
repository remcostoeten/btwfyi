import { baseTheme, baseStyles } from './constants'

/** User supplied overrides for Vigilo styling tokens. */
export type ThemeOverrides = Partial<typeof baseTheme> & {
  modes?: {
    light?: Partial<typeof baseTheme>
    dark?: Partial<typeof baseTheme>
  }
}

/**
 * Merges custom theme tokens with the canonical base theme.
 * Supports per-mode overrides (light/dark).
 */
export function mergeTheme(
  overrides?: ThemeOverrides,
  colorMode?: 'light' | 'dark'
) {
  if (!overrides) return baseTheme

  const modeOverrides =
    (colorMode && overrides.modes?.[colorMode]) || undefined

  const mergedColors = {
    ...baseTheme.colors,
    ...overrides.colors,
    ...modeOverrides?.colors,
  }

  const mergedLayout = {
    ...baseTheme.layout,
    ...overrides.layout,
    ...modeOverrides?.layout,
  }

  const mergedZ = {
    ...baseTheme.z,
    ...overrides.z,
    ...modeOverrides?.z,
  }

  return {
    colors: mergedColors,
    layout: mergedLayout,
    z: mergedZ,
  }
}

export function mergeStyles(
  theme: ReturnType<typeof mergeTheme>,
  styleOverrides?: Partial<typeof baseStyles>
) {
  /** Base computed classes derived from the merged theme */
  const computed = {
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

  return {
    ...computed,
    ...styleOverrides,
    connectorDot: {
      ...computed.connectorDot,
      ...styleOverrides?.connectorDot,
    },
    freeroamDot: {
      ...computed.freeroamDot,
      ...styleOverrides?.freeroamDot,
    },
  }
}
