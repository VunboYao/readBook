<template>
  <div class="vue_content">
    <el-table
      :data="tableData"
      border
      :ker="tablekey"
      style="width: 100%"
    >
      <el-table-column
        prop="user_name"
        fixed
        width="120"
        label="姓名"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.user_name" placeholder="请输入姓名" />
          <span v-show="!scope.row.show">{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        width="120"
        label="性别"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.sex" placeholder="请输入性别" />
          <span v-show="!scope.row.show">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="user_id"
        width="160"
        label="身份证号"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.user_id" placeholder="请输入身份证号" />
          <span v-show="!scope.row.show">{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="zhengzhimianmao"
        width="120"
        label="政治面貌"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.zhengzhimianmao" placeholder="请输入政治面貌" />
          <span v-show="!scope.row.show">{{ scope.row.zhengzhimianmao }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="zuigaoxveli"
        width="120"
        label="最高学历"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.zuigaoxveli" placeholder="请输入最高学历" />
          <span v-show="!scope.row.show">{{ scope.row.zuigaoxveli }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="biyeyuanxiao"
        width="140"
        label="毕业院校"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.biyeyuanxiao" placeholder="请输入毕业院校" />
          <span v-show="!scope.row.show">{{ scope.row.biyeyuanxiao }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_type"
        width="120"
        label="是否全日制"
      >
        <template slot-scope="scope">
          <!-- <el-input placeholder="请输入是否全日制" v-show="scope.row.show" v-model="scope.row.is_type"></el-input> -->
          <el-select v-show="scope.row.show" v-model="scope.row.is_type" placeholder="请选择是否全日制">
            <el-option label="是" value="是" />
            <el-option label="否" value="否" />
          </el-select>
          <span v-show="!scope.row.show">{{ scope.row.is_type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="zhaolupici"
        width="120"
        label="招录批次/选任类别"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.zhaolupici" placeholder="请输入招录批次/选任类别" />
          <span v-show="!scope.row.show">{{ scope.row.zhaolupici }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="add_date"
        width="120"
        label="入职年月"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.add_date" placeholder="请输入入职年月" />
          <span v-show="!scope.row.show">{{ scope.row.add_date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="zaibiangangweileibie"
        width="120"
        label="在编岗位类别"
      >
        <template slot-scope="scope">
          <!-- <el-input placeholder="请输入在编岗位类别" v-show="scope.row.show" v-model="scope.row.zaibiangangweileibie"></el-input> -->

          <el-select v-show="scope.row.show" v-model="scope.row.zaibiangangweileibie" placeholder="请选择在编岗位类别">
            <el-option
              v-for="(item,index) in infoList"
              :key="index"
              :label="item.typeName"
              :value="item.typeName"
            />
          </el-select>
          <span v-show="!scope.row.show">{{ scope.row.zaibiangangweileibie }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="gangweicengci"
        width="120"
        label="岗位层次"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.gangweicengci" placeholder="请输入岗位层次" />
          <span v-show="!scope.row.show">{{ scope.row.gangweicengci }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="gangweidengji"
        width="120"
        label="岗位等级"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.gangweidengji" placeholder="请输入岗位等级" />
          <span v-show="!scope.row.show">{{ scope.row.gangweidengji }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="shijigongzuobumen"
        width="140"
        label="实际工作部门"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.shijigongzuobumen" placeholder="请输入实际工作部门" />
          <span v-show="!scope.row.show">{{ scope.row.shijigongzuobumen }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="zhengshu1"
        width="160"
        label="社会工作者职业水平证书情况"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.zhengshu1" placeholder="请输入社会工作者职业水平证书情况" />
          <span v-show="!scope.row.show">{{ scope.row.zhengshu1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="money"
        width="160"
        label="人员经费预算"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.money" placeholder="人员经费预算" />
          <span v-show="!scope.row.show">{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="comm"
        width="160"
        label="备注1"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.comm" placeholder="备注1" />
          <span v-show="!scope.row.show">{{ scope.row.comm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="comm2"
        width="160"
        label="备注2"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.comm2" placeholder="备注2" />
          <span v-show="!scope.row.show">{{ scope.row.comm2 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        width="160"
        label="年龄"
      >
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.age" placeholder="年龄" />
          <span v-show="!scope.row.show">{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="x"
        width="160"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">

          <el-button v-show="!scope.row.is_confirm" size="mini" type="success" @click="application(scope.row,scope.$index)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="fdiv">
        <el-button type="primary" @click="application()" class="sqbtn" round>添加</el-button>
    </div> -->
  </div>

</template>
<script>

import { addUser, submitRowCount, queryType } from '@/api/postmanagement/index'
export default {

  components: {},
  data() {
    return {
      tableData: [],
      id: null,
      row: 0,
      infoList: [],
      tablekey: 0,
      data: {
        sex: '',
        user_name: '',
        user_id: '',
        zhengzhimianmao: '',
        zuigaoxveli: '',
        biyeyuanxiao: '',
        is_type: '',
        add_date: '',
        zhaolupici: '',
        zaibiangangweileibie: '',
        gangweicengci: '',
        gangweidengji: '',
        shijigongzuobumen: '',
        zhengshu1: '',
        money: '',
        comm: '',
        comm2: '',
        age: '',
        show: true,
        is_confirm: false
      }
    }
  },

  mounted() {
    this.id = this.$route.query.id
    //    this.infoList = this.$route.query.infoList
    console.log(this.id)
    this.getTableData()
    this.queryType()
  },

  methods: {
    async application(val, index) {
      const cloneObj = JSON.parse(JSON.stringify(val))
      console.log(val)
      console.log(index)
      delete cloneObj.show
      delete cloneObj.is_confirm
      if (cloneObj.is_type == '是') {
        cloneObj.is_type = '1'
      } else if (cloneObj.is_type == '否') {
        cloneObj.is_type = '0'
      }
      cloneObj.applicationId = this.id
      const res = await addUser(cloneObj)
      if (res.code == 200) {
        this.$message.success('添加成功')
        this.tableData[index].is_confirm = true
        //    this.infoList.forEach((item,i)=>{
        //        if(cloneObj.zaibiangangweileibie == item.typeName) {
        //            item.count -= 1
        //        }
        //        if(item.count == 0) {
        //        this.infoList.splice(i,1)
        //        }
        //    })
        //    console.log(this.infoList,'this.infoList')
      } else if (res.message == '名额不足') {
        this.$message.error('申请名额不足')
      }
      console.log(res, 'res')
    },
    async getTableData() {
      const res = await submitRowCount(this.id)
      const datalist = []
      if (res.data > 0) {
        for (let i = 0; i < res.data; i++) {
          datalist[i] = JSON.parse(JSON.stringify(this.data))
        }
      }
      this.tableData = datalist
      this.tablekey += 1
    },
    queryType() {
      queryType(this.id).then(res => {
        if (res.code == 200) {
          res.data.forEach(item => {
            this.infoList.push({
              typeName: item
            })
          })
        }
      })
    },
    deleteItem() {
      this.infoList.forEach((item, i) => {
        if (item.count == 0) {
          this.infoList.splice(i, 1)
        }
      })
    }
  }
}
</script>
<style lang='css' scoped>
    .fdiv {
        position: relative;
        width: 100%;
        height: 60px;
    }
    .sqbtn {
        position: absolute;
        left: 50%;
        width: 300px;
        margin-top: 15px;
        transform: translate(-50%,0);
    }
</style>
