<template>
  <div class="vue_content">
    <el-card class="cell_body">
      <el-card v-if="cellDataList.length == 0" shadow="hover">
        暂无本街道审核中用编申请
      </el-card>
      <el-card v-for="(item,index) in cellDataList" v-else :key="index" shadow="hover">
        <div class="cell_item" @click="routerPush(index)">
          <span>{{ item.title }}</span>
          <div>
            <span>{{ item.gmtCreate }}</span>
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
      isAdmin: null, // 是否为管理员
      street: ''
    }
  },

  computed: {},
  created() {
    this.getIsAdmin()
    this.getUserStreet()
  },
  mounted() {
    //    this.getStreet()
  },

  methods: {
    routerPush(index) {
      const street = this.cellDataList[index].street
      const id = this.cellDataList[index].id
      this.$router.push({ name: 'auditeditor',
        query: {
          street,
          id
        }})
    },
    handleSizeChange(val) {
      this.pageSize = 10
      this.getStreet()
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage4 = val
      this.getStreet()
      // console.log(`当前页: ${val}`);
    },
    async getStreet() {
      console.log(this.currentPage4, 'this.currentPage4')
      console.log(this.pageSize, 'this.pageSize')
      const res = await queryPage(this.currentPage4, this.pageSize, 0)
      console.log(res.max_sum)
      console.log('111111')
      if (this.isAdmin) {
        this.cellDataList = res.data
      } else {
        //   console.log(11111);
        this.cellDataList = []
        console.log(this.street, 'this.street')
        console.log(res.data, '.....')
        res.data && res.data.forEach(item => {
          if (this.street === item.street) {
            this.cellDataList.push(item)
          }
        })
      }
      this.total = res.amx_sum
      console.log(this.cellDataList, 'this.cellDataList')
    },
    async getIsAdmin() {
      const res = await isAdmin()
      this.isAdmin = res.data
      //   console.log(res,'res');
    },
    async getUserStreet() {
      const res = await getUserInfo()
      console.log(res, 'res')
      if (res.code == '200') {
        this.street = res.data.street
        this.getStreet()
      }
      console.log(this.street, 'this.street')
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
</style>
