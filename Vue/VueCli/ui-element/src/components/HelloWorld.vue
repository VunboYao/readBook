<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-input-number
      @change="handleChange"
      :min="2"
      :max="20"
      :step="0.1"
      size="small"
      :disabled="false"
      label="number"
      :precision="2"
      controls-position="left"
      step-strictly
      v-model="num"></el-input-number>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      num: 2
    }
  },
  props: {
    msg: String
  },
  methods: {
    handleChange(value){
      // eslint-disable-next-line no-console
      console.log(value);
    },
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
<style scoped>

</style>
