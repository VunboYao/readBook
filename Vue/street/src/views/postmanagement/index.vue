<template>
  <div>
    <div class="vue_content">
      <div class="table_toolbar">
        <h2>杨浦区各类社区工作者编制基数一览</h2>
        <p>（最后更新时间：{{ lastModifyTime }}）</p>
      </div>
      <!--      <commonTable
        :show-page="false"
        :columns="columns"
        :data="tableData"
        :pager="page"
        @handleCurrentChange="changepage"
        @handleSizeChange="changesize"
      >
        &lt;!&ndash;        <el-table-column
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
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="removeTableData(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>&ndash;&gt;
      </commonTable>-->
      <info-table
        :table-data="tableData"
        :search-fun="workTypeSearch"
      />
      <!--      <div class="last-tip">最新修改时间为：{{ lastModifyTime }}</div>-->
    </div>
    <el-dialog :title="EDITUSER" width="30%" :visible.sync="outerVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="岗位名称">
          <el-input v-model="form.type_name" />
          <!-- <el-select
            v-model="form.postName"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in joblist1"
              :key="item.id"
              :label="item.type_name"
              :value="item.id"
            />
          </el-select> -->
        </el-form-item>
        <el-form-item label="招收街道">
          <el-select
            v-model="form.street"
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in streetlist1"
              :key="item.id"
              :label="item.name_street"
              :value="item.street_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="招收人数">
          <el-input v-model="form.sums" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onSubmit">{{
            EDITUSER
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="EDITUSER1" width="30%" :visible.sync="outerVisibleedit">
      <el-form ref="editform" :model="editform" label-width="100px">
        <el-form-item label="岗位名称">
          <el-input v-model="editform.type_name" />
          <!-- <el-select
            v-model="form.postName"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in joblist1"
              :key="item.id"
              :label="item.type_name"
              :value="item.id"
            />
          </el-select> -->
        </el-form-item>
        <el-form-item label="招收街道">
          <el-select
            v-model="editform.street"
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in streetlist1"
              :key="item.id"
              :label="item.name_street"
              :value="item.street_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="招收人数">
          <el-input v-model="editform.sums" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onSubmitedit">{{
            EDITUSER1
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   list,
//   addbm,
//   bmlist,
//   delbm,
//   register,
//   deluser,
//   upuser,
//   chauser1,
//   chauser2
// } from "@/api/adduser";
import { list, addsyspost, streetlist, editsyspost, removesyspost, workTypeSearch } from '@/api/postmanagement/index'
import infoTable from '@/views/postmanagement/infoTable'
export default {
  name: 'Postmanagement',
  components: {
    infoTable
  },
  data() {
    return {
      lastModifyTime: '',
      userinput: '',
      /* columns: [
        { prop: 'street_id', label: '序号' },
        { prop: 'name_street', label: '街道' },
        { prop: 'street_acceptance', label: '受理中心' },
        { prop: 'street_other', label: '其他中心' },
        { prop: 'community', label: '居民区社区工作者(聘任制居委干部、选任制居委干部/党组织班子成员)' },
        { prop: 'specific_liangxin', label: '“两新”组织专职党群工作者' },
        { prop: 'specific_community', label: '居民区专职党务工作(其他居民区专职党务工作者、居民区党组织副书记)' }
      ],*/
      tableData: [],
      page: {
        show: false,
        pageNo: 1,
        limit: 10,
        sizes: [20, 50, 100],
        total: 0
      },
      outerVisible: false,
      EDITUSER: '新增岗位',
      EDITUSER1: '编辑岗位',
      outerVisibleedit: false,
      form: {
      },
      editform: {
      },
      streetlist1: [],
      joblist1: []
    }
  },
  mounted() {
    // this.getList()
    this.workTypeSearch()
  },
  methods: {
    // 岗位名额管理查询
    workTypeSearch() {
      workTypeSearch().then(res => {
        res.data.forEach(item => {
          item.modifyFlag = false
        })
        this.tableData = res.data
        this.page.total = res.amx_sum
        this.lastModifyTime = res.gmt_modified
      })
    },
    /** **********************************历史***********************/
    async getList() {
      const res = await list(this.page.pageNo, this.page.limit)
      console.log(res)
      this.tableData = res.data
      this.page.total = res.amx_sum
    },
    async streetlist() {
      const res = await streetlist(this.page.pageNo, this.page.limit)
      this.streetlist1 = res.data
    },
    async onSubmit() {
      console.log(this.$refs)
      const res = await addsyspost(this.form)

      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisible = false
        this.form = {}
        this.getList()
      } else {
        this.$message.error(res.data)
      }
    },
    async editTableData(data) {
      this.outerVisibleedit = true
      this.editform = data
    },
    // 提交
    async onSubmitedit() {
      const res = await editsyspost(this.editform)
      if (res.code === '200') {
        console.log(111111111)
        this.$message.success(res.data)
        this.outerVisibleedit = false
        this.getList()
      } else {
        this.$message.error(res.message)
      }
    },
    async removeTableData(data) {
      const result = await this.$confirm('确认删除此数据?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除操作'
        })
      })
      if (result === 'confirm') {
        // 进行撤销逻辑
        await removesyspost({ id: data.id })
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
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
.table_toolbar {
  flex-direction: column;
  justify-content: center;
}
.last-tip {
  text-align: right;
  margin: 10px;
  color: #333;
}
</style>
