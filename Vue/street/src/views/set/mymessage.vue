<template>
  <div class="mymessage">
    <!-- 我的消息 -->
    <div class="info">我的消息</div>
    <!-- 消息列表 -->
    <div
      v-for="item in messagelist.data"
      :key="item.id"
      class="list"
      @click="lookMessage(item)"
    >
      <!--  -->
      <div>
        <i
          :class="[
            'iconfont',
            item.isRead ? 'icon-dakaiyoujianchakanxiaoxi' : 'icon-duanxin',
          ]"
        />
        <span>{{ item.title }}</span>
      </div>
      <div class="time">
        <span>{{ item.gmtModified }}</span>
        <i class="el-icon-arrow-right" />
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="messagelist.amx_sum"
      @size-change="sizechange"
      @current-change="currentchange"
    />
  </div>
</template>

<script>
import { list, list1, shenhemessage, isRead } from '@/api/set/mymessage'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      // 消息列表
      messagelist: {},
      senddata: {
        pages: 1,
        sums: 10
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getmymessage()
  },
  mounted () { },
  methods: {
    // 获取消息列表
    async getmymessage () {
      const res = await list(this.senddata)
      // console.log(res)
      res.data.forEach(item => {
        item.gmtModified = this.getdate(item.gmtModified)
      })
      this.messagelist = res
    },
    async lookMessage (data) {
      this.$router.push('/somemessage')
      // 获取详情
      const res = await list1(data.id)
      console.log(res)
      // 改变是否阅读
      await isRead(data.id)
      // 获取人员审核信息
      const res1 = await shenhemessage(data.staffId)
      console.log(res)
      // 这个值保存在本地存储
      window.sessionStorage.setItem('message', JSON.stringify(res.data))
      window.sessionStorage.setItem('staff', JSON.stringify(res1.data))
      this.$router.push('/somemessage')
    },
    getdate () {
      var now = new Date(1624777106517)
      var y = now.getFullYear()
      var m = now.getMonth() + 1
      var d = now.getDate()
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + now.toTimeString().substr(0, 8)
    },
    sizechange (val) {
      this.senddata.sums = val
      this.getmymessage()
    },
    currentchange (val) {
      this.senddata.pages = val
      this.getmymessage()
    }
  }
}

</script>
<style  scoped>
.mymessage {
  margin: 10px;
  background: #fff;
  height: 100%;
  /* min-height: 800px; */
  padding: 60px 0;
}
.info {
  margin: 0 auto;
  text-align: center;
  line-height: 60px;
  height: 60px;
  width: 50%;
  background-color: #f4f4f496;
  margin-bottom: 50px;
}
.list {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 25px auto;
}
.list i {
  margin-right: 5px;
}
.list .time span {
  color: rgb(68, 68, 68);
  margin-right: 15px;
}
.el-pagination {
  /* display: flex; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 240px;
}
</style>
