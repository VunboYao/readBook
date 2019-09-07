<template>
  <div id="app">
    <el-table :data="tableData">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
       <el-table-column
        type="imgsrc"
        label="头像"
        width="50">
        <template slot-scope="scope">
          <img :src="tableData[0]['imgsrc']" alt="">
        </template>
      </el-table-column>
      <el-table-column
        property="date"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        property="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          imgsrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3357786243,3135716437&fm=26&gp=0.jpg'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          imgsrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3357786243,3135716437&fm=26&gp=0.jpg'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          imgsrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3357786243,3135716437&fm=26&gp=0.jpg'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          imgsrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3357786243,3135716437&fm=26&gp=0.jpg'
        }],
    }
  },
  components: {
  },
  methods: {
    test(){}
  }
}
</script>
<style>
img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
