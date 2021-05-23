<template>
  <div class="header">
    <input
      type="text"
      v-model="msg"
      @keyup.enter="add"
      placeholder="please input your task, emit enter to add"
    />
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      msg: "",
      index: 0,
    };
  },
  methods: {
    add() {
      if (!this.msg) return;
      const data = { msg: this.msg, id: ++this.index, checked: false };
      this.$emit("add", data);
      this.msg = "";
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  padding: 2px;
}
input {
  border: 1px solid #eee;
  width: 100%;
  border-radius: 4px;
  height: 40px;
  padding: 2px 8px;
  outline: none;
  box-sizing: border-box;
}
</style>
