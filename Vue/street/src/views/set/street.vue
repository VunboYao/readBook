<template>
  <div>
    <div class="vue_content">
      <div class="table_toolbar">
        <div class="row">
          <!-- 输入框 -->
        </div>
        <!-- 选择器 -->
        <div class="table_toolbar_view">
          <el-button
            style="margin-right: 20px"
            type="primary"
            @click="outerVisible = true"
            >新增街道</el-button
          >
        </div>
      </div>
      <commonTable
        :columns="columns"
        :data="tableData"
        :pager="page"
        @handleCurrentChange="changepage"
        @handleSizeChange="changesize"
      >
        <el-table-column
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
        </el-table-column>
      </commonTable>
    </div>
    <el-dialog :title="EDITUSER" width="30%" :visible.sync="outerVisible">
      <el-form ref="form" :model="addstreetform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="addstreetform.street" />
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="addstreetform.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addstreetform.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="onSubmitaddstreet"
            >{{ EDITUSER }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="EDITUSER1" width="30%" :visible.sync="outerVisible1">
      <el-form ref="form" :model="editstreetform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="editstreetform.street" />
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="editstreetform.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editstreetform.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="onSubmiteditstreet"
            >{{ EDITUSER1 }}</el-button
          >
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
import { list, streetadd, streetedit, streetremove } from '@/api/set/street'
export default {
  data () {
    return {
      userinput: '',
      columns: [
        { prop: 'id', label: '编号' },
        { prop: 'street', label: '街道' },
        { prop: 'username', label: '账号' },
        { prop: 'password', label: '密码' }
      ],
      tableData: [
      ],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 50, 100],
        total: 0
      },
      outerVisible: false,
      EDITUSER: '新增街道',
      addstreetform: {
        name_street: '',
        pwd: '',
        street_id: ''
      },
      EDITUSER1: '编辑',
      outerVisible1: false,
      editstreetform: {}
    }
  },
  created () {
    this.getstreetlist()
  },
  mounted () { },
  methods: {
    getstreetlist () {
      list(this.page.pageNo, this.page.limit).then((res) => {
        console.log(res)
        this.tableData = res.data
        this.page.total = res.amx_sum
      })
    },
    async onSubmitaddstreet () {
      const res = await streetadd(this.addstreetform)
      // console.log(res)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisible = false
        this.addstreetform = {}
        this.getstreetlist()
      } else {
        this.$message.error(res.data)
      }
    },
    changepage (e) {
      this.page.pageNo = e
      list(this.page.pageNo, this.page.limit).then((res) => {
        this.page.total = res.amx_sum
        this.tableData = res.data
      })
    },
    changesize (e) {
      this.page.limit = e
      this.page.pageNo = 1
      list(this.page.pageNo, this.page.limit).then((res) => {
        this.tableData = res.data
      })
    },
    editTableData (data) {
      console.log(data)
      this.outerVisible1 = true
      this.editstreetform = data
    },
    async onSubmiteditstreet () {
      const res = await streetedit(this.editstreetform)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisible1 = false
        this.getstreetlist()
      } else {
        this.$message.error(res.data)
      }
    },
    async removeTableData (data) {
      const result = await this.$confirm('确认删除此信息?', {
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
        await streetremove({ id: data.id })
        this.getstreetlist()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    }
  }
}
</script>

<style>
</style>
