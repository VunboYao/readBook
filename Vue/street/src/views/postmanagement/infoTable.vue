<template>
  <div>
    <el-table
      show-summary
      :data="tableData"
      border
    >
      <el-table-column
        label="序号"
        prop="street_id"
        width="50"
      />
      <el-table-column
        label="街道"
        align="center"
        prop="name_street"
      />
      <!--      中心社区工作者-->
      <el-table-column
        prop="street_center"
        label="中心社区工作者"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.modifyFlag">{{ scope.row.street_center }}</span>
          <el-input v-else v-model="scope.row.street_center" type="text" />
        </template>
        <!-- <el-table-column
          prop="street_acceptance"
          label="受理中心工作人员"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row.modifyFlag">{{ scope.row.street_acceptance }}</span>
            <el-input v-else v-model="scope.row.street_acceptance" type="text" />
          </template>
        </el-table-column>
        <el-table-column
          prop="street_other"
          label="其他中心工作人员"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row.modifyFlag">{{ scope.row.street_other }}</span>
            <el-input v-else v-model="scope.row.street_other" type="text" />
          </template>
        </el-table-column> -->
      </el-table-column>
      <!--      专职党群工作者-->
      <el-table-column
        label="专职党群工作者"
        align="center"
      >
        <el-table-column
          prop="specific_liangxin"
          label="&quot;两新&quot;组织专职党群工作者"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row.modifyFlag">{{ scope.row.specific_liangxin }}</span>
            <el-input v-else v-model="scope.row.specific_liangxin" type="text" />
          </template>
        </el-table-column>
        <el-table-column
          prop="specific_community"
          label="居民区专职党务工作者（含居民区党组织副书记）"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row.modifyFlag">{{ scope.row.specific_community }}</span>
            <el-input v-else v-model="scope.row.specific_community" type="text" />
          </template>
        </el-table-column>
      </el-table-column>
      <!--      居民区社区工作者-->
      <el-table-column
        label="居民区社区工作者（聘任制居委干部、选任制居委干部或党组织班子成员）"
        align="center"
        prop="community"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.modifyFlag">{{ scope.row.community }}</span>
          <el-input v-else v-model="scope.row.community" type="text" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        min-width="80"
      >
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.modifyFlag"
            type="primary"
            size="small"
            @click="onModify(scope.row)"
          >编辑</el-button>
          <span v-else>
            <el-button
              type="info"
              size="small"
              @click="onCancel"
            >取消</el-button>
            <el-button
              type="success"
              size="small"
              @click="onConfirm(scope.row)"
            >确认</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { modifyStreetInfo } from '@/api/postmanagement'
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
    },
    searchFun: {
      type: Function,
      default: () => null
    }
  },
  methods: {
    onConfirm(row) {
      console.log(row, '>>>>')
      modifyStreetInfo(row).then(res => {
        console.log(res, 'callback for res')
        // 重新执行查询
        this.searchFun()
      })
    },
    onCancel() {
      this.$confirm('此操作将取消当前正在维护的所有数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.searchFun()
        this.$message({
          type: 'success',
          message: '取消成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '继续编辑'
        })
      })
    },
    onModify(row) {
      console.log(row)
      row.modifyFlag = true
    },
    // 合并表格头
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 14) {
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
    }
    /*  // 表格行颜色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'table-color'
      } else {
        return ''
      }
    },
    // 表格列颜色
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2 || columnIndex === 5 || columnIndex === 8 || columnIndex === 11 || columnIndex === 14) {
        return 'table-color'
      } else {
        return
      }
    } */
  }
}
</script>

<style lang="scss">
.el-table-desc{
   .table-color {
    background: rgb(187, 203, 225);
  }
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgb(187, 203, 225) !important;
  }

</style>
