<template>
  <h1>{{ title }} {{counter}}</h1>
  <h2>reactive:{{number}}</h2>
  <h2>{{doubleNumber}}</h2>
  <button @click="add">Add</button>
  <button @click="doubleNumber = doubleNumber - 1">double</button>
</template>

<script>
import {ref, reactive, toRefs, computed} from 'vue'
export default {
  name: "setup",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  created() {
    console.log(this.counter)
  },
  setup() {
    let counter = ref(100)
    let state = reactive({
      number: 10
    })
    let {number} = toRefs(state)
    /*const info = {name: 'yyb'}
    const readOnlyInfo1 = readonly(info)*/
    const add = () => {
      state.number++
      number.value++
      console.log(number)
      counter.value++
    }

    const doubleNumber = computed({
      get() {
        return counter.value * 2
      },
      set(val) {
        counter.value = val - 1
        console.log(counter.value)
      }
    })
    return {
      counter,
      number,
      add,
      doubleNumber
    }
  }
}
</script>

<style scoped lang="scss">
div {
  color: rebeccapurple;
  ul>li {
    font-weight: 600;
  }
}
</style>
