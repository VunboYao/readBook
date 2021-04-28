<template>
  <div>
    <input
      type="checkbox"
      v-model="completedStatus"
      :disabled="total === 0"
    />
    <span>已完成{{ completed }} / 全部 {{ total }} </span>
    <button
      :class="completed > 0 ? 'close-all' : 'close-hide'"
      @click="handleDeleteAll"
    >
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    /* 获取数组长度，求总数 */
    total() {
      return this.list.length;
    },
    /* 过滤数据中已选择， 求已完成 */
    completed() {
      return this.list.filter((item) => item.checked).length;
    },
    /* 完成状态 */
    completedStatus: {
      /* 都选择时 */
      get() {
        const bool = this.list.length > 0 ? this.list.every(item => item.checked) : false
        return bool
      },
      /* v-model触发数据变化，触发父级监听事件 */
      set(val) {
        this.$emit("toggle", val);
        return val;
      }
    },
  },
  methods: {
    /* 删除全部 */
    handleDeleteAll() {
      const newList = [];
      this.list.forEach((item) => {
        if (!item.checked) {
          newList.push(item);
        }
      });
      /* 触发父级更新数组 */
      this.$emit("refresh", newList);
    },
  },
};
</script>

<style scoped>
div {
  padding: 4px 8px;
  line-height: 40px;
}
span {
  font-size: 14px;
}
.close-all {
  margin-top: 3px;
  float: right;
  color: #fff;
  background: orangered;
  border: none;
  font-size: 12px;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.close-hide {
  display: none;
}
</style>
