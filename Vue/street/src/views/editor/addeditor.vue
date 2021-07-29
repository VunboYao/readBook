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
          prop="centerTotal"
          :label="centerHeader"
          align="center"
          min-width="140"
        >
          <!-- <el-table-column
            prop="centerTotal"
            label="小计"
            align="center"
            min-width="80"
          />
          <el-table-column
            prop="centerApply"
            label="受理中心"
            align="center"
            min-width="80"
          />
          <el-table-column
            prop="centerOther"
            label="其他中心"
            align="center"
            min-width="80"
          /> -->
        </el-table-column>
        <el-table-column
          :label="specificHeader"
          align="center"
        >
          <el-table-column
            prop="specificTotal"
            label="小计"
            align="center"
            min-width="80"
          />
          <el-table-column
            prop="specificTwo"
            label="“两新”"
            align="center"
            min-width="80"
          />
          <el-table-column
            prop="specificPeople"
            label="居民区"
            align="center"
            min-width="80"
          />
        </el-table-column>
        <el-table-column
          prop="personTotal"
          :label="peopleHeader"
          align="center"
          min-width="140"
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
      >
        <el-table-column
          prop="street"
          label="单位"
          align="center"
          min-width="80"
        />
        <el-table-column
          prop="peopleType"
          label="人员分类"
          align="center"
          min-width="160"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.peopleType"
              clearable
              filterable
              @change="onPeopleTypeClear(scope.row)"
            >
              <el-option label="中心社区工作者" value="1" />
              <el-option label="社区专职党群工作者" value="2" />
              <el-option label="居民区社区工作者" value="3" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="岗位分类"
          align="center"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.typeName"
              clearable
              filterable
              @change="onTypeNameClear(scope.row)"
            >
              <template v-if="scope.row.peopleType === '1'">
                <el-option label="社区事务受理中心" value="1" />
                <el-option label="社区文化活动中心" value="2" />
                <el-option label="城市运行管理中心" value="3" />
                <el-option label="社区党建服务中心" value="4" />
                <el-option label="社会治安综合治理中心" value="5" />
              </template>
              <template v-if="scope.row.peopleType === '2'">
                <el-option label="“两新”组织专职党群工作者" value="1" />
                <el-option label="居民区专职党务工作者" value="2" />
              </template>
              <template v-if="scope.row.peopleType === '3'">
                <el-option label="居民区社区工作者" value="1" />
              </template>
            </el-select>
          </template>
        </el-table-column>
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
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="招聘人数"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.count"
              type="tel"
              placeholder=""
              clearable
              @input="onCountChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="proportion"
          label="面试比例"
          align="center"
          min-width="110"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.proportion"
              clearable
              filterable
            >
              <el-option label="1:3" value="1" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="huji"
          label="户籍要求"
          align="center"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.huji"
              clearable
              filterable
            >
              <el-option label="本市户籍" value="1" />
              <el-option label="持有上海市民居住证三年以上" value="2" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="nianling"
          label="年龄要求"
          align="center"
          min-width="120"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.nianling"
              clearable
              filterable
            >
              <template v-if="scope.row.peopleType === '1'">
                <el-option label="男性1966年8月至2003年8月期间出生" value="1" />
                <el-option label="女性1976年8月至2003年8月期间出生" value="2" />
              </template>
              <template v-if="scope.row.peopleType === '2'">
                <el-option label="男性1971年8月至2003年8月期间出生" value="1" />
                <el-option label="女性1976年8月至2003年8月期间出生" value="2" />
              </template>
              <template v-if="scope.row.peopleType === '3'">
                <el-option label="男性1966年8月至2003年8月期间出生" value="1" />
                <el-option label="女性1976年8月至2003年8月期间出生" value="2" />
              </template>
            </el-select>
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
          min-width="120"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.zhengzhimianmao"
            >
              <template v-if="scope.row.peopleType === '2'">
                <el-option value="中共党员" label="中共党员" />
              </template>
              <template v-else>
                <el-option value="不限" label="不限" />
                <el-option value="中共党员" label="中共党员" />
                <el-option value="群众" label="群众" />
                <el-option value="共青团员" label="共青团员" />
                <el-option value="民主党派" label="民主党派" />
              </template>
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
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="onAddRow(scope.row, scope.$index)"
            >新增</el-button>
            <el-button
              v-if="scope.$index > 0"
              type="text"
              size="mini"
              @click="onDeleteRow(scope.row, scope.$index)"
            >删除</el-button>
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
  getUserInfo,
  ApplyApplication } from '@/api/postmanagement/index'
