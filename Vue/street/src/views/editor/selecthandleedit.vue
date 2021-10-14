<template>
  <div class="vue_content">
    <el-card class="cell_body">
      <el-card v-for="(item,index) in cellDataList" :key="index" shadow="hover">
        <div class="cell_item" @click="routerPush(index)">
          <span>{{ item.title }}</span>
          <div>
            <span v-if="cellDataList[index].status == 2" class="jujue">已拒绝</span>
            <span v-else-if="cellDataList[index].status == 1" class="tongyi">已同意，待填写人员信息</span>
            <span v-else-if="cellDataList[index].status == 3" class="wancheng">已完成</span>
            <i class="el-icon-arrow-right" />
          </div>
        </div>
      </el-card>
      <el-pagination
        class="cell_page"
        :current-page="currentPage4"
        :page-sizes="[ 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { queryPage, isAdmin, getUserInfo } from '@/api/postmanagement/index'
export default {

  components: {},
  data() {
    return {
      cellDataList: [],
      currentPage4: 1,
      pageSize: 10,
      total: 1,
      isAdmin: null, // 是否管理员
      street: ''
    }
  },

  computed: {},

  created() {
    this.getIsAdmin()
    this.getUserStreet()
    //    this.getStreet()
  },

  mounted() {},

  methods: {
    routerPush(index) {
      const street = this.cellDataList[index].street
      const id = this.cellDataList[index].id
      const status = this.cellDataList[index].status
      this.$router.push({ name: 'handleedit',
        query: {
          street,
          id,
          status
        }})
    },
    handleSizeChange(val) {
      this.pageSize = 10
      this.getStreet()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage4 = val
      this.getStreet()
      console.log(`当前页: ${val}`)
    },
    async getStreet() {
      const res = await queryPage(this.currentPage4, this.pageSize, 4)
      console.log(res)
      console.log('22222')
      if (this.isAdmin) {
        this.cellDataList = res.data
      } else {
        this.cellDataList = []
        console.log(this.street, 'this.street')
        res.data.forEach(item => {
          if (this.street == item.street) {
            this.cellDataList.push(item)
          }
        })
      }
      this.total = res.amx_sum
    },
    async getIsAdmin() {
      const res = await isAdmin()
      this.isAdmin = res.data
      console.log(this.isAdmin)
    },
    async getUserStreet() {
      const res = await getUserInfo()
      console.log(res, 'res')
      if (res.code == 200) {
        this.street = res.data.street
        this.getStreet()
      }
      console.log(this.street)
    }
  }
}
</script>
<style lang='css' scoped>
    .cell_body {
        width: 100%;
        /* height: 189.6px; */
        /* border: 1px solid #aaa; */
    }
    .cell_item {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }
    .cell_item:hover {
        cursor:pointer
    }
    .cell_page {
        margin-top: 15px;
    }
    .jujue {
        color: red;
    }
    .wancheng{
        color: rgba(5, 199, 86, 0.781);
    }
    .tongyi{
        color: rgba(151, 105, 6, 0.781);
    }
</style>
