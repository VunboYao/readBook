<template>
  <div class="vue_content">
    <h3 style="text-align:center;">杨浦区2021年度社区工作者招录员额只用申请</h3>
    <el-table
      :data="subTableData"
      border
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
      />
    </el-table>
    <h3 style="text-align:center;">当前员额申请情况</h3>
    <el-table
      :data="QuotaData"
    >
      <el-table-column
        prop="centerTotal"
        label="中心社区工作者员额申请数"
        align="center"
      >
        <!-- <el-table-column
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
    <h3 style="text-align:center;">杨浦区2021年度社区工作者招考简章</h3>
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
      />
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
    <!-- <el-table
      :data="tableData"
      border
      class="table"
      style="width: 100%"
    >
      <el-table-column
        prop="a"
        :label="street+'街道'"
      />
      <el-table-column
        prop="b"
        label="居民区社区工作者"
      />
      <el-table-column
        prop="c"
        label="居民区专职党务工作者"
      />
      <el-table-column
        prop="d"
        label="街道各中心社区工作者：其它中心工作人员"
      />
      <el-table-column
        prop="e"
        label="专职党群工作者：“两新”组织专职党群工作者"
      />
      <el-table-column
        prop="f"
        label="街道各中心社区工作者：受理中心工作人员"
      />
    </el-table> -->
    <div class="flexdiv">
      <span>申请时间：</span>
      <span>{{ gmtCreate }}</span>
    </div>
    <div class="flexdiv">
      <span>审批时间：</span>
      <span>{{ gmtModified }}</span>
    </div>
    <div class="flexdiv">
      <span>状态：</span>
      <el-button v-if="status == 2" type="danger" class="sqbtn" disabled>已拒绝</el-button>
      <el-button v-else-if="status == 1" type="warning" class="sqbtn" @click="routerHandle()">前往添加人员</el-button>

      <el-button v-else-if="status == 3" type="success" class="sqbtn" disabled>已完成</el-button>
    </div>
    <div class="flexdiv">
      <span>原因：</span>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.desc" type="textarea" disabled class="sqbtn" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { queryById, isAdmin } from '@/api/postmanagement/index'
export default {

  components: {},
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
      form: {
        desc: ''
      },
      street: '',
      status: null,
      id: null,
      streetlist1: [],
      joblist1: [],
      category: [],
      countList: [],
      typeName: [],
      gmtCreate: '',
      gmtModified: '',
      isAdmin: null, // 是否管理员
      infoList: []
    }
  },

  mounted() {
    this.street = this.$route.query.street
    this.id = this.$route.query.id
    this.status = this.$route.query.status
    console.log(this.id, 'this.id')
    this.getTableData()
    this.getIsAdmin()
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
      this.form.desc = res.data.remark
      this.gmtCreate = res.data.gmtCreate
      this.gmtModified = res.data.gmtModified
      const list = res.data.infoList
      list.forEach(item => {
        if (item.type_post_id === 11 || item.type_post_id === 12) {
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
          this.subTableData[3]['center'] += item.count
        }
        if (item.type_post_id === 14 || item.type_post_id === 15) {
          // 核定名额数据拼接
          this.subTableData[0]['specific'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['specific'] += item.typesCount
          // 申请人数
          this.subTableData[3]['center'] += item.count
        }
      })
      // 员额余量计算
      this.subTableData[2]['center'] = this.subTableData[0]['center'] - this.subTableData[1]['center']
      this.subTableData[2]['specific'] = this.subTableData[0]['specific'] - this.subTableData[1]['specific']
      this.subTableData[2]['people'] = this.subTableData[0]['people'] - this.subTableData[1]['people']
      this.subTableData[2]['total'] = this.subTableData[0]['total'] - this.subTableData[1]['total']
      this.BriefData = list
    },
    async getIsAdmin() {
      const res = await isAdmin()

      this.isAdmin = res.data
      console.log(this.isAdmin)
    },
    routerHandle() {
      if (!this.isAdmin) {
        this.$router.push({ name: 'addpeople', query: {
          id: this.id,
          infoList: this.infoList
        }})
      }
    }
  }
}
</script>
<style lang='css' scoped>
    .flexdiv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        color: #999;
        padding: 0 100px;
        margin-bottom: 15px;
    }
    .sqbtn {
        width: 200px;
    }
    .table {
        margin-bottom: 15px;
    }
</style>
