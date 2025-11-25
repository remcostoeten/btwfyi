import type { CategoryConfig, VigiloConfig } from '../core/types'

export type { CategoryConfig, VigiloConfig }

export interface VigiloProps extends VigiloConfig {
  categories: CategoryConfig[]
  enabled?: boolean
}
