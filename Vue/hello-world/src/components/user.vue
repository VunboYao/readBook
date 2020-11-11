<template>
  <div>
    {{ $route.params }}
    <router-link :to="{name: 'UserProfile'}">ShowProfile</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		name: "User",
		data() {
			return {}
		}
	}
</script>

<style scoped lang="scss">

</style>
