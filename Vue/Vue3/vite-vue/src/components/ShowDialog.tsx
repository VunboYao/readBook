import { defineComponent, ref } from 'vue'
import { showDialog } from './function-call'

export default defineComponent({
  setup() {
    const ok = ref(true)
    showDialog({})

    return () => {
      return (<div>input you think</div>)
    }
  },
})
