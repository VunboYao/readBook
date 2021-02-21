<template>
  <div class="target">
    <h1>Hello world!</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button v-on:click="Test">Test</el-button>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      loading: false,
      form: {
        name: "123",
        region: "shanghai",
      },
    };
  },
  mounted() {
    let set = new Set();
    let observe = new MutationObserver((arr) => {
      arr.map((x) => {
        set.add(x.target);
      });
      console.log(set);
    });
    observe.observe(document.querySelector(".target"), {
      characterDataOldValue: true,
      subtree: true,
      attributeOldValue: true,
    });
  },
  methods: {
    Test() {
      this.loading = true
    },
    PUSH() {
      this.tableData.push({
        date: "2016-05-03",
        name: "王小虎2",
        address: "上海市普陀区金沙江路 1516 弄",
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
