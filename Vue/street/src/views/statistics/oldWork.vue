<template>
  <div>
    <div v-if="isAdmin" class="alltitle">杨浦区社区工作者历史退出人员信息</div>
    <div v-else class="alltitle">{{ tableData && tableData[0] && tableData[0]['street'] }}街道历史退出人员信息</div>
    <div class="vue_content">
      <div class="table_toolbar">
        <div class="row">
          <a
            class="download"
            href="http://124.70.54.235/prod-api/api/demo/admin/staffstypes/listsExcel?is_set=1"
            download="杨浦区2021年度社区工作者招录员额统计表"
          >下载</a>
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
          <el-form-item label="选择性别">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <!-- <el-input v-model="form.age" placeholder="请输入年龄"></el-input> -->
            <el-select v-model="form.age" placeholder="请选择年龄">
              <el-option
                v-for="(item, idx) in age_list"
                :key="idx"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="政治面貌">
            <!-- <el-input
              v-model="form.zhengzhimianmao"
              placeholder="请输入政治面貌"
            ></el-input> -->
            <el-select
              v-model="form.zhengzhimianmao"
              placeholder="请选择政治面貌"
            >
              <el-option label="中共党员" value="中共党员" />
              <el-option label="共青团员" value="共青团员" />
              <el-option label="群众" value="群众" />
              <el-option label="中共预备党员" value="中共预备党员" />
              <el-option label="民主党派" value="民主党派" />
              <el-option label="无党派人士" value="无党派人士" />
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <!-- <el-input
              v-model="form.zuigaoxveli"
              placeholder="请输入学历"
            ></el-input> -->
            <el-select v-model="form.zuigaoxveli" placeholder="请选择学历">
              <el-option label="大专以下" value="大专以下" />
              <el-option label="大专" value="大专" />
              <el-option label="本科" value="本科" />
              <el-option label="研究生" value="研究生" />
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
              <el-option
                label="街道各中心社区工作者：受理中心工作人员"
                value="街道各中心社区工作者：受理中心工作人员"
              />
              <el-option
                label="街道各中心社区工作者：其它中心工作人员"
                value="街道各中心社区工作者：其它中心工作人员"
              />
              <el-option
                label="居民区社区工作者：聘任制居委干部"
                value="居民区社区工作者：聘任制居委干部"
              />
              <el-option
                label="居民区社区工作者：选任制居委干部/党组织班子成员"
                value="居民区社区工作者：选任制居委干部/党组织班子成员"
              />
              <el-option
                label="专职党群工作者：“两新”组织专职党群工作者"
                value="专职党群工作者：“两新”组织专职党群工作者"
              />
              <el-option
                label="专职党群工作者：居民区党组织副书记"
                value="专职党群工作者：居民区党组织副书记"
              />
              <el-option
                label="专职党群工作者：其他居民区专职党务工作者"
                value="专职党群工作者：其他居民区专职党务工作者"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="岗位层次">
            <el-select
              v-model="form.gangweicengci"
              placeholder="请选择岗位层次"
            >
              <el-option label="工作人员" value="工作人员" />
              <el-option label="主管" value="主管" />
              <el-option label="负责人" value="负责人" />
            </el-select>
            <!-- <el-input
              v-model="form.gangweicengci"
              placeholder="请输入岗位层次"
            ></el-input> -->
          </el-form-item>
          <el-form-item label="岗位等级">
            <el-select
              v-model="form.gangweidengji"
              placeholder="请选择岗位等级"
            >
              <el-option
                v-for="(item, idx) in gw_list"
                :key="idx"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="工作部门">
            <!-- <el-input
              v-model="form.shijigongzuobumen"
              placeholder="请输入工作部门"
            ></el-input> -->
            <el-select
              v-model="form.shijigongzuobumen"
              placeholder="请选择工作部门"
            >
              <el-option label="居民区" value="居民区" />
              <el-option label="党政办公室" value="党政办公室" />
              <el-option
                label="社区党建办公室（群团组织、人大统战）"
                value="社区党建办公室（群团组织、人大统战）"
              />
              <el-option label="社区管理办公室" value="社区管理办公室" />
              <el-option label="社区服务办公室" value="社区服务办公室" />
              <el-option
                label="社区平安办公室（信访办公室）"
                value="社区平安办公室（信访办公室）"
              />
              <el-option label="社区自治办公室" value="社区自治办公室" />
              <el-option
                label="社区优化营商办公室"
                value="社区优化营商办公室"
              />
              <el-option
                label="社区宣传文化办公室"
                value="社区宣传文化办公室"
              />
              <el-option label="街道监察办公室" value="街道监察办公室" />
              <el-option
                label="社区事务受理服务中心"
                value="社区事务受理服务中心"
              />
              <el-option
                label="城市网格化综合管理中心"
                value="城市网格化综合管理中心"
              />
              <el-option label="社区党建服务中心" value="社区党建服务中心" />
              <el-option
                label="街道房屋管理办公室"
                value="街道房屋管理办公室"
              />
              <el-option
                label="街道绿化市容管理事务中心"
                value="街道绿化市容管理事务中心"
              />
              <el-option label="街道城管执法中队" value="街道城管执法中队" />
              <el-option label="街道司法所" value="街道司法所" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="shaixuanclick">确定</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { list, bm_list, selectlist } from '@/api/statistics/editing'
