<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png"/>
    <router-link :to="{ name: 'User', params: {userId: '123'}}">GoUser</router-link>
    <router-view/>
  </div>
</template>

<script>
	export default {
		name: "App",
		mounted() {
			history.pushState(null,null,document.URL)
			window.addEventListener('popstate', function () {
				history.pushState(null,null,document.URL)
			})
		},
		methods: {
			test() {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve("123")
					}, 2000)
				})
			},
			async show() {
				await this.test().then((res) => {
					console.log(res)
				})
				console.log("345")
			},
		},
	}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
