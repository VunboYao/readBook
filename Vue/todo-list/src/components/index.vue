<template>
  <div class="box">
    <t-header @add="handleTask" />
    <t-main :list="taskList" @refresh="refresh" />
  </div>
</template>

<script>
import THeader from "./header";
import TMain from "./main";
export default {
  name: "todo",
  components: {
    THeader,
    TMain,
  },
  data() {
    return {
      taskList: [
        { id: "a", msg: "代码分支管理", checked: false },
        { id: "b", msg: "缺陷平台查看", checked: false },
        { id: "c", msg: "loading组件开发", checked: false },
      ],
    };
  },
  methods: {
    handleTask(obj) {
      this.taskList = [obj, ...this.taskList];
    },
    refresh(list) {
      this.taskList = list;
    },
  },
};
</script>

<style>
.box {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
