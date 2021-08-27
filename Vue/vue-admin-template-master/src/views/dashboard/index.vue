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
      :close="false"
      type="text"
      placeholder="请输入内容"
      maxlength="10"
      show-word-limit
      @change="showChange"
    />
    <heading :level="1" :title="bar" icon="hanbao-01">{{ bar }}</heading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ComponTest from './ComponTest.vue'
import CustomerCom from '@/components/customerCom'
import CounterFraud from '@/components/CounterFraud'
import Heading from '@/components/RenderCom'

export default {
  name: 'Dashboard',
  components: {
    ComponTest,
    CustomerCom,
    CounterFraud,
    Heading
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
    width: 30vw;
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
