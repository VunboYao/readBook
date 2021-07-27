<template>
  <div class="venus-table">
    <p v-if="showSearchResult" class="table-result-title">{{ searchResult }}</p>
    <el-table
      :id="tableId"
      :ref="tableId"
      :row-key="sortKey"
      :height="height"
      :stripe="stripe"
      :border="border"
      :highlight-current-row="highlightCurrentRow"
      :max-height="maxHeight"
      :row-class-name="rowClassName"
      :data="tableCopy"
      :sum-text="sumText"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      :span-method="spanMethod"
      @select="select"
      @select-all="selectAll"
      @current-change="tableCurrentChange"
      @row-dblclick="rowDblclick"
    >
      <!-- 扩展列表 -->
      <af-table-column v-if="expand" type="expand">
        <template slot-scope="props">
          <el-form label-position="right">
            <el-form-item
              v-for="(item, index) in tableAllConfig"
              :key="index"
              class="gz-from-item"
              :label="item.label"
            >{{ props.row[item.prop] }}
            </el-form-item>
          </el-form>
        </template>
      </af-table-column>

      <!-- 单选列表 -->
      <af-table-column
        v-if="showRadio"
        label="选择"
        fixed="left"
        width="50"
      >
        <template slot-scope="scope">
          <div :class="(singleSelect === scope.row.__ob__.dep.id ? 'outer check' : 'outer')">
            <div class="inner" />
          </div>
        </template>
      </af-table-column>

      <!-- 常规列表 -->
      <template v-if="tableHeaderConfig.length > 0">
        <af-table-column
          v-for="(item, index) in tableHeaderConfig"
          :key="`col_${index}`"
          :align="align"
          :fixed="item.type === 'selection' ? 'left' : item.fixed"
          :header-align="item.headerAlign"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :type="item.type"
          :sortable="item.sortable"
          :prop="sortHead[index].prop"
          :label="item.label"
          :width="item.width"
        />
      </template>

      <!--多级表头-->
      <template v-if="multiTableHeaderConfig.length > 0">
        <el-table-column
          v-for="(item, index) in multiTableHeaderConfig"
          :key="`col_${index}`"
          :align="align"
          :fixed="item.fixed"
          :header-align="item.headerAlign"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :type="item.type"
          :sortable="item.sortable"
          :prop="sortHead[index].prop"
          :label="item.label"
          :width="item.width"
        >
          <template v-if="item.multi">
            <el-table-column
              v-for="inner in item.multi"
              :key="inner.prop"
              :align="align"
              :fixed="inner.fixed"
              :header-align="inner.headerAlign"
              :show-overflow-tooltip="inner.showOverflowTooltip"
              :type="inner.type"
              :sortable="inner.sortable"
              :prop="inner.prop"
              :label="inner.label"
              :width="inner.width"
            />
          </template>
        </el-table-column>
      </template>

      <!-- 操作列表 -->
      <af-table-column
        v-if="operationConfig"
        :fixed="operationConfig.fixed"
        :align="operationConfig.align || 'left'"
        label="操作"
        :width="operationConfig.width ? operationConfig.width : ''"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in operationConfig.operationButton"
            :key="index"
            :plain="item.plain ? item.plain : false"
            :type="item.type || 'text'"
            :loading="item.loading ? item.loading : false"
            :size="item.size ? item.size : ''"
            :disabled="item.disabled ? item.disabled : false"
            @click.prevent.stop="Operation(item, scope.row)"
          >{{ item.value }}
          </el-button>
        </template>
      </af-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-if="total && total > 0"
      :small="small"
      :background="background"
      :current-page.sync="yhCurrentPage"
      :page-size="Number(pageSize)"
      :layout="showSizes ? allLayout : layout"
      :total="Number(total)"
      :page-sizes="pageSizes"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>
