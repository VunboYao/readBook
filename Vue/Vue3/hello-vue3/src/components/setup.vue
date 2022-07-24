<template>
  <h1>{{ title }} {{ counter }}</h1>
  <h2>reactive:{{ number }}</h2>
  <h2>{{ doubleNumber }}</h2>
  <button @click="add">
    Add
  </button>
  <button @click="doubleNumber = doubleNumber - 1">
    double
  </button>
</template>

<script>
import { ref, reactive, toRefs, computed, watch, onMounted, onBeforeMount } from 'vue'
export default {
  name: "Setup",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    onBeforeMount(() => {
      console.log('beforeMounted')
    })
    onMounted(() => {
      console.log('onMounted1')
    })
    let counter = ref(100)
    let state = reactive({
      number: 10,
    })
    let { number } = toRefs(state)
    /*const info = {name: 'yyb'}
    const readOnlyInfo1 = readonly(info)*/
    const add = () => {
      state.number++
      number.value++
      console.log(number)
      counter.value++
    }

    watch(counter, (newValue, old) => {
      console.log(newValue, old, '><><><><><><>>>><><M><M><M<>M><M><<>')
    })

    const doubleNumber = computed({
      get() {
        return counter.value * 2
      },
      set(val) {
        counter.value = val - 1
        console.log(counter.value)
      },
    })
    return {
      counter,
      number,
      add,
      doubleNumber,
    }
  },
  created() {
    console.log(this.counter)
  },
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
