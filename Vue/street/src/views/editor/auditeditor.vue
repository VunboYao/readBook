<template>
  <div class="vue_content">
    <h3 style="text-align:center;">杨浦区2021年度社区工作者招录员额使用申请
      <a
        class="download"
        :href="'http://124.70.54.235/prod-api/api/demo/admin/postUse/queryExcel1ById?id=' + id"
        download="杨浦区2021年度社区工作者招录员额统计表"
      >下载</a>
    </h3>
    <el-table
      :data="subTableData"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="type"
        :label="street+'街道'"
      />
      <el-table-column
        prop="center"
        label="中心社区工作者"
        align="center"
      />
      <el-table-column
        prop="specific"
        label="专职党群工作者"
        align="center"
      />
      <el-table-column
        prop="people"
        label="居民区社区工作者"
        align="center"
      />
      <el-table-column
        prop="total"
        label="合计"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ onTotal(scope) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <h3 style="text-align:center;">当前员额申请情况
      <a
        class="download"
        :href="'http://124.70.54.235/prod-api/api/demo/admin/postUse/queryExcel2ById?id=' + id"
        download="杨浦区2021年度社区工作者招录员额统计表"
      >下载</a>
    </h3>
    <el-table
      :data="QuotaData"
    >
      <el-table-column
        label="中心社区工作者员额申请数"
        prop="centerTotal"

        align="center"
      >
        <!--  <el-table-column
          prop="centerTotal"
          label="小计"
          align="center"
        />
        <el-table-column
          prop="centerApply"
          label="受理中心"
          align="center"
        />
        <el-table-column
          prop="centerOther"
          label="其他中心"
          align="center"
        /> -->
      </el-table-column>
      <el-table-column
        label="专职党群工作者员额申请数"
        align="center"
      >
        <el-table-column
          prop="specificTotal"
          label="小计"
          align="center"
        />
        <el-table-column
          prop="specificTwo"
          label="“两新”"
          align="center"
        />
        <el-table-column
          prop="specificPeople"
          label="居民区"
          align="center"
        />
      </el-table-column>
      <el-table-column
        prop="personTotal"
        label="居民社区工作者员额申请数"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.personTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="total"
        label="员额申请数合计"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ onTotalQuota(scope) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <h3 style="text-align:center;">杨浦区2021年度社区工作者招考简章
      <a
        class="download"
        :href="'http://124.70.54.235/prod-api/api/demo/admin/postUse/queryExcel3ById?id=' + id"
        download="杨浦区2021年度社区工作者招录员额统计表"
      >下载</a>
    </h3>
    <el-table
      :data="BriefData"
      border
      class="table"
    >
      <el-table-column
        prop="street"
        label="单位"
        align="center"
      />
      <el-table-column
        prop="peopleType"
        label="人员分类"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.peopleType | dictPeopleType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="岗位分类"
        align="center"
      />
      <el-table-column
        prop="content"
        label="岗位简介"
        align="center"
        min-width="200"
      />
      <el-table-column
        prop="count"
        label="招聘人数"
        align="center"
        min-width="120"
      />
      <el-table-column
        prop="proportion"
        label="面试比例"
        align="center"
      />
      <el-table-column
        prop="huji"
        label="户籍要求"
        align="center"
        min-width="200"
      />
      <el-table-column
        prop="nianling"
        label="年龄要求"
        align="center"
        min-width="100"
      />
      <el-table-column
        prop="zhuanye"
        label="专业要求"
        align="center"
        min-width="140"
      />
      <el-table-column
        prop="zhengzhimianmao"
        label="政治面貌"
        align="center"
        min-width="100"
      />
      <el-table-column
        prop="xueli"
        label="学历要求"
        align="center"
        min-width="120"
      />
      <el-table-column
        prop="other"
        label="其他条件"
        align="center"
        min-width="120"
      />
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
        min-width="120"
      />
    </el-table>
    <div class="flexdiv">
      <span>申请时间：</span>
      <span>{{ creatTime }}</span>
    </div>
    <div v-if="isAdmin" class="flexbtn">
      <el-button type="success" class="sqbtn" @click="agreeHandle()">同意</el-button>
      <el-button type="danger" class="sqbtn" @click="dialogShow()">拒绝</el-button>
    </div>
    <el-dialog
      title="拒绝申请"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="form">
        <el-form-item label="请填写拒绝原因">
          <el-input v-model="form.value" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="refuseHandle()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryById, audit, isAdmin } from '@/api/postmanagement/index'
