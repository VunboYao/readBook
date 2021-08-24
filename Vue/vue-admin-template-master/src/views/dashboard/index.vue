<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-button @click="$router.push('/login')">Login</el-button>
    <customer-com
      v-model="bar"
    />
    {{ bar }}
    <compon-test
      :foo.sync="bar"
      type="success"
    />
    <counter-fraud
      v-model="inputValue"
      type="text"
      placeholder="请输入内容"
      maxlength="10"
      show-word-limit
      @change="showChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ComponTest from './ComponTest.vue'
import CustomerCom from '@/components/customerCom'
import CounterFraud from '@/components/CounterFraud'
export default {
  name: 'Dashboard',
  components: {
    ComponTest,
    CustomerCom,
    CounterFraud
  },
  data() {
    return {
      bar: '1234',
      inputValue: '123123'
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
    showChange(e) {
      console.log(`e=>`, e)
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
