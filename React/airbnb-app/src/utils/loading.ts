type Listener = (visible: boolean) => void

let count = 0
const listeners = new Set<Listener>()

function emit() {
  const visible = count > 0
  listeners.forEach((listener) => listener(visible))
}

export const loading = {
  show() {
    count += 1
    emit()
  },

  hide() {
    count = Math.max(0, count - 1)
    emit()
  },

  getSnapshot() {
    return count > 0
  },

  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
