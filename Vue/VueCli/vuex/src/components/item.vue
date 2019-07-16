<template>
  <ul>
    <li class="item">
      <input type="checkbox" v-model="checked">
      <slot name="item" v-bind="{checked}"></slot>
      <slot></slot>
    </li>
  </ul>
</template>

<script>
	export default {
		name: "item",
    data() {
			return {
				checked: false
      }
    }
	}
</script>

<style scoped>
.item {
  color: red;
}
</style>
