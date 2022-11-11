import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const ok = ref(true)

    return () => {
      return (<div>input you think</div>)
    }
  },
})
