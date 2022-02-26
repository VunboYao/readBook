<template>
  <div>
    <h2>About{{ tripleCounter }}</h2>
  </div>
</template>

<script>
import {useCounterStore} from '../stores/userInfo'
export default {
  setup(){
    const store = useCounterStore()
    setTimeout(() => {
      store.counter = store.counter * 2
    }, 2000)
    return {
      store
    }
  },
  computed: {
    tripleCounter() {
      return this.store.counter * 3
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
