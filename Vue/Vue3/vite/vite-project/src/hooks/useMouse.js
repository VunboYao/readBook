import { ref, } from 'vue'
import useEventListener from './useEventListener'
export default function () {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', e => {
    x.value = e.pageY
    y.value = e.pageY
  })

  /* function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  }) */

  return { x, y }
}