import { DictGet } from '@/api/quotaUseTotal/index'
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
          peopleType: '',
          typeName: '', // 岗位分类
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
  computed: {
    // 申请总数
    centerTotal() {
      return this.subTableData[this.subTableData.length - 1]['center']
    },
    specificTotal() {
      return this.subTableData[this.subTableData.length - 1]['specific']
    },
    peopleTotal() {
      return this.subTableData[this.subTableData.length - 1]['people']
    },
    // 申请情况合成
    centerHeader() {
      return `中心社区工作者员额申请数（${this.centerTotal}）`
    },
    specificHeader() {
      return `专职党群工作者员额申请数（${this.specificTotal}）`
    },
    peopleHeader() {
      return `居民社区工作者员额申请数（${this.peopleTotal}）`
    }
  },
  created() {
    this.getUserInfo()
    this.getTableData()
  },
  methods: {
    // 招录简章删除
    onDeleteRow(row, index) {
      this.BriefData.splice(index, 1)
    },
    // 招录简章新增
    onAddRow(row, index) {
      const rowData = {
        street: this.street,
        peopleTypeId: '',
        peopleType: '',
        typeName: '', // 岗位分类
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
      }
      this.BriefData.splice(index + 1, 0, rowData)
    },
    // 人员分类监听
    onPeopleTypeClear(row) {
      row.typeName = ''
      row.huji = ''
      row.nianling = ''
      row.zhengzhimianmao = ''
      row.count = ''
      this.onCountChange(row)
    },
    // 岗位类别监听
    onTypeNameClear(row) {
      row.count = ''
      this.onCountChange(row)
    },
    // 返回额度统计界面
    obBackStatistics() {
      this.descPage = false
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
          this.$alert('已提交成功，请在审阅中查阅', '提示', {
            type: 'success',
            confirmButtonText: '确定',
            callback: action => {
              this.subTableData = [
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
              ]
              this.getTableData()
              this.descPage = false
            }
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
    onCountChange(row) {
      if (row.peopleType === '1') {
        const total = this.subTableData[this.subTableData.length - 1]['center']
        let count = 0
        this.BriefData.forEach(item => {
          count += parseInt(item.count) || 0
        })
        console.log(count)
        this.QuotaData[0]['centerTotal'] = count
        this.msgTip('中心社区工作者员额申请数', total, count)
      } else if (row.peopleType === '3') {
        const total = this.subTableData[this.subTableData.length - 1]['people']
        let count = 0
        this.BriefData.forEach(item => {
          count += parseInt(item.count) || 0
        })
        console.log(count)
        this.QuotaData[0]['personTotal'] = count
        this.msgTip('居民社区工作者员额申请数', total, count)
      } else if (row.peopleType === '2') {
        const total = this.subTableData[this.subTableData.length - 1]['specific']
        let count1 = 0
        let count2 = 0
        this.BriefData.forEach(item => {
          if (item.typeName === '1') {
            count1 += parseInt(item.count) || 0
          } else if (item.typeName === '2') {
            count2 += parseInt(item.count) || 0
          } else {
            count1 = 0
            count2 = 0
          }
        })
        this.QuotaData[0]['specificTotal'] = count1 + count2
        this.QuotaData[0]['specificTwo'] = count1
        this.QuotaData[0]['specificPeople'] = count2
        this.msgTip('专职党群工作者员额申请数', total, count1 + count2)
      }
      /* if (scope.row.peopleTypeId === 'center') {
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
      } */
    },
    msgTip(typeName, count, total) {
      if (total > count) {
        this.$message({
          type: 'error',
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
