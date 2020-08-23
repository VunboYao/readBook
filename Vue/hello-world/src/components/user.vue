<template>
<div>
  {{ $route.params }}
</div>
</template>

<script>
	export default {
		name: "User",
		data() {
			return {}
		},
		mounted() {
			history.pushState(null,null,document.URL)
			window.addEventListener('popstate', function () {
				history.pushState(null,null,document.URL)
			})
		},
		methods: {}
	}
</script>

<style scoped lang="scss">

</style>
