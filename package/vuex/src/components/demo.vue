<template>
  <div>
    <h2>首页</h2>
    <model v-model="de"></model>
    {{ de }}
  </div>
</template>
<script>
  import model from "./model"
export default {
    components: {
      model
    },
  data() {
    return {
      de: '1'
    }
  },
  methods: {
  }
};
</script>
