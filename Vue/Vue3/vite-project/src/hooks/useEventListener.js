import { onMounted, onUnmounted } from 'vue'

export default function (target, event, callback) {
  onMounted(() => {
    target.addEventListener(event, callback)
  })
  onUnmounted(() => {
    target.removeEventListener(event, callback)
  })
}
