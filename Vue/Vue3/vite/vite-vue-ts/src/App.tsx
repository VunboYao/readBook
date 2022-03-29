import logo from '@/assets/logo.png'
export default defineComponent({
  setup() {
    const number = ref(12)
    setInterval(() => {
      number.value++
    }, 1000)

    return () => {
      const num = number.value
      return (
        <div>
          <h2>{num + 2}</h2>
          <img src={logo}></img>
        </div>
      )
    }
  },
})
