import {
  onBeforeUnmount,
  onMounted,
  shallowReactive,
  shallowRef,
  type ShallowRef,
} from 'vue'
import { createStorageKeys } from 'btwfyi-core'
import { createDefaultState } from 'btwfyi-core'
import { createVigiloStore, type VigiloStore } from 'btwfyi-core'
import type { VigiloConfig, VigiloState } from 'btwfyi-core'

export type UseVigiloStoreOptions<CategoryId extends string = string> = VigiloConfig<CategoryId> & {
  overrides?: Partial<VigiloState>
}

export type UseVigiloStoreReturn = {
  state: VigiloState
  store: ShallowRef<VigiloStore | null>
}

/**
 * Minimal Vue bridge around the Vigilo store so Vue apps can reuse the core logic.
 */
export function useVigiloStore<CategoryId extends string = string>({
  category,
  instanceId,
  overrides,
}: UseVigiloStoreOptions<CategoryId>): UseVigiloStoreReturn {
  const keys = createStorageKeys(instanceId || category)
  const state = shallowReactive(createDefaultState(overrides))
  const storeRef = shallowRef<VigiloStore | null>(null)
  let unsubscribe: (() => void) | null = null

  function assignState(next: VigiloState) {
    Object.assign(state, next)
  }

  onMounted(() => {
    const store = createVigiloStore(keys, overrides)
    storeRef.value = store
    assignState(store.getState())
    unsubscribe = store.subscribe(() => {
      assignState(store.getState())
    })
  })

  onBeforeUnmount(() => {
    unsubscribe?.()
    unsubscribe = null
    storeRef.value = null
  })

  return {
    state,
    store: storeRef,
  }
}
