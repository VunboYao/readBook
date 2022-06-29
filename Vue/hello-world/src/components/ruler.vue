<template>
  <div ref="demo"></div>
</template>

<script>
import SlideRuler from 'slide-ruler'
export default ({
  data() {
    return {
      currentValue: 180
    }
  },
  mounted() {
    this._renderSlideRuler();
  },
  methods: {
    _renderSlideRuler() {
      return new SlideRuler(
        {
          el: this.$refs.demo,
          maxValue: 230,
          minValue: 100,
          currentValue: 180,
          handleValue: this.handleValue,
          precision: 1
        }
      );
    },

    handleValue(value) {
      console.log(value); //SlideRuler return value
    }
  }
})
</script>

<style scoped lang="less">
</style>
