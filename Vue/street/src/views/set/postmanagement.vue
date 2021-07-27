<template>
  <div>
    <div class="vue_content">
      <div class="table_toolbar">
        <div class="row">
          <!-- 输入框 -->
          <p>岗位类别</p>
        </div>
        <!-- 选择器 -->
        <div class="table_toolbar_view">
          <el-button
            style="margin-right: 20px"
            type="primary"
            @click="outerVisible = true"
            >新增岗位类别</el-button
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

    <div class="vue_content">
      <div class="table_toolbar">
        <div class="row">
          <!-- 输入框 -->
          <p>岗位层次</p>
        </div>
        <!-- 选择器 -->
        <div class="table_toolbar_view">
          <el-button
            style="margin-right: 20px"
            type="primary"
            @click="outerVisible1 = true"
            >新增岗位层次</el-button
          >
        </div>
      </div>
      <commonTable
        :columns="columns1"
        :data="tableData1"
        :pager="page1"
        @handleCurrentChange="changepage1"
        @handleSizeChange="changesize1"
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
              @click="editTableDatacengci(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="removeTableDatacengci(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </commonTable>
    </div>

    <div class="vue_content">
      <div class="table_toolbar">
        <div class="row">
          <!-- 输入框 -->
          <p>岗位等级</p>
        </div>
        <!-- 选择器 -->
        <div class="table_toolbar_view">
          <el-button
            style="margin-right: 20px"
            type="primary"
            @click="outerVisible2 = true"
            >新增岗位等级</el-button
          >
        </div>
      </div>
      <commonTable
        :columns="columns2"
        :data="tableData2"
        :pager="page2"
        @handleCurrentChange="changepage2"
        @handleSizeChange="changesize2"
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
              @click="editTableDatadengji(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="removeTableDatadengji(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </commonTable>
    </div>

    <div class="vue_content">
      <div class="table_toolbar">
        <div class="row">
          <!-- 输入框 -->
          <p>工作部门</p>
        </div>
        <!-- 选择器 -->
        <div class="table_toolbar_view">
          <el-button
            style="margin-right: 20px"
            type="primary"
            @click="outerVisible3 = true"
            >新增工作部门</el-button
          >
        </div>
      </div>
      <commonTable
        :columns="columns3"
        :data="tableData3"
        :pager="page3"
        @handleCurrentChange="changepage3"
        @handleSizeChange="changesize3"
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
              @click="editTableDatabumen(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="removeTableDatabumen(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </commonTable>
    </div>
    <el-dialog :title="EDITUSER" width="20%" :visible.sync="outerVisible">
      <el-form ref="form" :model="addtypeform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="addtypeform.type_name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onSubmit1">{{
            EDITUSER
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改岗位类别 -->
    <el-dialog
      :title="EDITUSEREDIT"
      width="20%"
      :visible.sync="outerVisibleedit"
    >
      <el-form ref="form" :model="edittypeform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="edittypeform.type_name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onSubmitedit">{{
            EDITUSEREDIT
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增岗位层次  -->
    <el-dialog :title="EDITUSER1" width="20%" :visible.sync="outerVisible1">
      <el-form ref="form" :model="addcengciform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="addcengciform.type_name" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="onSubmitaddcengci"
            >{{ EDITUSER1 }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="EDITUSEREDIT"
      width="20%"
      :visible.sync="outerVisiblecengci"
    >
      <el-form ref="form" :model="editcengciform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="editcengciform.type_name" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="onSubmiteditcengci"
            >{{ EDITUSEREDIT }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 岗位等级 -->
    <el-dialog :title="EDITUSER2" width="20%" :visible.sync="outerVisible2">
      <el-form ref="form" :model="dengjiaddform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="dengjiaddform.type_name" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="onSubmitdengjiadd"
            >{{ EDITUSER2 }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      :title="EDITUSEREDIT"
      width="20%"
      :visible.sync="outerVisibledengjiedit"
    >
      <el-form ref="form" :model="dengjieditform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="dengjieditform.type_name" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="onSubmitdengjiedit"
            >{{ EDITUSEREDIT }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增工作部门 -->
    <el-dialog :title="EDITUSER3" width="20%" :visible.sync="outerVisible3">
      <el-form ref="form" :model="addjorinform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="addjorinform.type_name" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="onSubmitaddjorin"
            >{{ EDITUSER3 }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      :title="EDITUSEREDIT"
      width="20%"
      :visible.sync="outerVisibleeditjoin"
    >
      <el-form ref="form" :model="editjorinform" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="editjorinform.type_name" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="onSubmiteditjorin"
            >{{ EDITUSEREDIT }}</el-button
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
import {
  systype1addtype,
  systype1typelist,
  systype1typeedit,
  systype1typeremove,
  systype2add,
  systype2list,
  systype2edit,
  systype2remove,
  systype3list,
  systype3add,
  systype3edit,
  systype3remove,
  systype4add,
  systype4list,
  systype4edit,
  systype4remove
} from '@/api/set/postmanagement'
export default {
  data () {
    return {
      userinput: '',
      columns: [
        { prop: 'id', label: '编号' },
        { prop: 'type_name', label: '类别' }
      ],
      tableData: [
      ],
      outerVisible: false,
      EDITUSER: '新增岗位类别',
      columns1: [
        { prop: 'id', label: '编号' },
        { prop: 'type_name', label: '层次' }
      ],
      tableData1: [
      ],
      outerVisible1: false,
      EDITUSER1: '新增岗位层次',
      columns2: [
        { prop: 'id', label: '编号' },
        { prop: 'type_name', label: '等级' }
      ],
      addcengciform: {},
      tableData2: [
      ],
      // 编辑层次
      outerVisiblecengci: false,
      editcengciform: {},
      EDITUSEREDIT: '编辑',
      outerVisibleedit: false,
      edittypeform: {},
      outerVisible2: false,
      outerVisibledengjiedit: false,
      outerVisibleeditjoin: false,
      editjorinform: {},
      dengjieditform: {},
      EDITUSER2: '新增岗位等级',
      columns3: [
        { prop: 'id', label: '编号' },
        { prop: 'type_name', label: '部门' }
      ],
      dengjiaddform: {},
      tableData3: [

      ],
      outerVisible3: false,
      EDITUSER3: '新增工作部门',
      // 岗位类别
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 50, 100],
        total: 0
      },
      // 岗位层次
      page1: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 50, 100],
        total: 0
      },
      // 岗位等级
      page2: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 50, 100],
        total: 0
      },
      // 工作部门
      page3: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 50, 100],
        total: 0
      },
      addjorinform: {},
      form: {
        uname: '',
        username: '',
        password: ''
      },
      addtypeform: {
        type_name: ''
      }
    }
  },
  created () {
    this.getTypeList()
    this.getcengciList()
    this.getdengjiList()
    this.getdengjobdep()
  },
  mounted () {

  },
  methods: {
    // 岗位类别
    async getTypeList () {
      systype1typelist(this.page.pageNo, this.page.limit).then((res) => {
        this.tableData = res.data
        this.page.total = res.amx_sum
      })
    },
    changepage (e) {
      this.page.pageNo = e
      systype1typelist(this.page.pageNo, this.page.limit).then((res) => {
        this.tableData = res.data
      })
    },
    changesize (e) {
      this.page.limit = e
      this.page.pageNo = 1
      systype1typelist(this.page.pageNo, this.page.limit).then((res) => {
        this.tableData = res.data
      })
    },
    async onSubmit1 () {
      const res = await systype1addtype(this.addtypeform)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisible = false
        this.getTypeList()
        this.addtypeform.type_name = ''
      } else {
        this.$message.error(res.data)
      }
    },
    async onSubmitedit () {
      const res = await systype1typeedit(this.edittypeform)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisibleedit = false
        this.getTypeList()
      } else {
        this.$message.error(res.data)
      }
    },
    editTableData (data) {
      this.outerVisibleedit = true
      this.edittypeform = data
    },
    async removeTableData (data) {
      const result = await this.$confirm('确认删除此类别?', {
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
        await systype1typeremove({ id: data.id })
        this.getTypeList()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    },

    // 岗位层次
    async getcengciList () {
      systype2list(this.page1.pageNo, this.page1.limit).then((res) => {
        this.tableData1 = res.data
        this.page1.total = res.amx_sum
      })
    },
    changepage1 (e) {
      this.page1.pageNo = e
      systype2list(this.page1.pageNo, this.page1.limit).then((res) => {
        this.tableData1 = res.data
      })
    },
    changesize1 (e) {
      this.page1.limit = e
      this.page1.pageNo = 1
      systype2list(this.page1.pageNo, this.page1.limit).then((res) => {
        this.tableData1 = res.data
      })
    },
    async onSubmitaddcengci () {
      const res = await systype2add(this.addcengciform)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisible1 = false
        this.addcengciform.type_name = ''
        this.getcengciList()
      } else {
        this.$message.error(res.data)
      }
    },
    editTableDatacengci (data) {
      this.outerVisiblecengci = true
      this.editcengciform = data
    },
    async onSubmiteditcengci () {
      const res = await systype2edit(this.editcengciform)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisiblecengci = false
        this.getcengciList()
      } else {
        this.$message.error(res.data)
      }
    },
    async removeTableDatacengci (data) {
      const result = await this.$confirm('确认删除此层次?', {
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
        await systype2remove({ id: data.id })
        this.getcengciList()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    },
    // 岗位等级
    getdengjiList () {
      systype3list(this.page2.pageNo, this.page2.limit).then((res) => {
        // console.log(res)
        this.tableData2 = res.data
        this.page2.total = res.amx_sum
      })
    },
    changepage2 (e) {
      this.page2.pageNo = e
      systype3list(this.page2.pageNo, this.page2.limit).then((res) => {
        this.tableData2 = res.data
      })
    },
    changesize2 (e) {
      this.page2.limit = e
      this.page2.pageNo = 1
      systype3list(this.page2.pageNo, this.page2.limit).then((res) => {
        this.tableData2 = res.data
      })
    },
    async onSubmitdengjiadd () {
      const res = await systype3add(this.dengjiaddform)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisible2 = false
        this.dengjiaddform.type_name = ''
        this.getdengjiList()
      } else {
        this.$message.error(res.data)
      }
    },
    editTableDatadengji (data) {
      this.outerVisibledengjiedit = true
      this.dengjieditform = data
    },
    async onSubmitdengjiedit () {
      const res = await systype3edit(this.dengjieditform)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisibledengjiedit = false
        this.getdengjiList()
      } else {
        this.$message.error(res.data)
      }
    },
    async removeTableDatadengji (data) {
      const result = await this.$confirm('确认删除此等级?', {
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
        await systype3remove({ id: data.id })
        this.getdengjiList()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    },
    // 工作部门
    getdengjobdep () {
      systype4list(this.page.pageNo, this.page.limit).then((res) => {
        this.tableData3 = res.data
        this.page3.total = res.amx_sum
      })
    },
    changepage3 (e) {
      this.page3.pageNo = e
      systype4list(this.page3.pageNo, this.page3.limit).then((res) => {
        this.tableData3 = res.data
      })
    },
    changesize3 (e) {
      this.page3.limit = e
      this.page3.pageNo = 1
      systype4list(this.page3.pageNo, this.page3.limit).then((res) => {
        this.tableData3 = res.data
      })
    },
    async onSubmitaddjorin () {
      // console.log(this.addjorinform)
      const res = await systype4add(this.addjorinform)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisible3 = false
        this.getdengjobdep()
        this.addjorinform.type_name = ''
      } else {
        this.$message.error(res.data)
      }
    },
    editTableDatabumen (data) {
      this.editjorinform = data
      this.outerVisibleeditjoin = true
    },
    async onSubmiteditjorin () {
      const editform = {}
      editform.id = this.editjorinform.id
      editform.type_name = this.editjorinform.type_name
      console.log(editform)
      const res = await systype4edit(editform)
      console.log(res)
      if (res.code === '200') {
        this.$message.success(res.data)
        this.outerVisibleeditjoin = false
        this.getdengjobdep()
      } else {
        this.$message.error(res.data)
      }
    },
    async removeTableDatabumen (data) {
      const result = await this.$confirm('确认删除此部门?', {
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
        await systype4remove({ id: data.id })
        this.getdengjobdep()
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
