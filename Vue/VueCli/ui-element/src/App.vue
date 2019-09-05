<template>
  <div id="app">
    <el-table :data="tableData">
      <el-table-column
        v-for="(item, index) in columnConfig"
        :key="index"
        :label="item.label"
        :width="item.width"
        :prop="item.demo"
      >
        <template v-if="item.demo=== 'columnIcon'">
          <img :src="tableData[index].columnIcon" :style="imgStyle" alt />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :current-page.sync="currentPage1" :total="50"></el-pagination>
    <el-button @click="currentPage1=4">btn</el-button>
  </div>
</template>

<script>
export default {
  name: "app",
  props: {
    imgWidth: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      width: 60,
      currentPage1: 2,
      imgStyle: {
        width: this.imgWidth + "px",
        height: this.imgWidth + "px",
        display: "block",
        borderRadius: "50%"
      },
      columnConfig: [
        { label: "头像", width: 120, demo: "columnIcon" },
        { label: "日期", width: 120, demo: "date" },
        { label: "姓名", width: 120, demo: "name" },
        { label: "地址", demo: "address" }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          columnIcon:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3357786243,3135716437&fm=26&gp=0.jpg"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          columnIcon:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3357786243,3135716437&fm=26&gp=0.jpg"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          columnIcon:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3357786243,3135716437&fm=26&gp=0.jpg"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          columnIcon:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3357786243,3135716437&fm=26&gp=0.jpg"
        }
      ]
    }
  },
  components: {},
  methods: {}
};
</script>
