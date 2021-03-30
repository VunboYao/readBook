<template>
  <div>
    <slot-test>
      <template v-slot:main="{user:demo}">
        <h2>{{demo.firstName}}</h2>
      </template>
    </slot-test>
</div>
</template>

<script>
import SlotTest from './slot.vue'
export default {
  name: 'SideBar',
  components: {
    SlotTest
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
