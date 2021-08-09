<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-button @click="$router.push('/login')">Login</el-button>
    <compon-test
      :foo.sync="bar"
      type="success"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ComponTest from './ComponTest.vue'
export default {
  name: 'Dashboard',
  components: {
    ComponTest
  },
  data() {
    return {
      bar: '123'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    changeVal(e) {
      this.bar = e
    },
    handleClick(e) {
      console.log(`'123123'`, e)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
