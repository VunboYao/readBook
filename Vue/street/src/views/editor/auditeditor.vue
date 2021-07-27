<template>
  <div class="vue_content">
    <h3 style="text-align:center;">杨浦区2021年度社区工作者招录员额只用申请</h3>
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
    <h3 style="text-align:center;">当前员额申请情况</h3>
    <el-table
      :data="QuotaData"
    >
      <el-table-column
        label="中心社区工作者员额申请数"
        align="center"
      >
        <el-table-column
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
        />
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
      :span-method="objectSpanMethod"
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
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.zhengzhimianmao">
            <el-option value="不限" label="不限" />
            <el-option value="中共党员" label="中共党员" />
            <el-option value="群众" label="群众" />
            <el-option value="共青团员" label="共青团员" />
            <el-option value="民主党派" label="民主党派" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="xueli"
        label="学历要求"
        align="center"
        min-width="120"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.xueli">
            <el-option value="大专及以上" label="大专及以上" />
            <el-option value="本科" label="本科" />
            <el-option value="本科及以上" label="本科及以上" />
            <el-option value="研究生" label="研究生" />
          </el-select>
        </template>
      </el-table-column>
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
    <!--  <el-table
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
        prop="f"
        label="街道各中心社区工作者：受理中心工作人员"
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
        prop="c"
        label="居民区专职党务工作者"
      />
      <el-table-column
        prop="b"
        label="居民区社区工作者"
      />
    </el-table> -->
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
      BriefData: [
        {
          street: '',
          peopleTypeId: 'center',
          peopleType: '中心社区工作者',
          typeName: '受理中心社区工作者', // 岗位分类
          content: '', // 岗位简介
          count: null, // 申请数量
          proportion: '',
          huji: '',
          nianling: '',
          zhuanye: '',
          zhengzhimianmao: '不限',
          xueli: '本科',
          other: '',
          remark: '',
          type_post_id: 11
        },
        {
          street: '',
          peopleTypeId: 'center',
          peopleType: '中心社区工作者',
          typeName: '其他中心社区工作', // 岗位分类
          content: '', // 岗位简介
          count: null, // 申请数量
          proportion: '',
          huji: '',
          nianling: '',
          zhuanye: '',
          zhengzhimianmao: '不限',
          xueli: '本科',
          other: '',
          remark: '',
          type_post_id: 12
        },
        {
          street: '',
          peopleTypeId: 'specific',
          peopleType: '社区专职党群工作者',
          typeName: '“两新”组织专职党群工作者', // 岗位分类
          content: '', // 岗位简介
          count: null, // 申请数量
          proportion: '',
          huji: '',
          nianling: '',
          zhuanye: '',
          zhengzhimianmao: '中共党员',
          xueli: '本科',
          other: '',
          remark: '',
          type_post_id: 14
        },
        {
          street: '',
          peopleTypeId: 'specific',
          peopleType: '社区专职党群工作者',
          typeName: '居民区专职党务工作者', // 岗位分类
          content: '', // 岗位简介
          count: null, // 申请数量
          proportion: '',
          huji: '',
          nianling: '',
          zhuanye: '',
          zhengzhimianmao: '中共党员',
          xueli: '本科',
          other: '',
          remark: '',
          type_post_id: 15
        },
        {
          street: '',
          peopleTypeId: 'people',
          peopleType: '居民区社区工作者',
          typeName: '居民区社区工作者', // 岗位分类
          content: '', // 岗位简介
          count: null, // 申请数量
          proportion: '',
          huji: '',
          nianling: '',
          zhuanye: '',
          zhengzhimianmao: '不限',
          xueli: '本科',
          other: '',
          remark: '',
          type_post_id: 13
        }
      ],
      tableData: [
        {
          a: '编制基数',
          b: '',
          c: '',
          d: '',
          e: '',
          f: ''
        },
        {
          a: '在岗人数',
          b: '',
          c: '',
          d: '',
          e: '',
          f: ''
        },
        {
          a: '空编数',
          b: '',
          c: '',
          d: '',
          e: '',
          f: ''
        },
        {
          a: '额度申请',
          b: '0',
          c: '0',
          d: '0',
          e: '0',
          f: '0'
        }
      ],
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
      list.forEach(item => {
        if (item.type_post_id === 11 || item.type_post_id === 12) {
          // 核定名额数据拼接
          this.subTableData[0]['center'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['center'] += item.typesCount
          // 申请人数
          this.subTableData[3]['center'] += item.count
          // 简章详情数据拼接
          const index = this.BriefData.findIndex(Element => {
            return Element.type_post_id === item.type_post_id
          })
          // 对数据的名称做个过滤处理
          item.peopleType = '中心社区工作者'
          item.peopleTypeId = 'center'
          item.typeName = item.type_post_id === 11 ? '受理中心社区工作者' : '其他中心社区工作'
          this.BriefData[index] = item
        }
        if (item.type_post_id === 13) {
          // 核定名额数据拼接
          this.subTableData[0]['people'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['people'] += item.typesCount
          // 申请人数
          this.subTableData[3]['center'] += item.count
          // 简章详情数据拼接
          const index = this.BriefData.findIndex(Element => {
            return Element.type_post_id === item.type_post_id
          })
          // 对数据的名称做个过滤处理
          item.peopleType = '居民区社区工作者'
          item.typeName = '居民区社区工作者'
          item.peopleTypeId = 'people'
          this.BriefData[index] = item
        }
        if (item.type_post_id === 14 || item.type_post_id === 15) {
          // 核定名额数据拼接
          this.subTableData[0]['specific'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['specific'] += item.typesCount
          // 申请人数
          this.subTableData[3]['center'] += item.count
          // 简章详情数据拼接
          const index = this.BriefData.findIndex(Element => {
            return Element.type_post_id === item.type_post_id
          })
          // 对数据的名称做个过滤处理
          item.peopleType = '社区专职党群工作者'
          item.peopleTypeId = 'specific'
          item.typeName = item.type_post_id === 14 ? '“两新”组织专职党群工作者' : '居民区专职党务工作者'
          this.BriefData[index] = item
        }
      })
      // 强制更新数据层
      this.BriefData = JSON.parse(JSON.stringify(this.BriefData))
      // 员额余量计算
      this.subTableData[2]['center'] = this.subTableData[0]['center'] - this.subTableData[1]['center']
      this.subTableData[2]['specific'] = this.subTableData[0]['specific'] - this.subTableData[1]['specific']
      this.subTableData[2]['people'] = this.subTableData[0]['people'] - this.subTableData[1]['people']
      this.subTableData[2]['total'] = this.subTableData[0]['total'] - this.subTableData[1]['total']
      // 额度明细表数据处理
      this.BriefData.forEach(item => {
        if (item.peopleTypeId === 'center') {
          const count1 = parseInt(this.BriefData[0]['count']) || 0
          const count2 = parseInt(this.BriefData[1]['count']) || 0
          this.QuotaData[0]['centerTotal'] = count1 + count2
          this.QuotaData[0]['centerApply'] = count1
          this.QuotaData[0]['centerOther'] = count2
        } else if (item.peopleTypeId === 'specific') {
          const count1 = parseInt(this.BriefData[2]['count']) || 0
          const count2 = parseInt(this.BriefData[3]['count']) || 0
          this.QuotaData[0]['specificTotal'] = count1 + count2
          this.QuotaData[0]['specificTwo'] = count1
          this.QuotaData[0]['specificPeople'] = count2
        } else if (item.peopleTypeId === 'people') {
          const count1 = parseInt(this.BriefData[this.BriefData.length - 1]['count']) || 0
          console.log(this.QuotaData, this.QuotaData[0]['personTotal'])
          this.QuotaData[0]['personTotal'] = count1
        }
      })
      this.QuotaData = JSON.parse(JSON.stringify(this.QuotaData))
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
