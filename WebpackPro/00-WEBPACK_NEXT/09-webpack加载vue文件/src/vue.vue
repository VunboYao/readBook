<template>
<div>{{msg}}</div>
</template>

<script>
export default {
  name: "vue",
  data() {
    return {
      msg: 'Hello Vue'
    }
  }
};
</script>

<style scoped lang="less">
div {
  font-size: 40px;
  color: skyblue;
}
</style>
<!--
需要安装vue, vue-loader vue-template-compiler
webpack.config.js需要配置对应的vue文件处理。同时css语法配置。如less文件配置，scss配置
-->
