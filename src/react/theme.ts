import { baseTheme, baseStyles, type Theme } from './constants'

/**
 * User-supplied overrides for Btwfyi styling tokens.
 * This type allows for partial overrides of the base theme,
 * and also supports mode-specific overrides for light and dark themes.
 *
 * @property {Partial<Theme>} [modes] - Mode-specific overrides.
 * @property {Partial<Theme>} [modes.light] - Overrides for the light theme.
 * @property {Partial<Theme>} [modes.dark] - Overrides for the dark theme.
 */
export type ThemeOverrides = Partial<Theme> & {
  modes?: {
    light?: Partial<Theme>
    dark?: Partial<Theme>
  }
}

/**
 * Merges custom theme tokens with the canonical base theme.
 * Supports per-mode overrides (light/dark).
 *
 * @param {ThemeOverrides} [overrides] - The user-supplied theme overrides.
 * @param {'light' | 'dark'} [colorMode] - The current color mode.
 * @returns {Theme} The merged theme.
 */
export function mergeTheme(
  overrides?: ThemeOverrides,
  colorMode?: 'light' | 'dark'
): Theme {
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

/**
 * Merges custom style overrides with the computed base styles.
 *
 * @param {Theme} theme - The merged theme.
 * @param {Partial<typeof baseStyles>} [styleOverrides] - The user-supplied style overrides.
 * @returns {typeof baseStyles} The merged styles.
 */
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
