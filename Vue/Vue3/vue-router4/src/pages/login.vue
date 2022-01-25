<template>
<div>
  <button @click="login">login</button>
</div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
  name: "login",
  data() {
    return {}
  },
  setup() {
    const router = useRouter()
    const login = () => {
      window.localStorage.setItem('token', '>><><>')
      router.push('/home')
    }
    return {
      login
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
