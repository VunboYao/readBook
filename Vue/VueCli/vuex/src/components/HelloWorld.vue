<template>
  <div class="hello">
    <input type="text" v-model="value" @keyup.enter="add">
    <button @click="add">ADD Value</button>
    <Item
        v-for="(item,index) in list"
        :key="index">
      <template #item="{checked1:demo}">
        <span
            :style="{color: demo ? 'red' : 'blue'}">{{item}}</span>
      </template>
      <template #default>--------{{index}}</template>
    </Item>
  </div>
</template>

<script>
  import Item from './item'
	export default {
		name: 'HelloWorld',
		data() {
			return {
				value: '',
        list: []
			}
		},
    components: {
			Item
    },
    methods: {
			add() {
				this.list.push(this.value);
				this.value = '';
      }
    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  font-size: 20px;
  font-weight: 600;
}
</style>
