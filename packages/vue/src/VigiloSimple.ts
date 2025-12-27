import type { VigiloProps } from './types'
import { useVigiloStore } from './use-btwfyi-store'

export function createVigiloSimple(props: VigiloProps) {
  const store = useVigiloStore(props)

  return {
    store,
    props,
    template: `
      <div>
        <div>Vigilo Component (Simple)</div>
        <p>Categories: ${props.categories.length}</p>
        <p>Current category: ${props.category}</p>
        <p>Enabled: ${props.enabled}</p>
      </div>
    `
  }
}