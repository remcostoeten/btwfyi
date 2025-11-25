import type { CategoryConfig, VigiloConfig } from '../core/types'

export type { CategoryConfig, VigiloConfig }

/**
 * Props for the Vigilo React component. Passing a literal `categories` array
 * narrows the `category` prop to the provided IDs for better intellisense.
 */
export interface VigiloProps<
  TCategories extends readonly CategoryConfig[] = CategoryConfig[]
> extends VigiloConfig<TCategories[number]['id']> {
  categories: TCategories
  enabled?: boolean
}
