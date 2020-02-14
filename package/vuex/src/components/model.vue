<template>
	<div>
		<el-select v-model="val" @change="show(val)">
			<el-option label="one" value="1"></el-option>
			<el-option label="two" value="2"></el-option>
			<el-option label="three" value="3"></el-option>
		</el-select>
	</div>
</template>

<script>
	export default {
		name: "model",
		props: {
			ageData: String,
		},
		model: {
			prop: 'ageData',
			event: 'ss'
		},
		components: {},
		data() {
			return {
				val: this.ageData
			}
		},
		methods: {
			show(ageData) {
				this.$emit('ss', ageData + 1)
			}
		}
	}
</script>

<style scoped>

</style>
