<template>
  <div class="target">
    <h1>Hello world!</h1>
    <el-input type="text" :self-data="demo" v-model="demo" />
    <el-input type="text" :self-data="demo2" v-model="demo2" />
    <el-button @click="PUSH">PUSH</el-button>
    <div class="text">{{tableData}}</div>
    <li v-for="(item,index) in tableData" :key="index">{{item}} - {{index}}</li>
    <input type="text" :value="demo">
    {{demo}}
  </div>
</template>

<script>
	export default {
		name: "User",
		data() {
			return {
				demo: '123',
				demo2: '123',
				tableData: {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}
      }
		},
    mounted() {
			let set = new Set()
			let observe = new MutationObserver((arr) => {
				arr.map((x) => {
					set.add(x.target)
				})
				console.log(set)
			})
      observe.observe(document.querySelector('.target'), {
        characterDataOldValue: true,
        subtree: true,
				attributeOldValue: true
			})
    },
    methods: {
			PUSH() {
				this.tableData.push({
					date: '2016-05-03',
					name: '王小虎2',
					address: '上海市普陀区金沙江路 1516 弄'
        })
      }
    }
	}
</script>

<style scoped lang="scss">

</style>
