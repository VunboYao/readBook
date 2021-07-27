<template>
  <div id="commonTable">
    <el-table
      id="exTeltable"
      :data="data"
      :max-height="maxHeight"
      :row-class-name="rowClassName"
      border
      stripe
      tooltip-effect="light"
      @selection-change="handleSelectionChange"
      @cell-dblclick="celldblclick"
      @row-dblclick="rowDblclick"
      @row-click="rowClick"
    >
      <slot name="tu_img" />
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.show != false"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :type="item.type || ''"
          :align="item.align ? item.align : 'center'"
          :width="item.width"
          :formatter="item.formatter ? item.formatter : formatterValue"
        />
      </template>
      <slot name="table_oper" />
    </el-table>
    <el-pagination
      v-if="showPage"
      style="text-align: center; margin: 20px 0"
      :current-page="pager.pageNo"
      :page-size="pager.limit"
      :page-sizes="pager.sizes"
      :total="pager.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    showPage: {
      type: Boolean,
      default: true
    },
    columns: Array,
    data: Array,
    pager: Object,
    maxHeight: {
      type: Number,
      default: 700
    },
    rowClassName: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    formatterValue(row, column, cellValue) {
      return cellValue
    },
    celldblclick(val) {
      this.$emit('celldblclick', val)
    },
    rowDblclick(row, column, event) {
      this.$emit('row-dblclick', { row, column, event })
    },
    rowClick(row, column, event) {
      this.$emit('row-click', { row, column, event })
    }
  }
}
</script>
