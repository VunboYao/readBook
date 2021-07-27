<template>
  <div>
    <div v-show="!descPage" class="vue_content">
      <h3 style="text-align:center;">杨浦区2021年度社区工作者招录员额只用申请</h3>
      <el-table
        :data="subTableData"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="type"
        />
        <el-table-column
          prop="center"
          label="中心社区工作者"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.show"
              v-model="scope.row.center"
              placeholder="请输入申请人数"
              @input="onInput(scope, 'center')"
            />
            <span v-show="!scope.row.show">{{ scope.row.center }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="specific"
          label="专职党群工作者"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.show"
              v-model="scope.row.specific"
              placeholder="请输入申请人数"
              @input="onInput(scope, 'specific')"
            />
            <span v-show="!scope.row.show">{{ scope.row.specific }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="people"
          label="居民区社区工作者"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.show"
              v-model="scope.row.people"
              placeholder="请输入申请人数"
              @input="onInput(scope, 'people')"
            />
            <span v-show="!scope.row.show">{{ scope.row.people }}</span>
          </template>
        </el-table-column>
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
      <div class="fdiv">
        <el-button type="primary" class="sqbtn" round @click="onNext">下一步</el-button>
      </div>
    </div>
    <!-- 详情配置界面 -->
    <div v-show="descPage" class="vue_content">
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
      <h1 style="text-align:center;">杨浦区2021年度社区工作者招考简章</h1>
      <el-table
        :data="BriefData"
        :span-method="objectSpanMethod"
        border
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
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.content"
              type="textarea"
              placeholder=""
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="招聘人数"
          align="center"
          min-width="120"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.count"
              type="tel"
              placeholder=""
              clearable
              @input="onCountChange(scope)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="proportion"
          label="面试比例"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.proportion"
              type="text"
              placeholder=""
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="huji"
          label="户籍要求"
          align="center"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.huji"
              type="textarea"
              placeholder=""
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="nianling"
          label="年龄要求"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.nianling"
              type="textarea"
              placeholder=""
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="zhuanye"
          label="专业要求"
          align="center"
          min-width="140"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.zhuanye"
              type="textarea"
              placeholder=""
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="zhengzhimianmao"
          label="政治面貌"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-select v-if="onShowZZMM(scope)" v-model="scope.row.zhengzhimianmao">
              <el-option value="中共党员" label="中共党员" />
            </el-select>
            <el-select v-else v-model="scope.row.zhengzhimianmao">
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
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.other"
              type="textarea"
              placeholder=""
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
          min-width="120"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.remark"
              type="textarea"
              placeholder=""
            />
          </template>
        </el-table-column>
      </el-table>
      <p class="operation">
        <el-button type="success" @click="obBackStatistics">返回额度统计表</el-button>
        <el-button type="info">暂存</el-button>
        <el-button type="primary" @click="onConfirm">提交</el-button>
      </p>
    </div>
  </div>

</template>

<script>
import {
  queryEditor,
  postUseApplication,
  getUserInfo,
  ApplyApplication } from '@/api/postmanagement/index'
export default {
  name: 'Addeditor',
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
      // 详情明细界面switch
      descPage: false,
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
      outerVisible: false,
      EDITUSER: '新增岗位',
      form: {
        count: 0,
        typeName: ''
      },
      streetlist1: [], // 岗位数量
      joblist1: [], // 在编人数
      formLabelWidth: '120px',
      category: [], // 岗位类别
      street: ''
    }
  },
  created() {
    this.getUserInfo()
    this.getTableData()
  },
  methods: {
    // 返回额度统计界面
    obBackStatistics() {
      this.descPage = false
      this.BriefData = [
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
          type_post_id: null
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
          type_post_id: null
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
          type_post_id: null
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
          type_post_id: null
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
          type_post_id: null
        }
      ]
      this.QuotaData = [
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
      ]
    },
    // 提交确认
    onConfirm() {
      this.BriefData.forEach(item => {
        if (!item.count) {
          item.count = '0'
        }
      })
      ApplyApplication({ infoList: this.BriefData }).then(res => {
        if (res.code == 200) {
          this.subTableData = [
            {
              type: '核定员额（名）',
              center: 0,
              specific: 0,
              people: 0,
              total: 0
            },
            {
              type: '实际在岗（人）',
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
          ]
          this.getTableData()
          this.descPage = false
          this.$message({
            type: 'success',
            message: '额度申请：新增成功'
          })
        }
      })
    },
    // 额度明细统计
    onTotalQuota(scope) {
      const t1 = parseInt(scope.row.centerTotal)
      const t2 = parseInt(scope.row.specificTotal)
      const t3 = parseInt(scope.row.personTotal)
      return t1 + t2 + t3
    },
    // 计算人数问题
    onCountChange(scope) {
      if (scope.row.peopleTypeId === 'center') {
        const total = this.subTableData[this.subTableData.length - 1]['center']
        const count1 = parseInt(this.BriefData[0]['count']) || 0
        const count2 = parseInt(this.BriefData[1]['count']) || 0
        this.QuotaData[0]['centerTotal'] = count1 + count2
        this.QuotaData[0]['centerApply'] = count1
        this.QuotaData[0]['centerOther'] = count2
        this.msgTip(scope.row.peopleType, total, count1 + count2)
      } else if (scope.row.peopleTypeId === 'specific') {
        const total = this.subTableData[this.subTableData.length - 1]['specific']
        const count1 = parseInt(this.BriefData[2]['count']) || 0
        const count2 = parseInt(this.BriefData[3]['count']) || 0
        this.QuotaData[0]['specificTotal'] = count1 + count2
        this.QuotaData[0]['specificTwo'] = count1
        this.QuotaData[0]['specificPeople'] = count2
        this.msgTip(scope.row.peopleType, total, count1 + count2)
      } else if (scope.row.peopleTypeId === 'people') {
        const total = this.subTableData[this.subTableData.length - 1]['people']
        const count1 = parseInt(this.BriefData[this.BriefData.length - 1]['count']) || 0
        console.log(this.QuotaData, this.QuotaData[0]['personTotal'])
        this.QuotaData[0]['personTotal'] = count1
        this.msgTip(scope.row.peopleType, total, count1)
      }
    },
    msgTip(typeName, count, total) {
      if (total > count) {
        this.$message({
          type: 'warning',
          showClose: true,
          duration: 5000,
          message: `${typeName}：员额申请为${count}（名）,当前为${total}（名）,已超出!!!`
        })
      }
    },
    // 政治面貌判断
    onShowZZMM(scope) {
      return scope.row.typeName === '“两新”组织专职党群工作者' || scope.row.typeName === '居民区专职党务工作者'
    },
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
    onNext() {
      if (this.subTableData[this.subTableData.length - 1]['total'] <= 0) {
        this.$message({
          type: 'warning',
          message: '请填写申请员额'
        })
        return
      }
      this.descPage = true
      this.BriefData.forEach(element => {
        element.street = this.street
      })
    },
    // 监听申请时输入的数据
    onInput(scope, type) {
      const specific = scope.row[type] ? parseInt(scope.row[type]) : 0
      const freeTotal = this.subTableData[2][type]
      if (specific > freeTotal) {
        this.$message({
          type: 'warning',
          message: '员额申请名额不能大于员额余量',
          showClose: true
        })
        scope.row[type] = freeTotal > 0 ? freeTotal : 0
      } else {
        scope.row[type] = parseInt(specific)
      }
    },
    // 计算总额
    onTotal(scope) {
      const specific = parseInt(scope.row.specific)
      const people = parseInt(scope.row.people)
      const center = parseInt(scope.row.center)
      this.subTableData[this.subTableData.length - 1]['total'] = specific + people + center
      return specific + people + center
    },
    async getUserInfo() {
      const res = await getUserInfo()
      this.street = res.data.street
    },
    async getTableData() {
      const res = await queryEditor()
      if (!res.data) return
      res.data.forEach((item, index) => {
        if (item.type_post_id === 11 || item.type_post_id === 12) {
          // 核定名额数据拼接
          this.subTableData[0]['center'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['center'] += item.typesCount
        }
        if (item.type_post_id === 13) {
          // 核定名额数据拼接
          this.subTableData[0]['people'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['people'] += item.typesCount
        }
        if (item.type_post_id === 14 || item.type_post_id === 15) {
          // 核定名额数据拼接
          this.subTableData[0]['specific'] += item.postCount
          // 实际在岗数据拼接
          this.subTableData[1]['specific'] += item.typesCount
        }
      })
      // 员额余量计算
      this.subTableData[2]['center'] = this.subTableData[0]['center'] - this.subTableData[1]['center']
      this.subTableData[2]['specific'] = this.subTableData[0]['specific'] - this.subTableData[1]['specific']
      this.subTableData[2]['people'] = this.subTableData[0]['people'] - this.subTableData[1]['people']
      this.subTableData[2]['total'] = this.subTableData[0]['total'] - this.subTableData[1]['total']
    },
    application() {
      let infoList = []
      infoList.push({
        typeName: this.category[0],
        count: parseInt(this.tableData[2].b)
      }, {
        typeName: this.category[1],
        count: parseInt(this.tableData[2].c)
      }, {
        typeName: this.category[2],
        count: parseInt(this.tableData[2].d)
      }, {
        typeName: this.category[3],
        count: parseInt(this.tableData[2].e)
      }, {
        typeName: this.category[4],
        count: parseInt(this.tableData[2].f)
      })

      console.log(infoList, 'infoList')
      let arr = []
      infoList.forEach(item => {
        if (item.count == 0) {
          arr.push(1)
        }
      })
      if (arr.length == 5) {
        this.$message.error('请填写申请人数')
      } else {
        postUseApplication(infoList).then((res) => {
          console.log(res, 'res')
          if (res.code == 200) {
            this.$message.success('申请成功')
          } else {
            this.$message.success('请检查名额使用情况')
          }
        })
      }
      arr = []
      infoList = []
    }
  }
}
</script>

<style scoped>
    .fdiv {
        position: relative;
        width: 100%;
        height: 100px;
    }
    .sqbtn {
        position: absolute;
        left: 50%;
        width: 300px;
        margin-top: 15px;
        transform: translate(-50%,0);
    }
    .operation {
      text-align: center;
      margin: 20px 0;
    }
</style>>
