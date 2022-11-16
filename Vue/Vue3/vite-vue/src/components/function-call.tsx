import { extend, isBrowser } from '../utils/basic'
import Dialog from './Dialog'
import { mountComponent, usePopupState } from './mount-components'
import { ComponentInstance, DialogAction, DialogOptions } from './types'

// 实例
let instance: ComponentInstance

const DEFAULT_OPTIONS = {
  title: '',
  desc: '',
  width: '',
  beforeClose: null,
  showCancelButton: false,
  showConfirmButton: false,
  cancelButtonText: '',
  confirmButtonText: '',
  cancelButtonColor: '',
  confirmButtonColor: '',
  allowHtml: false,
  className: '',
  transition: undefined,
}

function initInstance() {

  const Wrapper = {
    setup() {
      const { state, toggle } = usePopupState()

      return () => <Dialog {...state} onUpdate:show={toggle} />
    },
  }

  !({ instance } = mountComponent(Wrapper))
}

export function showDialog(options: DialogOptions) {
  if (!isBrowser) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance()
    }

    console.log(instance, 'instance')

    instance.open(extend({}, DEFAULT_OPTIONS, options, {
      callback: (action: DialogAction) => {
        resolve(action)
      },
    }))
  })
}
