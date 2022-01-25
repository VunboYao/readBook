<template>
  <div class="hello">
    <h1>{{ counter }}</h1>
    <button @click="add">Add</button>
    <button @click="down">Down</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HelloWorld',
  computed: {
    // ...mapState(['age', 'name']), // 第一种：array
    ...mapState({ // 第二种：object
      age: state => state.age,
      name: state => state.name
    }),
    counter() {
      return this.$store.state.count
    }
  },
  methods: {
    add() {
      this.$store.commit('add')
    },
    down() {
      this.$store.commit('down')
    }
  }
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
