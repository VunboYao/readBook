<template>
  <div class="hello">
    <h1>i am child</h1>
    <input v-model="email" type="text">
    <input v-model="password" type="text">
    <button @click="submitForm(email, password)">
      submit
    </button>
    <input
      type="text"
      :value="title"
      @input="emitValue"
    >
    <h2>{{ age }}-{{ name }}</h2>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HelloWorld',
  props: {
    name: {
      type: String,
      default: '',
    },
    age: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    titleModifiers: { // arg + 'Modifiers'
      type: Function,
      default: () => ({}),
    },
    modelModifiers: { // 默认修饰符
      type: Object,
      default: () => ({}),
    },
  },
  emits: {
    'update:title': () => ({}),
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    },
  },
  data() {
    return {
      email: '',
      password: '',
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
      this.$emit('submit', { email, password })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* @formatter:on */
h3 {
  margin: 40px 0 0;

  div {
    display: flex;
  }
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
