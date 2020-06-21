<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png"/>
    <HelloWorld @success="success" msg="Welcome to Your Vue.js App"/>
    <y-button size="large" @test="show">
      <h2 slot="one">OK</h2>
      button one
    </y-button>
  </div>
</template>

<script>
	import HelloWorld from "./components/HelloWorld.vue"
	import yButton from './components/button'

	export default {
		name: "App",
    provide() {
			return {
				app: this
      }
    },
		components: {
			HelloWorld,
			yButton
		},
		data() {
			return {
				showH: true
			}
		},
		methods: {
			show(val) {
				console.log(val, '---')
			},
			success(data) {
				console.log(data)
			}
		}
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
