<template>
  <div v-if="5 > 3">
    开发中...
  </div>
  <div v-else>
    <div class="alltitle">区级部门下派人员信息统计</div>
    <div class="vue_content">
      <div class="table_toolbar">
        <div class="row">
          <!-- 输入框 -->
          <div class="table_toolbar_view">
            <el-button
              type="primary"
              @click="dialogVisible = true"
            >筛选</el-button>
          </div>
        </div>
        <!-- 选择器 -->
        <div class="table_toolbar_view" />
      </div>
      <commonTable
        :columns="columns"
        :data="tableData"
        :pager="page"
        @handleCurrentChange="changepage"
        @handleSizeChange="changesize"
      >
        <!-- <el-table-column
          slot="table_oper"
          align="center"
          label="操作"
          width="150"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editTableData(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="removeTableData(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </commonTable>
    </div>
    <el-dialog title="筛选条件" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="选择街道">
          <el-select v-model="form.street" placeholder="请选择">
            <el-option
              v-for="(item, idx) in bm_list"
              :key="idx"
              :label="item.name_street"
              :value="item.name_street"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否是党员">
          <el-select v-model="form.zhengzhimianmao" placeholder="请选择">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="政治面貌">
          <el-select v-model="form.zhengzhimianmao" placeholder="政治面貌">
            <!-- <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option> -->
            <el-option label="中共党员" value="中共党员" />
            <el-option label="共青团员" value="共青团员" />
            <el-option label="民主党派" value="民主党派" />
            <el-option label="中共预备党员" value="中共预备党员" />
            <el-option label="无党派人士" value="无党派人士" />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位类别">
          <!-- <el-input
              v-model="form.zaibiangangweileibie"
              placeholder="请输入岗位类别"
            ></el-input> -->
          <el-select
            v-model="form.zaibiangangweileibie"
            placeholder="请选择岗位类别"
          >
            <el-option label="管理类" value="管理类" />
            <el-option label="工勤类" value="工勤类" />
            <el-option label="专技类" value="专技类" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="岗位类别">
          <el-input
            v-model="form.zaibiangangweileibie"
            placeholder="请输入岗位类别"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="主管部门">
          <el-select v-model="form.zhuguanbumen" placeholder="主管部门">
            <!-- <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option> -->
            <el-option
              label="其它（请在备注中注明）"
              value="其它（请在备注中注明）"
            />
            <el-option label="区委老干部局" value="区委老干部局" />
            <el-option label="市司法局" value="市司法局" />
            <el-option label="团市委" value="团市委" />
            <el-option label="市禁毒办" value="市禁毒办" />
            <el-option label="区委统战部" value="区委统战部" />
            <el-option label="区卫健委" value="区卫健委" />
            <el-option label="区总工会" value="区总工会" />
            <el-option label="区残联" value="区残联" />
          </el-select>
          <!-- <el-input
            v-model="form.zhuguanbumen"
            placeholder="请输入级别主管部门"
          ></el-input> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="shaixuanclick">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { list, bm_list, selectlist } from '@/api/statistics/districtlevel'

export default {
  data() {
    return {
      userinput: '',
      columns: [
        { prop: 'street', label: '街道' },
        { prop: 'id', label: '序号' },
        { prop: 'user_name', label: '姓名' },
        { prop: 'sex', label: '姓名' },
        { prop: 'user_id', label: '身份证号', width: 300 },
        { prop: 'zhengzhimianmao', label: '政治面貌' },
        { prop: 'zuigaoxveli', label: '最高学历' },
        { prop: 'biyeyuanxiao', label: '毕业院校', width: 300 },
        { prop: 'add_date', label: '入职年月' },
        { prop: 'is_age', label: '是否就业年龄段', width: 200 },
        { prop: 'end_date', label: '退休年月' },
        { prop: 'renyuangoucheng', label: '人员构成', width: 300 },
        { prop: 'zhuguanbumen', label: '主管部门' },
        { prop: 'yonggongxingshi', label: '用工形式', width: 300 },
        { prop: 'zhutimingcheng', label: '主体名称', width: 300 },
        { prop: 'zhutixingzhi', label: '主体性质' },
        { prop: 'gangweileixing', label: '岗位类别' },
        { prop: 'guanlifangshi', label: '管理方式', width: 200 },
        { prop: 'jingfeilaiyuan', label: '经费来源', width: 300 },
        {
          prop: 'shuiqianrenyuanjingfeiyusuan',
          label: '税前人员经费预算(元/年)',
          width: 300
        },
        { prop: 'comm', label: '备注1', width: 300 },
        { prop: 'comm2', label: '备注2', width: 300 }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 20,
        sizes: [20, 40, 60],
        total: 0
      },
      // 街道列表
      dialogVisible: false,
      form: {
        street: null,
        zhengzhimianmao: null,
        zhuguanbumen: null,
        gangweileixing: null
      },
      bm_list: []
    }
  },
  mounted() {
    /* list(this.page.pageNo, this.page.limit).then((res) => {
      this.tableData = res.data
      this.page.total = res.amx_sum
    })
    bm_list().then((res) => {
      this.bm_list = res.data
    }) */
  },
  methods: {
    shaixuanclick(e) {
      selectlist(this.form).then((res) => {
        this.tableData = res.data
        this.dialogVisible = false
      })
    },
    changepage(e) {
      this.page.pageNo = e
      list(this.page.pageNo, this.page.limit).then((res) => {
        this.tableData = res.data
      })
    },
    changesize(e) {
      this.page.limit = e
      this.page.pageNo = 1
      list(this.page.pageNo, this.page.limit).then((res) => {
        this.tableData = res.data
      })
    }
  }
}
</script>

<style>
</style>
