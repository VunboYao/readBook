<template>
  <div>
    <el-table
      show-summary
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      stripe
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      />
      <el-table-column
        label="街道"
        align="center"
        prop="street"
        min-width="114"
      />
      <el-table-column
        label="中心社区工作者"
        align="center"
      >
        <el-table-column
          label="员额基数"
          align="center"
          prop="communityQuota"
        >
          <!-- <el-table-column
            prop="communityQuota"
            label="合计"
            align="center"
            min-width="50"
          />
          <el-table-column
            prop="communityCenterQuota"
            label="受理中心"
            align="center"
            min-width="80"
          />
          <el-table-column
            prop="communityOtherQuota"
            label="其他中心"
            align="center"
            min-width="80"
          /> -->
        </el-table-column>
        <el-table-column
          label="实有人数"
          align="center"
          prop="communityWorker"
        >
          <!-- <el-table-column
            prop="communityWorker"
            label="合计"
            align="center"
            min-width="50"
          />
          <el-table-column
            prop="communityCenterWorker"
            label="受理中心"
            align="center"
            min-width="80"
          />
          <el-table-column
            prop="communityOtherWorker"
            label="其他中心"
            align="center"
            min-width="80"
          /> -->
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="专职党群工作者"
        align="center"
      >
        <el-table-column
          label="员额基数"
          align="center"
        >
          <el-table-column
            prop="partyQuota"
            label="合计"
            align="center"
            min-width="50"
          />
          <el-table-column
            prop="partyDoubleNewQuota"
            label="&quot;两新&quot;"
            align="center"
            min-width="66"
          />
          <el-table-column
            prop="partyResidenceQuota"
            label="居民区"
            align="center"
            min-width="70"
          />
        </el-table-column>
        <el-table-column
          align="center"
          label="实有人数"
        >
          <el-table-column
            prop="partyWorker"
            label="合计"
            align="center"
            min-width="50"
          />
          <el-table-column
            prop="partyDoubleNewWorker"
            label="&quot;两新&quot;"
            align="center"
            min-width="66"
          />
          <el-table-column
            prop="partyResidenceWorker"
            label="居民区"
            align="center"
            min-width="70"
          />
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="居民区社区工作者"
        align="center"
      >
        <el-table-column
          prop="allTotal"
          label="员额基数"
          align="center"
          min-width="70"
        />
        <el-table-column
          label="实有人数"
          align="center"
        >
          <el-table-column
            prop="residenceWorker"
            label="合计"
            align="center"
            min-width="50"
          />
          <el-table-column
            prop="residenceWorker_num_xuanren"
            label="选任制"
            align="center"
            min-width="70"
          />
          <el-table-column
            prop="residenceWorker_num_pinren"
            label="聘任制"
            align="center"
            min-width="70"
          />
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="totalWorker"
        label="总人数"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'InfoTable',
  props: {
    dataTotal: {
      type: Number,
      default: 0
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 10) {
        if (rowIndex === 0) {
          return {
            rowspan: this.dataTotal,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 表格颜色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'table-color'
      } else {
        return ''
      }
    },
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2 || columnIndex === 5 || columnIndex === 8 || columnIndex === 11 || columnIndex === 14) {
        return 'table-color'
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss">
.el-table-desc{
   .table-color {
     color: #222;
     background: rgb(204, 218, 238);
  }
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
    background: rgb(204, 218, 238);
    color: #222;
  }

</style>
