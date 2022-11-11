import { extend } from './../utils/basic'
import { getCurrentInstance, reactive } from 'vue'

interface init {
  show: boolean
  [key: string]: any
}

export function usePopupState() {
  const state: init = reactive({
    show: false,
  })

  const toggle = (show: boolean) => {
    state.show = show
  }

  const open = (props: Record<string, any>) => {
    extend(state, props)
    toggle(true)
  }

  const close = () => toggle(false)

  useExpose({ open, close, toggle })

  return {
    open,
    close,
    state,
    toggle,
  }
}

// 将方法挂载到实例上
export function useExpose<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance()
  if (instance) {
    extend(instance.proxy as object, apis)
  }
}
