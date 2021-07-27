<template>
  <div class="vue_content">
    <div class="alltitle">新增社区工作者</div>
    <el-form ref="form" :model="form" label-width="100px" class="fromcontent">
      <el-form-item label="街道">
        <el-select
          v-model="form.street"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in streetoption"
            :key="item.id"
            :label="item.name_street"
            :value="item.street_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.user_name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择" style="width: 100%">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.user_id" />
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select
          v-model="form.zhengzhimianmao"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option label="团员" value="团员" />
          <el-option label="党员" value="党员" />
          <el-option label="群众" value="群众" />
        </el-select>
      </el-form-item>
      <el-form-item label="最高学历">
        <el-input v-model="form.zuigaoxveli" />
      </el-form-item>
      <el-form-item label="毕业院校">
        <el-input v-model="form.biyeyuanxiao" />
      </el-form-item>
      <el-form-item label="是否全日制">
        <el-select
          v-model="form.is_type"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option label="否" :value="0" />
          <el-option label="是" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="招录批次">
        <el-input v-model="form.zhaolupici" />
      </el-form-item>
      <el-form-item label="岗位层次">
        <el-select
          v-model="form.gangweicengci"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in gangweioption"
            :key="item.id"
            :label="item.type_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="岗位等级">
        <el-select
          v-model="form.gangweidengji"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dengjioption"
            :key="item.id"
            :label="item.type_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="实际工作部门">
        <el-input v-model="form.shijigongzuobumen" />
      </el-form-item>
      <el-form-item label="社会工作者职业水平证书情况">
        <el-input v-model="form.zhengshu1" />
      </el-form-item>
      <el-form-item label="人员经费预算">
        <el-input v-model="form.money" />
      </el-form-item>
      <el-form-item label="备注1">
        <el-input v-model="form.comm" />
      </el-form-item>
      <el-form-item label="备注2">
        <el-input v-model="form.comm2" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="申请类型">
        <el-select
          v-model="form.applyType"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="人员添加申请" value="1" />
          <el-option label="人员添加岗位添加申请" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          @click="onSubmit"
        >确定</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { addWorker } from '../../api/users/add'
import { streetlist, systype2list, systype3list } from '../../api/set/postmanagement'
export default {
  data() {
    return {
      streetoption: [],
      gangweioption: [],
      dengjioption: [],
      form: {
      }
    }
  },
  created() {
    // 获取街道
    this.getoption()
  },
  methods: {
    async getoption() {
      const res = await streetlist()
      // console.log(res)
      this.streetoption = res.data
      const res1 = await systype2list()

      this.gangweioption = res1.data
      const res3 = await systype3list()
      console.log(res3)
      this.dengjioption = res3.data
    },
    async onSubmit() {
      console.log(this.form)
      const res = await addWorker(this.form)
      console.log(res)
      this.$message(res.data)
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.fromcontent {
  width: 50%;
  margin: auto;
}
</style>

