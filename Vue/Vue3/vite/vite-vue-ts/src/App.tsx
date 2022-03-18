export default defineComponent({
  setup() {
    const number = ref(12)
    const bar = ref('barv')
    setInterval(() => {
      number.value++
    }, 1000)

    return () => {
      const num = number.value
      return (
        <div>
          <h2>{num + 1}</h2>
        </div>
      )
    }
  }
})
