<template>
  <div>
    <div class="vue_content">
      <div class="table_toolbar">
        <div class="row">
          <!-- 输入框 -->
          <div class="table_toolbar_view">
            <span class="table_toolbar_view_title">查询人员</span>
            <el-input
              v-model="userinput"
              class="orinput"
              placeholder="请输入查询人员的名字"
              prefix-icon="el-icon-search"
              @keyup.enter.native="cxinput"
            />
          </div>
        </div>
        <!-- 选择器 -->
        <div class="table_toolbar_view" />
      </div>
      <commonTable :columns="columns" :data="tableData" :pager="page">
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
              type="danger"
              @click="removeTableData(scope.row)"
              >解聘</el-button
            >
          </template>
        </el-table-column>
      </commonTable>
    </div>
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
  edit2, shegonglist
} from '../../api/users/remove'

export default {
  data () {
    return {
      userinput: '',
      columns: [
        { prop: 'a', label: '编号' },
        { prop: 'b', label: '姓名' },
        { prop: 'c', label: '年龄' },
        { prop: 'd', label: '政治面貌' },
        { prop: 'e', label: '社区工作者类型' },
        { prop: 'f', label: '联系电话' },
        { prop: 'g', label: '薪资' },
        { prop: 'h', label: '编外' },
        { prop: 'i', label: '住址' }
      ],
      tableData: [
        {
          a: '1',
          b: 'admin',
          c: '45',
          d: '党员',
          e: '政委中心',
          f: '13555555555',
          g: '8000',
          h: '否',
          i: '中国'
        }
      ],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 50, 100],
        total: 0
      },
      bm_list: [],
      fileTemp: null
    }
  },
  created () {
    this.getlist()
  },
  mounted () { },
  methods: {
    async getlist () {
      const res = await shegonglist()
      console.log(res)
    },
    async removeTableData (data) {
      console.log(data)
      const res = await edit2(data)
      // console.log(res)
    }
  }
}
</script>

<style>
</style>
