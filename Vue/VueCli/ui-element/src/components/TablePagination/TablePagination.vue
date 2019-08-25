<template>
  <div>
    <el-table
        :height="height"
        :stripe="stripe"
        :border="border"
        @select="select"
        @select-all="selectAll"
        highlight-current-row
        @current-change="tableCurrentChange"
        :max-height="maxHeight"
        :row-class-name="rowClassName"
        :default-sort="defaultSort"
        :data="tableData">
      <el-table-column
          v-for="item in tableColumnData"
          :fixed="item.fixed"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :key="item.prop"
          :type="item.type"
          :sortable="item.sortable"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
      ></el-table-column>
    </el-table>
    <el-pagination
        :small="small"
        :background="background"
        @current-change="currentChange"
        :current-page.sync="yhCurrentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>
<script>
	export default {
		props: {
			// pagination
			small: {
				type: Boolean,
				default: false
			},
			currentChange: { // 当前页改变Function
				type: Function,
				default: () => null
			},
			currentPage: { // 当前页
				type: Number,
				default: 1
			},
			pageSize: {
				type: Number,
				default: 50
			},
			total: {
				type: Number,
				default: 0
			},
			background: {
				type: Boolean,
				default: true
			},
			// table
			tableData: { // 表格数据
				type: Array,
				default: () => []
			},
			tableColumnData: { // 表格标题
				type: Array,
				default: () => []
			},
			stripe: { // 斑马线
				type: Boolean,
				default: false
			},
			border: { // 边框
				type: Boolean,
				default: true
			},
			rowClassName: { // 当 stripe 为 true 时,该值不生效
				type: Function,
				default: () => null
			},
			height: {
				type: [Number, String],
				default: null
			},
			maxHeight: { // 流体高度
				type: [Number, String],
				default: null
			},
			tableCurrentChange: { // 当前行选中事件
				type: Function,
				default: () => null
			},
			select: { // 单选,选中时,两个参数.数组与当前row
				type: Function,
				default: () => null
			},
			selectAll: { // 全选
				type: Function,
				default: () => null
			},
			defaultSort: {
				type: Object,
        default: () => null
      }
		},
		data() {
			return {
				yhCurrentPage: this.currentPage
			}
		}
	}
</script>
<style scoped>
  .el-pagination {
    padding: 30px 5px;
  }
</style>
