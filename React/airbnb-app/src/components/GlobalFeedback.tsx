import { useSyncExternalStore } from 'react'
import { loading } from '@/utils/loading'
import { toast, type ToastItem } from '@/utils/toast'

function subscribeLoading(onStoreChange: () => void) {
  return loading.subscribe(() => onStoreChange())
}

function subscribeToast(onStoreChange: () => void) {
  return toast.subscribe(() => onStoreChange())
}

function toastClassName(type: ToastItem['type']) {
  return type === 'error'
    ? 'bg-red-600 text-white'
    : 'bg-emerald-600 text-white'
}

export default function GlobalFeedback() {
  const visible = useSyncExternalStore(
    subscribeLoading,
    loading.getSnapshot,
    () => false,
  )
  const toasts = useSyncExternalStore(
    subscribeToast,
    toast.getSnapshot,
    () => [],
  )

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="rounded-lg bg-white px-6 py-4 text-sm font-medium text-gray-800 shadow-lg">
            Loading...
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed top-4 right-4 z-60 flex flex-col gap-2">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={`pointer-events-auto max-w-sm rounded-md px-4 py-2 text-sm shadow-lg ${toastClassName(item.type)}`}
            onClick={() => toast.dismiss(item.id)}
          >
            {item.message}
          </div>
        ))}
      </div>
    </>
  )
}
