import { onMounted, inject } from 'vue'

export function usePoint() {
  const track = inject('track')
  onMounted(() => {
    (track as any).getPerformanceInfo()
  })
}

