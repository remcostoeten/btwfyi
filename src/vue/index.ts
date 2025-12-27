export { useVigiloStore } from './use-btwfyi-store'
export type { UseVigiloStoreOptions, UseVigiloStoreReturn } from './use-btwfyi-store'
// Note: To use the Vigilo component, import it directly:
// import Vigilo from 'btwfyi/vue/Vigilo.vue'
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
