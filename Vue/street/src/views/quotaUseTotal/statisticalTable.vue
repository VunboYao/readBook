<template>
  <div>
    <h3 style="text-align:center;">杨浦区2021年度社区工作者招录员额统计表</h3>
    <el-button style="margin: 10px;" type="primary">
      <a
        class="download"
        href="http://124.70.54.235/prod-api/api/demo/admin/postUseInfo/excel1"
        download="杨浦区2021年度社区工作者招录员额统计表"
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
        label="中心社区工作者"
        align="center"
        prop="centerTotal"
      />
      <el-table-column
        label="专职党群工作者"
        align="center"
        prop="specificTotal"
      />
      <el-table-column
        label="居民区社区工作者"
        align="center"
        prop="community"
      />
      <el-table-column
        label="合计"
        align="center"
        prop="total"
      />
    </el-table>
  </div>
</template>

<script>
import { DictGet, GetTotal } from '@/api/quotaUseTotal/index'
export default {
  name: 'StatisticalTable',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    DictGet().then(res => {
      console.log(res, 'dictGet')
    })
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
