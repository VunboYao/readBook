<template>
  <div>
    <h3 style="text-align:center;">杨浦区2021年度社区工作者招录额度明细表</h3>
    <el-button style="margin: 10px;" type="primary">
      <a
        class="download"
        href="http://124.70.54.235/prod-api/api/demo/admin/postUseInfo/excel2"
        download="杨浦区2021年度社区工作者招录额度明细表"
      >下载</a>
    </el-button>
    <el-table
      border
      :data="tableData"
    >
      <el-table-column
        label="序号"
        align="center"
        prop="street_id"
      />
      <el-table-column
        label="街道"
        align="center"
        prop="name_street"
      />
      <el-table-column
        label="中心社区工作者员额申请数"
        align="center"
        min-width="140"
        prop="centerTotal"
      />
      <el-table-column
        label="专职党群工作者员额申请数"
        align="center"
      >
        <el-table-column
          label="小计"
          prop="specificTotal"
          align="center"
        />
        <el-table-column
          label="两新"
          prop="specific_liangxin"
          align="center"
        />
        <el-table-column
          label="居民区"
          prop="specific_community"
          align="center"
        />
      </el-table-column>
      <el-table-column
        label="居民区社区工作者员额申请数"
        align="center"
        prop="community"
        min-width="140"
      />
      <el-table-column
        prop="total"
        label="员额申请数合计"
        align="center"
        min-width="120"
      />
    </el-table>
  </div>
</template>

<script>
import { DictGet, GetTotal } from '@/api/quotaUseTotal/index'

export default {
  name: 'DetailTable',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.GetTotal()
  },
  methods: {
    GetTotal() {
      GetTotal().then(res => {
        if (res.code == '200') {
          res.data && res.data.forEach(item => {
            item.centerTotal = item.street_acceptance + item.street_other
            item.specificTotal = item.specific_community + item.specific_liangxin
            item.total = item.centerTotal + item.specificTotal + item.community
          })
        }
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
