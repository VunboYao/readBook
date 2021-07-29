<template>
  <div>
    <h3 style="text-align:center;">杨浦区2021年度社区工作者招考简章</h3>
    <el-table
      border
      stripe
      :data="tableData"
    >
      <el-table-column
        label="单位"
        prop="street"
        align="center"
      />
      <el-table-column
        label="人员分类"
        prop="peopleType"
        align="center"
      />
      <el-table-column
        label="岗位分类"
        prop="typeName"
        align="center"
      />
      <el-table-column
        label="岗位简介"
        prop="content"
        align="center"
      />
      <el-table-column
        label="招聘人数"
        prop="count"
        align="center"
      />
      <el-table-column
        label="面试比例"
        prop="proportion"
        align="center"
      />
      <el-table-column
        label="户籍要求"
        prop="huji"
        align="center"
      />
      <el-table-column
        label="年龄要求"
        prop="nianling"
        align="center"
      />
      <el-table-column
        label="专业要求"
        prop="zhuanye"
        align="center"
      />
      <el-table-column
        label="政治面貌"
        prop="zhengzhimianmao"
        align="center"
      />
      <el-table-column
        label="学历要求"
        prop="xueli"
        align="center"
      />
      <el-table-column
        label="其他条件"
        prop="other"
        align="center"
      />
      <el-table-column
        label="备注"
        prop="remark"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
import { DictGet, BriefUseTotal } from '@/api/quotaUseTotal/index'
export default {
  name: 'BriefTable',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.BriefUseTotal()
  },
  methods: {
    BriefUseTotal() {
      BriefUseTotal(1, 50).then(res => {
        if (res.code == 200) {
          res.data.forEach(item => {
            if (item.type_post_id === 11 || item.type_post_id === 12) {
              item.peopleType = '中心社区工作者'
            }
            if (item.type_post_id === 13) {
              item.peopleType = '社区专职党群工作者'
            }
            if (item.type_post_id === 14 || item.type_post_id === 15) {
              item.peopleType = '居民区社区工作者'
            }
          })
          this.tableData = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
