<template>
  <div class="container">
    <grid-layout
      :layout.sync="layout"
      :col-num="2"
      :row-height="5"
      :maxRows="2"
      :is-draggable="true"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        {{ item.i }}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import Vue from 'vue'
import VueGridLayout from 'vue-grid-layout'
Vue.use(VueGridLayout)
var testLayout = [
  { x: 0, y: 1, w: 1, h: 2, i: '0' },
  { x: 1, y: 1, w: 1, h: 3, i: '1' }
]
export default {
  data() {
    return {
      layout: testLayout,
    }
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  methods: {}
}
</script>
<style>
.vue-grid-item {
  background-color: #ccc;
}
</style>
