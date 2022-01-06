<template>
  <div class="hello">
    <h1>i am child</h1>
    <input type="text" v-model="email">
    <input type="text" v-model="password">
    <button @click="submitForm(email, password)">submit</button>
    <input type="text" :value="title" @input="emitValue">
    <h2>{{ age }}-{{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    name: String,
    age: Number,
    title: String,
    titleModifiers: { // arg + 'Modifiers'
      default: () => {
      }
    },
    modelModifiers: { // 默认修饰符
      default: () => ({})
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  emits: {
    'update:title': null,
    submit: ({email, password}) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.titleModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:title', value)
    },
    submitForm(email, password) {
      this.$emit('submit', {email, password})
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
