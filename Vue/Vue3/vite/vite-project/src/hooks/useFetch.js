
import { ref } from 'vue'

export default function (url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then(res => res.json())
    .then(json => data.value = json)
    .catch(err => error.value = err)
  return { data, error }
}