<script>
  import Vue from 'vue'
  import Sortable from 'sortablejs'
  import { formattingMoney } from '../../utils/formatProcess'

  export default {
    name: 'TablePagination',
    props: {
      // 显示全量分页器
      showSizes: {
        type: Boolean,
        default: false
      },
      // 每页显示的数量
      pageSizes: {
        type: Array,
        default: () => [10, 20, 50]
      },
      // 列索引
      cellIndex: {
        type: [Number, String],
        default: null
      },
      // 显示单选
      showRadio: {
        type: [Boolean, String],
        default: false
      },
      // 列索引颜色值
      cellIndexColor: {
        type: String,
        default: '#3880DD'
      },
      // 字典对象
      dictData: {
        type: [Object, String],
        default: () => null
      },
      // 是否显示表格标题，默认false
      showSearchResult: {
        type: [Boolean, String],
        default: false
      },
      // 默认表格标题，‘搜索结果’
      searchResult: {
        type: String,
        default: '查询结果'
      },
      // 是否开启展开
      expand: {
        type: [Boolean, String],
        default: false
      },
      // 分页器大小
      small: {
        type: Boolean,
        default: false
      },
      // 分页器当前页
      nowPage: {
        type: [Number, String],
        default: 1
      },
      // 每页数据数量
      pageSize: {
        type: [Number, String],
        default: 10
      },
      // 表格数据总数
      total: {
        type: [Number, String],
        default: 0
      },
      // 分页器是否采用背景
      background: {
        type: Boolean,
        default: true
      },
      // 表格数据
      tableData: {
        type: Array,
        default: () => []
      },
      // 表格标题配置
      tableHeaderConfig: {
        type: Array,
        default: () => []
      },

      // 多重表格标题配置
      multiTableHeaderConfig: {
        type: Array,
        default: () => []
      },

      // 表格全部配置
      tableAllConfig: {
        type: Array,
        default: () => []
      },
      // 合计自定义处理方法
      // eslint-disable-next-line vue/require-default-prop
      summaryMethod: Function,
      // 合并行或列
      // eslint-disable-next-line vue/require-default-prop
      spanMethod: Function,
      // 表格列位置
      align: {
        type: String,
        default: 'left'
      },
      // 斑马线
      stripe: {
        type: [Boolean, String],
        default: false
      },
      // 边框
      border: {
        type: [Boolean, String],
        default: true
      },
      // 彩色自定义背景 当 stripe 为 true 时,该值不生效
      rowClassName: {
        type: Function,
        default: () => null
      },
      // 高亮当前行
      highlightCurrentRow: {
        type: Boolean,
        default: true
      },
      // 表格高度
      height: {
        type: [Number, String],
        default: null
      },
      // 流体高度
      maxHeight: {
        type: [Number, String],
        default: null
      },
      // 显示合计
      showSummary: {
        type: [Boolean, String],
        default: false
      },
      // 合计默认文字
      sumText: {
        type: String,
        default: '合计'
      },
      // 插槽数组
      operationConfig: {
        type: Object,
        default: () => null
      },
      // 是否开启行拖拽，列拖拽,sortKey关键字
      sortKey: {
        type: String,
        default: ''
      },
      sortHead: {
        type: Array,
        default: function() {
          const $data = this.tableHeaderConfig.length ? this.tableHeaderConfig : this.multiTableHeaderConfig
          return JSON.parse(JSON.stringify($data))
        }
      },
      // 配置id，区分同一页面内不同table
      tableId: {
        type: String,
        default: function() {
          return 'table_' + new Date().getTime()
        }
      },
      filterData: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        selectArray: [],
        radioRow: '', // 单选
        tableCopy: [], // 表格数据副本!!!
        yhCurrentPage: 1,
        dict: Vue.filter('dict'),
        headerCellStyle: {
          fontFamily: 'MicrosoftYaHei',
          fontSize: '15px',
          color: 'rgba(0,0,0,0.73)',
          fontWeight: 'bold',
          // fontWeight: 'normal',
          // fontSize: '14px',
          // color: 'rgba(0,0,0,0.85)',
          lineHeight: '18px',
          backgroundColor: '#f9f9f9'
        },
        singleSelect: '',
        filterType: this.filterData && this.filterData.delimiter || '-'
      }
    },
    computed: {
      layout() {
        if (this.total <= this.pageSize) {
          return 'total, prev, pager, next' // 常规分页器布局
        } else {
          return 'total, prev, pager, next, jumper' // 常规分页器布局
        }
      },
      allLayout() {
        if (this.total <= this.pageSize) {
          return 'sizes, total, prev, pager, next' // 全量分页器布局
        } else {
          return 'sizes, total, prev, pager, next, jumper' // 全量分页器布局
        }
      }
    },
    watch: {
      nowPage: function(item) {
        this.yhCurrentPage = Number(item)
      },
      tableData: function(array) {
        // 清除多选时的数据
        this.selectArray = []
        // 数据刷新时候清除单选数据
        this.$refs[this.tableId].setCurrentRow()
        this.subTableData = JSON.parse(JSON.stringify(array))
        // 内部数据加工值.向外导出时必须删除
        for (let i = 0; i < this.subTableData.length; i++) {
          this.subTableData[i].$_INNERINDEX$ = i
        }
        this.tableCopy = JSON.parse(JSON.stringify(this.subTableData))
        /* 过滤数据 */
        if (this.filterData) {
          this.tableCopy.forEach(item => {
            /* 过滤日期 */
            if (this.filterData.day && this.filterData.day.length > 0) {
              this.filterData.day.forEach(d => {
                item[d] = this.formatDay(item[d], this.filterType)
              })
            }
            /* 过滤时间 */
            if (this.filterData.time && this.filterData.time.length > 0) {
              this.filterData.time.forEach(t => {
                item[t] = this.formatTime(item[t])
              })
            }
            /* 过滤金额 */
            if (this.filterData.money && this.filterData.money.length > 0) {
              this.filterData.money.forEach(m => {
                item[m] = this.formatMoney(item[m])
              })
            }
          })
        }
        /* 数据字典 */
        if (this.dictData != null) {
          this.tableCopy.forEach(item => {
            for (const key in item) {
              if (key in this.dictData) {
                item[key] = this.dict(item[key], this.dictData[key])
              }
            }
          })
        }
      },
      dictData: function(obj) {
        // 清除多选时的数据
        this.selectArray = []
        // 内部数据加工值.向外导出时必须删除
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].$_INNERINDEX$ = i
        }
        this.tableCopy = JSON.parse(JSON.stringify(this.tableData))
        /* 过滤字典 */
        if (obj !== null) {
          this.tableCopy.forEach(item => {
            for (const key in item) {
              if (key in this.dictData) {
                item[key] = this.dict(item[key], this.dictData[key])
              }
            }
          })
        }
        /* 过滤数据 */
        if (this.filterData) {
          this.tableCopy.forEach(item => {
            /* 过滤日期 */
            if (this.filterData.day && this.filterData.day.length > 0) {
              this.filterData.day.forEach(d => {
                item[d] = this.formatDay(item[d], this.filterType)
              })
            }
            /* 过滤时间 */
            if (this.filterData.time && this.filterData.time.length > 0) {
              this.filterData.time.forEach(t => {
                item[t] = this.formatTime(item[t])
              })
            }

            /* 过滤金额 */
            if (this.filterData.money && this.filterData.money.length > 0) {
              this.filterData.money.forEach(m => {
                item[m] = this.formatMoney(item[m])
              })
            }
          })
        }
      },
      tableHeaderConfig: function() {
        const $data = this.tableHeaderConfig.length ? this.tableHeaderConfig : this.multiTableHeaderConfig
        const $sortHead = JSON.parse(JSON.stringify($data))
        this.sortHead.splice(0, this.sortHead.length, ...$sortHead)
        // this.sortKey && this.rowDrop()
        this.sortKey && this.columnDrop()
      }
    },
    created() {
      // 副本操作
      this.subTableData = JSON.parse(JSON.stringify(this.tableData))
      // 内部数据加工值.向外导出时必须删除
      for (let i = 0; i < this.subTableData.length; i++) {
        this.subTableData[i].$_INNERINDEX$ = i
      }
      this.tableCopy = JSON.parse(JSON.stringify(this.subTableData))
      /* 过滤数据 */
      if (this.filterData) {
        this.tableCopy.forEach(item => {
          /* 过滤日期 */
          if (this.filterData.day && this.filterData.day.length > 0) {
            this.filterData.day.forEach(d => {
              item[d] = this.formatDay(item[d], this.filterType)
            })
          }
          /* 过滤时间 */
          if (this.filterData.time && this.filterData.time.length > 0) {
            this.filterData.time.forEach(t => {
              item[t] = this.formatTime(item[t])
            })
          }
          /* 过滤金额 */
          if (this.filterData.money && this.filterData.money.length > 0) {
            this.filterData.money.forEach(m => {
              item[m] = this.formatMoney(item[m])
            })
          }
        })
      }
      /* 数据字典 */
      if (this.dictData != null) {
        this.tableCopy.forEach(item => {
          for (const key in item) {
            if (key in this.dictData) {
              item[key] = this.dict(item[key], this.dictData[key])
            }
          }
        })
      }
    },
    mounted() {
      this.yhCurrentPage = this.nowPage
      // 行拖拽，列拖拽
      this.sortKey && this.rowDrop()
      this.sortKey && this.columnDrop()
    },
    methods: {
      cellStyle({ columnIndex }) {
        if (columnIndex === parseInt(this.cellIndex)) {
          return { color: this.cellIndexColor }
        }
      },
      // 多选项变化的监听---暂存
      /* SelectionChange(selection) {
        this.$emit('selection-change', selection)
      },*/
      // 双击事件
      rowDblclick(row, column, event) {
        const index = this.tableCopy.findIndex(item => {
          return item === row
        })
        // this.$emit('row-dblclick', row, column, event)
        const data = JSON.parse(JSON.stringify(this.subTableData[index]))
        delete data.$_INNERINDEX$
        this.$emit('row-dblclick', data, column, event)
      },
      // // 单选按钮事件 姚远波所做
      // getRadioRow(index, tableData) {
      //   this.$emit('radio', tableData[index])
      // },
      // 多选框: 单选,选中时,两个参数.选中数组与当前row
      select(selection, row) {
        // this.$emit('select', selection, row)
        // 取副本索引
        const index = this.tableCopy.findIndex(item => {
          return item === row
        })
        // 取已选中数据索引,判断是否已选中该数据
        const isIndex = this.selectArray.findIndex(item => {
          return JSON.stringify(item) === JSON.stringify(this.subTableData[index])
        })
        // 判断是否已选中当前行
        if (isIndex < 0) {
          this.selectArray.push(JSON.parse(JSON.stringify(this.subTableData[index])))
        } else { // 已选中删除
          this.selectArray.splice(isIndex, 1)
        }
        const data = JSON.parse(JSON.stringify(this.selectArray))
        const item = JSON.parse(JSON.stringify(this.subTableData[index]))
        for (let i = 0; i < data.length; i++) {
          delete data[i].$_INNERINDEX$
        }
        delete item.$_INNERINDEX$
        this.$emit('select', data, item)
      },
      // 全选，返回数组
      selectAll(selection) {
        // 选中的数据为原始数据.这里取原始的tableData
        // this.$emit('select-all', this.tableData)
        const selectLen = this.selectArray.length
        const tableLen = this.subTableData.length
        // 未全选
        if (selectLen !== tableLen) {
          this.selectArray = JSON.parse(JSON.stringify(this.subTableData))
          const data = JSON.parse(JSON.stringify(this.selectArray))
          for (let i = 0; i < data.length; i++) {
            delete data[i].$_INNERINDEX$
          }
          this.$emit('select-all', data)
        } else { // 已全选
          this.selectArray = []
          this.$emit('select-all', this.selectArray)
        }
        // this.$emit('select-all', selection)
      },
      // 表格当前行改变事件
      tableCurrentChange(currentRow, oldCurrentRow) {
        if (!currentRow) return
        // this.$emit('table-current-change', currentRow, oldCurrentRow)
        const index = this.tableCopy.findIndex(it => {
          return it === currentRow
        })
        const oldIndex = this.tableCopy.findIndex(it => {
          return it === oldCurrentRow
        })
        const now = JSON.parse(JSON.stringify(this.subTableData[index]))
        let old
        if (oldIndex >= 0) {
          old = JSON.parse(JSON.stringify(this.subTableData[oldIndex]))
        } else {
          old = ''
        }
        delete now.$_INNERINDEX$
        delete old.$_INNERINDEX$
        this.$emit('table-current-change', now, old, index, oldIndex)
        this.singleSelect = currentRow && currentRow.__ob__.dep.id
      },
      // 当前页改变Function
      currentChange(now) {
        // 翻页时清空已选中数据
        this.selectArray = []
        this.$emit('current-change', now)
      },
      // 页面条数改变时触发
      sizeChange(pageNumber) {
        this.$emit('size-change', pageNumber)
      },
      /**
       * @return {string}
       */
      Operation(item, row) {
        // return item['func'](row)
        const index = this.tableCopy.findIndex(it => {
          return it === row
        })
        const data = JSON.parse(JSON.stringify(this.subTableData[index]))
        delete data.$_INNERINDEX$
        if (Object.prototype.toString.call(item['func']) === '[object Function]') {
          return item['func'](data, index)
        } else {
          return ''
        }
      },
      // 行拖拽
      rowDrop() {
        const tbody = document.querySelector('#' + this.tableId + ' .el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0]
            _this.tableData.splice(newIndex, 0, currRow)
            // 多选时清除已选中数据
            _this.selectArray = []
            _this.$refs[_this.tableId].setCurrentRow()
            const hoverClass = document.getElementById(_this.tableId).querySelectorAll('.hover-row')
            hoverClass.forEach(item => {
              item.setAttribute('class', 'el-table__row')
            })
            _this.$emit('sort-table-data', _this.tableData)
          }
        })
      },
      // 列拖拽
      columnDrop() {
        const sortReset = this.showRadio ? 1 : 0 // 根据是否开启单选,重置 列拖拽系数
        const wrapperTr = document.querySelector('#' + this.tableId + ' .el-table__header-wrapper tr')
        this.sortable = Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          onEnd: evt => {
            const oldItem = this.sortHead[evt.oldIndex - sortReset]
            this.sortHead.splice(evt.oldIndex - sortReset, 1)
            this.sortHead.splice(evt.newIndex - sortReset, 0, oldItem)
            this.$emit('sort-table-head', this.sortHead)
          }
        })
      },
      // 日期格式化
      formatDay(dateStr, outType = '-', inputType = 'YYYYMMDD') {
        if (dateStr === '0') {
          return ''
        } else if (String(dateStr).length === 8) {
          if (inputType.toLocaleLowerCase() === 'yyyymmdd') {
            const year = String(dateStr).slice(0, 4)
            const month = String(dateStr).slice(4, 6)
            const day = String(dateStr).slice(6, 8)
            if (outType.toLocaleLowerCase() === 'ch') {
              return `${year}年${month}月${day}日`
            } else if (outType.toLocaleLowerCase() === '/') {
              return `${year}/${month}/${day}`
            } else if (outType.toLocaleLowerCase() === '-') {
              return `${year}-${month}-${day}`
            }
          }
        } else if (String(dateStr).length === 6) {
          const year = String(dateStr).slice(0, 4)
          const month = String(dateStr).slice(4, 6)
          if (outType.toLocaleLowerCase() === 'ch') {
            return `${year}年${month}月`
          } else if (outType.toLocaleLowerCase() === '/') {
            return `${year}/${month}`
          } else if (outType.toLocaleLowerCase() === '-') {
            return `${year}-${month}`
          }
        } else {
          return dateStr
        }
      },
      // 时间格式化
      formatTime(timeStr) {
        if (!timeStr) return timeStr
        let str
        if (String(timeStr).length > 6) {
          return timeStr
        } else {
          str = String(timeStr).padStart(6, '0')
        }
        const h = str.slice(0, 2)
        const m = str.slice(2, 4)
        const s = str.slice(4, 6)
        return `${h}:${m}:${s}`
      },
      // 金额格式化
      formatMoney(num) {
        return formattingMoney(num)
      }
    }
  }
