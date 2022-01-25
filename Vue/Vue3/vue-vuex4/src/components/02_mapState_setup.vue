<template>
  <div class="hello">
    <h1>{{ counter }}</h1>
    <h1>{{ count }}</h1>
    <h1>{{ age }}</h1>
    <h1>{{ name }}</h1>
    <button @click="add">Add</button>
    <button @click="down">Down</button>
  </div>
</template>

<script>
import {mapState, useStore} from 'vuex'
import {computed} from "vue"

export default {
  name: 'HelloWorld',
  setup() {
    const store = useStore()
    const counter = computed(() => store.state.count)

    // 批量处理
    const storeStateFns = mapState(['name', 'age', 'count'])
    const newState = {}
    Object.keys(storeStateFns).forEach(fnKey => {
      const fn = storeStateFns[fnKey].bind({$store: store})
      newState[fnKey] = computed(fn)
    })

    const add = () => store.commit('add')
    const down = () => store.commit('down')
    return {
      counter,
      add,
      down,
      ...newState,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
