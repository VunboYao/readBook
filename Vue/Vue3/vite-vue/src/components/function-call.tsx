import { isBrowser } from '../utils/basic'
import { usePopupState } from './mount-components'
import { ComponentInstance, DialogOptions } from './types'

// 实例
let instance: ComponentInstance

function initInstance() {
  const Wrapper = {
    setup() {
      const { state, toggle } = usePopupState()

      return () => <Dialog {...state} onUpdate:show={toggle} />
    },
  }
}

export function showDialog(options: DialogOptions) {
  if (!isBrowser) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance()
    }
    resolve({})
  })

}
