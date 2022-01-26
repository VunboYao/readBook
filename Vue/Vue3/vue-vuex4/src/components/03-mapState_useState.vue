<template>
  <div class="hello">
    <h1>{{ count }}</h1>
    <h1>{{ counter }}</h1>
    <h1>{{ age }}</h1>
    <h1>{{ name }}</h1>
    <button @click="add">Add</button>
    <button @click="down">Down</button>
  </div>
</template>

<script>
import {useState} from '@/hooks/useState'
import {useStore} from "vuex"
export default {
  name: 'HelloWorld',
  setup() {
    const store = useStore()
    const storeState = useState(['count', 'name', 'age'])
    const storeState2 = useState({
      counter: state => state.count * 2
    })
    const add = () => {
      store.commit('add')
    }
    const down = () => {
      store.commit('down')
    }
    return {
      add,
      down,
      ...storeState,
      ...storeState2
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