import { mapGetters } from 'vuex'
export default {
  name: 'History',
  data() {
    return {
      text: '所有区',
      columns: [
        { type: 'index', label: '序号' },
        { prop: 'street', label: '街道' },
        { prop: 'user_name', label: '姓名' },
        { prop: 'sex', label: '性別' },
        { prop: 'age', label: '年龄' },
        { prop: 'user_id', label: '身份证号', width: 300 },
        { prop: 'zhengzhimianmao', label: '政治面貌' },
        { prop: 'zuigaoxveli', label: '最高学历' },
        { prop: 'biyeyuanxiao', label: '毕业院校', width: 300 },
        { prop: 'is_type', label: '是否全日制', width: 200 },
        { prop: 'zhaolupici', label: '招录批次/选任类别', width: 200 },
        { prop: 'add_date', label: '入职年月' },
        { prop: 'zaibiangangweileibie', label: '在编岗位类别', width: 400 },
        { prop: 'gangweicengci', label: '岗位层次' },
        { prop: 'gangweidengji', label: '岗位等级' },
        { prop: 'shijigongzuobumen', label: '实际工作部门', width: 200 },
        { prop: 'zhengshu1', label: '社会工作者职业水平证书情况', width: 300 },
        { prop: 'money', label: '人员经费预算(元/年)', width: 300 },
        { prop: 'is_edit', label: '是否曾调整过人员编制类别', width: 300 },
        { prop: 'comm', label: '备注1', width: 200 },
        { prop: 'comm2', label: '备注2', width: 200 },
        { prop: 'outTime', label: '退出时间', width: 200 },
        { prop: 'outReason', label: '退出原因', width: 200 }
        // { prop: "is_set", label: "3-5月离职情况" },
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 50,
        sizes: [50],
        total: 0
      },
      // 街道列表
      dialogVisible: false,
      form: {
        street: null,
        sex: null,
        age: null,
        zhengzhimianmao: null,
        staffs_types: null,
        user_name: null,
        user_id: null,
        biyeyuanxiao: null,
        is_type: null,
        add_date: null,
        zhaolupici: null,
        zaibiangangweileibie: null,
        gangweicengci: null,
        gangweidengji: null,
        shijigongzuobumen: null,
        zhengshu1: null,
        money: null,
        is_edit: null,
        comm: null,
        comm2: null
      },
      bm_list: [],
      age_list: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
      gw_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      fileTemp: null
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  },
  mounted() {
    list(this.page.pageNo, this.page.limit, 1).then((res) => {
      this.tableData = res.data
      this.page.total = res.amx_sum
    })
    bm_list().then((res) => {
      this.bm_list = res.data
    })
  },
  methods: {
    shaixuanclick(e) {
      this.text = this.form.street
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

<style scoped>
.download {
  background: #409EFF;
  color: #fff;
  font-size: 14px;
  padding: 12px 20px;
  border-radius: 4px;
  margin: 0 10px;
}
</style>
