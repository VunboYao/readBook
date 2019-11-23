<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>{{count}}</h1>
    <h2>{{$store.getters.doneTodosCount}}</h2>
    <button @click="increment({amount: 10})">Add</button>
  </div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'

	export default {
		name: 'app',
		data() {
			return {
				localCount: ''
			}
		},
		computed: mapState({
			count: state => state.count,
			countAlias: 'count',
			countPlusLocalState(state) {
				return state.count + this.localCount
			}
		}),
		methods: {
			...mapMutations(['increment'])
		}
	}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
