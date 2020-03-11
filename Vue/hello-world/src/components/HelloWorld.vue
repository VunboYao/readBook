<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      items: [],
      index: 0
    }
  },
  mounted() {
    // this.timer = setInterval(() => {
    //   this.index++
    //   this.items.push(this.index)
    // }, 1000)
    const timer = setInterval(() => {
       this.index++
       this.items.push(this.index)
    }, 1000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
      console.log('interval');
    })
  },
  // beforeDestroy() {
  //   console.log('object : cleartinterval');
  //   clearInterval(this.timer)
  // }
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
