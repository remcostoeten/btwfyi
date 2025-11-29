export { useVigiloStore } from './use-vigilo-store'
export type { UseVigiloStoreOptions, UseVigiloStoreReturn } from './use-vigilo-store'
// Note: To use the Vigilo component, import it directly:
// import Vigilo from '@remcostoeten/vigilo/vue/Vigilo.vue'
// Your bundler (Vite, webpack with vue-loader, etc.) will handle the .vue file
export type { VigiloProps, CategoryConfig } from './types'
export { generateSelector, getElementLabel, isValidSelector } from './dom'
export {
  theme,
  styles,
  MAX_VISIBLE_ITEMS,
  UNDO_WINDOW_MS,
  baseTheme,
  baseStyles,
} from './constants'