export default {
  components: {},
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
      // 总额度页面拼接数据
      subTableData: [
        {
          type: '员额基数（名）',
          center: 0,
          specific: 0,
          people: 0,
          total: 0
        },
        {
          type: '实有人数（人）',
          center: 0,
          specific: 0,
          people: 0,
          total: 0
        },
        {
          type: '员额余量（名）',
          center: 0,
          specific: 0,
          people: 0,
          total: 0
        },
        {
          type: '员额申请（名）',
          center: 0,
          specific: 0,
          people: 0,
          total: 0,
          show: true
        }
      ],
      // 额度统计数据
      QuotaData: [
        {
          centerTotal: 0,
          centerApply: 0,
          centerOther: 0,
          specificTotal: 0,
          specificTwo: 0,
          specificPeople: 0,
          personTotal: 0,
          total: 0
        }
      ],
      // 招考简章数据
      BriefData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 50, 100],
        total: 0
      },
      dialogVisible: false,
      form: {
        value: ''
      },
      streetlist1: [],
      joblist1: [],
      category: [],
      countList: [],
      street: '',
      id: null,
      creatTime: '',
      isAdmin: null // 是否为管理员
    }
  },
  created() {
    this.getIsAdmin()
  },
  mounted() {
    this.street = this.$route.query.street
    this.id = this.$route.query.id
    this.getTableData()
  },
  methods: {
    // 招生简章的合并处理
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 1) {
        if (rowIndex === 0 || rowIndex === 2) {
          return [2, 1]
        } else if (rowIndex === 4) {
          return [1, 1]
        } else {
          return [0, 0]
        }
      }
    },
    dialogShow() {
      this.dialogVisible = true
    },
    // 额度明细统计
    onTotalQuota(scope) {
      const t1 = parseInt(scope.row.centerTotal)
      const t2 = parseInt(scope.row.specificTotal)
      const t3 = parseInt(scope.row.personTotal)
      return t1 + t2 + t3
    },
    async getTableData() {
      const res = await queryById(this.id)
      this.creatTime = res.data.gmtCreate
      const list = res.data.infoList
      let centerCount = 0 // 中心社区申额
      let twoNewCount = 0 // 两新
      let specificPeopleCount = 0 // 专职居民区申额
      let peopleCount = 0 // 居民社区工作者
      const centerArr = [11, 16, 17, 18, 19]
      const peopleArr = [13]
      list.forEach((item, index) => {
        if (centerArr.includes(item.type_post_id)) {
          // 核定名额数据拼接
          this.subTableData[0]['center'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['center'] += item.typesCount
          // 申请人数
          this.subTableData[3]['center'] += item.count
        }
        if (item.type_post_id === 13) {
          // 核定名额数据拼接
          this.subTableData[0]['people'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['people'] += item.typesCount
          // 申请人数
          this.subTableData[3]['people'] += item.count
        }
        if (item.type_post_id === 14 || item.type_post_id === 15) {
          // 核定名额数据拼接
          this.subTableData[0]['specific'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['specific'] += item.typesCount
          // 申请人数
          this.subTableData[3]['specific'] += item.count
        }
        // 当前员额申请情况
        if (item.peopleType === '1') {
          if (centerArr.includes(item.type_post_id)) {
            centerCount += parseInt(item.count) || 0
          }
          this.QuotaData[0]['centerTotal'] = centerCount
        } else if (item.peopleType === '2') {
          if (item.type_post_id === 14) {
            twoNewCount += parseInt(item.count) || 0
          }
          if (item.type_post_id === 15) {
            specificPeopleCount += parseInt(item.count) || 0
          }
          this.QuotaData[0]['specificTotal'] = twoNewCount + specificPeopleCount
          this.QuotaData[0]['specificTwo'] = twoNewCount
          this.QuotaData[0]['specificPeople'] = specificPeopleCount
        } else {
          if (peopleArr.includes(item.type_post_id)) {
            peopleCount += parseInt(item.count) || 0
          }
          this.QuotaData[0]['personTotal'] = peopleCount
        }
      })
      // 员额余量计算
      this.subTableData[2]['center'] = this.subTableData[0]['center'] - this.subTableData[1]['center']
      this.subTableData[2]['specific'] = this.subTableData[0]['specific'] - this.subTableData[1]['specific']
      this.subTableData[2]['people'] = this.subTableData[0]['people'] - this.subTableData[1]['people']
      this.subTableData[2]['total'] = this.subTableData[0]['total'] - this.subTableData[1]['total']
      this.BriefData = list
    },
    // 计算总额
    onTotal(scope) {
      const specific = parseInt(scope.row.specific)
      const people = parseInt(scope.row.people)
      const center = parseInt(scope.row.center)
      this.subTableData[this.subTableData.length - 1]['total'] = specific + people + center
      return specific + people + center
    },
    // 同意申请
    async agreeHandle() {
      const res = await audit(this.id, 1)
      console.log(res, 'res')
      if (res.code == '200') {
        this.$message.success('同意申请成功')
        this.$router.push({ name: 'selectauditeditor' })
        //    this.getTableData()
      }
    },
    // 拒绝申请
    async refuseHandle() {
      const res = await audit(this.id, 2, this.form.value)
      console.log(res, 'rws')
      if (res.code == '200') {
        this.$message.success('拒绝申请成功')
        this.$router.push({ name: 'selectauditeditor' })
        //    this.getTableData()
      }
      this.dialogVisible = false
    },
    async getIsAdmin() {
      const res = await isAdmin()
      this.isAdmin = res.data
    }
  }
}
</script>
<style lang='css' scoped>
.download {
  background: #409EFF;
  color: #fff;
  font-size: 14px;
    padding: 12px 20px;
  border-radius: 4px;
  display: inline-block;
  margin: 10px;
}
    .flexdiv {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #999;
        padding: 0 100px;
    }
    .flexbtn {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding: 0 100px;
    }
    .sqbtn {
        width: 300px;
    }
    .table {
        margin-bottom: 15px;
    }
</style>
