<template>
  <div>
    <ul>
      <li v-for="item in counter" :key="item">{{ item }}</li>
    </ul>
    <button @click="number++">{{ title }}</button>
  </div>
</template>

<script>
import {ref, onMounted, watch, computed, toRefs  } from 'vue'

function demoAdd() {
  const fruits = ['apple', 'banners']
  const counter = ref(fruits)
  const number = ref(0)
  const twiceTheCounter = computed(() => number.value * 2)
  console.log(twiceTheCounter, 'computed')

  onMounted(() => {
    console.log(counter)
  })
  watch(number, (newVal, oldVal) => {
    console.log(newVal, oldVal, 'the new number')
  })

  return {
    counter,
    number
  }
}
export default {
  name: "setup",
  props: {
    title: {
      type: String,
      default: '123'
    }
  },
  mounted() {
    console.log(this.number, this.counter)
  },
  setup(props) {
    console.log(props)
    const {title} = toRefs(props)
    console.log(title.value)
    const {number, counter} = demoAdd()
    return {
      number, counter
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