</script>
<style scoped lang="scss">
  .table-result-title {
    margin: 0 0 18px;
    display: block;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
  }

  .el-pagination {
    padding: 30px 5px;
    text-align: center;
  }

  .inner {
    width: 5px;
    height: 5px;
    border-color: #409eff;
    background: #ffffff;
    border-radius: 50%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
  }

  .outer {
    margin-left: 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
  }

  .outer:hover {
    border: 1px solid #409eff;
  }

  .check {
    border-color: #409eff;
    background: #409eff;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transition: transform .15s ease-in;

    .inner {
      transform: translate(-50%, -50%) scale(1);
      transition: transform .15s ease-in;
    }
  }

  .venus-table /deep/ {
    .el-table__fixed-footer-wrapper {
      z-index: 2;
    }
    .el-table__body tr.hover-row > td {
      background-color: rgba(56, 128, 221, 0.10);
    }

    .el-table__footer-wrapper tbody td,
    .el-table__fixed-footer-wrapper tbody td {
      background-color: #fff;
    }

    .el-table__footer-wrapper tbody td:first-child .cell {
      font-size: 12px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      line-height: 18px;
    }

    .el-table__footer-wrapper tbody td:first-child ~ td {
      font-size: 14px;
      color: #F78E3D;
    }

    .el-table__fixed::before, .el-table__fixed-right::before {
      z-index: 0;
    }
  }
</style>
