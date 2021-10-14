<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
p {
  padding: 0;
  margin: 0;
}
.navbar {
  background: #fff;
}
body {
  background: #f4f4f4;
}
.vue_content {
  padding: 20px;
  margin: 10px;
  background: #fff;
}
.table_toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
  justify-content: space-between;
}
.alltitle {
  font-size: 26px;
  margin: 20px;
  text-align: center;
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.table_toolbar_view {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 8px;
}
.table_toolbar_view .table_toolbar_view_title {
  padding: 9px 15px;
  width: 110px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  text-align: right;
}
.upload-demo {
  margin-right: 20px;
}
</style>
