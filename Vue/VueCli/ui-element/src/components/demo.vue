<template>
  <div>
    <table-pagination
        height="400"
        class="table"
        max-height="600"
        :row-class-name="tableRowClassName"
        :background="background"
        :page-size="20"
        :total="200"
        :current-change="currentChange"
        :table-data="tableData"
        :table-column-data="tableColumnData"
        :table-current-change="tableRow"
        :select="mySelect"
        :select-all="mySelectAll"
        :default-sort="sortRule"
    />
  </div>
</template>

<script>
	import TablePagination from './TablePagination/TablePagination'

	export default {
		name: "demo",
		data() {
			return {
				sortRule: { prop: 'date', order: 'descending'},
				tableData: [
					{
						date: '2099',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
            phone: '18266488847',
            email: 'vunbo@outlook.com'
					},{
						date: '2011-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '20187-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '1111',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '1996-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '18266488847',
						email: 'vunbo@outlook.com'
					},
        ],
				tableColumnData: [
          { type: 'selection'},
          { type: 'index', label: '索引',width: 100},
          { prop: 'date', label: '日期', width: 180,fixed: false },
          { prop: 'name', label: '姓名', width: 180, fixed: false},
          { prop: 'address', label: '地址', showOverflowTooltip: true},
          { prop: 'phone', label: '手机号'},
          { prop: 'email', label: '邮箱', fixed: 'right'}
        ],
				background: true,
			}
		},
		components: {
			TablePagination
		},
    mounted() {
		},
		methods: {
			mySelectAll(selection) {
				console.log(selection,selection.length)
			},
			mySelect(selection, row) {
				console.log(selection, row)
			},
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 1) {
					return 'warning-row'
				} else if (rowIndex === 3) {
					return 'success-row'
				}
				return ''
			},
			tableRow(val,old) {
				console.log(val,old)
      },
			currentChange(val) {
				console.log(val);
      }
		}
	}
</script>
<style>
  .table {
    margin: 0 auto;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
