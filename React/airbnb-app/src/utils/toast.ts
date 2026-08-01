export type ToastType = 'success' | 'error'

export interface ToastItem {
  id: number
  type: ToastType
  message: string
}

type Listener = (toasts: ToastItem[]) => void

let seq = 0
let toasts: ToastItem[] = []
const listeners = new Set<Listener>()
const timers = new Map<number, ReturnType<typeof setTimeout>>()

function emit() {
  listeners.forEach((listener) => listener(toasts))
}

function remove(id: number) {
  const timer = timers.get(id)
  if (timer) {
    clearTimeout(timer)
    timers.delete(id)
  }
  toasts = toasts.filter((item) => item.id !== id)
  emit()
}

function push(type: ToastType, message: string, duration = 2500) {
  const id = ++seq
  toasts = [...toasts, { id, type, message }]
  emit()
  timers.set(
    id,
    setTimeout(() => remove(id), duration),
  )
}

export const toast = {
  success(message: string) {
    push('success', message)
  },

  error(message: string) {
    push('error', message)
  },

  dismiss(id: number) {
    remove(id)
  },

  getSnapshot() {
    return toasts
  },

  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
