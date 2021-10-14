<template>
  <!-- 消息详情 -->
  <div>
    <div v-if="messagesome.msgType === 1" class="normalmain">
      <div class="shenqinginfo">
        <h2>申请信息详情</h2>
      </div>
      <div class="message">
        {{ messagesome.msg }}
        原因如下
      </div>
      <div class="yuanyin">被拒绝原因</div>
    </div>
    <!-- 消息详情 -->
    <div v-else class="normalmain">
      <div class="shenqinginfo">
        <h2>申请信息详情</h2>
      </div>
      <div class="message">
        {{ messagesome.msg }}
      </div>
      <div class="yuanyin">员工信息</div>
      <!-- 表格信息 -->
      <el-table :data="tableData" style="width: 80%">
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="street" label="街道" />
        <el-table-column prop="user_name" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="user_id" label="身份证号" />
        <el-table-column prop="zhengzhimianmao" label="政治面貌" />
        <el-table-column prop="zuigaoxveli" label="最高学历" />
        <el-table-column prop="biyeyuanxiao" label="毕业院校" />
        <el-table-column prop="is_type" label="是否全日制" />
        <el-table-column prop="zhaolupici" label="招录批次/选任类别" />
        <el-table-column prop="add_date" label="入职年月" />
        <el-table-column prop="gangweidengji" label="在编岗位类别" />
        <el-table-column prop="gangweicengci" label="岗位层次" />
        <el-table-column prop="shijigongzuobumen" label="实际工作部门" />
        <el-table-column prop="zhengshu1" label="社会工作者职业水平证书情况" />
        <el-table-column prop="money" label="人员经费运算" />
        <el-table-column prop="is_edit" label="是否曾调整过人员编制" />
        <el-table-column prop="comm" label="备注1" />
        <el-table-column prop="comm2" label="备注2" />
        <el-table-column prop="age" label="年龄" />
      </el-table>
      <div class="yuanyin">员额增加申请盖章文件</div>
      <div class="gaizhang">
        <i class="el-icon-picture-outline" />
        <span>盖章文件</span>
      </div>
      <el-row>
        <el-button type="success" @click="yunxu">允许</el-button>
        <el-button type="danger" @click="jujue">拒绝</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { shenhe } from '@/api/set/mymessage'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      // 详情数据
      messagesome: {},
      show: false,
      tableData: [],
      // 人员审核同意或者拒绝的参数
      shenhedata: {
        id: null,
        status: 0,
        remark: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.messagesome = JSON.parse(window.sessionStorage.getItem('message')) || {}
    this.tableData[0] = JSON.parse(window.sessionStorage.getItem('staff')) || {}
    // console.log(this.tableData[0])
  },
  mounted () { },
  methods: {
    // 允许
    yunxu () {
      this.shenhe()
      this.shenhedata.status = 1
    },
    // 拒绝
    jujue () {
      this.shenhe()
      this.shenhedata.status = 2
    },
    // 调用
    async shenhe () {
      const results = await this.$prompt('请输入理由', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
      if (results && results.action === 'confirm') {
        this.shenhedata.remark = results.value
        console.log(this.shenhedata)
        // const res = await shenhe(this.shenhedata)
        // console.log(res)
        // this.$message({
        //   type: 'info',
        //   message: '已成功审核！'
        // })
        this.shenhedata.status = 0
      }
    }
  }
}

</script>
<style scoped>
.normalmain {
  margin: 10px;
  width: 100%;
  background: #fff;
  padding: 40px 0;
  min-height: 700px;
}
.shenqinginfo {
  text-align: center;
}
h2 {
  font-weight: 400;
}
.message {
  margin: 30px 0;
  margin-left: 180px;
}
.yuanyin {
  padding-top: 20px;
  margin-left: 220px;
}
.el-table {
  margin-left: 190px;
  /* display: flex; */
  margin-top: 40px;
  width: 80%;
}
.gaizhang {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 220px;
  text-align: center;
  /* line-height: 150px; */
  margin-top: 40px;
  width: 70%;
  height: 150px;
  background: #f3f3f3;
}
.el-icon-picture-outline {
  padding-bottom: 10px;
}
.el-icon-picture-outline::before {
  font-size: 30px;
  color: rgb(106, 109, 109);
}
.el-row {
  margin-top: 100px;
  margin-left: 70%;
  /* position: absolute; */
  /* right: 10%; */
}
.el-button {
  width: 180px;
}
</style>
