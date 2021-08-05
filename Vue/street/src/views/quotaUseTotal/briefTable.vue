<template>
  <div>
    <h3 style="text-align:center;">杨浦区2021年度社区工作者招考简章</h3>
    <a
      class="download"
      href="http://124.70.54.235/prod-api/api/demo/admin/postUseInfo/excel3"
      download="杨浦区2021年度社区工作者招考简章"
    >下载</a>
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
      >
        <template slot-scope="scope">
          <span>{{ scope.row.peopleType | dictPeopleType }}</span>
        </template>
      </el-table-column>
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
import { BriefUseTotal } from '@/api/quotaUseTotal/index'
export default {
  name: 'BriefTable',
  filters: {
    dictPeopleType(val) {
      const data = {
        '1': '中心社区工作者',
        '2': '社区专职党群工作者',
        '3': '居民区社区工作者'
      }
      return data[val]
    }
  },
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
          this.tableData = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.download {
  background: #409EFF;
  color: #fff;
  font-size: 14px;
   padding: 12px 20px;
  border-radius: 4px;
  margin: 10px;
  display: inline-block;
}
</style>
