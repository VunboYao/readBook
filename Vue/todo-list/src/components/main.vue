<template>
  <div class="main">
    <ul>
      <li v-for="item in list" :key="item.id">
        <input type="checkbox" v-model="item.checked" />
        {{ item.msg }}
        <button @click="handleDelete(item.id)">删除</button>
      </li>
    </ul>
    <t-footer :list="list" @toggle="toggleStatus" @refresh="refresh" />
  </div>
</template>

<script>
import TFooter from "./footer";
export default {
  name: "Main",
  components: {
    TFooter,
  },
  props: {
    /* 父级传入数据 */
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    /* 监听选择器状态，过滤所有数据属性 */
    toggleStatus(val) {
      this.list.forEach((item) => (item.checked = val));
    },
    /* 单例删除 */
    handleDelete(id) {
      const index = this.list.findIndex((item) => item.id === id);
      this.list.splice(index, 1);
    },
    /* 全部清除，更新数据 */
    refresh(list) {
      this.$emit("refresh", list);
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
}
ul {
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  border-radius: 2px;
  overflow: hidden;
}
li {
  padding: 4px 8px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
}
input {
  vertical-align: middle;
}
li:hover {
  background: #eee;
  cursor: pointer;
}
button {
  margin-top: 3px;
  display: none;
  float: right;
  color: #fff;
  background: orangered;
  border: none;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}
li:hover button {
  display: block;
}
</style>
