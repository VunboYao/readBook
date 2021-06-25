<template>
  <div>
    <slot-test>
      <template v-slot:main="{user:demo}">
        <h2>{{demo.firstName}}</h2>
        <v-input name="vunbo" placeholder="enter your msg" />
      </template>
    </slot-test>
</div>
</template>

<script>
import SlotTest from './slot.vue'
import VInput from './ElInput'
export default {
  name: 'SideBar',
  components: {
    SlotTest,
    VInput
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
h2 {
  color: skyblue;
  font-weight: bold;
}
</style>
