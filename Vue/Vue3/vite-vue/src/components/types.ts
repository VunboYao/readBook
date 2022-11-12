import { ComponentPublicInstance, PropType } from 'vue'
import { isPromise, noop } from '../utils/basic'

export type DialogAction = 'confirm' | 'cancel' | 'close'

export const truthProp = {
  type: Boolean,
  default: true as const,
}

export const numericProp = [Number, String]

export const unknownProp = null as unknown as PropType<unknown>

export const makeStringProp = <T>(defaultValue: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultValue,
})

export type DialogOptions = {
  title?: string
  width?: number | string
  beforeClose?: Interceptor
  showCancelButton?: boolean
  showConfirmButton?: boolean
  cancelButtonText?: String
  confirmButtonText?: String
  cancelButtonColor?: String
  confirmButtonColor?: String
  allowHtml?: Boolean
  className?: ''
  transition?: undefined
}

export type ComponentInstance = ComponentPublicInstance<{}, any>

export type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void;

export function callInterceptor(interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled,
  }: {
    args?: unknown[]
    done: () => void
    canceled?: () => void
  }) {
  if (interceptor) {
    // eslint-disable-next-line prefer-spread
    const returnVal = interceptor.apply(null, args)
    if (isPromise(returnVal)) {
      returnVal.then((value) => {
        if (value) {
          done()
        } else if (canceled) {
          canceled()
        }
      }).catch(noop)
    } else if (returnVal) {
      done()
    } else if (canceled) {
      canceled()
    }
  } else {
    done()
  }
}
