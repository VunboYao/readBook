<template>
  <div>
    <form>
      <label for="id">id
        <input type="text" :value="value" @input="onInput">
      </label>
    </form>
    <input type="checkbox">
  </div>
</template>

<script>
export default {
  name: 'CustomerCom',
  props: {
    value: {
      type: String,
      default: '123'
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>

</style>
