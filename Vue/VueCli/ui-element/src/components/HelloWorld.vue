<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-row>
      <el-time-select
        v-model="value"
        :picker-options="options"
        placeholder="请选择时间"
      ></el-time-select>
    </el-row>
    <el-row>
      <el-time-picker
        v-model="value1"
        :picker-options="options1"
        arrow-control
        placeholder="任意时间点"
      ></el-time-picker>
    </el-row>
    <el-row>
      <el-time-select
        v-model="startTime"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        placeholder="起始时间"></el-time-select>
      <el-time-select
          v-model="endTime"
          :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime
        }"
          placeholder="结束时间"></el-time-select>
    </el-row>
    <el-row>
      <el-date-picker
        type="date"
        align="right"
        :picker-options="pickOptions"
        placeholder="select date"
        v-model="date2"></el-date-picker>
    </el-row>
    <el-row>
      <el-date-picker
        v-model="week"
        type="dates"
        placeholder="please select week"
      ></el-date-picker>
      <el-date-picker
        v-model="value9"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickOptions1"
      ></el-date-picker>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      date1: '',
      week: '',
      date2: '',
      id: '',
      options: {
        start: '08:30',
        step: '00:30',
        end: '23:30'
      },
      value: '',
      value1:'',
      value9: '',
      startTime: '',
      endTime: '',
      options1: {
        selectableRange: '8:30:00-20:30:00'
      },
      pickOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: 'today',
          onClick(picker) {
            picker.$emit('pick',new Date());
          },
        },{
          text: 'yesterday',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick',date);
          }
        },{
          text: 'before one week',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime()- 3600 * 1000 * 24 * 7);
            picker.$emit('pick',date);
          }
        }]
      },
      pickOptions1: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime()-3000*1000*24*7);
            picker.$emit('pick',[start,end])
          }
        }]
      }
    }
  },
  props: {
    msg: String,
  },
  methods: {
    handleChange(value){
      // eslint-disable-next-line no-console
      console.log(value);
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<style scoped>
  .el-row {
    padding: 20px;
  }
</style>
